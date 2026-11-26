// data.js — every figure on this site, with its source and year.
// All figures are real published statistics for Singapore. Nothing here is
// estimated, interpolated or invented: each value names the publisher and the
// reference year, and the Sources page lists the full publication for each.

// Headline indicators shown on the home dashboard.
export const HEADLINES = [
  { label: 'Total population', value: '6.04m', detail: 'June 2024', source: 'Dept. of Statistics Singapore, Population Trends 2024', year: 2024 },
  { label: 'GDP, current prices', value: 'S$731.4bn', detail: '2024', source: 'Ministry of Trade and Industry, Economic Survey of Singapore 2024', year: 2024 },
  { label: 'GDP per capita', value: 'US$90,674', detail: '2024', source: 'IMF World Economic Outlook / Dept. of Statistics Singapore', year: 2024 },
  { label: 'Real GDP growth', value: '+4.4%', detail: '2024', source: 'Ministry of Trade and Industry, Economic Survey of Singapore 2024', year: 2024 },
  { label: 'Unemployment rate', value: '2.0%', detail: 'overall, 2024', source: 'Ministry of Manpower, Labour Market Report 2024', year: 2024 },
  { label: 'Consumer price inflation', value: '2.4%', detail: '2024', source: 'Dept. of Statistics Singapore, Consumer Price Index 2024', year: 2024 },
  { label: 'Life expectancy at birth', value: '84.1 years', detail: '2023', source: 'Dept. of Statistics Singapore, Population Trends 2024', year: 2023 },
  { label: 'Median household income', value: 'S$10,869', detail: 'per month from work, 2024', source: 'Dept. of Statistics Singapore, Key Household Income Trends 2025', year: 2024 },
];

// Annual series, 2020-2024.
export const SERIES = {
  population: { // total population at end-June, millions — Dept. of Statistics Singapore
    label: 'Total population (millions, end-June)',
    source: 'Dept. of Statistics Singapore, Population Trends 2024',
    years: [2020, 2021, 2022, 2023, 2024],
    values: [5.69, 5.45, 5.64, 5.92, 6.04],
  },
  gdpGrowth: { // real GDP growth, % — Ministry of Trade and Industry
    label: 'Real GDP growth (% per year)',
    source: 'Ministry of Trade and Industry, Economic Survey of Singapore 2024',
    years: [2020, 2021, 2022, 2023, 2024],
    values: [-3.8, 9.7, 3.8, 1.8, 4.4],
  },
  cpi: { // CPI inflation, % — Dept. of Statistics Singapore
    label: 'Consumer price inflation (% per year)',
    source: 'Dept. of Statistics Singapore, Consumer Price Index 2024',
    years: [2020, 2021, 2022, 2023, 2024],
    values: [-0.2, 2.3, 6.1, 4.8, 2.4],
  },
  unemployment: { // overall unemployment rate, % — Ministry of Manpower
    label: 'Unemployment rate, overall (% of labour force)',
    source: 'Ministry of Manpower, Labour Market Report 2024',
    years: [2020, 2021, 2022, 2023, 2024],
    values: [3.0, 2.6, 2.1, 1.9, 2.0],
  },
};

// Economy yearbook: one row per year, shown by the year selector.
export const ECONOMY_YEARS = {
  2020: { gdpNominal: 'S$466.6bn', gdpGrowth: '-3.8%', cpi: '-0.2%', unemployment: '3.0%', trade: 'S$909.8bn', note: 'COVID-19 recession: the economy shrank 3.8%, the worst year on record.' },
  2021: { gdpNominal: 'S$566.5bn', gdpGrowth: '+9.7%', cpi: '+2.3%', unemployment: '2.6%', trade: 'S$1,085.6bn', note: 'Sharp rebound as global demand for electronics surged.' },
  2022: { gdpNominal: 'S$653.4bn', gdpGrowth: '+3.8%', cpi: '+6.1%', unemployment: '2.1%', trade: 'S$1,293.3bn', note: 'Inflation peaked at 6.1% as energy and food prices jumped.' },
  2023: { gdpNominal: 'S$678.7bn', gdpGrowth: '+1.8%', cpi: '+4.8%', unemployment: '1.9%', trade: 'S$1,203.2bn', note: 'Growth slowed with the global electronics downturn.' },
  2024: { gdpNominal: 'S$731.4bn', gdpGrowth: '+4.4%', cpi: '+2.4%', unemployment: '2.0%', trade: 'S$1,238.6bn', note: 'Growth recovered to 4.4% on an electronics upturn and strong consumption.' },
};

