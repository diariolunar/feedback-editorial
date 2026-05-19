const STORAGE_KEY = "feedback_editorial_documento_v1";

const appState = {
  selectedCategoryIndex: -1,
  document: {
    meta: {},
    categories: []
  }
};

const FIELD_MAP = {
  TITULO_RELATORIO: "tituloRelatorio",
  SUBTITULO_RELATORIO: "subtituloRelatorio",
  OBRA: "obra",
  AUTOR: "autor",
  AVALIADOR: "avaliador",
  TIPO_REVISAO: "tipoRevisao",
  ESCOPO: "escopo",
  GENERO_LITERARIO: "generoLiterario",
  SUBGENEROS_E_ELEMENTOS: "subgenerosElementos",
  PUBLICO_ALVO: "publicoAlvo",
  IDENTIDADE_TONAL: "identidadeTonal",
  PROMESSA_NARRATIVA: "promessaNarrativa",
  CONFLITO_CENTRAL: "conflitoCentral",
  ESTAGIO_EDITORIAL: "estagioEditorial",
  NIVEL_DE_MATURIDADE: "nivelMaturidade",
  MAIOR_FORCA: "maiorForca",
  MAIOR_FRAQUEZA: "maiorFraqueza",
  VEREDITO_RESUMIDO: "vereditoResumido",
  STATUS_DO_DOCUMENTO: "statusDocumento",
  DATA: "data",
  OBSERVACOES_GERAIS: "observacoesGerais"
};

const META_INPUTS = {
  tituloRelatorio: "fieldTituloRelatorio",
  subtituloRelatorio: "fieldSubtituloRelatorio",
  obra: "fieldObra",
  autor: "fieldAutor",
  avaliador: "fieldAvaliador",
  tipoRevisao: "fieldTipoRevisao",
  escopo: "fieldEscopo",
  generoLiterario: "fieldGeneroLiterario",
  publicoAlvo: "fieldPublicoAlvo",
  identidadeTonal: "fieldIdentidadeTonal",
  estagioEditorial: "fieldEstagioEditorial",
  statusDocumento: "fieldStatusDocumento"
};

