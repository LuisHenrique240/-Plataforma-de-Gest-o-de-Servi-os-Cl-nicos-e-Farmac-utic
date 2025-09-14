// Utilitários gerais do Sistema Clínica

// Validadores
const Validators = {
  validateName(name) {
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
  },

  validateBirthDate(birthDate) {
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
  },

  validatePhone(phone) {
    if (!phone.trim()) {
      return 'Contato é obrigatório';
    }
    
    // Remove caracteres não numéricos
    const cleanPhone = phone.replace(/\D/g, '');
    
    if (cleanPhone.length < 10 || cleanPhone.length > 11) {
      return 'Número de telefone inválido';
    }
    
    return null;
  },

  validateAddress(address) {
    if (!address.trim()) {
      return 'Endereço é obrigatório';
    }
    if (address.trim().length < 5) {
      return 'Endereço deve ter pelo menos 5 caracteres';
    }
    return null;
  },

  validateCRF(crf) {
    if (!crf.trim()) {
      return 'CRF é obrigatório';
    }
    
    // Formato básico CRF-XXXXX
    const crfPattern = /^CRF-?\d{4,6}$/i;
    if (!crfPattern.test(crf.trim())) {
      return 'CRF deve estar no formato CRF-12345';
    }
    
    return null;
  },

  validateGender(gender) {
    if (!gender) {
      return 'Sexo é obrigatório';
    }
    if (!['M', 'F', 'O'].includes(gender)) {
      return 'Sexo deve ser Masculino, Feminino ou Outro';
    }
    return null;
  }
};

// Formatadores
const Formatters = {
  formatPhone(phone) {
    const cleanPhone = phone.replace(/\D/g, '');
    
    if (cleanPhone.length === 11) {
      return cleanPhone.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
    } else if (cleanPhone.length === 10) {
      return cleanPhone.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3');
    }
    
    return phone;
  },

  formatCRF(crf) {
    const cleanCRF = crf.replace(/\D/g, '');
    return `CRF-${cleanCRF}`;
  },

  calculateAge(birthDate) {
    if (!birthDate) return 'N/A';
    const today = new Date();
    const birth = new Date(birthDate);
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
      age--;
    }
    
    return age;
  },

  formatDate(dateString) {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR');
  }
};

// Sistema de Toast/Mensagens
const Toast = {
  container: null,

  init() {
    if (!this.container) {
      this.container = document.createElement('div');
      this.container.id = 'toast-container';
      this.container.style.cssText = `
        position: fixed;
        top: 1rem;
        right: 1rem;
        z-index: 9999;
        pointer-events: none;
      `;
      document.body.appendChild(this.container);
    }
  },

  show(type, message, duration = 5000) {
    this.init();

    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    
    const iconMap = {
      success: 'check-circle',
      error: 'alert-circle',
      info: 'info'
    };

    toast.innerHTML = `
      <div class="toast-content">
        <div class="toast-icon">
          <i data-lucide="${iconMap[type]}"></i>
        </div>
        <div class="toast-message">${message}</div>
        <button class="toast-close" onclick="this.parentElement.parentElement.remove()">
          <i data-lucide="x"></i>
        </button>
      </div>
      <div class="toast-progress">
        <div class="toast-progress-bar" style="animation-duration: ${duration}ms"></div>
      </div>
    `;

    toast.style.pointerEvents = 'auto';
    this.container.appendChild(toast);

    // Inicializar ícones Lucide
    if (window.lucide) {
      lucide.createIcons();
    }

    // Mostrar toast
    setTimeout(() => toast.classList.add('show'), 100);

    // Auto-remover
    setTimeout(() => {
      toast.classList.remove('show');
      setTimeout(() => toast.remove(), 300);
    }, duration);

    return toast;
  },

  success(message, duration) {
    return this.show('success', message, duration);
  },

  error(message, duration) {
    return this.show('error', message, duration);
  },

  info(message, duration) {
    return this.show('info', message, duration);
  }
};

// Validação de formulários em tempo real
class FormValidator {
  constructor(form) {
    this.form = form;
    this.errors = {};
    this.init();
  }