// Shares of nominal value added, 2024 — Ministry of Trade and Industry,
// Economic Survey of Singapore 2024, "Structure of the economy".
export const SECTORS = [
  { name: 'Wholesale trade', share: 20.3 },
  { name: 'Manufacturing', share: 17.3 },
  { name: 'Finance & insurance', share: 14.3 },
  { name: 'Other services', share: 9.6 },
  { name: 'Transportation & storage', share: 9.1 },
  { name: 'Information & communications', share: 6.0 },
  { name: 'All other industries', share: 23.4 },
];

// Population composition, June 2024 — Dept. of Statistics Singapore.
export const POPULATION = {
  total: '6.04 million',
  residents: '4.18 million',
  citizens: '3.64 million',
  prs: '0.54 million',
  nonResidents: '1.86 million',
  age: [
    { group: '0–14 years', share: 11.7 },
    { group: '15–64 years', share: 74.6 },
    { group: '65 years & over', share: 13.7 },
  ],
  ethnic: [
    { group: 'Chinese', share: 74.3 },
    { group: 'Malay', share: 13.5 },
    { group: 'Indian', share: 9.0 },
    { group: 'Other ethnic groups', share: 3.2 },
  ],
  facts: [
    { label: 'Median age (residents)', value: '42.8 years', source: 'Dept. of Statistics Singapore, Population Trends 2024', year: 2024 },
    { label: 'Total fertility rate', value: '0.97', source: 'Dept. of Statistics Singapore / World Bank, World Development Indicators', year: 2024 },
    { label: 'Residents aged 65 & over', value: '18.0%', source: 'Dept. of Statistics Singapore, Population Trends 2024', year: 2024 },
    { label: 'Land area', value: '734 km²', source: 'Dept. of Statistics Singapore, Yearbook of Statistics Singapore 2025', year: 2024 },
    { label: 'Population density', value: '8,223 per km²', source: 'Calculated from Dept. of Statistics Singapore figures', year: 2024 },
    { label: 'Life expectancy, men', value: '80.7 years', source: 'Dept. of Statistics Singapore, Population Trends 2024', year: 2023 },
    { label: 'Life expectancy, women', value: '85.2 years', source: 'Dept. of Statistics Singapore, Population Trends 2024', year: 2023 },
    { label: 'Infant mortality', value: '2.0 per 1,000 live births', source: 'Dept. of Statistics Singapore / World Bank', year: 2023 },
  ],
};

