
import React from 'react';
import { BarChart3, Smartphone, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';

export const Header: React.FC = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    navigate('/login');
  };

  return (
    <header className="bg-black shadow-lg border-b border-yellow-500">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="bg-yellow-500 p-2 rounded-lg">
              <Smartphone className="h-6 w-6 text-black" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-yellow-400">
                MTN MoMo Dashboard
              </h1>
              <p className="text-yellow-200">Transaction Analytics & Insights</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 text-yellow-400">
              <BarChart3 className="h-5 w-5" />
              <span className="font-medium">Analytics</span>
            </div>
            <Button
              onClick={handleLogout}
              variant="ghost"
              size="sm"
              className="text-yellow-400 hover:text-yellow-300 hover:bg-yellow-900"
            >
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};