const PROMPT_COMPLETO = `Você é um organizador técnico de relatórios editoriais profissionais.

Sua tarefa é pegar o texto de revisão editorial que vou enviar e reorganizá-lo em um padrão fixo, limpo, completo e altamente estruturado para ser usado em uma plataforma geradora de documentos estilizados em PDF.

ATENÇÃO:
Você NÃO deve fazer uma nova revisão editorial.
Você NÃO deve resumir o conteúdo.
Você NÃO deve reescrever o estilo do avaliador.
Você NÃO deve suavizar críticas.
Você NÃO deve retirar informações importantes.
Você NÃO deve inventar informações ausentes.
Você NÃO deve transformar o texto em artigo, ensaio ou parecer novo.
Você deve apenas organizar, padronizar, classificar e preparar o conteúdo para diagramação.

O objetivo é que o texto final possa ser colado em uma plataforma web que reconhece campos e categorias automaticamente.

REGRAS GERAIS:
1. Preserve TODO o conteúdo relevante da revisão original.
2. Mantenha o sentido, o tom e a profundidade da avaliação.
3. Corrija apenas problemas de formatação evidentes.
4. Não faça cortes de conteúdo, a menos que exista duplicação clara e acidental.
5. Quando houver tabelas no texto original, mantenha-as como tabela em Markdown.
6. Quando houver listas, mantenha-as como listas.
7. Quando houver citações, trechos originais, exemplos de reescrita ou sugestões concretas, preserve-os integralmente.
8. Quando uma informação não estiver presente, preencha o campo com: Não informado.
9. Não explique o que você fez. Apenas entregue o texto final padronizado.

FORMATO OBRIGATÓRIO:

[TITULO_RELATORIO]
Escreva aqui o título principal do relatório.

[SUBTITULO_RELATORIO]
Escreva aqui o subtítulo do relatório.

[OBRA]
Escreva aqui o nome da obra analisada.

[AUTOR]
Escreva aqui o nome do autor, se informado.

[AVALIADOR]
Escreva aqui o nome do avaliador, revisor ou responsável, se informado.

[TIPO_REVISAO]
Informe o tipo de revisão.

[ESCOPO]
Informe o escopo do material analisado.

[GENERO_LITERARIO]
Informe o gênero literário aparente.

[SUBGENEROS_E_ELEMENTOS]
Liste os subgêneros e elementos narrativos detectados.

[PUBLICO_ALVO]
Informe o público-alvo provável.

[IDENTIDADE_TONAL]
Informe a identidade tonal da obra.

[PROMESSA_NARRATIVA]
Informe a promessa narrativa central.

[CONFLITO_CENTRAL]
Informe o conflito central da obra, separando em camadas se necessário.

[ESTAGIO_EDITORIAL]
Informe o estágio editorial atual do manuscrito.

[NIVEL_DE_MATURIDADE]
Informe se o texto parece rascunho inicial, intermediário, avançado ou outro diagnóstico equivalente.

[MAIOR_FORCA]
Informe a maior força identificada.

[MAIOR_FRAQUEZA]
Informe a maior fraqueza identificada.

[VEREDITO_RESUMIDO]
Escreva um resumo breve do parecer final.

[STATUS_DO_DOCUMENTO]
Informe o status do documento.

[DATA]
Informe a data, se houver.

[OBSERVACOES_GERAIS]
Inclua observações gerais importantes que não se encaixam nos campos anteriores.

Depois dos campos principais, organize toda a revisão em categorias.

Cada categoria deve seguir exatamente este modelo:

[CATEGORIA]
Nome da categoria

[TIPO_CATEGORIA]
Use um dos tipos abaixo:
texto
tabela
lista
diagnostico
personagens
reescrita
gramatica
pontos_fortes
pontos_fracos
prioridades
plano_de_melhoria
veredito
sensibilidade
mercado
mundo
estrutura
ritmo
dialogos
prosa
cenas
tema
outro

[RESUMO_CATEGORIA]
Escreva um resumo curto da categoria em 1 a 3 frases, sem perder o sentido.

[CONTEUDO]
Cole aqui o conteúdo completo da categoria, preservando a profundidade, listas, tabelas, exemplos, citações e sugestões.

[FIM_CATEGORIA]

CATEGORIAS ESPERADAS:
Sempre que existirem no texto original, separe em categorias próprias os seguintes blocos:
Antes da análise completa; Gênero literário aparente; Público-alvo provável; Identidade tonal; Promessa narrativa; Conflito central; Nível atual de maturidade do manuscrito; Maior força; Maior fraqueza; Diagnóstico editorial geral; Premissa e promessa narrativa; Estrutura narrativa; Ritmo narrativo; Engenharia de cenas; Desenvolvimento de personagens; Análise do protagonista; Forças antagônicas; Relações entre personagens; Diálogos; Voz narrativa; Ponto de vista; Prosa e estilo; Clareza; Mostrar versus contar; Subtexto; Construção emocional; Tensão narrativa; Consistência interna; Construção de mundo; Atmosfera e ambientação; Tema e simbolismo; Originalidade; Gramática e revisão técnica; Edição linha a linha; Experiência do leitor; Potencial de mercado; Sensibilidade e representação; Pontos fortes; Pontos fracos; Prioridades de reescrita; Plano prático de melhoria; Sugestões concretas de reescrita; Veredito editorial final.

Caso alguma dessas categorias não exista no texto original, não invente. Apenas organize as que existirem.

REGRAS PARA TABELAS:
Quando houver tabelas, preserve em Markdown.

REGRAS PARA TRECHOS DE REESCRITA:
Quando houver blocos de reescrita, preserve a estrutura:
### Trecho
### Original Passage
### Problem
### Suggested Revision
### Why This Improves the Passage

Ou, se estiver em português:
### Trecho
### Passagem Original
### Problema
### Sugestão de Reescrita
### Por que melhora

SAÍDA FINAL:
Entregue apenas o documento padronizado.
Não escreva introdução.
Não escreva conclusão fora dos campos.
Não diga “aqui está”.
Não explique o processo.
Não use blocos de código.
Não use comentários adicionais.

Agora organize o texto abaixo no padrão solicitado:

COLE AQUI O TEXTO COMPLETO DA REVISÃO EDITORIAL`;

