
-- ─── Enums ────────────────────────────────────────────────────────────────────
CREATE TYPE tier AS ENUM ('Bronze', 'Silver', 'Gold', 'Platinum');
CREATE TYPE transaction_type AS ENUM ('earned', 'redeemed', 'pending', 'expired', 'adjustment');
CREATE TYPE transaction_status AS ENUM ('completed', 'pending', 'reversed', 'expired');
CREATE TYPE redemption_status AS ENUM ('issued', 'used', 'voided', 'expired');
CREATE TYPE campaign_status AS ENUM ('draft', 'active', 'paused', 'expired');

-- ─── Companies ────────────────────────────────────────────────────────────────
CREATE TABLE companies (
  id          TEXT PRIMARY KEY,
  name        TEXT NOT NULL,
  description TEXT NOT NULL DEFAULT '',
  logo        TEXT NOT NULL DEFAULT '',
  image_url   TEXT,
  accent_color TEXT NOT NULL DEFAULT '#000000',
  is_active   BOOLEAN NOT NULL DEFAULT true,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE companies ENABLE ROW LEVEL SECURITY;

CREATE POLICY "select_companies" ON companies FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "insert_companies" ON companies FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "update_companies" ON companies FOR UPDATE TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "delete_companies" ON companies FOR DELETE TO authenticated USING (true);

-- ─── Customers ────────────────────────────────────────────────────────────────
CREATE TABLE customers (
  id                  TEXT PRIMARY KEY,
  name                TEXT NOT NULL,
  email               TEXT NOT NULL,
  phone               TEXT NOT NULL DEFAULT '',
  tier                tier NOT NULL DEFAULT 'Bronze',
  points              INTEGER NOT NULL DEFAULT 0,
  points_to_next_tier INTEGER NOT NULL DEFAULT 1000,
  next_tier           tier,
  join_date           DATE NOT NULL DEFAULT CURRENT_DATE,
  created_at          TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE customers ENABLE ROW LEVEL SECURITY;

CREATE POLICY "select_customers" ON customers FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "insert_customers" ON customers FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "update_customers" ON customers FOR UPDATE TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "delete_customers" ON customers FOR DELETE TO authenticated USING (true);

-- ─── Linked Accounts ──────────────────────────────────────────────────────────
CREATE TABLE linked_accounts (
  id             BIGSERIAL PRIMARY KEY,
  customer_id    TEXT NOT NULL REFERENCES customers(id) ON DELETE CASCADE,
  company_id     TEXT NOT NULL REFERENCES companies(id) ON DELETE CASCADE,
  company_name   TEXT NOT NULL,
  account_number TEXT NOT NULL,
  linked_date    DATE NOT NULL DEFAULT CURRENT_DATE,
  created_at     TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE linked_accounts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "select_linked_accounts" ON linked_accounts FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "insert_linked_accounts" ON linked_accounts FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "update_linked_accounts" ON linked_accounts FOR UPDATE TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "delete_linked_accounts" ON linked_accounts FOR DELETE TO authenticated USING (true);

-- ─── Rewards ──────────────────────────────────────────────────────────────────
CREATE TABLE rewards (
  id           TEXT PRIMARY KEY,
  title        TEXT NOT NULL,
  description  TEXT NOT NULL DEFAULT '',
  points_cost  INTEGER NOT NULL DEFAULT 0,
  company_id   TEXT NOT NULL REFERENCES companies(id) ON DELETE CASCADE,
  company_name TEXT NOT NULL,
  category     TEXT NOT NULL DEFAULT '',
  expiry_date  DATE NOT NULL,
  is_available BOOLEAN NOT NULL DEFAULT true,
  image_url    TEXT,
  created_at   TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE rewards ENABLE ROW LEVEL SECURITY;

CREATE POLICY "select_rewards" ON rewards FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "insert_rewards" ON rewards FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "update_rewards" ON rewards FOR UPDATE TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "delete_rewards" ON rewards FOR DELETE TO authenticated USING (true);

-- ─── Transactions ─────────────────────────────────────────────────────────────
CREATE TABLE transactions (
  id           TEXT PRIMARY KEY,
  customer_id  TEXT NOT NULL REFERENCES customers(id) ON DELETE CASCADE,
  company_id   TEXT NOT NULL REFERENCES companies(id) ON DELETE CASCADE,
  company_name TEXT NOT NULL,
  type         transaction_type NOT NULL,
  points       INTEGER NOT NULL DEFAULT 0,
  description  TEXT NOT NULL DEFAULT '',
  reference    TEXT NOT NULL DEFAULT '',
  date         DATE NOT NULL DEFAULT CURRENT_DATE,
  status       transaction_status NOT NULL DEFAULT 'completed',
  created_at   TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE transactions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "select_transactions" ON transactions FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "insert_transactions" ON transactions FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "update_transactions" ON transactions FOR UPDATE TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "delete_transactions" ON transactions FOR DELETE TO authenticated USING (true);

-- ─── Redemptions ──────────────────────────────────────────────────────────────
CREATE TABLE redemptions (
  id            TEXT PRIMARY KEY,
  customer_id   TEXT NOT NULL REFERENCES customers(id) ON DELETE CASCADE,
  customer_name TEXT NOT NULL,
  reward_id     TEXT NOT NULL REFERENCES rewards(id) ON DELETE CASCADE,
  reward_title  TEXT NOT NULL,
  company_id    TEXT NOT NULL REFERENCES companies(id) ON DELETE CASCADE,
  company_name  TEXT NOT NULL,
  points_used   INTEGER NOT NULL DEFAULT 0,
  code          TEXT NOT NULL UNIQUE,
  status        redemption_status NOT NULL DEFAULT 'issued',
  issued_at     TIMESTAMPTZ NOT NULL DEFAULT now(),
  used_at       TIMESTAMPTZ,
  void_reason   TEXT,
  created_at    TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE redemptions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "select_redemptions" ON redemptions FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "insert_redemptions" ON redemptions FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "update_redemptions" ON redemptions FOR UPDATE TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "delete_redemptions" ON redemptions FOR DELETE TO authenticated USING (true);

-- ─── Campaigns ────────────────────────────────────────────────────────────────
CREATE TABLE campaigns (
  id               TEXT PRIMARY KEY,
  name             TEXT NOT NULL,
  company_id       TEXT NOT NULL REFERENCES companies(id) ON DELETE CASCADE,
  company_name     TEXT NOT NULL,
  reward_type      TEXT NOT NULL DEFAULT '',
  start_date       DATE NOT NULL,
  end_date         DATE NOT NULL,
  points_required  INTEGER NOT NULL DEFAULT 0,
  description      TEXT NOT NULL DEFAULT '',
  status           campaign_status NOT NULL DEFAULT 'draft',
  eligibility      TEXT NOT NULL DEFAULT 'All tiers',
  created_at       TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE campaigns ENABLE ROW LEVEL SECURITY;

CREATE POLICY "select_campaigns" ON campaigns FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "insert_campaigns" ON campaigns FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "update_campaigns" ON campaigns FOR UPDATE TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "delete_campaigns" ON campaigns FOR DELETE TO authenticated USING (true);
