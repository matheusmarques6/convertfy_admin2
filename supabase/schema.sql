-- =============================================
-- CONVERTFY ADMIN - DATABASE SCHEMA
-- =============================================

-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- =============================================
-- 1. USERS AND PERMISSIONS
-- =============================================

-- Roles
CREATE TABLE roles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(50) NOT NULL UNIQUE,
  description TEXT,
  permissions JSONB DEFAULT '[]',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert default roles
INSERT INTO roles (name, description, permissions) VALUES
  ('admin', 'Acesso total ao sistema', '["*"]'),
  ('manager', 'Gestão de equipe e clientes', '["clients.*", "pipeline.*", "metrics.*", "reports.*"]'),
  ('sdr', 'Prospecção e qualificação', '["leads.*", "pipeline.view", "pipeline.create"]'),
  ('closer', 'Fechamento de vendas', '["pipeline.*", "clients.view", "meetings.*"]'),
  ('cs', 'Sucesso do cliente', '["clients.*", "meetings.*", "reports.*", "metrics.view"]'),
  ('finance', 'Financeiro', '["invoices.*", "payments.*", "clients.view"]');

-- Users
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email VARCHAR(255) NOT NULL UNIQUE,
  name VARCHAR(255) NOT NULL,
  avatar_url TEXT,
  role_id UUID REFERENCES roles(id),
  is_active BOOLEAN DEFAULT true,
  last_login TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =============================================
-- 2. CLIENTS
-- =============================================