const PROMPT_RESUMIDO = `Você é um organizador técnico de relatórios editoriais profissionais.

Sua tarefa é pegar o texto de revisão editorial que vou enviar e gerar uma VERSÃO RESUMIDA, organizada, clara e pronta para ser colada em uma plataforma web que cria documentos estilizados em PDF.

ATENÇÃO:
Você NÃO deve criar uma nova revisão do zero.
Você NÃO deve inventar informações.
Você NÃO deve mudar o diagnóstico central.
Você NÃO deve transformar críticas negativas em elogios.
Você NÃO deve apagar problemas importantes.
Você deve condensar o conteúdo mantendo o sentido editorial, a seriedade da análise e as principais recomendações.

OBJETIVO DA VERSÃO RESUMIDA:
1. Apresentar rapidamente o diagnóstico editorial da obra.
2. Informar gênero, público-alvo, tom e estágio do manuscrito.
3. Destacar forças principais.
4. Destacar fragilidades principais.
5. Listar prioridades de reescrita.
6. Apresentar um plano prático de melhoria.
7. Preservar algumas sugestões concretas de reescrita, se existirem.
8. Entregar um veredito final claro, profissional e útil.

REGRAS DE CONDENSAÇÃO:
1. Reduza o texto original sem perder o diagnóstico principal.
2. Preserve as informações mais importantes.
3. Elimine repetições.
4. Una ideias semelhantes.
5. Mantenha exemplos concretos apenas quando forem muito úteis.
6. Se houver muitas sugestões de reescrita, escolha as mais importantes.
7. Se houver muitas categorias, agrupe categorias próximas.
8. Não suavize o parecer.
9. Não transforme uma obra imatura em obra pronta.
10. Não remova críticas estruturais importantes.
11. Mantenha um tom profissional, firme, respeitoso e editorialmente útil.

TAMANHO:
A versão resumida deve ter aproximadamente entre 20% e 35% do tamanho do relatório original.

FORMATO OBRIGATÓRIO:

[TITULO_RELATORIO]
Escreva aqui o título principal do relatório.

[SUBTITULO_RELATORIO]
Versão resumida do parecer editorial

[OBRA]
Escreva aqui o nome da obra analisada.

[AUTOR]
Escreva aqui o nome do autor, se informado.

[AVALIADOR]
Escreva aqui o nome do avaliador, revisor ou responsável, se informado.

[TIPO_REVISAO]
Versão resumida de revisão editorial profissional

[ESCOPO]
Informe o escopo do material analisado.

[GENERO_LITERARIO]
Informe o gênero literário aparente.

[SUBGENEROS_E_ELEMENTOS]
Liste apenas os principais subgêneros e elementos narrativos.

[PUBLICO_ALVO]
Informe o público-alvo provável.

[IDENTIDADE_TONAL]
Informe a identidade tonal da obra.

[PROMESSA_NARRATIVA]
Resuma a promessa narrativa central em até 5 linhas.

[CONFLITO_CENTRAL]
Resuma o conflito central em até 5 linhas.

[ESTAGIO_EDITORIAL]
Informe o estágio editorial atual.

[NIVEL_DE_MATURIDADE]
Informe o nível de maturidade do manuscrito.

[MAIOR_FORCA]
Informe a maior força em até 3 linhas.

[MAIOR_FRAQUEZA]
Informe a maior fraqueza em até 3 linhas.

[VEREDITO_RESUMIDO]
Escreva um parecer resumido entre 1 e 3 parágrafos.

[STATUS_DO_DOCUMENTO]
Informe o status do documento.

[DATA]
Informe a data, se houver.

[OBSERVACOES_GERAIS]
Inclua observações gerais relevantes em até 5 linhas.

Depois dos campos principais, organize o relatório resumido nas categorias abaixo.

Cada categoria deve seguir exatamente este modelo:

[CATEGORIA]
Nome da categoria

[TIPO_CATEGORIA]
Use um dos tipos abaixo:
diagnostico
estrutura
ritmo
personagens
dialogos
prosa
mundo
tema
gramatica
pontos_fortes
pontos_fracos
prioridades
plano_de_melhoria
reescrita
mercado
sensibilidade
veredito
outro

[RESUMO_CATEGORIA]
Escreva um resumo curto da categoria em 1 ou 2 frases.

[CONTEUDO]
Conteúdo resumido da categoria.

[FIM_CATEGORIA]

CATEGORIAS OBRIGATÓRIAS DA VERSÃO RESUMIDA, NESTA ORDEM:
1. Diagnóstico Editorial Geral
2. Gênero, Público e Tom
3. Premissa e Promessa Narrativa
4. Estrutura e Ritmo
5. Personagens e Relações
6. Prosa, Voz e Diálogos
7. Mundo, Tema e Originalidade
8. Gramática e Revisão Técnica
9. Pontos Fortes
10. Pontos de Atenção
11. Prioridades de Reescrita
12. Plano Prático de Melhoria
13. Sugestões Concretas de Reescrita
14. Potencial de Mercado
15. Sensibilidade e Representação
16. Veredito Editorial Final

Se alguma dessas categorias não tiver informação suficiente no texto original, escreva:
Não informado.

SAÍDA FINAL:
Entregue apenas o documento padronizado.
Não escreva introdução.
Não escreva “aqui está”.
Não explique o processo.
Não use bloco de código.
Não use comentários adicionais.

Agora gere a versão resumida e padronizada do texto abaixo:

COLE AQUI O TEXTO COMPLETO DA REVISÃO EDITORIAL`;

document.addEventListener("DOMContentLoaded", () => {
  setupTabs();
  setupPromptButtons();
  setupImportButtons();
  setupEditorButtons();
  setupPreviewButtons();
  loadFromStorage(false);
  renderAll();
});

function setupTabs() {
  document.querySelectorAll(".nav-tab").forEach((button) => {
    button.addEventListener("click", () => {
      activateTab(button.dataset.tab);
    });
  });
}

function activateTab(tabName) {
  document.querySelectorAll(".nav-tab").forEach((button) => {
    button.classList.toggle("active", button.dataset.tab === tabName);
  });

  document.querySelectorAll(".tab-panel").forEach((panel) => {
    panel.classList.toggle("active", panel.id === `tab-${tabName}`);
  });

  if (tabName === "preview") {
    syncMetaFromInputs();
    renderPreview();
  }
}

