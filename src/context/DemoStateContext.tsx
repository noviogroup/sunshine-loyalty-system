import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { supabase } from '../lib/supabase';
import type { Customer, Redemption, RedemptionStatus, Reward, Transaction } from '../types';

const DEMO_CUSTOMER_ID = 'c1';

interface DemoStateContextValue {
  customers: Customer[];
  transactions: Transaction[];
  redemptions: Redemption[];
  demoCustomer: Customer;
  loading: boolean;
  redeemReward: (reward: Reward) => Promise<string>;
  updateRedemptionStatus: (redemptionId: string, status: RedemptionStatus, note?: string) => Promise<void>;
  adjustCustomerPoints: (customerId: string, points: number, reason: string) => Promise<void>;
  resetDemo: () => void;
}

const DemoStateContext = createContext<DemoStateContextValue | null>(null);

function updateCustomerPoints(customer: Customer, delta: number): Customer {
  const points = Math.max(0, customer.points + delta);
  const pointsToNextTier = customer.nextTier ? Math.max(0, customer.pointsToNextTier - delta) : 0;
  return { ...customer, points, pointsToNextTier };
}

function buildRedemptionCode(companyName: string): string {
  const prefix = companyName.includes('Insurance') ? 'SHL-INS' : 'SHL-FIN';
  const left = Math.random().toString(36).substring(2, 5).toUpperCase();
  const right = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `${prefix}-${left}-${right}`;
}

function buildReference(prefix: string): string {
  const number = Math.floor(1000 + Math.random() * 9000);
  return `${prefix}-${new Date().getFullYear()}-${number}`;
}

// Map snake_case DB rows to camelCase TS types
function rowToCustomer(row: Record<string, unknown>, linkedAccounts: Array<{
  companyId: string; companyName: string; accountNumber: string; linkedDate: string;
}>): Customer {
  return {
    id: row.id as string,
    name: row.name as string,
    email: row.email as string,
    phone: row.phone as string,
    tier: row.tier as Customer['tier'],
    points: row.points as number,
    pointsToNextTier: row.points_to_next_tier as number,
    nextTier: (row.next_tier ?? null) as Customer['nextTier'],
    joinDate: row.join_date as string,
    linkedAccounts,
  };
}

function rowToTransaction(row: Record<string, unknown>): Transaction {
  return {
    id: row.id as string,
    customerId: row.customer_id as string,
    companyId: row.company_id as string,
    companyName: row.company_name as string,
    type: row.type as Transaction['type'],
    points: row.points as number,
    description: row.description as string,
    reference: row.reference as string,
    date: row.date as string,
    status: row.status as Transaction['status'],
  };
}

function rowToRedemption(row: Record<string, unknown>): Redemption {
  return {
    id: row.id as string,
    customerId: row.customer_id as string,
    customerName: row.customer_name as string,
    rewardId: row.reward_id as string,
    rewardTitle: row.reward_title as string,
    companyId: row.company_id as string,
    companyName: row.company_name as string,
    pointsUsed: row.points_used as number,
    code: row.code as string,
    status: row.status as Redemption['status'],
    issuedAt: row.issued_at as string,
    usedAt: (row.used_at ?? undefined) as string | undefined,
    voidReason: (row.void_reason ?? undefined) as string | undefined,
  };
}

