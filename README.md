# Sunshine Rewards Demo

Sunshine Rewards is a demo loyalty application for Sunshine Holdings. It is built to support an executive walkthrough of a unified rewards experience across selected Sunshine companies, starting with Sunshine Finance and Sunshine Insurance.

## Demo Purpose

The demo shows how Sunshine Holdings could offer customers one digital loyalty account while giving internal teams better visibility into points, rewards, customer activity, and company-level engagement.

This is a presentation demo, not a production implementation.

## Design System Notes

The demo uses a premium, financial-services-friendly visual direction:

- **Font:** Inter via `@expo-google-fonts/inter`
- **Icons:** Expo Vector Icons, primarily `MaterialCommunityIcons`
- **Brand mark:** Reusable `BrandMark` component using a Sunshine-style icon
- **UI direction:** rounded cards, clean white space, gold highlights, charcoal text, and soft elevation
- **Admin direction:** desktop-first SaaS dashboard with a left navigation rail, top utility bar, large content canvas, and compact status cards

Key design files:

```txt
src/theme/colors.ts
src/theme/typography.ts
src/theme/spacing.ts
src/components/BrandMark.tsx
src/components/Button.tsx
src/components/Card.tsx
src/components/DemoQr.tsx
app/(admin)/_layout.tsx
```

## QHC-Inspired Loyalty Flow Added

The demo now includes several concepts adapted from the QHC Loyalty setup:

- Customer membership card screen
- QR-style membership visual
- Redemption code ledger
- Admin redemption verification screen
- Staff-style mark-used / void actions
- Shared in-session demo state for redemptions and transactions
- Dashboard redemption queue summary
- Executive redemption operations insight

These are still local demo features. They are intended to show the workflow before moving to a production Supabase implementation.

## Demo Areas

### Customer App

Main demo path:

1. Open the app landing screen.
2. Select **Start Customer Demo**.
3. Sign in with the seeded Alicia Rolle demo account.
4. View points balance, membership tier, linked companies, and recent activity.
5. Open **Card** to view the Sunshine Rewards member card.
6. Open **Offers**.
7. Redeem an available reward.
8. View the redemption success screen and code.
9. Open **Activity** to confirm the new redemption appears.

### Admin Portal

Main demo path:

1. Open **Admin Portal** from the landing screen.
2. Review the desktop-style left navigation, top utility bar, KPI cards, recent transactions, and redemption queue summary.
3. Open **Customers**.
4. Search or select a customer.
5. View linked accounts, points balance, and recent transactions.
6. Use **Adjust Points** to demonstrate an audited admin adjustment.
7. Open **Redemptions** or click **Verify Codes** from the dashboard.
8. Search the issued code and mark it used or voided.

### Executive Dashboard

Main demo path:

1. Open **Executive Dashboard** from the landing screen.
2. Review top KPIs.
3. Review program growth summary.
4. Review redemption operations insight.
5. Review company performance for Sunshine Finance and Sunshine Insurance.

## QA Checklist

Use the included checklist before presenting:

```txt
DEMO_QA_CHECKLIST.md
```

## Demo Data

The app currently uses seeded local data for:

- Customers
- Linked accounts
- Rewards
- Transactions
- Redemptions
- Campaigns
- Admin KPIs
- Executive KPIs

The app-wide demo state is managed in:

```txt
src/context/DemoStateContext.tsx
```

Reward redemptions, redemption codes, staff verification status, and admin point adjustments are added to the local demo ledger during the active app session.

## Install and Run

```bash
pnpm install
pnpm start
```

Run on web:

```bash
pnpm web
```

Run on iOS or Android through Expo:

```bash
pnpm ios
pnpm android
```

If Expo raises a font package version mismatch, run:

```bash
pnpm expo install expo-font
pnpm add @expo-google-fonts/inter
```

## Current Stack

- Expo
- Expo Router
- React Native
- TypeScript
- Inter font package
- Expo Vector Icons
- Local seeded demo data

## Current Demo Limitations

The following are intentionally mocked or not yet production-ready:

- Real authentication
- Password reset email
- SMS or email verification
- Real QR code generation package
- Real Sunshine system integrations
- Real finance or insurance account lookup
- Real payment processing
- Production database persistence
- Server-side point issuance / redemption validation
- Advanced fraud controls
- Full campaign rules engine
- Real reporting exports

## Production Direction

For a production Sunshine MVP, the QHC Loyalty architecture should be adapted into a multi-company financial-services model. See:

```txt
docs/SUNSHINE_PRODUCTION_BLUEPRINT.md
```

Recommended foundation:

- Supabase Auth
- Profiles table
- Companies table
- Linked accounts table
- Points ledger table
- Rewards table
- Redemptions table
- Campaigns/promotions table
- Admin/staff roles
- RLS policies
- Supabase RPC or Edge Functions for point issuance, redemption, and admin adjustment

## Important Demo Scope Rule

Do not add Focal, Sun Oil, Shell, gas station, petroleum, fuel rewards, pump, or station locator examples to this demo unless the client explicitly reverses prior guidance. The current demo should stay focused on Sunshine Finance and Sunshine Insurance.

## Recommended Next Improvements

1. Add real Sunshine Finance and Sunshine Insurance logo assets.
2. Replace the demo QR visual with real QR rendering when moving from demo to MVP.
3. Add a final production app icon and splash screen using approved brand assets.
4. Add an onboarding/account-linking screen before the customer home page.
5. Refine admin dashboard cards and tables for large desktop presentation screens.
6. Add basic persistence for demo changes between refreshes.
7. Run the full QA checklist on web before presenting.
