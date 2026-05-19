const STORAGE_KEY = "feedback_editorial_documento_v4";

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
  document.querySelectorAll(".tab-btn").forEach((button) => {
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

  document.getElementById("clearBtn").addEventListener("click", () => {
    if (!window.confirm("Limpar tudo?")) return;

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
  document.querySelectorAll(".tab-btn").forEach((button) => {
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
    container.innerHTML = `<p class="side-empty">Nenhuma categoria carregada.</p>`;
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

  titleDisplay.textContent = category.title;
  typeDisplay.textContent = category.type || "texto";
  titleInput.value = category.title || "";
  typeInput.value = category.type || "texto";
  summaryInput.value = category.summary || "";
  contentInput.value = category.content || "";
}

function applyCategoryEditor(showMessage = true) {
  const category = appState.document.categories[appState.selectedCategoryIndex];

  if (!category) return;

  category.title = document.getElementById("categoryTitleInput").value.trim() || "Categoria sem título";
  category.type = document.getElementById("categoryTypeInput").value || "texto";
  category.summary = document.getElementById("categorySummaryInput").value.trim();
  category.content = document.getElementById("categoryContentInput").value.trim();

  if (showMessage) {
    showToast("Alterações aplicadas.");
  }
}

function syncAllEditors() {
  Object.entries(META_INPUTS).forEach(([key, id]) => {
    appState.document.meta[key] = document.getElementById(id).value;
  });

  applyCategoryEditor(false);
}

function renderPreview() {
  const container = document.getElementById("documentPreview");

  if (!hasContent()) {
    container.innerHTML = `<article class="app-card">Nenhum documento carregado ainda.</article>`;
    return;
  }

  const meta = appState.document.meta;
  const pages = [];

  pages.push(renderCover(meta));
  pages.push(renderFicha(meta, 2));

  let pageNumber = 3;

  appState.document.categories.forEach((category) => {
    const categoryPages = paginateCategory(category, pageNumber);
    pages.push(...categoryPages.htmlPages);
    pageNumber += categoryPages.count;
  });

  container.innerHTML = pages.join("");
}

function hasContent() {
  return Object.values(appState.document.meta || {}).some((value) => String(value || "").trim()) ||
    appState.document.categories.length > 0;
}

function renderCover(meta) {
  const title = meta.tituloRelatorio || "Relatório de Revisão Editorial";
  const titleParts = splitCoverTitle(title);

  return `
    <section class="pdf-page dark">
      <div class="cover-frame"></div>

      <div class="cover-content">
        <div class="cover-top">
          <img class="cover-logo" src="./assets/logo.png" alt="Logo" />

          <div class="cover-label">
            Administração do Projeto
          </div>
        </div>

        <div class="cover-main">
          <div class="cover-kicker">${escapeHtml(meta.tipoRevisao || "Revisão Editorial Profissional")}</div>

          <h1 class="cover-title">
            ${escapeHtml(titleParts.first)}
            ${titleParts.second ? `<br><strong>${escapeHtml(titleParts.second)}</strong>` : ""}
          </h1>

          <p class="cover-subtitle">
            ${escapeHtml(meta.subtituloRelatorio || "Documento técnico de análise editorial, estrutura narrativa e aprimoramento literário.")}
          </p>

          <div class="cover-work">
            <span>Obra analisada</span>
            <strong>${escapeHtml(meta.obra || "Obra não informada")}</strong>
          </div>
        </div>

        <div class="cover-meta">
          ${coverMeta("Autor", meta.autor)}
          ${coverMeta("Avaliador", meta.avaliador)}
          ${coverMeta("Escopo", meta.escopo)}
          ${coverMeta("Status", meta.statusDocumento)}
        </div>
      </div>
    </section>
  `;
}

function splitCoverTitle(title) {
  const clean = String(title || "").trim();

  if (!clean.includes(" ")) {
    return { first: clean, second: "" };
  }

  if (clean.toLowerCase().includes("revisão editorial")) {
    return {
      first: "Relatório de",
      second: "Revisão Editorial"
    };
  }

  const parts = clean.split(" ");
  const midpoint = Math.ceil(parts.length / 2);

  return {
    first: parts.slice(0, midpoint).join(" "),
    second: parts.slice(midpoint).join(" ")
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
    ["Status", meta.statusDocumento],
    ["Data", meta.data]
  ].filter(([, value]) => String(value || "").trim());

  return `
    <section class="pdf-page">
      ${renderDocHeader(meta, "Ficha Editorial")}
      <main class="page-inner">
        ${renderSectionTitle("Ficha Editorial", meta.obra || "Documento Editorial")}

        <div class="page-content-area">
          ${meta.vereditoResumido ? `<div class="editorial-note">${renderMarkdown(meta.vereditoResumido)}</div>` : ""}

          <div class="ficha-grid">
            ${rows.map(([label, value], index) => `
              <article class="ficha-card ${shouldBeWide(label, value, index) ? "wide" : ""}">
                <span>${escapeHtml(label)}</span>
                <div class="content">${renderMarkdown(value)}</div>
              </article>
            `).join("")}
          </div>
        </div>

        ${renderFooter(meta, pageNumber)}
      </main>
    </section>
  `;
}

function shouldBeWide(label, value, index) {
  const wideLabels = ["Promessa narrativa", "Conflito central", "Subgêneros e elementos", "Maior força", "Maior fraqueza"];
  return wideLabels.includes(label) || String(value || "").length > 170 || index > 7;
}

function paginateCategory(category, startPageNumber) {
  const blocks = markdownToBlocks(category.content || "");
  const pages = [];
  let currentBlocks = [];
  let currentPageNumber = startPageNumber;
  let currentPart = 1;

  if (!blocks.length) {
    pages.push(renderCategoryPage(category, "", currentPageNumber, currentPart, 1));
    return { htmlPages: pages, count: 1 };
  }

  blocks.forEach((block) => {
    const candidate = [...currentBlocks, block];

    if (currentBlocks.length && !fitsCategoryPage(category, candidate, currentPart)) {
      pages.push(renderCategoryPage(category, currentBlocks.join(""), currentPageNumber, currentPart, 0));
      currentPageNumber += 1;
      currentPart += 1;
      currentBlocks = [block];
    } else {
      currentBlocks = candidate;
    }
  });

  if (currentBlocks.length) {
    pages.push(renderCategoryPage(category, currentBlocks.join(""), currentPageNumber, currentPart, 0));
  }

  const totalParts = pages.length;

  const finalPages = pages.map((pageHtml, index) => {
    return pageHtml
      .replaceAll("__TOTAL_PARTS__", String(totalParts))
      .replaceAll("__PART_NUMBER__", String(index + 1));
  });

  return {
    htmlPages: finalPages,
    count: finalPages.length
  };
}

function fitsCategoryPage(category, blocks, partNumber) {
  const measure = getMeasureZone();

  measure.innerHTML = renderCategoryPage(category, blocks.join(""), 999, partNumber, 1, true);

  const area = measure.querySelector(".page-content-area");

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

function renderCategoryPage(category, contentHtml, pageNumber, partNumber, totalParts, isMeasure = false) {
  const isContinuation = partNumber > 1;
  const partLabel = totalParts && totalParts > 1 ? `Parte ${partNumber} de ${totalParts}` : "";
  const title = isContinuation ? `${category.title} — continuação` : category.title;
  const isFinal = category.type === "veredito";

  return `
    <section class="pdf-page">
      ${renderDocHeader(appState.document.meta, category.type || "Categoria")}

      <main class="page-inner">
        ${renderSectionTitle(category.type || "Categoria", title)}

        <div class="page-content-area">
          ${partLabel && !isMeasure ? `<div class="continuation-label">${escapeHtml(partLabel)}</div>` : ""}
          ${category.summary && !isContinuation ? `<div class="editorial-note">${renderMarkdown(category.summary)}</div>` : ""}

          ${
            isFinal
              ? `<div class="final-card"><h3>Veredito Editorial</h3><div class="content">${contentHtml}</div></div>`
              : `<div class="section-box"><div class="content">${contentHtml}</div></div>`
          }
        </div>

        ${renderFooter(appState.document.meta, pageNumber)}
      </main>
    </section>
  `;
}

function renderDocHeader(meta, label) {
  return `
    <header class="doc-header">
      <img class="doc-header-logo" src="./assets/logo.png" alt="Logo" />

      <div class="doc-header-text">
        <span>${escapeHtml(label || "Relatório Editorial")}</span>
        <strong>${escapeHtml(meta.obra || "Revisão Editorial Profissional")}</strong>
      </div>
    </header>
  `;
}

function renderSectionTitle(kicker, title) {
  return `
    <div class="section-title">
      <span class="kicker">${escapeHtml(kicker)}</span>
      <h2>${escapeHtml(title)}</h2>
      <div class="title-rule"></div>
    </div>
  `;
}

function renderFooter(meta, pageNumber) {
  return `
    <footer class="doc-footer">
      <span>${escapeHtml(meta.obra || "Relatório Editorial")}</span>
      <span>Página ${String(pageNumber).padStart(2, "0")}</span>
    </footer>
  `;
}

async function generatePdf() {
  syncAllEditors();
  renderPreview();

  const status = document.getElementById("pdfStatus");
  const button = document.getElementById("generatePdfBtn");
  const pages = [...document.querySelectorAll("#documentPreview .pdf-page")];

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

  return Promise.all(images.map((img) => {
    if (img.complete) return Promise.resolve();

    return new Promise((resolve) => {
      img.onload = resolve;
      img.onerror = resolve;
    });
  }));
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

function markdownToBlocks(text) {
  if (!String(text || "").trim()) return [];

  const lines = String(text).replace(/\r\n/g, "\n").split("\n");
  const blocks = [];
  let paragraph = [];
  let list = [];
  let ordered = [];
  let quote = [];
  let table = [];

  const flushParagraph = () => {
    if (paragraph.length) {
      blocks.push(`<p>${inlineMarkdown(paragraph.join(" "))}</p>`);
      paragraph = [];
    }
  };

  const flushList = () => {
    if (list.length) {
      blocks.push(`<ul>${list.map((item) => `<li>${inlineMarkdown(item)}</li>`).join("")}</ul>`);
      list = [];
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
      flushList();
      flushQuote();
      flushTable();
      return;
    }

    if (line.startsWith("|") && line.endsWith("|")) {
      flushParagraph();
      flushList();
      flushQuote();
      table.push(line);
      return;
    }

    flushTable();

    if (line.startsWith("### ")) {
      flushParagraph();
      flushList();
      flushQuote();
      blocks.push(`<h3>${inlineMarkdown(line.replace(/^###\s+/, ""))}</h3>`);
      return;
    }

    if (line.startsWith("## ")) {
      flushParagraph();
      flushList();
      flushQuote();
      blocks.push(`<h2>${inlineMarkdown(line.replace(/^##\s+/, ""))}</h2>`);
      return;
    }

    if (line.startsWith("# ")) {
      flushParagraph();
      flushList();
      flushQuote();
      blocks.push(`<h1>${inlineMarkdown(line.replace(/^#\s+/, ""))}</h1>`);
      return;
    }

    if (line.startsWith(">")) {
      flushParagraph();
      flushList();
      quote.push(line.replace(/^>\s?/, ""));
      return;
    }

    if (/^[-*]\s+/.test(line)) {
      flushParagraph();
      flushQuote();
      list.push(line.replace(/^[-*]\s+/, ""));
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
  flushList();
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

function escapeHtml(value) {
  return String(value || "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function copyToClipboard(text) {
  navigator.clipboard.writeText(text)
    .then(() => showToast("Prompt copiado."))
    .catch(() => showToast("Não foi possível copiar automaticamente."));
}

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

function showToast(message) {
  const toast = document.getElementById("toast");

  toast.textContent = message;
  toast.classList.add("show");

  clearTimeout(showToast.timeout);

  showToast.timeout = setTimeout(() => {
    toast.classList.remove("show");
  }, 2600);
}

function getExampleText() {
  return `[TITULO_RELATORIO]
Relatório de Revisão Editorial

[SUBTITULO_RELATORIO]
Revisão editorial extremamente detalhada

[OBRA]
Sancta Corrupta

[AUTOR]
Mayke Arrais

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
Vocação épica combinada com reconstrução emocional.

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

A clareza narrativa é razoável. O leitor consegue acompanhar o objetivo principal, mas a quantidade de nomes, raças, cidades, deuses, mestres, relíquias, demônios, locais e sistemas mágicos pode criar sobrecarga. A revisão deve preservar a ambição, mas controlar melhor a entrada de informações.

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
