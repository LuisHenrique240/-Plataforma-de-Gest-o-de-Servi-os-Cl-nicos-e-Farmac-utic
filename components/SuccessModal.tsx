import { Button } from './ui/button';
import { Card, CardHeader, CardTitle, CardContent } from './ui/card';
import { CheckCircle, Copy } from 'lucide-react';
import { useState } from 'react';

interface SuccessModalProps {
  type: 'pharmacist' | 'client';
  data: any;
  onContinue: () => void;
}

export function SuccessModal({ type, data, onContinue }: SuccessModalProps) {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    const textToCopy = type === 'pharmacist' ? data.crf : data.clientId;
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Calcular idade a partir da data de nascimento
  const calculateAge = (birthDate: string) => {
    if (!birthDate) return 'N/A';
    const today = new Date();
    const birth = new Date(birthDate);
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
      age--;
    }
    
    return age;
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center px-4 z-50">
      <Card className="w-full max-w-md border-2 border-teal-100 shadow-2xl">
        <CardHeader className="text-center bg-gradient-to-br from-teal-50 to-blue-50">
          <div className="mx-auto w-20 h-20 bg-gradient-to-br from-teal-500 to-blue-500 rounded-full flex items-center justify-center mb-4 shadow-lg">
            <CheckCircle className="w-10 h-10 text-white" />
          </div>
          <CardTitle className="text-teal-700">
            {type === 'pharmacist' ? 'Farmacêutico' : 'Cliente'} Cadastrado com Sucesso!
          </CardTitle>
        </CardHeader>
        <CardContent className="text-center space-y-4 bg-white">
          <div className="p-4 bg-gradient-to-r from-teal-50 to-blue-50 rounded-lg border border-teal-100">
            <p className="text-sm text-teal-600 mb-2">
              {type === 'pharmacist' ? 'CRF:' : 'ID do Cliente:'}
            </p>
            <div className="flex items-center justify-center gap-2">
              <p className="text-xl font-mono font-bold text-teal-800">
                {type === 'pharmacist' ? data.crf : data.clientId}
              </p>
              <Button
                variant="outline"
                size="sm"
                onClick={copyToClipboard}
                className="border-teal-300 text-teal-600 hover:bg-teal-50"
              >
                <Copy className="w-4 h-4" />
              </Button>
            </div>
            {copied && (
              <p className="text-teal-600 text-sm mt-1">Copiado!</p>
            )}
          </div>

          <div className="text-left space-y-2 text-sm bg-gradient-to-br from-blue-50 to-teal-50 p-4 rounded-lg">
            <p><strong className="text-blue-700">Nome:</strong> {data.name}</p>
            <p><strong className="text-teal-700">Idade:</strong> {calculateAge(data.birthDate)} anos</p>
            <p><strong className="text-blue-700">Data de Nascimento:</strong> {new Date(data.birthDate).toLocaleDateString('pt-BR')}</p>
            <p><strong className="text-teal-700">Sexo:</strong> {data.gender === 'M' ? 'Masculino' : data.gender === 'F' ? 'Feminino' : 'Outro'}</p>
            <p><strong className="text-blue-700">Contato:</strong> {data.contact}</p>
          </div>

          <Button onClick={onContinue} className="w-full bg-gradient-to-r from-teal-600 to-blue-600 hover:from-teal-700 hover:to-blue-700">
            Continuar
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}