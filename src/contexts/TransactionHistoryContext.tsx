import React, { createContext, useState, useContext, useEffect } from "react";
import { TransactionData } from "@/types";

interface TransactionHistoryContextType {
  transactionHistory: TransactionData[];
  addToHistory: (transaction: TransactionData) => void;
  clearHistory: () => void;
}

const TransactionHistoryContext = createContext<TransactionHistoryContextType>({
  transactionHistory: [],
  addToHistory: () => {},
  clearHistory: () => {},
});

export const useTransactionHistory = () => useContext(TransactionHistoryContext);

const STORAGE_KEY = "transaction_history";
const MAX_HISTORY = 3;

export const TransactionHistoryProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [transactionHistory, setTransactionHistory] = useState<TransactionData[]>([]);

  // Carregar histórico do localStorage ao iniciar
  useEffect(() => {
    const storedHistory = localStorage.getItem(STORAGE_KEY);
    if (storedHistory) {
      try {
        setTransactionHistory(JSON.parse(storedHistory));
      } catch (error) {
        console.error("Erro ao carregar histórico de transações:", error);
        localStorage.removeItem(STORAGE_KEY);
      }
    }
  }, []);

  // Salvar histórico no localStorage quando houver alterações
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(transactionHistory));
  }, [transactionHistory]);

  const addToHistory = (transaction: TransactionData) => {
    setTransactionHistory((prevHistory) => {
      // Remover transação existente com o mesmo número, se houver
      const filteredHistory = prevHistory.filter(
        (t) => t.transactionNumber !== transaction.transactionNumber
      );
      
      // Adicionar nova transação no início do array
      const newHistory = [transaction, ...filteredHistory];
      
      // Manter apenas as últimas 3 transações
      return newHistory.slice(0, MAX_HISTORY);
    });
  };

  const clearHistory = () => {
    setTransactionHistory([]);
    localStorage.removeItem(STORAGE_KEY);
  };

  const value = {
    transactionHistory,
    addToHistory,
    clearHistory,
  };

  return (
    <TransactionHistoryContext.Provider value={value}>
      {children}
    </TransactionHistoryContext.Provider>
  );
}; 