import React from "react";
import Header from "@/components/Header";
import TransactionForm from "@/components/TransactionForm";
import { useTransaction } from "@/contexts/TransactionContext";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Index = () => {
  const { currentTransaction } = useTransaction();
  const navigate = useNavigate();
  
  useEffect(() => {
    // If a transaction is already in progress, redirect to items page
    if (currentTransaction.transactionNumber) {
      navigate("/items");
    }
  }, [currentTransaction.transactionNumber, navigate]);
  
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-md mx-auto">
          <h2 className="text-2xl font-bold mb-4 text-center">Sistema de Conferência</h2>
          <p className="text-gray-600 mb-6 text-center">
            Inicie uma nova transação preenchendo o formulário abaixo.
          </p>
          <TransactionForm />
        </div>
      </div>
    </div>
  );
};

export default Index;
