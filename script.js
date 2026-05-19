const STORAGE_KEY = "feedback_editorial_documento_v6";

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

Sua tarefa é pegar o texto de revisão editorial que vou enviar e reorganizá-lo em um padrão fixo, limpo, completo e estruturado para ser usado em uma plataforma geradora de documentos em PDF.

Não faça uma nova revisão. Não resuma. Não suavize críticas. Não invente informações. Apenas organize e padronize.

Use exatamente este formato:

[TITULO_RELATORIO]
Relatório de Revisão Editorial

[SUBTITULO_RELATORIO]
Revisão editorial extremamente detalhada

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

Preserve tabelas em Markdown. Preserve listas. Preserve exemplos e sugestões de reescrita.

Entregue apenas o documento padronizado.

Agora organize o texto abaixo:

COLE AQUI O TEXTO COMPLETO DA REVISÃO EDITORIAL`;

const PROMPT_RESUMIDO = `Você é um organizador técnico de relatórios editoriais profissionais.

Pegue a revisão editorial que vou enviar e gere uma versão resumida, profissional e estruturada para PDF.

Não invente informações. Não mude o diagnóstico central. Não transforme críticas em elogios. Reduza para cerca de 20% a 35% do original.

Use o mesmo padrão:

[TITULO_RELATORIO]
[SUBTITULO_RELATORIO]
[OBRA]
[AUTOR]
[AVALIADOR]
[TIPO_REVISAO]
[ESCOPO]
[GENERO_LITERARIO]
[SUBGENEROS_E_ELEMENTOS]
[PUBLICO_ALVO]
[IDENTIDADE_TONAL]
[PROMESSA_NARRATIVA]
[CONFLITO_CENTRAL]
[ESTAGIO_EDITORIAL]
[NIVEL_DE_MATURIDADE]
[MAIOR_FORCA]
[MAIOR_FRAQUEZA]
[VEREDITO_RESUMIDO]
[STATUS_DO_DOCUMENTO]
[DATA]
[OBSERVACOES_GERAIS]

Depois organize nas categorias:
Diagnóstico Editorial Geral; Gênero, Público e Tom; Premissa e Promessa Narrativa; Estrutura e Ritmo; Personagens e Relações; Prosa, Voz e Diálogos; Mundo, Tema e Originalidade; Gramática e Revisão Técnica; Pontos Fortes; Pontos de Atenção; Prioridades de Reescrita; Plano Prático de Melhoria; Sugestões Concretas de Reescrita; Potencial de Mercado; Sensibilidade e Representação; Veredito Editorial Final.

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

Entregue apenas o documento padronizado.

Agora organize o texto abaixo:

