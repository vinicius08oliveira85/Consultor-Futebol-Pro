# Atualizar Jogos — Consultor Futebol Pro

Prompt reutilizável para colar no **Agent mode** do Cursor.

---

## Uso rápido

Copie o bloco abaixo e preencha os campos entre colchetes:

```markdown
Atualize os jogos do Consultor Futebol Pro para [DATA, ex: 2026-08-26].

### Contexto
- Projeto: site estático que lê `data/matches.json` e `data/history.json`
- Validar com: `node scripts/validate-matches.js`
- Não commitar nem fazer push a menos que eu peça

### O que fazer
1. Atualizar `data/matches.json`:
   - `meta.date` = data do dia
   - `leagues` = ligas presentes nos jogos do dia
   - `matches` = todos os jogos de hoje (substituir lista anterior)
   - `top3`, `combos`, `quickPicks` = alinhados aos jogos do dia

2. Atualizar `data/history.json`:
   - Mover jogos de ontem para `past` com placares e `result` (won/lost/pending)
   - Manter o último dia em `past` com `"syncFromMatches": true` e `"status": "today"`
   - Atualizar `future` com jogos dos próximos 7 dias (se houver)

3. Rodar validação e corrigir erros até passar

### Jogos de hoje
[Cole aqui: liga, horário, mandante x visitante — ou link/fonte]

### Resultados de ontem (opcional)
[time x time, placar, se a aposta bateu ou não]

### Regras de qualidade
- Cada match segue o schema de `data/matches.json` (topPicks com 3 itens, markets, teamStats, h2hSummary, context, analysis)
- `topPicks[0].confidence` = `match.confidence`; odds coerentes
- `homeProb + drawProb + awayProb` ≈ 100
- `kickoff` em ISO com fuso `-03:00`
- Textos em português, tom analítico como nos jogos atuais
- Diff mínimo; não alterar JS/CSS/HTML sem necessidade
```

---

## Prompt completo

Use quando quiser mais controle ou quando o agente errar o formato:

```markdown
# Tarefa: Atualizar jogos — Consultor Futebol Pro

Atualize a base de dados de partidas para **[DATA]**.

## Arquivos

| Arquivo | Função |
|---------|--------|
| `data/matches.json` | Jogos do dia, análises, top3, combos, quickPicks |
| `data/history.json` | Histórico passado + futuro (7 dias) |
| `scripts/validate-matches.js` | Validação obrigatória |

## Schema de cada match (obrigatório)

Campos mínimos por jogo:

- **Identificação:** `league`, `leagueLabel`, `teams`, `home`, `away`, `time`, `kickoff` (ISO -03:00), `sortPriority`
- **Aposta principal:** `bet`, `confidence`, `odds`, `multiBetShort`
- **Odds 1X2:** `homeOdd`, `drawOdd`, `awayOdd`, `homeProb`, `drawProb`, `awayProb`, `homeShort`, `awayShort`, `bestOdd`
- **Contexto:** `venue`, `round`, `form`, `h2h`, `keyStats`, `sources`, `analysis` (última linha: `Recomendação: ...`)
- **Enriquecimento:** `teamStats.home/away`, `h2hSummary`, `context`
- **Mercados:** `topPicks` (exatamente 3), `markets` (`resultado`, `gols`, `cartoes`, `escanteios`)

## Estrutura raiz de `matches.json`

```json
{
  "meta": {
    "date": "...",
    "stats": {
      "totalGames": 0,
      "resolvedGames": 0,
      "wins": 0,
      "roi": 0
    }
  },
  "leagues": [
    { "id": "cl", "name": "Champions League" }
  ],
  "matches": [],
  "top3": [],
  "combos": [],
  "quickPicks": []
}
```

## `history.json`

- **`past`:** dias finalizados com `homeScore`, `awayScore`, `result`: `"won"` | `"lost"` | `"pending"`
- **Último item de `past`:** `"status": "today"`, `"syncFromMatches": true`, `"matches": []` (app sincroniza via `js/history.js`)
- **`future`:** próximos dias com apostas sugeridas

## Fluxo de execução

1. Ler `data/matches.json` atual como referência de estilo
2. Gerar/atualizar os JSONs
3. Executar `node scripts/validate-matches.js` — corrigir até zero erros
4. Resumir: quantos jogos, ligas, top3 escolhidos, o que mudou no histórico

## Entrada do usuário

**Data:** [DATA]

**Jogos de hoje:**
[LISTA OU FONTE]

**Resultados de ontem (opcional):**
[PLACARES]

## Restrições

- Português (BR)
- Não commitar/push sem pedido explícito
- Não alterar `js/`, `css/`, `index.html` salvo bug encontrado na validação
```

---

## Jogos de amanhã

Use quando quiser **preparar o dia seguinte** sem alterar o fluxo de hoje. O site continua exibindo `matches.json` de hoje até você publicar a virada.

### Prompt — preparar amanhã

Copie e preencha:

