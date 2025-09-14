<?php
session_start();
?>
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Login - Paciente | Sistema Clínica</title>
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
            <div class="card card-green" style="width: 100%; max-width: 28rem;">
                <div class="card-header bg-green">
                    <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 1rem;">
                        <div id="pharmacistInfo" class="pharmacist-info">
                            <!-- Será preenchido via JavaScript -->
                        </div>
                        <button onclick="logout()" class="btn btn-outline btn-blue" style="padding: 0.25rem 0.75rem; font-size: 0.875rem;">
                            <i data-lucide="log-out" style="width: 1rem; height: 1rem; margin-right: 0.25rem;"></i>
                            Sair
                        </button>
                    </div>
                    
                    <div class="card-icon bg-green">
                        <i data-lucide="users"></i>
                    </div>
                    <h1 class="card-title text-green">Login - Paciente</h1>
                    <p class="card-subtitle text-green">Entre com seu ID de paciente</p>
                </div>
                
                <div class="card-content">
                    <form id="clientLoginForm" onsubmit="handleClientLogin(event)">
                        <div class="form-group">
                            <label for="clientId" class="form-label text-green required">ID do Paciente</label>
                            <input
                                type="text"
                                id="clientId"
                                name="clientId"
                                class="form-input border-green text-center"
                                placeholder="Ex: CLI12345"
                                required
                                maxlength="8"
                                style="text-transform: uppercase;"
                            >
                        </div>

                        <button type="submit" class="btn btn-primary btn-patient btn-full">
                            Iniciar Atendimento
                        </button>
                        
                        <div style="text-align: center; margin-top: 1rem;">
                            <button type="button" onclick="navigateToClientRegister()" class="btn btn-ghost btn-blue" style="margin-bottom: 0.5rem;">
                                Paciente novo? Cadastre-se aqui
                            </button>
                            <p style="font-size: 0.75rem; color: var(--color-green-600);">
                                Entre com o ID do paciente para iniciar o atendimento
                            </p>
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

        async function handleClientLogin(event) {
            event.preventDefault();
            
            const formData = new FormData(event.target);
            const clientId = formData.get('clientId').trim().toUpperCase();
            
            // Validar campo
            if (!clientId) {
                Toast.error('ID do paciente é obrigatório');
                return;
            }
            
            // Tentar fazer login
            await loginClient(clientId);
        }

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
                <span>Farmacêutico: ${pharmacist.name}</span>
            `;
            
            // Focus no campo clientId
            document.getElementById('clientId').focus();
        });
    </script>
</body>
</html>