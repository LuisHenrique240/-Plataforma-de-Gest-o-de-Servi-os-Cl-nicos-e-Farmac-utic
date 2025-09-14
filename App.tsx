import { useState } from 'react';
import { HomePage } from './components/HomePage';
import { PharmacistLogin } from './components/PharmacistLogin';
import { PharmacistRegistration } from './components/PharmacistRegistration';
import { ClientLogin } from './components/ClientLogin';
import { ClientRegistration } from './components/ClientRegistration';
import { SuccessModal } from './components/SuccessModal';
import { Dashboard } from './components/Dashboard';

type AppState = 
  | 'home'
  | 'pharmacist-login'
  | 'pharmacist-register'
  | 'pharmacist-success'
  | 'client-login'
  | 'client-register'
  | 'client-success'
  | 'dashboard';

export default function App() {
  const [currentState, setCurrentState] = useState<AppState>('home');
  const [currentPharmacist, setCurrentPharmacist] = useState<any>(null);
  const [currentClient, setCurrentClient] = useState<any>(null);
  const [registeredData, setRegisteredData] = useState<any>(null);

  const handlePharmacistLogin = (crf: string) => {
    // Buscar dados do farmacêutico
    const storedPharmacists = JSON.parse(localStorage.getItem('pharmacists') || '[]');
    const pharmacist = storedPharmacists.find((p: any) => p.crf === crf);
    
    setCurrentPharmacist(pharmacist);
    setCurrentState('client-login');
  };

  const handlePharmacistRegister = (data: any) => {
    setRegisteredData(data);
    setCurrentState('pharmacist-success');
  };

  const handlePharmacistSuccess = () => {
    setCurrentState('pharmacist-login');
    setRegisteredData(null);
  };

  const handleClientLogin = (clientId: string) => {
    // Buscar dados do cliente
    const storedClients = JSON.parse(localStorage.getItem('clients') || '[]');
    const client = storedClients.find((c: any) => c.clientId === clientId);
    
    setCurrentClient(client);
    setCurrentState('dashboard');
  };

  const handleClientRegister = (data: any) => {
    setRegisteredData(data);
    setCurrentState('client-success');
  };

  const handleClientSuccess = () => {
    setCurrentState('client-login');
    setRegisteredData(null);
  };

  const handleLogoutPharmacist = () => {
    setCurrentPharmacist(null);
    setCurrentClient(null);
    setCurrentState('home');
  };

  const handleLogout = () => {
    setCurrentPharmacist(null);    
    setCurrentClient(null);
    setCurrentState('home');
  };

  const handleBackToHome = () => {
    setCurrentPharmacist(null);
    setCurrentClient(null);
    setRegisteredData(null);
    setCurrentState('home');
  };

  return (
    <div className="min-h-screen">
      {currentState === 'home' && (
        <HomePage
          onNavigateToPharmacistSection={() => setCurrentState('pharmacist-login')}
          onNavigateToPatientSection={() => setCurrentState('pharmacist-login')}
        />
      )}

      {currentState === 'pharmacist-login' && (
        <PharmacistLogin
          onLogin={handlePharmacistLogin}
          onShowRegister={() => setCurrentState('pharmacist-register')}
          onBackToHome={handleBackToHome}
        />
      )}

      {currentState === 'pharmacist-register' && (
        <PharmacistRegistration
          onRegister={handlePharmacistRegister}
          onBack={() => setCurrentState('pharmacist-login')}
        />
      )}

      {currentState === 'client-login' && currentPharmacist && (
        <ClientLogin
          onLogin={handleClientLogin}
          onShowRegister={() => setCurrentState('client-register')}
          onLogoutPharmacist={handleLogoutPharmacist}
          pharmacistName={currentPharmacist.name}
        />
      )}

      {currentState === 'client-register' && currentPharmacist && (
        <ClientRegistration
          onRegister={handleClientRegister}
          onBack={() => setCurrentState('client-login')}
          pharmacistName={currentPharmacist.name}
        />
      )}

      {currentState === 'dashboard' && currentPharmacist && currentClient && (
        <Dashboard
          pharmacist={currentPharmacist}
          client={currentClient}
          onLogout={handleLogout}
        />
      )}

      {currentState === 'pharmacist-success' && registeredData && (
        <SuccessModal
          type="pharmacist"
          data={registeredData}
          onContinue={handlePharmacistSuccess}
        />
      )}

      {currentState === 'client-success' && registeredData && (
        <SuccessModal
          type="client"
          data={registeredData}
          onContinue={handleClientSuccess}
        />
      )}
    </div>
  );
}