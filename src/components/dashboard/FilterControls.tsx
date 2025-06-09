
import React from 'react';
import { Search, Filter, RotateCcw } from 'lucide-react';
import { TransactionFilters, TransactionType } from '../../types/Transaction';

interface FilterControlsProps {
  filters: TransactionFilters;
  onFiltersChange: (filters: TransactionFilters) => void;
  onReset: () => void;
  transactionCount: number;
  totalCount: number;
}

const transactionTypes: TransactionType[] = [
  'Incoming Money',
  'Bank Deposits',
  'Mobile Money Payment',
  'Airtime Purchase',
  'Data Bundle Purchase',
  'Utility Bill Payment',
  'Merchant Payment',
  'Cash Out',
  'Transfer to Bank',
  'Service Payment'
];

export const FilterControls: React.FC<FilterControlsProps> = ({
  filters,
  onFiltersChange,
  onReset,
  transactionCount,
  totalCount
}) => {
  const updateFilter = (key: keyof TransactionFilters, value: string | number) => {
    onFiltersChange({
      ...filters,
      [key]: value
    });
  };

  return (
    <div className="bg-black rounded-lg shadow-lg p-6 space-y-6 sticky top-6 border border-yellow-500">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Filter className="h-5 w-5 text-yellow-500" />
          <h2 className="font-semibold text-yellow-400">Filters</h2>
        </div>
        <button
          onClick={onReset}
          className="text-sm text-yellow-300 hover:text-yellow-500 flex items-center space-x-1 transition-colors"
        >
          <RotateCcw className="h-4 w-4" />
          <span>Reset</span>
        </button>
      </div>

      {/* Results Count */}
      <div className="bg-yellow-500 rounded-lg p-3">
        <p className="text-sm text-black font-semibold">
          Showing <span className="font-bold">{transactionCount}</span> of{' '}
          <span className="font-bold">{totalCount}</span> transactions
        </p>
      </div>

      {/* Search */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-yellow-400">Search</label>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-yellow-500" />
          <input
            type="text"
            placeholder="Search transaction details..."
            value={filters.search}
            onChange={(e) => updateFilter('search', e.target.value)}
            className="w-full pl-9 pr-3 py-2 bg-gray-900 border border-yellow-500 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent text-yellow-100 placeholder-yellow-300"
          />
        </div>
      </div>

      {/* Transaction Type */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-yellow-400">Transaction Type</label>
        <select
          value={filters.type}
          onChange={(e) => updateFilter('type', e.target.value)}
          className="w-full px-3 py-2 bg-gray-900 border border-yellow-500 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent text-yellow-100"
        >
          <option value="">All Types</option>
          {transactionTypes.map((type) => (
            <option key={type} value={type} className="bg-gray-900 text-yellow-100">
              {type}
            </option>
          ))}
        </select>
      </div>

      {/* Date Range */}
      <div className="space-y-3">
        <label className="text-sm font-medium text-yellow-400">Date Range</label>
        <div className="space-y-2">
          <input
            type="date"
            placeholder="Start Date"
            value={filters.startDate}
            onChange={(e) => updateFilter('startDate', e.target.value)}
            className="w-full px-3 py-2 bg-gray-900 border border-yellow-500 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent text-yellow-100"
          />
          <input
            type="date"
            placeholder="End Date"
            value={filters.endDate}
            onChange={(e) => updateFilter('endDate', e.target.value)}
            className="w-full px-3 py-2 bg-gray-900 border border-yellow-500 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent text-yellow-100"
          />
        </div>
      </div>

      {/* Amount Filter */}
      <div className="space-y-3">
        <label className="text-sm font-medium text-yellow-400">
          Minimum Amount: RWF {filters.minAmount.toLocaleString()}
        </label>
        <input
          type="range"
          min="0"
          max="1000000"
          step="1000"
          value={filters.minAmount}
          onChange={(e) => updateFilter('minAmount', parseInt(e.target.value))}
          className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
          style={{
            background: `linear-gradient(to right, #FDD835 0%, #FDD835 ${(filters.minAmount / 1000000) * 100}%, #374151 ${(filters.minAmount / 1000000) * 100}%, #374151 100%)`
          }}
        />
        <div className="flex justify-between text-xs text-yellow-300">
          <span>RWF 0</span>
          <span>RWF 1M</span>
        </div>
      </div>
    </div>
  );
};
