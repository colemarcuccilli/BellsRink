import React, { useEffect, useMemo, useState } from 'react';
import { Page } from '../components/AdminLayout';
import { Loading } from '../components/ui';
import { AdminEvent, Booking, Availability, listEvents, listBookings, listAvailability } from '../lib/adminApi';
import { prettyTime } from '../lib/format';

const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const WD = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

const colorHex: Record<string, string> = {
  music: '#6b5cf0',
  deal: '#e8920c',
  celebration: '#e11d6b',
  special: '#2563eb',
  worship: '#a78bfa',
};

const Calendar: React.FC = () => {
  const [events, setEvents] = useState<AdminEvent[]>([]);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [closures, setClosures] = useState<Availability[]>([]);
  const [loading, setLoading] = useState(true);
  const now = new Date();
  const [year, setYear] = useState(now.getFullYear());
  const [month, setMonth] = useState(now.getMonth());

  useEffect(() => {
    Promise.all([listEvents(), listBookings(), listAvailability()]).then(([e, b, a]) => {
      setEvents(e);
      setBookings(b);
      setClosures(a);
      setLoading(false);
    });
  }, []);

  const todayISO = new Date().toISOString().slice(0, 10);

  const cells = useMemo(() => {
    const first = new Date(year, month, 1);
    const startDow = first.getDay();
    const daysIn = new Date(year, month + 1, 0).getDate();
    const out: { iso: string; day: number }[] = [];
    for (let i = 0; i < startDow; i++) out.push({ iso: '', day: 0 });
    for (let d = 1; d <= daysIn; d++) {
      const iso = `${year}-${String(month + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
      out.push({ iso, day: d });
    }
    return out;
  }, [year, month]);

  const eventsForDay = (iso: string, dow: number): AdminEvent[] => {
    if (!iso) return [];
    return events.filter((e) => {
      if (e.recurrence === 'weekly') return e.recurrence_day === dow;
      if (e.recurrence === 'monthly') return e.recurrence_day === parseInt(iso.slice(8), 10);
      return e.event_date === iso;
    });
  };

  const go = (delta: number) => {
    let m = month + delta;
    let y = year;
    if (m < 0) { m = 11; y--; }
    if (m > 11) { m = 0; y++; }
    setMonth(m);
    setYear(y);
  };

  return (
    <Page
      title="Calendar"
      subtitle="Everything happening at the rink — sessions, parties, and closed days at a glance"
      actions={
        <div className="a-flex">
          <button className="a-btn a-btn-ghost" onClick={() => go(-1)}>← Prev</button>
          <button className="a-btn a-btn-ghost" onClick={() => { setYear(now.getFullYear()); setMonth(now.getMonth()); }}>Today</button>
          <button className="a-btn a-btn-ghost" onClick={() => go(1)}>Next →</button>
        </div>
      }
    >
      {loading ? (
        <Loading />
      ) : (
        <div className="a-card a-card-pad">
          <div className="a-flex-between a-mb">
            <h2 style={{ fontSize: '1.4rem' }}>{MONTHS[month]} {year}</h2>
            <div className="a-flex" style={{ flexWrap: 'wrap', fontSize: '0.82rem' }}>
              <span className="a-flex" style={{ gap: 4 }}><span style={{ width: 10, height: 10, borderRadius: 3, background: '#6b5cf0' }} /> Session</span>
              <span className="a-flex" style={{ gap: 4 }}><span style={{ width: 10, height: 10, borderRadius: 3, background: '#16a34a' }} /> Party</span>
              <span className="a-flex" style={{ gap: 4 }}><span style={{ width: 10, height: 10, borderRadius: 3, background: '#e11d6b' }} /> Closed</span>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7,1fr)', gap: 6 }}>
            {WD.map((d) => (
              <div key={d} style={{ textAlign: 'center', fontWeight: 700, fontSize: '0.8rem', color: '#8a8ca6', padding: '0.3rem' }}>
                {d}
              </div>
            ))}
            {cells.map((c, i) => {
              if (!c.iso) return <div key={i} />;
              const dow = new Date(c.iso + 'T00:00:00').getDay();
              const dayEvents = eventsForDay(c.iso, dow);
              const dayBookings = bookings.filter((b) => b.party_date === c.iso && b.status !== 'cancelled');
              const closed = closures.find((cl) => cl.date === c.iso && !cl.is_open);
              const isToday = c.iso === todayISO;
              return (
                <div
                  key={i}
                  style={{
                    minHeight: 96,
                    border: `1px solid ${isToday ? '#6b5cf0' : 'var(--a-border)'}`,
                    background: closed ? '#fff5f8' : isToday ? '#f6f4ff' : '#fff',
                    borderRadius: 10,
                    padding: 6,
                    boxShadow: isToday ? '0 0 0 2px rgba(107,92,240,0.25)' : 'none',
                  }}
                >
                  <div style={{ fontWeight: isToday ? 800 : 600, fontSize: '0.85rem', color: isToday ? '#5142c4' : '#1c1c2e', marginBottom: 4 }}>
                    {c.day}
                  </div>
                  {closed && (
                    <div style={{ fontSize: '0.68rem', background: '#fce7ef', color: '#e11d6b', borderRadius: 5, padding: '1px 5px', marginBottom: 3, fontWeight: 700 }}>
                      CLOSED
                    </div>
                  )}
                  {dayEvents.slice(0, 3).map((e) => (
                    <div
                      key={e.id}
                      title={`${e.name}${e.start_time ? ' · ' + prettyTime(e.start_time) : ''}`}
                      style={{
                        fontSize: '0.68rem',
                        background: (colorHex[e.color] ?? '#6b5cf0') + '18',
                        color: colorHex[e.color] ?? '#6b5cf0',
                        borderLeft: `3px solid ${colorHex[e.color] ?? '#6b5cf0'}`,
                        borderRadius: 4,
                        padding: '1px 4px',
                        marginBottom: 2,
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      {e.icon} {e.name}
                    </div>
                  ))}
                  {dayBookings.map((b) => (
                    <div
                      key={b.id}
                      title={`Party: ${b.customer?.name ?? ''}`}
                      style={{ fontSize: '0.68rem', background: '#dcfce7', color: '#16a34a', borderRadius: 4, padding: '1px 4px', marginBottom: 2, fontWeight: 700, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}
                    >
                      🎉 {b.customer?.name ?? 'Party'}
                    </div>
                  ))}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </Page>
  );
};

export default Calendar;
