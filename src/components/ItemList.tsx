import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { useTransaction } from "@/contexts/TransactionContext";
import { TransactionItem } from "@/types";
import ItemForm from "./ItemForm";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { X, Edit } from "lucide-react";

const ItemList: React.FC = () => {
  const { currentTransaction, removeItem } = useTransaction();
  const [editingSapCode, setEditingSapCode] = useState<string | null>(null);
  
  const handleEditItem = (sapCode: string) => {
    setEditingSapCode(sapCode);
  };
  
  const handleCancelEdit = () => {
    setEditingSapCode(null);
  };
  
  const editingItem = currentTransaction.items.find(
    (item) => item.sapCode === editingSapCode
  );

  return (
    <div className="space-y-4">
      {editingSapCode && editingItem ? (
        <ItemForm editingItem={editingItem} onCancel={handleCancelEdit} />
      ) : (
        <>
          <Card className="w-full">
            <CardHeader>
              <CardTitle className="flex justify-between items-center">
                <span>Itens da Transação: {currentTransaction.transactionNumber}</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              {currentTransaction.items.length === 0 ? (
                <div className="text-center py-4 text-gray-500">
                  Nenhum item adicionado à transação.
                </div>
              ) : (
                <Table className="border-collapse border">
                  <TableHeader className="bg-gray-100">
                    <TableRow>
                      <TableHead className="font-bold">Código SAP</TableHead>
                      <TableHead className="font-bold">Descrição</TableHead>
                      <TableHead className="font-bold">Quantidade</TableHead>
                      <TableHead className="font-bold text-right">Ações</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {currentTransaction.items.map((item) => (
                      <TableRow key={item.sapCode} className="border-b">
                        <TableCell>{item.sapCode}</TableCell>
                        <TableCell>{item.description}</TableCell>
                        <TableCell>{item.quantity}</TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleEditItem(item.sapCode)}
                              className="h-8 w-8 p-0"
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <AlertDialog>
                              <AlertDialogTrigger asChild>
                                <Button
                                  variant="destructive"
                                  size="sm"
                                  className="h-8 w-8 p-0"
                                >
                                  <X className="h-4 w-4" />
                                </Button>
                              </AlertDialogTrigger>
                              <AlertDialogContent>
                                <AlertDialogHeader>
                                  <AlertDialogTitle>Confirmar exclusão</AlertDialogTitle>
                                  <AlertDialogDescription>
                                    Tem certeza que deseja excluir o item {item.sapCode} - {item.description}?
                                  </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                  <AlertDialogCancel>Cancelar</AlertDialogCancel>
                                  <AlertDialogAction 
                                    onClick={() => removeItem(item.sapCode)}
                                    className="bg-destructive text-destructive-foreground"
                                  >
                                    Excluir
                                  </AlertDialogAction>
                                </AlertDialogFooter>
                              </AlertDialogContent>
                            </AlertDialog>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
};

export default ItemList;
