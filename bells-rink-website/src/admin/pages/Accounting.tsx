import React, { useEffect, useMemo, useState } from 'react';
import { Page } from '../components/AdminLayout';
import { KpiCard, Loading, Pill } from '../components/ui';
import { Donut, HBarChart } from '../components/charts';
import {
  Payment,
  CashEntry,
  AdminEvent,
  METHOD_LABELS,
  eventTypeLabel,
  listPayments,
  listCashEntries,
  listEvents,
} from '../lib/adminApi';
import { money, prettyDate } from '../lib/format';

type RangeKey = 'today' | 'week' | 'month' | 'all';
const RANGES: { key: RangeKey; label: string; days: number | null }[] = [
  { key: 'today', label: 'Today', days: 0 },
  { key: 'week', label: 'This Week', days: 7 },
  { key: 'month', label: 'This Month', days: 30 },
  { key: 'all', label: 'Last 8 Weeks', days: null },
];

function startOf(days: number): string {
  const d = new Date();
  d.setHours(0, 0, 0, 0);
  d.setDate(d.getDate() - days);
  return d.toISOString().slice(0, 10);
}

const Accounting: React.FC = () => {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [cash, setCash] = useState<CashEntry[]>([]);
  const [events, setEvents] = useState<AdminEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [range, setRange] = useState<RangeKey>('month');

  useEffect(() => {
    Promise.all([listPayments(), listCashEntries(), listEvents()]).then(([p, c, e]) => {
      setPayments(p);
      setCash(c);
      setEvents(e);
      setLoading(false);
    });
  }, []);

  const rangeStart = useMemo(() => {
    const r = RANGES.find((x) => x.key === range)!;
    return r.days === null ? '0000-01-01' : startOf(r.days);
  }, [range]);

  const data = useMemo(() => {
    const eventTypeById = new Map(events.map((e) => [e.id, e.event_type]));
    type Row = { date: string; amount: number; method: string; category: string; label: string; type: string | null };
    const rows: Row[] = [];
    for (const p of payments) {
      if (p.paid_on < rangeStart) continue;
      rows.push({
        date: p.paid_on,
        amount: Number(p.amount),
        method: p.method,
        category: p.category,
        label: p.event?.name ?? (p.category ? p.category.replace('_', ' ') : 'Payment'),
        type: p.event?.event_type ?? (p.event_id ? eventTypeById.get(p.event_id) ?? null : null),
      });
    }
    for (const c of cash) {
      if (c.entry_date < rangeStart) continue;
      rows.push({
        date: c.entry_date,
        amount: Number(c.amount),
        method: 'cash',
        category: c.category,
        label: c.event?.name ?? `Cash — ${c.category}`,
        type: c.event_id ? eventTypeById.get(c.event_id) ?? null : null,
      });
    }
    rows.sort((a, b) => (a.date < b.date ? 1 : -1));

    const sumBy = (f: (r: Row) => boolean) => rows.filter(f).reduce((a, r) => a + r.amount, 0);
    const card = sumBy((r) => r.method !== 'cash');
    const cashTotal = sumBy((r) => r.method === 'cash');

    // profit by type
    const avgCostByType = new Map<string, number>();
    const defCount = new Map<string, number>();
    for (const e of events) {
      avgCostByType.set(e.event_type, (avgCostByType.get(e.event_type) ?? 0) + Number(e.est_cost));
      defCount.set(e.event_type, (defCount.get(e.event_type) ?? 0) + 1);
    }
    const typeAgg = new Map<string, { rev: number; days: Set<string> }>();
    for (const r of rows) {
      if (!r.type) continue;
      const a = typeAgg.get(r.type) ?? { rev: 0, days: new Set<string>() };
      a.rev += r.amount;
      a.days.add(r.date);
      typeAgg.set(r.type, a);
    }
    const byType = Array.from(typeAgg.entries())
      .map(([type, a]) => {
        const perSession = (avgCostByType.get(type) ?? 0) / (defCount.get(type) ?? 1);
        const estCost = perSession * a.days.size;
        return { type, label: eventTypeLabel(type), revenue: a.rev, profit: a.rev - estCost, sessions: a.days.size };
      })
      .sort((a, b) => b.revenue - a.revenue);

    return { rows, total: card + cashTotal, card, cashTotal, byType };
  }, [payments, cash, events, rangeStart]);

  return (
    <Page title="Money & Reports" subtitle="See exactly where your money comes from — online, cards, and cash">
      <div className="a-flex a-mb">
        {RANGES.map((r) => (
          <button key={r.key} className={`a-btn ${range === r.key ? 'a-btn-primary' : 'a-btn-ghost'}`} onClick={() => setRange(r.key)}>
            {r.label}
          </button>
        ))}
      </div>

      {loading ? (
        <Loading />
      ) : (
        <>
          <div className="a-grid a-grid-3 a-mb">
            <KpiCard label="Total Money In" value={money(data.total)} icon="💰" tint="green" sub="Cards + cash combined" />
            <KpiCard label="Card Payments" value={money(data.card)} icon="💳" tint="purple" sub="Online + card at door" />
            <KpiCard label="Cash" value={money(data.cashTotal)} icon="🧾" tint="gold" sub="Counted at the rink" />
          </div>

          <div className="a-grid a-grid-2 a-mb">
            <div className="a-card">
              <div className="a-card-head"><h2>Money by Payment Type</h2></div>
              <div className="a-card-pad">
                <Donut
                  segments={[
                    { label: METHOD_LABELS.online_card, value: data.rows.filter((r) => r.method === 'online_card').reduce((a, r) => a + r.amount, 0), color: '#6b5cf0' },
                    { label: METHOD_LABELS.in_person_card, value: data.rows.filter((r) => r.method === 'in_person_card').reduce((a, r) => a + r.amount, 0), color: '#2563eb' },
                    { label: METHOD_LABELS.cash, value: data.cashTotal, color: '#e8920c' },
                  ]}
                />
              </div>
            </div>
            <div className="a-card">
              <div className="a-card-head"><h2>Revenue by Event Type</h2></div>
              <div className="a-card-pad">
                <HBarChart data={data.byType.slice(0, 6).map((t) => ({ label: t.label, value: Math.round(t.revenue) }))} />
              </div>
            </div>
          </div>

          <div className="a-card a-mb">
            <div className="a-card-head">
              <div>
                <h2>Profit by Event Type</h2>
                <p>Revenue minus estimated cost to run each kind of night</p>
              </div>
            </div>
            <div className="a-table-wrap">
              <table className="a-table">
                <thead>
                  <tr>
                    <th>Event Type</th>
                    <th className="num">Sessions</th>
                    <th className="num">Revenue</th>
                    <th className="num">Est. Profit</th>
                    <th>Verdict</th>
                  </tr>
                </thead>
                <tbody>
                  {data.byType.map((t) => (
                    <tr key={t.type}>
                      <td><strong>{t.label}</strong></td>
                      <td className="num">{t.sessions}</td>
                      <td className="num">{money(t.revenue)}</td>
                      <td className="num" style={{ color: t.profit < 0 ? '#e11d6b' : '#16a34a' }}>{money(t.profit)}</td>
                      <td>
                        {t.profit < 0 ? <Pill tone="pink">Losing money</Pill> : t.profit > 1500 ? <Pill tone="green">Big winner</Pill> : <Pill tone="gray">Steady</Pill>}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="a-card">
            <div className="a-card-head">
              <h2>Recent Transactions</h2>
              <Pill tone="gray">{data.rows.length} in range</Pill>
            </div>
            <div className="a-table-wrap">
              <table className="a-table">
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>What</th>
                    <th>How Paid</th>
                    <th>Category</th>
                    <th className="num">Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {data.rows.slice(0, 60).map((r, i) => (
                    <tr key={i}>
                      <td>{prettyDate(r.date)}</td>
                      <td>{r.label}</td>
                      <td>
                        <Pill tone={r.method === 'cash' ? 'gold' : r.method === 'online_card' ? 'purple' : 'blue'}>
                          {METHOD_LABELS[r.method as keyof typeof METHOD_LABELS] ?? r.method}
                        </Pill>
                      </td>
                      <td style={{ textTransform: 'capitalize' }}>{r.category.replace('_', ' ')}</td>
                      <td className="num">{money(r.amount)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}
    </Page>
  );
};

export default Accounting;