// Society: education, health, housing, income.
export const SOCIETY = {
  education: [
    { label: 'Literacy rate, age 15+', value: '97.6%', source: 'Dept. of Statistics Singapore, Population Trends 2024', year: 2024 },
    { label: 'Mean years of schooling, age 25+', value: '11.9 years', source: 'Dept. of Statistics Singapore, Yearbook of Statistics Singapore 2025', year: 2023 },
    { label: 'Human Development Index', value: '0.946', source: 'UN Development Programme, Human Development Report 2025', year: 2023 },
    { label: 'Internet users', value: '94.4% of population', source: 'World Bank, World Development Indicators', year: 2024 },
  ],
  health: [
    { label: 'Life expectancy at birth', value: '84.1 years', source: 'Dept. of Statistics Singapore, Population Trends 2024', year: 2023 },
    { label: 'Health expenditure', value: '6.2% of GDP', source: 'World Bank, World Development Indicators', year: 2022 },
    { label: 'Physicians', value: '2.5 per 1,000 people', source: 'World Bank, World Development Indicators', year: 2022 },
    { label: 'Infant mortality', value: '2.0 per 1,000 live births', source: 'Dept. of Statistics Singapore / World Bank', year: 2023 },
  ],
  housingIncome: [
    { label: 'Home ownership (resident households)', value: '90.8%', source: 'Dept. of Statistics Singapore, Key Indicators of Resident Households', year: 2024 },
    { label: 'Households in HDB flats', value: '78.0%', source: 'Dept. of Statistics Singapore, Key Indicators of Resident Households', year: 2024 },
    { label: 'Median household income from work', value: 'S$10,869 / month', source: 'Dept. of Statistics Singapore, Key Household Income Trends 2025', year: 2024 },
    { label: 'Gini coefficient (after transfers)', value: '0.371', source: 'Dept. of Statistics Singapore, Key Household Income Trends 2025', year: 2024 },
    { label: 'Median gross monthly income, full-time residents', value: 'S$5,500', source: 'Ministry of Manpower, Comprehensive Labour Force Survey 2024', year: 2024 },
    { label: 'Employment rate, residents 25–64', value: '83.4%', source: 'Ministry of Manpower, Comprehensive Labour Force Survey 2024', year: 2024 },
  ],
};