COLE AQUI O TEXTO COMPLETO DA REVISÃO EDITORIAL`;

document.addEventListener("DOMContentLoaded", () => {
  setupTabs();
  setupButtons();
  loadFromStorage();
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
    showToast("Exemplo carregado.");
  });

  document.getElementById("parseBtn").addEventListener("click", () => {
    const text = document.getElementById("rawInput").value.trim();

    if (!text) {
      showToast("Cole o texto padronizado primeiro.");
      return;
    }

    appState.document = parseStandardDocument(text);
    appState.selectedCategoryIndex = appState.document.categories.length ? 0 : -1;

    renderAll();
    activateTab("editar");
    showToast("Texto processado com sucesso.");
  });

  document.getElementById("goEditBtn").addEventListener("click", () => activateTab("editar"));

  Object.entries(META_INPUTS).forEach(([key, inputId]) => {
    document.getElementById(inputId).addEventListener("input", (event) => {
      appState.document.meta[key] = event.target.value;
    });
  });

  document.getElementById("applyCategoryBtn").addEventListener("click", () => {
    applyCategoryEditor(false);
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

  document.getElementById("clearBtn").addEventListener("click", () => {
    if (!window.confirm("Limpar todos os dados?")) return;

    localStorage.removeItem(STORAGE_KEY);
    appState.document = { meta: {}, categories: [] };
    appState.selectedCategoryIndex = -1;
    document.getElementById("rawInput").value = "";

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

function parseStandardDocument(text) {
  const normalized = text.replace(/\r\n/g, "\n");
  const metaPart = normalized.split("[CATEGORIA]")[0] || "";
  const categories = parseCategories(normalized);

  return {
    meta: parseMeta(metaPart),
    categories
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
  const blocks = text.split("[CATEGORIA]").slice(1);

  return blocks
    .map((block) => {
      const cleanBlock = block.split("[FIM_CATEGORIA]")[0];

      return {
        title: readBetween(cleanBlock, null, "[TIPO_CATEGORIA]").trim() || "Categoria sem título",
        type: readBetween(cleanBlock, "[TIPO_CATEGORIA]", "[RESUMO_CATEGORIA]").trim() || "texto",
        summary: readBetween(cleanBlock, "[RESUMO_CATEGORIA]", "[CONTEUDO]").trim(),
        content: readBetween(cleanBlock, "[CONTEUDO]", null).trim()
      };
    })
    .filter((item) => item.title || item.content);
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

function renderAll() {
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

function applyCategoryEditor(showToastMessage = true) {
  const category = appState.document.categories[appState.selectedCategoryIndex];
  if (!category) return;

  category.title = document.getElementById("categoryTitleInput").value.trim() || "Categoria sem título";
  category.type = document.getElementById("categoryTypeInput").value || "texto";
  category.summary = document.getElementById("categorySummaryInput").value.trim();
  category.content = document.getElementById("categoryContentInput").value.trim();

  if (showToastMessage) showToast("Alterações aplicadas.");
}

function syncAllEditors() {
  Object.entries(META_INPUTS).forEach(([key, inputId]) => {
    appState.document.meta[key] = document.getElementById(inputId).value.trim();
  });

  applyCategoryEditor(false);
}

function renderPreview() {
  const container = document.getElementById("documentPreview");

  if (!hasContent()) {
    container.innerHTML = `<article class="ui-card">Nenhum documento carregado ainda.</article>`;
    return;
  }

  const pages = [];
  const meta = appState.document.meta;

  let currentPage = 1;

  pages.push(renderCoverPage(meta, currentPage));
  currentPage += 1;

  pages.push(renderFichaPage(meta, currentPage));
  currentPage += 1;

  appState.document.categories.forEach((category, index) => {
    const categoryPages = paginateCategory(category, currentPage, index + 1);
    pages.push(...categoryPages.pages);
    currentPage += categoryPages.count;
  });

  if (!hasVereditoCategory() && (meta.vereditoResumido || meta.observacoesGerais)) {
    pages.push(renderClosingPage(meta, currentPage));
  }

  container.innerHTML = pages.join("");
}

function hasContent() {
  return Object.values(appState.document.meta || {}).some((value) => String(value || "").trim()) ||
    (appState.document.categories || []).length > 0;
}

function hasVereditoCategory() {
  return appState.document.categories.some((category) => (category.type || "").toLowerCase() === "veredito");
}

/* ---------- RENDERIZAÇÃO DAS PÁGINAS ---------- */

function renderCoverPage(meta, pageNumber) {
  const title = meta.tituloRelatorio || "Relatório de Revisão Editorial";
  const split = splitCoverTitle(title);

  return `
    <section class="a4-page cover-page">
      <div class="cover-frame"></div>

      <div class="cover-wrap">
        <div class="cover-header">
          <img class="cover-logo" src="./assets/logo.png" alt="Logo" />

          <div class="cover-header-note">Administração do Projeto</div>
        </div>

        <div class="cover-body">
          <div class="cover-kicker">${escapeHtml(meta.tipoRevisao || "Revisão Editorial Profissional")}</div>

          <h1 class="cover-title">
            ${escapeHtml(split.first)}
            ${split.second ? `<br><strong>${escapeHtml(split.second)}</strong>` : ""}
          </h1>

          <p class="cover-subtitle">
            ${escapeHtml(meta.subtituloRelatorio || "Documento técnico de análise editorial, estrutura narrativa, revisão crítica e encaminhamento de aprimoramento literário.")}
          </p>

          <div class="cover-work-box">
            <span>Obra analisada</span>
            <strong>${escapeHtml(meta.obra || "Obra não informada")}</strong>
          </div>

          <div class="cover-meta-grid">
            ${renderCoverMetaItem("Autor", meta.autor)}
            ${renderCoverMetaItem("Avaliador", meta.avaliador)}
            ${renderCoverMetaItem("Escopo", meta.escopo)}
            ${renderCoverMetaItem("Status", meta.statusDocumento)}
          </div>
        </div>
      </div>
    </section>
  `;
}

function renderCoverMetaItem(label, value) {
  if (!String(value || "").trim()) return "";

  return `
    <div class="cover-meta-item">
      <span>${escapeHtml(label)}</span>
      <strong>${escapeHtml(value)}</strong>
    </div>
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