export function DemoStateProvider({ children }: { children: React.ReactNode }) {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [redemptions, setRedemptions] = useState<Redemption[]>([]);
  const [loading, setLoading] = useState(true);

  const loadAll = useCallback(async () => {
    setLoading(true);
    const [customersRes, linkedRes, transactionsRes, redemptionsRes] = await Promise.all([
      supabase.from('customers').select('*').order('join_date'),
      supabase.from('linked_accounts').select('*'),
      supabase.from('transactions').select('*').order('date', { ascending: false }),
      supabase.from('redemptions').select('*').order('issued_at', { ascending: false }),
    ]);

    const linkedRows = linkedRes.data ?? [];

    const loadedCustomers: Customer[] = (customersRes.data ?? []).map((row) => {
      const accts = linkedRows
        .filter((la) => la.customer_id === row.id)
        .map((la) => ({
          companyId: la.company_id as string,
          companyName: la.company_name as string,
          accountNumber: la.account_number as string,
          linkedDate: la.linked_date as string,
        }));
      return rowToCustomer(row as Record<string, unknown>, accts);
    });

    setCustomers(loadedCustomers);
    setTransactions((transactionsRes.data ?? []).map((r) => rowToTransaction(r as Record<string, unknown>)));
    setRedemptions((redemptionsRes.data ?? []).map((r) => rowToRedemption(r as Record<string, unknown>)));
    setLoading(false);
  }, []);

  useEffect(() => {
    loadAll();
  }, [loadAll]);

  const demoCustomer = useMemo(
    () => customers.find((c) => c.id === DEMO_CUSTOMER_ID) ?? customers[0],
    [customers]
  );

  const redeemReward = async (reward: Reward): Promise<string> => {
    const code = buildRedemptionCode(reward.companyName);
    const issuedAt = new Date().toISOString();
    const txId = `rdm-${Date.now()}`;
    const rdmId = `redemption-${Date.now()}`;

    const txRow = {
      id: txId,
      customer_id: demoCustomer.id,
      company_id: reward.companyId,
      company_name: reward.companyName,
      type: 'redeemed',
      points: -reward.pointsCost,
      description: `Redeemed: ${reward.title}`,
      reference: code,
      date: issuedAt.slice(0, 10),
      status: 'completed',
    };

    const rdmRow = {
      id: rdmId,
      customer_id: demoCustomer.id,
      customer_name: demoCustomer.name,
      reward_id: reward.id,
      reward_title: reward.title,
      company_id: reward.companyId,
      company_name: reward.companyName,
      points_used: reward.pointsCost,
      code,
      status: 'issued',
      issued_at: issuedAt,
    };

    const newPoints = Math.max(0, demoCustomer.points - reward.pointsCost);

    await Promise.all([
      supabase.from('transactions').insert(txRow),
      supabase.from('redemptions').insert(rdmRow),
      supabase.from('customers').update({ points: newPoints }).eq('id', demoCustomer.id),
    ]);

    setCustomers((prev) =>
      prev.map((c) => (c.id === demoCustomer.id ? updateCustomerPoints(c, -reward.pointsCost) : c))
    );
    setTransactions((prev) => [rowToTransaction(txRow as unknown as Record<string, unknown>), ...prev]);
    setRedemptions((prev) => [rowToRedemption(rdmRow as unknown as Record<string, unknown>), ...prev]);

    return code;
  };

  const updateRedemptionStatus = async (redemptionId: string, status: RedemptionStatus, note?: string) => {
    const patch: Record<string, unknown> = { status };
    if (status === 'used') patch.used_at = new Date().toISOString();
    if (status === 'voided') patch.void_reason = note ?? 'Voided by admin';

    await supabase.from('redemptions').update(patch).eq('id', redemptionId);

    setRedemptions((prev) =>
      prev.map((r) => {
        if (r.id !== redemptionId) return r;
        return {
          ...r,
          status,
          usedAt: status === 'used' ? (patch.used_at as string) : r.usedAt,
          voidReason: status === 'voided' ? (patch.void_reason as string) : r.voidReason,
        };
      })
    );
  };

  const adjustCustomerPoints = async (customerId: string, points: number, reason: string) => {
    const customer = customers.find((c) => c.id === customerId);
    if (!customer || points === 0) return;

    const company = customer.linkedAccounts[0];
    const txId = `adj-${Date.now()}`;
    const txRow = {
      id: txId,
      customer_id: customerId,
      company_id: company?.companyId ?? 'comp1',
      company_name: company?.companyName ?? 'Sunshine Rewards Admin',
      type: 'adjustment',
      points,
      description: `Admin adjustment: ${reason || 'No reason provided'}`,
      reference: buildReference(points > 0 ? 'SHL-ADJ-ADD' : 'SHL-ADJ-DED'),
      date: new Date().toISOString().slice(0, 10),
      status: 'completed',
    };

    const newPoints = Math.max(0, customer.points + points);

    await Promise.all([
      supabase.from('transactions').insert(txRow),
      supabase.from('customers').update({ points: newPoints }).eq('id', customerId),
    ]);

    setCustomers((prev) => prev.map((c) => (c.id === customerId ? updateCustomerPoints(c, points) : c)));
    setTransactions((prev) => [rowToTransaction(txRow as unknown as Record<string, unknown>), ...prev]);
  };

  const resetDemo = () => {
    loadAll();
  };

  return (
    <DemoStateContext.Provider
      value={{ customers, transactions, redemptions, demoCustomer, loading, redeemReward, updateRedemptionStatus, adjustCustomerPoints, resetDemo }}
    >
      {children}
    </DemoStateContext.Provider>
  );
}

export function useDemoState() {
  const context = useContext(DemoStateContext);
  if (!context) throw new Error('useDemoState must be used within DemoStateProvider');
  return context;
}
