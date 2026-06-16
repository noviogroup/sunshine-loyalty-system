# Sunshine Rewards Demo QA Checklist

Use this checklist before presenting the Sunshine Rewards demo.

## 1. Start App

```bash
pnpm install
pnpm web
```

Expected:

- App opens to the Sunshine Rewards landing screen.
- Buttons display for Customer Demo, Admin Portal, and Executive Dashboard.
- Inter font loads without missing-font errors.

## 2. Customer Sign-In Flow

1. Click **Start Customer Demo**.
2. Confirm the login screen opens.
3. Confirm Alicia Rolle demo credentials are pre-filled.
4. Click **Sign In**.

Expected:

- Customer home screen opens.
- Points balance displays.
- Tier badge displays.
- Quick actions display: Redeem, My Card, Companies, Activity.

## 3. Customer Member Card

1. Open **Card** tab or **My Card** quick action.

Expected:

- Sunshine Rewards member card displays.
- QR-style visual displays.
- Member name displays.
- Member ID displays.
- Available points and tier display.
- Linked companies display Sunshine Finance and Sunshine Insurance.

## 4. Customer Redemption Flow

1. Open **Offers**.
2. Select an available reward.
3. Confirm redemption.
4. Copy or remember the redemption code shown on the success screen.
5. Open **Activity**.

Expected:

- Redemption success screen appears.
- Redemption code starts with `SHL-FIN` or `SHL-INS`.
- Points balance is reduced by the reward cost.
- Activity list includes the redeemed reward.

## 5. Admin Dashboard Flow

1. Return to landing screen.
2. Open **Admin Portal**.

Expected:

- Desktop admin shell appears on wider screens.
- Left sidebar displays Dashboard, Customers, Campaigns, Redemptions, Transactions.
- Admin dashboard shows KPI cards.
- Redemption Queue card appears.
- If a customer redemption was completed, the queue shows at least one code.

## 6. Admin Redemption Verification

1. Click **Verify Codes** from the dashboard or open **Redemptions** from sidebar.
2. Search for the redemption code from the customer flow.
3. Click **Mark Used**.

Expected:

- Redemption appears in the list.
- Search filters to the matching code.
- Status changes from Issued to Used.
- Dashboard Redemption Queue updates used/issued counts when returning to Dashboard.

## 7. Admin Customer Flow

1. Open **Customers**.
2. Select Alicia Rolle.
3. Use **Adjust Points**.
4. Add a small number of points with a reason.

Expected:

- Customer detail opens.
- Linked accounts display.
- Points adjustment modal opens.
- After saving, a new admin adjustment transaction appears.
- Customer points update in the current demo session.

## 8. Executive Dashboard Flow

1. Return to landing screen.
2. Open **Executive Dashboard**.

Expected:

- KPI cards display.
- Growth chart displays.
- Company performance shows Sunshine Finance and Sunshine Insurance only.
- No Focal, Sun Oil, Shell, gas station, petroleum, pump, or fuel references appear.

## 9. Demo Scope Check

Confirm no restricted company/fuel examples are visible:

- Focal
- Sun Oil
- Shell
- Gas station
- Petroleum
- Fuel rewards
- Pump
- Station locator

## 10. Known Demo Limitations

This is still a presentation demo. The following are intentionally mocked:

- Real authentication
- Real QR generation package
- Production database persistence
- Real account lookup
- Server-side point issuance/redemption validation
- Real staff/cashier validation
- Finance or Insurance system integrations
