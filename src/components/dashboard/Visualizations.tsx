import React from 'react';
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { Transaction } from '../../types/Transaction';
import { format } from 'date-fns';

interface VisualizationsProps {
  transactions: Transaction[];
}

export const Visualizations: React.FC<VisualizationsProps> = ({ transactions }) => {
  // Chart 1: Transaction Volume by Type
  const getVolumeByTypeData = () => {
    const volumeMap = new Map<string, number>();
    transactions.forEach(t => {
      volumeMap.set(t.type, (volumeMap.get(t.type) || 0) + 1);
    });

    return Array.from(volumeMap.entries()).map(([type, count]) => ({
      type: type.length > 15 ? type.substring(0, 15) + '...' : type,
      fullType: type,
      count
    }));
  };

  // Chart 2: Monthly Transaction Trends
  const getMonthlyTrendsData = () => {
    const monthlyMap = new Map<string, number>();
    transactions.forEach(t => {
      const month = format(new Date(t.date), 'yyyy-MM');
      monthlyMap.set(month, (monthlyMap.get(month) || 0) + t.amount);
    });

    const sortedMonths = Array.from(monthlyMap.keys()).sort();
    
    return sortedMonths.map(month => ({
      month: format(new Date(month + '-01'), 'MMM yyyy'),
      amount: monthlyMap.get(month) || 0
    }));
  };

  // Chart 3: Payment vs Deposit Distribution
  const getDistributionData = () => {
    let deposits = 0;
    let payments = 0;

    transactions.forEach(t => {
      if (t.type === 'Incoming Money' || t.type === 'Bank Deposits') {
        deposits += t.amount;
      } else {
        payments += t.amount;
      }
    });

    return [
      { name: 'Payments (Outgoing)', value: payments, color: '#EF4444' },
      { name: 'Deposits (Incoming)', value: deposits, color: '#10B981' }
    ];
  };

  // Chart 4: Average Amount by Type
  const getAverageByTypeData = () => {
    const typeMap = new Map<string, { total: number; count: number }>();
    
    transactions.forEach(t => {
      const existing = typeMap.get(t.type) || { total: 0, count: 0 };
      typeMap.set(t.type, {
        total: existing.total + t.amount,
        count: existing.count + 1
      });
    });

    return Array.from(typeMap.entries()).map(([type, data]) => ({
      type: type.length > 15 ? type.substring(0, 15) + '...' : type,
      fullType: type,
      average: Math.round(data.total / data.count)
    }));
  };

  const COLORS = ['#FBBF24', '#000000', '#F59E0B', '#1F2937', '#FCD34D', '#374151', '#FDE68A', '#111827', '#FEF3C7', '#6B7280'];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Transaction Volume by Type */}
        <div className="bg-black border border-yellow-500 rounded-lg shadow-lg p-6">
          <h3 className="text-lg font-semibold text-yellow-400 mb-4">
            Transaction Volume by Type
          </h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={getVolumeByTypeData()}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis 
                  dataKey="type" 
                  angle={-45}
                  textAnchor="end"
                  height={80}
                  fontSize={12}
                  tick={{ fill: '#FBBF24' }}
                />
                <YAxis tick={{ fill: '#FBBF24' }} />
                <Tooltip 
                  formatter={(value, name, props) => [value, 'Transactions']}
                  labelFormatter={(label, payload) => {
                    const item = payload?.[0]?.payload;
                    return item?.fullType || label;
                  }}
                  contentStyle={{ backgroundColor: '#000000', border: '1px solid #FBBF24', color: '#FBBF24' }}
                />
                <Bar dataKey="count" fill="#FBBF24" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Monthly Transaction Trends */}
        <div className="bg-black border border-yellow-500 rounded-lg shadow-lg p-6">
          <h3 className="text-lg font-semibold text-yellow-400 mb-4">
            Monthly Transaction Trends
          </h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={getMonthlyTrendsData()}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="month" tick={{ fill: '#FBBF24' }} />
                <YAxis tick={{ fill: '#FBBF24' }} />
                <Tooltip 
                  formatter={(value) => [value?.toLocaleString(), 'Amount (RWF)']} 
                  contentStyle={{ backgroundColor: '#000000', border: '1px solid #FBBF24', color: '#FBBF24' }}
                />
                <Line 
                  type="monotone" 
                  dataKey="amount" 
                  stroke="#FBBF24" 
                  strokeWidth={2}
                  dot={{ fill: '#FBBF24' }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Payment vs Deposit Distribution */}
        <div className="bg-black border border-yellow-500 rounded-lg shadow-lg p-6">
          <h3 className="text-lg font-semibold text-yellow-400 mb-4">
            Payment vs Deposit Distribution
          </h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={getDistributionData()}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {getDistributionData().map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  formatter={(value) => [value?.toLocaleString(), 'Amount (RWF)']} 
                  contentStyle={{ backgroundColor: '#000000', border: '1px solid #FBBF24', color: '#FBBF24' }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Average Amount by Type */}
        <div className="bg-black border border-yellow-500 rounded-lg shadow-lg p-6">
          <h3 className="text-lg font-semibold text-yellow-400 mb-4">
            Average Amount by Type
          </h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={getAverageByTypeData()}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis 
                  dataKey="type" 
                  angle={-45}
                  textAnchor="end"
                  height={80}
                  fontSize={12}
                  tick={{ fill: '#FBBF24' }}
                />
                <YAxis tick={{ fill: '#FBBF24' }} />
                <Tooltip 
                  formatter={(value, name, props) => [value?.toLocaleString(), 'Average Amount (RWF)']}
                  labelFormatter={(label, payload) => {
                    const item = payload?.[0]?.payload;
                    return item?.fullType || label;
                  }}
                  contentStyle={{ backgroundColor: '#000000', border: '1px solid #FBBF24', color: '#FBBF24' }}
                />
                <Bar dataKey="average" fill="#F59E0B" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};
