# Sistema Clínica - Front-End

Sistema web moderno para gestão de farmacêuticos e pacientes em clínicas e farmácias.

## 🎯 Características

- **Interface Moderna**: Design clean com gradientes hospitalares em azul e verde
- **Responsivo**: Adaptado para desktop, tablet e mobile
- **Validações em Tempo Real**: Validação de formulários com feedback imediato
- **Acessibilidade**: Labels adequados, ARIA attributes e navegação por teclado
- **Mensagens de Feedback**: Sistema de notificações para sucesso, erro e informações
- **Componentização**: Componentes reutilizáveis seguindo boas práticas

## 🚀 Funcionalidades

### Página Inicial
- Menu principal com navegação clara
- Introdução ao sistema com cards informativos
- Design hospitalar com elementos decorativos

### Cadastro de Farmacêuticos
- Login com CRF (Conselho Regional de Farmácia)
- Cadastro completo com validação de dados
- Geração automática de CRF único
- Campos: Nome, Data de Nascimento, Sexo, Endereço, Contato

### Cadastro de Pacientes
- Login com ID único do paciente
- Cadastro completo com validação
- Geração automática de ID único
- Mesmos campos do farmacêutico

### Dashboard de Atendimento
- Visualização de dados do paciente atual
- Ações rápidas para medicamentos, receitas e consultas
- Interface hospitalar com cores adequadas

## 🛠 Tecnologias Utilizadas

- **React 18** - Framework principal
- **TypeScript** - Tipagem estática
- **Tailwind CSS v4** - Estilização
- **Shadcn/ui** - Componentes de interface
- **Lucide React** - Ícones
- **Local Storage** - Persistência de dados

## 📱 Responsividade

O sistema foi desenvolvido seguindo a abordagem Mobile-First:

- **Mobile** (320px+): Layout em coluna única, botões empilhados
- **Tablet** (768px+): Layout adaptado com mais espaço
- **Desktop** (1024px+): Layout completo com sidebars e colunas

## ✅ Validações Implementadas

### Validação de Nome
- Obrigatório, mínimo 2 caracteres
- Apenas letras e espaços
- Feedback em tempo real

### Validação de Data de Nascimento
- Obrigatória, não pode ser futura
- Idade entre 0 e 120 anos
- Cálculo automático da idade

### Validação de CRF
- Formato: CRF-XXXXX
- Obrigatório para farmacêuticos
- Validação de formato

### Validação de Telefone
- Formatos aceitos: (11) 9999-9999 ou (11) 99999-9999
- Formatação automática
- Validação de quantidade de dígitos

### Validação de Endereço
- Obrigatório, mínimo 5 caracteres
- Campo de texto livre

## 🎨 Design System

### Cores Principais
- **Azul**: `#3b82f6` (Primary)
- **Verde/Teal**: `#10b981` (Secondary)
- **Vermelho**: `#ef4444` (Erro)
- **Cinza**: Escalas para textos neutros

### Gradientes
- **Medical**: Azul → Verde → Azul
- **Light**: Azul claro → Verde claro → Azul claro

### Componentes
- **Cards**: Bordas arredondadas, sombras suaves
- **Botões**: Gradientes, estados hover/focus
- **Inputs**: Bordas coloridas por contexto
- **Mensagens**: Toast notifications com auto-close

## 📚 Estrutura de Componentes

```
/components
├── HomePage.tsx              # Página inicial
├── PharmacistLogin.tsx       # Login do farmacêutico
├── PharmacistRegistration.tsx # Cadastro do farmacêutico
├── ClientLogin.tsx           # Login do paciente
├── ClientRegistration.tsx    # Cadastro do paciente
├── Dashboard.tsx             # Dashboard de atendimento
├── SuccessModal.tsx          # Modal de sucesso
├── FormValidation.tsx        # Utilitários de validação
├── FeedbackMessage.tsx       # Sistema de mensagens
└── ui/                       # Componentes base (Shadcn)
```

## 🔧 Instalação e Uso

1. Clone o repositório
2. Instale as dependências: `npm install`
3. Execute o projeto: `npm run dev`
4. Acesse: `http://localhost:3000`

## 📋 Fluxo de Uso

1. **Início**: Acesse a página inicial e escolha a área
2. **Login do Farmacêutico**: Entre com CRF ou cadastre-se
3. **Login do Paciente**: Entre com ID ou cadastre novo paciente
4. **Atendimento**: Acesse o dashboard com dados do paciente
5. **Ações**: Realize ações como dispensar medicamentos

## 🔒 Armazenamento de Dados

Os dados são armazenados localmente no navegador usando `localStorage`:

- `pharmacists`: Array com dados dos farmacêuticos
- `clients`: Array com dados dos pacientes

**Estrutura dos dados:**

```typescript
// Farmacêutico
{
  id: string,
  name: string,
  birthDate: string,
  gender: 'M' | 'F' | 'O',
  address: string,
  contact: string,
  crf: string
}

// Paciente
{
  id: string,
  name: string,
  birthDate: string,
  gender: 'M' | 'F' | 'O',
  address: string,
  contact: string,
  clientId: string
}
```

## 🎯 Próximas Funcionalidades

- [ ] Integração com banco de dados
- [ ] Sistema de receitas médicas
- [ ] Histórico de atendimentos
- [ ] Relatórios e estatísticas
- [ ] Sistema de notificações
- [ ] Backup e sincronização

## 🤝 Contribuição

Para contribuir com o projeto:

1. Faça um fork do repositório
2. Crie uma branch para sua feature
3. Implemente as mudanças
4. Teste em diferentes dispositivos
5. Faça um pull request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo LICENSE para mais detalhes.

---

**Desenvolvido com ❤️ para melhorar o atendimento em clínicas e farmácias**