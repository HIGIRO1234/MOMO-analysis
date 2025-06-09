
import React, { useState, useEffect, useMemo } from 'react';
import { Header } from '../components/dashboard/Header';
import { FilterControls } from '../components/dashboard/FilterControls';
import { Visualizations } from '../components/dashboard/Visualizations';
import { TransactionDetails } from '../components/dashboard/TransactionDetails';
import { Transaction, TransactionFilters } from '../types/Transaction';
import { generateMockData } from '../utils/mockData';

const MobilePayments = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [filters, setFilters] = useState<TransactionFilters>({
    search: '',
    type: 'Mobile Money Payment',
    startDate: '',
    endDate: '',
    minAmount: 0
  });
  const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const mockTransactions = generateMockData(1600);
        const mobilePayments = mockTransactions.filter(t => t.type === 'Mobile Money Payment');
        setTransactions(mobilePayments);
      } catch (error) {
        console.error('Error loading transaction data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const filteredTransactions = useMemo(() => {
    return transactions.filter(transaction => {
      if (filters.search && !transaction.body.toLowerCase().includes(filters.search.toLowerCase())) {
        return false;
      }
      if (filters.startDate && transaction.date < filters.startDate) {
        return false;
      }
      if (filters.endDate && transaction.date > filters.endDate) {
        return false;
      }
      if (transaction.amount < filters.minAmount) {
        return false;
      }
      return true;
    });
  }, [transactions, filters]);

  const resetFilters = () => {
    setFilters({
      search: '',
      type: 'Mobile Money Payment',
      startDate: '',
      endDate: '',
      minAmount: 0
    });
    setSelectedTransaction(null);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-black flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-500 mx-auto mb-4"></div>
          <p className="text-yellow-600">Loading mobile payments data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-black">
      <Header />
      
      <div className="container mx-auto px-4 py-6">
        <div className="mb-6">
          <h2 className="text-3xl font-bold text-yellow-600 mb-2">Mobile Money Payments</h2>
          <p className="text-gray-700">Analysis of all mobile money payment transactions</p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-1">
            <FilterControls
              filters={filters}
              onFiltersChange={setFilters}
              onReset={resetFilters}
              transactionCount={filteredTransactions.length}
              totalCount={transactions.length}
            />
          </div>

          <div className="lg:col-span-3 space-y-6">
            <Visualizations transactions={filteredTransactions} />
            <TransactionDetails
              transactions={filteredTransactions}
              selectedTransaction={selectedTransaction}
              onSelectTransaction={setSelectedTransaction}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobilePayments;
