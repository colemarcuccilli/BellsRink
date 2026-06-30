import React from 'react';
import { money } from '../lib/format';

// Horizontal bar chart — readable, labelled, with values.
export const HBarChart: React.FC<{
  data: { label: string; value: number; color?: string }[];
  format?: (n: number) => string;
}> = ({ data, format = money }) => {
  const max = Math.max(1, ...data.map((d) => Math.abs(d.value)));
  const palette = ['#6b5cf0', '#e8920c', '#16a34a', '#2563eb', '#e11d6b', '#a78bfa', '#0ea5e9', '#f59e0b'];
  return (
    <div>
      {data.map((d, i) => (
        <div className="bar-row" key={d.label}>
          <div className="bar-label" title={d.label}>{d.label}</div>
          <div className="bar-track">
            <div
              className="bar-fill"
              style={{
                width: `${Math.max(6, (Math.abs(d.value) / max) * 100)}%`,
                background: d.color ?? palette[i % palette.length],
              }}
            />
          </div>
          <div className="bar-value" style={{ color: d.value < 0 ? '#e11d6b' : undefined }}>
            {format(d.value)}
          </div>
        </div>
      ))}
    </div>
  );
};

// Area/line chart for a daily money series (SVG, no deps).
export const AreaChart: React.FC<{
  points: { date: string; total: number }[];
  height?: number;
  color?: string;
}> = ({ points, height = 180, color = '#6b5cf0' }) => {
  const w = 760;
  const h = height;
  const pad = 8;
  const max = Math.max(1, ...points.map((p) => p.total));
  const step = points.length > 1 ? (w - pad * 2) / (points.length - 1) : 0;
  const x = (i: number) => pad + i * step;
  const y = (v: number) => h - pad - (v / max) * (h - pad * 2 - 6);

  const line = points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${x(i).toFixed(1)} ${y(p.total).toFixed(1)}`).join(' ');
  const area = `${line} L ${x(points.length - 1).toFixed(1)} ${h - pad} L ${x(0).toFixed(1)} ${h - pad} Z`;
  const peak = points.reduce((a, b) => (b.total > a.total ? b : a), points[0] ?? { date: '', total: 0 });

  return (
    <svg viewBox={`0 0 ${w} ${h}`} width="100%" height={h} preserveAspectRatio="none" role="img" aria-label="Daily revenue">
      <defs>
        <linearGradient id="aGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.28" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={area} fill="url(#aGrad)" />
      <path d={line} fill="none" stroke={color} strokeWidth="2.5" strokeLinejoin="round" strokeLinecap="round" />
      {points.length > 0 && (
        <circle cx={x(points.indexOf(peak))} cy={y(peak.total)} r="4" fill={color} />
      )}
    </svg>
  );
};

// Donut showing payment-method split.
export const Donut: React.FC<{
  segments: { label: string; value: number; color: string }[];
  size?: number;
}> = ({ segments, size = 180 }) => {
  const total = segments.reduce((a, s) => a + s.value, 0) || 1;
  const r = size / 2 - 14;
  const c = 2 * Math.PI * r;
  let offset = 0;
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', flexWrap: 'wrap' }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        <g transform={`rotate(-90 ${size / 2} ${size / 2})`}>
          {segments.map((s) => {
            const frac = s.value / total;
            const dash = frac * c;
            const seg = (
              <circle
                key={s.label}
                cx={size / 2}
                cy={size / 2}
                r={r}
                fill="none"
                stroke={s.color}
                strokeWidth="24"
                strokeDasharray={`${dash} ${c - dash}`}
                strokeDashoffset={-offset}
              />
            );
            offset += dash;
            return seg;
          })}
        </g>
        <text x="50%" y="47%" textAnchor="middle" fontSize="13" fill="#8a8ca6" fontWeight="600">Total</text>
        <text x="50%" y="60%" textAnchor="middle" fontSize="20" fill="#1c1c2e" fontWeight="800">{money(total)}</text>
      </svg>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
        {segments.map((s) => (
          <div key={s.label} style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <span style={{ width: 14, height: 14, borderRadius: 4, background: s.color, flexShrink: 0 }} />
            <span style={{ fontSize: '0.92rem', fontWeight: 600 }}>{s.label}</span>
            <span style={{ fontSize: '0.92rem', color: '#585a72', marginLeft: 'auto' }}>
              {money(s.value)} · {Math.round((s.value / total) * 100)}%
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
