
export interface Item {
  id: string;
  sapCode: string;
  description: string;
  quantity: number;
}

export interface TransactionData {
  transactionNumber: string;
  items: Item[];
}
