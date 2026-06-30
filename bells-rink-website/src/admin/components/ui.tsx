import React from 'react';

export const Spinner: React.FC = () => <span className="a-spinner" />;

export const Loading: React.FC<{ label?: string }> = ({ label = 'Loading…' }) => (
  <div className="a-loading">
    <Spinner /> {label}
  </div>
);

export const EmptyState: React.FC<{ icon?: string; title: string; sub?: string; children?: React.ReactNode }> = ({
  icon = '📭',
  title,
  sub,
  children,
}) => (
  <div className="a-empty">
    <div className="a-empty-icon">{icon}</div>
    <h3 style={{ fontSize: '1.1rem', marginBottom: '0.3rem' }}>{title}</h3>
    {sub && <p style={{ margin: '0 0 1rem' }}>{sub}</p>}
    {children}
  </div>
);

export const Modal: React.FC<{
  title: string;
  onClose: () => void;
  children: React.ReactNode;
  footer?: React.ReactNode;
}> = ({ title, onClose, children, footer }) => (
  <div className="a-modal-overlay" onClick={onClose}>
    <div className="a-modal" onClick={(e) => e.stopPropagation()}>
      <div className="a-modal-head">
        <h2>{title}</h2>
        <button className="a-x" onClick={onClose} aria-label="Close">
          ×
        </button>
      </div>
      <div className="a-modal-body">{children}</div>
      {footer && <div className="a-modal-foot">{footer}</div>}
    </div>
  </div>
);

type PillTone = 'green' | 'gold' | 'blue' | 'purple' | 'pink' | 'gray';
export const Pill: React.FC<{ tone: PillTone; children: React.ReactNode }> = ({ tone, children }) => (
  <span className={`pill pill-${tone}`}>{children}</span>
);

export function bookingStatusPill(status: string): React.ReactNode {
  const map: Record<string, { tone: PillTone; label: string }> = {
    inquiry: { tone: 'gold', label: 'New Inquiry' },
    confirmed: { tone: 'blue', label: 'Confirmed' },
    completed: { tone: 'green', label: 'Completed' },
    cancelled: { tone: 'gray', label: 'Cancelled' },
  };
  const s = map[status] ?? { tone: 'gray' as PillTone, label: status };
  return <Pill tone={s.tone}>{s.label}</Pill>;
}

export const KpiCard: React.FC<{
  label: string;
  value: string;
  sub?: string;
  icon?: string;
  tint?: 'purple' | 'green' | 'gold' | 'blue';
}> = ({ label, value, sub, icon, tint = 'purple' }) => (
  <div className={`kpi tint-${tint}`}>
    <div className="kpi-label">{label}</div>
    <div className="kpi-value">{value}</div>
    {sub && <div className="kpi-sub">{sub}</div>}
    {icon && <div className="kpi-icon">{icon}</div>}
  </div>
);
