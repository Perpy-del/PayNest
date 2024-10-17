export interface Account {
  account_id?: string;
  user_id?: string;
  balance: string | number;
  is_default?: boolean;
  created_at?: string;
  updated_at?: string;
}
