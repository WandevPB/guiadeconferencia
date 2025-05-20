import React, { createContext, useState, useContext } from "react";
import { TransactionData, TransactionItem } from "@/types";
import { useTransactionHistory } from "./TransactionHistoryContext";

interface TransactionContextType {
  currentTransaction: TransactionData;
  addItem: (item: TransactionItem) => void;
  updateItem: (sapCode: string, updates: Partial<TransactionItem>) => void;
  removeItem: (sapCode: string) => void;
  clearTransaction: () => void;
  setTransactionNumber: (number: string) => void;
  loadTransaction: (transaction: TransactionData) => void;
}

const TransactionContext = createContext<TransactionContextType>({
  currentTransaction: {
    transactionNumber: "",
    items: [],
    createdAt: new Date().toISOString(),
    status: "in_progress"
  },
  addItem: () => {},
  updateItem: () => {},
  removeItem: () => {},
  clearTransaction: () => {},
  setTransactionNumber: () => {},
  loadTransaction: () => {},
});

export const useTransaction = () => useContext(TransactionContext);

export const TransactionProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentTransaction, setCurrentTransaction] = useState<TransactionData>({
    transactionNumber: "",
    items: [],
    createdAt: new Date().toISOString(),
    status: "in_progress"
  });

  const { addToHistory } = useTransactionHistory();

  const addItem = (item: TransactionItem) => {
    setCurrentTransaction((prev) => {
      const newTransaction = {
        ...prev,
        items: [...prev.items, item],
      };
      return newTransaction;
    });
  };

  const updateItem = (sapCode: string, updates: Partial<TransactionItem>) => {
    setCurrentTransaction((prev) => {
      const newItems = prev.items.map((item) =>
        item.sapCode === sapCode ? { ...item, ...updates } : item
      );
      const newTransaction = {
      ...prev,
        items: newItems,
      };
      return newTransaction;
    });
  };

  const removeItem = (sapCode: string) => {
    setCurrentTransaction((prev) => {
      const newItems = prev.items.filter((item) => item.sapCode !== sapCode);
      const newTransaction = {
      ...prev,
        items: newItems,
      };
      return newTransaction;
    });
  };

  const clearTransaction = () => {
    const newTransaction = {
      transactionNumber: "",
      items: [],
      createdAt: new Date().toISOString(),
      status: "in_progress"
    };
    setCurrentTransaction(newTransaction);
  };

  const setTransactionNumber = (number: string) => {
    setCurrentTransaction((prev) => {
      const newTransaction = {
      ...prev,
        transactionNumber: number,
      };
      return newTransaction;
    });
  };
  
  // Função para carregar uma transação do histórico
  const loadTransaction = (transaction: TransactionData) => {
    setCurrentTransaction(transaction);
  };

  const value = {
    currentTransaction,
    addItem,
    updateItem,
    removeItem,
    clearTransaction,
    setTransactionNumber,
    loadTransaction,
  };

  return (
    <TransactionContext.Provider value={value}>
      {children}
    </TransactionContext.Provider>
  );
};
