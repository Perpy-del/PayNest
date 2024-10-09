export interface Transaction {
  id?: string;
  user_id: string;
  account_id: string | number;
  amount: number;
  type: string;
  status: string;
  description: string;
  reference: string;
  transaction_date: string | Date;
  source: string;
  created_at: string;
  updated_at: string;
}

export interface TransactionDTO {
  accountId: string | number;
  amount: number;
  description: string;
  reference: string;
}
