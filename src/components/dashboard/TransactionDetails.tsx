
import React from 'react';
import { Transaction } from '../../types/Transaction';
import { Calendar, DollarSign, Phone, Hash } from 'lucide-react';
import { format } from 'date-fns';

interface TransactionDetailsProps {
  transactions: Transaction[];
  selectedTransaction: Transaction | null;
  onSelectTransaction: (transaction: Transaction | null) => void;
}

export const TransactionDetails: React.FC<TransactionDetailsProps> = ({
  transactions,
  selectedTransaction,
  onSelectTransaction,
}) => {
  const getTypeColor = (type: string) => {
    const colors: Record<string, string> = {
      'Incoming Money': 'bg-yellow-100 text-black',
      'Bank Deposits': 'bg-yellow-200 text-black',
      'Mobile Money Payment': 'bg-yellow-300 text-black',
      'Airtime Purchase': 'bg-yellow-400 text-black',
      'Data Bundle Purchase': 'bg-yellow-500 text-black',
      'Utility Bill Payment': 'bg-yellow-600 text-black',
      'Merchant Payment': 'bg-yellow-700 text-white',
      'Cash Out': 'bg-yellow-800 text-white',
      'Transfer to Bank': 'bg-yellow-900 text-white',
      'Service Payment': 'bg-gray-800 text-yellow-400',
    };
    return colors[type] || 'bg-gray-800 text-yellow-400';
  };

  return (
    <div className="bg-black border border-yellow-500 rounded-lg shadow-lg p-6">
      <h3 className="text-lg font-semibold text-yellow-400 mb-4">
        Transaction Details ({transactions.length} transactions)
      </h3>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Transaction List */}
        <div className="space-y-2">
          <h4 className="font-medium text-yellow-300 mb-3">Recent Transactions</h4>
          <div className="max-h-96 overflow-y-auto space-y-2 pr-2">
            {transactions.slice(0, 50).map((transaction) => (
              <div
                key={transaction.id}
                onClick={() => onSelectTransaction(transaction)}
                className={`p-3 rounded-lg border cursor-pointer transition-all hover:shadow-md ${
                  selectedTransaction?.id === transaction.id
                    ? 'border-yellow-500 bg-yellow-900/20'
                    : 'border-yellow-700 hover:border-yellow-400 bg-gray-900'
                }`}
              >
                <div className="flex items-start justify-between mb-2">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(transaction.type)}`}>
                    {transaction.type}
                  </span>
                  <span className="font-semibold text-yellow-400">
                    RWF {transaction.amount.toLocaleString()}
                  </span>
                </div>
                <p className="text-sm text-yellow-200 line-clamp-2">
                  {transaction.body.length > 100
                    ? transaction.body.substring(0, 100) + '...'
                    : transaction.body}
                </p>
                <p className="text-xs text-yellow-300 mt-1">
                  {format(new Date(transaction.date), 'MMM dd, yyyy')}
                </p>
              </div>
            ))}
            {transactions.length > 50 && (
              <div className="text-center py-4 text-yellow-400">
                Showing first 50 transactions. Use filters to narrow down results.
              </div>
            )}
          </div>
        </div>

        {/* Selected Transaction Details */}
        <div className="space-y-4">
          <h4 className="font-medium text-yellow-300 mb-3">Transaction Details</h4>
          {selectedTransaction ? (
            <div className="bg-gray-900 border border-yellow-700 rounded-lg p-4 space-y-4">
              <div className="flex items-center justify-between">
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getTypeColor(selectedTransaction.type)}`}>
                  {selectedTransaction.type}
                </span>
                <button
                  onClick={() => onSelectTransaction(null)}
                  className="text-yellow-400 hover:text-yellow-300"
                >
                  ×
                </button>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center space-x-2">
                  <DollarSign className="h-4 w-4 text-yellow-500" />
                  <div>
                    <p className="text-xs text-yellow-400">Amount</p>
                    <p className="font-semibold text-yellow-300">RWF {selectedTransaction.amount.toLocaleString()}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <Calendar className="h-4 w-4 text-yellow-500" />
                  <div>
                    <p className="text-xs text-yellow-400">Date</p>
                    <p className="font-semibold text-yellow-300">
                      {format(new Date(selectedTransaction.date), 'MMM dd, yyyy')}
                    </p>
                  </div>
                </div>

                {selectedTransaction.phoneNumber && (
                  <div className="flex items-center space-x-2">
                    <Phone className="h-4 w-4 text-yellow-500" />
                    <div>
                      <p className="text-xs text-yellow-400">Phone</p>
                      <p className="font-semibold text-yellow-300">{selectedTransaction.phoneNumber}</p>
                    </div>
                  </div>
                )}

                {selectedTransaction.reference && (
                  <div className="flex items-center space-x-2">
                    <Hash className="h-4 w-4 text-yellow-500" />
                    <div>
                      <p className="text-xs text-yellow-400">Reference</p>
                      <p className="font-semibold text-yellow-300">{selectedTransaction.reference}</p>
                    </div>
                  </div>
                )}
              </div>

              <div>
                <p className="text-xs text-yellow-400 mb-2">Full Message</p>
                <div className="bg-black border border-yellow-600 rounded p-3 text-sm text-yellow-200">
                  {selectedTransaction.body}
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-gray-900 border border-yellow-700 rounded-lg p-8 text-center">
              <p className="text-yellow-400">
                Click on a transaction to view its details
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