function setupPromptButtons() {
  const fullButton = document.getElementById("copyFullPromptBtn");
  const summaryButton = document.getElementById("copySummaryPromptBtn");

  fullButton.addEventListener("click", () => {
    copyToClipboard(PROMPT_COMPLETO);
  });

  summaryButton.addEventListener("click", () => {
    copyToClipboard(PROMPT_RESUMIDO);
  });
}

function setupImportButtons() {
  document.getElementById("parseBtn").addEventListener("click", () => {
    const rawText = document.getElementById("rawInput").value;

    if (!rawText.trim()) {
      showToast("Cole um texto padronizado antes de processar.");
      return;
    }

    appState.document = parseStandardDocument(rawText);
    appState.selectedCategoryIndex = appState.document.categories.length ? 0 : -1;
    renderAll();
    showToast("Texto processado com sucesso.");
  });

  document.getElementById("goEditBtn").addEventListener("click", () => {
    activateTab("editar");
  });

  document.getElementById("loadExampleBtn").addEventListener("click", () => {
    document.getElementById("rawInput").value = getExampleText();
    showToast("Exemplo carregado.");
  });
}

function setupEditorButtons() {
  Object.entries(META_INPUTS).forEach(([key, inputId]) => {
    const input = document.getElementById(inputId);
    input.addEventListener("input", () => {
      appState.document.meta[key] = input.value;
    });
  });

  document.getElementById("applyCategoryBtn").addEventListener("click", () => {
    applyCategoryEditor();
  });

  document.getElementById("addCategoryBtn").addEventListener("click", () => {
    appState.document.categories.push({
      title: "Nova categoria",
      type: "texto",
      summary: "",
      content: ""
    });

    appState.selectedCategoryIndex = appState.document.categories.length - 1;
    renderAll();
    showToast("Categoria criada.");
  });

  document.getElementById("removeCategoryBtn").addEventListener("click", () => {
    const index = appState.selectedCategoryIndex;

    if (index < 0) {
      showToast("Nenhuma categoria selecionada.");
      return;
    }

    const confirmed = window.confirm("Tem certeza que deseja remover esta categoria?");

    if (!confirmed) {
      return;
    }

    appState.document.categories.splice(index, 1);
    appState.selectedCategoryIndex = appState.document.categories.length ? 0 : -1;
    renderAll();
    showToast("Categoria removida.");
  });

  document.getElementById("saveBtn").addEventListener("click", () => {
    syncMetaFromInputs();
    applyCategoryEditor(false);
    saveToStorage();
  });

  document.getElementById("clearBtn").addEventListener("click", () => {
    const confirmed = window.confirm("Tem certeza que deseja limpar tudo?");

    if (!confirmed) {
      return;
    }

    localStorage.removeItem(STORAGE_KEY);
    appState.selectedCategoryIndex = -1;
    appState.document = {
      meta: {},
      categories: []
    };

    document.getElementById("rawInput").value = "";
    renderAll();
    showToast("Tudo foi limpo.");
  });
}

function setupPreviewButtons() {
  document.getElementById("refreshPreviewBtn").addEventListener("click", () => {
    syncMetaFromInputs();
    applyCategoryEditor(false);
    renderPreview();
    showToast("Prévia atualizada.");
  });

  document.getElementById("printBtn").addEventListener("click", () => {
    syncMetaFromInputs();
    applyCategoryEditor(false);
    renderPreview();

    setTimeout(() => {
      window.print();
    }, 150);
  });
}

function parseStandardDocument(text) {
  const normalizedText = String(text || "").replace(/\r\n/g, "\n");
  const categories = parseCategories(normalizedText);
  const metaText = normalizedText.split("[CATEGORIA]")[0] || normalizedText;
  const meta = parseMetaFields(metaText);

  return {
    meta,
    categories
  };
}

function parseMetaFields(text) {
  const meta = {};
  const markerRegex = /^\[([A-Z0-9_]+)\]\s*$/gm;
  const matches = [...text.matchAll(markerRegex)];

  matches.forEach((match, index) => {
    const marker = match[1];
    const fieldKey = FIELD_MAP[marker];

    if (!fieldKey) {
      return;
    }

    const valueStart = match.index + match[0].length;
    const valueEnd = index + 1 < matches.length ? matches[index + 1].index : text.length;
    const value = text.slice(valueStart, valueEnd).trim();

    meta[fieldKey] = value;
  });

  return meta;
}

function parseCategories(text) {
  const parts = text.split("[CATEGORIA]").slice(1);

  return parts
    .map((part) => {
      const cleanPart = part.split("[FIM_CATEGORIA]")[0] || part;

      const title = readSectionValue(cleanPart, null, "[TIPO_CATEGORIA]").trim();
      const type = readSectionValue(cleanPart, "[TIPO_CATEGORIA]", "[RESUMO_CATEGORIA]").trim() || "texto";
      const summary = readSectionValue(cleanPart, "[RESUMO_CATEGORIA]", "[CONTEUDO]").trim();
      const content = readSectionValue(cleanPart, "[CONTEUDO]", null).trim();

      return {
        title: title || "Categoria sem título",
        type,
        summary,
        content
      };
    })
    .filter((category) => category.title || category.content);
}

