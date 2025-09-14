<?php
session_start();
?>
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Cadastro - Paciente | Sistema Clínica</title>
    <link rel="stylesheet" href="../css/style.css">
    <link rel="stylesheet" href="../css/components.css">
    <script src="https://unpkg.com/lucide@latest/dist/umd/lucide.js"></script>
</head>
<body>
    <div class="page-container">
        <!-- Header decorativo -->
        <div class="header-wave"></div>
        
        <!-- Elementos decorativos -->
        <div class="decorative-elements">
            <div class="decoration decoration-1"></div>
            <div class="decoration decoration-2"></div>
            <div class="decoration decoration-3"></div>
        </div>

        <div class="content-container" style="display: flex; align-items: center; justify-content: center; min-height: 100vh; padding: 2rem 1rem;">
            <div class="card card-blue" style="width: 100%; max-width: 28rem;">
                <div class="card-header bg-green">
                    <div id="pharmacistInfo" style="display: flex; align-items: center; justify-content: center; margin-bottom: 1rem;">
                        <!-- Será preenchido via JavaScript -->
                    </div>
                    
                    <div class="card-icon bg-green">
                        <i data-lucide="user-plus"></i>
                    </div>
                    <h1 class="card-title text-blue">Cadastro - Paciente</h1>
                    <p class="card-subtitle text-blue">Preencha os dados do paciente</p>
                </div>
                
                <div class="card-content">
                    <form id="clientRegisterForm" onsubmit="handleClientRegister(event)">
                        <div class="form-group">
                            <label for="name" class="form-label text-blue required">Nome Completo</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                class="form-input border-blue"
                                placeholder="Digite o nome completo do paciente"
                                required
                            >
                        </div>

                        <div class="form-group">
                            <label for="birthDate" class="form-label text-green required">Data de Nascimento</label>
                            <input
                                type="date"
                                id="birthDate"
                                name="birthDate"
                                class="form-input border-green"
                                required
                            >
                        </div>

                        <div class="form-group">
                            <label for="gender" class="form-label text-blue required">Sexo</label>
                            <select
                                id="gender"
                                name="gender"
                                class="form-select border-blue"
                                required
                            >
                                <option value="">Selecione o sexo</option>
                                <option value="M">Masculino</option>
                                <option value="F">Feminino</option>
                                <option value="O">Outro</option>
                            </select>
                        </div>

                        <div class="form-group">
                            <label for="address" class="form-label text-green required">Endereço</label>
                            <input
                                type="text"
                                id="address"
                                name="address"
                                class="form-input border-green"
                                placeholder="Digite o endereço completo"
                                required
                            >
                        </div>

                        <div class="form-group">
                            <label for="contact" class="form-label text-blue required">Contato</label>
                            <input
                                type="tel"
                                id="contact"
                                name="contact"
                                class="form-input border-blue"
                                placeholder="(11) 99999-9999"
                                required
                            >
                        </div>

                        <div class="form-buttons">
                            <button 
                                type="button" 
                                onclick="navigateToClientLogin()"
                                class="btn btn-outline btn-green"
                                style="flex: 1;"
                            >
                                <i data-lucide="arrow-left" style="width: 1rem; height: 1rem; margin-right: 0.5rem;"></i>
                                Voltar
                            </button>
                            <button 
                                type="submit"
                                class="btn btn-primary btn-patient"
                                style="flex: 1;"
                            >
                                Cadastrar Paciente
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>

        <!-- Footer decorativo -->
        <div class="footer-wave"></div>
    </div>

    <!-- Scripts -->
    <script src="../js/utils.js"></script>
    <script src="../js/navigation.js"></script>
    <script>
        // Inicializar ícones Lucide
        lucide.createIcons();

        async function handleClientRegister(event) {
            event.preventDefault();
            
            const form = event.target;
            const formValidator = new FormValidator(form);
            
            // Validar todos os campos
            if (!formValidator.validateAll()) {
                Toast.error('Por favor, corrija os erros no formulário');
                return;
            }
            
            const formData = new FormData(form);
            const data = {
                name: formData.get('name').trim(),
                birthDate: formData.get('birthDate'),
                gender: formData.get('gender'),
                address: formData.get('address').trim(),
                contact: formData.get('contact').trim()
            };
            
            // Registrar paciente
            await registerClient(data);
        }

        // Formatação automática do telefone
        document.getElementById('contact').addEventListener('input', function(e) {
            const value = e.target.value.replace(/\D/g, '');
            let formatted = value;
            
            if (value.length >= 11) {
                formatted = value.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
            } else if (value.length >= 10) {
                formatted = value.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3');
            } else if (value.length >= 6) {
                formatted = value.replace(/(\d{2})(\d{4})(\d*)/, '($1) $2-$3');
            } else if (value.length >= 2) {
                formatted = value.replace(/(\d{2})(\d*)/, '($1) $2');
            }
            
            e.target.value = formatted;
        });

        // Definir data máxima como hoje
        document.getElementById('birthDate').setAttribute('max', new Date().toISOString().split('T')[0]);

        // Carregar informações do farmacêutico
        document.addEventListener('DOMContentLoaded', function() {
            const pharmacist = AppState.getPharmacist();
            
            if (!pharmacist) {
                Toast.error('Sessão expirada. Redirecionando...');
                setTimeout(() => navigateToHome(), 2000);
                return;
            }
            
            // Mostrar informações do farmacêutico
            document.getElementById('pharmacistInfo').innerHTML = `
                <div class="pharmacist-info">
                    <span>Farmacêutico: ${pharmacist.name}</span>
                </div>
            `;
            
            // Focus no primeiro campo
            document.getElementById('name').focus();
        });
    </script>
</body>
</html>