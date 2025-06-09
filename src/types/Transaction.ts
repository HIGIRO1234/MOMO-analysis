
export interface Transaction {
  id: number;
  body: string;
  type: TransactionType;
  amount: number;
  date: string; // YYYY-MM-DD format
  phoneNumber?: string;
  reference?: string;
}

export type TransactionType = 
  | 'Incoming Money'
  | 'Bank Deposits'
  | 'Mobile Money Payment'
  | 'Airtime Purchase'
  | 'Data Bundle Purchase'
  | 'Utility Bill Payment'
  | 'Merchant Payment'
  | 'Cash Out'
  | 'Transfer to Bank'
  | 'Service Payment';

export interface TransactionFilters {
  search: string;
  type: string;
  startDate: string;
  endDate: string;
  minAmount: number;
}

export interface ChartData {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    backgroundColor?: string | string[];
    borderColor?: string | string[];
    borderWidth?: number;
  }[];
}
