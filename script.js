const STORAGE_KEY = "feedback_editorial_documento_v8";

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
  OBSERVACOES_GERAIS: "observacoesGerais",
  TIPO_DOCUMENTO: "tipoDocumento",
  NOME_PROJETO: "nomeProjeto",
  RESPONSAVEL: "responsavel",
  EMAIL_PROJETO: "emailProjeto",
  SITE_PROJETO: "siteProjeto",
  DATA_REVISAO: "dataRevisao",
  VERSAO_DOCUMENTO: "versaoDocumento",
  CONFIDENCIALIDADE: "confidencialidade"
};

const META_INPUTS = {
  tipoDocumento: "fieldTipoDocumento",
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
  statusDocumento: "fieldStatusDocumento",
  nomeProjeto: "fieldNomeProjeto",
  responsavel: "fieldResponsavel",
  emailProjeto: "fieldEmailProjeto",
  siteProjeto: "fieldSiteProjeto",
  dataRevisao: "fieldDataRevisao",
  versaoDocumento: "fieldVersaoDocumento",
  confidencialidade: "fieldConfidencialidade"
};

const REQUIRED_META = [
  "OBRA",
  "GENERO_LITERARIO",
  "PUBLICO_ALVO",
  "IDENTIDADE_TONAL",
  "VEREDITO_RESUMIDO"
];

const PROMPT_COMPLETO = `Você é um organizador técnico de relatórios editoriais profissionais.

Sua tarefa é pegar o texto de revisão editorial que vou enviar e reorganizá-lo em um padrão fixo, limpo, completo e estruturado para ser usado em uma plataforma geradora de documentos em PDF.

REGRAS IMPORTANTES:
1. Não faça uma nova revisão.
2. Não resuma.
3. Não suavize críticas.
4. Não invente informações.
5. Não remova conteúdo importante.
6. Preserve tabelas em Markdown.
7. Preserve listas.
8. Preserve exemplos de reescrita.
9. Preserve o tom técnico editorial.
10. Entregue apenas o documento padronizado, sem comentários antes ou depois.

Use exatamente este formato:

[TIPO_DOCUMENTO]
revisao_completa

[TITULO_RELATORIO]
Relatório de Revisão Editorial

[SUBTITULO_RELATORIO]
Revisão editorial extremamente detalhada

[NOME_PROJETO]
Administração do Projeto

[RESPONSAVEL]
Administração do Projeto

[EMAIL_PROJETO]
Não informado

[SITE_PROJETO]
Não informado

[DATA_REVISAO]
Não informado

[VERSAO_DOCUMENTO]
Versão 1.0

[CONFIDENCIALIDADE]
Uso restrito ao autor e à equipe editorial

[OBRA]
Nome da obra

[AUTOR]
Nome do autor ou Não informado

[AVALIADOR]
Nome do avaliador ou Não informado

[TIPO_REVISAO]
Tipo de revisão

[ESCOPO]
Escopo do material analisado

[GENERO_LITERARIO]
Gênero literário aparente

[SUBGENEROS_E_ELEMENTOS]
Lista de subgêneros e elementos

[PUBLICO_ALVO]
Público-alvo provável

[IDENTIDADE_TONAL]
Identidade tonal

[PROMESSA_NARRATIVA]
Promessa narrativa central

[CONFLITO_CENTRAL]
Conflito central

[ESTAGIO_EDITORIAL]
Estágio editorial

[NIVEL_DE_MATURIDADE]
Nível de maturidade

[MAIOR_FORCA]
Maior força

[MAIOR_FRAQUEZA]
Maior fraqueza

[VEREDITO_RESUMIDO]
Resumo breve do parecer final

[STATUS_DO_DOCUMENTO]
Status do documento

[DATA]
Data ou Não informado

[OBSERVACOES_GERAIS]
Observações gerais

Depois organize todo o restante em categorias:

[CATEGORIA]
Nome da categoria

[TIPO_CATEGORIA]
texto, diagnostico, estrutura, ritmo, cenas, personagens, dialogos, prosa, mundo, tema, gramatica, reescrita, pontos_fortes, pontos_fracos, prioridades, plano_de_melhoria, mercado, sensibilidade, veredito, lista, tabela ou outro

[RESUMO_CATEGORIA]
Resumo curto da categoria.

[CONTEUDO]
Conteúdo completo da categoria.

[FIM_CATEGORIA]

Categorias recomendadas:
Diagnóstico Editorial Geral; Premissa e Promessa Narrativa; Estrutura Narrativa; Ritmo; Engenharia de Cenas; Desenvolvimento de Personagens; Relações; Diálogos; Voz Narrativa; Prosa e Estilo; Clareza; Show vs Tell; Subtexto; Construção Emocional; Tensão Narrativa; Consistência Interna; Worldbuilding; Tema e Simbolismo; Originalidade; Gramática e Revisão Técnica; Edição Linha a Linha; Experiência do Leitor; Potencial de Mercado; Sensibilidade e Representação; Pontos Fortes; Pontos de Atenção; Prioridades de Reescrita; Plano Prático de Melhoria; Sugestões Concretas de Reescrita; Veredito Editorial Final.

Agora organize o texto abaixo:

COLE AQUI O TEXTO COMPLETO DA REVISÃO EDITORIAL`;

