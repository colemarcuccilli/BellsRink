import React, { useEffect, useState } from 'react';
import { Page } from '../components/AdminLayout';
import { Loading, EmptyState, Pill } from '../components/ui';
import {
  AdminNotification,
  listNotifications,
  createNotification,
  sendNotification,
  listCustomers,
} from '../lib/adminApi';
import { relativeTime } from '../lib/format';

const Notifications: React.FC = () => {
  const [items, setItems] = useState<AdminNotification[] | null>(null);
  const [recipientCount, setRecipientCount] = useState(0);
  const [subject, setSubject] = useState('');
  const [body, setBody] = useState('');
  const [busy, setBusy] = useState(false);
  const [flash, setFlash] = useState('');

  const load = () => listNotifications().then(setItems);
  useEffect(() => {
    load();
    listCustomers().then((cs) => setRecipientCount(cs.filter((c) => c.email).length));
  }, []);

  const send = async () => {
    if (!subject.trim() || !body.trim()) return;
    setBusy(true);
    setFlash('');
    try {
      const note = await createNotification({ subject: subject.trim(), body: body.trim(), audience: 'all', status: 'draft' });
      const res = await sendNotification(note.id);
      setSubject('');
      setBody('');
      setFlash(`Message sent to ${res.sent} customer${res.sent === 1 ? '' : 's'}!`);
      load();
    } catch (e: any) {
      setFlash('Could not send: ' + (e?.message ?? 'unknown error'));
    }
    setBusy(false);
  };

  const resend = async (n: AdminNotification) => {
    setBusy(true);
    try {
      await sendNotification(n.id);
      load();
    } catch (e: any) {
      alert('Could not send: ' + (e?.message ?? 'unknown error'));
    }
    setBusy(false);
  };

  return (
    <Page title="Send Messages" subtitle="Send announcements to your customers by email">
      <div className="a-help-banner">
        <span className="ico">ℹ️</span>
        <div>
          In this prototype, messages run through the whole system but are <strong>simulated</strong> (not actually
          emailed) until a Resend account + verified sending domain are connected. Flip one setting to go live.
        </div>
      </div>

      <div className="a-grid a-grid-2" style={{ gridTemplateColumns: '1fr 1fr', alignItems: 'start' }}>
        <div className="a-card">
          <div className="a-card-head">
            <h2>✏️ Write a Message</h2>
          </div>
          <div className="a-card-pad">
            <div className="a-field">
              <label>Subject line</label>
              <input className="a-input" value={subject} onChange={(e) => setSubject(e.target.value)} placeholder="🛼 This Weekend at Bell's!" />
            </div>
            <div className="a-field">
              <label>Message</label>
              <textarea
                className="a-textarea"
                style={{ minHeight: 160 }}
                value={body}
                onChange={(e) => setBody(e.target.value)}
                placeholder="Tell your customers what's happening this week…"
              />
            </div>
            <div className="a-flex-between" style={{ background: '#f8f9fd', padding: '0.8rem 1rem', borderRadius: 9, marginBottom: '1rem' }}>
              <span>Sending to</span>
              <Pill tone="purple">All customers · {recipientCount} people</Pill>
            </div>
            <button className="a-btn a-btn-primary a-btn-lg" style={{ width: '100%' }} onClick={send} disabled={busy || !subject.trim() || !body.trim()}>
              {busy ? 'Sending…' : '✉️ Send to All Customers'}
            </button>
            {flash && <p style={{ textAlign: 'center', marginTop: '0.75rem', color: flash.startsWith('Could') ? '#e11d6b' : '#16a34a', fontWeight: 600 }}>{flash}</p>}
          </div>
        </div>

        <div className="a-card">
          <div className="a-card-head">
            <h2>Sent History</h2>
          </div>
          {!items ? (
            <Loading />
          ) : items.length === 0 ? (
            <EmptyState icon="✉️" title="No messages yet" sub="Your sent announcements will appear here." />
          ) : (
            <div>
              {items.map((n) => (
                <div key={n.id} style={{ padding: '1rem 1.5rem', borderBottom: '1px solid var(--a-border)' }}>
                  <div className="a-flex-between">
                    <strong>{n.subject}</strong>
                    {n.status === 'sent' ? (
                      <Pill tone="green">Sent · {n.recipient_count}</Pill>
                    ) : n.status === 'failed' ? (
                      <Pill tone="pink">Failed</Pill>
                    ) : (
                      <Pill tone="gold">Draft</Pill>
                    )}
                  </div>
                  <p className="a-muted" style={{ fontSize: '0.88rem', margin: '0.35rem 0' }}>{n.body}</p>
                  <div className="a-flex-between">
                    <span className="a-muted" style={{ fontSize: '0.8rem' }}>
                      {n.sent_at ? `Sent ${relativeTime(n.sent_at)}` : 'Not sent yet'}
                    </span>
                    {n.status !== 'sent' && (
                      <button className="a-btn a-btn-ghost" style={{ padding: '0.4rem 0.8rem', fontSize: '0.85rem' }} onClick={() => resend(n)} disabled={busy}>
                        Send now
                      </button>
                    )}
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

export default Notifications;