function renderFichaPage(meta, pageNumber) {
  const scopeItems = [
    "Ortografia, acentuação e pontuação",
    "Gramática e concordância",
    "Coerência e coesão textual",
    "Estilo, clareza e adequação de linguagem",
    "Padronização de elementos pré e pós-textuais",
    "Citações, notas e referências",
    "Tabelas, quadros, figuras e legendas",
    "Numeração, títulos e hierarquia de tópicos"
  ];

  return `
    <section class="a4-page">
      ${renderTopArt()}
      <div class="page-body">
        <div class="page-title-row">
          <span class="page-title-kicker">Ficha Editorial</span>
          <h2 class="page-title">${escapeHtml(meta.tituloRelatorio || "Relatório de Revisão Editorial")}</h2>
          <div class="page-title-rule"></div>
        </div>

        <div class="page-scroll-area">
          <div class="ficha-layout">
            <div class="ficha-left">
              <div class="ficha-intro">
                ${renderMarkdown(meta.vereditoResumido || "Este relatório apresenta, de forma aprofundada e minuciosa, as intervenções realizadas no texto, com o objetivo de garantir excelência editorial em linguagem, estrutura, coerência, coesão, padronização e conformidade técnica.")}
              </div>

              <div class="ficha-feature-grid">
                ${renderFeature("Revisão completa", "Análise minuciosa dos elementos textuais, estruturais e narrativos do manuscrito.")}
                ${renderFeature("Padronização", "Uniformização de estilo, formatação, hierarquia de tópicos e consistência documental.")}
                ${renderFeature("Qualidade e fluidez", "Ajustes voltados para maior clareza, ritmo, legibilidade e impacto editorial.")}
                ${renderFeature("Conformidade", "Adequação técnica do material segundo boas práticas de revisão e organização textual.")}
              </div>

              <div class="scope-box">
                <h4>Escopo da revisão</h4>
                <ul>
                  ${scopeItems.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}
                </ul>
              </div>

              <div class="quote-box">
                “Excelência editorial não é apenas corrigir palavras. É potencializar ideias.”
              </div>
            </div>

            <div class="ficha-right">
              <div class="meta-panel">
                ${renderMetaRow("Documento base", meta.obra || "Não informado")}
                ${renderMetaRow("Autor", meta.autor || "Não informado")}
                ${renderMetaRow("Avaliador", meta.avaliador || "Não informado")}
                ${renderMetaRow("Tipo de revisão", meta.tipoRevisao || "Não informado")}
                ${renderMetaRow("Escopo", meta.escopo || "Não informado")}
                ${renderMetaRow("Gênero literário", meta.generoLiterario || "Não informado")}
                ${renderMetaRow("Público-alvo", meta.publicoAlvo || "Não informado")}
                ${renderMetaRow("Identidade tonal", meta.identidadeTonal || "Não informado")}
                ${renderMetaRow("Estágio editorial", meta.estagioEditorial || "Não informado")}
                ${renderMetaRow("Status do documento", `<span class="meta-status">${escapeHtml(meta.statusDocumento || "Em elaboração")}</span>`, true)}
              </div>
            </div>
          </div>
        </div>

        ${renderFooter(pageNumber)}
      </div>
    </section>
  `;
}

