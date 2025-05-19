import React from "react";
import Header from "@/components/Header";
import TransactionForm from "@/components/TransactionForm";
import { useTransaction } from "@/contexts/TransactionContext";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useTransactionHistory } from "@/contexts/TransactionHistoryContext";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

const Index = () => {
  const { currentTransaction, loadTransaction } = useTransaction();
  const navigate = useNavigate();
  const { transactionHistory } = useTransactionHistory();
  
  useEffect(() => {
    // If a transaction is already in progress, redirect to items page
    if (currentTransaction.transactionNumber) {
      navigate("/items");
    }
  }, [currentTransaction.transactionNumber, navigate]);

  const handleViewTransaction = (transaction: any) => {
    // Carregar a transação do histórico
    loadTransaction(transaction);
    // Navegar para a página de conferência
    navigate("/conferencia");
  };

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
        
        {/* Histórico de Transações */}
        {transactionHistory.length > 0 && (
          <div className="max-w-2xl mx-auto mt-8">
            <Card>
              <CardHeader>
                <CardTitle>Histórico de Transações</CardTitle>
                <CardDescription>
                  Últimas 3 transações realizadas
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {transactionHistory.map((transaction) => (
                    <Card 
                      key={transaction.transactionNumber} 
                      className="cursor-pointer hover:bg-accent/50 transition-colors" 
                      onClick={() => handleViewTransaction(transaction)}
                    >
                      <CardContent className="p-4">
                        <div className="flex justify-between items-center">
                          <div>
                            <p className="font-medium">Transação #{transaction.transactionNumber}</p>
                            <p className="text-sm text-muted-foreground">
                              {transaction.createdAt ? format(new Date(transaction.createdAt), "dd 'de' MMMM 'de' yyyy 'às' HH:mm", { locale: ptBR }) : "Data não disponível"}
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="font-medium">{transaction.items.length} itens</p>
                            <p className="text-sm text-muted-foreground">
                              {transaction.status === "completed" ? "Concluída" : "Em andamento"}
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;
