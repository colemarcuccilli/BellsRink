import React, { useEffect, useState } from 'react';
import { Page } from '../components/AdminLayout';
import { Loading, EmptyState, Pill } from '../components/ui';
import { CashEntry as CashRow, AdminEvent, listCashEntries, createCashEntry, listEvents } from '../lib/adminApi';
import { money, prettyDate, todayISO } from '../lib/format';

const CATEGORIES = [
  { value: 'admissions', label: 'Admissions (skating)' },
  { value: 'skate_rental', label: 'Skate rental' },
  { value: 'concessions', label: 'Snack bar / concessions' },
  { value: 'other', label: 'Other' },
];

const CashEntry: React.FC = () => {
  const [entries, setEntries] = useState<CashRow[] | null>(null);
  const [events, setEvents] = useState<AdminEvent[]>([]);
  const [date, setDate] = useState(todayISO());
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('admissions');
  const [eventId, setEventId] = useState('');
  const [who, setWho] = useState('');
  const [notes, setNotes] = useState('');
  const [busy, setBusy] = useState(false);
  const [saved, setSaved] = useState(false);

  const load = () => {
    listCashEntries().then(setEntries);
    listEvents().then(setEvents);
  };
  useEffect(load, []);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!amount) return;
    setBusy(true);
    try {
      await createCashEntry({
        entry_date: date,
        amount: parseFloat(amount),
        category,
        event_id: eventId || null,
        recorded_by: who.trim() || null,
        notes: notes.trim() || null,
      });
      setAmount('');
      setNotes('');
      setEventId('');
      setSaved(true);
      setTimeout(() => setSaved(false), 2500);
      load();
    } catch (err: any) {
      alert('Could not save: ' + (err?.message ?? 'unknown error'));
    }
    setBusy(false);
  };

  // group recent entries by day
  const byDay = new Map<string, { total: number; rows: CashRow[] }>();
  for (const r of entries ?? []) {
    const g = byDay.get(r.entry_date) ?? { total: 0, rows: [] };
    g.total += Number(r.amount);
    g.rows.push(r);
    byDay.set(r.entry_date, g);
  }
  const days = Array.from(byDay.entries()).slice(0, 10);

  return (
    <Page title="Daily Cash" subtitle="At the end of the night, type in how much cash you took in. That's it!">
      <div className="a-grid a-grid-2" style={{ gridTemplateColumns: '1fr 1.2fr', alignItems: 'start' }}>
        <div className="a-card">
          <div className="a-card-head">
            <h2>💵 Add Cash Taken In</h2>
          </div>
          <form className="a-card-pad" onSubmit={submit}>
            <div className="a-field">
              <label>What day was this cash from?</label>
              <input className="a-input" type="date" value={date} onChange={(e) => setDate(e.target.value)} />
            </div>

            <div className="a-field">
              <label>How much cash? (dollars)</label>
              <input
                className="a-input"
                style={{ fontSize: '1.6rem', fontWeight: 700, padding: '0.9rem' }}
                type="number"
                step="0.01"
                inputMode="decimal"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="$0.00"
                autoFocus
              />
            </div>

            <div className="a-field">
              <label>What was it for?</label>
              <select className="a-select" value={category} onChange={(e) => setCategory(e.target.value)}>
                {CATEGORIES.map((c) => (
                  <option key={c.value} value={c.value}>{c.label}</option>
                ))}
              </select>
            </div>

            <div className="a-field">
              <label>Which session? <span className="hint">(optional — helps track what's profitable)</span></label>
              <select className="a-select" value={eventId} onChange={(e) => setEventId(e.target.value)}>
                <option value="">— Not tied to a specific event —</option>
                {events.map((ev) => (
                  <option key={ev.id} value={ev.id}>{ev.icon} {ev.name}</option>
                ))}
              </select>
            </div>

            <div className="a-field-row">
              <div className="a-field">
                <label>Your name <span className="hint">(optional)</span></label>
                <input className="a-input" value={who} onChange={(e) => setWho(e.target.value)} placeholder="e.g. Stacy" />
              </div>
              <div className="a-field">
                <label>Notes <span className="hint">(optional)</span></label>
                <input className="a-input" value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="Busy night!" />
              </div>
            </div>

            <button className="a-btn a-btn-gold a-btn-lg" type="submit" disabled={busy || !amount} style={{ width: '100%' }}>
              {busy ? 'Saving…' : saved ? '✓ Saved!' : 'Save Cash Total'}
            </button>
            {saved && <p style={{ textAlign: 'center', color: '#16a34a', marginTop: '0.75rem', fontWeight: 600 }}>Got it — added to your reports.</p>}
          </form>
        </div>

        <div className="a-card">
          <div className="a-card-head">
            <h2>Recent Cash Days</h2>
          </div>
          {!entries ? (
            <Loading />
          ) : days.length === 0 ? (
            <EmptyState icon="🧾" title="No cash entries yet" sub="Add your first one on the left." />
          ) : (
            <div style={{ padding: '0.5rem 0' }}>
              {days.map(([day, g]) => (
                <div key={day} style={{ padding: '0.9rem 1.5rem', borderBottom: '1px solid var(--a-border)' }}>
                  <div className="a-flex-between">
                    <strong>{prettyDate(day)}</strong>
                    <span style={{ fontWeight: 800, color: '#e8920c', fontSize: '1.1rem' }}>{money(g.total)}</span>
                  </div>
                  <div className="a-flex" style={{ flexWrap: 'wrap', marginTop: 6 }}>
                    {g.rows.map((r) => (
                      <Pill key={r.id} tone="gray">
                        {money(r.amount)} · {r.category.replace('_', ' ')}
                      </Pill>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </Page>
  );
};

export default CashEntry;
