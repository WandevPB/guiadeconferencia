
import React from "react";
import Header from "@/components/Header";
import ItemForm from "@/components/ItemForm";
import { Button } from "@/components/ui/button";
import { useTransaction } from "@/contexts/TransactionContext";
import { Navigate, useNavigate } from "react-router-dom";

const AddItemPage = () => {
  const { currentTransaction } = useTransaction();
  const navigate = useNavigate();
  
  // If no transaction is started, redirect to home
  if (!currentTransaction.transactionNumber) {
    return <Navigate to="/" />;
  }
  
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">
            Adicionar Item à Transação: {currentTransaction.transactionNumber}
          </h2>
          <Button 
            variant="outline" 
            onClick={() => navigate("/items")}
          >
            Voltar para Itens
          </Button>
        </div>
        
        <div className="max-w-md mx-auto">
          <ItemForm />
        </div>
      </div>
    </div>
  );
};

export default AddItemPage;
