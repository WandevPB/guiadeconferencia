import React, { useEffect } from "react";
import Header from "@/components/Header";
import ConferenceDocument from "@/components/ConferenceDocument";
import { useTransaction } from "@/contexts/TransactionContext";
import { Navigate, useLocation } from "react-router-dom";
import { useGoogleSheets } from "@/contexts/GoogleSheetsContext";

const ConferencePage = () => {
  const { currentTransaction } = useTransaction();
  const { isInitialized, initializeGoogleSheets } = useGoogleSheets();
  const location = useLocation();
  
  useEffect(() => {
    if (!isInitialized) {
      initializeGoogleSheets();
    }
  }, [isInitialized, initializeGoogleSheets]);
  
  // If no transaction is started or no items, redirect to home
  if (!currentTransaction.transactionNumber || currentTransaction.items.length === 0) {
    return <Navigate to="/" />;
  }
  
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <ConferenceDocument />
      </div>
    </div>
  );
};

export default ConferencePage;
