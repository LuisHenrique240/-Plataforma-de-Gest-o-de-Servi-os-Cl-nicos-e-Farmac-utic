// Sistema de navegação para o Sistema Clínica

// Gerenciamento de estado global
const AppState = {
  currentPharmacist: null,
  currentClient: null,
  
  setPharmacist(pharmacist) {
    this.currentPharmacist = pharmacist;
    sessionStorage.setItem('currentPharmacist', JSON.stringify(pharmacist));
  },
  
  setClient(client) {
    this.currentClient = client;
    sessionStorage.setItem('currentClient', JSON.stringify(client));
  },
  
  getPharmacist() {
    if (!this.currentPharmacist) {
      const stored = sessionStorage.getItem('currentPharmacist');
      this.currentPharmacist = stored ? JSON.parse(stored) : null;
    }
    return this.currentPharmacist;
  },
  
  getClient() {
    if (!this.currentClient) {
      const stored = sessionStorage.getItem('currentClient');
      this.currentClient = stored ? JSON.parse(stored) : null;
    }
    return this.currentClient;
  },
  
  clear() {
    this.currentPharmacist = null;
    this.currentClient = null;
    sessionStorage.removeItem('currentPharmacist');
    sessionStorage.removeItem('currentClient');
  }
};

// Funções de navegação
function navigateToHome() {
  AppState.clear();
  window.location.href = '/';
}

function navigateToPharmacistLogin() {
  window.location.href = '/farmaceuticos/login.php';
}

function navigateToPharmacistRegister() {
  window.location.href = '/farmaceuticos/cadastrar.php';
}

function navigateToClientLogin() {
  const pharmacist = AppState.getPharmacist();
  if (!pharmacist) {
    Toast.error('Sessão expirada. Faça login novamente.');
    navigateToHome();
    return;
  }
  window.location.href = '/pacientes/login.php';
}

function navigateToClientRegister() {
  const pharmacist = AppState.getPharmacist();
  if (!pharmacist) {
    Toast.error('Sessão expirada. Faça login novamente.');
    navigateToHome();
    return;
  }
  window.location.href = '/pacientes/cadastrar.php';
}

function navigateToDashboard() {
  const pharmacist = AppState.getPharmacist();
  const client = AppState.getClient();
  
  if (!pharmacist || !client) {
    Toast.error('Dados incompletos. Reiniciando sessão.');
    navigateToHome();
    return;
  }
  
  window.location.href = '/dashboard.php';
}

// Funções de login
async function loginPharmacist(crf) {
  try {
    setButtonLoading(document.querySelector('button[type="submit"]'), true);
    
    // Simular delay de rede
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const pharmacists = Storage.get('pharmacists', []);
    const pharmacist = pharmacists.find(p => p.crf === crf.toUpperCase());
    
    if (!pharmacist) {
      throw new Error('CRF não encontrado. Verifique o número ou faça seu cadastro.');
    }
    
    AppState.setPharmacist(pharmacist);
    Toast.success(`Bem-vindo, ${pharmacist.name}!`);
    
    setTimeout(() => {
      navigateToClientLogin();
    }, 1500);
    
    return true;
  } catch (error) {
    Toast.error(error.message);
    return false;
  } finally {
    setButtonLoading(document.querySelector('button[type="submit"]'), false);
  }
}

async function loginClient(clientId) {
  try {
    setButtonLoading(document.querySelector('button[type="submit"]'), true);
    
    // Simular delay de rede
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const clients = Storage.get('clients', []);
    const client = clients.find(c => c.clientId === clientId.toUpperCase());
    
    if (!client) {
      throw new Error('ID do paciente não encontrado. Verifique o ID ou faça o cadastro.');
    }
    
    AppState.setClient(client);
    Toast.success(`Iniciando atendimento para ${client.name}`);
    
    setTimeout(() => {
      navigateToDashboard();
    }, 1500);
    
    return true;
  } catch (error) {
    Toast.error(error.message);
    return false;
  } finally {
    setButtonLoading(document.querySelector('button[type="submit"]'), false);
  }
}

