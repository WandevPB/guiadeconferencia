
import React, { createContext, useState, useContext, useEffect } from "react";

interface GoogleSheetsContextType {
  isLoaded: boolean;
  isInitialized: boolean;
  isSignedIn: boolean;
  error: string | null;
  getItemDescription: (sapCode: string) => Promise<string>;
  initializeGoogleSheets: () => Promise<void>;
}

const GoogleSheetsContext = createContext<GoogleSheetsContextType>({
  isLoaded: false,
  isInitialized: false,
  isSignedIn: false,
  error: null,
  getItemDescription: async () => "",
  initializeGoogleSheets: async () => {},
});

export const useGoogleSheets = () => useContext(GoogleSheetsContext);

// Replace this with your Google Sheets API credentials and spreadsheet ID
const API_KEY = "YOUR_API_KEY"; // The user needs to replace this
const SHEET_ID = "YOUR_SHEET_ID"; // The user needs to replace this
const RANGE = "A:B";  // Assuming column A contains SAP codes and column B contains descriptions

export const GoogleSheetsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    // Check if gapi is already loaded
    if (window.gapi) {
      setIsLoaded(true);
    } else {
      // If not, notify the user they need to set API credentials
      setError("Google Sheets API configuration required. Please update API_KEY and SHEET_ID.");
    }
  }, []);

  const initializeGoogleSheets = async () => {
    if (!isLoaded || !API_KEY || API_KEY === "YOUR_API_KEY" || !SHEET_ID || SHEET_ID === "YOUR_SHEET_ID") {
      setError("Google Sheets API configuration required. Please update API_KEY and SHEET_ID.");
      return;
    }
    
    try {
      await new Promise<void>((resolve) => {
        window.gapi.load("client", async () => {
          try {
            await window.gapi.client.init({
              apiKey: API_KEY,
              discoveryDocs: ["https://sheets.googleapis.com/$discovery/rest?version=v4"],
            });
            setIsInitialized(true);
            setIsSignedIn(true);
            resolve();
          } catch (error) {
            setError("Failed to initialize Google Sheets API.");
            console.error("Error initializing Google Sheets API:", error);
          }
        });
      });
    } catch (error) {
      setError("Failed to load Google Sheets client.");
      console.error("Error loading Google Sheets client:", error);
    }
  };

  const getItemDescription = async (sapCode: string): Promise<string> => {
    if (!isInitialized || !isSignedIn) {
      await initializeGoogleSheets();
      if (!isInitialized || !isSignedIn) {
        return "";
      }
    }

    try {
      const response = await window.gapi.client.sheets.spreadsheets.values.get({
        spreadsheetId: SHEET_ID,
        range: RANGE,
      });

      const values = response.result.values || [];
      const item = values.find((row: string[]) => row[0] === sapCode);
      
      if (item && item[1]) {
        return item[1];
      }
      
      return "";
    } catch (error) {
      console.error("Error fetching item description:", error);
      return "";
    }
  };

  const value = {
    isLoaded,
    isInitialized,
    isSignedIn,
    error,
    getItemDescription,
    initializeGoogleSheets,
  };

  return (
    <GoogleSheetsContext.Provider value={value}>
      {children}
    </GoogleSheetsContext.Provider>
  );
};
