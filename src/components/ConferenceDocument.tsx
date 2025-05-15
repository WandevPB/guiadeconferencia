import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useTransaction } from "@/contexts/TransactionContext";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

const ConferenceDocument: React.FC = () => {
  const { currentTransaction, resetTransaction } = useTransaction();
  const navigate = useNavigate();
  const today = format(new Date(), "dd 'de' MMMM 'de' yyyy", { locale: ptBR });
  
  const handleNewTransaction = () => {
    resetTransaction();
    navigate("/");
  };
  
  const handlePrint = () => {
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
      
      <Card className="w-full print:shadow-none print:border-none">
        <CardHeader className="print:pb-0">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-3xl font-bold">GUIA DE CONFERÊNCIA</h1>
              <p className="text-gray-500">{today}</p>
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
              <thead className="bg-gray-100">
                <tr>
                  <th className="border px-4 py-2 text-left">Código SAP</th>
                  <th className="border px-4 py-2 text-left">Descrição</th>
                  <th className="border px-4 py-2 text-left">QTD ENVIADA</th>
                  <th className="border px-4 py-2 text-left">QTD RECEBIDA (Motorista)</th>
                  <th className="border px-4 py-2 text-left">QTD RECEBIDA (Conferente)</th>
                  <th className="border px-4 py-2 text-center">Valid. Motorista</th>
                  <th className="border px-4 py-2 text-center">Valid. Recebedor</th>
                </tr>
              </thead>
              <tbody>
                {currentTransaction.items.map((item) => (
                  <tr key={item.id}>
                    <td className="border px-4 py-3">{item.sapCode}</td>
                    <td className="border px-4 py-3">{item.description}</td>
                    <td className="border px-4 py-3">{item.quantity}</td>
                    <td className="border px-4 py-3 h-10">
                      <div className="h-6 border-b border-dashed border-gray-400"></div>
                    </td>
                    <td className="border px-4 py-3 h-10">
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
          
          <div className="mt-12 flex flex-col gap-8 print:block print:assinaturas">
            <h3 className="text-lg font-bold border-b pb-2 print:block mb-12">Assinaturas</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 print:grid print:grid-cols-3 print:mt-12">
              <div className="flex flex-col items-center print:block">
                <div className="border-b border-gray-400 w-full mb-4 print:block print:border-b print:border-black"></div>
                <p className="font-semibold print:mt-2">Expedidor</p>
                <p className="text-gray-500 print:mt-2">Data: ___/___/______</p>
                <p className="text-gray-500 print:mt-2">Matrícula: _______________</p>
              </div>
              
              <div className="flex flex-col items-center print:block">
                <div className="border-b border-gray-400 w-full mb-4 print:block print:border-b print:border-black"></div>
                <p className="font-semibold print:mt-2">Motorista</p>
                <p className="text-gray-500 print:mt-2">Data: ___/___/______</p>
                <p className="text-gray-500 print:mt-2">Matrícula: _______________</p>
              </div>
              
              <div className="flex flex-col items-center print:block">
                <div className="border-b border-gray-400 w-full mb-4 print:block print:border-b print:border-black"></div>
                <p className="font-semibold print:mt-2">Recebedor</p>
                <p className="text-gray-500 print:mt-2">Data: ___/___/______</p>
                <p className="text-gray-500 print:mt-2">Matrícula: _______________</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <style>{`
        @media print {
          @page {
            size: portrait;
            margin: 1cm;
          }
          
          body {
            font-size: 12pt;
          }
          
          .print\\:hidden {
            display: none !important;
          }
          
          .print\\:block {
            display: block !important;
          }
          
          .print\\:grid {
            display: grid !important;
          }
          
          .print\\:grid-cols-3 {
            grid-template-columns: repeat(3, minmax(0, 1fr)) !important;
          }
          
          .print\\:mt-2 {
            margin-top: 0.5rem !important;
          }

          .print\\:mt-8 {
            margin-top: 2rem !important;
          }
          
          .print\\:border-b {
            border-bottom-width: 1px !important;
          }
          
          .print\\:border-black {
            border-color: black !important;
          }

          .print\\:assinaturas {
            position: fixed;
            bottom: 2cm;
            left: 0;
            right: 0;
            width: 100%;
          }
        }
      `}</style>
    </div>
  );
};

export default ConferenceDocument;
