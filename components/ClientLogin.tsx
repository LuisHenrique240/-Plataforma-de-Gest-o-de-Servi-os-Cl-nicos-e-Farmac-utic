import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card, CardHeader, CardTitle, CardContent } from './ui/card';
import { Users, LogOut } from 'lucide-react';
import { FeedbackMessage, useFeedback } from './FeedbackMessage';

interface ClientLoginProps {
  onLogin: (clientId: string) => void;
  onShowRegister: () => void;
  onLogoutPharmacist: () => void;
  pharmacistName: string;
}

export function ClientLogin({ onLogin, onShowRegister, onLogoutPharmacist, pharmacistName }: ClientLoginProps) {
  const [clientId, setClientId] = useState('');
  const [error, setError] = useState('');
  const { messages, success, error: showError, removeMessage } = useFeedback();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!clientId.trim()) {
      const errorMsg = 'ID do cliente é obrigatório';
      setError(errorMsg);
      showError(errorMsg);
      return;
    }

    try {
      // Simular validação
      const storedClients = JSON.parse(localStorage.getItem('clients') || '[]');
      const client = storedClients.find((c: any) => c.clientId === clientId.toUpperCase());
      
      if (!client) {
        const errorMsg = 'ID do cliente não encontrado. Verifique o ID ou faça o cadastro.';
        setError(errorMsg);
        showError(errorMsg);
        return;
      }

      setError('');
      success(`Iniciando atendimento para ${client.name}`);
      setTimeout(() => onLogin(clientId), 1000);
    } catch (err) {
      const errorMsg = 'Erro no sistema. Tente novamente.';
      setError(errorMsg);
      showError(errorMsg);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 via-white to-blue-50 px-4 relative overflow-hidden">
      {/* Decorative waves */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-green-100/30 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-32 -right-32 w-80 h-80 bg-blue-100/30 rounded-full blur-3xl"></div>
        <div className="absolute top-2/3 left-1/3 w-64 h-64 bg-green-200/20 rounded-full blur-2xl"></div>
      </div>
      
      {/* Decorative border waves */}
      <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-green-400 via-blue-400 to-green-400">
        <div className="h-full bg-gradient-to-r from-green-500 via-blue-500 to-green-500 rounded-b-full transform scale-x-150 origin-center"></div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-2 bg-gradient-to-r from-blue-400 via-green-400 to-blue-400">
        <div className="h-full bg-gradient-to-r from-blue-500 via-green-500 to-blue-500 rounded-t-full transform scale-x-150 origin-center"></div>
      </div>

      <Card className="w-full max-w-md relative z-10 border-2 border-green-100/50 shadow-xl">
        <CardHeader className="text-center bg-gradient-to-br from-green-50 to-blue-50">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2 text-sm text-green-600 bg-white/70 px-3 py-1 rounded-full">
              <span>Farmacêutico: {pharmacistName}</span>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={onLogoutPharmacist}
              className="border-blue-300 text-blue-600 hover:bg-blue-50"
            >
              <LogOut className="w-4 h-4 mr-1" />
              Sair
            </Button>
          </div>
          <div className="mx-auto w-16 h-16 bg-gradient-to-br from-green-500 to-blue-500 rounded-full flex items-center justify-center mb-4 shadow-lg">
            <Users className="w-8 h-8 text-white" />
          </div>
          <CardTitle className="text-green-800">Login - Cliente</CardTitle>
          <p className="text-green-600">
            Entre com seu ID de cliente
          </p>
        </CardHeader>
        <CardContent className="bg-white">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="clientId" className="text-green-700 required">ID do Paciente *</Label>
              <Input
                id="clientId"
                name="clientId"
                type="text"
                value={clientId}
                onChange={(e) => {
                  setClientId(e.target.value.toUpperCase());
                  setError('');
                }}
                placeholder="Ex: CLI12345"
                className={`text-center border-green-200 focus:border-green-400 focus:ring-green-400 ${
                  error ? 'border-red-300 focus:border-red-400 focus:ring-red-400' : ''
                }`}
                required
                maxLength={8}
                aria-describedby={error ? "clientId-error" : undefined}
              />
              {error && (
                <p id="clientId-error" className="text-red-500 text-sm flex items-center gap-1">
                  <span>⚠</span> {error}
                </p>
              )}
            </div>

            <Button 
              type="submit" 
              className="w-full bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700"
            >
              Iniciar Atendimento
            </Button>
            
            <div className="text-center space-y-2">
              <button
                type="button"
                onClick={onShowRegister}
                className="text-green-600 hover:text-blue-600 hover:underline transition-colors"
              >
                Paciente novo? Cadastre-se aqui
              </button>
              <p className="text-xs text-green-600">
                Entre com o ID do paciente para iniciar o atendimento
              </p>
            </div>
          </form>

          {/* Mensagens de feedback */}
          {messages.map((msg) => (
            <FeedbackMessage
              key={msg.id}
              type={msg.type}
              message={msg.message}
              onClose={() => removeMessage(msg.id)}
            />
          ))}
        </CardContent>
      </Card>
    </div>
  );
}