// Funções de cadastro
async function registerPharmacist(formData) {
  try {
    setButtonLoading(document.querySelector('button[type="submit"]'), true);
    
    // Simular delay de rede
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Gerar CRF único
    const crf = generateId('CRF-');
    
    const pharmacistData = {
      ...formData,
      crf,
      id: generateId(),
      contact: Formatters.formatPhone(formData.contact),
      createdAt: new Date().toISOString()
    };
    
    // Salvar no localStorage
    const pharmacists = Storage.get('pharmacists', []);
    pharmacists.push(pharmacistData);
    
    if (!Storage.set('pharmacists', pharmacists)) {
      throw new Error('Erro ao salvar dados. Tente novamente.');
    }
    
    Toast.success('Farmacêutico cadastrado com sucesso!');
    
    // Mostrar modal de sucesso
    showSuccessModal('pharmacist', pharmacistData);
    
    return true;
  } catch (error) {
    Toast.error(error.message);
    return false;
  } finally {
    setButtonLoading(document.querySelector('button[type="submit"]'), false);
  }
}

async function registerClient(formData) {
  try {
    setButtonLoading(document.querySelector('button[type="submit"]'), true);
    
    // Simular delay de rede
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Gerar ID único do cliente
    const clientId = generateId('CLI');
    
    const clientData = {
      ...formData,
      clientId,
      id: generateId(),
      contact: Formatters.formatPhone(formData.contact),
      createdAt: new Date().toISOString()
    };
    
    // Salvar no localStorage
    const clients = Storage.get('clients', []);
    clients.push(clientData);
    
    if (!Storage.set('clients', clients)) {
      throw new Error('Erro ao salvar dados. Tente novamente.');
    }
    
    Toast.success('Paciente cadastrado com sucesso!');
    
    // Mostrar modal de sucesso
    showSuccessModal('client', clientData);
    
    return true;
  } catch (error) {
    Toast.error(error.message);
    return false;
  } finally {
    setButtonLoading(document.querySelector('button[type="submit"]'), false);
  }
}

// Modal de sucesso
function showSuccessModal(type, data) {
  const modalOverlay = document.createElement('div');
  modalOverlay.className = 'modal-overlay';
  
  const isPharmacist = type === 'pharmacist';
  const identifier = isPharmacist ? data.crf : data.clientId;
  const title = isPharmacist ? 'Farmacêutico' : 'Paciente';
  const age = Formatters.calculateAge(data.birthDate);
  const birthDateFormatted = Formatters.formatDate(data.birthDate);
  
  modalOverlay.innerHTML = `
    <div class="modal-content">
      <div class="card card-${isPharmacist ? 'blue' : 'green'}">
        <div class="card-header bg-${isPharmacist ? 'blue' : 'green'}">
          <div class="card-icon bg-${isPharmacist ? 'blue' : 'green'}">
            <i data-lucide="check-circle"></i>
          </div>
          <h2 class="card-title text-${isPharmacist ? 'blue' : 'green'}">
            ${title} Cadastrado com Sucesso!
          </h2>
        </div>
        <div class="card-content">
          <div class="success-id">
            <p class="form-label text-${isPharmacist ? 'blue' : 'green'}">
              ${isPharmacist ? 'CRF:' : 'ID do Paciente:'}
            </p>
            <div style="display: flex; align-items: center; justify-content: center; gap: 0.5rem; margin-bottom: 1rem;">
              <span style="font-size: 1.25rem; font-family: monospace; font-weight: bold; color: var(--color-${isPharmacist ? 'blue' : 'green'}-800);">
                ${identifier}
              </span>
              <button onclick="copyToClipboard('${identifier}')" class="btn btn-outline btn-${isPharmacist ? 'blue' : 'green'}" style="padding: 0.25rem 0.5rem; min-height: auto;">
                <i data-lucide="copy" style="width: 1rem; height: 1rem;"></i>
              </button>
            </div>
          </div>
          
          <div class="success-info" style="background: linear-gradient(135deg, var(--color-${isPharmacist ? 'blue' : 'green'}-50) 0%, var(--color-${isPharmacist ? 'teal' : 'blue'}-50) 100%); padding: 1rem; border-radius: 0.5rem; margin-bottom: 1.5rem; text-align: left;">
            <p style="margin-bottom: 0.5rem;"><strong style="color: var(--color-${isPharmacist ? 'blue' : 'green'}-700);">Nome:</strong> ${data.name}</p>
            <p style="margin-bottom: 0.5rem;"><strong style="color: var(--color-${isPharmacist ? 'teal' : 'blue'}-700);">Idade:</strong> ${age} anos</p>
            <p style="margin-bottom: 0.5rem;"><strong style="color: var(--color-${isPharmacist ? 'blue' : 'green'}-700);">Data de Nascimento:</strong> ${birthDateFormatted}</p>
            <p style="margin-bottom: 0.5rem;"><strong style="color: var(--color-${isPharmacist ? 'teal' : 'blue'}-700);">Sexo:</strong> ${data.gender === 'M' ? 'Masculino' : data.gender === 'F' ? 'Feminino' : 'Outro'}</p>
            <p style="margin-bottom: 0;"><strong style="color: var(--color-${isPharmacist ? 'blue' : 'green'}-700);">Contato:</strong> ${data.contact}</p>
          </div>
          
          <button onclick="closeSuccessModal()" class="btn btn-primary btn-${isPharmacist ? 'pharmacist' : 'patient'} btn-full">
            Continuar
          </button>
        </div>
      </div>
    </div>
  `;
  
  document.body.appendChild(modalOverlay);
  
  // Inicializar ícones
  if (window.lucide) {
    lucide.createIcons();
  }
  
  // Animação de entrada
  setTimeout(() => {
    modalOverlay.style.opacity = '1';
  }, 100);
}

