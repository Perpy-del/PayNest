import { v4 as uuidv4 } from 'uuid';
import db from "../../config/database/db.ts"

export const createTransfer = async (data: any) => {
  const [newTransfer] = await db('transfers').insert({
    id: uuidv4(),
    transaction_id: data.transactionId, 
    from_account_id: data.fromAccount,
    to_account_id: data.toAccount
  })

  return newTransfer;
}