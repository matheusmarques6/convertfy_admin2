// User types
export interface User {
  id: string;
  email: string;
  name: string;
  avatar_url?: string;
  role: 'admin' | 'manager' | 'sdr' | 'closer' | 'cs' | 'finance';
  created_at: string;
}

// Client types
export interface Client {
  id: string;
  name: string;
  company_name?: string;
  cnpj?: string;
  email: string;
  phone?: string;
  whatsapp?: string;
  status: 'active' | 'paused' | 'cancelled' | 'trial';
  health_score: 'healthy' | 'warning' | 'critical';
  contract_type?: string;
  monthly_value: number;
  total_paid: number;
  stores_count: number;
  responsible_id?: string;
  responsible?: User;
  meeting_frequency: 'weekly' | 'biweekly' | 'monthly';
  last_meeting_date?: string;
  next_meeting_date?: string;
  meeting_status: 'on_track' | 'delayed' | 'scheduled';
  contract_start_date?: string;
  contract_end_date?: string;
  tags: string[];
  created_at: string;
  updated_at: string;
}

export interface ClientStore {
  id: string;
  client_id: string;
  name: string;
  shopify_domain: string;
  shopify_access_token?: string;
  is_active: boolean;
  created_at: string;
}

// Financial types
export interface Invoice {
  id: string;
  client_id: string;
  client?: Client;
  amount: number;
  status: 'pending' | 'paid' | 'overdue' | 'cancelled';
  due_date: string;
  paid_date?: string;
  payment_method?: string;
  asaas_id?: string;
  created_at: string;
}

// Meeting types
export interface Meeting {
  id: string;
  client_id: string;
  client?: Client;
  title: string;
  date: string;
  duration_minutes: number;
  status: 'scheduled' | 'completed' | 'cancelled' | 'no_show';
  recording_url?: string;
  notes?: string;
  created_by_id: string;
  created_at: string;
}

// Report types
export interface Report {
  id: string;
  client_id: string;
  client?: Client;
  month: string; // YYYY-MM format
  file_url?: string;
  metrics: Record<string, number>;
  notes?: string;
  status: 'pending' | 'delivered';
  delivered_at?: string;
  created_at: string;
}

// Pipeline types
export interface Pipeline {
  id: string;
  name: string;
  stages: PipelineStage[];
  is_default: boolean;
  created_at: string;
}

export interface PipelineStage {
  id: string;
  pipeline_id: string;
  name: string;
  color: string;
  order: number;
  deals_count: number;
  deals_value: number;
}

export interface Deal {
  id: string;
  pipeline_id: string;
  stage_id: string;
  title: string;
  company_name?: string;
  contact_name?: string;
  contact_email?: string;
  contact_phone?: string;
  value: number;
  probability: number;
  expected_close_date?: string;
  responsible_id?: string;
  responsible?: User;
  notes?: string;
  tags: string[];
  created_at: string;
  updated_at: string;
}

// Automation types
export interface Automation {
  id: string;
  name: string;
  description?: string;
  is_active: boolean;
  trigger_type: TriggerType;
  trigger_config: Record<string, unknown>;
  nodes: AutomationNode[];
  executions_count: number;
  last_execution?: string;
  created_at: string;
  updated_at: string;
}

export type TriggerType = 
  | 'new_client'
  | 'client_status_changed'
  | 'payment_received'
  | 'payment_overdue'
  | 'meeting_scheduled'
  | 'meeting_delayed'
  | 'report_pending'
  | 'contract_expiring'
  | 'deal_stage_changed'
  | 'deal_won'
  | 'deal_lost'
  | 'scheduled'
  | 'webhook';

export type ActionType =
  | 'send_email'
  | 'send_whatsapp'
  | 'send_sms'
  | 'create_task'
  | 'notification'
  | 'update_field'
  | 'add_tag'
  | 'remove_tag'
  | 'create_invoice'
  | 'webhook'
  | 'delay';

export interface AutomationNode {
  id: string;
  type: 'trigger' | 'condition' | 'action' | 'delay';
  action_type?: ActionType;
  config: Record<string, unknown>;
  position: { x: number; y: number };
  next_nodes: string[];
}

// Dashboard metrics
export interface DashboardMetrics {
  revenue: {
    current_month: number;
    previous_month: number;
    mrr: number;
    pending: number;
    overdue: number;
  };
  clients: {
    total: number;
    active: number;
    new_this_month: number;
    churn_this_month: number;
  };
  meetings: {
    scheduled: number;
    completed_this_month: number;
    delayed: number;
  };
  reports: {
    pending: number;
    delivered_this_month: number;
  };
  pipeline: {
    total_value: number;
    deals_count: number;
    won_this_month: number;
    conversion_rate: number;
  };
}

// Tags
export interface Tag {
  id: string;
  name: string;
  color: string;
  category?: string;
}

// Activity/Timeline
export interface Activity {
  id: string;
  client_id?: string;
  deal_id?: string;
  type: 'meeting' | 'payment' | 'report' | 'note' | 'status_change' | 'automation';
  title: string;
  description?: string;
  metadata?: Record<string, unknown>;
  created_by_id?: string;
  created_by?: User;
  created_at: string;
}

// Settings
export interface Integration {
  id: string;
  type: 'asaas' | 'meta_ads' | 'google_ads' | 'klaviyo' | 'shopify' | 'instagram' | 'whatsapp' | 'google_calendar';
  name: string;
  is_connected: boolean;
  config?: Record<string, unknown>;
  last_sync?: string;
  error_message?: string;
}