function readSectionValue(text, startMarker, endMarker) {
  let startIndex = 0;

  if (startMarker) {
    const foundStart = text.indexOf(startMarker);

    if (foundStart === -1) {
      return "";
    }

    startIndex = foundStart + startMarker.length;
  }

  let endIndex = text.length;

  if (endMarker) {
    const foundEnd = text.indexOf(endMarker, startIndex);

    if (foundEnd !== -1) {
      endIndex = foundEnd;
    }
  }

  return text.slice(startIndex, endIndex);
}

function renderAll() {
  renderMetaInputs();
  renderCategoryList();
  renderCategoryEditor();
  renderPreview();
}

function renderMetaInputs() {
  Object.entries(META_INPUTS).forEach(([key, inputId]) => {
    const input = document.getElementById(inputId);

    if (input) {
      input.value = appState.document.meta[key] || "";
    }
  });
}

function syncMetaFromInputs() {
  Object.entries(META_INPUTS).forEach(([key, inputId]) => {
    const input = document.getElementById(inputId);

    if (input) {
      appState.document.meta[key] = input.value;
    }
  });
}

function renderCategoryList() {
  const container = document.getElementById("categoryList");
  const categories = appState.document.categories;

  if (!categories.length) {
    container.innerHTML = `<div class="empty-state small">Nenhuma categoria carregada ainda.</div>`;
    return;
  }

  container.innerHTML = categories
    .map((category, index) => {
      const activeClass = index === appState.selectedCategoryIndex ? "active" : "";

      return `
        <button class="category-item ${activeClass}" data-index="${index}">
          <span class="category-item-title">${escapeHtml(category.title)}</span>
          <span class="category-item-type">${escapeHtml(category.type || "texto")}</span>
        </button>
      `;
    })
    .join("");

  container.querySelectorAll(".category-item").forEach((button) => {
    button.addEventListener("click", () => {
      applyCategoryEditor(false);
      appState.selectedCategoryIndex = Number(button.dataset.index);
      renderCategoryList();
      renderCategoryEditor();
      activateTab("editar");
    });
  });
}

function renderCategoryEditor() {
  const index = appState.selectedCategoryIndex;
  const category = appState.document.categories[index];

  const titleDisplay = document.getElementById("selectedCategoryTitle");
  const typeDisplay = document.getElementById("selectedCategoryType");
  const titleInput = document.getElementById("categoryTitleInput");
  const typeInput = document.getElementById("categoryTypeInput");
  const summaryInput = document.getElementById("categorySummaryInput");
  const contentInput = document.getElementById("categoryContentInput");

  if (!category) {
    titleDisplay.textContent = "Nenhuma categoria selecionada";
    typeDisplay.textContent = "—";
    titleInput.value = "";
    typeInput.value = "texto";
    summaryInput.value = "";
    contentInput.value = "";
    return;
  }

  titleDisplay.textContent = category.title || "Categoria sem título";
  typeDisplay.textContent = category.type || "texto";
  titleInput.value = category.title || "";
  typeInput.value = category.type || "texto";
  summaryInput.value = category.summary || "";
  contentInput.value = category.content || "";
}

function applyCategoryEditor(showMessage = true) {
  const index = appState.selectedCategoryIndex;
  const category = appState.document.categories[index];

  if (!category) {
    return;
  }

  category.title = document.getElementById("categoryTitleInput").value.trim() || "Categoria sem título";
  category.type = document.getElementById("categoryTypeInput").value || "texto";
  category.summary = document.getElementById("categorySummaryInput").value.trim();
  category.content = document.getElementById("categoryContentInput").value.trim();

  renderCategoryList();
  renderCategoryEditor();

  if (showMessage) {
    showToast("Alterações aplicadas.");
  }
}

function renderPreview() {
  const container = document.getElementById("documentPreview");
  const { meta, categories } = appState.document;

  if (!hasDocumentContent()) {
    container.innerHTML = `<div class="empty-state">Nenhum documento carregado ainda.</div>`;
    return;
  }

  const pages = [];

  pages.push(renderCoverPage(meta));
  pages.push(renderInitialDataPage(meta));

  categories.forEach((category, index) => {
    pages.push(renderCategoryPage(category, index + 1, categories.length, meta));
  });

  container.innerHTML = pages.join("");
}

function hasDocumentContent() {
  const metaHasContent = Object.values(appState.document.meta || {}).some((value) => String(value || "").trim());
  const categoriesHaveContent = appState.document.categories.length > 0;

  return metaHasContent || categoriesHaveContent;
}

