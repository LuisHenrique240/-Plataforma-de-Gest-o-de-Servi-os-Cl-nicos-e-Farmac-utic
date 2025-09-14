-- Script de criação do banco de dados Sistema Clínica
-- Execute este script no seu MySQL para criar as tabelas necessárias

CREATE DATABASE IF NOT EXISTS sistema_clinica;
USE sistema_clinica;

-- Tabela de farmacêuticos
CREATE TABLE IF NOT EXISTS farmaceuticos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    birth_date DATE NOT NULL,
    gender ENUM('M', 'F', 'O') NOT NULL,
    address TEXT NOT NULL,
    contact VARCHAR(20) NOT NULL,
    crf VARCHAR(20) UNIQUE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    INDEX idx_crf (crf),
    INDEX idx_name (name),
    INDEX idx_created_at (created_at)
);

-- Tabela de pacientes
CREATE TABLE IF NOT EXISTS pacientes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    birth_date DATE NOT NULL,
    gender ENUM('M', 'F', 'O') NOT NULL,
    address TEXT NOT NULL,
    contact VARCHAR(20) NOT NULL,
    client_id VARCHAR(20) UNIQUE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    INDEX idx_client_id (client_id),
    INDEX idx_name (name),
    INDEX idx_created_at (created_at)
);

-- Tabela de sessões de atendimento
CREATE TABLE IF NOT EXISTS atendimentos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    pharmacist_id INT NOT NULL,
    patient_id INT NOT NULL,
    start_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    end_time TIMESTAMP NULL,
    status ENUM('active', 'completed', 'cancelled') DEFAULT 'active',
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    FOREIGN KEY (pharmacist_id) REFERENCES farmaceuticos(id) ON DELETE CASCADE,
    FOREIGN KEY (patient_id) REFERENCES pacientes(id) ON DELETE CASCADE,
    INDEX idx_pharmacist_id (pharmacist_id),
    INDEX idx_patient_id (patient_id),
    INDEX idx_status (status),
    INDEX idx_start_time (start_time)
);

-- Tabela de medicamentos
CREATE TABLE IF NOT EXISTS medicamentos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    dosage VARCHAR(100),
    unit VARCHAR(50),
    price DECIMAL(10,2),
    stock_quantity INT DEFAULT 0,
    min_stock_level INT DEFAULT 10,
    requires_prescription BOOLEAN DEFAULT TRUE,
    active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    INDEX idx_name (name),
    INDEX idx_active (active),
    INDEX idx_requires_prescription (requires_prescription)
);

-- Tabela de dispensação de medicamentos
CREATE TABLE IF NOT EXISTS dispensacoes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    atendimento_id INT NOT NULL,
    medication_id INT NOT NULL,
    quantity INT NOT NULL,
    unit_price DECIMAL(10,2) NOT NULL,
    total_price DECIMAL(10,2) NOT NULL,
    prescription_number VARCHAR(100),
    dosage_instructions TEXT,
    dispensed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    FOREIGN KEY (atendimento_id) REFERENCES atendimentos(id) ON DELETE CASCADE,
    FOREIGN KEY (medication_id) REFERENCES medicamentos(id) ON DELETE CASCADE,
    INDEX idx_atendimento_id (atendimento_id),
    INDEX idx_medication_id (medication_id),
    INDEX idx_dispensed_at (dispensed_at)
);

-- Tabela de receitas médicas
CREATE TABLE IF NOT EXISTS receitas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    patient_id INT NOT NULL,
    doctor_name VARCHAR(255) NOT NULL,
    doctor_crm VARCHAR(20) NOT NULL,
    prescription_date DATE NOT NULL,
    medication_list TEXT NOT NULL,
    dosage_instructions TEXT,
    valid_until DATE,
    used BOOLEAN DEFAULT FALSE,
    atendimento_id INT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    FOREIGN KEY (patient_id) REFERENCES pacientes(id) ON DELETE CASCADE,
    FOREIGN KEY (atendimento_id) REFERENCES atendimentos(id) ON DELETE SET NULL,
    INDEX idx_patient_id (patient_id),
    INDEX idx_prescription_date (prescription_date),
    INDEX idx_used (used),
    INDEX idx_valid_until (valid_until)
);