const PROMPT_RESUMIDO = `Você é um organizador técnico de relatórios editoriais profissionais.

Pegue a revisão editorial que vou enviar e gere uma versão resumida, profissional e estruturada para PDF.

REGRAS:
1. Não invente informações.
2. Não mude o diagnóstico central.
3. Não transforme críticas em elogios.
4. Reduza para cerca de 20% a 35% do original.
5. Preserve os pontos realmente importantes.
6. Entregue apenas o documento padronizado.

Use exatamente este padrão:

[TIPO_DOCUMENTO]
revisao_resumida

[TITULO_RELATORIO]
Relatório de Revisão Editorial

[SUBTITULO_RELATORIO]
Versão resumida

[NOME_PROJETO]
Administração do Projeto

[RESPONSAVEL]
Administração do Projeto

[EMAIL_PROJETO]
Não informado

[SITE_PROJETO]
Não informado

[DATA_REVISAO]
Não informado

[VERSAO_DOCUMENTO]
Versão 1.0

[CONFIDENCIALIDADE]
Uso restrito ao autor e à equipe editorial

[OBRA]
Nome da obra

[AUTOR]
Nome do autor ou Não informado

[AVALIADOR]
Nome do avaliador ou Não informado

[TIPO_REVISAO]
Tipo de revisão

[ESCOPO]
Escopo do material analisado

[GENERO_LITERARIO]
Gênero literário aparente

[SUBGENEROS_E_ELEMENTOS]
Lista de subgêneros e elementos

[PUBLICO_ALVO]
Público-alvo provável

[IDENTIDADE_TONAL]
Identidade tonal

[PROMESSA_NARRATIVA]
Promessa narrativa central

[CONFLITO_CENTRAL]
Conflito central

[ESTAGIO_EDITORIAL]
Estágio editorial

[NIVEL_DE_MATURIDADE]
Nível de maturidade

[MAIOR_FORCA]
Maior força

[MAIOR_FRAQUEZA]
Maior fraqueza

[VEREDITO_RESUMIDO]
Resumo breve do parecer final

[STATUS_DO_DOCUMENTO]
Status do documento

[DATA]
Data ou Não informado

[OBSERVACOES_GERAIS]
Observações gerais

Depois organize nas categorias:
Diagnóstico Editorial Geral; Gênero, Público e Tom; Premissa e Promessa Narrativa; Estrutura e Ritmo; Personagens e Relações; Prosa, Voz e Diálogos; Mundo, Tema e Originalidade; Gramática e Revisão Técnica; Pontos Fortes; Pontos de Atenção; Prioridades de Reescrita; Plano Prático de Melhoria; Potencial de Mercado; Veredito Editorial Final.

Cada categoria deve seguir:

[CATEGORIA]
Nome da categoria

[TIPO_CATEGORIA]
tipo

[RESUMO_CATEGORIA]
Resumo curto.

[CONTEUDO]
Conteúdo resumido.

[FIM_CATEGORIA]

Agora organize o texto abaixo:

COLE AQUI O TEXTO COMPLETO DA REVISÃO EDITORIAL`;

document.addEventListener("DOMContentLoaded", () => {
  setupTabs();
  setupButtons();
  loadFromStorage();
  applyDefaults();
  renderAll();
});

function setupTabs() {
  document.querySelectorAll(".nav-btn").forEach((button) => {
    button.addEventListener("click", () => activateTab(button.dataset.tab));
  });
}

function setupButtons() {
  document.getElementById("copyFullPromptBtn").addEventListener("click", () => copyToClipboard(PROMPT_COMPLETO));
  document.getElementById("copySummaryPromptBtn").addEventListener("click", () => copyToClipboard(PROMPT_RESUMIDO));

  document.getElementById("loadExampleBtn").addEventListener("click", () => {
    document.getElementById("rawInput").value = getExampleText();
    runValidation();
    showToast("Exemplo carregado.");
  });

  document.getElementById("validateBtn").addEventListener("click", runValidation);

  document.getElementById("parseBtn").addEventListener("click", () => {
    const text = document.getElementById("rawInput").value.trim();

    if (!text) {
      showToast("Cole o texto padronizado primeiro.");
      return;
    }

    const validation = validateStandardText(text);
    renderValidation(validation);

    if (validation.errors.length) {
      showToast("O texto tem erros no padrão. Veja a validação.");
      return;
    }

    appState.document = parseStandardDocument(text);
    applyDefaults();
    appState.selectedCategoryIndex = appState.document.categories.length ? 0 : -1;

    renderAll();
    activateTab("editar");
    showToast("Texto processado com sucesso.");
  });

  document.getElementById("goEditBtn").addEventListener("click", () => activateTab("editar"));

  Object.entries(META_INPUTS).forEach(([key, id]) => {
    const input = document.getElementById(id);
    input.addEventListener("input", (event) => {
      appState.document.meta[key] = event.target.value;
    });
  });

  document.getElementById("applyCategoryBtn").addEventListener("click", () => {
    applyCategoryEditor();
    renderAll();
    showToast("Categoria atualizada.");
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
    if (appState.selectedCategoryIndex < 0) {
      showToast("Nenhuma categoria selecionada.");
      return;
    }

    if (!window.confirm("Remover esta categoria?")) return;

    appState.document.categories.splice(appState.selectedCategoryIndex, 1);
    appState.selectedCategoryIndex = appState.document.categories.length ? 0 : -1;

    renderAll();
    showToast("Categoria removida.");
  });

  document.getElementById("saveBtn").addEventListener("click", () => {
    syncAllEditors();
    localStorage.setItem(STORAGE_KEY, JSON.stringify(appState.document));
    showToast("Documento salvo no navegador.");
  });

  document.getElementById("exportJsonBtn").addEventListener("click", exportJson);

  document.getElementById("importJsonBtn").addEventListener("click", () => {
    document.getElementById("importJsonInput").click();
  });

  document.getElementById("importJsonInput").addEventListener("change", importJson);

  document.getElementById("clearBtn").addEventListener("click", () => {
    if (!window.confirm("Limpar tudo?")) return;

    localStorage.removeItem(STORAGE_KEY);
    appState.document = { meta: {}, categories: [] };
    appState.selectedCategoryIndex = -1;
    document.getElementById("rawInput").value = "";
    document.getElementById("validationBox").classList.add("hidden");

    applyDefaults();
    renderAll();
    showToast("Tudo limpo.");
  });

  document.getElementById("refreshPreviewBtn").addEventListener("click", () => {
    syncAllEditors();
    renderPreview();
    showToast("Prévia atualizada.");
  });

  document.getElementById("generatePdfBtn").addEventListener("click", generatePdf);
}

