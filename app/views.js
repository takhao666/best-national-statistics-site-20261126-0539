// views.js — one renderer per page of the site. Each page is plain HTML
// built from data.js and the SVG charts in charts.js; the router in main.js
// swaps them in on hash change.

import { HEADLINES, SERIES, ECONOMY_YEARS, SECTORS, POPULATION, SOCIETY, EXPLORER_ROWS, SOURCES } from './data.js';
import { lineChart, barChart, hbarChart, donutChart } from './charts.js';

export function esc(text) {
  return String(text).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function srcLine(source, year) {
  // The year is part of most publication names already ("Population Trends
  // 2024"); only add it when the source text does not name it.
  const suffix = String(source).includes(String(year)) ? '' : ` · ${year}`;
  return `<p class="src">Source: ${esc(source)}${suffix}</p>`;
}

function statCard(h) {
  const suffix = String(h.source).includes(String(h.year)) ? '' : ` · ${h.year}`;
  return `<article class="stat"><p class="stat-label">${esc(h.label)}</p><p class="stat-value">${esc(h.value)}</p><p class="stat-detail">${esc(h.detail)}</p><p class="src">${esc(h.source)}${suffix}</p></article>`;
}

function pageHead(kicker, title, intro) {
  return `<p class="kicker">${esc(kicker)}</p><h1>${esc(title)}</h1><p class="lede">${intro}</p>`;
}

// --- Home -----------------------------------------------------------------
export function homeView() {
  const cards = HEADLINES.map(statCard).join('');
  return `
  ${pageHead('Singapore · National statistics', 'Singapore in figures', 'The country at a glance, from the official statistics: how many people live here, what the economy makes, what life costs, and how long people live. Every figure names its source and year.')}
  <section aria-label="Headline indicators"><div class="stat-grid">${cards}</div></section>
  <div class="two-col">
    <section class="panel"><h2>Real GDP growth, 2020–2024</h2>
      ${barChart(SERIES.gdpGrowth, { format: (v) => `${v > 0 ? '+' : ''}${v}%` })}
      ${srcLine(SERIES.gdpGrowth.source, 2024)}
      <p>The economy shrank 3.8% in the COVID year of 2020, rebounded 9.7% in 2021, and grew 4.4% in 2024.</p>
    </section>
    <section class="panel"><h2>Total population, 2020–2024</h2>
      ${lineChart(SERIES.population, { format: (v) => `${v}m`, yLabel: 'millions' })}
      ${srcLine(SERIES.population.source, 2024)}
      <p>Population passed 6 million in 2024: 4.18 million residents and 1.86 million non-residents.</p>
    </section>
  </div>
  <section class="panel"><h2>Explore the statistics</h2>
    <div class="explore-grid">
      <a class="explore-card" href="#/population"><strong>Population</strong><span>6.04 million people, age structure, ethnicity, fertility</span></a>
      <a class="explore-card" href="#/economy"><strong>Economy</strong><span>GDP, trade, inflation, jobs — year by year since 2020</span></a>
      <a class="explore-card" href="#/society"><strong>Society</strong><span>Education, health, housing and household income</span></a>
      <a class="explore-card" href="#/explorer"><strong>Data explorer</strong><span>Every indicator in one searchable, sortable table</span></a>
    </div>
  </section>
  <section class="panel"><h2>Latest releases</h2>
    <ul class="releases">
      <li><strong>Population Trends 2024</strong> — total population 6.04 million at end-June 2024; total fertility rate 0.97.</li>
      <li><strong>Economic Survey of Singapore 2024</strong> — GDP S$731.4 billion; real growth 4.4%; GNI per capita S$101,464.</li>
      <li><strong>Key Household Income Trends 2025</strong> — median household income from work S$10,869 a month; Gini 0.371.</li>
      <li><strong>Labour Market Report 2024</strong> — overall unemployment 2.0%; resident unemployment 2.7%.</li>
    </ul>
    <p class="src">Summarised from the publications listed on the <a href="#/sources">Sources &amp; methods</a> page.</p>
  </section>`;
}

// --- Population -------------------------------------------------------------
export function populationView(tab = 'age') {
  const age = tab === 'age';
  const tabBtn = (id, label, active) => `<button class="tab ${active ? 'active' : ''}" data-tab="${id}" aria-pressed="${active}">${label}</button>`;
  const body = age ? `
    <section class="panel"><h2>Age structure, 2024</h2>
      ${hbarChart(POPULATION.age)}
      ${srcLine('World Bank, World Development Indicators', 2024)}
      <p>Nearly three in four people are of working age (15–64). Residents aged 65 and over reached 18.0% in 2024 — about one in five residents.</p>
    </section>
    <section class="panel"><h2>Population trend, 2020–2024</h2>
      ${lineChart(SERIES.population, { format: (v) => `${v}m`, yLabel: 'millions' })}
      ${srcLine(SERIES.population.source, 2024)}
      <p>Population dipped to 5.45 million in 2021, when pandemic border controls cut non-resident numbers, then recovered past 6 million by 2024.</p>
    </section>`
  : `
    <section class="panel"><h2>Who lives here, June 2024</h2>
      <div class="stat-grid">
        <article class="stat"><p class="stat-label">Residents</p><p class="stat-value">4.18m</p><p class="stat-detail">Citizens 3.64m · Permanent residents 0.54m</p>${srcLine('Dept. of Statistics Singapore, Population Trends 2024', 2024)}</article>
        <article class="stat"><p class="stat-label">Non-residents</p><p class="stat-value">1.86m</p><p class="stat-detail">Work-permit, dependant and other pass holders</p>${srcLine('Dept. of Statistics Singapore, Population Trends 2024', 2024)}</article>
      </div>
    </section>
    <section class="panel"><h2>Ethnic composition of residents, 2024</h2>
      ${hbarChart(POPULATION.ethnic)}
      ${srcLine('Dept. of Statistics Singapore, Population Trends 2024', 2024)}
    </section>`;
  const facts = POPULATION.facts.map((f) => `<article class="stat"><p class="stat-label">${esc(f.label)}</p><p class="stat-value">${esc(f.value)}</p>${srcLine(f.source, f.year)}</article>`).join('');
  return `
  ${pageHead('People', 'Population &amp; demographics', '6.04 million people at end-June 2024 — who they are, how old they are, and how the population is changing.')}
  <div class="tabs" role="group" aria-label="Population views">${tabBtn('age', 'Age structure', age)}${tabBtn('people', 'Who lives here', !age)}</div>
  ${body}
  <section aria-label="Population facts"><h2>Key facts</h2><div class="stat-grid">${facts}</div></section>`;
}

// --- Economy ----------------------------------------------------------------
export function economyView(year = 2024) {
  const y = ECONOMY_YEARS[year] ?? ECONOMY_YEARS[2024];
  const opts = Object.keys(ECONOMY_YEARS).map((yr) => `<option value="${yr}" ${Number(yr) === year ? 'selected' : ''}>${yr}</option>`).join('');
  return `
  ${pageHead('Money', 'Economy', 'What Singapore makes, trades and earns — and what it costs to live here. Pick a year to see that year’s economy.')}
  <section class="panel"><h2>Economy in <label for="year-select"> <select id="year-select" class="year-select">${opts}</select></label></h2>
    <div class="stat-grid" id="year-stats">
      <article class="stat"><p class="stat-label">GDP, current prices</p><p class="stat-value">${y.gdpNominal}</p>${srcLine('Ministry of Trade and Industry, Economic Survey of Singapore 2024', year)}</article>
      <article class="stat"><p class="stat-label">Real GDP growth</p><p class="stat-value">${y.gdpGrowth}</p>${srcLine('Ministry of Trade and Industry, Economic Survey of Singapore 2024', year)}</article>
      <article class="stat"><p class="stat-label">Inflation (CPI)</p><p class="stat-value">${y.cpi}</p>${srcLine('Dept. of Statistics Singapore, Consumer Price Index', year)}</article>
      <article class="stat"><p class="stat-label">Unemployment</p><p class="stat-value">${y.unemployment}</p>${srcLine('Ministry of Manpower, Labour Market Report', year)}</article>
      <article class="stat"><p class="stat-label">Total merchandise trade</p><p class="stat-value">${y.trade}</p>${srcLine('Dept. of Statistics Singapore, Yearbook of Statistics Singapore', year)}</article>
    </div>
    <p id="year-note">${esc(y.note)}</p>
  </section>
  <div class="two-col">
    <section class="panel"><h2>Real GDP growth, 2020–2024</h2>
      ${barChart(SERIES.gdpGrowth, { format: (v) => `${v > 0 ? '+' : ''}${v}%` })}
      ${srcLine(SERIES.gdpGrowth.source, 2024)}
    </section>
    <section class="panel"><h2>Inflation (CPI), 2020–2024</h2>
      ${lineChart(SERIES.cpi, { color: '#b45309', format: (v) => `${v}%`, yLabel: 'percent per year' })}
      ${srcLine(SERIES.cpi.source, 2024)}
      <p>Inflation peaked at 6.1% in 2022 — the highest in over a decade — then eased to 2.4% in 2024.</p>
    </section>
  </div>
  <div class="two-col">
    <section class="panel"><h2>What the economy is made of, 2024</h2>
      ${donutChart(SECTORS, { center: '73.2%' })}
      <p>Services produce 73.2% of nominal value added; goods-producing industries 22.7%.</p>
      ${srcLine('Ministry of Trade and Industry, Economic Survey of Singapore 2024', 2024)}
    </section>
    <section class="panel"><h2>Unemployment, 2020–2024</h2>
      ${lineChart(SERIES.unemployment, { format: (v) => `${v}%`, yLabel: 'percent of labour force' })}
      ${srcLine(SERIES.unemployment.source, 2024)}
      <p>Unemployment rose to 3.0% in 2020 and has held at about 2% since 2022 — close to full employment.</p>
    </section>
  </div>`;
}

// --- Society ----------------------------------------------------------------
function factGrid(title, rows) {
  return `<section class="panel"><h2>${esc(title)}</h2><div class="stat-grid">${rows.map((f) => `<article class="stat"><p class="stat-label">${esc(f.label)}</p><p class="stat-value">${esc(f.value)}</p>${srcLine(f.source, f.year)}</article>`).join('')}</div></section>`;
}

export function societyView() {
  return `
  ${pageHead('People’s lives', 'Society', 'Schooling, health, homes and household budgets — the statistics that describe daily life in Singapore.')}
  ${factGrid('Education', SOCIETY.education)}
  ${factGrid('Health', SOCIETY.health)}
  ${factGrid('Housing & income', SOCIETY.housingIncome)}
  <section class="panel"><h2>Life expectancy, 2023</h2>
    ${hbarChart([{ group: 'Women', share: 85.2 }, { group: 'Men', share: 80.7 }], { format: (v) => `${v} years` })}
    ${srcLine('Dept. of Statistics Singapore, Population Trends 2024', 2023)}
    <p>A child born in Singapore in 2023 could expect to live 84.1 years — among the longest lives in the world. Women live about 4.5 years longer than men.</p>
  </section>`;
}

// --- Data explorer ----------------------------------------------------------
let explorerState = { query: '', category: 'All', sortKey: 'indicator', sortDir: 1 };

export function explorerView() {
  const cats = ['All', ...new Set(EXPLORER_ROWS.map((r) => r.category))];
  const opts = cats.map((c) => `<option ${c === explorerState.category ? 'selected' : ''}>${c}</option>`).join('');
  return `
  ${pageHead('All the numbers', 'Data explorer', 'Every indicator on this site in one table. Search by name, filter by topic, or click a column heading to sort.')}
  <section class="panel">
    <div class="explorer-controls">
      <label>Search <input id="explorer-search" type="search" placeholder="Try “GDP”, “income”, “life”…" value="${esc(explorerState.query)}"></label>
      <label>Topic <select id="explorer-category">${opts}</select></label>
    </div>
    <p id="explorer-count" aria-live="polite"></p>
    <div class="table-wrap"><table id="explorer-table">
      <thead><tr>
        <th><button data-sort="indicator">Indicator</button></th>
        <th><button data-sort="value">Value</button></th>
        <th><button data-sort="category">Topic</button></th>
        <th><button data-sort="source">Source</button></th>
        <th><button data-sort="year">Year</button></th>
      </tr></thead>
      <tbody id="explorer-body"></tbody>
    </table></div>
    <p class="src">All values as published by the source named in each row. See <a href="#/sources">Sources &amp; methods</a> for the full publications.</p>
  </section>`;
}

export function explorerRows() {
  const q = explorerState.query.trim().toLowerCase();
  let rows = EXPLORER_ROWS.filter((r) => (explorerState.category === 'All' || r.category === explorerState.category)
    && (!q || `${r.indicator} ${r.value} ${r.source}`.toLowerCase().includes(q)));
  // De-duplicate by indicator name (headlines also appear as topic rows).
  const seen = new Set();
  rows = rows.filter((r) => (seen.has(r.indicator) ? false : (seen.add(r.indicator), true)));
  rows.sort((a, b) => {
    const k = explorerState.sortKey;
    const cmp = String(a[k]).localeCompare(String(b[k]), undefined, { numeric: true });
    return cmp * explorerState.sortDir;
  });
  return rows;
}

export function renderExplorerRows() {
  const rows = explorerRows();
  const body = document.getElementById('explorer-body');
  const count = document.getElementById('explorer-count');
  if (!body) return;
  body.innerHTML = rows.map((r) => `<tr><td>${esc(r.indicator)}</td><td><strong>${esc(r.value)}</strong><br><span class="muted">${esc(r.unit)}</span></td><td>${esc(r.category)}</td><td>${esc(r.source)}</td><td>${r.year}</td></tr>`).join('')
    || '<tr><td colspan="5">No indicators match that search. Try a shorter word, or clear the topic filter.</td></tr>';
  if (count) count.textContent = `Showing ${rows.length} of ${EXPLORER_ROWS.length} indicators.`;
}

export function setExplorerState(patch) {
  Object.assign(explorerState, patch);
}
export function getExplorerState() {
  return explorerState;
}

// --- Sources ----------------------------------------------------------------
export function sourcesView() {
  const rows = SOURCES.map((s) => `<tr><td><strong>${esc(s.publisher)}</strong></td><td>${esc(s.publication)}</td><td>${esc(s.what)}</td></tr>`).join('');
  return `
  ${pageHead('How we know', 'Sources &amp; methods', 'Every figure on this site comes from a published official statistic. This page lists each publication, what it was used for, and how the figures were put together.')}
  <section class="panel"><h2>Publications used</h2>
    <div class="table-wrap"><table><thead><tr><th>Publisher</th><th>Publication</th><th>Used for</th></tr></thead><tbody>${rows}</tbody></table></div>
  </section>
  <section class="panel"><h2>Methods &amp; notes</h2>
    <ul class="notes">
      <li><strong>Reference years.</strong> Each figure is labelled with the year it describes. Most figures are for 2024, the latest full year published; life expectancy and health spending use the latest available year (2023 and 2022).</li>
      <li><strong>Population.</strong> “Total population” counts everyone in Singapore at end-June: residents (citizens and permanent residents) plus non-residents on work and other passes.</li>
      <li><strong>GDP.</strong> Nominal GDP is at current market prices in Singapore dollars. Real growth is year-on-year change in chained (2015) dollars. Industry shares are shares of nominal value added, which exclude taxes less subsidies on products — so they do not sum to GDP shares.</li>
      <li><strong>Density.</strong> Population density is calculated from the published total population and land area (6.04 million ÷ 734 km²).</li>
      <li><strong>Rounding.</strong> Figures are shown as published; percentages may not sum to 100 because of rounding.</li>
      <li><strong>Revisions.</strong> Official statistics are revised. Figures here are as published in the editions listed above, checked in November 2026.</li>
    </ul>
  </section>
  <section class="panel"><h2>About this site</h2>
    <p><strong>Singapore in Figures</strong> is an independent presentation of Singapore’s official statistics, built to make the numbers easy to find and compare. It is not affiliated with, or endorsed by, the Department of Statistics Singapore or any government agency. All figures are reproduced with their source and year; the wording, design and charts are original.</p>
    <p class="src">Data checked November 2026. Figures are free to reuse with attribution to the source named beside each one.</p>
  </section>`;
}
