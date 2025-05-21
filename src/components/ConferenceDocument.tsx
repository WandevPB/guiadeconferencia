import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useTransaction } from "@/contexts/TransactionContext";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { useTransactionHistory } from "@/contexts/TransactionHistoryContext";

const ConferenceDocument: React.FC = () => {
  const { currentTransaction, clearTransaction } = useTransaction();
  const { addToHistory } = useTransactionHistory();
  const navigate = useNavigate();
  const today = format(new Date(), "dd 'de' MMMM 'de' yyyy", { locale: ptBR });
  
  const handleNewTransaction = () => {
    clearTransaction();
    navigate("/");
  };
  
  const handlePrint = () => {
    // Salvar a transação no histórico com status "completed"
    const completedTransaction = {
      ...currentTransaction,
      status: "completed",
      createdAt: new Date().toISOString()
    };
    
    // Adicionar ao histórico
    addToHistory(completedTransaction);
    
    // Imprimir o documento
    window.print();
  };

  return (
    <div className="flex flex-col gap-4 print:block">
      <div className="flex justify-between items-center print:hidden">
        <h2 className="text-2xl font-bold">Guia de Conferência</h2>
        <div className="space-x-2">
          <Button onClick={handlePrint} className="bg-brisanet-orange hover:bg-orange-700 text-white">
            Imprimir
          </Button>
          <Button onClick={handleNewTransaction} variant="outline">
            Nova Transação
          </Button>
        </div>
      </div>
      
      {/* Documento de Conferência - Cabeçalho e Tabela */}
      <div className="items-table">
      <Card className="w-full print:shadow-none print:border-none">
        <CardHeader className="print:pb-0">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-3xl font-bold">GUIA DE CONFERÊNCIA</h1>
              <p className="text-gray-500">{today}</p>
              
              <div className="mt-4 flex gap-6">
                <div>
                  <p className="font-bold">DE:</p>
                  <p className="text-lg">{currentTransaction.origin}</p>
                </div>
                <div>
                  <p className="font-bold">PARA:</p>
                  <p className="text-lg">{currentTransaction.destination}</p>
                </div>
              </div>
            </div>
            <div className="bg-brisanet-orange text-white p-4 rounded">
              <h2 className="text-2xl font-bold">TRANSAÇÃO</h2>
              <p className="text-xl">{currentTransaction.transactionNumber}</p>
            </div>
          </div>
        </CardHeader>
        
        <CardContent>
          <div className="mt-6">
            <table className="w-full border-collapse">
                <thead className="bg-gray-100 print:table-header-group">
                <tr>
                  <th className="border px-4 py-2 text-center">Código SAP</th>
                  <th className="border px-4 py-2 text-center">Descrição</th>
                  <th className="border px-4 py-2 text-center">QTD</th>
                  <th className="border px-4 py-2 text-center">QTD ENVIADA (ORIGEM)</th>
                  <th className="border px-4 py-2 text-center">QTD RECEBIDA (DESTINO)</th>
                  <th className="border px-4 py-2 text-center">Valid. Motorista</th>
                  <th className="border px-4 py-2 text-center">Valid. Recebedor</th>
                </tr>
              </thead>
              <tbody>
                {currentTransaction.items.map((item) => (
                  <tr key={item.sapCode}>
                    <td className="border px-4 py-3 text-center">{item.sapCode}</td>
                    <td className="border px-4 py-3 text-center">{item.description}</td>
                    <td className="border px-4 py-3 text-center">{item.quantity}</td>
                    <td className="border px-4 py-3 h-10 text-center">
                      <div className="h-6 border-b border-dashed border-gray-400"></div>
                    </td>
                    <td className="border px-4 py-3 h-10 text-center">
                      <div className="h-6 border-b border-dashed border-gray-400"></div>
                    </td>
                    <td className="border px-4 py-3">
                      <div className="flex justify-center items-center">
                        <div className="h-6 w-6 border border-gray-400"></div>
                      </div>
                    </td>
                    <td className="border px-4 py-3">
                      <div className="flex justify-center items-center">
                        <div className="h-6 w-6 border border-gray-400"></div>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            </div>
          </CardContent>
        </Card>
          </div>
          
      {/* Seção de assinaturas */}
      <div className="signatures-section">
        <Card className="w-full print:shadow-none print:border-none">
          <CardContent>
            <h3 className="text-lg font-bold border-b pb-2 mb-12">Assinaturas</h3>
            
            <div className="grid grid-cols-3 gap-8 mt-12 print:grid-cols-3">
              <div className="flex flex-col items-center">
                <div className="border-b border-gray-400 w-full mb-4"></div>
                <p className="font-semibold mt-2">Expedidor</p>
                <p className="text-gray-500 mt-2">Data: ___/___/______</p>
                <p className="text-gray-500 mt-2">Matrícula: _______________</p>
              </div>
              
              <div className="flex flex-col items-center">
                <div className="border-b border-gray-400 w-full mb-4"></div>
                <p className="font-semibold mt-2">Motorista</p>
                <p className="text-gray-500 mt-2">Data: ___/___/______</p>
                <p className="text-gray-500 mt-2">Matrícula: _______________</p>
              </div>
              
              <div className="flex flex-col items-center">
                <div className="border-b border-gray-400 w-full mb-4"></div>
                <p className="font-semibold mt-2">Recebedor</p>
                <p className="text-gray-500 mt-2">Data: ___/___/______</p>
                <p className="text-gray-500 mt-2">Matrícula: _______________</p>
            </div>
          </div>
        </CardContent>
      </Card>
      </div>
      
      <style>{`
        @media print {
          @page {
            size: portrait;
            margin: 1cm;
          }
          
          body {
            font-size: 12pt;
          }
          
          /* Esconder elementos na impressão */
          .print\\:hidden {
            display: none !important;
          }
          
          /* Repetir cabeçalhos da tabela em cada página */
          thead {
            display: table-header-group;
          }
          
          /* Configuração para quebras de página */
          tr {
            page-break-inside: avoid;
          }
          
          /* Permitir que a quebra de página ocorra naturalmente */
          .signatures-section {
            page-break-inside: avoid;
            break-inside: avoid;
            margin-top: 2cm;
          }
        }
      `}</style>
    </div>
  );
};

export default ConferenceDocument;
