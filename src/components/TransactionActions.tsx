import React from "react";
import { Button } from "@/components/ui/button";
import { useTransaction } from "@/contexts/TransactionContext";
import { useToast } from "@/components/ui/use-toast";
import { useNavigate } from "react-router-dom";

const TransactionActions: React.FC = () => {
  const { currentTransaction, clearTransaction } = useTransaction();
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const handleFinishTransaction = () => {
    if (currentTransaction.items.length === 0) {
      toast({
        title: "Erro",
        description: "Adicione pelo menos um item à transação antes de finalizar.",
        variant: "destructive",
      });
      return;
    }
    
    navigate("/conferencia");
  };
  
  const handleCancelTransaction = () => {
    if (confirm("Tem certeza que deseja cancelar esta transação? Todos os itens serão perdidos.")) {
      clearTransaction();
      navigate("/");
      toast({
        title: "Transação cancelada",
        description: "A transação foi cancelada com sucesso.",
      });
    }
  };
  
  return (
    <div className="flex gap-4 flex-col sm:flex-row">
      <Button
        onClick={() => navigate("/add-item")}
        className="flex-1 bg-brisanet-orange hover:bg-orange-700 text-white"
      >
        Adicionar Novo Item
      </Button>
      <Button
        onClick={handleFinishTransaction}
        className="flex-1 bg-green-600 hover:bg-green-700 text-white"
        disabled={currentTransaction.items.length === 0}
      >
        Finalizar Transação
      </Button>
      <Button
        onClick={handleCancelTransaction}
        className="flex-1 bg-red-600 hover:bg-red-700 text-white"
      >
        Cancelar Transação
      </Button>
    </div>
  );
};

export default TransactionActions;
