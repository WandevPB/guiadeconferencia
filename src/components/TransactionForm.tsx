import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useTransaction } from "@/contexts/TransactionContext";
import { useToast } from "@/components/ui/use-toast";

const TransactionForm: React.FC = () => {
  const [transactionNumber, setTransactionNumber] = useState("");
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  const { setTransactionNumber: setContextTransactionNumber, setTransactionDetails } = useTransaction();
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!transactionNumber.trim()) {
      toast({
        title: "Erro",
        description: "Número da transação é obrigatório.",
        variant: "destructive",
      });
      return;
    }
    
    if (!origin.trim() || !destination.trim()) {
      toast({
        title: "Erro",
        description: "Campos ORIGEM e DESTINO são obrigatórios.",
        variant: "destructive",
      });
      return;
    }
    
    setContextTransactionNumber(transactionNumber);
    setTransactionDetails(origin, destination);
    
    toast({
      title: "Transação iniciada",
      description: `Transação ${transactionNumber} foi iniciada.`,
    });
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Iniciar Nova Transação</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="transactionNumber" className="font-bold">
              NÚMERO DA TRANSAÇÃO
            </Label>
            <Input
              id="transactionNumber"
              placeholder="Digite o número da transação"
              value={transactionNumber}
              onChange={(e) => setTransactionNumber(e.target.value.toUpperCase())}
              className="border-2 border-gray-300"
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="origin" className="font-bold">
              ORIGEM
            </Label>
            <Input
              id="origin"
              placeholder="Digite a origem do material"
              value={origin}
              onChange={(e) => setOrigin(e.target.value.toUpperCase())}
              className="border-2 border-gray-300"
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="destination" className="font-bold">
              DESTINO
            </Label>
            <Input
              id="destination"
              placeholder="Digite o destino do material"
              value={destination}
              onChange={(e) => setDestination(e.target.value.toUpperCase())}
              className="border-2 border-gray-300"
              required
            />
          </div>
          
          <Button 
            type="submit" 
            className="w-full bg-brisanet-orange hover:bg-orange-700 text-white"
          >
            Iniciar Transação
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default TransactionForm;
