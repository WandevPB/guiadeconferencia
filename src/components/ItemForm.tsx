import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useTransaction } from "@/contexts/TransactionContext";
import { useGoogleSheets } from "@/contexts/GoogleSheetsContext";
import { useToast } from "@/components/ui/use-toast";
import { TransactionItem } from "@/types";

interface ItemFormProps {
  editingItem?: TransactionItem;
  onCancel?: () => void;
}

const ItemForm: React.FC<ItemFormProps> = ({ editingItem, onCancel }) => {
  const [sapCode, setSapCode] = useState(editingItem?.sapCode || "");
  const [description, setDescription] = useState(editingItem?.description || "");
  const [quantity, setQuantity] = useState(editingItem?.quantity || 1);
  const [isLoading, setIsLoading] = useState(false);
  const [notFound, setNotFound] = useState(false);
  const [manualEntry, setManualEntry] = useState(false);

  const { addItem, updateItem } = useTransaction();
  const { getItemDescription, error, isLoading: isApiLoading } = useGoogleSheets();
  const { toast } = useToast();

  useEffect(() => {
    if (editingItem) {
      setSapCode(editingItem.sapCode);
      setDescription(editingItem.description);
      setQuantity(editingItem.quantity);
      setManualEntry(true); // Permitir edição ao editar um item existente
    }
  }, [editingItem]);

  const handleSapCodeChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const code = e.target.value;
    setSapCode(code);
    setNotFound(false);
    setManualEntry(false);
    setDescription("");
    
    if (code.length >= 3) {
      setIsLoading(true);
      
      try {
        console.log(`Buscando código SAP: "${code.trim()}"`);
        const fetchedDescription = await getItemDescription(code);
        console.log("Descrição encontrada:", fetchedDescription);
        
        if (fetchedDescription) {
          setDescription(fetchedDescription);
          setNotFound(false);
          toast({
            title: "Descrição encontrada",
            description: "A descrição do item foi encontrada com sucesso.",
            variant: "default",
          });
        } else {
          setNotFound(true);
        }
      } catch (error) {
        console.error("Erro ao buscar descrição:", error);
        setNotFound(true);
      } finally {
        setIsLoading(false);
      }
    }
  };

  // Função para tentar buscar a descrição novamente
  const handleRetrySearch = async () => {
    if (!sapCode.trim()) return;
    
    setIsLoading(true);
    setNotFound(false);
    
    try {
      // Limpar código e tentar novamente
      const cleanCode = sapCode.trim();
      console.log(`Tentando novamente com código limpo: "${cleanCode}"`);
      
      const fetchedDescription = await getItemDescription(cleanCode);
      
      if (fetchedDescription) {
        setDescription(fetchedDescription);
        setNotFound(false);
        toast({
          title: "Descrição encontrada",
          description: "A descrição do item foi encontrada com sucesso.",
        });
      } else {
        setNotFound(true);
      }
    } catch (error) {
      console.error("Erro ao buscar descrição:", error);
      setNotFound(true);
    } finally {
      setIsLoading(false);
    }
  };

  const enableManualEntry = () => {
    setManualEntry(true);
    toast({
      title: "Entrada manual habilitada",
      description: "Agora você pode inserir a descrição manualmente.",
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!sapCode.trim() || !description.trim() || quantity <= 0) {
      toast({
        title: "Erro",
        description: "Todos os campos são obrigatórios e a quantidade deve ser maior que zero.",
        variant: "destructive",
      });
      return;
    }

    const item = {
      sapCode: sapCode.trim(),
      description: description.trim(),
      quantity,
    };

    if (editingItem) {
      // Atualizar item existente usando o sapCode
      updateItem(sapCode, item);
    } else {
      // Adicionar novo item
      addItem(item);
      // Reset form after adding
      setSapCode("");
      setDescription("");
      setQuantity(1);
      setManualEntry(false);
      setNotFound(false);
    }

    if (onCancel) {
      onCancel();
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>{editingItem ? "Editar Item" : "Adicionar Novo Item"}</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="sapCode" className="font-bold">
              CÓDIGO SAP
            </Label>
            <Input
              id="sapCode"
              placeholder="Digite o código SAP"
              value={sapCode}
              onChange={handleSapCodeChange}
              className="border-2 border-gray-300"
              required
              readOnly={!!editingItem} // Bloquear edição do código SAP ao editar
            />
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <Label htmlFor="description" className="font-bold">
                DESCRIÇÃO
              </Label>
              {notFound && !manualEntry && (
                <div className="flex gap-2">
                  <Button 
                    type="button" 
                    variant="secondary" 
                    size="sm" 
                    onClick={handleRetrySearch}
                    className="text-sm"
                    disabled={isLoading || isApiLoading}
                  >
                    Tentar Novamente
                  </Button>
                  <Button 
                    type="button" 
                    variant="outline" 
                    size="sm" 
                    onClick={enableManualEntry}
                    className="text-sm"
                  >
                    Inserir Manualmente
                  </Button>
                </div>
              )}
            </div>
            <Input
              id="description"
              placeholder={isLoading ? "Buscando descrição..." : "Descrição do item"}
              value={isLoading ? "Buscando..." : description}
              onChange={(e) => setDescription(e.target.value)}
              className={`border-2 ${notFound && !manualEntry ? 'border-red-300' : 'border-gray-300'}`}
              disabled={isLoading || (notFound && !manualEntry)}
              required
            />
            {notFound && !manualEntry && (
              <p className="text-red-500 text-sm">
                {error || "Código SAP não encontrado na planilha."}
              </p>
            )}
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="quantity" className="font-bold">
              QUANTIDADE
            </Label>
            <Input
              id="quantity"
              type="number"
              min="1"
              placeholder="Quantidade"
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
              className="border-2 border-gray-300"
              required
            />
          </div>
          
          <div className="flex gap-4">
            <Button 
              type="submit" 
              className="flex-1 bg-brisanet-orange hover:bg-orange-700 text-white"
              disabled={notFound && !manualEntry}
            >
              {editingItem ? "Atualizar Item" : "Adicionar Item"}
            </Button>
            
            {onCancel && (
              <Button 
                type="button" 
                variant="outline" 
                className="flex-1" 
                onClick={onCancel}
              >
                Cancelar
              </Button>
            )}
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default ItemForm;
