import { Button } from './ui/button';
import { Card, CardHeader, CardTitle, CardContent } from './ui/card';
import { User, Users, LogOut, FileText, Calendar, Pill } from 'lucide-react';

interface DashboardProps {
  pharmacist: any;
  client: any;
  onLogout: () => void;
}

export function Dashboard({ pharmacist, client, onLogout }: DashboardProps) {
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-teal-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-teal-600 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="text-white">
              <h1 className="text-2xl font-semibold">Sistema de Atendimento - Farmácia</h1>
              <p className="text-blue-100 opacity-90">
                Farmacêutico: {pharmacist.name} ({pharmacist.crf})
              </p>
            </div>
            <Button variant="outline" onClick={onLogout} className="bg-white/20 border-white/30 text-white hover:bg-white/30">
              <LogOut className="w-4 h-4 mr-2" />
              Sair
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Cliente Atual */}
        <Card className="mb-8 border-2 border-blue-100 shadow-lg">
          <CardHeader className="bg-gradient-to-r from-blue-50 to-teal-50">
            <CardTitle className="flex items-center gap-2 text-blue-800">
              <User className="w-5 h-5" />
              Cliente em Atendimento
            </CardTitle>
          </CardHeader>
          <CardContent className="bg-white">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <p className="text-sm text-blue-600">Nome</p>
                <p className="font-medium text-blue-900">{client.name}</p>
              </div>
              <div>
                <p className="text-sm text-teal-600">ID</p>
                <p className="font-medium font-mono text-teal-900">{client.clientId}</p>
              </div>
              <div>
                <p className="text-sm text-blue-600">Idade</p>
                <p className="font-medium text-blue-900">{calculateAge(client.birthDate)} anos</p>
              </div>
              <div>
                <p className="text-sm text-teal-600">Contato</p>
                <p className="font-medium text-teal-900">{client.contact}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Ações Rápidas */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <Card className="hover:shadow-xl transition-all cursor-pointer border-2 border-blue-100 hover:border-blue-200 transform hover:-translate-y-1">
            <CardContent className="p-6 text-center bg-gradient-to-br from-blue-50 to-white">
              <Pill className="w-12 h-12 mx-auto mb-4 text-blue-600" />
              <h3 className="font-medium mb-2 text-blue-800">Dispensar Medicamento</h3>
              <p className="text-sm text-blue-600">
                Registrar dispensação de medicamentos
              </p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-xl transition-all cursor-pointer border-2 border-teal-100 hover:border-teal-200 transform hover:-translate-y-1">
            <CardContent className="p-6 text-center bg-gradient-to-br from-teal-50 to-white">
              <FileText className="w-12 h-12 mx-auto mb-4 text-teal-600" />
              <h3 className="font-medium mb-2 text-teal-800">Receitas</h3>
              <p className="text-sm text-teal-600">
                Visualizar e processar receitas médicas
              </p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-xl transition-all cursor-pointer border-2 border-green-100 hover:border-green-200 transform hover:-translate-y-1">
            <CardContent className="p-6 text-center bg-gradient-to-br from-green-50 to-white">
              <Calendar className="w-12 h-12 mx-auto mb-4 text-green-600" />
              <h3 className="font-medium mb-2 text-green-800">Consultas</h3>
              <p className="text-sm text-green-600">
                Agendar consultas farmacêuticas
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Informações Adicionais */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="border-2 border-blue-100">
            <CardHeader className="bg-gradient-to-r from-blue-50 to-teal-50">
              <CardTitle className="text-blue-800">Histórico do Cliente</CardTitle>
            </CardHeader>
            <CardContent className="bg-white">
              <p className="text-blue-600 text-center py-8">
                Nenhum histórico encontrado para este cliente.
              </p>
            </CardContent>
          </Card>

          <Card className="border-2 border-teal-100">
            <CardHeader className="bg-gradient-to-r from-teal-50 to-blue-50">
              <CardTitle className="text-teal-800">Medicamentos Recentes</CardTitle>
            </CardHeader>
            <CardContent className="bg-white">
              <p className="text-teal-600 text-center py-8">
                Nenhum medicamento dispensado recentemente.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Footer Info */}
        <div className="mt-8 text-center text-sm text-blue-600 bg-white/50 rounded-lg p-4">
          <p>Sistema ativo desde {new Date().toLocaleDateString('pt-BR')} • Farmácia Digital</p>
        </div>
      </div>
    </div>
  );
}