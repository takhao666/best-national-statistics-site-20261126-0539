// main.js — router and page interactions. Hash routes only, no network:
// #/ (home) #/population #/economy #/society #/explorer #/sources.

import { homeView, populationView, economyView, societyView, explorerView, sourcesView, renderExplorerRows, setExplorerState, getExplorerState } from './views.js';
import { ECONOMY_YEARS } from './data.js';

const app = document.getElementById('app');
const navLinks = [...document.querySelectorAll('.nav-link')];

function currentRoute() {
  const hash = location.hash.replace(/^#\/?/, '');
  const [page, param] = hash.split('/');
  return { page: page || '', param: param || '' };
}

function render() {
  const { page, param } = currentRoute();
  let html;
  if (page === 'population') html = populationView(param === 'people' ? 'people' : 'age');
  else if (page === 'economy') html = economyView(Number(param) || 2024);
  else if (page === 'society') html = societyView();
  else if (page === 'explorer') html = explorerView();
  else if (page === 'sources') html = sourcesView();
  else html = homeView();
  app.innerHTML = html;
  navLinks.forEach((a) => {
    const href = a.getAttribute('href');
    const target = href === '#/' ? '' : href.replace(/^#\//, '');
    a.classList.toggle('active', target === page);
    if (target === page) a.setAttribute('aria-current', 'page');
    else a.removeAttribute('aria-current');
  });
  if (page === 'explorer') wireExplorer();
  if (page === 'economy') wireEconomy();
  if (page === 'population') wirePopulation();
  window.scrollTo(0, 0);
}

function wirePopulation() {
  app.querySelectorAll('.tab').forEach((btn) => {
    btn.addEventListener('click', () => {
      location.hash = `#/population/${btn.dataset.tab === 'people' ? 'people' : 'age'}`;
    });
  });
}

function wireEconomy() {
  const select = document.getElementById('year-select');
  if (!select) return;
  select.addEventListener('change', () => {
    location.hash = `#/economy/${select.value}`;
  });
}

function wireExplorer() {
  const search = document.getElementById('explorer-search');
  const category = document.getElementById('explorer-category');
  const state = getExplorerState();
  search.addEventListener('input', () => {
    setExplorerState({ query: search.value });
    renderExplorerRows();
  });
  category.addEventListener('change', () => {
    setExplorerState({ category: category.value });
    renderExplorerRows();
  });
  app.querySelectorAll('th button').forEach((btn) => {
    btn.addEventListener('click', () => {
      const key = btn.dataset.sort;
      const dir = state.sortKey === key ? -state.sortDir : 1;
      setExplorerState({ sortKey: key, sortDir: dir });
      renderExplorerRows();
      app.querySelectorAll('th button').forEach((b) => b.classList.remove('sorted'));
      btn.classList.add('sorted');
      btn.textContent = btn.textContent.replace(/ [▲▼]$/, '') + (dir === 1 ? ' ▲' : ' ▼');
    });
  });
  renderExplorerRows();
}

window.addEventListener('hashchange', render);
render();
