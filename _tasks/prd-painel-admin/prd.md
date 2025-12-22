# PRD: Painel Admin de Gestão de Negócio

## 📋 Resumo Executivo

Implementação de um painel administrativo (dashboard) que permite ao proprietário do salão de beleza Walter Leal visualizar e gerenciar dados críticos do negócio: faturamento mensal/anual, agendamentos e vendas de produtos. O painel será acessado via switch na página de perfil do usuário (modo demo/MVP).

**Problema a Resolver:** Proprietário não tem visibilidade consolidada de métricas financeiras, ocupação de profissionais e performance de vendas de produtos.

**Objetivo Mensurável:** Permitir análise de faturamento em até 2 cliques e visualização de tendências mensais/anuais.

---

## 👥 Usuários e Histórias

### Usuário Principal
- **Proprietário do Salão**: Acessa o painel para monitorar saúde do negócio

### Histórias de Usuário

**H1:** Como proprietário, quero ativar o modo admin via switch na página de perfil para acessar dados gerenciais.

**H2:** Como proprietário, quero visualizar gráficos de faturamento mensal para entender receita do mês atual e compará-la com períodos anteriores.

**H3:** Como proprietário, quero visualizar gráficos de faturamento anual para avaliar tendências e sazonalidade do negócio.

**H4:** Como proprietário, quero ver receita bruta por hora do dia para identificar horários de pico e otimizar agendamentos.

**H5:** Como proprietário, quero navegar entre diferentes meses no gráfico mensal sem perder contexto do painel.

---

## 🎯 Escopo da Funcionalidade

### ✅ Incluído (MVP)
1. **Switch Admin na Página de Perfil**
   - Toggle simples (on/off) sem autenticação adicional
   - Exibe/oculta menu "Admin" na navegação principal

2. **Dashboard Admin com 3 Seções**
   - **Gráfico de Faturamento Mensal**: Visualizar receita bruta do mês selecionado
   - **Gráfico de Faturamento Anual**: Visualizar receita bruta dos últimos 12 meses
   - **Gráfico de Receita por Hora**: Mostrar distribuição de receita por hora do dia

3. **Navegação de Períodos**
   - Seletor de mês (dropdown ou botões anterior/próximo)
   - Comparação visual com mês anterior
   - Indicador de período atualmente visualizado

4. **Design Consistente**
   - Seguir padrão visual do projeto (componentes UI existentes)
   - Responsivo para mobile e desktop
   - Dark mode suportado

### ❌ Fora do Escopo
- Gestão (CRUD) de produtos, agendamentos ou profissionais
- Exportação de relatórios (PDF/CSV)
- Autenticação avançada ou permissões granulares
- Integração com backend em tempo real
- Análise de margens líquidas ou lucro
- Filtros complexos ou segmentação de dados
- Sistema de notificações

---

## 📊 Requisitos Funcionais

### RF-1: Switch Admin (Página de Perfil)
- [ ] Exibir toggle switch na `ProfileScreen`
- [ ] Label claro: "Modo Admin"
- [ ] Persistir estado no contexto local da sessão
- [ ] Ao ativar: exibir item "Admin" no menu de navegação
- [ ] Ao desativar: ocultar menu e redirecionar para Home se estiver no Admin

### RF-2: Menu Admin (Navegação)
- [ ] Adicionar item "Admin" na `Navigation` (visível apenas com switch ativo)
- [ ] Ícone destacado e clicável
- [ ] Link para rota `/admin` ou similar
- [ ] Highlight visual quando ativo

### RF-3: Tela Dashboard Admin (Layout Principal)
- [ ] Criar componente `AdminScreen.tsx`
- [ ] Layout com 3 gráficos principais (grid responsivo)
- [ ] Header com título "Painel de Gestão"
- [ ] Espaçamento e alinhamento seguindo padrão do projeto
- [ ] Suporte a tema claro/escuro

### RF-4: Gráfico de Faturamento Mensal
- [ ] Gráfico em barras ou linha mostrando receita bruta por dia do mês
- [ ] Seletor de mês (dropdown ou botões prev/next)
- [ ] Comparação visual: mês atual vs mês anterior (cores diferentes)
- [ ] Exibir valor total do mês no topo ou rodapé
- [ ] Dados: mockados em `mockData.ts` com padrão realista
- [ ] Tooltip ao passar mouse mostrando dia e valor

