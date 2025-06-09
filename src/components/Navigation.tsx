
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Home, 
  ArrowDownCircle, 
  Building2, 
  Smartphone, 
  Phone, 
  Wifi, 
  Zap, 
  Store, 
  Banknote, 
  CreditCard, 
  Settings 
} from 'lucide-react';

export const Navigation: React.FC = () => {
  const location = useLocation();

  const navItems = [
    { path: '/', label: 'Dashboard', icon: Home },
    { path: '/incoming-money', label: 'Incoming Money', icon: ArrowDownCircle },
    { path: '/bank-deposits', label: 'Bank Deposits', icon: Building2 },
    { path: '/mobile-payments', label: 'Mobile Payments', icon: Smartphone },
    { path: '/airtime', label: 'Airtime', icon: Phone },
    { path: '/data-bundles', label: 'Data Bundles', icon: Wifi },
    { path: '/utility-bills', label: 'Utility Bills', icon: Zap },
    { path: '/merchant-payments', label: 'Merchant', icon: Store },
    { path: '/cash-out', label: 'Cash Out', icon: Banknote },
    { path: '/bank-transfers', label: 'Bank Transfers', icon: CreditCard },
    { path: '/service-payments', label: 'Services', icon: Settings },
  ];

  return (
    <nav className="bg-black border-b border-yellow-500 shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex items-center space-x-1 overflow-x-auto py-2">
          {navItems.map(({ path, label, icon: Icon }) => (
            <Link
              key={path}
              to={path}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg whitespace-nowrap transition-colors ${
                location.pathname === path
                  ? 'bg-yellow-500 text-black font-semibold'
                  : 'text-yellow-400 hover:bg-yellow-900 hover:text-yellow-300'
              }`}
            >
              <Icon className="h-4 w-4" />
              <span className="text-sm">{label}</span>
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
};
