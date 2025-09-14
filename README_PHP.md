# Sistema Clínica - Versão PHP

Sistema web completo para gestão de farmacêuticos e pacientes em clínicas e farmácias, desenvolvido com HTML, CSS, JavaScript e PHP.

## 🎯 Características

- **Interface Moderna**: Design clean com gradientes hospitalares em azul e verde
- **Responsivo**: Adaptado para desktop, tablet e mobile
- **Validações em Tempo Real**: Validação de formulários com feedback imediato
- **Acessibilidade**: Labels adequados, ARIA attributes e navegação por teclado
- **Backend PHP**: APIs RESTful para persistência de dados
- **Banco MySQL**: Estrutura completa com relacionamentos
- **Modo Híbrido**: Funciona com localStorage ou banco de dados

## 🚀 Funcionalidades

### Sistema Completo
- Página inicial com menu de navegação
- Login e cadastro de farmacêuticos (CRF)
- Login e cadastro de pacientes
- Dashboard de atendimento
- Sistema de sessões PHP
- APIs RESTful para integração

### Validações Implementadas
- Validação de CRF (formato CRF-XXXXX)
- Validação de datas (não futuras, idades válidas)
- Validação de telefones (formatação automática)
- Validação de campos obrigatórios
- Feedback visual em tempo real

## 🛠 Tecnologias

- **Frontend**: HTML5, CSS3, JavaScript ES6+
- **Backend**: PHP 7.4+
- **Banco de Dados**: MySQL 5.7+
- **Ícones**: Lucide Icons
- **Estilo**: CSS Grid, Flexbox, Custom Properties

## 📁 Estrutura do Projeto

```
sistema-clinica/
├── index.php                 # Página inicial
├── farmaceuticos/
│   ├── login.php             # Login farmacêutico
│   └── cadastrar.php         # Cadastro farmacêutico
├── pacientes/
│   ├── login.php             # Login paciente
│   └── cadastrar.php         # Cadastro paciente
├── dashboard.php             # Dashboard de atendimento
├── css/
│   ├── style.css             # Estilos principais
│   └── components.css        # Componentes
├── js/
│   ├── utils.js              # Utilitários e validações
│   ├── navigation.js         # Navegação e estado
│   └── api.js               # Integração com APIs
├── api/
│   ├── pharmacist.php        # API farmacêuticos
│   └── patient.php          # API pacientes
├── config/
│   └── database.php         # Configuração e classes
└── farmacia.sql             # Script do banco de dados
```

## ⚙️ Instalação

### 1. Requisitos
- PHP 7.4 ou superior
- MySQL 5.7 ou superior
- Servidor web (Apache/Nginx)

### 2. Configuração do Banco
```sql
-- Executar o script farmacia.sql
mysql -u root -p < farmacia.sql
```

### 3. Configuração do PHP
```php
// Editar config/database.php
private $host = 'localhost';
private $db_name = 'sistema_clinica';
private $username = 'seu_usuario';
private $password = 'sua_senha';
```

### 4. Servidor Web
```bash
# Desenvolvimento local
php -S localhost:8000

# Ou configurar virtual host no Apache/Nginx
```

## 🔧 Configuração

### Modo de Operação
O sistema funciona em dois modos:

**1. Modo LocalStorage** (desenvolvimento)
- Dados armazenados no navegador
- Ideal para demonstrações
- Não requer banco de dados

**2. Modo API** (produção)
- Dados armazenados no MySQL
- APIs PHP para CRUD
- Sessões servidor

### Alternar Modos
```javascript
// Forçar modo API
localStorage.setItem('useAPI', 'true');

// Forçar modo localStorage
localStorage.setItem('useAPI', 'false');
```

## 📊 Banco de Dados

### Tabelas Principais
- `farmaceuticos`: Dados dos farmacêuticos
- `pacientes`: Dados dos pacientes
- `atendimentos`: Sessões de atendimento
- `medicamentos`: Catálogo de medicamentos
- `dispensacoes`: Histórico de dispensações
- `receitas`: Receitas médicas
- `consultas`: Consultas farmacêuticas

### APIs Disponíveis

**Farmacêuticos**
```http
GET /api/pharmacist.php?crf=CRF-12345  # Login
POST /api/pharmacist.php               # Cadastro
GET /api/pharmacist.php                # Listar todos
```

**Pacientes**
```http
GET /api/patient.php?client_id=CLI12345  # Login
POST /api/patient.php                    # Cadastro
GET /api/patient.php                     # Listar todos
```

## 🎨 Design System

### Cores Hospitalares
```css
--color-blue-600: #2563eb;    /* Primário */
--color-teal-600: #0d9488;    /* Secundário */
--color-green-600: #16a34a;   /* Sucesso */
--color-red-500: #ef4444;     /* Erro */
```

### Componentes
- **Cards**: Bordas arredondadas com gradientes
- **Botões**: Estados hover/focus com transições
- **Formulários**: Validação visual em tempo real
- **Toast**: Notificações com auto-close

## 🔒 Segurança

### Validações Backend
- Sanitização de dados de entrada
- Prepared statements (PDO)
- Validação de tipos de dados
- Escape de caracteres especiais

### Validações Frontend
- Validação em tempo real
- Formatação automática
- Verificação de formatos
- Feedback visual imediato

## 📱 Responsividade

### Breakpoints
- **Mobile**: 320px - 640px
- **Tablet**: 641px - 1024px
- **Desktop**: 1025px+

### Adaptações Mobile
- Menu empilhado verticalmente
- Botões em tela cheia
- Formulários adaptados
- Toast notifications responsivos

## 🔄 Fluxo de Uso

1. **Página Inicial**: Escolher área (farmacêutico/paciente)
2. **Login Farmacêutico**: CRF → Sistema
3. **Login/Cadastro Paciente**: ID ou novo cadastro
4. **Dashboard**: Atendimento completo
5. **Ações**: Medicamentos, receitas, consultas

## 📈 Relatórios e Views

### Views Pré-criadas
- `view_atendimentos_completos`: Atendimentos com durações
- `view_medicamentos_baixo_estoque`: Controle de estoque
- `view_consultas_do_dia`: Agenda diária

### Triggers
- Atualização automática de estoque
- Logs de alterações
- Validações de integridade

## 🚀 Deploy

### Produção
1. Configurar servidor web
2. Criar banco de dados
3. Ajustar permissões PHP
4. Configurar SSL
5. Backup automático

### Otimizações
- Minificação CSS/JS
- Compressão gzip
- Cache de consultas
- Índices otimizados

## 🤝 Contribuição

1. Fork o repositório
2. Crie branch para feature
3. Implemente mudanças
4. Teste em diferentes dispositivos
5. Faça pull request

## 📄 Licença

MIT License - veja arquivo LICENSE

## 📞 Suporte

Para suporte e questões:
- Documentação completa no código
- Comentários detalhados nas APIs
- Exemplos de uso em cada arquivo

---

**Sistema desenvolvido para modernizar o atendimento em clínicas e farmácias** 💊💙