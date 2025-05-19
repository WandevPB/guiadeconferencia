export interface TransactionData {
  transactionNumber: string;
  items: TransactionItem[];
  createdAt: string;
  status: "completed" | "in_progress";
}

export interface TransactionItem {
  sapCode: string;
  description: string;
  quantity: number;
  scannedQuantity: number;
  status: "pending" | "completed" | "error";
  error?: string;
} 