### RF-5: Gráfico de Faturamento Anual
- [ ] Gráfico em barras ou linha mostrando receita bruta dos últimos 12 meses
- [ ] Ordenação: janeiro a dezembro
- [ ] Exibir valor total anual no topo
- [ ] Destaque visual do mês com maior receita
- [ ] Dados: mockados com valores crescentes/realistas
- [ ] Tooltip mostrando mês e valor

### RF-6: Gráfico de Receita por Hora
- [ ] Gráfico em barras mostrando receita bruta por hora (09:00 - 19:00)
- [ ] Eixo Y: valores em reais (R$)
- [ ] Eixo X: horários (formato HH:00)
- [ ] Identificar e destacar horário de pico
- [ ] Dados: mockados baseado em serviços e horários do `mockData.ts`
- [ ] Tooltip mostrando hora e valor

### RF-7: Responsividade e Acessibilidade
- [ ] Dashboard adaptável a mobile (1 gráfico por linha em mobile, 2-3 em desktop)
- [ ] Gráficos redimensionam mantendo legibilidade
- [ ] Labels acessíveis para leitores de tela
- [ ] Contraste de cores compatível com WCAG AA

### RF-8: Persistência de Estado
- [ ] Switch admin persiste durante a sessão
- [ ] Contexto `AdminContext` (novo) gerencia estado global
- [ ] Reset ao fazer logout

---

## 📈 Métricas de Sucesso

1. **Funcionalidade**: Todos os 3 gráficos renderizam corretamente com dados mock
2. **Usabilidade**: Proprietário consegue visualizar faturamento do mês em < 3 cliques
3. **Performance**: Dashboard carrega em < 2 segundos
4. **Acessibilidade**: Score Lighthouse Accessibility ≥ 90
5. **Consistência**: Design segue padrão visual existente do projeto

---

## 🗂️ Estrutura de Arquivos (Proposta)

```
src/
├── components/
│   ├── AdminScreen.tsx           # Dashboard principal
│   ├── admin/
│   │   ├── MonthlyRevenueChart.tsx
│   │   ├── AnnualRevenueChart.tsx
│   │   └── HourlyRevenueChart.tsx
│   └── ProfileScreen.tsx          # [MODIFICAR - adicionar switch]
├── contexts/
│   └── AdminContext.tsx           # [NOVO] - gerenciar estado admin
├── data/
│   └── mockData.ts                # [MODIFICAR - adicionar dados mock]
└── ...
```

---

## 🔗 Dependências e Premissas

**Dependências:**
- Componentes UI existentes: Card, Tabs, Select, Button, Switch
- Biblioteca gráficos (verificar projeto): Recharts, Chart.js ou similar
- React Context API (já utilizado no projeto)

**Premissas:**
- Dados são 100% mockados (sem integração backend)
- Modo admin não requer autenticação adicional (MVP de apresentação)
- Switch admin não deixa logs de acesso
- Dados de faturamento são calculados a partir de agendamentos e vendas mockadas
- Usuário está sempre autenticado (modo demo)

---

## 📝 Notas de Implementação

- Reutilizar componentes UI do projeto (shadcn/ui)
- Gráficos podem usar Recharts (verificar se já está no projeto)
- Manter padrão de nomenclatura e estrutura existente
- Adicionar comentários em código explicando lógica de cálculo de receita
- Considerar performance com dataset > 100 registros no futuro

---

## ✅ Checklist de Entrega

- [ ] Switch admin implementado na ProfileScreen
- [ ] Menu Admin adicionado à Navigation
- [ ] AdminScreen criada com layout responsivo
- [ ] 3 gráficos (Mensal, Anual, Horário) funcionando
- [ ] Dados mockados realistas e consistentes
- [ ] AdminContext criado e integrado
- [ ] Responsivo testado em mobile/tablet/desktop
- [ ] Dark mode funcionando
- [ ] Lighthouse Accessibility ≥ 90
- [ ] PRD implementado sem desvios de escopo

---

**Versão:** 1.0  
**Data:** Dezembro 2024  
**Status:** Pronto para Desenvolvimento

