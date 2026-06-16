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