function renderCoverPage(meta) {
  const title = meta.tituloRelatorio || "Revisão Editorial";
  const subtitle = meta.subtituloRelatorio || meta.tipoRevisao || "Relatório profissional";
  const obra = meta.obra || "Obra não informada";

  return `
    <article class="page dark">
      <img class="page-ornament" src="./assets/ornamento-topo.png" alt="" />
      <div class="page-inner">
        <img class="page-logo" src="./assets/logo.png" alt="Logo" />

        <h1 class="cover-title">${escapeHtml(title)}</h1>
        <p class="cover-subtitle">${escapeHtml(subtitle)}</p>

        <div class="cover-work">
          <span>Obra analisada</span>
          <strong>${escapeHtml(obra)}</strong>
        </div>

        <div class="cover-meta">
          ${renderCoverMetaRow("Autor", meta.autor)}
          ${renderCoverMetaRow("Avaliador", meta.avaliador)}
          ${renderCoverMetaRow("Tipo", meta.tipoRevisao)}
          ${renderCoverMetaRow("Escopo", meta.escopo)}
          ${renderCoverMetaRow("Data", meta.data)}
        </div>
      </div>
    </article>
  `;
}

function renderCoverMetaRow(label, value) {
  if (!String(value || "").trim()) {
    return "";
  }

  return `
    <div class="cover-meta-row">
      <span class="cover-meta-label">${escapeHtml(label)}</span>
      <span class="cover-meta-value">${escapeHtml(value)}</span>
    </div>
  `;
}

function renderInitialDataPage(meta) {
  const rows = [
    ["Gênero literário", meta.generoLiterario],
    ["Subgêneros e elementos", meta.subgenerosElementos],
    ["Público-alvo", meta.publicoAlvo],
    ["Identidade tonal", meta.identidadeTonal],
    ["Estágio editorial", meta.estagioEditorial],
    ["Nível de maturidade", meta.nivelMaturidade],
    ["Maior força", meta.maiorForca],
    ["Maior fraqueza", meta.maiorFraqueza],
    ["Status", meta.statusDocumento]
  ].filter(([, value]) => String(value || "").trim());

  const tableRows = rows
    .map(([label, value]) => `
      <tr>
        <th>${escapeHtml(label)}</th>
        <td>${renderMarkdown(value)}</td>
      </tr>
    `)
    .join("");

  return `
    <article class="page">
      <img class="page-ornament" src="./assets/ornamento-topo.png" alt="" />
      <div class="page-inner">
        <header class="page-header">
          <span class="page-kicker">Ficha editorial</span>
          <h2 class="page-title">${escapeHtml(meta.obra || "Documento editorial")}</h2>
        </header>

        <div class="content-block">
          ${meta.vereditoResumido ? `<blockquote>${renderMarkdown(meta.vereditoResumido)}</blockquote>` : ""}

          <table>
            <tbody>
              ${tableRows || `<tr><td>Dados principais não informados.</td></tr>`}
            </tbody>
          </table>

          ${meta.promessaNarrativa ? `<h2>Promessa narrativa</h2>${renderMarkdown(meta.promessaNarrativa)}` : ""}
          ${meta.conflitoCentral ? `<h2>Conflito central</h2>${renderMarkdown(meta.conflitoCentral)}` : ""}
          ${meta.observacoesGerais ? `<h2>Observações gerais</h2>${renderMarkdown(meta.observacoesGerais)}` : ""}
        </div>

        ${renderFooter(meta, 1)}
      </div>
    </article>
  `;
}

function renderCategoryPage(category, pageIndex, totalCategories, meta) {
  const title = category.title || "Categoria sem título";
  const type = category.type || "texto";
  const summary = category.summary || "";
  const content = category.content || "";

  return `
    <article class="page category-page category-${escapeAttribute(type)}">
      <img class="page-ornament" src="./assets/ornamento-topo.png" alt="" />
      <div class="page-inner">
        <header class="page-header">
          <span class="page-kicker">${escapeHtml(type)}</span>
          <h2 class="page-title">${escapeHtml(title)}</h2>
        </header>

        ${summary ? `<div class="page-summary">${renderMarkdown(summary)}</div>` : ""}

        <div class="content-block">
          ${renderMarkdown(content)}
        </div>

        ${renderFooter(meta, pageIndex + 1, totalCategories)}
      </div>
    </article>
  `;
}

function renderFooter(meta, pageNumber) {
  const obra = meta.obra || "Feedback Editorial";

  return `
    <footer class="page-footer">
      <span>${escapeHtml(obra)}</span>
      <span>Página ${pageNumber}</span>
    </footer>
  `;
}

