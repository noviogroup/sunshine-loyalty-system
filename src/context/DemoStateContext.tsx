import React, { createContext, useContext, useMemo, useState } from 'react';
import {
  customers as seededCustomers,
  transactions as seededTransactions,
} from '../data/demo';
import type { Customer, Reward, Transaction } from '../types';

const DEMO_CUSTOMER_ID = 'c1';

interface DemoStateContextValue {
  customers: Customer[];
  transactions: Transaction[];
  demoCustomer: Customer;
  redeemReward: (reward: Reward) => string;
  adjustCustomerPoints: (customerId: string, points: number, reason: string) => void;
  resetDemo: () => void;
}

const DemoStateContext = createContext<DemoStateContextValue | null>(null);

function updateCustomerPoints(customer: Customer, delta: number): Customer {
  const points = Math.max(0, customer.points + delta);
  const pointsToNextTier = customer.nextTier
    ? Math.max(0, customer.pointsToNextTier - delta)
    : 0;

  return {
    ...customer,
    points,
    pointsToNextTier,
  };
}

function buildRedemptionCode(companyName: string): string {
  const prefix = companyName.includes('Insurance') ? 'SHL-INS' : 'SHL-FIN';
  const number = Math.floor(10000 + Math.random() * 90000);
  return `${prefix}-${number}`;
}

function buildReference(prefix: string): string {
  const number = Math.floor(1000 + Math.random() * 9000);
  return `${prefix}-${new Date().getFullYear()}-${number}`;
}

export function DemoStateProvider({ children }: { children: React.ReactNode }) {
  const [customers, setCustomers] = useState<Customer[]>(seededCustomers);
  const [transactions, setTransactions] = useState<Transaction[]>(seededTransactions);

  const demoCustomer = useMemo(
    () => customers.find((customer) => customer.id === DEMO_CUSTOMER_ID) ?? customers[0],
    [customers]
  );

  const redeemReward = (reward: Reward) => {
    const code = buildRedemptionCode(reward.companyName);
    const transaction: Transaction = {
      id: `rdm-${Date.now()}`,
      customerId: demoCustomer.id,
      companyId: reward.companyId,
      companyName: reward.companyName,
      type: 'redeemed',
      points: -reward.pointsCost,
      description: `Redeemed: ${reward.title}`,
      reference: code,
      date: new Date().toISOString().slice(0, 10),
      status: 'completed',
    };

    setCustomers((currentCustomers) =>
      currentCustomers.map((customer) =>
        customer.id === demoCustomer.id
          ? updateCustomerPoints(customer, -reward.pointsCost)
          : customer
      )
    );
    setTransactions((currentTransactions) => [transaction, ...currentTransactions]);

    return code;
  };

  const adjustCustomerPoints = (customerId: string, points: number, reason: string) => {
    const customer = customers.find((item) => item.id === customerId);
    if (!customer || points === 0) return;

    const company = customer.linkedAccounts[0];
    const transaction: Transaction = {
      id: `adj-${Date.now()}`,
      customerId,
      companyId: company?.companyId ?? 'comp1',
      companyName: company?.companyName ?? 'Sunshine Rewards Admin',
      type: 'adjustment',
      points,
      description: `Admin adjustment: ${reason || 'No reason provided'}`,
      reference: buildReference(points > 0 ? 'SHL-ADJ-ADD' : 'SHL-ADJ-DED'),
      date: new Date().toISOString().slice(0, 10),
      status: 'completed',
    };

    setCustomers((currentCustomers) =>
      currentCustomers.map((item) =>
        item.id === customerId ? updateCustomerPoints(item, points) : item
      )
    );
    setTransactions((currentTransactions) => [transaction, ...currentTransactions]);
  };

  const resetDemo = () => {
    setCustomers(seededCustomers);
    setTransactions(seededTransactions);
  };

  return (
    <DemoStateContext.Provider
      value={{
        customers,
        transactions,
        demoCustomer,
        redeemReward,
        adjustCustomerPoints,
        resetDemo,
      }}
    >
      {children}
    </DemoStateContext.Provider>
  );
}

export function useDemoState() {
  const context = useContext(DemoStateContext);
  if (!context) {
    throw new Error('useDemoState must be used within DemoStateProvider');
  }
  return context;
}
