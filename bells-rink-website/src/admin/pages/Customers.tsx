import React, { useEffect, useMemo, useState } from 'react';
import { Page } from '../components/AdminLayout';
import { Modal, Loading, EmptyState, bookingStatusPill } from '../components/ui';
import {
  Customer,
  Booking,
  Payment,
  listCustomers,
  listBookings,
  listPayments,
  createCustomer,
  updateCustomer,
} from '../lib/adminApi';
import { money, prettyDate } from '../lib/format';

const Customers: React.FC = () => {
  const [customers, setCustomers] = useState<Customer[] | null>(null);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [payments, setPayments] = useState<Payment[]>([]);
  const [search, setSearch] = useState('');
  const [detail, setDetail] = useState<Customer | null>(null);
  const [adding, setAdding] = useState(false);

  const load = () => {
    listCustomers().then(setCustomers);
    listBookings().then(setBookings);
    listPayments().then(setPayments);
  };
  useEffect(load, []);

  const stats = useMemo(() => {
    const m = new Map<string, { spent: number; bookings: number }>();
    for (const p of payments) {
      if (!p.customer_id) continue;
      const s = m.get(p.customer_id) ?? { spent: 0, bookings: 0 };
      s.spent += Number(p.amount);
      m.set(p.customer_id, s);
    }
    for (const b of bookings) {
      if (!b.customer_id) continue;
      const s = m.get(b.customer_id) ?? { spent: 0, bookings: 0 };
      s.bookings += 1;
      m.set(b.customer_id, s);
    }
    return m;
  }, [payments, bookings]);

  const filtered = (customers ?? []).filter(
    (c) =>
      !search ||
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      (c.phone ?? '').includes(search) ||
      (c.email ?? '').toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Page
      title="Customers"
      subtitle="Everyone who's booked or skated with you"
      actions={
        <button className="a-btn a-btn-primary" onClick={() => setAdding(true)}>
          + Add Customer
        </button>
      }
    >
      <div className="a-mb">
        <input
          className="a-input"
          style={{ maxWidth: 360 }}
          placeholder="🔍 Search by name, phone, or email…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="a-card">
        {!customers ? (
          <Loading />
        ) : filtered.length === 0 ? (
          <EmptyState icon="👥" title="No customers found" />
        ) : (
          <div className="a-table-wrap">
            <table className="a-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Phone</th>
                  <th>Email</th>
                  <th className="num">Bookings</th>
                  <th className="num">Total Spent</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((c) => {
                  const s = stats.get(c.id) ?? { spent: 0, bookings: 0 };
                  return (
                    <tr key={c.id} className="a-row-click" onClick={() => setDetail(c)}>
                      <td>
                        <strong>{c.name}</strong>
                        {c.notes && <div className="a-muted" style={{ fontSize: '0.8rem' }}>{c.notes}</div>}
                      </td>
                      <td>{c.phone ?? '—'}</td>
                      <td>{c.email ?? '—'}</td>
                      <td className="num">{s.bookings}</td>
                      <td className="num">{money(s.spent)}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {detail && (
        <CustomerDetail
          customer={detail}
          bookings={bookings.filter((b) => b.customer_id === detail.id)}
          payments={payments.filter((p) => p.customer_id === detail.id)}
          onClose={() => setDetail(null)}
          onSaved={() => {
            setDetail(null);
            load();
          }}
        />
      )}
      {adding && (
        <CustomerForm
          onClose={() => setAdding(false)}
          onSaved={() => {
            setAdding(false);
            load();
          }}
        />
      )}
    </Page>
  );
};

const CustomerDetail: React.FC<{
  customer: Customer;
  bookings: Booking[];
  payments: Payment[];
  onClose: () => void;
  onSaved: () => void;
}> = ({ customer, bookings, payments, onClose, onSaved }) => {
  const [edit, setEdit] = useState(false);
  const totalSpent = payments.reduce((a, p) => a + Number(p.amount), 0);

  if (edit) return <CustomerForm customer={customer} onClose={() => setEdit(false)} onSaved={onSaved} />;

  return (
    <Modal
      title={customer.name}
      onClose={onClose}
      footer={
        <>
          <button className="a-btn a-btn-ghost" onClick={onClose}>Close</button>
          <button className="a-btn a-btn-primary" onClick={() => setEdit(true)}>Edit Info</button>
        </>
      }
    >
      <div className="a-grid a-grid-2 a-mb">
        <div>
          <div className="a-muted" style={{ fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Phone</div>
          <div>{customer.phone ?? '—'}</div>
        </div>
        <div>
          <div className="a-muted" style={{ fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Email</div>
          <div>{customer.email ?? '—'}</div>
        </div>
      </div>
      {customer.notes && (
        <div className="a-mb" style={{ background: '#f8f9fd', padding: '0.8rem 1rem', borderRadius: 9 }}>
          <strong>Notes:</strong> {customer.notes}
        </div>
      )}

      <div className="a-flex-between a-mb" style={{ background: '#dcfce7', padding: '0.9rem 1.1rem', borderRadius: 10 }}>
        <strong>Total spent with Bell's</strong>
        <span style={{ fontWeight: 800, fontSize: '1.3rem', color: '#16a34a' }}>{money(totalSpent)}</span>
      </div>

      <h3 style={{ fontSize: '1rem', margin: '1.25rem 0 0.6rem' }}>Booking History</h3>
      {bookings.length === 0 ? (
        <p className="a-muted">No bookings yet.</p>
      ) : (
        bookings.map((b) => (
          <div key={b.id} className="a-flex-between" style={{ padding: '0.6rem 0', borderBottom: '1px solid var(--a-border)' }}>
            <div>
              <strong>{b.package}</strong>
              <div className="a-muted" style={{ fontSize: '0.82rem' }}>{prettyDate(b.party_date)} · {b.num_skaters ?? '?'} skaters</div>
            </div>
            <div className="a-flex">
              {bookingStatusPill(b.status)}
              <span style={{ fontWeight: 700 }}>{money(b.quoted_amount)}</span>
            </div>
          </div>
        ))
      )}
    </Modal>
  );
};

const CustomerForm: React.FC<{ customer?: Customer; onClose: () => void; onSaved: () => void }> = ({
  customer,
  onClose,
  onSaved,
}) => {
  const [name, setName] = useState(customer?.name ?? '');
  const [phone, setPhone] = useState(customer?.phone ?? '');
  const [email, setEmail] = useState(customer?.email ?? '');
  const [notes, setNotes] = useState(customer?.notes ?? '');
  const [busy, setBusy] = useState(false);

  const save = async () => {
    if (!name.trim()) return;
    setBusy(true);
    try {
      const payload = { name: name.trim(), phone: phone.trim() || null, email: email.trim() || null, notes: notes.trim() || null };
      if (customer) await updateCustomer(customer.id, payload);
      else await createCustomer(payload);
      onSaved();
    } catch (e: any) {
      alert('Could not save: ' + (e?.message ?? 'unknown error'));
      setBusy(false);
    }
  };

  return (
    <Modal
      title={customer ? 'Edit Customer' : 'Add Customer'}
      onClose={onClose}
      footer={
        <>
          <button className="a-btn a-btn-ghost" onClick={onClose}>Cancel</button>
          <button className="a-btn a-btn-primary" onClick={save} disabled={busy || !name.trim()}>
            {busy ? 'Saving…' : 'Save'}
          </button>
        </>
      }
    >
      <div className="a-field">
        <label>Name</label>
        <input className="a-input" value={name} onChange={(e) => setName(e.target.value)} placeholder="The Smith Family" />
      </div>
      <div className="a-field-row">
        <div className="a-field">
          <label>Phone</label>
          <input className="a-input" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="(260) 555-0000" />
        </div>
        <div className="a-field">
          <label>Email</label>
          <input className="a-input" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="name@email.com" />
        </div>
      </div>
      <div className="a-field">
        <label>Notes</label>
        <textarea className="a-textarea" value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="Allergies, preferences, anything to remember…" />
      </div>
    </Modal>
  );
};

export default Customers;