function activateTab(tabName) {
  document.querySelectorAll(".nav-btn").forEach((button) => {
    button.classList.toggle("active", button.dataset.tab === tabName);
  });

  document.querySelectorAll(".tab-panel").forEach((panel) => {
    panel.classList.toggle("active", panel.id === `tab-${tabName}`);
  });

  if (tabName === "preview") {
    syncAllEditors();
    renderPreview();
  }
}

function applyDefaults() {
  const meta = appState.document.meta;

  meta.tipoDocumento ||= "revisao_completa";
  meta.tituloRelatorio ||= getDocTypeConfig(meta.tipoDocumento).title;
  meta.subtituloRelatorio ||= getDocTypeConfig(meta.tipoDocumento).subtitle;
  meta.nomeProjeto ||= "Administração do Projeto";
  meta.responsavel ||= meta.avaliador || "Administração do Projeto";
  meta.emailProjeto ||= "Não informado";
  meta.siteProjeto ||= "Não informado";
  meta.dataRevisao ||= meta.data || "Não informado";
  meta.versaoDocumento ||= "Versão 1.0";
  meta.confidencialidade ||= "Uso restrito ao autor e à equipe editorial";
}

function getDocTypeConfig(type) {
  const configs = {
    revisao_completa: {
      title: "Relatório de Revisão Editorial",
      subtitle: "Revisão editorial extremamente detalhada",
      label: "Revisão completa"
    },
    revisao_resumida: {
      title: "Relatório de Revisão Editorial",
      subtitle: "Versão resumida",
      label: "Revisão resumida"
    },
    parecer_editorial: {
      title: "Parecer Editorial",
      subtitle: "Análise técnica e parecer de desenvolvimento literário",
      label: "Parecer editorial"
    },
    ficha_tecnica: {
      title: "Ficha Técnica Editorial",
      subtitle: "Mapeamento técnico do manuscrito",
      label: "Ficha técnica"
    },
    leitura_critica: {
      title: "Relatório de Leitura Crítica",
      subtitle: "Análise crítica de leitura e desenvolvimento narrativo",
      label: "Leitura crítica"
    }
  };

  return configs[type] || configs.revisao_completa;
}

/* VALIDATION */

function runValidation() {
  const text = document.getElementById("rawInput").value.trim();

  if (!text) {
    showToast("Cole o texto primeiro.");
    return;
  }

  const validation = validateStandardText(text);
  renderValidation(validation);

  if (validation.errors.length) {
    showToast("Validação concluída com erros.");
  } else if (validation.warnings.length) {
    showToast("Validação concluída com avisos.");
  } else {
    showToast("Texto validado com sucesso.");
  }
}

function validateStandardText(text) {
  const errors = [];
  const warnings = [];
  const normalized = text.replace(/\r\n/g, "\n");

  REQUIRED_META.forEach((marker) => {
    if (!normalized.includes(`[${marker}]`)) {
      errors.push(`Campo obrigatório ausente: [${marker}]`);
    }
  });

  if (!normalized.includes("[CATEGORIA]")) {
    errors.push("Nenhuma categoria encontrada. Use pelo menos um bloco [CATEGORIA].");
  }

  if (normalized.includes("[CATEGORIA]")) {
    const blocks = normalized.split("[CATEGORIA]").slice(1);

    blocks.forEach((block, index) => {
      const number = index + 1;

      if (!block.includes("[TIPO_CATEGORIA]")) {
        errors.push(`Categoria ${number}: faltou [TIPO_CATEGORIA].`);
      }

      if (!block.includes("[RESUMO_CATEGORIA]")) {
        warnings.push(`Categoria ${number}: faltou [RESUMO_CATEGORIA].`);
      }

      if (!block.includes("[CONTEUDO]")) {
        errors.push(`Categoria ${number}: faltou [CONTEUDO].`);
      }

      if (!block.includes("[FIM_CATEGORIA]")) {
        errors.push(`Categoria ${number}: faltou [FIM_CATEGORIA].`);
      }
    });
  }

  if (!normalized.includes("[VEREDITO_RESUMIDO]")) {
    warnings.push("Campo recomendado ausente: [VEREDITO_RESUMIDO].");
  }

  if (!normalized.includes("[TIPO_DOCUMENTO]")) {
    warnings.push("Campo recomendado ausente: [TIPO_DOCUMENTO]. A plataforma usará revisão completa.");
  }

  return { errors, warnings };
}

