export interface Transaction {
  user_id?: string;
  account_id?: string | number | undefined;
  transactionId?: string;
  accountId?: string | number;
  amount: string | number;
  type?: string;
  status?: string;
  description?: string;
  reference: string;
  transactionDate?: string | Date;
  source?: string;
  created_at?: string;
  updated_at?: string;
}
