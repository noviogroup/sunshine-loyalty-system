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
app/(admin)/_layout.tsx
```

## Demo Areas

### Customer App

Main demo path:

1. Open the app landing screen.
2. Select **Start Customer Demo**.
3. Sign in with the seeded Alicia Rolle demo account.
4. View points balance, membership tier, linked companies, and recent activity.
5. Open **Offers**.
6. Redeem an available reward.
7. View the redemption success screen.
8. Open **Activity** to confirm the new redemption appears.

### Admin Portal

Main demo path:

1. Open **Admin Portal** from the landing screen.
2. Review the desktop-style left navigation, top utility bar, KPI cards, and recent transactions.
3. Open **Customers**.
4. Search or select a customer.
5. View linked accounts, points balance, and recent transactions.
6. Use **Adjust Points** to demonstrate an audited admin adjustment.

### Executive Dashboard

Main demo path:

1. Open **Executive Dashboard** from the landing screen.
2. Review top KPIs.
3. Review program growth summary.
4. Review company performance for Sunshine Finance and Sunshine Insurance.

## Demo Data

The app currently uses seeded local data for:

- Customers
- Linked accounts
- Rewards
- Transactions
- Campaigns
- Admin KPIs
- Executive KPIs

The app-wide demo state is managed in:

```txt
src/context/DemoStateContext.tsx
```

Reward redemptions and admin point adjustments are added to the local demo transaction ledger during the active app session.

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
- Real Sunshine system integrations
- Real finance or insurance account lookup
- Real payment processing
- Production database persistence
- Advanced fraud controls
- Full campaign rules engine
- Real reporting exports

## Important Demo Scope Rule

Do not add Focal, Sun Oil, Shell, gas station, petroleum, fuel rewards, pump, or station locator examples to this demo unless the client explicitly reverses prior guidance. The current demo should stay focused on Sunshine Finance and Sunshine Insurance.

## Recommended Next Improvements

1. Add real Sunshine Finance and Sunshine Insurance logo assets.
2. Add a final production app icon and splash screen using approved brand assets.
3. Add an onboarding/account-linking screen before the customer home page.
4. Refine admin dashboard cards and tables for large desktop presentation screens.
5. Add basic persistence for demo changes between refreshes.
6. Add QA script for the full 5-7 minute meeting walkthrough.
