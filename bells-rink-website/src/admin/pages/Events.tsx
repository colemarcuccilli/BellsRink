import React, { useEffect, useState } from 'react';
import { Page } from '../components/AdminLayout';
import { Modal, Loading, Pill, EmptyState } from '../components/ui';
import {
  AdminEvent,
  Recurrence,
  EVENT_TYPES,
  eventTypeLabel,
  listEvents,
  createEvent,
  updateEvent,
  deleteEvent,
  setEventPublished,
} from '../lib/adminApi';
import { money, prettyDate, prettyTime, DAYS } from '../lib/format';

const Events: React.FC = () => {
  const [events, setEvents] = useState<AdminEvent[] | null>(null);
  const [editing, setEditing] = useState<AdminEvent | null>(null);
  const [adding, setAdding] = useState(false);

  const load = () => {
    listEvents().then(setEvents);
  };
  useEffect(load, []);

  const weekly = (events ?? []).filter((e) => e.recurrence === 'weekly');
  const special = (events ?? []).filter((e) => e.recurrence !== 'weekly');

  const togglePublish = async (e: AdminEvent) => {
    await setEventPublished(e.id, !e.is_published);
    load();
  };

  const renderRow = (e: AdminEvent) => (
    <tr key={e.id} className="a-row-click" onClick={() => setEditing(e)}>
      <td>
        <div className="a-flex">
          <span style={{ fontSize: '1.4rem' }}>{e.icon}</span>
          <div>
            <strong>{e.name}</strong>
            <div className="a-muted" style={{ fontSize: '0.82rem' }}>{eventTypeLabel(e.event_type)}</div>
          </div>
        </div>
      </td>
      <td>
        {e.recurrence === 'weekly'
          ? `Every ${DAYS[e.recurrence_day ?? 0]}`
          : e.recurrence === 'monthly'
          ? `Monthly (day ${e.recurrence_day})`
          : prettyDate(e.event_date)}
      </td>
      <td>{e.start_time ? `${prettyTime(e.start_time)}${e.end_time ? ' – ' + prettyTime(e.end_time) : ''}` : '—'}</td>
      <td className="num">{money(e.price)}</td>
      <td onClick={(ev) => ev.stopPropagation()}>
        <button
          className={`pill ${e.is_published ? 'pill-green' : 'pill-gray'}`}
          style={{ border: 'none', cursor: 'pointer' }}
          onClick={() => togglePublish(e)}
          title="Click to show or hide on your website"
        >
          {e.is_published ? '● On website' : '○ Hidden'}
        </button>
      </td>
    </tr>
  );

  return (
    <Page
      title="Events"
      subtitle="Your weekly sessions and special nights. Flip an event 'On website' to show it to the public."
      actions={
        <button className="a-btn a-btn-primary" onClick={() => setAdding(true)}>
          + New Event
        </button>
      }
    >
      <div className="a-help-banner">
        <span className="ico">💡</span>
        <div>
          <strong>Weekly sessions</strong> repeat every week automatically (like Dollar Night every Wednesday).
          <strong> Special events</strong> happen once. Anything marked “On website” appears on bellsrink.com.
        </div>
      </div>

      {!events ? (
        <Loading />
      ) : (
        <>
          <div className="a-card a-mb">
            <div className="a-card-head">
              <h2>🔁 Weekly Sessions</h2>
              <Pill tone="purple">{weekly.length} repeating</Pill>
            </div>
            {weekly.length === 0 ? (
              <EmptyState title="No weekly sessions yet" />
            ) : (
              <div className="a-table-wrap">
                <table className="a-table">
                  <thead>
                    <tr>
                      <th>Event</th>
                      <th>When</th>
                      <th>Time</th>
                      <th className="num">Price</th>
                      <th>Website</th>
                    </tr>
                  </thead>
                  <tbody>{weekly.map(renderRow)}</tbody>
                </table>
              </div>
            )}
          </div>

          <div className="a-card">
            <div className="a-card-head">
              <h2>⭐ Special &amp; One-Time Events</h2>
              <Pill tone="gold">{special.length} events</Pill>
            </div>
            {special.length === 0 ? (
              <EmptyState title="No special events yet" sub="Add a holiday skate or themed night." />
            ) : (
              <div className="a-table-wrap">
                <table className="a-table">
                  <thead>
                    <tr>
                      <th>Event</th>
                      <th>When</th>
                      <th>Time</th>
                      <th className="num">Price</th>
                      <th>Website</th>
                    </tr>
                  </thead>
                  <tbody>{special.map(renderRow)}</tbody>
                </table>
              </div>
            )}
          </div>
        </>
      )}

      {(adding || editing) && (
        <EventForm
          event={editing}
          onClose={() => {
            setAdding(false);
            setEditing(null);
          }}
          onSaved={() => {
            setAdding(false);
            setEditing(null);
            load();
          }}
        />
      )}
    </Page>
  );
};