function closeSuccessModal() {
  const modal = document.querySelector('.modal-overlay');
  if (modal) {
    modal.style.opacity = '0';
    setTimeout(() => {
      modal.remove();
    }, 300);
  }
  
  // Redirecionar para login
  setTimeout(() => {
    const currentPage = window.location.pathname;
    if (currentPage.includes('farmaceuticos')) {
      navigateToPharmacistLogin();
    } else if (currentPage.includes('pacientes')) {
      navigateToClientLogin();
    }
  }, 500);
}

function copyToClipboard(text) {
  if (navigator.clipboard) {
    navigator.clipboard.writeText(text).then(() => {
      Toast.success('Copiado para a área de transferência!');
    });
  } else {
    // Fallback para navegadores mais antigos
    const textArea = document.createElement('textarea');
    textArea.value = text;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand('copy');
    document.body.removeChild(textArea);
    Toast.success('Copiado para a área de transferência!');
  }
}

// Logout
function logout() {
  AppState.clear();
  Toast.info('Sessão encerrada com sucesso.');
  setTimeout(() => {
    navigateToHome();
  }, 1000);
}

// Verificação de autenticação para páginas protegidas
function checkAuth() {
  const currentPage = window.location.pathname;
  
  if (currentPage.includes('pacientes') || currentPage.includes('dashboard')) {
    const pharmacist = AppState.getPharmacist();
    if (!pharmacist) {
      Toast.error('Acesso negado. Faça login como farmacêutico primeiro.');
      navigateToHome();
      return false;
    }
  }
  
  if (currentPage.includes('dashboard')) {
    const client = AppState.getClient();
    if (!client) {
      Toast.error('Nenhum paciente selecionado.');
      navigateToClientLogin();
      return false;
    }
  }
  
  return true;
}

// Inicialização quando DOM estiver pronto
document.addEventListener('DOMContentLoaded', function() {
  // Verificar autenticação em páginas protegidas
  checkAuth();
  
  // Configurar handlers de formulários
  const forms = document.querySelectorAll('form');
  forms.forEach(form => {
    new FormValidator(form);
  });
});

// Disponibilizar funções globalmente
window.AppState = AppState;
window.navigateToHome = navigateToHome;
window.navigateToPharmacistLogin = navigateToPharmacistLogin;
window.navigateToPharmacistRegister = navigateToPharmacistRegister;
window.navigateToClientLogin = navigateToClientLogin;
window.navigateToClientRegister = navigateToClientRegister;
window.navigateToDashboard = navigateToDashboard;
window.loginPharmacist = loginPharmacist;
window.loginClient = loginClient;
window.registerPharmacist = registerPharmacist;
window.registerClient = registerClient;
window.showSuccessModal = showSuccessModal;
window.closeSuccessModal = closeSuccessModal;
window.copyToClipboard = copyToClipboard;
window.logout = logout;
window.checkAuth = checkAuth;