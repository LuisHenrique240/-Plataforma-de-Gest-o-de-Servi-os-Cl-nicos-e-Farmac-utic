// Utilitários para validação de formulários
export class FormValidator {
  static validateName(name: string): string | null {
    if (!name.trim()) {
      return 'Nome é obrigatório';
    }
    if (name.trim().length < 2) {
      return 'Nome deve ter pelo menos 2 caracteres';
    }
    if (!/^[a-zA-ZÀ-ÿ\s]+$/.test(name.trim())) {
      return 'Nome deve conter apenas letras e espaços';
    }
    return null;
  }

  static validateBirthDate(birthDate: string): string | null {
    if (!birthDate.trim()) {
      return 'Data de nascimento é obrigatória';
    }
    
    const today = new Date();
    const birth = new Date(birthDate);
    
    if (birth > today) {
      return 'Data de nascimento não pode ser futura';
    }
    
    const age = today.getFullYear() - birth.getFullYear();
    if (age < 0 || age > 120) {
      return 'Data de nascimento inválida';
    }
    
    return null;
  }

  static validatePhone(phone: string): string | null {
    if (!phone.trim()) {
      return 'Contato é obrigatório';
    }
    
    // Remove caracteres não numéricos
    const cleanPhone = phone.replace(/\D/g, '');
    
    if (cleanPhone.length < 10 || cleanPhone.length > 11) {
      return 'Número de telefone inválido';
    }
    
    return null;
  }

  static validateAddress(address: string): string | null {
    if (!address.trim()) {
      return 'Endereço é obrigatório';
    }
    if (address.trim().length < 5) {
      return 'Endereço deve ter pelo menos 5 caracteres';
    }
    return null;
  }

  static validateCRF(crf: string): string | null {
    if (!crf.trim()) {
      return 'CRF é obrigatório';
    }
    
    // Formato básico CRF-XXXXX
    const crfPattern = /^CRF-?\d{4,6}$/i;
    if (!crfPattern.test(crf.trim())) {
      return 'CRF deve estar no formato CRF-12345';
    }
    
    return null;
  }

  static validateGender(gender: string): string | null {
    if (!gender) {
      return 'Sexo é obrigatório';
    }
    if (!['M', 'F', 'O'].includes(gender)) {
      return 'Sexo deve ser Masculino, Feminino ou Outro';
    }
    return null;
  }

  // Formatadores
  static formatPhone(phone: string): string {
    const cleanPhone = phone.replace(/\D/g, '');
    
    if (cleanPhone.length === 11) {
      return cleanPhone.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
    } else if (cleanPhone.length === 10) {
      return cleanPhone.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3');
    }
    
    return phone;
  }

  static formatCRF(crf: string): string {
    const cleanCRF = crf.replace(/\D/g, '');
    return `CRF-${cleanCRF}`;
  }
}

// Hook para usar validação em componentes
import { useState, useCallback } from 'react';

export function useFormValidation() {
  const [errors, setErrors] = useState<{[key: string]: string}>({});

  const validateField = useCallback((field: string, value: string, validator: (value: string) => string | null) => {
    const error = validator(value);
    setErrors(prev => {
      if (error) {
        return { ...prev, [field]: error };
      } else {
        const { [field]: removed, ...rest } = prev;
        return rest;
      }
    });
    return !error;
  }, []);

  const clearErrors = useCallback(() => {
    setErrors({});
  }, []);

  const hasErrors = Object.keys(errors).length > 0;

  return {
    errors,
    validateField,
    clearErrors,
    hasErrors
  };
}