function renderMarkdown(text) {
  if (!String(text || "").trim()) {
    return "";
  }

  const lines = String(text).replace(/\r\n/g, "\n").split("\n");
  const html = [];
  let paragraph = [];
  let listItems = [];
  let orderedItems = [];
  let blockquote = [];
  let tableLines = [];

  const flushParagraph = () => {
    if (paragraph.length) {
      html.push(`<p>${inlineMarkdown(paragraph.join(" "))}</p>`);
      paragraph = [];
    }
  };

  const flushList = () => {
    if (listItems.length) {
      html.push(`<ul>${listItems.map((item) => `<li>${inlineMarkdown(item)}</li>`).join("")}</ul>`);
      listItems = [];
    }

    if (orderedItems.length) {
      html.push(`<ol>${orderedItems.map((item) => `<li>${inlineMarkdown(item)}</li>`).join("")}</ol>`);
      orderedItems = [];
    }
  };

  const flushBlockquote = () => {
    if (blockquote.length) {
      html.push(`<blockquote>${inlineMarkdown(blockquote.join("<br>"))}</blockquote>`);
      blockquote = [];
    }
  };

  const flushTable = () => {
    if (!tableLines.length) {
      return;
    }

    html.push(markdownTableToHtml(tableLines));
    tableLines = [];
  };

  lines.forEach((rawLine) => {
    const line = rawLine.trim();

    if (!line) {
      flushParagraph();
      flushList();
      flushBlockquote();
      flushTable();
      return;
    }

    if (isTableLine(line)) {
      flushParagraph();
      flushList();
      flushBlockquote();
      tableLines.push(line);
      return;
    }

    flushTable();

    if (line.startsWith("### ")) {
      flushParagraph();
      flushList();
      flushBlockquote();
      html.push(`<h3>${inlineMarkdown(line.replace(/^###\s+/, ""))}</h3>`);
      return;
    }

    if (line.startsWith("## ")) {
      flushParagraph();
      flushList();
      flushBlockquote();
      html.push(`<h2>${inlineMarkdown(line.replace(/^##\s+/, ""))}</h2>`);
      return;
    }

    if (line.startsWith("# ")) {
      flushParagraph();
      flushList();
      flushBlockquote();
      html.push(`<h1>${inlineMarkdown(line.replace(/^#\s+/, ""))}</h1>`);
      return;
    }

    if (line.startsWith(">")) {
      flushParagraph();
      flushList();
      blockquote.push(line.replace(/^>\s?/, ""));
      return;
    }

    if (/^[-*]\s+/.test(line)) {
      flushParagraph();
      flushBlockquote();
      listItems.push(line.replace(/^[-*]\s+/, ""));
      return;
    }

    if (/^\d+\.\s+/.test(line)) {
      flushParagraph();
      flushBlockquote();
      orderedItems.push(line.replace(/^\d+\.\s+/, ""));
      return;
    }

    paragraph.push(line);
  });

  flushParagraph();
  flushList();
  flushBlockquote();
  flushTable();

  return html.join("");
}

function isTableLine(line) {
  return line.startsWith("|") && line.endsWith("|");
}

function markdownTableToHtml(lines) {
  const filtered = lines.filter((line) => !/^\|\s*-+/.test(line.replace(/\s/g, "")));

  if (!filtered.length) {
    return "";
  }

  const rows = filtered.map((line) => {
    return line
      .slice(1, -1)
      .split("|")
      .map((cell) => cell.trim());
  });

  const head = rows[0] || [];
  const body = rows.slice(1);

  return `
    <table>
      <thead>
        <tr>${head.map((cell) => `<th>${inlineMarkdown(cell)}</th>`).join("")}</tr>
      </thead>
      <tbody>
        ${body.map((row) => `<tr>${row.map((cell) => `<td>${inlineMarkdown(cell)}</td>`).join("")}</tr>`).join("")}
      </tbody>
    </table>
  `;
}

function inlineMarkdown(text) {
  let safe = escapeHtml(text);

  safe = safe.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");
  safe = safe.replace(/\*(.*?)\*/g, "<em>$1</em>");
  safe = safe.replace(/`([^`]+)`/g, "<code>$1</code>");

  return safe;
}

function escapeHtml(value) {
  return String(value || "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function escapeAttribute(value) {
  return String(value || "")
    .toLowerCase()
    .replace(/[^a-z0-9_-]/g, "-");
}

async function copyToClipboard(text) {
  try {
    await navigator.clipboard.writeText(text);
    showToast("Prompt copiado.");
  } catch (error) {
    showToast("Não foi possível copiar automaticamente. Selecione e copie manualmente.");
  }
}

function saveToStorage() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(appState.document));
  showToast("Documento salvo no navegador.");
}

function loadFromStorage(showMessage = true) {
  const saved = localStorage.getItem(STORAGE_KEY);

  if (!saved) {
    return;
  }

  try {
    appState.document = JSON.parse(saved);
    appState.selectedCategoryIndex = appState.document.categories?.length ? 0 : -1;

    if (showMessage) {
      showToast("Documento carregado.");
    }
  } catch (error) {
    localStorage.removeItem(STORAGE_KEY);
  }
}

function showToast(message) {
  const toast = document.getElementById("toast");

  toast.textContent = message;
  toast.classList.add("show");

  window.clearTimeout(showToast.timeout);

  showToast.timeout = window.setTimeout(() => {
    toast.classList.remove("show");
  }, 2600);
}

function getExampleText() {
  return `[TITULO_RELATORIO]
