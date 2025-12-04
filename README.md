# 🏈 Vikings Analytics 2025 - Custo e Performance

Este projeto é um dashboard interativo de visualização de dados desenvolvido para analisar a performance e a eficiência financeira (Cap Hit) do elenco do Minnesota Vikings na temporada 2025.

O sistema cruza dados de **Ataque** (Jardas, TDs) e **Defesa** (Tackles, Turnovers, Faltas) com os salários dos jogadores, permitindo identificar os MVPs (Melhor Valor) e os riscos do time.

## 📊 Funcionalidades

O dashboard é dividido em duas grandes seções unificadas:

### 1. Ataque & Finanças
- **Matriz de Eficiência (Bubble Chart):** Relaciona o Custo ($) x Produção (Jardas).
- **Radar de Habilidades:** Compara métricas específicas por posição (QB, WR, RB, TE).
- **Distribuição de Cap:** Gráfico de barras mostrando o investimento por setor.

### 2. Defesa & Disciplina
- **Cards de Jogadores:** Visualização individual com métricas de impacto.
- **Análise de Disciplina:** Comparativo entre *Big Plays* (Interceptações/Fumbles) e Faltas cometidas.
- **Ordenação Dinâmica:** Filtros por volume de Tackles ou saldo de jogadas (Bom vs Ruim).

## 🚀 Tecnologias Utilizadas

- **[React](https://react.dev/):** Biblioteca principal para construção da interface.
- **[Vite](https://vitejs.dev/):** Ferramenta de build e servidor de desenvolvimento rápido.
- **[Lucide React](https://lucide.dev/):** Biblioteca de ícones (Escudos, Troféus, Gráficos).
- **JavaScript (ES6+):** Lógica de manipulação e filtragem de dados.
- **CSS/Estilização:** Layout responsivo (Bento Grid).

## 📦 Como rodar o projeto

Siga os passos abaixo para executar o projeto em sua máquina local:

### 1. Pré-requisitos
Certifique-se de ter o **Node.js** (versão 18 ou superior) instalado.

### 2. Instalação
Clone este repositório e instale as dependências (isso criará a pasta `node_modules`):

```bash
# Clone o repositório (ou baixe o ZIP)
git clone [https://github.com/SEU-USUARIO/Vikings_Analytics.git](https://github.com/SEU-USUARIO/Vikings_Analytics.git)

# Entre na pasta do projeto
cd Vikings_Analytics

# Instale as dependências listadas no package.json
npm install

