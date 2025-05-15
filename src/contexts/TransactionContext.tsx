import React, { createContext, useState, useContext } from "react";
import { Item, TransactionData } from "../types";
import { v4 as uuidv4 } from "uuid";
import { useToast } from "@/components/ui/use-toast";

interface TransactionContextType {
  currentTransaction: TransactionData;
  setTransactionNumber: (number: string) => void;
  addItem: (item: Omit<Item, "id">) => void;
  updateItem: (item: Item) => void;
  removeItem: (id: string) => void;
  resetTransaction: () => void;
}

const TransactionContext = createContext<TransactionContextType>({
  currentTransaction: { transactionNumber: "", items: [] },
  setTransactionNumber: () => {},
  addItem: () => {},
  updateItem: () => {},
  removeItem: () => {},
  resetTransaction: () => {},
});

export const useTransaction = () => useContext(TransactionContext);

export const TransactionProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { toast } = useToast();
  const [currentTransaction, setCurrentTransaction] = useState<TransactionData>({
    transactionNumber: "",
    items: [],
  });

  const setTransactionNumber = (number: string) => {
    setCurrentTransaction((prev) => ({ ...prev, transactionNumber: number }));
  };

  const addItem = (item: Omit<Item, "id">) => {
    const newItem = { ...item, id: uuidv4() };
    setCurrentTransaction((prev) => ({
      ...prev,
      items: [...prev.items, newItem],
    }));
    toast({
      title: "Item adicionado",
      description: `${item.sapCode} - ${item.description} foi adicionado à transação.`,
    });
  };

  const updateItem = (item: Item) => {
    setCurrentTransaction((prev) => ({
      ...prev,
      items: prev.items.map((i) => (i.id === item.id ? item : i)),
    }));
    toast({
      title: "Item atualizado",
      description: `${item.sapCode} - ${item.description} foi atualizado.`,
    });
  };

  const removeItem = (id: string) => {
    const itemToRemove = currentTransaction.items.find(item => item.id === id);
    setCurrentTransaction((prev) => ({
      ...prev,
      items: prev.items.filter((item) => item.id !== id),
    }));
    if (itemToRemove) {
      toast({
        title: "Item removido",
        description: `${itemToRemove.sapCode} - ${itemToRemove.description} foi removido da transação.`,
        variant: "destructive",
      });
    }
  };

  const resetTransaction = () => {
    setCurrentTransaction({ transactionNumber: "", items: [] });
  };

  const value = {
    currentTransaction,
    setTransactionNumber,
    addItem,
    updateItem,
    removeItem,
    resetTransaction,
  };

  return <TransactionContext.Provider value={value}>{children}</TransactionContext.Provider>;
};