```markdown
Prepare os jogos de **amanhã** ([DATA AMANHÃ, ex: 2026-08-27]) no Consultor Futebol Pro.

### Contexto
- Hoje ainda é [DATA HOJE]; **não altere** o `matches.json` em produção até eu pedir a virada
- Use como base: `data/history.json` → `future[0]` (status `"tomorrow"`) e o script modelo `scripts/build-matches-*.js`
- Validar com: `node scripts/validate-matches.js`
- Não commitar nem fazer push a menos que eu peça

### O que fazer
1. Ler `data/history.json` → `future[0]` e confirmar/ajustar a lista de jogos de amanhã
2. Criar `scripts/build-matches-[DATA-AMANHA].js` seguindo o padrão de `scripts/build-matches-2026-08-26.js`:
   - helpers: `kickoff`, `stats`, `pick`, `mkt`, `mkMarkets`, `buildMatch`
   - `matches` completos (topPicks, markets, teamStats, analysis, etc.)
   - `leagues`, `top3`, `combos`, `quickPicks` alinhados ao dia
   - `meta.date` = data de amanhã
3. **Não executar** o script sobre `data/matches.json` ainda — salvar saída em `data/matches-[DATA-AMANHA].draft.json`
4. Atualizar `data/history.json` → `future[0]` com apostas resumidas (home, away, bet, odd, confidence) coerentes com o draft
5. Rodar validação **no draft** (ajustar validate ou validar manualmente o schema)
6. Resumir: quantos jogos, top3, ligas, diferenças vs `future[0]` anterior

### Jogos de amanhã (se souber além do history)
[Cole aqui ou diga "usar só future[0]"]

### Fontes / observações
[uefa.com, fotmob, eliminatórias 2º jogo, etc.]

### Regras
- Mesmo schema e tom analítico de `data/matches.json` atual
- `kickoff` com fuso `-03:00`
- `topPicks` = 3; `topPicks[0].confidence` = `match.confidence`
- Diff mínimo; não alterar JS/CSS/HTML
```

### Prompt — virar o dia (publicar amanhã)

Use na virada, quando amanhã vira hoje:

```markdown
Virada de dia: publique os jogos de [DATA AMANHÃ] como dia ativo.

1. Executar `node scripts/build-matches-[DATA-AMANHA].js` → grava `data/matches.json`
   (ou copiar `data/matches-[DATA-AMANHA].draft.json` → `data/matches.json`)
2. Atualizar `data/history.json`:
   - Fechar [DATA HOJE] em `past` com placares e `result` (won/lost)
   - Novo último item em `past`: `"status": "today"`, `"syncFromMatches": true`, `"matches": []`
   - Remover o dia publicado de `future`; avançar janela de 7 dias se necessário
3. `node scripts/validate-matches.js` — zero erros
4. Resumir alterações
```

### Exemplo preenchido (amanhã)

```markdown
Prepare os jogos de **amanhã** (2026-08-27) no Consultor Futebol Pro.

Hoje ainda é 2026-08-26. Usar `future[0]` do history como base.

Jogos de amanhã:
- 16:00 — Europa League: Thun x Lech Poznan
- 16:00 — Europa League: Sion x Ajax
- 16:00 — Conference League: Austria Vienna x Braga

Salvar draft em `data/matches-2026-08-27.draft.json`. Não sobrescrever matches.json.
```

---

## Atalhos por cenário

### Só resultados de ontem

```markdown
Atualize `data/history.json`: preencha placares e result (won/lost) dos jogos de [DATA ONTEM].
Mantenha syncFromMatches no dia de hoje. Não altere matches.json.
```

### Só trocar jogos do dia

```markdown
Substitua `data/matches.json` pelos jogos de [DATA].
Mantenha o mesmo nível de detalhe (topPicks, markets, teamStats).
Atualize top3, combos e quickPicks.
Valide com `node scripts/validate-matches.js`.
```

### Adicionar 1 jogo

```markdown
Adicione [MANDANTE x VISITANTE, liga, horário] em `data/matches.json` para [DATA],
seguindo o schema dos demais. Atualize leagues/meta se necessário. Valide.
```

---

## Comando de validação

```bash
node scripts/validate-matches.js
```

---

## Exemplo preenchido

```markdown
Atualize os jogos do Consultor Futebol Pro para 2026-08-26.

### Jogos de hoje
- 16:00 — Champions League: Lyon x Fenerbahçe
- 16:00 — Europa League: Thun x Lech Poznan
- 16:00 — Europa League: Sion x Ajax

### Resultados de ontem
- Sabah 1-2 Hapoel Beer Sheva — aposta "Hapoel avança" → won
- Cardiff 2-1 Norwich — aposta "Ambos marcam" → lost
```

---

## Uso no chat

Depois de salvar este arquivo, basta dizer no Agent mode:

> Atualize os jogos para 26/08. Jogos: [lista]

> **Prepare os jogos de amanhã** — siga a seção "Jogos de amanhã" em `docs/ATUALIZAR-JOGOS.md`

Ou referencie o arquivo:

> Siga `docs/ATUALIZAR-JOGOS.md` e atualize os jogos para [DATA].