-- Clients
CREATE TABLE clients (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(255) NOT NULL,
  company_name VARCHAR(255),
  cnpj VARCHAR(20),
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(20),
  whatsapp VARCHAR(20),
  status VARCHAR(20) DEFAULT 'active' CHECK (status IN ('active', 'paused', 'cancelled', 'trial')),
  health_score VARCHAR(20) DEFAULT 'healthy' CHECK (health_score IN ('healthy', 'warning', 'critical')),
  contract_type VARCHAR(50),
  monthly_value DECIMAL(10, 2) DEFAULT 0,
  total_paid DECIMAL(12, 2) DEFAULT 0,
  responsible_id UUID REFERENCES users(id),
  meeting_frequency VARCHAR(20) DEFAULT 'monthly' CHECK (meeting_frequency IN ('weekly', 'biweekly', 'monthly')),
  last_meeting_date DATE,
  next_meeting_date DATE,
  meeting_status VARCHAR(20) DEFAULT 'on_track' CHECK (meeting_status IN ('on_track', 'delayed', 'scheduled')),
  contract_start_date DATE,
  contract_end_date DATE,
  notes TEXT,
  custom_fields JSONB DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Client Stores (Shopify)
CREATE TABLE client_stores (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  client_id UUID REFERENCES clients(id) ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL,
  shopify_domain VARCHAR(255),
  shopify_access_token TEXT,
  is_active BOOLEAN DEFAULT true,
  last_sync TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tags
CREATE TABLE tags (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(50) NOT NULL UNIQUE,
  color VARCHAR(7) DEFAULT '#8B5CF6',
  category VARCHAR(50),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Client Tags (many-to-many)
CREATE TABLE client_tags (
  client_id UUID REFERENCES clients(id) ON DELETE CASCADE,
  tag_id UUID REFERENCES tags(id) ON DELETE CASCADE,
  PRIMARY KEY (client_id, tag_id)
);

-- =============================================
-- 3. FINANCIAL
-- =============================================

-- Invoices
CREATE TABLE invoices (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  client_id UUID REFERENCES clients(id) ON DELETE CASCADE,
  amount DECIMAL(10, 2) NOT NULL,
  status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'paid', 'overdue', 'cancelled')),
  due_date DATE NOT NULL,
  paid_date DATE,
  payment_method VARCHAR(50),
  asaas_id VARCHAR(100),
  asaas_payment_link TEXT,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =============================================
-- 4. MEETINGS
-- =============================================

-- Meetings
CREATE TABLE meetings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  client_id UUID REFERENCES clients(id) ON DELETE CASCADE,
  title VARCHAR(255) NOT NULL,
  scheduled_date TIMESTAMP WITH TIME ZONE NOT NULL,
  duration_minutes INTEGER DEFAULT 60,
  status VARCHAR(20) DEFAULT 'scheduled' CHECK (status IN ('scheduled', 'completed', 'cancelled', 'no_show')),
  recording_url TEXT,
  notes TEXT,
  google_event_id VARCHAR(255),
  created_by_id UUID REFERENCES users(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =============================================
-- 5. REPORTS
-- =============================================

-- Reports
CREATE TABLE reports (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  client_id UUID REFERENCES clients(id) ON DELETE CASCADE,
  month VARCHAR(7) NOT NULL, -- YYYY-MM format
  file_url TEXT,
  metrics JSONB DEFAULT '{}',
  notes TEXT,
  status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'delivered')),
  delivered_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =============================================
-- 6. PIPELINE
-- =============================================

-- Pipelines
CREATE TABLE pipelines (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(100) NOT NULL,
  is_default BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Pipeline Stages
CREATE TABLE pipeline_stages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  pipeline_id UUID REFERENCES pipelines(id) ON DELETE CASCADE,
  name VARCHAR(100) NOT NULL,
  color VARCHAR(7) DEFAULT '#8B5CF6',
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Deals
CREATE TABLE deals (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  pipeline_id UUID REFERENCES pipelines(id) ON DELETE CASCADE,
  stage_id UUID REFERENCES pipeline_stages(id),
  title VARCHAR(255) NOT NULL,
  company_name VARCHAR(255),
  contact_name VARCHAR(255),
  contact_email VARCHAR(255),
  contact_phone VARCHAR(50),
  value DECIMAL(10, 2) DEFAULT 0,
  probability INTEGER DEFAULT 0 CHECK (probability >= 0 AND probability <= 100),
  expected_close_date DATE,
  responsible_id UUID REFERENCES users(id),
  notes TEXT,
  custom_fields JSONB DEFAULT '{}',
  won_at TIMESTAMP WITH TIME ZONE,
  lost_at TIMESTAMP WITH TIME ZONE,
  lost_reason TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =============================================
-- 7. AUTOMATIONS
-- =============================================

-- Automations
CREATE TABLE automations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(255) NOT NULL,
  description TEXT,
  is_active BOOLEAN DEFAULT false,
  trigger_type VARCHAR(50) NOT NULL,
  trigger_config JSONB DEFAULT '{}',
  nodes JSONB DEFAULT '[]',
  executions_count INTEGER DEFAULT 0,
  last_execution TIMESTAMP WITH TIME ZONE,
  created_by_id UUID REFERENCES users(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Automation Logs
CREATE TABLE automation_logs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  automation_id UUID REFERENCES automations(id) ON DELETE CASCADE,
  client_id UUID REFERENCES clients(id),
  deal_id UUID REFERENCES deals(id),
  status VARCHAR(20) DEFAULT 'success' CHECK (status IN ('success', 'error', 'skipped')),
  executed_nodes JSONB DEFAULT '[]',
  error_message TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =============================================
-- 8. TEMPLATES
-- =============================================

-- Email Templates
CREATE TABLE email_templates (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(255) NOT NULL,
  subject VARCHAR(500) NOT NULL,
  body TEXT NOT NULL,
  variables JSONB DEFAULT '[]',
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- WhatsApp Templates
CREATE TABLE whatsapp_templates (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(255) NOT NULL,
  content TEXT NOT NULL,
  variables JSONB DEFAULT '[]',
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =============================================
-- 9. ACTIVITIES / TIMELINE
-- =============================================

-- Activities
CREATE TABLE activities (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  client_id UUID REFERENCES clients(id) ON DELETE CASCADE,
  deal_id UUID REFERENCES deals(id) ON DELETE CASCADE,
  type VARCHAR(50) NOT NULL,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  metadata JSONB DEFAULT '{}',
  created_by_id UUID REFERENCES users(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =============================================
-- 10. INTEGRATIONS
-- =============================================

-- Integration Configs (per client)
CREATE TABLE client_integrations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  client_id UUID REFERENCES clients(id) ON DELETE CASCADE,
  integration_type VARCHAR(50) NOT NULL,
  config JSONB DEFAULT '{}',
  is_active BOOLEAN DEFAULT true,
  last_sync TIMESTAMP WITH TIME ZONE,
  error_message TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(client_id, integration_type)
);

-- Metrics Cache
CREATE TABLE metrics_cache (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  client_id UUID REFERENCES clients(id) ON DELETE CASCADE,
  store_id UUID REFERENCES client_stores(id) ON DELETE CASCADE,
  source VARCHAR(50) NOT NULL, -- shopify, meta_ads, google_ads, klaviyo, instagram
  period_start DATE NOT NULL,
  period_end DATE NOT NULL,
  metrics JSONB NOT NULL,
  fetched_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(client_id, store_id, source, period_start, period_end)
);

-- =============================================
-- 11. SETTINGS
-- =============================================

-- System Settings
CREATE TABLE settings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  key VARCHAR(100) NOT NULL UNIQUE,
  value JSONB NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert default settings
INSERT INTO settings (key, value) VALUES
  ('company', '{"name": "Convertfy", "logo_url": null}'),
  ('goals', '{"monthly_revenue": 100000, "new_clients": 8, "leads": 200, "conversion_rate": 35}'),
  ('notifications', '{"email": true, "whatsapp": true, "slack": false}');

-- =============================================
-- ROW LEVEL SECURITY (RLS)
-- =============================================

-- Enable RLS
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE clients ENABLE ROW LEVEL SECURITY;
ALTER TABLE invoices ENABLE ROW LEVEL SECURITY;
ALTER TABLE meetings ENABLE ROW LEVEL SECURITY;
ALTER TABLE deals ENABLE ROW LEVEL SECURITY;
ALTER TABLE automations ENABLE ROW LEVEL SECURITY;

-- Policies (example - adjust based on your auth setup)
CREATE POLICY "Users can view their own profile" ON users
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Authenticated users can view clients" ON clients
  FOR SELECT USING (auth.role() = 'authenticated');

-- =============================================
-- INDEXES
-- =============================================

CREATE INDEX idx_clients_status ON clients(status);
CREATE INDEX idx_clients_health_score ON clients(health_score);
CREATE INDEX idx_clients_responsible ON clients(responsible_id);
CREATE INDEX idx_invoices_client ON invoices(client_id);
CREATE INDEX idx_invoices_status ON invoices(status);
CREATE INDEX idx_invoices_due_date ON invoices(due_date);
CREATE INDEX idx_meetings_client ON meetings(client_id);
CREATE INDEX idx_meetings_date ON meetings(scheduled_date);
CREATE INDEX idx_deals_pipeline ON deals(pipeline_id);
CREATE INDEX idx_deals_stage ON deals(stage_id);
CREATE INDEX idx_activities_client ON activities(client_id);
CREATE INDEX idx_activities_created ON activities(created_at DESC);
CREATE INDEX idx_automation_logs_automation ON automation_logs(automation_id);
CREATE INDEX idx_metrics_cache_client ON metrics_cache(client_id);

-- =============================================
-- FUNCTIONS
-- =============================================

-- Update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_clients_updated_at BEFORE UPDATE ON clients
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_invoices_updated_at BEFORE UPDATE ON invoices
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_deals_updated_at BEFORE UPDATE ON deals
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_automations_updated_at BEFORE UPDATE ON automations
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Calculate client health score
CREATE OR REPLACE FUNCTION calculate_client_health_score(client_uuid UUID)
RETURNS VARCHAR(20) AS $$
DECLARE
  score INTEGER := 100;
  meeting_delay INTEGER;
  overdue_invoices INTEGER;
BEGIN
  -- Check meeting delay
  SELECT EXTRACT(DAY FROM NOW() - last_meeting_date)::INTEGER
  INTO meeting_delay
  FROM clients WHERE id = client_uuid;
  
  IF meeting_delay > 60 THEN
    score := score - 40;
  ELSIF meeting_delay > 30 THEN
    score := score - 20;
  END IF;
  
  -- Check overdue invoices
  SELECT COUNT(*)
  INTO overdue_invoices
  FROM invoices
  WHERE client_id = client_uuid
    AND status = 'overdue';
  
  IF overdue_invoices > 2 THEN
    score := score - 40;
  ELSIF overdue_invoices > 0 THEN
    score := score - 20;
  END IF;
  
  IF score >= 70 THEN
    RETURN 'healthy';
  ELSIF score >= 40 THEN
    RETURN 'warning';
  ELSE
    RETURN 'critical';
  END IF;
END;
$$ LANGUAGE plpgsql;

-- Insert default pipeline
INSERT INTO pipelines (name, is_default) VALUES ('Vendas', true);

INSERT INTO pipeline_stages (pipeline_id, name, color, sort_order) 
SELECT id, 'Leads', '#71717A', 1 FROM pipelines WHERE name = 'Vendas'
UNION ALL
SELECT id, 'Qualificados', '#3B82F6', 2 FROM pipelines WHERE name = 'Vendas'
UNION ALL
SELECT id, 'Reunião Agendada', '#8B5CF6', 3 FROM pipelines WHERE name = 'Vendas'
UNION ALL
SELECT id, 'Proposta Enviada', '#F59E0B', 4 FROM pipelines WHERE name = 'Vendas'
UNION ALL
SELECT id, 'Negociação', '#06B6D4', 5 FROM pipelines WHERE name = 'Vendas'
UNION ALL
SELECT id, 'Fechado', '#22C55E', 6 FROM pipelines WHERE name = 'Vendas';
