# Sunshine Rewards Production Blueprint

This document adapts the QHC Loyalty architecture into a Sunshine Holdings financial-services loyalty model.

The current Sunshine app is a presentation demo. This blueprint describes the recommended production direction for a real MVP.

## Core Difference From QHC Loyalty

QHC Loyalty is retail/POS-driven:

- Customers earn points from purchases.
- Staff validate redemptions at checkout.
- Promotions are retail campaigns.

Sunshine Rewards should be financial-services/account-driven:

- Customers earn points from account milestones, payment behavior, renewals, referrals, product adoption, and cross-company engagement.
- Staff validate redemptions through Finance and Insurance service desks.
- Campaigns are service, policy, account, and relationship-based.

## Recommended Production Stack

- Expo / React Native customer app
- React Native Web or separate React admin portal
- Supabase Auth
- Supabase Postgres
- Supabase Storage for logos/assets
- Supabase Edge Functions or RPC for secure point operations
- Row Level Security policies
- Future integration layer for Sunshine Finance and Sunshine Insurance source systems

## Core Tables

### profiles

Stores the customer identity connected to Supabase Auth.

Suggested fields:

- id uuid primary key, references auth.users
- first_name text
- last_name text
- email text
- phone text
- membership_number text unique
- tier text
- status text
- created_at timestamptz
- updated_at timestamptz

### companies

Stores participating Sunshine companies.

Suggested fields:

- id uuid primary key
- name text
- slug text unique
- description text
- logo_url text
- accent_color text
- is_active boolean
- created_at timestamptz

Current demo scope should include only:

- Sunshine Finance
- Sunshine Insurance

### linked_accounts

Connects a loyalty member to company-specific account records.

Suggested fields:

- id uuid primary key
- profile_id uuid references profiles(id)
- company_id uuid references companies(id)
- external_account_ref text
- account_type text
- status text
- linked_at timestamptz
- last_synced_at timestamptz

Examples:

- Finance customer account number
- Insurance policy number
- Loan account reference
- Policy bundle relationship

### points_ledger

The source of truth for all point activity.

Suggested fields:

- id uuid primary key
- profile_id uuid references profiles(id)
- company_id uuid references companies(id)
- amount integer
- type text
- description text
- reference text
- source_system text
- source_event_id text
- created_by uuid nullable
- created_at timestamptz

Important rule:

Do not store a customer balance as the only source of truth. Balance should be calculated from the ledger or maintained via controlled server-side functions.

Suggested types:

- welcome
- account_linked
- payment_milestone
- renewal
- referral
- cross_company_bonus
- redemption
- admin_adjustment
- expiration
- reversal

### rewards

Stores available rewards customers can redeem.

Suggested fields:

- id uuid primary key
- company_id uuid references companies(id)
- title text
- description text
- points_cost integer
- category text
- terms text
- start_date date
- end_date date
- is_active boolean
- sort_order integer
- created_at timestamptz

Examples:

- Finance rate review consultation
- Loan processing discount
- Insurance premium credit
- Policy review service
- Hurricane preparedness add-on

### redemptions

Stores issued reward codes and redemption lifecycle.

Suggested fields:

- id uuid primary key
- profile_id uuid references profiles(id)
- reward_id uuid references rewards(id)
- company_id uuid references companies(id)
- redemption_code text unique
- points_used integer
- status text
- issued_at timestamptz
- used_at timestamptz nullable
- used_by uuid nullable
- voided_at timestamptz nullable
- void_reason text nullable

Suggested statuses:

- issued
- used
- voided
- expired

### campaigns

Stores marketing and loyalty campaigns.

Suggested fields:

- id uuid primary key
- company_id uuid references companies(id)
- name text
- description text
- campaign_type text
- eligibility_rules jsonb
- reward_rules jsonb
- start_date date
- end_date date
- status text
- created_at timestamptz

Examples:

- Renew insurance policy and earn double points
- Link Finance and Insurance accounts for a cross-company bonus
- Referral campaign
- Platinum member annual review campaign

### admin_users

Maps staff/admin permissions.

Suggested fields:

- id uuid primary key
- user_id uuid references auth.users
- role text
- company_id uuid nullable references companies(id)
- is_active boolean
- created_at timestamptz

Suggested roles:

- super_admin
- executive_viewer
- finance_admin
- insurance_admin
- staff_verifier
- campaign_manager

## Secure Server-Side Operations

The following should not be trusted from the client app directly:

- Issue points
- Redeem rewards
- Void redemptions
- Adjust points
- Expire points
- Reverse points

Use Supabase RPC or Edge Functions for these operations.

Recommended functions:

### issue_points

Inputs:

- profile_id
- company_id
- amount
- type
- description
- source_event_id

Validates:

- caller role
- company permission
- duplicate source_event_id
- amount rules

### redeem_reward

Inputs:

- profile_id
- reward_id

Validates:

- reward is active
- customer has enough points
- customer is eligible
- creates redemption row
- creates negative ledger row
- returns redemption code

### verify_redemption

Inputs:

- redemption_code
- staff_user_id

Validates:

- code exists
- status is issued
- staff has company permission
- marks redemption used

### adjust_points

Inputs:

- profile_id
- company_id
- amount
- reason

Validates:

- admin role
- reason required
- audit trail

## RLS Policy Direction

Customers should only read their own:

- profile
- linked accounts
- points ledger
- redemptions

Customers should read active:

- companies
- rewards
- campaigns/promotions

Admins should read and operate only within their role/company scope.

Executives should read aggregate views, not necessarily raw customer PII.

## Reporting Views

Create database views for dashboards:

- total_members
- points_issued_by_company
- points_redeemed_by_company
- active_redemptions
- redemption_rate
- cross_company_members
- campaign_performance
- tier_distribution

## Integration Roadmap

### Phase 1: Demo / Executive Prototype

Current state:

- Local seeded data
- Demo login
- Customer card
- Reward redemption
- Admin verification
- Executive overview

### Phase 2: Functional MVP

- Supabase Auth
- Real profiles
- Real points ledger
- Real rewards/redemptions tables
- Admin roles
- Server-side redemption and adjustment functions
- Basic reporting views

### Phase 3: Sunshine System Integrations

- Finance account linking
- Insurance policy linking
- Batch event import
- Renewal/payment milestone events
- Referral tracking
- Reconciliation reports

### Phase 4: Advanced Loyalty Engine

- Dynamic tiers
- Expiring points
- Fraud rules
- Campaign eligibility engine
- Personalized offers
- Automated notifications
- Executive BI dashboards

## Tuesday Meeting Positioning

Recommended language:

> This demo shows the customer, admin, and executive workflow. It is not presented as a production system yet. The next step would be a functional MVP using Supabase, secure point operations, and a defined integration strategy for Sunshine Finance and Sunshine Insurance.

## Scope Guardrail

Do not add Focal, Sun Oil, Shell, gas station, petroleum, pump, station locator, or fuel reward examples unless the client explicitly reverses the prior guidance.
