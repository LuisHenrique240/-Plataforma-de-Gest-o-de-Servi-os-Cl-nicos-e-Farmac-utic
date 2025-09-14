// Integração com APIs PHP do Sistema Clínica

const API_BASE_URL = window.location.origin;

// Configuração do fetch com tratamento de erros
async function apiRequest(url, options = {}) {
  const defaultOptions = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const config = { ...defaultOptions, ...options };

  try {
    const response = await fetch(`${API_BASE_URL}${url}`, config);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || `HTTP error! status: ${response.status}`);
    }

    return data;
  } catch (error) {
    console.error('API Request Error:', error);
    throw error;
  }
}

// API para farmacêuticos
const PharmacistAPI = {
  // Login do farmacêutico
  async login(crf) {
    try {
      const response = await apiRequest(`/api/pharmacist.php?crf=${encodeURIComponent(crf)}`);
      return response.data;
    } catch (error) {
      throw new Error(error.message || 'Erro ao fazer login do farmacêutico');
    }
  },

  // Cadastro do farmacêutico
  async register(pharmacistData) {
    try {
      const response = await apiRequest('/api/pharmacist.php', {
        method: 'POST',
        body: JSON.stringify(pharmacistData),
      });
      return response.data;
    } catch (error) {
      throw new Error(error.message || 'Erro ao cadastrar farmacêutico');
    }
  },

  // Listar farmacêuticos
  async list() {
    try {
      const response = await apiRequest('/api/pharmacist.php');
      return response.data;
    } catch (error) {
      throw new Error(error.message || 'Erro ao listar farmacêuticos');
    }
  }
};

// API para pacientes
const PatientAPI = {
  // Login do paciente
  async login(clientId) {
    try {
      const response = await apiRequest(`/api/patient.php?client_id=${encodeURIComponent(clientId)}`);
      return response.data;
    } catch (error) {
      throw new Error(error.message || 'Erro ao fazer login do paciente');
    }
  },

  // Cadastro do paciente
  async register(patientData) {
    try {
      const response = await apiRequest('/api/patient.php', {
        method: 'POST',
        body: JSON.stringify(patientData),
      });
      return response.data;
    } catch (error) {
      throw new Error(error.message || 'Erro ao cadastrar paciente');
    }
  },

  // Listar pacientes
  async list() {
    try {
      const response = await apiRequest('/api/patient.php');
      return response.data;
    } catch (error) {
      throw new Error(error.message || 'Erro ao listar pacientes');
    }
  }
};

// Versões atualizadas das funções de login e registro para usar APIs
async function loginPharmacistAPI(crf) {
  try {
    setButtonLoading(document.querySelector('button[type="submit"]'), true);
    
    const pharmacist = await PharmacistAPI.login(crf);
    
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

async function registerPharmacistAPI(formData) {
  try {
    setButtonLoading(document.querySelector('button[type="submit"]'), true);
    
    const pharmacistData = await PharmacistAPI.register(formData);
    
    Toast.success('Farmacêutico cadastrado com sucesso!');
    showSuccessModal('pharmacist', pharmacistData);
    
    return true;
  } catch (error) {
    Toast.error(error.message);
    return false;
  } finally {
    setButtonLoading(document.querySelector('button[type="submit"]'), false);
  }
}

async function loginClientAPI(clientId) {
  try {
    setButtonLoading(document.querySelector('button[type="submit"]'), true);
    
    const client = await PatientAPI.login(clientId);
    
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

async function registerClientAPI(formData) {
  try {
    setButtonLoading(document.querySelector('button[type="submit"]'), true);
    
    const clientData = await PatientAPI.register(formData);
    
    Toast.success('Paciente cadastrado com sucesso!');
    showSuccessModal('client', clientData);
    
    return true;
  } catch (error) {
    Toast.error(error.message);
    return false;
  } finally {
    setButtonLoading(document.querySelector('button[type="submit"]'), false);
  }
}

// Detecção automática de modo (localStorage vs API)
function isAPIMode() {
  // Verificar se as APIs estão disponíveis
  // Pode ser configurado via variável de ambiente ou configuração
  return window.location.hostname !== 'localhost' || 
         localStorage.getItem('useAPI') === 'true';
}

// Funções híbridas que escolhem automaticamente entre localStorage e API
async function loginPharmacistHybrid(crf) {
  if (isAPIMode()) {
    return await loginPharmacistAPI(crf);
  } else {
    return await loginPharmacist(crf);
  }
}

async function registerPharmacistHybrid(formData) {
  if (isAPIMode()) {
    return await registerPharmacistAPI(formData);
  } else {
    return await registerPharmacist(formData);
  }
}

async function loginClientHybrid(clientId) {
  if (isAPIMode()) {
    return await loginClientAPI(clientId);
  } else {
    return await loginClient(clientId);
  }
}

async function registerClientHybrid(formData) {
  if (isAPIMode()) {
    return await registerClientAPI(formData);
  } else {
    return await registerClient(formData);
  }
}

// Disponibilizar APIs globalmente
window.PharmacistAPI = PharmacistAPI;
window.PatientAPI = PatientAPI;
window.loginPharmacistAPI = loginPharmacistAPI;
window.registerPharmacistAPI = registerPharmacistAPI;
window.loginClientAPI = loginClientAPI;
window.registerClientAPI = registerClientAPI;
window.loginPharmacistHybrid = loginPharmacistHybrid;
window.registerPharmacistHybrid = registerPharmacistHybrid;
window.loginClientHybrid = loginClientHybrid;
window.registerClientHybrid = registerClientHybrid;
window.isAPIMode = isAPIMode;