-- Tabela de consultas farmacêuticas
CREATE TABLE IF NOT EXISTS consultas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    pharmacist_id INT NOT NULL,
    patient_id INT NOT NULL,
    consultation_date DATETIME NOT NULL,
    duration_minutes INT DEFAULT 30,
    type ENUM('medication_review', 'counseling', 'vaccination', 'health_screening', 'other') NOT NULL,
    notes TEXT,
    status ENUM('scheduled', 'completed', 'cancelled', 'no_show') DEFAULT 'scheduled',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    FOREIGN KEY (pharmacist_id) REFERENCES farmaceuticos(id) ON DELETE CASCADE,
    FOREIGN KEY (patient_id) REFERENCES pacientes(id) ON DELETE CASCADE,
    INDEX idx_pharmacist_id (pharmacist_id),
    INDEX idx_patient_id (patient_id),
    INDEX idx_consultation_date (consultation_date),
    INDEX idx_status (status)
);

-- Inserir dados de exemplo (opcional)
INSERT INTO medicamentos (name, description, dosage, unit, price, stock_quantity, requires_prescription) VALUES
('Paracetamol 500mg', 'Analgésico e antitérmico', '500mg', 'comprimido', 0.50, 100, FALSE),
('Dipirona 500mg', 'Analgésico e antitérmico', '500mg', 'comprimido', 0.30, 150, FALSE),
('Amoxicilina 500mg', 'Antibiótico', '500mg', 'cápsula', 2.50, 50, TRUE),
('Omeprazol 20mg', 'Inibidor da bomba de prótons', '20mg', 'cápsula', 1.80, 75, TRUE),
('Vitamina C 1g', 'Suplemento vitamínico', '1g', 'comprimido efervescente', 3.00, 30, FALSE);

-- Criar usuário específico para a aplicação (opcional)
-- CREATE USER 'sistema_clinica'@'localhost' IDENTIFIED BY 'senha_segura_aqui';
-- GRANT SELECT, INSERT, UPDATE, DELETE ON sistema_clinica.* TO 'sistema_clinica'@'localhost';
-- FLUSH PRIVILEGES;

-- Views úteis para relatórios
CREATE VIEW view_atendimentos_completos AS
SELECT 
    a.id as atendimento_id,
    f.name as farmaceutico_nome,
    f.crf as farmaceutico_crf,
    p.name as paciente_nome,
    p.client_id as paciente_id,
    a.start_time,
    a.end_time,
    a.status,
    TIMESTAMPDIFF(MINUTE, a.start_time, COALESCE(a.end_time, NOW())) as duracao_minutos
FROM atendimentos a
JOIN farmaceuticos f ON a.pharmacist_id = f.id
JOIN pacientes p ON a.patient_id = p.id;

CREATE VIEW view_medicamentos_baixo_estoque AS
SELECT 
    id,
    name,
    stock_quantity,
    min_stock_level,
    (min_stock_level - stock_quantity) as deficit
FROM medicamentos 
WHERE stock_quantity <= min_stock_level AND active = TRUE;

CREATE VIEW view_consultas_do_dia AS
SELECT 
    c.id,
    f.name as farmaceutico,
    p.name as paciente,
    c.consultation_date,
    c.type,
    c.status
FROM consultas c
JOIN farmaceuticos f ON c.pharmacist_id = f.id
JOIN pacientes p ON c.patient_id = p.id
WHERE DATE(c.consultation_date) = CURDATE()
ORDER BY c.consultation_date;

-- Triggers para manter histórico de estoque
DELIMITER //
CREATE TRIGGER update_medication_stock 
AFTER INSERT ON dispensacoes
FOR EACH ROW
BEGIN
    UPDATE medicamentos 
    SET stock_quantity = stock_quantity - NEW.quantity
    WHERE id = NEW.medication_id;
END//
DELIMITER ;

-- Comentários sobre índices e otimizações
-- Os índices foram criados para otimizar as consultas mais comuns:
-- 1. Busca por CRF de farmacêuticos
-- 2. Busca por ID de pacientes
-- 3. Listagem de atendimentos por data
-- 4. Consultas de medicamentos ativos
-- 5. Histórico de dispensações

-- Para ambientes de produção, considere:
-- 1. Implementar particionamento por data nas tabelas de movimentação
-- 2. Criar índices compostos específicos para relatórios
-- 3. Configurar backup automático
-- 4. Implementar logs de auditoria para alterações críticas