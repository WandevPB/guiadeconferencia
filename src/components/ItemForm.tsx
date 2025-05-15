
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useTransaction } from "@/contexts/TransactionContext";
import { useGoogleSheets } from "@/contexts/GoogleSheetsContext";
import { useToast } from "@/components/ui/use-toast";
import { Item } from "@/types";

interface ItemFormProps {
  editingItem?: Item;
  onCancel?: () => void;
}

const ItemForm: React.FC<ItemFormProps> = ({ editingItem, onCancel }) => {
  const [sapCode, setSapCode] = useState(editingItem?.sapCode || "");
  const [description, setDescription] = useState(editingItem?.description || "");
  const [quantity, setQuantity] = useState(editingItem?.quantity || 1);
  const [isLoading, setIsLoading] = useState(false);

  const { addItem, updateItem } = useTransaction();
  const { getItemDescription } = useGoogleSheets();
  const { toast } = useToast();

  useEffect(() => {
    if (editingItem) {
      setSapCode(editingItem.sapCode);
      setDescription(editingItem.description);
      setQuantity(editingItem.quantity);
    }
  }, [editingItem]);

  const handleSapCodeChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const code = e.target.value;
    setSapCode(code);
    
    if (code.length >= 3) {
      setIsLoading(true);
      try {
        const fetchedDescription = await getItemDescription(code);
        if (fetchedDescription) {
          setDescription(fetchedDescription);
        }
      } catch (error) {
        console.error("Error fetching description:", error);
      } finally {
        setIsLoading(false);
      }
    }
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
      sapCode,
      description,
      quantity,
    };

    if (editingItem) {
      updateItem({ ...item, id: editingItem.id });
    } else {
      addItem(item);
      // Reset form after adding
      setSapCode("");
      setDescription("");
      setQuantity(1);
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
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="description" className="font-bold">
              DESCRIÇÃO
            </Label>
            <Input
              id="description"
              placeholder={isLoading ? "Buscando descrição..." : "Descrição do item"}
              value={isLoading ? "Buscando..." : description}
              onChange={(e) => setDescription(e.target.value)}
              className="border-2 border-gray-300"
              disabled={isLoading}
              required
            />
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