const EventForm: React.FC<{ event: AdminEvent | null; onClose: () => void; onSaved: () => void }> = ({
  event,
  onClose,
  onSaved,
}) => {
  const [name, setName] = useState(event?.name ?? '');
  const [type, setType] = useState(event?.event_type ?? 'public_session');
  const [recurrence, setRecurrence] = useState<Recurrence>(event?.recurrence ?? 'none');
  const [day, setDay] = useState(event?.recurrence_day ?? 5);
  const [date, setDate] = useState(event?.event_date ?? '');
  const [start, setStart] = useState(event?.start_time?.slice(0, 5) ?? '18:30');
  const [end, setEnd] = useState(event?.end_time?.slice(0, 5) ?? '21:00');
  const [price, setPrice] = useState(String(event?.price ?? ''));
  const [cost, setCost] = useState(String(event?.est_cost ?? ''));
  const [desc, setDesc] = useState(event?.description ?? '');
  const [published, setPublished] = useState(event?.is_published ?? false);
  const [busy, setBusy] = useState(false);

  const save = async () => {
    setBusy(true);
    try {
      const meta = EVENT_TYPES.find((t) => t.value === type);
      const payload: Partial<AdminEvent> = {
        name: name.trim(),
        event_type: type,
        icon: meta?.icon ?? '🛼',
        color: meta?.color ?? 'music',
        recurrence,
        recurrence_day: recurrence === 'none' ? null : day,
        event_date: recurrence === 'none' ? date || null : null,
        start_time: start ? `${start}:00` : null,
        end_time: end ? `${end}:00` : null,
        price: price ? parseFloat(price) : 0,
        est_cost: cost ? parseFloat(cost) : 0,
        description: desc.trim() || null,
        is_published: published,
      };
      if (event) await updateEvent(event.id, payload);
      else await createEvent(payload);
      onSaved();
    } catch (e: any) {
      alert('Could not save: ' + (e?.message ?? 'unknown error'));
      setBusy(false);
    }
  };

  const remove = async () => {
    if (!event) return;
    if (!window.confirm(`Delete "${event.name}"? This cannot be undone.`)) return;
    setBusy(true);
    try {
      await deleteEvent(event.id);
      onSaved();
    } catch (e: any) {
      alert('Could not delete: ' + (e?.message ?? 'unknown error'));
      setBusy(false);
    }
  };

  return (
    <Modal
      title={event ? 'Edit Event' : 'New Event'}
      onClose={onClose}
      footer={
        <>
          {event && (
            <button className="a-btn a-btn-danger" onClick={remove} disabled={busy} style={{ marginRight: 'auto' }}>
              Delete
            </button>
          )}
          <button className="a-btn a-btn-ghost" onClick={onClose}>
            Cancel
          </button>
          <button className="a-btn a-btn-primary" onClick={save} disabled={busy || !name.trim()}>
            {busy ? 'Saving…' : event ? 'Save Changes' : 'Add Event'}
          </button>
        </>
      }
    >
      <div className="a-field">
        <label>Event name</label>
        <input className="a-input" value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g. Friday Family Pizza Party" />
      </div>

      <div className="a-field">
        <label>Type of event</label>
        <select className="a-select" value={type} onChange={(e) => setType(e.target.value)}>
          {EVENT_TYPES.map((t) => (
            <option key={t.value} value={t.value}>
              {t.icon}  {t.label}
            </option>
          ))}
        </select>
      </div>

      <div className="a-field">
        <label>How often does it happen?</label>
        <select className="a-select" value={recurrence} onChange={(e) => setRecurrence(e.target.value as Recurrence)}>
          <option value="none">Just once (pick a date)</option>
          <option value="weekly">Every week</option>
          <option value="monthly">Every month</option>
        </select>
      </div>

      {recurrence === 'none' && (
        <div className="a-field">
          <label>Date</label>
          <input className="a-input" type="date" value={date} onChange={(e) => setDate(e.target.value)} />
        </div>
      )}
      {recurrence === 'weekly' && (
        <div className="a-field">
          <label>Which day of the week?</label>
          <select className="a-select" value={day} onChange={(e) => setDay(parseInt(e.target.value, 10))}>
            {DAYS.map((d, i) => (
              <option key={d} value={i}>
                Every {d}
              </option>
            ))}
          </select>
        </div>
      )}
      {recurrence === 'monthly' && (
        <div className="a-field">
          <label>Which day of the month? (1–31)</label>
          <input
            className="a-input"
            type="number"
            min={1}
            max={31}
            value={day}
            onChange={(e) => setDay(parseInt(e.target.value, 10))}
          />
        </div>
      )}

      <div className="a-field-row">
        <div className="a-field">
          <label>Start time</label>
          <input className="a-input" type="time" value={start} onChange={(e) => setStart(e.target.value)} />
        </div>
        <div className="a-field">
          <label>End time</label>
          <input className="a-input" type="time" value={end} onChange={(e) => setEnd(e.target.value)} />
        </div>
      </div>

      <div className="a-field-row">
        <div className="a-field">
          <label>Admission price</label>
          <input className="a-input" type="number" value={price} onChange={(e) => setPrice(e.target.value)} placeholder="10" />
        </div>
        <div className="a-field">
          <label>
            Cost to run <span className="hint">(DJ, staff, pizza)</span>
          </label>
          <input className="a-input" type="number" value={cost} onChange={(e) => setCost(e.target.value)} placeholder="150" />
        </div>
      </div>

      <div className="a-field">
        <label>Description <span className="hint">(shows on website)</span></label>
        <textarea className="a-textarea" value={desc} onChange={(e) => setDesc(e.target.value)} />
      </div>

      <label
        className="a-flex"
        style={{ cursor: 'pointer', background: '#f8f9fd', padding: '0.9rem 1rem', borderRadius: 9, border: '1px solid var(--a-border)' }}
      >
        <input type="checkbox" checked={published} onChange={(e) => setPublished(e.target.checked)} style={{ width: 20, height: 20 }} />
        <span>
          <strong>Show this event on bellsrink.com</strong>
          <div className="a-muted" style={{ fontSize: '0.85rem' }}>Leave unchecked to keep it private while you plan.</div>
        </span>
      </label>
    </Modal>
  );
};

export default Events;
