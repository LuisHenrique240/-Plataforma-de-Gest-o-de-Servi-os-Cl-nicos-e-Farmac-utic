import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card, CardHeader, CardTitle, CardContent } from './ui/card';
import { UserCheck, Home } from 'lucide-react';
import { FormValidator } from './FormValidation';
import { FeedbackMessage, useFeedback } from './FeedbackMessage';

interface PharmacistLoginProps {
  onLogin: (crf: string) => void;
  onShowRegister: () => void;
  onBackToHome?: () => void;
}

export function PharmacistLogin({ onLogin, onShowRegister, onBackToHome }: PharmacistLoginProps) {
  const [crf, setCrf] = useState('');
  const [error, setError] = useState('');
  const { messages, success, error: showError, removeMessage } = useFeedback();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const crfError = FormValidator.validateCRF(crf);
    if (crfError) {
      setError(crfError);
      showError(crfError);
      return;
    }

    try {
      // Simular validação
      const storedPharmacists = JSON.parse(localStorage.getItem('pharmacists') || '[]');
      const pharmacist = storedPharmacists.find((p: any) => p.crf === crf.toUpperCase());
      
      if (!pharmacist) {
        const errorMsg = 'CRF não encontrado. Verifique o número ou faça seu cadastro.';
        setError(errorMsg);
        showError(errorMsg);
        return;
      }

      setError('');
      success(`Bem-vindo, ${pharmacist.name}!`);
      setTimeout(() => onLogin(crf), 1000);
    } catch (err) {
      const errorMsg = 'Erro no sistema. Tente novamente.';
      setError(errorMsg);
      showError(errorMsg);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-teal-50 px-4 relative overflow-hidden">
      {/* Decorative waves */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-blue-100/30 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-32 -right-32 w-80 h-80 bg-teal-100/30 rounded-full blur-3xl"></div>
        <div className="absolute top-1/3 left-1/4 w-64 h-64 bg-blue-200/20 rounded-full blur-2xl"></div>
      </div>
      
      {/* Decorative border waves */}
      <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-blue-400 via-teal-400 to-blue-400">
        <div className="h-full bg-gradient-to-r from-blue-500 via-teal-500 to-blue-500 rounded-b-full transform scale-x-150 origin-center"></div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-2 bg-gradient-to-r from-teal-400 via-blue-400 to-teal-400">
        <div className="h-full bg-gradient-to-r from-teal-500 via-blue-500 to-teal-500 rounded-t-full transform scale-x-150 origin-center"></div>
      </div>

      <Card className="w-full max-w-md relative z-10 border-2 border-blue-100/50 shadow-xl">
        <CardHeader className="text-center bg-gradient-to-br from-blue-50 to-teal-50">
          <div className="mx-auto w-16 h-16 bg-gradient-to-br from-blue-500 to-teal-500 rounded-full flex items-center justify-center mb-4 shadow-lg">
            <UserCheck className="w-8 h-8 text-white" />
          </div>
          <CardTitle className="text-blue-800">Login - Farmacêutico</CardTitle>
          <p className="text-blue-600">
            Entre com seu CRF
          </p>
        </CardHeader>
        <CardContent className="bg-white">
          {onBackToHome && (
            <div className="mb-4">
              <Button
                type="button"
                variant="ghost"
                onClick={onBackToHome}
                className="text-blue-600 hover:text-blue-800 hover:bg-blue-50"
              >
                <Home className="w-4 h-4 mr-2" />
                Voltar ao Menu Principal
              </Button>
            </div>
          )}
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="crf" className="text-blue-700 required">CRF *</Label>
              <Input
                id="crf"
                name="crf"
                type="text"
                value={crf}
                onChange={(e) => {
                  setCrf(e.target.value.toUpperCase());
                  setError('');
                }}
                placeholder="Ex: CRF-12345"
                className={`text-center border-blue-200 focus:border-blue-400 focus:ring-blue-400 ${
                  error ? 'border-red-300 focus:border-red-400 focus:ring-red-400' : ''
                }`}
                required
                maxLength={10}
                aria-describedby={error ? "crf-error" : undefined}
              />
              {error && (
                <p id="crf-error" className="text-red-500 text-sm flex items-center gap-1">
                  <span>⚠</span> {error}
                </p>
              )}
            </div>

            <Button 
              type="submit" 
              className="w-full bg-gradient-to-r from-blue-600 to-teal-600 hover:from-blue-700 hover:to-teal-700"
            >
              Entrar no Sistema
            </Button>
            
            <div className="text-center space-y-2">
              <button
                type="button"
                onClick={onShowRegister}
                className="text-blue-600 hover:text-teal-600 hover:underline transition-colors"
              >
                Não possui cadastro? Cadastre-se aqui
              </button>
              <p className="text-xs text-blue-500">
                Entre com seu CRF para acessar o sistema de atendimento
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