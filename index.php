<?php
session_start();
?>
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Sistema Clínica</title>
    <link rel="stylesheet" href="css/style.css">
    <link rel="stylesheet" href="css/components.css">
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

        <div class="content-container">
            <!-- Header -->
            <header class="main-header">
                <div class="header-icon">
                    <i data-lucide="building-2"></i>
                </div>
                <h1>Sistema Clínica</h1>
                <p class="header-subtitle">Plataforma completa para gestão de pacientes e farmacêuticos</p>
            </header>

            <!-- Menu Principal -->
            <div class="main-menu">
                <div class="menu-grid">
                    <!-- Cadastro de Farmacêuticos -->
                    <div class="menu-card card-pharmacist" onclick="navigateToSection('pharmacist')">
                        <div class="card-header">
                            <div class="card-icon">
                                <i data-lucide="user-plus"></i>
                            </div>
                            <h2>Cadastro de Farmacêuticos</h2>
                        </div>
                        <div class="card-content">
                            <p>Gerencie o cadastro e login dos profissionais farmacêuticos</p>
                            <div class="card-features">
                                <div class="feature">
                                    <i data-lucide="activity"></i>
                                    <span>Login com CRF</span>
                                </div>
                                <div class="feature">
                                    <i data-lucide="activity"></i>
                                    <span>Cadastro completo</span>
                                </div>
                            </div>
                            <button class="btn btn-primary btn-pharmacist">Acessar Área</button>
                        </div>
                    </div>

                    <!-- Cadastro de Pacientes -->
                    <div class="menu-card card-patient" onclick="navigateToSection('patient')">
                        <div class="card-header">
                            <div class="card-icon">
                                <i data-lucide="users"></i>
                            </div>
                            <h2>Cadastro de Pacientes</h2>
                        </div>
                        <div class="card-content">
                            <p>Gerencie o cadastro e atendimento dos pacientes</p>
                            <div class="card-features">
                                <div class="feature">
                                    <i data-lucide="activity"></i>
                                    <span>Login de pacientes</span>
                                </div>
                                <div class="feature">
                                    <i data-lucide="activity"></i>
                                    <span>Atendimento completo</span>
                                </div>
                            </div>
                            <button class="btn btn-primary btn-patient">Acessar Área</button>
                        </div>
                    </div>
                </div>

                <!-- Informações do Sistema -->
                <div class="system-info">
                    <div class="info-content">
                        <h3>Bem-vindo ao Sistema Clínica</h3>
                        <p>Nossa plataforma oferece uma solução completa para o gerenciamento 
                        de farmacêuticos e pacientes, com interface moderna, responsiva e 
                        funcionalidades específicas para o ambiente hospitalar e farmacêutico.</p>
                        
                        <div class="info-features">
                            <div class="info-feature">
                                <div class="info-icon">
                                    <i data-lucide="activity"></i>
                                </div>
                                <h4>Seguro</h4>
                                <p>Sistema seguro com validações</p>
                            </div>
                            <div class="info-feature">
                                <div class="info-icon">
                                    <i data-lucide="activity"></i>
                                </div>
                                <h4>Responsivo</h4>
                                <p>Funciona em todos os dispositivos</p>
                            </div>
                            <div class="info-feature">
                                <div class="info-icon">
                                    <i data-lucide="activity"></i>
                                </div>
                                <h4>Moderno</h4>
                                <p>Interface clean e intuitiva</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Footer decorativo -->
        <div class="footer-wave"></div>
    </div>

    <!-- Scripts -->
    <script src="js/utils.js"></script>
    <script src="js/navigation.js"></script>
    <script>
        // Inicializar ícones Lucide
        lucide.createIcons();

        function navigateToSection(section) {
            if (section === 'pharmacist') {
                window.location.href = 'farmaceuticos/login.php';
            } else if (section === 'patient') {
                window.location.href = 'farmaceuticos/login.php';
            }
        }
    </script>
</body>
</html>