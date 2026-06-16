export type Tier = 'Bronze' | 'Silver' | 'Gold' | 'Platinum';

export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  tier: Tier;
  points: number;
  pointsToNextTier: number;
  nextTier: Tier | null;
  joinDate: string;
  linkedAccounts: LinkedAccount[];
}

export interface LinkedAccount {
  companyId: string;
  companyName: string;
  accountNumber: string;
  linkedDate: string;
}

export interface Company {
  id: string;
  name: string;
  description: string;
  logo: string;
  imageUrl?: string;
  accentColor: string;
  isActive: boolean;
}

export interface Reward {
  id: string;
  title: string;
  description: string;
  pointsCost: number;
  companyId: string;
  companyName: string;
  category: string;
  expiryDate: string;
  isAvailable: boolean;
  imageUrl?: string;
}

export interface Transaction {
  id: string;
  customerId: string;
  companyId: string;
  companyName: string;
  type: 'earned' | 'redeemed' | 'pending' | 'expired' | 'adjustment';
  points: number;
  description: string;
  reference: string;
  date: string;
  status: 'completed' | 'pending' | 'reversed' | 'expired';
}

export type RedemptionStatus = 'issued' | 'used' | 'voided' | 'expired';

export interface Redemption {
  id: string;
  customerId: string;
  customerName: string;
  rewardId: string;
  rewardTitle: string;
  companyId: string;
  companyName: string;
  pointsUsed: number;
  code: string;
  status: RedemptionStatus;
  issuedAt: string;
  usedAt?: string;
  voidReason?: string;
}

export interface Campaign {
  id: string;
  name: string;
  companyId: string;
  companyName: string;
  rewardType: string;
  startDate: string;
  endDate: string;
  pointsRequired: number;
  description: string;
  status: 'draft' | 'active' | 'paused' | 'expired';
  eligibility: string;
}

export interface KPIData {
  label: string;
  value: string | number;
  change?: number;
  changeLabel?: string;
  icon?: string;
}
