import React, { useEffect, useState } from 'react';

interface Account {
  id: string;
  cash: string;
  status: string;
  buying_power: string;
  equity: string;
}

const App: React.FC = () => {
  const [account, setAccount] = useState<Account | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastAction, setLastAction] = useState<string | null>(null);
  const [price, setPrice] = useState<string | null>(null);

  const fetchAccount = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/account');
      if (!res.ok) throw new Error('Error al obtener la cuenta');
      const data: Account = await res.json();
      setAccount(data);
      setError(null);
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAccount();
  }, []);

  const handleBuyStock = async (symbol: string) => {
    setLastAction(`Comprando ${symbol}...`);
    try {
      const res = await fetch(`/api/buy/${symbol}`, { method: 'POST' });
      if (!res.ok) throw new Error(`Error al comprar ${symbol}`);
      const data = await res.json();
      setLastAction(`Orden de compra para ${symbol} enviada: ${data.id}`);
      // Refrescar datos de la cuenta tras la compra
      fetchAccount();
    } catch (e: any) {
      setLastAction(e.message);
    }
  };

  const handleGetPrice = async (symbol: string) => {
    setLastAction(`Obteniendo precio de ${symbol}...`);
    try {
      const res = await fetch(`/api/price/${symbol}`);
      if (!res.ok) throw new Error(`Error al obtener precio de ${symbol}`);
      const data = await res.json();
      setPrice(data.price);
      setLastAction(`Último precio de ${symbol}: ${data.price}`);
    } catch (e: any) {
      setLastAction(e.message);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center p-4">
      <div className="w-full max-w-2xl mx-auto bg-gray-800 rounded-lg shadow-md p-6">
        <h1 className="text-3xl font-bold mb-6 text-center text-yellow-400">Dashboard de Alpaca</h1>
        
        {loading && <div className="text-center">Cargando cuenta...</div>}
        {error && <div className="text-center text-red-500">Error: {error}</div>}
        
        {account && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6 text-lg">
            <div className="bg-gray-700 p-4 rounded-lg"><strong>ID:</strong> <span className="font-mono">{account.id}</span></div>
            <div className="bg-gray-700 p-4 rounded-lg"><strong>Status:</strong> <span className="font-semibold text-green-400">{account.status}</span></div>
            <div className="bg-gray-700 p-4 rounded-lg"><strong>Cash:</strong> <span className="font-mono">${parseFloat(account.cash).toLocaleString()}</span></div>
            <div className="bg-gray-700 p-4 rounded-lg"><strong>Equity:</strong> <span className="font-mono">${parseFloat(account.equity).toLocaleString()}</span></div>
            <div className="bg-gray-700 p-4 rounded-lg col-span-1 md:col-span-2"><strong>Buying Power:</strong> <span className="font-mono">${parseFloat(account.buying_power).toLocaleString()}</span></div>
          </div>
        )}

        <div className="flex justify-center space-x-4">
          <button 
            onClick={() => handleBuyStock('AAPL')}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition duration-300"
          >
            Comprar $1 de AAPL
          </button>
          <button 
            onClick={() => handleGetPrice('AAPL')}
            className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg transition duration-300"
          >
            Ver Precio de AAPL
          </button>
        </div>

        {lastAction && (
          <div className="mt-6 p-4 bg-gray-700 rounded-lg text-center">
            <p>{lastAction}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
