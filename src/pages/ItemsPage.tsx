
import React from "react";
import Header from "@/components/Header";
import ItemList from "@/components/ItemList";
import TransactionActions from "@/components/TransactionActions";
import { useTransaction } from "@/contexts/TransactionContext";
import { Navigate } from "react-router-dom";

const ItemsPage = () => {
  const { currentTransaction } = useTransaction();
  
  // If no transaction is started, redirect to home
  if (!currentTransaction.transactionNumber) {
    return <Navigate to="/" />;
  }
  
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold mb-6">
          Transação: {currentTransaction.transactionNumber}
        </h2>
        
        <div className="space-y-6">
          <ItemList />
          <TransactionActions />
        </div>
      </div>
    </div>
  );
};

export default ItemsPage;
