import React, { createContext, useState, useContext } from "react";

interface GoogleSheetsContextType {
  isLoading: boolean;
  error: string | null;
  getItemDescription: (sapCode: string) => Promise<string>;
}

const GoogleSheetsContext = createContext<GoogleSheetsContextType>({
  isLoading: false,
  error: null,
  getItemDescription: async () => "",
});

export const useGoogleSheets = () => useContext(GoogleSheetsContext);

// API do Google Apps Script
const API_URL = "https://script.google.com/macros/s/AKfycbwTvRVidOxC_LPKGtjeb7H6kugvI3oCy10LqRm6y5ew05prgOPwdpOrdtZ9Xf740IHZKg/exec";

export const GoogleSheetsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getItemDescription = async (sapCode: string): Promise<string> => {
    if (!sapCode) return "";
    
    setIsLoading(true);
    setError(null);
    
    try {
      // Construir a URL da API com o código SAP como parâmetro
      const url = `${API_URL}?codigo=${encodeURIComponent(sapCode.trim())}`;
      
      console.log("Consultando API:", url);
      const response = await fetch(url);
      const data = await response.json();
      console.log("Resposta da API:", data);
      
      // Se a requisição for bem-sucedida e tiver dados
      if (data.success) {
        return data.descricao || ""; // Usando 'descricao' conforme retornado pela API
      } else {
        setError(data.message || "Código não encontrado");
        return "";
      }
    } catch (error) {
      console.error("Erro ao buscar descrição do item:", error);
      setError("Erro ao comunicar com a API. Tente novamente.");
      return "";
    } finally {
      setIsLoading(false);
    }
  };

  const value = {
    isLoading,
    error,
    getItemDescription,
  };

  return (
    <GoogleSheetsContext.Provider value={value}>
      {children}
    </GoogleSheetsContext.Provider>
  );
};