// The explorer table: every indicator in one place.
export const EXPLORER_ROWS = [
  ...HEADLINES.map((h) => ({ indicator: h.label, value: h.value, unit: h.detail, category: 'Headline', source: h.source, year: h.year })),
  { indicator: 'Total population', value: '6.04 million', unit: 'end-June', category: 'Population', source: 'Dept. of Statistics Singapore, Population Trends 2024', year: 2024 },
  { indicator: 'Resident population', value: '4.18 million', unit: 'end-June', category: 'Population', source: 'Dept. of Statistics Singapore, Population Trends 2024', year: 2024 },
  { indicator: 'Citizens', value: '3.64 million', unit: 'end-June', category: 'Population', source: 'Dept. of Statistics Singapore, Population Trends 2024', year: 2024 },
  { indicator: 'Permanent residents', value: '0.54 million', unit: 'end-June', category: 'Population', source: 'Dept. of Statistics Singapore, Population Trends 2024', year: 2024 },
  { indicator: 'Non-residents', value: '1.86 million', unit: 'end-June', category: 'Population', source: 'Dept. of Statistics Singapore, Population Trends 2024', year: 2024 },
  { indicator: 'Population aged 0–14', value: '11.7%', unit: 'of total population', category: 'Population', source: 'World Bank, World Development Indicators', year: 2024 },
  { indicator: 'Population aged 15–64', value: '74.6%', unit: 'of total population', category: 'Population', source: 'World Bank, World Development Indicators', year: 2024 },
  { indicator: 'Population aged 65 & over', value: '13.7%', unit: 'of total population', category: 'Population', source: 'World Bank, World Development Indicators', year: 2024 },
  { indicator: 'Residents aged 65 & over', value: '18.0%', unit: 'of residents', category: 'Population', source: 'Dept. of Statistics Singapore, Population Trends 2024', year: 2024 },
  { indicator: 'Median age (residents)', value: '42.8 years', unit: 'years', category: 'Population', source: 'Dept. of Statistics Singapore, Population Trends 2024', year: 2024 },
  { indicator: 'Total fertility rate', value: '0.97', unit: 'children per woman', category: 'Population', source: 'Dept. of Statistics Singapore / World Bank', year: 2024 },
  { indicator: 'Land area', value: '734 km²', unit: 'square kilometres', category: 'Population', source: 'Dept. of Statistics Singapore, Yearbook of Statistics Singapore 2025', year: 2024 },
  { indicator: 'Population density', value: '8,223 per km²', unit: 'people per km²', category: 'Population', source: 'Calculated from Dept. of Statistics Singapore figures', year: 2024 },
  { indicator: 'Chinese (residents)', value: '74.3%', unit: 'of residents', category: 'Population', source: 'Dept. of Statistics Singapore, Population Trends 2024', year: 2024 },
  { indicator: 'Malay (residents)', value: '13.5%', unit: 'of residents', category: 'Population', source: 'Dept. of Statistics Singapore, Population Trends 2024', year: 2024 },
  { indicator: 'Indian (residents)', value: '9.0%', unit: 'of residents', category: 'Population', source: 'Dept. of Statistics Singapore, Population Trends 2024', year: 2024 },
  { indicator: 'GDP, current prices', value: 'S$731.4 billion', unit: 'Singapore dollars', category: 'Economy', source: 'Ministry of Trade and Industry, Economic Survey of Singapore 2024', year: 2024 },
  { indicator: 'GDP per capita', value: 'US$90,674', unit: 'US dollars', category: 'Economy', source: 'IMF World Economic Outlook / Dept. of Statistics Singapore', year: 2024 },
  { indicator: 'GDP per capita (PPP)', value: 'US$150,689', unit: 'international dollars', category: 'Economy', source: 'IMF World Economic Outlook', year: 2024 },
  { indicator: 'GNI per capita', value: 'S$101,464', unit: 'Singapore dollars', category: 'Economy', source: 'Ministry of Trade and Industry, Economic Survey of Singapore 2024', year: 2024 },
  { indicator: 'Real GDP growth', value: '+4.4%', unit: 'per year', category: 'Economy', source: 'Ministry of Trade and Industry, Economic Survey of Singapore 2024', year: 2024 },
  { indicator: 'Consumer price inflation', value: '2.4%', unit: 'per year', category: 'Economy', source: 'Dept. of Statistics Singapore, Consumer Price Index 2024', year: 2024 },
  { indicator: 'Unemployment rate (overall)', value: '2.0%', unit: 'of labour force', category: 'Economy', source: 'Ministry of Manpower, Labour Market Report 2024', year: 2024 },
  { indicator: 'Unemployment rate (resident)', value: '2.7%', unit: 'of resident labour force', category: 'Economy', source: 'Ministry of Manpower, Labour Market Report 2024', year: 2024 },
  { indicator: 'Total merchandise trade', value: 'S$1,238.6 billion', unit: 'Singapore dollars', category: 'Economy', source: 'Dept. of Statistics Singapore, Yearbook of Statistics Singapore 2025', year: 2024 },
  { indicator: 'Services share of value added', value: '73.2%', unit: 'of nominal value added', category: 'Economy', source: 'Ministry of Trade and Industry, Economic Survey of Singapore 2024', year: 2024 },
  { indicator: 'Manufacturing share of value added', value: '17.3%', unit: 'of nominal value added', category: 'Economy', source: 'Ministry of Trade and Industry, Economic Survey of Singapore 2024', year: 2024 },
  { indicator: 'Wholesale trade share of value added', value: '20.3%', unit: 'of nominal value added', category: 'Economy', source: 'Ministry of Trade and Industry, Economic Survey of Singapore 2024', year: 2024 },
  { indicator: 'Total employment', value: '4.05 million', unit: 'persons, end-year', category: 'Economy', source: 'Ministry of Trade and Industry, Economic Survey of Singapore 2024', year: 2024 },
  { indicator: 'Labour force', value: '2.45 million', unit: 'residents', category: 'Economy', source: 'Ministry of Manpower, Comprehensive Labour Force Survey 2024', year: 2024 },
  { indicator: 'Life expectancy at birth', value: '84.1 years', unit: 'years', category: 'Society', source: 'Dept. of Statistics Singapore, Population Trends 2024', year: 2023 },
  { indicator: 'Literacy rate, age 15+', value: '97.6%', unit: 'of residents', category: 'Society', source: 'Dept. of Statistics Singapore, Population Trends 2024', year: 2024 },
  { indicator: 'Mean years of schooling, age 25+', value: '11.9 years', unit: 'years', category: 'Society', source: 'Dept. of Statistics Singapore, Yearbook of Statistics Singapore 2025', year: 2023 },
  { indicator: 'Human Development Index', value: '0.946', unit: 'index 0–1', category: 'Society', source: 'UN Development Programme, Human Development Report 2025', year: 2023 },
  { indicator: 'Health expenditure', value: '6.2% of GDP', unit: 'current health expenditure', category: 'Society', source: 'World Bank, World Development Indicators', year: 2022 },
  { indicator: 'Physicians', value: '2.5 per 1,000 people', unit: 'per 1,000 people', category: 'Society', source: 'World Bank, World Development Indicators', year: 2022 },
  { indicator: 'Infant mortality', value: '2.0 per 1,000 live births', unit: 'per 1,000 live births', category: 'Society', source: 'Dept. of Statistics Singapore / World Bank', year: 2023 },
  { indicator: 'Internet users', value: '94.4%', unit: 'of population', category: 'Society', source: 'World Bank, World Development Indicators', year: 2024 },
  { indicator: 'Home ownership', value: '90.8%', unit: 'of resident households', category: 'Society', source: 'Dept. of Statistics Singapore, Key Indicators of Resident Households', year: 2024 },
  { indicator: 'Households in HDB flats', value: '78.0%', unit: 'of resident households', category: 'Society', source: 'Dept. of Statistics Singapore, Key Indicators of Resident Households', year: 2024 },
  { indicator: 'Median household income from work', value: 'S$10,869 / month', unit: 'Singapore dollars per month', category: 'Society', source: 'Dept. of Statistics Singapore, Key Household Income Trends 2025', year: 2024 },
  { indicator: 'Gini coefficient (after transfers)', value: '0.371', unit: 'index 0–1', category: 'Society', source: 'Dept. of Statistics Singapore, Key Household Income Trends 2025', year: 2024 },
  { indicator: 'Median gross monthly income, full-time residents', value: 'S$5,500', unit: 'Singapore dollars per month', category: 'Society', source: 'Ministry of Manpower, Comprehensive Labour Force Survey 2024', year: 2024 },
  { indicator: 'Employment rate, residents 25–64', value: '83.4%', unit: 'of residents 25–64', category: 'Society', source: 'Ministry of Manpower, Comprehensive Labour Force Survey 2024', year: 2024 },
];

