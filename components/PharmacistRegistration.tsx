import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card, CardHeader, CardTitle, CardContent } from './ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { UserPlus, ArrowLeft } from 'lucide-react';
import { FormValidator, useFormValidation } from './FormValidation';
import { FeedbackMessage, useFeedback } from './FeedbackMessage';

interface PharmacistRegistrationProps {
  onRegister: (data: any) => void;
  onBack: () => void;
}

export function PharmacistRegistration({ onRegister, onBack }: PharmacistRegistrationProps) {
  const [formData, setFormData] = useState({
    name: '',
    birthDate: '',
    gender: '',
    address: '',
    contact: ''
  });
  const { errors, validateField, clearErrors, hasErrors } = useFormValidation();
  const { messages, success, error, removeMessage } = useFeedback();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validar todos os campos
    const validations = [
      validateField('name', formData.name, FormValidator.validateName),
      validateField('birthDate', formData.birthDate, FormValidator.validateBirthDate),
      validateField('gender', formData.gender, FormValidator.validateGender),
      validateField('address', formData.address, FormValidator.validateAddress),
      validateField('contact', formData.contact, FormValidator.validatePhone)
    ];

    const isValid = validations.every(Boolean);

    if (!isValid) {
      error('Por favor, corrija os erros no formulário');
      return;
    }

    try {
      // Gerar CRF
      const crf = 'CRF-' + Math.floor(10000 + Math.random() * 90000).toString();
      
      const pharmacistData = {
        ...formData,
        contact: FormValidator.formatPhone(formData.contact),
        crf,
        id: Date.now().toString()
      };

      // Salvar no localStorage
      const storedPharmacists = JSON.parse(localStorage.getItem('pharmacists') || '[]');
      storedPharmacists.push(pharmacistData);
      localStorage.setItem('pharmacists', JSON.stringify(storedPharmacists));

      success('Farmacêutico cadastrado com sucesso!');
      clearErrors();
      onRegister(pharmacistData);
    } catch (err) {
      error('Erro ao cadastrar farmacêutico. Tente novamente.');
    }
  };

  const updateFormData = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Validação em tempo real
    setTimeout(() => {
      switch (field) {
        case 'name':
          validateField(field, value, FormValidator.validateName);
          break;
        case 'birthDate':
          validateField(field, value, FormValidator.validateBirthDate);
          break;
        case 'gender':
          validateField(field, value, FormValidator.validateGender);
          break;
        case 'address':
          validateField(field, value, FormValidator.validateAddress);
          break;
        case 'contact':
          validateField(field, value, FormValidator.validatePhone);
          break;
      }
    }, 500); // Debounce para não validar a cada tecla
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-teal-50 via-white to-blue-50 px-4 py-8 relative overflow-hidden">
      {/* Decorative waves */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-32 -right-24 w-96 h-96 bg-teal-100/30 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-24 -left-32 w-80 h-80 bg-blue-100/30 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 right-1/3 w-64 h-64 bg-teal-200/20 rounded-full blur-2xl"></div>
      </div>

      {/* Decorative border waves */}
      <div className="absolute top-0 left-0 right-0 h-3 bg-gradient-to-r from-teal-400 via-blue-400 to-teal-400">
        <div className="h-full bg-gradient-to-r from-teal-500 via-blue-500 to-teal-500 rounded-b-3xl transform scale-x-125 origin-center"></div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-3 bg-gradient-to-r from-blue-400 via-teal-400 to-blue-400">
        <div className="h-full bg-gradient-to-r from-blue-500 via-teal-500 to-blue-500 rounded-t-3xl transform scale-x-125 origin-center"></div>
      </div>

      <Card className="w-full max-w-md relative z-10 border-2 border-teal-100/50 shadow-xl">
        <CardHeader className="text-center bg-gradient-to-br from-teal-50 to-blue-50">
          <div className="mx-auto w-16 h-16 bg-gradient-to-br from-teal-500 to-blue-500 rounded-full flex items-center justify-center mb-4 shadow-lg">
            <UserPlus className="w-8 h-8 text-white" />
          </div>
          <CardTitle className="text-teal-800">Cadastro - Farmacêutico</CardTitle>
          <p className="text-teal-600">
            Preencha seus dados para se cadastrar
          </p>
        </CardHeader>
        <CardContent className="bg-white">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-teal-700 required">Nome Completo *</Label>
              <Input
                id="name"
                name="name"
                type="text"
                value={formData.name}
                onChange={(e) => updateFormData('name', e.target.value)}
                placeholder="Digite seu nome completo"
                className={`border-teal-200 focus:border-teal-400 focus:ring-teal-400 ${
                  errors.name ? 'border-red-300 focus:border-red-400 focus:ring-red-400' : ''
                }`}
                required
                aria-describedby={errors.name ? "name-error" : undefined}
              />
              {errors.name && (
                <p id="name-error" className="text-red-500 text-sm flex items-center gap-1">
                  <span>⚠</span> {errors.name}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="birthDate" className="text-blue-700 required">Data de Nascimento *</Label>
              <Input
                id="birthDate"
                name="birthDate"
                type="date"
                value={formData.birthDate}
                onChange={(e) => updateFormData('birthDate', e.target.value)}
                className={`border-blue-200 focus:border-blue-400 focus:ring-blue-400 ${
                  errors.birthDate ? 'border-red-300 focus:border-red-400 focus:ring-red-400' : ''
                }`}
                required
                max={new Date().toISOString().split('T')[0]}
                aria-describedby={errors.birthDate ? "birthDate-error" : undefined}
              />
              {errors.birthDate && (
                <p id="birthDate-error" className="text-red-500 text-sm flex items-center gap-1">
                  <span>⚠</span> {errors.birthDate}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="gender" className="text-teal-700 required">Sexo *</Label>
              <Select 
                value={formData.gender} 
                onValueChange={(value) => updateFormData('gender', value)}
                required
              >
                <SelectTrigger className={`border-teal-200 focus:border-teal-400 focus:ring-teal-400 ${
                  errors.gender ? 'border-red-300 focus:border-red-400 focus:ring-red-400' : ''
                }`}>
                  <SelectValue placeholder="Selecione o sexo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="M">Masculino</SelectItem>
                  <SelectItem value="F">Feminino</SelectItem>
                  <SelectItem value="O">Outro</SelectItem>
                </SelectContent>
              </Select>
              {errors.gender && (
                <p className="text-red-500 text-sm flex items-center gap-1">
                  <span>⚠</span> {errors.gender}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="address" className="text-blue-700 required">Endereço *</Label>
              <Input
                id="address"
                name="address"
                type="text"
                value={formData.address}
                onChange={(e) => updateFormData('address', e.target.value)}
                placeholder="Digite seu endereço completo"
                className={`border-blue-200 focus:border-blue-400 focus:ring-blue-400 ${
                  errors.address ? 'border-red-300 focus:border-red-400 focus:ring-red-400' : ''
                }`}
                required
                aria-describedby={errors.address ? "address-error" : undefined}
              />
              {errors.address && (
                <p id="address-error" className="text-red-500 text-sm flex items-center gap-1">
                  <span>⚠</span> {errors.address}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="contact" className="text-teal-700 required">Contato *</Label>
              <Input
                id="contact"
                name="contact"
                type="tel"
                value={formData.contact}
                onChange={(e) => updateFormData('contact', e.target.value)}
                placeholder="(11) 99999-9999"
                className={`border-teal-200 focus:border-teal-400 focus:ring-teal-400 ${
                  errors.contact ? 'border-red-300 focus:border-red-400 focus:ring-red-400' : ''
                }`}
                required
                aria-describedby={errors.contact ? "contact-error" : undefined}
              />
              {errors.contact && (
                <p id="contact-error" className="text-red-500 text-sm flex items-center gap-1">
                  <span>⚠</span> {errors.contact}
                </p>
              )}
            </div>

            <div className="flex flex-col sm:flex-row gap-3 pt-4">
              <Button 
                type="button" 
                variant="outline" 
                onClick={onBack}
                className="flex-1 border-blue-300 text-blue-700 hover:bg-blue-50 order-2 sm:order-1"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Voltar
              </Button>
              <Button 
                type="submit" 
                className="flex-1 bg-gradient-to-r from-teal-600 to-blue-600 hover:from-teal-700 hover:to-blue-700 order-1 sm:order-2"
                disabled={hasErrors}
              >
                Cadastrar Farmacêutico
              </Button>
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