Revisão Editorial Profissional

[SUBTITULO_RELATORIO]
Relatório completo de avaliação literária

[OBRA]
O Amado da Luzz

[AUTOR]
Não informado

[AVALIADOR]
Não informado

[TIPO_REVISAO]
Revisão Editorial Profissional

[ESCOPO]
Primeiro volume completo, do Prólogo ao Epílogo

[GENERO_LITERARIO]
Fantasia épica de aventura

[SUBGENEROS_E_ELEMENTOS]
- alta fantasia
- fantasia sombria
- jornada do escolhido
- found family
- fantasia de guerra
- fantasia de profecia

[PUBLICO_ALVO]
Leitores de fantasia jovem/adulta serializada.

[IDENTIDADE_TONAL]
Épica, trágica, redentora e dramática.

[PROMESSA_NARRATIVA]
Um príncipe alto-elfo sobrevivente de um genocídio descobre que carrega uma linhagem sagrada, uma profecia e uma função decisiva na luta contra uma sombra primordial.

[CONFLITO_CENTRAL]
O conflito opera em três camadas: externo, interno e relacional.

[ESTAGIO_EDITORIAL]
Intermediário promissor.

[NIVEL_DE_MATURIDADE]
Rascunho intermediário com estrutura já desenhada.

[MAIOR_FORCA]
Vocação épica combinada com found family.

[MAIOR_FRAQUEZA]
Excesso de intensidade sem variação suficiente.

[VEREDITO_RESUMIDO]
O manuscrito tem estrutura, ambição e coração, mas ainda precisa de reescrita profunda para amadurecer cena, voz, tensão, diálogos e subtexto.

[STATUS_DO_DOCUMENTO]
Necessita reescrita estrutural e refinamento literário.

[DATA]
Não informado.

[OBSERVACOES_GERAIS]
Documento de exemplo para testar a plataforma.

[CATEGORIA]
Diagnóstico Editorial Geral

[TIPO_CATEGORIA]
diagnostico

[RESUMO_CATEGORIA]
O manuscrito apresenta uma fantasia épica promissora, mas ainda dependente de amadurecimento estrutural e estilístico.

[CONTEUDO]
O manuscrito tem uma ambição clara: quer ser uma fantasia épica de grande escala, com tom mítico, personagens marcados por tragédias pessoais e um mundo ameaçado por uma força primordial.

A força literária do texto aparece principalmente na energia da jornada. O leitor entende que Arion saiu de um lugar de destruição absoluta e está sendo empurrado para um destino que não pediu.

## Pontos principais

- Estrutura épica reconhecível.
- Protagonista com trauma forte.
- Grupo de personagens com potencial emocional.
- Excesso de exposição direta.
- Necessidade de mais cenas vividas pelo leitor.

[FIM_CATEGORIA]

[CATEGORIA]
Desenvolvimento de Personagens

[TIPO_CATEGORIA]
personagens

[RESUMO_CATEGORIA]
Os personagens têm funções claras, mas precisam de mais individualidade, contradição e voz própria.

[CONTEUDO]
| Personagem | Função narrativa | Força | Fragilidade | Recomendação |
|---|---|---|---|---|
| Arion | Protagonista e eixo do grupo | Trauma fundador forte | Risco de escolhido genérico | Dar erros morais e consequências |
| Thalia | Aliada elemental | Poder visual e trauma forte | Pode ser reduzida ao cuidado com Arion | Dar objetivos próprios |
| Bakrium | Antagonista ambíguo | Carisma e tensão moral | Redenção pode parecer rápida | Construir confiança lentamente |

[FIM_CATEGORIA]

[CATEGORIA]
Veredito Editorial Final

[TIPO_CATEGORIA]
veredito

[RESUMO_CATEGORIA]
A obra possui poder épico e comercial, mas ainda não está pronta para publicação profissional.

[CONTEUDO]
## O manuscrito está pronto para publicação?

Ainda não está pronto para publicação profissional. Está pronto como base forte de uma saga em desenvolvimento, mas precisa de reescrita estrutural, amadurecimento de cena, revisão de prosa e controle de ritmo.

## Maior força

A combinação entre fantasia épica e reconstrução emocional por meio de vínculos.

## Maior perigo

Transformar intensidade em substituto de profundidade.

## Parecer final

Existe uma saga aqui. Existe um protagonista. Existe um antagonista promissor. Existe uma mitologia com potencial. A próxima etapa não é diminuir a fantasia, nem tirar a grandiosidade. É dar sustentação a ela.

[FIM_CATEGORIA]`;
}