import React, { useEffect, useState } from 'react';
import { Page } from '../components/AdminLayout';
import { Loading, EmptyState, Pill } from '../components/ui';
import { Availability as Row, listAvailability, upsertAvailability, deleteAvailability } from '../lib/adminApi';
import { longDate, todayISO } from '../lib/format';

const AvailabilityPage: React.FC = () => {
  const [rows, setRows] = useState<Row[] | null>(null);
  const [date, setDate] = useState('');
  const [reason, setReason] = useState('');
  const [busy, setBusy] = useState(false);

  const load = () => {
    listAvailability().then(setRows);
  };
  useEffect(load, []);

  const add = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!date) return;
    setBusy(true);
    try {
      await upsertAvailability({ date, is_open: false, reason: reason.trim() || 'Closed' });
      setDate('');
      setReason('');
      load();
    } catch (err: any) {
      alert('Could not save: ' + (err?.message ?? 'unknown error'));
    }
    setBusy(false);
  };

  const remove = async (id: string) => {
    await deleteAvailability(id);
    load();
  };

  const today = todayISO();
  const upcoming = (rows ?? []).filter((r) => r.date >= today);
  const past = (rows ?? []).filter((r) => r.date < today);

  return (
    <Page title="Closed Days" subtitle="Mark holidays, private events, or any day the rink isn't open to the public">
      <div className="a-help-banner">
        <span className="ico">📅</span>
        <div>Days you mark here show up as <strong>Closed</strong> on your calendar so nothing gets double-booked.</div>
      </div>

      <div className="a-grid a-grid-2" style={{ gridTemplateColumns: '1fr 1.3fr', alignItems: 'start' }}>
        <div className="a-card">
          <div className="a-card-head"><h2>🚫 Add a Closed Day</h2></div>
          <form className="a-card-pad" onSubmit={add}>
            <div className="a-field">
              <label>Which day?</label>
              <input className="a-input" type="date" value={date} onChange={(e) => setDate(e.target.value)} />
            </div>
            <div className="a-field">
              <label>Reason <span className="hint">(so you remember why)</span></label>
              <input className="a-input" value={reason} onChange={(e) => setReason(e.target.value)} placeholder="e.g. Closed for July 4th" />
            </div>
            <button className="a-btn a-btn-primary a-btn-lg" type="submit" disabled={busy || !date} style={{ width: '100%' }}>
              {busy ? 'Saving…' : 'Mark as Closed'}
            </button>
          </form>
        </div>

        <div className="a-card">
          <div className="a-card-head">
            <h2>Upcoming Closed Days</h2>
            {rows && <Pill tone="gray">{upcoming.length} coming up</Pill>}
          </div>
          {!rows ? (
            <Loading />
          ) : upcoming.length === 0 ? (
            <EmptyState icon="✅" title="No closed days coming up" sub="The rink is open as usual." />
          ) : (
            <div>
              {upcoming.map((r) => (
                <div key={r.id} className="a-flex-between" style={{ padding: '1rem 1.5rem', borderBottom: '1px solid var(--a-border)' }}>
                  <div>
                    <strong>{longDate(r.date)}</strong>
                    <div className="a-muted" style={{ fontSize: '0.85rem' }}>{r.reason}</div>
                  </div>
                  <button className="a-btn a-btn-danger" style={{ padding: '0.45rem 0.9rem', fontSize: '0.85rem' }} onClick={() => remove(r.id)}>
                    Remove
                  </button>
                </div>
              ))}
              {past.length > 0 && (
                <div style={{ padding: '0.9rem 1.5rem', color: '#8a8ca6', fontSize: '0.82rem' }}>
                  + {past.length} past closed day{past.length === 1 ? '' : 's'}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </Page>
  );
};

export default AvailabilityPage;
