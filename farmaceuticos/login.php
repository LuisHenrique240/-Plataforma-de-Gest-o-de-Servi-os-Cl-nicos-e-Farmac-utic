<?php
session_start();
?>
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Login - Farmacêutico | Sistema Clínica</title>
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
                <div class="card-header bg-blue">
                    <div class="back-button" style="margin-bottom: 1rem;">
                        <button onclick="navigateToHome()" class="btn btn-ghost btn-blue">
                            <i data-lucide="home" style="width: 1rem; height: 1rem; margin-right: 0.5rem;"></i>
                            Voltar ao Menu Principal
                        </button>
                    </div>
                    
                    <div class="card-icon bg-blue">
                        <i data-lucide="user-check"></i>
                    </div>
                    <h1 class="card-title text-blue">Login - Farmacêutico</h1>
                    <p class="card-subtitle text-blue">Entre com seu CRF</p>
                </div>
                
                <div class="card-content">
                    <form id="pharmacistLoginForm" onsubmit="handlePharmacistLogin(event)">
                        <div class="form-group">
                            <label for="crf" class="form-label text-blue required">CRF</label>
                            <input
                                type="text"
                                id="crf"
                                name="crf"
                                class="form-input border-blue text-center"
                                placeholder="Ex: CRF-12345"
                                required
                                maxlength="10"
                                style="text-transform: uppercase;"
                            >
                        </div>

                        <button type="submit" class="btn btn-primary btn-pharmacist btn-full">
                            Entrar no Sistema
                        </button>
                        
                        <div style="text-align: center; margin-top: 1rem;">
                            <button type="button" onclick="navigateToPharmacistRegister()" class="btn btn-ghost btn-blue" style="margin-bottom: 0.5rem;">
                                Não possui cadastro? Cadastre-se aqui
                            </button>
                            <p style="font-size: 0.75rem; color: var(--color-blue-500);">
                                Entre com seu CRF para acessar o sistema de atendimento
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

        async function handlePharmacistLogin(event) {
            event.preventDefault();
            
            const formData = new FormData(event.target);
            const crf = formData.get('crf').trim().toUpperCase();
            
            // Validar CRF
            const crfError = Validators.validateCRF(crf);
            if (crfError) {
                Toast.error(crfError);
                return;
            }
            
            // Tentar fazer login
            await loginPharmacist(crf);
        }

        // Auto-format CRF input
        document.getElementById('crf').addEventListener('input', function(e) {
            let value = e.target.value.replace(/[^0-9]/g, '');
            if (value) {
                e.target.value = 'CRF-' + value;
            }
        });

        // Focus no campo CRF ao carregar
        document.addEventListener('DOMContentLoaded', function() {
            document.getElementById('crf').focus();
        });
    </script>
</body>
</html>