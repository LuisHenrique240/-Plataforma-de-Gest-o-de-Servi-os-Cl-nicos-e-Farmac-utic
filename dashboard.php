<?php
session_start();
?>
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Dashboard - Atendimento | Sistema Clínica</title>
    <link rel="stylesheet" href="css/style.css">
    <link rel="stylesheet" href="css/components.css">
    <script src="https://unpkg.com/lucide@latest/dist/umd/lucide.js"></script>
</head>
<body>
    <div class="page-container" style="background: linear-gradient(135deg, var(--color-blue-50) 0%, white 50%, var(--color-teal-50) 100%);">
        <!-- Header -->
        <div class="page-header">
            <div class="header-content">
                <div class="header-info">
                    <h1>Sistema de Atendimento - Farmácia</h1>
                    <p id="pharmacistInfo"><!-- Será preenchido via JavaScript --></p>
                </div>
                <button onclick="logout()" class="btn btn-outline" style="background: rgba(255, 255, 255, 0.2); border-color: rgba(255, 255, 255, 0.3); color: white;">
                    <i data-lucide="log-out" style="width: 1rem; height: 1rem; margin-right: 0.5rem;"></i>
                    Sair
                </button>
            </div>
        </div>

        <!-- Main Content -->
        <div class="content-container" style="padding-top: 2rem; padding-bottom: 2rem;">
            <!-- Cliente Atual -->
            <div class="card card-blue" style="margin-bottom: 2rem;">
                <div class="card-header bg-blue">
                    <div style="display: flex; align-items: center; gap: 0.5rem; justify-content: center;">
                        <i data-lucide="user" style="width: 1.25rem; height: 1.25rem; color: var(--color-blue-800);"></i>
                        <h2 style="color: var(--color-blue-800); margin: 0;">Paciente em Atendimento</h2>
                    </div>
                </div>
                <div class="card-content">
                    <div id="clientInfo" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 1rem;">
                        <!-- Será preenchido via JavaScript -->
                    </div>
                </div>
            </div>

            <!-- Ações Rápidas -->
            <div class="dashboard-grid">
                <div class="dashboard-card card card-blue">
                    <div class="card-content">
                        <div class="card-icon bg-blue">
                            <i data-lucide="pill"></i>
                        </div>
                        <h3 style="color: var(--color-blue-800);">Dispensar Medicamento</h3>
                        <p style="color: var(--color-blue-600);">
                            Registrar dispensação de medicamentos
                        </p>
                    </div>
                </div>

                <div class="dashboard-card card card-teal">
                    <div class="card-content">
                        <div class="card-icon bg-teal">
                            <i data-lucide="file-text"></i>
                        </div>
                        <h3 style="color: var(--color-teal-800);">Receitas</h3>
                        <p style="color: var(--color-teal-600);">
                            Visualizar e processar receitas médicas
                        </p>
                    </div>
                </div>

                <div class="dashboard-card card card-green">
                    <div class="card-content">
                        <div class="card-icon bg-green">
                            <i data-lucide="calendar"></i>
                        </div>
                        <h3 style="color: var(--color-green-800);">Consultas</h3>
                        <p style="color: var(--color-green-600);">
                            Agendar consultas farmacêuticas
                        </p>
                    </div>
                </div>
            </div>

            <!-- Informações Adicionais -->
            <div style="display: grid; grid-template-columns: 1fr; gap: 1.5rem; margin-top: 2rem;">
                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 1.5rem;">
                    <div class="card card-blue">
                        <div class="card-header bg-blue">
                            <h3 style="color: var(--color-blue-800); margin: 0;">Histórico do Paciente</h3>
                        </div>
                        <div class="card-content">
                            <p style="text-align: center; padding: 2rem; color: var(--color-blue-600);">
                                Nenhum histórico encontrado para este paciente.
                            </p>
                        </div>
                    </div>

                    <div class="card card-teal">
                        <div class="card-header bg-teal">
                            <h3 style="color: var(--color-teal-800); margin: 0;">Medicamentos Recentes</h3>
                        </div>
                        <div class="card-content">
                            <p style="text-align: center; padding: 2rem; color: var(--color-teal-600);">
                                Nenhum medicamento dispensado recentemente.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Footer Info -->
            <div style="margin-top: 2rem; text-align: center; font-size: 0.875rem; color: var(--color-blue-600); background: rgba(255, 255, 255, 0.5); border-radius: 0.5rem; padding: 1rem;">
                <p id="systemInfo">Sistema ativo desde hoje • Farmácia Digital</p>
            </div>
        </div>
    </div>

    <!-- Scripts -->
    <script src="js/utils.js"></script>
    <script src="js/navigation.js"></script>
    <script>
        // Inicializar ícones Lucide
        lucide.createIcons();

        // Carregar informações do dashboard
        document.addEventListener('DOMContentLoaded', function() {
            const pharmacist = AppState.getPharmacist();
            const client = AppState.getClient();
            
            if (!pharmacist || !client) {
                Toast.error('Dados incompletos. Redirecionando...');
                setTimeout(() => navigateToHome(), 2000);
                return;
            }
            
            // Mostrar informações do farmacêutico
            document.getElementById('pharmacistInfo').innerHTML = `
                Farmacêutico: ${pharmacist.name} (${pharmacist.crf})
            `;
            
            // Calcular idade do cliente
            const age = Formatters.calculateAge(client.birthDate);
            
            // Mostrar informações do cliente
            document.getElementById('clientInfo').innerHTML = `
                <div>
                    <p style="font-size: 0.875rem; color: var(--color-blue-600); margin-bottom: 0.25rem;">Nome</p>
                    <p style="font-weight: 500; color: var(--color-blue-900);">${client.name}</p>
                </div>
                <div>
                    <p style="font-size: 0.875rem; color: var(--color-teal-600); margin-bottom: 0.25rem;">ID</p>
                    <p style="font-weight: 500; font-family: monospace; color: var(--color-teal-900);">${client.clientId}</p>
                </div>
                <div>
                    <p style="font-size: 0.875rem; color: var(--color-blue-600); margin-bottom: 0.25rem;">Idade</p>
                    <p style="font-weight: 500; color: var(--color-blue-900);">${age} anos</p>
                </div>
                <div>
                    <p style="font-size: 0.875rem; color: var(--color-teal-600); margin-bottom: 0.25rem;">Contato</p>
                    <p style="font-weight: 500; color: var(--color-teal-900);">${client.contact}</p>
                </div>
            `;
            
            // Atualizar data do sistema
            const today = new Date().toLocaleDateString('pt-BR');
            document.getElementById('systemInfo').textContent = `Sistema ativo desde ${today} • Farmácia Digital`;
        });

        // Adicionar interatividade aos cards de ação
        document.addEventListener('DOMContentLoaded', function() {
            const dashboardCards = document.querySelectorAll('.dashboard-card');
            
            dashboardCards.forEach(card => {
                card.addEventListener('click', function() {
                    const title = this.querySelector('h3').textContent;
                    Toast.info(`Funcionalidade "${title}" em desenvolvimento`);
                });
            });
        });
    </script>
</body>
</html>