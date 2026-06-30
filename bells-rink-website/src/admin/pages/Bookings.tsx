import React, { useEffect, useMemo, useState } from 'react';
import { Page } from '../components/AdminLayout';
import { Modal, Loading, EmptyState, bookingStatusPill } from '../components/ui';
import {
  Booking,
  BookingStatus,
  Customer,
  listBookings,
  listCustomers,
  createBooking,
  updateBooking,
  createCustomer,
} from '../lib/adminApi';
import { money, prettyDate, prettyTime } from '../lib/format';

const PACKAGES = ['Package #1', 'Package #2', 'Package #3', 'Private Birthday Party'];
const STATUSES: BookingStatus[] = ['inquiry', 'confirmed', 'completed', 'cancelled'];

const Bookings: React.FC = () => {
  const [bookings, setBookings] = useState<Booking[] | null>(null);
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [filter, setFilter] = useState<'all' | BookingStatus>('all');
  const [editing, setEditing] = useState<Booking | null>(null);
  const [adding, setAdding] = useState(false);

  const load = () => {
    listBookings().then(setBookings);
    listCustomers().then(setCustomers);
  };
  useEffect(load, []);

  const filtered = useMemo(
    () => (bookings ?? []).filter((b) => filter === 'all' || b.status === filter),
    [bookings, filter]
  );

  const counts = useMemo(() => {
    const c: Record<string, number> = { all: bookings?.length ?? 0 };
    for (const s of STATUSES) c[s] = (bookings ?? []).filter((b) => b.status === s).length;
    return c;
  }, [bookings]);

  return (
    <Page
      title="Party Bookings"
      subtitle="Every birthday party and group event — newest inquiries need your reply"
      actions={
        <button className="a-btn a-btn-primary" onClick={() => setAdding(true)}>
          + New Booking
        </button>
      }
    >
      <div className="a-flex a-mb" style={{ flexWrap: 'wrap' }}>
        {(['all', ...STATUSES] as const).map((s) => (
          <button
            key={s}
            className={`a-btn ${filter === s ? 'a-btn-primary' : 'a-btn-ghost'}`}
            onClick={() => setFilter(s)}
          >
            {s === 'all' ? 'All' : s.charAt(0).toUpperCase() + s.slice(1)}
            <span style={{ opacity: 0.7, marginLeft: 4 }}>({counts[s] ?? 0})</span>
          </button>
        ))}
      </div>

      <div className="a-card">
        {!bookings ? (
          <Loading />
        ) : filtered.length === 0 ? (
          <EmptyState icon="📋" title="No bookings here yet" sub="New party bookings will show up in this list." />
        ) : (
          <div className="a-table-wrap">
            <table className="a-table">
              <thead>
                <tr>
                  <th>Customer</th>
                  <th>Package</th>
                  <th>Date</th>
                  <th>Skaters</th>
                  <th>Status</th>
                  <th className="num">Quoted</th>
                  <th className="num">Deposit</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((b) => (
                  <tr key={b.id} className="a-row-click" onClick={() => setEditing(b)}>
                    <td>
                      <strong>{b.customer?.name ?? 'Unknown'}</strong>
                      {b.customer?.phone && <div className="a-muted" style={{ fontSize: '0.82rem' }}>{b.customer.phone}</div>}
                    </td>
                    <td>{b.package}</td>
                    <td>
                      {prettyDate(b.party_date)}
                      {b.start_time && <div className="a-muted" style={{ fontSize: '0.82rem' }}>{prettyTime(b.start_time)}</div>}
                    </td>
                    <td>{b.num_skaters ?? '—'}</td>
                    <td>{bookingStatusPill(b.status)}</td>
                    <td className="num">{money(b.quoted_amount)}</td>
                    <td className="num">{b.deposit_amount > 0 ? money(b.deposit_amount) : '—'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {(adding || editing) && (
        <BookingForm
          booking={editing}
          customers={customers}
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

const BookingForm: React.FC<{
  booking: Booking | null;
  customers: Customer[];
  onClose: () => void;
  onSaved: () => void;
}> = ({ booking, customers, onClose, onSaved }) => {
  const [customerId, setCustomerId] = useState(booking?.customer_id ?? '');
  const [newName, setNewName] = useState('');
  const [newPhone, setNewPhone] = useState('');
  const [pkg, setPkg] = useState(booking?.package ?? PACKAGES[0]);
  const [date, setDate] = useState(booking?.party_date ?? '');
  const [time, setTime] = useState(booking?.start_time?.slice(0, 5) ?? '12:30');
  const [skaters, setSkaters] = useState(String(booking?.num_skaters ?? ''));
  const [status, setStatus] = useState<BookingStatus>(booking?.status ?? 'inquiry');
  const [quoted, setQuoted] = useState(String(booking?.quoted_amount ?? ''));
  const [deposit, setDeposit] = useState(String(booking?.deposit_amount ?? ''));
  const [notes, setNotes] = useState(booking?.notes ?? '');
  const [busy, setBusy] = useState(false);

  const save = async () => {
    setBusy(true);
    try {
      let cid = customerId;
      if (customerId === '__new__' && newName.trim()) {
        const c = await createCustomer({ name: newName.trim(), phone: newPhone.trim() || null });
        cid = c.id;
      }
      const payload: Partial<Booking> = {
        customer_id: cid && cid !== '__new__' ? cid : null,
        package: pkg,
        party_date: date || null,
        start_time: time ? `${time}:00` : null,
        num_skaters: skaters ? parseInt(skaters, 10) : null,
        status,
        quoted_amount: quoted ? parseFloat(quoted) : 0,
        deposit_amount: deposit ? parseFloat(deposit) : 0,
        notes: notes.trim() || null,
      };
      if (booking) await updateBooking(booking.id, payload);
      else await createBooking(payload);
      onSaved();
    } catch (e: any) {
      alert('Could not save: ' + (e?.message ?? 'unknown error'));
      setBusy(false);
    }
  };

  return (
    <Modal
      title={booking ? 'Edit Booking' : 'New Party Booking'}
      onClose={onClose}
      footer={
        <>
          <button className="a-btn a-btn-ghost" onClick={onClose}>
            Cancel
          </button>
          <button className="a-btn a-btn-primary" onClick={save} disabled={busy}>
            {busy ? 'Saving…' : booking ? 'Save Changes' : 'Add Booking'}
          </button>
        </>
      }
    >
      <div className="a-field">
        <label>Customer</label>
        <select className="a-select" value={customerId} onChange={(e) => setCustomerId(e.target.value)}>
          <option value="">— Choose a customer —</option>
          {customers.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
          <option value="__new__">+ Add a new customer…</option>
        </select>
      </div>
      {customerId === '__new__' && (
        <div className="a-field-row">
          <div className="a-field">
            <label>New customer name</label>
            <input className="a-input" value={newName} onChange={(e) => setNewName(e.target.value)} placeholder="e.g. The Smith Family" />
          </div>
          <div className="a-field">
            <label>Phone <span className="hint">(optional)</span></label>
            <input className="a-input" value={newPhone} onChange={(e) => setNewPhone(e.target.value)} placeholder="(260) 555-0000" />
          </div>
        </div>
      )}

      <div className="a-field">
        <label>Party package</label>
        <select className="a-select" value={pkg} onChange={(e) => setPkg(e.target.value)}>
          {PACKAGES.map((p) => (
            <option key={p}>{p}</option>
          ))}
        </select>
      </div>

      <div className="a-field-row">
        <div className="a-field">
          <label>Date</label>
          <input className="a-input" type="date" value={date} onChange={(e) => setDate(e.target.value)} />
        </div>
        <div className="a-field">
          <label>Start time</label>
          <input className="a-input" type="time" value={time} onChange={(e) => setTime(e.target.value)} />
        </div>
      </div>

      <div className="a-field-row">
        <div className="a-field">
          <label>Number of skaters</label>
          <input className="a-input" type="number" value={skaters} onChange={(e) => setSkaters(e.target.value)} placeholder="e.g. 15" />
        </div>
        <div className="a-field">
          <label>Status</label>
          <select className="a-select" value={status} onChange={(e) => setStatus(e.target.value as BookingStatus)}>
            <option value="inquiry">New Inquiry</option>
            <option value="confirmed">Confirmed</option>
            <option value="completed">Completed</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>
      </div>

      <div className="a-field-row">
        <div className="a-field">
          <label>Quoted price</label>
          <input className="a-input" type="number" value={quoted} onChange={(e) => setQuoted(e.target.value)} placeholder="220" />
        </div>
        <div className="a-field">
          <label>Deposit paid</label>
          <input className="a-input" type="number" value={deposit} onChange={(e) => setDeposit(e.target.value)} placeholder="50" />
        </div>
      </div>

      <div className="a-field">
        <label>Notes <span className="hint">(allergies, special requests…)</span></label>
        <textarea className="a-textarea" value={notes} onChange={(e) => setNotes(e.target.value)} />
      </div>
    </Modal>
  );
};

export default Bookings;