// Publications behind the figures, for the Sources page.
export const SOURCES = [
  { publisher: 'Dept. of Statistics Singapore', publication: 'Population Trends 2024', what: 'Total and resident population, age structure, ethnicity, fertility, life expectancy, literacy' },
  { publisher: 'Dept. of Statistics Singapore', publication: 'Yearbook of Statistics Singapore 2025', what: 'Land area, total merchandise trade, mean years of schooling' },
  { publisher: 'Dept. of Statistics Singapore', publication: 'Key Household Income Trends 2025', what: 'Median household income from work, Gini coefficient' },
  { publisher: 'Dept. of Statistics Singapore', publication: 'Key Indicators of Resident Households 2024', what: 'Home ownership, households in HDB flats' },
  { publisher: 'Dept. of Statistics Singapore', publication: 'Consumer Price Index, 2024', what: 'Annual CPI inflation series' },
  { publisher: 'Ministry of Trade and Industry', publication: 'Economic Survey of Singapore 2024', what: 'Nominal GDP, real growth, GNI per capita, industry shares, employment' },
  { publisher: 'Ministry of Manpower', publication: 'Labour Market Report 2024', what: 'Overall and resident unemployment rates' },
  { publisher: 'Ministry of Manpower', publication: 'Comprehensive Labour Force Survey 2024', what: 'Labour force, median income, employment rate 25–64' },
  { publisher: 'International Monetary Fund', publication: 'World Economic Outlook, October 2025', what: 'GDP per capita in US dollars and in PPP terms' },
  { publisher: 'World Bank', publication: 'World Development Indicators (accessed November 2026)', what: 'Age shares, internet users, health expenditure, physicians, fertility' },
  { publisher: 'UN Development Programme', publication: 'Human Development Report 2025', what: 'Human Development Index' },
];