function renderValidation(validation) {
  const box = document.getElementById("validationBox");
  box.className = "validation-box";

  if (validation.errors.length) {
    box.classList.add("error");
    box.innerHTML = `
      <h3>Erros encontrados</h3>
      <ul>${validation.errors.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>
      ${validation.warnings.length ? `<h3>Avisos</h3><ul>${validation.warnings.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>` : ""}
    `;
    return;
  }

  if (validation.warnings.length) {
    box.classList.add("warning");
    box.innerHTML = `
      <h3>Texto válido, com avisos</h3>
      <ul>${validation.warnings.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>
    `;
    return;
  }

  box.classList.add("success");
  box.innerHTML = `
    <h3>Texto válido</h3>
    <p>Todos os campos principais foram reconhecidos. O texto pode ser processado.</p>
  `;
}

/* PARSE */

function parseStandardDocument(text) {
  const normalized = text.replace(/\r\n/g, "\n");
  const metaPart = normalized.split("[CATEGORIA]")[0] || "";

  return {
    meta: parseMeta(metaPart),
    categories: parseCategories(normalized)
  };
}

function parseMeta(text) {
  const meta = {};
  const regex = /^\[([A-Z0-9_]+)\]\s*$/gm;
  const matches = [...text.matchAll(regex)];

  matches.forEach((match, index) => {
    const marker = match[1];
    const key = FIELD_MAP[marker];

    if (!key) return;

    const start = match.index + match[0].length;
    const end = index + 1 < matches.length ? matches[index + 1].index : text.length;

    meta[key] = text.slice(start, end).trim();
  });

  return meta;
}

function parseCategories(text) {
  return text
    .split("[CATEGORIA]")
    .slice(1)
    .map((block) => {
      const clean = block.split("[FIM_CATEGORIA]")[0];

      return {
        title: readBetween(clean, null, "[TIPO_CATEGORIA]").trim() || "Categoria sem título",
        type: readBetween(clean, "[TIPO_CATEGORIA]", "[RESUMO_CATEGORIA]").trim() || "texto",
        summary: readBetween(clean, "[RESUMO_CATEGORIA]", "[CONTEUDO]").trim(),
        content: readBetween(clean, "[CONTEUDO]", null).trim()
      };
    })
    .filter((category) => category.title || category.content);
}

function readBetween(text, startMarker, endMarker) {
  let start = 0;

  if (startMarker) {
    const foundStart = text.indexOf(startMarker);
    if (foundStart === -1) return "";
    start = foundStart + startMarker.length;
  }

  let end = text.length;

  if (endMarker) {
    const foundEnd = text.indexOf(endMarker, start);
    if (foundEnd !== -1) end = foundEnd;
  }

  return text.slice(start, end);
}

/* RENDER UI */

function renderAll() {
  applyDefaults();
  renderMetaInputs();
  renderCategoryList();
  renderCategoryEditor();
  renderPreview();
}

function renderMetaInputs() {
  Object.entries(META_INPUTS).forEach(([key, id]) => {
    const input = document.getElementById(id);
    input.value = appState.document.meta[key] || "";
  });
}

function renderCategoryList() {
  const container = document.getElementById("categoryList");
  const categories = appState.document.categories;

  if (!categories.length) {
    container.innerHTML = `<p class="empty-note">Nenhuma categoria carregada.</p>`;
    return;
  }

  container.innerHTML = categories
    .map((category, index) => {
      const active = index === appState.selectedCategoryIndex ? "active" : "";

      return `
        <button class="category-item ${active}" data-index="${index}">
          <strong>${escapeHtml(category.title)}</strong>
          <span>${escapeHtml(category.type || "texto")}</span>
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
  const category = appState.document.categories[appState.selectedCategoryIndex];

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

  titleDisplay.textContent = category.title || "Categoria";
  typeDisplay.textContent = category.type || "texto";
  titleInput.value = category.title || "";
  typeInput.value = category.type || "texto";
  summaryInput.value = category.summary || "";
  contentInput.value = category.content || "";
}

function applyCategoryEditor(show = true) {
  const category = appState.document.categories[appState.selectedCategoryIndex];
  if (!category) return;

  category.title = document.getElementById("categoryTitleInput").value.trim() || "Categoria sem título";
  category.type = document.getElementById("categoryTypeInput").value || "texto";
  category.summary = document.getElementById("categorySummaryInput").value.trim();
  category.content = document.getElementById("categoryContentInput").value.trim();

  if (show) showToast("Alterações aplicadas.");
}

function syncAllEditors() {
  Object.entries(META_INPUTS).forEach(([key, id]) => {
    appState.document.meta[key] = document.getElementById(id).value.trim();
  });

  applyCategoryEditor(false);
  applyDefaults();
}

/* PREVIEW */

function renderPreview() {
  const container = document.getElementById("documentPreview");

  if (!hasContent()) {
    container.innerHTML = `<article class="ui-card">Nenhum documento carregado ainda.</article>`;
    return;
  }

  const meta = appState.document.meta;
  const pages = [];
  let pageNumber = 1;

  pages.push(renderCover(meta));
  pageNumber++;

  pages.push(renderFicha(meta, pageNumber));
  pageNumber++;

  appState.document.categories.forEach((category, index) => {
    const result = paginateCategory(category, pageNumber, index + 1);
    pages.push(...result.pages);
    pageNumber += result.count;
  });

  container.innerHTML = pages.join("");
}

function hasContent() {
  return Object.values(appState.document.meta || {}).some((value) => String(value || "").trim()) ||
    appState.document.categories.length > 0;
}

function renderCover(meta) {
  const config = getDocTypeConfig(meta.tipoDocumento);
  const title = splitCoverTitle(meta.tituloRelatorio || config.title);

  return `
    <section class="a4-page cover-page">
      <div class="cover-frame"></div>

      <div class="cover-content">
        <div class="cover-top">
          <img class="cover-logo" src="./assets/logo.png" alt="Logo" />
          <div class="cover-brand">${escapeHtml(meta.nomeProjeto || "Administração do Projeto")}</div>
        </div>

        <div class="cover-main">
          <div class="cover-kicker">${escapeHtml(config.label)}</div>

          <h1 class="cover-title">
            ${escapeHtml(title.first)}
            ${title.second ? `<br><strong>${escapeHtml(title.second)}</strong>` : ""}
          </h1>

          <p class="cover-subtitle">${escapeHtml(meta.subtituloRelatorio || config.subtitle)}</p>

          <div class="cover-work">
            <span>Obra analisada</span>
            <strong>${escapeHtml(meta.obra || "Obra não informada")}</strong>
          </div>
        </div>

        <div class="cover-meta">
          ${coverMeta("Autor", meta.autor)}
          ${coverMeta("Avaliador", meta.avaliador)}
          ${coverMeta("Escopo", meta.escopo)}
          ${coverMeta("Versão", meta.versaoDocumento)}
          ${coverMeta("Data", meta.dataRevisao)}
          ${coverMeta("Status", meta.statusDocumento)}
        </div>
      </div>
    </section>
  `;
}

function splitCoverTitle(title) {
  const clean = String(title || "").trim();

  if (clean.toLowerCase().includes("revisão editorial")) {
    return {
      first: "Relatório de",
      second: "Revisão Editorial"
    };
  }

  const words = clean.split(" ");
  const half = Math.ceil(words.length / 2);

  return {
    first: words.slice(0, half).join(" "),
    second: words.slice(half).join(" ")
  };
}

function coverMeta(label, value) {
  if (!String(value || "").trim()) return "";

  return `
    <div class="cover-meta-item">
      <span>${escapeHtml(label)}</span>
      <strong>${escapeHtml(value)}</strong>
    </div>
  `;
}

function renderFicha(meta, pageNumber) {
  const rows = [
    ["Tipo de documento", getDocTypeConfig(meta.tipoDocumento).label],
    ["Projeto", meta.nomeProjeto],
    ["Responsável", meta.responsavel],
    ["E-mail", meta.emailProjeto],
    ["Site", meta.siteProjeto],
    ["Data da revisão", meta.dataRevisao],
    ["Versão", meta.versaoDocumento],
    ["Confidencialidade", meta.confidencialidade],
    ["Gênero literário", meta.generoLiterario],
    ["Subgêneros e elementos", meta.subgenerosElementos],
    ["Público-alvo", meta.publicoAlvo],
    ["Identidade tonal", meta.identidadeTonal],
    ["Promessa narrativa", meta.promessaNarrativa],
    ["Conflito central", meta.conflitoCentral],
    ["Estágio editorial", meta.estagioEditorial],
    ["Nível de maturidade", meta.nivelMaturidade],
    ["Maior força", meta.maiorForca],
    ["Maior fraqueza", meta.maiorFraqueza],
    ["Status", meta.statusDocumento]
  ].filter(([, value]) => String(value || "").trim());

  const scopeItems = [
    "Ortografia, acentuação e pontuação",
    "Gramática e concordância",
    "Coerência e coesão textual",
    "Estilo, clareza e adequação de linguagem",
    "Padronização de elementos editoriais",
    "Citações, notas e referências",
    "Tabelas, quadros, figuras e legendas",
    "Numeração, títulos e hierarquia de tópicos"
  ];

  return `
    <section class="a4-page">
      ${renderHeader(meta, "Ficha Editorial", pageNumber)}

      <main class="doc-body">
        <div class="doc-content-area">
          <div class="doc-section-title">
            <span class="kicker">Ficha Editorial</span>
            <h2>${escapeHtml(meta.obra || "Documento Editorial")}</h2>
            <div class="title-rule"></div>
          </div>

          <div class="ficha-document">
            <div class="ficha-intro">
              ${renderMarkdown(meta.vereditoResumido || "Este relatório apresenta a avaliação editorial do material, contemplando aspectos de estrutura, linguagem, coerência, ritmo, desenvolvimento narrativo e experiência de leitura.")}
            </div>

            <table class="info-table">
              <tbody>
                ${rows.map(([label, value]) => `
                  <tr>
                    <th>${escapeHtml(label)}</th>
                    <td>${renderMarkdown(value)}</td>
                  </tr>
                `).join("")}

                <tr>
                  <th>Escopo da revisão</th>
                  <td>
                    <ul class="scope-list">
                      ${scopeItems.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}
                    </ul>
                  </td>
                </tr>
              </tbody>
            </table>

            <div class="editorial-quote">
              “Excelência editorial não é apenas corrigir palavras. É potencializar ideias.”
            </div>
          </div>
        </div>
      </main>

      ${renderFooter(meta)}
    </section>
  `;
}

/* PAGINATION */

function paginateCategory(category, startPageNumber, categoryIndex) {
  const rawBlocks = markdownToBlocks(category.content || "");
  const blocks = groupBlocksForPagination(rawBlocks);
  const pages = [];
  let current = [];
  let pageNumber = startPageNumber;

  if (!blocks.length) {
    pages.push(renderCategoryPage(category, categoryIndex, pageNumber, "", 1, 1));
    return { pages, count: 1 };
  }

  blocks.forEach((block) => {
    const test = [...current, block].join("");

    if (current.length && !fitsPage(category, categoryIndex, test)) {
      pages.push(current.join(""));
      current = [block];
    } else {
      current.push(block);
    }
  });

  if (current.length) pages.push(current.join(""));

  const total = pages.length;

  return {
    pages: pages.map((html, index) =>
      renderCategoryPage(category, categoryIndex, pageNumber + index, html, index + 1, total)
    ),
    count: total
  };
}

function groupBlocksForPagination(blocks) {
  const grouped = [];

  for (let i = 0; i < blocks.length; i++) {
    const block = blocks[i];
    const next = blocks[i + 1] || "";

    const isHeading = /^<h[1-3]/.test(block);
    const nextExists = Boolean(next);

    if (isHeading && nextExists) {
      grouped.push(block + next);
      i++;
    } else {
      grouped.push(block);
    }
  }

  return grouped;
}

function fitsPage(category, categoryIndex, htmlContent) {
  const zone = getMeasureZone();

  zone.innerHTML = renderCategoryPage(category, categoryIndex, 999, htmlContent, 1, 1, true);

  const area = zone.querySelector(".doc-content-area");
  return area ? area.scrollHeight <= area.clientHeight : true;
}

function getMeasureZone() {
  let zone = document.getElementById("measureZone");

  if (!zone) {
    zone = document.createElement("div");
    zone.id = "measureZone";
    zone.className = "measure-zone";
    document.body.appendChild(zone);
  }

  return zone;
}

function renderCategoryPage(category, categoryIndex, pageNumber, htmlContent, partNumber, totalParts, measure = false) {
  const isContinuation = partNumber > 1;
  const label = getCategoryLabel(category.type);
  const number = String(categoryIndex).padStart(2, "0");

  if ((category.type || "").toLowerCase() === "veredito" && !isContinuation) {
    return renderFinalPage(category, categoryIndex, pageNumber, htmlContent);
  }

  return `
    <section class="a4-page">
      ${renderHeader(appState.document.meta, label, pageNumber)}

      <main class="doc-body">
        <div class="doc-content-area">
          <div class="category-head">
            <div class="category-number">${number}</div>

            <div class="category-title">
              <span>${escapeHtml(label)}</span>
              <h2>${escapeHtml(isContinuation ? `${category.title} — continuação` : category.title)}</h2>
            </div>
          </div>

          ${totalParts > 1 && !measure ? `<div class="continuation-badge">Parte ${partNumber} de ${totalParts}</div>` : ""}

          ${category.summary && !isContinuation ? `
            <div class="category-summary">
              ${renderMarkdown(category.summary)}
            </div>
          ` : ""}

          <div class="content-render">
            ${htmlContent}
          </div>

          ${getObservationText(category.type) && !measure ? `
            <div class="observation-note">
              <strong>Observação editorial:</strong> ${escapeHtml(getObservationText(category.type))}
            </div>
          ` : ""}
        </div>
      </main>

      ${renderFooter(appState.document.meta)}
    </section>
  `;
}

function renderFinalPage(category, categoryIndex, pageNumber, htmlContent) {
  return `
    <section class="a4-page">
      ${renderHeader(appState.document.meta, "Conclusão", pageNumber)}

      <main class="doc-body">
        <div class="doc-content-area">
          <div class="doc-section-title">
            <span class="kicker">Conclusão</span>
            <h2>${escapeHtml(category.title || "Veredito Editorial Final")}</h2>
            <div class="title-rule"></div>
          </div>

          <div class="final-document">
            <div class="final-intro">
              A revisão editorial deste documento foi concluída com rigor técnico e sensibilidade editorial,
              oferecendo uma análise aprofundada dos aspectos de estrutura, linguagem, coerência, estilo,
              padronização e experiência de leitura.
            </div>

            <div class="final-result">
              <h3>Resultado da revisão</h3>
              <ul>
                <li>Texto analisado com rigor e profundidade.</li>
                <li>Linguagem avaliada quanto à clareza, fluidez e impacto.</li>
                <li>Estrutura narrativa examinada em suas forças e fragilidades.</li>
                <li>Prioridades de reescrita e aprimoramento identificadas.</li>
                <li>Documento preparado para orientar as próximas etapas editoriais.</li>
              </ul>
            </div>

            <div class="final-quote">
              “Revisar é lapidar a essência do texto para que ele revele toda a sua força.”
            </div>

            <div class="content-render">
              ${htmlContent}
            </div>

            <div class="signatures">
              <div class="signature">
                <div class="signature-name">${escapeHtml(appState.document.meta.avaliador || "Avaliador")}</div>
                <div class="signature-role">Responsável pela revisão</div>
              </div>

              <div class="signature">
                <div class="signature-name">${escapeHtml(appState.document.meta.nomeProjeto || "Administração do Projeto")}</div>
                <div class="signature-role">Grupo de gestão e estratégia</div>
              </div>
            </div>
          </div>
        </div>
      </main>

      ${renderFooter(appState.document.meta)}
    </section>
  `;
}

function renderHeader(meta, label, pageNumber) {
  return `
    <header class="doc-header">
      <img class="doc-header-logo" src="./assets/logo.png" alt="Logo" />

      <div class="doc-header-title">
        <span>${escapeHtml(label || "Relatório Editorial")}</span>
        <strong>${escapeHtml(meta.obra || "Revisão Editorial")}</strong>
      </div>

      <div class="doc-header-page">Página ${String(pageNumber).padStart(2, "0")}</div>
    </header>
  `;
}

function renderFooter(meta) {
  return `
    <footer class="doc-footer">
      <strong>${escapeHtml(meta.nomeProjeto || "Administração do Projeto")}</strong>
      <span>${escapeHtml(meta.confidencialidade || "Relatório Editorial Profissional")}</span>
    </footer>
  `;
}

/* LABELS */

function getCategoryLabel(type = "") {
  const map = {
    diagnostico: "Diagnóstico editorial",
    estrutura: "Estrutura narrativa",
    ritmo: "Ritmo narrativo",
    cenas: "Engenharia de cenas",
    personagens: "Desenvolvimento de personagens",
    dialogos: "Análise de diálogos",
    prosa: "Prosa e estilo",
    mundo: "Construção de mundo",
    tema: "Tema e simbolismo",
    gramatica: "Revisão técnica",
    reescrita: "Sugestões de reescrita",
    pontos_fortes: "Pontos fortes",
    pontos_fracos: "Pontos de atenção",
    prioridades: "Prioridades de reescrita",
    plano_de_melhoria: "Plano de melhoria",
    mercado: "Potencial de mercado",
    sensibilidade: "Sensibilidade e representação",
    veredito: "Veredito editorial",
    lista: "Listagem técnica",
    tabela: "Quadro analítico",
    texto: "Análise editorial",
    outro: "Análise complementar"
  };

  return map[(type || "").toLowerCase()] || "Análise editorial";
}

function getObservationText(type = "") {
  const map = {
    diagnostico: "Esta seção apresenta a leitura global do material e orienta a compreensão das demais análises.",
    estrutura: "Os apontamentos estruturais devem ser avaliados em conjunto com ritmo, progressão e consequência narrativa.",
    ritmo: "Esta seção examina distribuição de acontecimentos, pausas, aceleração e fluidez da leitura.",
    personagens: "A construção dos personagens deve ser analisada em relação à função narrativa, desejo, conflito e transformação.",
    dialogos: "O foco está na naturalidade, subtexto, voz própria e função dramática das falas.",
    gramatica: "Os apontamentos técnicos devem orientar uma etapa posterior de lapidação textual.",
    veredito: "Esta seção consolida o parecer editorial final."
  };

  return map[(type || "").toLowerCase()] || "";
}

/* JSON */

function exportJson() {
  syncAllEditors();

  const data = {
    exportedAt: new Date().toISOString(),
    app: "feedback-editorial",
    version: "1.0",
    document: appState.document
  };

  const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);

  const filename = createJsonFileName(appState.document.meta.obra || "documento");

  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  link.click();

  URL.revokeObjectURL(url);
  showToast("Dados exportados em JSON.");
}

function importJson(event) {
  const file = event.target.files?.[0];
  if (!file) return;

  const reader = new FileReader();

  reader.onload = () => {
    try {
      const parsed = JSON.parse(reader.result);
      const documentData = parsed.document || parsed;

      if (!documentData.meta || !Array.isArray(documentData.categories)) {
        throw new Error("Formato inválido.");
      }

      appState.document = documentData;
      applyDefaults();
      appState.selectedCategoryIndex = appState.document.categories.length ? 0 : -1;

      localStorage.setItem(STORAGE_KEY, JSON.stringify(appState.document));

      renderAll();
      activateTab("editar");
      showToast("Projeto importado com sucesso.");
    } catch (error) {
      console.error(error);
      showToast("Arquivo JSON inválido.");
    } finally {
      event.target.value = "";
    }
  };

  reader.readAsText(file);
}

function createJsonFileName(name) {
  const slug = slugify(name);
  return `projeto-editorial-${slug || "documento"}.json`;
}

/* PDF */

async function generatePdf() {
  syncAllEditors();
  renderPreview();

  const status = document.getElementById("pdfStatus");
  const button = document.getElementById("generatePdfBtn");
  const pages = [...document.querySelectorAll("#documentPreview .a4-page")];

  if (!pages.length) {
    showToast("Não há páginas para gerar.");
    return;
  }

  status.classList.remove("hidden");
  button.disabled = true;
  button.textContent = "Gerando...";

  try {
    await waitForAllImages(document.getElementById("documentPreview"));

    const { jsPDF } = window.jspdf;
    const pdf = new jsPDF("p", "mm", "a4");

    for (let index = 0; index < pages.length; index++) {
      const canvas = await html2canvas(pages[index], {
        scale: 2,
        useCORS: true,
        allowTaint: true,
        backgroundColor: "#ffffff",
        logging: false
      });

      const imgData = canvas.toDataURL("image/jpeg", 0.98);

      if (index > 0) pdf.addPage();

      pdf.addImage(imgData, "JPEG", 0, 0, 210, 297);
    }

    pdf.save(createPdfFileName(appState.document.meta.obra || "documento"));
    showToast("PDF gerado com sucesso.");
  } catch (error) {
    console.error(error);
    showToast("Erro ao gerar PDF. Veja o console do navegador.");
  } finally {
    status.classList.add("hidden");
    button.disabled = false;
    button.textContent = "Gerar PDF visual";
  }
}

function waitForAllImages(root) {
  const images = [...root.querySelectorAll("img")];

  return Promise.all(
    images.map((img) => {
      if (img.complete) return Promise.resolve();

      return new Promise((resolve) => {
        img.onload = resolve;
        img.onerror = resolve;
      });
    })
  );
}

function createPdfFileName(name) {
  return `revisao-editorial-${slugify(name) || "documento"}.pdf`;
}

function slugify(value) {
  return String(value || "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

/* MARKDOWN */

function markdownToBlocks(text) {
  if (!String(text || "").trim()) return [];

  const lines = String(text).replace(/\r\n/g, "\n").split("\n");
  const blocks = [];

  let paragraph = [];
  let unordered = [];
  let ordered = [];
  let quote = [];
  let table = [];

  const flushParagraph = () => {
    if (paragraph.length) {
      blocks.push(`<p>${inlineMarkdown(paragraph.join(" "))}</p>`);
      paragraph = [];
    }
  };

  const flushLists = () => {
    if (unordered.length) {
      blocks.push(`<ul>${unordered.map((item) => `<li>${inlineMarkdown(item)}</li>`).join("")}</ul>`);
      unordered = [];
    }

    if (ordered.length) {
      blocks.push(`<ol>${ordered.map((item) => `<li>${inlineMarkdown(item)}</li>`).join("")}</ol>`);
      ordered = [];
    }
  };

  const flushQuote = () => {
    if (quote.length) {
      blocks.push(`<blockquote>${inlineMarkdown(quote.join("<br>"))}</blockquote>`);
      quote = [];
    }
  };

  const flushTable = () => {
    if (table.length) {
      blocks.push(tableToHtml(table));
      table = [];
    }
  };

  lines.forEach((rawLine) => {
    const line = rawLine.trim();

    if (!line) {
      flushParagraph();
      flushLists();
      flushQuote();
      flushTable();
      return;
    }

    if (line.startsWith("|") && line.endsWith("|")) {
      flushParagraph();
      flushLists();
      flushQuote();
      table.push(line);
      return;
    }

    flushTable();

    if (line.startsWith("### ")) {
      flushParagraph();
      flushLists();
      flushQuote();
      blocks.push(`<h3>${inlineMarkdown(line.replace(/^###\s+/, ""))}</h3>`);
      return;
    }

    if (line.startsWith("## ")) {
      flushParagraph();
      flushLists();
      flushQuote();
      blocks.push(`<h2>${inlineMarkdown(line.replace(/^##\s+/, ""))}</h2>`);
      return;
    }

    if (line.startsWith("# ")) {
      flushParagraph();
      flushLists();
      flushQuote();
      blocks.push(`<h1>${inlineMarkdown(line.replace(/^#\s+/, ""))}</h1>`);
      return;
    }

    if (line.startsWith(">")) {
      flushParagraph();
      flushLists();
      quote.push(line.replace(/^>\s?/, ""));
      return;
    }

    if (/^[-*]\s+/.test(line)) {
      flushParagraph();
      flushQuote();
      unordered.push(line.replace(/^[-*]\s+/, ""));
      return;
    }

    if (/^\d+\.\s+/.test(line)) {
      flushParagraph();
      flushQuote();
      ordered.push(line.replace(/^\d+\.\s+/, ""));
      return;
    }

    paragraph.push(line);
  });

  flushParagraph();
  flushLists();
  flushQuote();
  flushTable();

  return blocks;
}

function renderMarkdown(text) {
  return markdownToBlocks(text).join("");
}

function tableToHtml(lines) {
  const rows = lines
    .filter((line) => !/^\|\s*:?-{2,}/.test(line))
    .map((line) => line.slice(1, -1).split("|").map((cell) => cell.trim()));

  if (!rows.length) return "";

  const head = rows[0];
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
  let html = escapeHtml(text);
  html = html.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");
  html = html.replace(/\*(.*?)\*/g, "<em>$1</em>");
  html = html.replace(/`([^`]+)`/g, "<code>$1</code>");
  return html;
}

/* UTIL */

function loadFromStorage() {
  const saved = localStorage.getItem(STORAGE_KEY);

  if (!saved) return;

  try {
    appState.document = JSON.parse(saved);
    appState.selectedCategoryIndex = appState.document.categories?.length ? 0 : -1;
  } catch {
    localStorage.removeItem(STORAGE_KEY);
  }
}

function copyToClipboard(text) {
  navigator.clipboard.writeText(text)
    .then(() => showToast("Prompt copiado."))
    .catch(() => showToast("Não foi possível copiar automaticamente."));
}

function escapeHtml(value) {
  return String(value || "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function showToast(message) {
  const toast = document.getElementById("toast");
  toast.textContent = message;
  toast.classList.add("show");

  clearTimeout(showToast.timer);

  showToast.timer = setTimeout(() => {
    toast.classList.remove("show");
  }, 2600);
}

/* EXEMPLO */

function getExampleText() {
  return `[TIPO_DOCUMENTO]
revisao_completa

[TITULO_RELATORIO]
Relatório de Revisão Editorial

[SUBTITULO_RELATORIO]
Revisão editorial extremamente detalhada

[NOME_PROJETO]
Administração do Projeto

[RESPONSAVEL]
Administração do Projeto

[EMAIL_PROJETO]
contato@administracaodoprojeto.com.br

[SITE_PROJETO]
administracaodoprojeto.com.br

[DATA_REVISAO]
Não informado

[VERSAO_DOCUMENTO]
Versão 1.0

[CONFIDENCIALIDADE]
Uso restrito ao autor e à equipe editorial

[OBRA]
O Amado da Luzz

[AUTOR]
Não informado

[AVALIADOR]
Administração do Projeto

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
Um protagonista marcado por trauma descobre que carrega uma função decisiva em uma guerra de escala espiritual, política e emocional.

[CONFLITO_CENTRAL]
O conflito opera em três camadas: externo, interno e relacional.

[ESTAGIO_EDITORIAL]
Intermediário promissor.

[NIVEL_DE_MATURIDADE]
Rascunho intermediário com estrutura já desenhada.

[MAIOR_FORCA]
Vocação épica combinada com reconstrução emocional por meio dos vínculos.

[MAIOR_FRAQUEZA]
Excesso de intensidade sem variação suficiente.

[VEREDITO_RESUMIDO]
O manuscrito tem estrutura, ambição e coração, mas ainda precisa de reescrita profunda para amadurecer cena, voz, tensão, diálogos e subtexto.

[STATUS_DO_DOCUMENTO]
Necessita reescrita estrutural e refinamento literário.

[DATA]
Não informado

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

A força literária do texto aparece principalmente na energia da jornada. O leitor entende que o protagonista saiu de um lugar de destruição absoluta e está sendo empurrado para um destino que não pediu.

## Pontos principais

- Estrutura épica reconhecível.
- Protagonista com trauma forte.
- Grupo de personagens com potencial emocional.
- Excesso de exposição direta.
- Necessidade de mais cenas vividas pelo leitor.

A clareza narrativa é razoável. O leitor consegue acompanhar o objetivo principal, mas a quantidade de nomes, raças, cidades, deuses, mestres, relíquias, demônios, locais e sistemas mágicos pode criar sobrecarga.

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

O protagonista sustenta a história porque carrega uma ferida clara. Essa ferida dá coerência ao seu isolamento, sua resistência ao chamado e sua dificuldade de confiar.

Os personagens secundários precisam deixar de funcionar apenas como apoio do arco principal. Cada um deve carregar desejo próprio, contradição e consequência emocional.

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

Quando essa pergunta começar a contaminar cada vitória, cada aliança e cada escolha, a obra deixará de ser apenas uma fantasia épica promissora e começará a se tornar uma história realmente memorável.

[FIM_CATEGORIA]`;
}
