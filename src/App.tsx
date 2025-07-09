import React, { useEffect, useState } from 'react';

interface Account {
  id: string;
  cash: string;
  status: string;
}

const App: React.FC = () => {
  const [account, setAccount] = useState<Account | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAccount = async () => {
      try {
        const res = await fetch('/api/account');  // ajusta la URL si es necesario
        if (!res.ok) throw new Error('Error al obtener la cuenta');
        const data: Account = await res.json();
        setAccount(data);
      } catch (e: any) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    };
    fetchAccount();
  }, []);

  if (loading) return <div>Cargando cuenta...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h1>Cuenta Alpaca</h1>
      {account ? (
        <div>
          <p>ID: {account.id}</p>
          <p>Cash: {account.cash}</p>
          <p>Status: {account.status}</p>
        </div>
      ) : (
        <p>No hay datos de cuenta</p>
      )}
    </div>
  );
};

export default App;