function renderFeature(title, text) {
  return `
    <div class="ficha-feature">
      <h4>${escapeHtml(title)}</h4>
      <p>${escapeHtml(text)}</p>
    </div>
  `;
}

function renderMetaRow(label, value, isHtml = false) {
  return `
    <div class="meta-row">
      <div class="meta-label">${escapeHtml(label)}</div>
      <div class="meta-value">${isHtml ? value : escapeHtml(value)}</div>
    </div>
  `;
}

function paginateCategory(category, startPageNumber, categoryIndex) {
  const blocks = markdownToBlocks(category.content || "");
  const pages = [];

  if (!blocks.length) {
    pages.push(renderCategoryPage({
      category,
      categoryIndex,
      pageNumber: startPageNumber,
      partNumber: 1,
      totalParts: 1,
      htmlContent: ""
    }));

    return { pages, count: 1 };
  }

  let currentBlocks = [];
  let pageNumber = startPageNumber;

  blocks.forEach((block) => {
    const candidate = [...currentBlocks, block];

    if (currentBlocks.length && !fitsCategoryPage(category, categoryIndex, candidate.join(""), currentBlocks.length === 0 ? 1 : 999)) {
      currentBlocks.push("__PAGE_BREAK__");
    }

    if (currentBlocks.includes("__PAGE_BREAK__")) {
      currentBlocks.pop();

      pages.push(currentBlocks.join(""));
      currentBlocks = [block];
    } else {
      currentBlocks = candidate;
    }
  });

  if (currentBlocks.length) {
    pages.push(currentBlocks.join(""));
  }

  const totalParts = pages.length;

  const htmlPages = pages.map((htmlContent, index) => {
    return renderCategoryPage({
      category,
      categoryIndex,
      pageNumber: pageNumber + index,
      partNumber: index + 1,
      totalParts,
      htmlContent
    });
  });

  return { pages: htmlPages, count: htmlPages.length };
}

