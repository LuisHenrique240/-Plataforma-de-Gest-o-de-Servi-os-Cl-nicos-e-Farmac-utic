import { Button } from './ui/button';
import { Card, CardHeader, CardTitle, CardContent } from './ui/card';
import { UserPlus, Users, Activity, Building2 } from 'lucide-react';

interface HomePageProps {
  onNavigateToPharmacistSection: () => void;
  onNavigateToPatientSection: () => void;
}

export function HomePage({ onNavigateToPharmacistSection, onNavigateToPatientSection }: HomePageProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-teal-50 relative overflow-hidden">
      {/* Header decorativo */}
      <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-blue-400 via-teal-400 to-blue-400">
        <div className="h-full bg-gradient-to-r from-blue-500 via-teal-500 to-blue-500 rounded-b-full transform scale-x-150 origin-center"></div>
      </div>
      
      {/* Elementos decorativos */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-blue-100/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-32 -right-32 w-80 h-80 bg-teal-100/20 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/3 w-64 h-64 bg-blue-200/15 rounded-full blur-2xl"></div>
      </div>

      <div className="relative z-10">
        {/* Header */}
        <header className="text-center py-12">
          <div className="mx-auto w-20 h-20 bg-gradient-to-br from-blue-600 to-teal-600 rounded-full flex items-center justify-center mb-6 shadow-lg">
            <Building2 className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-blue-900 mb-4">
            Sistema Clínica
          </h1>
          <p className="text-xl text-blue-700 max-w-2xl mx-auto px-4">
            Plataforma completa para gestão de pacientes e farmacêuticos
          </p>
        </header>

        {/* Menu Principal */}
        <div className="max-w-4xl mx-auto px-4 pb-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            {/* Cadastro de Farmacêuticos */}
            <Card 
              className="border-2 border-blue-100 hover:border-blue-200 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer group"
              onClick={onNavigateToPharmacistSection}
            >
              <CardHeader className="text-center bg-gradient-to-br from-blue-50 to-teal-50 group-hover:from-blue-100 group-hover:to-teal-100 transition-all">
                <div className="mx-auto w-16 h-16 bg-gradient-to-br from-blue-500 to-teal-500 rounded-full flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform">
                  <UserPlus className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-blue-800 text-xl">
                  Cadastro de Farmacêuticos
                </CardTitle>
              </CardHeader>
              <CardContent className="bg-white text-center p-6">
                <p className="text-blue-600 mb-6">
                  Gerencie o cadastro e login dos profissionais farmacêuticos
                </p>
                <div className="space-y-2 text-sm text-blue-700">
                  <div className="flex items-center justify-center gap-2">
                    <Activity className="w-4 h-4" />
                    <span>Login com CRF</span>
                  </div>
                  <div className="flex items-center justify-center gap-2">
                    <Activity className="w-4 h-4" />
                    <span>Cadastro completo</span>
                  </div>
                </div>
                <Button className="w-full mt-6 bg-gradient-to-r from-blue-600 to-teal-600 hover:from-blue-700 hover:to-teal-700">
                  Acessar Área
                </Button>
              </CardContent>
            </Card>

            {/* Cadastro de Pacientes */}
            <Card 
              className="border-2 border-teal-100 hover:border-teal-200 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer group"
              onClick={onNavigateToPatientSection}
            >
              <CardHeader className="text-center bg-gradient-to-br from-teal-50 to-green-50 group-hover:from-teal-100 group-hover:to-green-100 transition-all">
                <div className="mx-auto w-16 h-16 bg-gradient-to-br from-teal-500 to-green-500 rounded-full flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform">
                  <Users className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-teal-800 text-xl">
                  Cadastro de Pacientes
                </CardTitle>
              </CardHeader>
              <CardContent className="bg-white text-center p-6">
                <p className="text-teal-600 mb-6">
                  Gerencie o cadastro e atendimento dos pacientes
                </p>
                <div className="space-y-2 text-sm text-teal-700">
                  <div className="flex items-center justify-center gap-2">
                    <Activity className="w-4 h-4" />
                    <span>Login de pacientes</span>
                  </div>
                  <div className="flex items-center justify-center gap-2">
                    <Activity className="w-4 h-4" />
                    <span>Atendimento completo</span>
                  </div>
                </div>
                <Button className="w-full mt-6 bg-gradient-to-r from-teal-600 to-green-600 hover:from-teal-700 hover:to-green-700">
                  Acessar Área
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Informações do Sistema */}
          <Card className="border-2 border-blue-100 bg-white/70 backdrop-blur-sm">
            <CardContent className="text-center p-8">
              <h3 className="text-2xl font-semibold text-blue-800 mb-4">
                Bem-vindo ao Sistema Clínica
              </h3>
              <p className="text-blue-600 max-w-3xl mx-auto leading-relaxed">
                Nossa plataforma oferece uma solução completa para o gerenciamento 
                de farmacêuticos e pacientes, com interface moderna, responsiva e 
                funcionalidades específicas para o ambiente hospitalar e farmacêutico.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8 text-sm">
                <div className="text-center">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
                    <Activity className="w-6 h-6 text-blue-600" />
                  </div>
                  <h4 className="font-medium text-blue-800">Seguro</h4>
                  <p className="text-blue-600">Sistema seguro com validações</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-2">
                    <Activity className="w-6 h-6 text-teal-600" />
                  </div>
                  <h4 className="font-medium text-teal-800">Responsivo</h4>
                  <p className="text-teal-600">Funciona em todos os dispositivos</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
                    <Activity className="w-6 h-6 text-green-600" />
                  </div>
                  <h4 className="font-medium text-green-800">Moderno</h4>
                  <p className="text-green-600">Interface clean e intuitiva</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Footer decorativo */}
      <div className="absolute bottom-0 left-0 right-0 h-2 bg-gradient-to-r from-teal-400 via-blue-400 to-teal-400">
        <div className="h-full bg-gradient-to-r from-teal-500 via-blue-500 to-teal-500 rounded-t-full transform scale-x-150 origin-center"></div>
      </div>
    </div>
  );
}