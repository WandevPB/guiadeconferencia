export interface Item {
  id: string;
  sapCode: string;
  description: string;
  quantity: number;
}

export interface TransactionData {
  transactionNumber: string;
  items: Item[];
}

// Tipos para tema
export type Theme = 'light' | 'dark';

// Tipos para campos de unidade/departamento
export interface Department {
  id: string;
  name: string;
  code?: string;
}

// Interface para componentes acessíveis
export interface AccessibleProps {
  ariaLabel?: string;
  ariaDescribedBy?: string;
  ariaLabelledBy?: string;
}

// Interface para metadados de exportação
export interface ExportMetadata {
  creator?: string;
  title?: string;
  subject?: string;
  keywords?: string[];
  creationDate: Date;
}
