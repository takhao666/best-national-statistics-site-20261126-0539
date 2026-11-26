// charts.js — small hand-rolled SVG charts. No library, no network: every
// chart is drawn from the numbers in data.js and rendered as inline SVG.

// Palette shared by every chart on the site.
export const PALETTE = ['#0f766e', '#b45309', '#1e3a5f', '#2f9e8f', '#d97706', '#7c8aa0'];

function esc(text) {
  return String(text).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function niceMax(values) {
  const max = Math.max(...values.map(Math.abs));
  if (max <= 0) return 1;
  const pow = 10 ** Math.floor(Math.log10(max));
  return Math.ceil(max / pow) * pow;
}

// Line chart with labelled points. series: {years, values, label, source}.
export function lineChart(series, { width = 640, height = 260, color = '#0f766e', format = (v) => String(v), yLabel = '' } = {}) {
  const padL = 44, padR = 14, padT = 18, padB = 30;
  const innerW = width - padL - padR, innerH = height - padT - padB;
  const min = Math.min(0, ...series.values), max = niceMax(series.values);
  const x = (i) => padL + (i / (series.values.length - 1)) * innerW;
  const y = (v) => padT + (1 - (v - min) / (max - min)) * innerH;
  const points = series.values.map((v, i) => `${x(i).toFixed(1)},${y(v).toFixed(1)}`).join(' ');
  const grid = [0, 0.5, 1].map((f) => {
    const v = min + (max - min) * f;
    const gy = y(v);
    return `<line x1="${padL}" y1="${gy}" x2="${width - padR}" y2="${gy}" stroke="#e3ddd2" stroke-width="1"/><text x="${padL - 6}" y="${gy + 4}" text-anchor="end" font-size="11" fill="#6b7280">${format(Math.round(v * 10) / 10)}</text>`;
  }).join('');
  const labels = series.years.map((yr, i) => `<text x="${x(i)}" y="${height - 8}" text-anchor="middle" font-size="11" fill="#6b7280">${yr}</text>`).join('');
  const dots = series.values.map((v, i) => `<circle cx="${x(i)}" cy="${y(v)}" r="4" fill="${color}"/><text x="${x(i)}" y="${y(v) - 10}" text-anchor="middle" font-size="11" font-weight="600" fill="#1e3a5f">${format(v)}</text>`).join('');
  return `<svg viewBox="0 0 ${width} ${height}" role="img" aria-label="${esc(series.label)}" class="chart">${grid}<polyline points="${points}" fill="none" stroke="${color}" stroke-width="2.5" stroke-linejoin="round" stroke-linecap="round"/>${dots}${labels}<text x="${padL}" y="12" font-size="11" fill="#6b7280">${esc(yLabel)}</text></svg>`;
}

// Vertical bar chart. Negative values draw below the zero line.
export function barChart(series, { width = 640, height = 260, format = (v) => String(v) } = {}) {
  const padL = 44, padR = 14, padT = 24, padB = 30;
  const innerW = width - padL - padR, innerH = height - padT - padB;
  const min = Math.min(0, ...series.values), max = niceMax(series.values);
  const zeroY = padT + (1 - (0 - min) / (max - min)) * innerH;
  const y = (v) => padT + (1 - (v - min) / (max - min)) * innerH;
  const slot = innerW / series.values.length;
  const barW = Math.min(52, slot * 0.58);
  const bars = series.values.map((v, i) => {
    const cx = padL + slot * i + slot / 2;
    const top = Math.min(y(v), zeroY), h = Math.abs(y(v) - zeroY);
    const fill = v < 0 ? '#b45309' : '#0f766e';
    const labY = v < 0 ? y(v) + 16 : y(v) - 8;
    return `<rect x="${(cx - barW / 2).toFixed(1)}" y="${top.toFixed(1)}" width="${barW}" height="${Math.max(h, 2).toFixed(1)}" rx="3" fill="${fill}"/><text x="${cx}" y="${labY.toFixed(1)}" text-anchor="middle" font-size="11" font-weight="600" fill="#1e3a5f">${format(v)}</text><text x="${cx}" y="${height - 8}" text-anchor="middle" font-size="11" fill="#6b7280">${series.years[i]}</text>`;
  }).join('');
  return `<svg viewBox="0 0 ${width} ${height}" role="img" aria-label="${esc(series.label)}" class="chart"><line x1="${padL}" y1="${zeroY}" x2="${width - padR}" y2="${zeroY}" stroke="#94a3b8" stroke-width="1"/>${bars}</svg>`;
}

// Horizontal bars with a label and a value on each row.
export function hbarChart(rows, { width = 640, rowH = 44, format = (v) => `${v}%` } = {}) {
  const height = rows.length * rowH + 12;
  const max = niceMax(rows.map((r) => r.share));
  const bars = rows.map((r, i) => {
    const y = 8 + i * rowH;
    const w = (r.share / max) * (width - 190);
    const color = PALETTE[i % PALETTE.length];
    return `<text x="0" y="${y + 19}" font-size="13" fill="#1e3a5f">${esc(r.group)}</text><rect x="150" y="${y + 4}" width="${Math.max(w, 2).toFixed(1)}" height="22" rx="4" fill="${color}"/><text x="${156 + w}" y="${y + 20}" font-size="13" font-weight="700" fill="#1e3a5f">${format(r.share)}</text>`;
  }).join('');
  return `<svg viewBox="0 0 ${width} ${height}" role="img" aria-label="Shares by group" class="chart">${bars}</svg>`;
}

// Donut chart with a legend. rows: {name, share}.
export function donutChart(rows, { size = 300, center = '' } = {}) {
  const cx = size / 2, cy = size / 2, r = size / 2 - 14, inner = r * 0.62;
  const total = rows.reduce((s, row) => s + row.share, 0);
  let angle = -Math.PI / 2;
  const arcs = rows.map((row, i) => {
    const frac = row.share / total;
    const a0 = angle, a1 = angle + frac * Math.PI * 2;
    angle = a1;
    const large = frac > 0.5 ? 1 : 0;
    const x0 = cx + r * Math.cos(a0), y0 = cy + r * Math.sin(a0);
    const x1 = cx + r * Math.cos(a1), y1 = cy + r * Math.sin(a1);
    const xi1 = cx + inner * Math.cos(a1), yi1 = cy + inner * Math.sin(a1);
    const xi0 = cx + inner * Math.cos(a0), yi0 = cy + inner * Math.sin(a0);
    return `<path d="M ${x0.toFixed(1)} ${y0.toFixed(1)} A ${r} ${r} 0 ${large} 1 ${x1.toFixed(1)} ${y1.toFixed(1)} L ${xi1.toFixed(1)} ${yi1.toFixed(1)} A ${inner} ${inner} 0 ${large} 0 ${xi0.toFixed(1)} ${yi0.toFixed(1)} Z" fill="${PALETTE[i % PALETTE.length]}"/>`;
  }).join('');
  const legend = rows.map((row, i) => `<span class="legend-item"><span class="swatch" style="background:${PALETTE[i % PALETTE.length]}"></span>${esc(row.name)} — <strong>${row.share}%</strong></span>`).join('');
  const centerText = center ? `<text x="${cx}" y="${cy - 4}" text-anchor="middle" font-size="15" font-weight="700" fill="#1e3a5f">${esc(center)}</text><text x="${cx}" y="${cy + 16}" text-anchor="middle" font-size="11" fill="#6b7280">of nominal value added</text>` : '';
  return `<div class="donut-wrap"><svg viewBox="0 0 ${size} ${size}" role="img" aria-label="Industry shares of nominal value added" class="chart donut">${arcs}${centerText}</svg><div class="legend">${legend}</div></div>`;
}