  init() {
    const inputs = this.form.querySelectorAll('input, select, textarea');
    inputs.forEach(input => {
      input.addEventListener('blur', () => this.validateField(input));
      input.addEventListener('input', () => this.clearFieldError(input));
    });
  }

  validateField(field) {
    const name = field.name;
    const value = field.value;
    let error = null;

    switch (name) {
      case 'name':
        error = Validators.validateName(value);
        break;
      case 'birthDate':
        error = Validators.validateBirthDate(value);
        break;
      case 'phone':
      case 'contact':
        error = Validators.validatePhone(value);
        break;
      case 'address':
        error = Validators.validateAddress(value);
        break;
      case 'crf':
        error = Validators.validateCRF(value);
        break;
      case 'gender':
        error = Validators.validateGender(value);
        break;
    }

    this.setFieldError(field, error);
    return !error;
  }

  setFieldError(field, error) {
    const name = field.name;
    const errorElement = field.parentElement.querySelector('.form-error');

    if (error) {
      this.errors[name] = error;
      field.classList.add('error');
      
      if (errorElement) {
        errorElement.textContent = error;
      } else {
        const errorDiv = document.createElement('div');
        errorDiv.className = 'form-error';
        errorDiv.innerHTML = `<span>⚠</span> ${error}`;
        field.parentElement.appendChild(errorDiv);
      }
    } else {
      delete this.errors[name];
      field.classList.remove('error');
      if (errorElement) {
        errorElement.remove();
      }
    }
  }

  clearFieldError(field) {
    const name = field.name;
    const errorElement = field.parentElement.querySelector('.form-error');
    
    if (this.errors[name]) {
      delete this.errors[name];
      field.classList.remove('error');
      if (errorElement) {
        errorElement.remove();
      }
    }
  }

  validateAll() {
    const inputs = this.form.querySelectorAll('input[required], select[required], textarea[required]');
    let isValid = true;

    inputs.forEach(input => {
      if (!this.validateField(input)) {
        isValid = false;
      }
    });

    return isValid;
  }

  hasErrors() {
    return Object.keys(this.errors).length > 0;
  }
}

// Utilitários de localStorage
const Storage = {
  get(key, defaultValue = []) {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : defaultValue;
    } catch (error) {
      console.error('Erro ao acessar localStorage:', error);
      return defaultValue;
    }
  },

  set(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch (error) {
      console.error('Erro ao salvar no localStorage:', error);
      return false;
    }
  },

  remove(key) {
    try {
      localStorage.removeItem(key);
      return true;
    } catch (error) {
      console.error('Erro ao remover do localStorage:', error);
      return false;
    }
  },

  clear() {
    try {
      localStorage.clear();
      return true;
    } catch (error) {
      console.error('Erro ao limpar localStorage:', error);
      return false;
    }
  }
};

// Funções de debounce para validação
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Função para gerar IDs únicos
function generateId(prefix = '') {
  const timestamp = Date.now().toString();
  const random = Math.floor(Math.random() * 90000) + 10000;
  return `${prefix}${random}`;
}

// Função para animar elementos
function animateElement(element, animation = 'fadeIn') {
  element.classList.add(animation);
  
  element.addEventListener('animationend', () => {
    element.classList.remove(animation);
  }, { once: true });
}

// Loading states para botões
function setButtonLoading(button, loading = true) {
  if (loading) {
    button.classList.add('btn-loading');
    button.disabled = true;
    button.dataset.originalText = button.textContent;
    button.textContent = 'Carregando...';
  } else {
    button.classList.remove('btn-loading');
    button.disabled = false;
    if (button.dataset.originalText) {
      button.textContent = button.dataset.originalText;
      delete button.dataset.originalText;
    }
  }
}

// Disponibilizar globalmente
window.Validators = Validators;
window.Formatters = Formatters;
window.Toast = Toast;
window.FormValidator = FormValidator;
window.Storage = Storage;
window.debounce = debounce;
window.generateId = generateId;
window.animateElement = animateElement;
window.setButtonLoading = setButtonLoading;