function fitsCategoryPage(category, categoryIndex, htmlContent) {
  const zone = getMeasureZone();

  zone.innerHTML = renderCategoryPage({
    category,
    categoryIndex,
    pageNumber: 999,
    partNumber: 1,
    totalParts: 1,
    htmlContent,
    isMeasure: true
  });

  const area = zone.querySelector(".page-scroll-area");
  if (!area) return true;

  return area.scrollHeight <= area.clientHeight;
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

function renderCategoryPage({ category, categoryIndex, pageNumber, partNumber, totalParts, htmlContent, isMeasure = false }) {
  const label = getCategoryLabel(category.type);
  const isContinuation = partNumber > 1;
  const badge = totalParts > 1 ? `Parte ${partNumber} de ${totalParts}` : "";
  const numberLabel = String(categoryIndex).padStart(2, "0");
  const summary = category.summary ? renderMarkdown(category.summary) : "";
  const observationText = getObservationText(category.type);

  if ((category.type || "").toLowerCase() === "veredito" && totalParts === 1) {
    return renderFinalCategoryPage({
      category,
      categoryIndex,
      pageNumber,
      htmlContent,
      observationText
    });
  }

  return `
    <section class="a4-page">
      ${renderTopArt()}

      <div class="page-body">
        <div class="page-title-row">
          <span class="page-title-kicker">${escapeHtml(label)}</span>
          <h2 class="page-title">${escapeHtml(category.title || "Categoria")}</h2>
          <div class="page-title-rule"></div>
        </div>

        <div class="page-scroll-area">
          <div class="section-head">
            <div class="section-head-number">${numberLabel}</div>

            <div class="section-head-text">
              <span>${escapeHtml(label)}</span>
              <h3>${escapeHtml(category.title || "Categoria")}</h3>
            </div>
          </div>

          ${badge && !isMeasure ? `<div class="continuation-badge">${escapeHtml(badge)}</div>` : ""}
          ${summary && !isContinuation ? `<div class="section-summary">${summary}</div>` : ""}

          <div class="content-box">
            <div class="content-render">${htmlContent}</div>
          </div>

          ${observationText && !isMeasure ? `
            <div class="observation-box">
              <div class="observation-title">Observações importantes</div>
              <div class="observation-content">${escapeHtml(observationText)}</div>
            </div>
          ` : ""}
        </div>

        ${renderFooter(pageNumber)}
      </div>
    </section>
  `;
}

function renderFinalCategoryPage({ category, categoryIndex, pageNumber, htmlContent }) {
  return `
    <section class="a4-page">
      ${renderTopArt()}

      <div class="page-body">
        <div class="page-title-row">
          <span class="page-title-kicker">Conclusão</span>
          <h2 class="page-title">${escapeHtml(category.title || "Veredito Editorial Final")}</h2>
          <div class="page-title-rule"></div>
        </div>

        <div class="page-scroll-area">
          <div class="final-layout">
            <div class="final-intro">
              A revisão editorial deste documento foi concluída com sucesso. Todas as intervenções foram
              realizadas com rigor técnico e sensibilidade editorial, assegurando uma análise profunda dos
              aspectos de estrutura, linguagem, coerência, estilo, padronização e conformidade técnica.
            </div>

            <div class="final-result-box">
              <h4>Resultado da revisão</h4>

              <ul>
                <li>Texto revisado com rigor e profundidade.</li>
                <li>Linguagem aprimorada para maior clareza e fluidez.</li>
                <li>Estrutura fortalecida e inconsistências identificadas com precisão.</li>
                <li>Conformidade técnica e padronização asseguradas.</li>
                <li>Documento preparado para as próximas etapas editoriais.</li>
              </ul>
            </div>

            <div class="final-quote">
              “Revisar é lapidar a essência do texto para que ele revele toda a sua força.”
            </div>

            <div class="content-box">
              <div class="content-render">${htmlContent}</div>
            </div>

            <div class="final-signatures">
              <div class="signature-box">
                <div class="signature-name">${escapeHtml(appState.document.meta.avaliador || "Avaliador")}</div>
                <div class="signature-role">Responsável pela revisão</div>
              </div>

              <div class="signature-box">
                <div class="signature-name">Administração do Projeto</div>
                <div class="signature-role">Grupo de gestão e estratégia</div>
              </div>
            </div>

            <div class="final-bottom-banner">
              <strong>Agradecemos a confiança!</strong>
              <span>
                Foi um privilégio contribuir para a construção de um texto ainda mais sólido, claro e impactante.
              </span>
            </div>
          </div>
        </div>

        ${renderFooter(pageNumber)}
      </div>
    </section>
  `;
}

function renderClosingPage(meta, pageNumber) {
  const content = `
    <h2>Veredito final</h2>
    <p>${escapeHtml(meta.vereditoResumido || "Documento concluído.")}</p>
    ${meta.observacoesGerais ? `<h3>Observações gerais</h3><p>${escapeHtml(meta.observacoesGerais)}</p>` : ""}
  `;

  return `
    <section class="a4-page">
      ${renderTopArt()}

      <div class="page-body">
        <div class="page-title-row">
          <span class="page-title-kicker">Conclusão</span>
          <h2 class="page-title">Encerramento</h2>
          <div class="page-title-rule"></div>
        </div>

        <div class="page-scroll-area">
          <div class="final-layout">
            <div class="final-intro">
              Este relatório foi estruturado para oferecer uma visão técnica, crítica e aprofundada do material avaliado.
            </div>

            <div class="final-result-box">
              <h4>Resultado da revisão</h4>
              <ul>
                <li>Mapeamento técnico do manuscrito realizado.</li>
                <li>Pontos fortes e fragilidades identificados com clareza.</li>
                <li>Encaminhamento editorial formulado com objetividade.</li>
                <li>Base sólida para reescrita, lapidação e amadurecimento da obra.</li>
              </ul>
            </div>

            <div class="content-box">
              <div class="content-render">${content}</div>
            </div>

            <div class="final-bottom-banner">
              <strong>Administração do Projeto</strong>
              <span>Grupo de gestão e estratégia</span>
            </div>
          </div>
        </div>

        ${renderFooter(pageNumber)}
      </div>
    </section>
  `;
}

function renderTopArt() {
  return `
    <div class="page-top-art">
      <img src="./assets/ornamento-topo.png" alt="Ornamento superior" />
    </div>
  `;
}

function renderFooter(pageNumber) {
  return `
    <footer class="page-footer">
      <div class="page-footer-left">
        <img class="page-footer-logo" src="./assets/logo.png" alt="Logo" />

        <div class="page-footer-text">
          <strong>Administração do Projeto</strong>
          <span>Grupo de Gestão e Estratégia</span>
        </div>
      </div>

      <div class="page-footer-page">
        Página ${String(pageNumber).padStart(2, "0")}
      </div>
    </footer>
  `;
}

function getCategoryLabel(type = "") {
  const map = {
    diagnostico: "Diagnóstico editorial",
    estrutura: "Estrutura narrativa",
    ritmo: "Ritmo narrativo",
    cenas: "Engenharia de cenas",
    personagens: "Desenvolvimento de personagens",
    dialogos: "Análise de diálogos",
    prosa: "Prosa e estilo",
    mundo: "Worldbuilding",
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
    diagnostico: "Esta seção apresenta o diagnóstico geral do material e orienta a leitura estratégica das próximas análises.",
    estrutura: "Os apontamentos estruturais devem ser observados em conjunto com ritmo, progressão e engenharia de cenas.",
    ritmo: "Esta seção examina velocidade, pausas, distribuição de acontecimentos e fluidez da experiência de leitura.",
    personagens: "A construção de personagens deve ser avaliada em relação à função narrativa, consistência emocional e individualidade.",
    dialogos: "O foco aqui está na naturalidade, voz própria, subtexto e função dramática dos diálogos.",
    gramatica: "Os apontamentos técnicos devem ser interpretados como base de refinamento, não como totalidade da revisão.",
    veredito: "Esta seção consolida o parecer editorial final e aponta o estágio atual de maturidade do manuscrito."
  };

  return map[(type || "").toLowerCase()] || "";
}

/* ---------- PDF ---------- */

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
        backgroundColor: null,
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
    button.textContent = "Gerar PDF";
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
  const slug = String(name)
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

  return `revisao-editorial-${slug || "documento"}.pdf`;
}

/* ---------- MARKDOWN ---------- */

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

  const header = rows[0];
  const body = rows.slice(1);

  return `
    <table>
      <thead>
        <tr>${header.map((cell) => `<th>${inlineMarkdown(cell)}</th>`).join("")}</tr>
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

/* ---------- UTILITÁRIOS ---------- */

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

  clearTimeout(showToast._timer);

  showToast._timer = setTimeout(() => {
    toast.classList.remove("show");
  }, 2600);
}

/* ---------- EXEMPLO ---------- */

function getExampleText() {
  return `[TITULO_RELATORIO]
Relatório de Revisão Editorial

[SUBTITULO_RELATORIO]
Revisão editorial extremamente detalhada

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
