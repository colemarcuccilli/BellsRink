// ════════════════════════════════════════════════
// Admin data layer — all Supabase queries live here.
// Reuses the shared anon client; an authenticated admin
// session unlocks the RLS-protected admin_* tables.
// ════════════════════════════════════════════════
import { supabase } from '../../lib/supabase';

// ── Types ──
export type PaymentMethod = 'online_card' | 'in_person_card' | 'cash';
export type BookingStatus = 'inquiry' | 'confirmed' | 'completed' | 'cancelled';
export type Recurrence = 'none' | 'weekly' | 'monthly';

export interface Customer {
  id: string;
  name: string;
  email: string | null;
  phone: string | null;
  notes: string | null;
  created_at: string;
  updated_at: string;
}

export interface AdminEvent {
  id: string;
  name: string;
  event_type: string;
  event_date: string | null;
  start_time: string | null;
  end_time: string | null;
  description: string | null;
  price: number;
  icon: string;
  color: string;
  is_published: boolean;
  recurrence: Recurrence;
  recurrence_day: number | null;
  recurrence_until: string | null;
  est_cost: number;
  created_at: string;
  updated_at: string;
}

export interface Booking {
  id: string;
  customer_id: string | null;
  package: string | null;
  party_date: string | null;
  start_time: string | null;
  num_skaters: number | null;
  status: BookingStatus;
  quoted_amount: number;
  deposit_amount: number;
  notes: string | null;
  created_at: string;
  updated_at: string;
  customer?: Customer | null;
}

export interface Payment {
  id: string;
  customer_id: string | null;
  booking_id: string | null;
  event_id: string | null;
  amount: number;
  method: PaymentMethod;
  category: string;
  paid_on: string;
  notes: string | null;
  created_at: string;
  event?: { name: string; event_type: string } | null;
}

export interface CashEntry {
  id: string;
  entry_date: string;
  amount: number;
  category: string;
  event_id: string | null;
  recorded_by: string | null;
  notes: string | null;
  created_at: string;
  event?: { name: string } | null;
}

export interface AdminNotification {
  id: string;
  subject: string;
  body: string;
  audience: string;
  recipient_count: number;
  status: 'draft' | 'sent' | 'failed';
  error: string | null;
  sent_at: string | null;
  created_at: string;
}

export interface Availability {
  id: string;
  date: string;
  is_open: boolean;
  reason: string | null;
  created_at: string;
}

// ── Reference data ──
export const EVENT_TYPES: { value: string; label: string; icon: string; color: string }[] = [
  { value: 'public_session', label: 'Public Skate', icon: '🛼', color: 'special' },
  { value: 'family_pizza', label: 'Family Pizza Party', icon: '🍕', color: 'celebration' },
  { value: 'dollar_night', label: 'Dollar Night', icon: '💰', color: 'deal' },
  { value: 'glow_skate', label: 'Glow / DJ Night', icon: '✨', color: 'music' },
  { value: 'adult_skate', label: 'Adult Skate', icon: '🌙', color: 'music' },
  { value: 'matinee', label: 'Afternoon Matinee', icon: '⛸️', color: 'special' },
  { value: 'homeschool', label: 'Homeschool Skate', icon: '📚', color: 'special' },
  { value: 'holiday', label: 'Holiday / Themed', icon: '❤️', color: 'celebration' },
  { value: 'private_party', label: 'Private Party', icon: '🎉', color: 'celebration' },
  { value: 'other', label: 'Other', icon: '🎵', color: 'music' },
];

export function eventTypeLabel(value: string): string {
  return EVENT_TYPES.find((t) => t.value === value)?.label ?? value;
}

export const METHOD_LABELS: Record<PaymentMethod, string> = {
  online_card: 'Online Card',
  in_person_card: 'Card at Door',
  cash: 'Cash',
};

// ── Customers ──
export async function listCustomers(): Promise<Customer[]> {
  const { data, error } = await supabase.from('admin_customers').select('*').order('name');
  if (error) throw error;
  return data ?? [];
}
export async function createCustomer(c: Partial<Customer>): Promise<Customer> {
  const { data, error } = await supabase.from('admin_customers').insert(c).select().single();
  if (error) throw error;
  return data;
}
export async function updateCustomer(id: string, c: Partial<Customer>): Promise<void> {
  const { error } = await supabase.from('admin_customers').update(c).eq('id', id);
  if (error) throw error;
}
export async function deleteCustomer(id: string): Promise<void> {
  const { error } = await supabase.from('admin_customers').delete().eq('id', id);
  if (error) throw error;
}

// ── Events ──
export async function listEvents(): Promise<AdminEvent[]> {
  const { data, error } = await supabase
    .from('admin_events')
    .select('*')
    .order('recurrence', { ascending: true })
    .order('event_date', { ascending: true });
  if (error) throw error;
  return data ?? [];
}
export async function createEvent(e: Partial<AdminEvent>): Promise<AdminEvent> {
  const { data, error } = await supabase.from('admin_events').insert(e).select().single();
  if (error) throw error;
  return data;
}
export async function updateEvent(id: string, e: Partial<AdminEvent>): Promise<void> {
  const { error } = await supabase.from('admin_events').update(e).eq('id', id);
  if (error) throw error;
}
export async function deleteEvent(id: string): Promise<void> {
  const { error } = await supabase.from('admin_events').delete().eq('id', id);
  if (error) throw error;
}
export async function setEventPublished(id: string, is_published: boolean): Promise<void> {
  const { error } = await supabase.from('admin_events').update({ is_published }).eq('id', id);
  if (error) throw error;
}

// ── Bookings ──
export async function listBookings(): Promise<Booking[]> {
  const { data, error } = await supabase
    .from('admin_bookings')
    .select('*, customer:admin_customers(*)')
    .order('party_date', { ascending: true });
  if (error) throw error;
  return (data as any) ?? [];
}
export async function createBooking(b: Partial<Booking>): Promise<Booking> {
  const { data, error } = await supabase.from('admin_bookings').insert(b).select().single();
  if (error) throw error;
  return data;
}
export async function updateBooking(id: string, b: Partial<Booking>): Promise<void> {
  const { error } = await supabase.from('admin_bookings').update(b).eq('id', id);
  if (error) throw error;
}

// ── Payments ──
export async function listPayments(): Promise<Payment[]> {
  const { data, error } = await supabase
    .from('admin_payments')
    .select('*, event:admin_events(name,event_type)')
    .order('paid_on', { ascending: false })
    .limit(2000);
  if (error) throw error;
  return (data as any) ?? [];
}
export async function createPayment(p: Partial<Payment>): Promise<Payment> {
  const { data, error } = await supabase.from('admin_payments').insert(p).select().single();
  if (error) throw error;
  return data;
}

// ── Cash entries ──
export async function listCashEntries(): Promise<CashEntry[]> {
  const { data, error } = await supabase
    .from('admin_cash_entries')
    .select('*, event:admin_events(name)')
    .order('entry_date', { ascending: false })
    .limit(2000);
  if (error) throw error;
  return (data as any) ?? [];
}
export async function createCashEntry(c: Partial<CashEntry>): Promise<CashEntry> {
  const { data, error } = await supabase.from('admin_cash_entries').insert(c).select().single();
  if (error) throw error;
  return data;
}

// ── Notifications ──
export async function listNotifications(): Promise<AdminNotification[]> {
  const { data, error } = await supabase
    .from('admin_notifications')
    .select('*')
    .order('created_at', { ascending: false });
  if (error) throw error;
  return data ?? [];
}
export async function createNotification(n: Partial<AdminNotification>): Promise<AdminNotification> {
  const { data, error } = await supabase.from('admin_notifications').insert(n).select().single();
  if (error) throw error;
  return data;
}
// Calls the Resend edge function; falls back to marking sent if function isn't deployed.
export async function sendNotification(id: string): Promise<{ sent: number }> {
  const { data, error } = await supabase.functions.invoke('send-notification', { body: { id } });
  if (error) throw error;
  return data as { sent: number };
}

// ── Availability ──
export async function listAvailability(): Promise<Availability[]> {
  const { data, error } = await supabase.from('admin_availability').select('*').order('date');
  if (error) throw error;
  return data ?? [];
}
export async function upsertAvailability(a: Partial<Availability>): Promise<void> {
  const { error } = await supabase.from('admin_availability').upsert(a, { onConflict: 'date' });
  if (error) throw error;
}
export async function deleteAvailability(id: string): Promise<void> {
  const { error } = await supabase.from('admin_availability').delete().eq('id', id);
  if (error) throw error;
}

// ════════════════════════════════════════════════
// Analytics — fetch raw rows, aggregate in the browser.
// (Tiny data volume; keeps it flexible & dependency-free.)
// ════════════════════════════════════════════════
export interface MethodTotals { online_card: number; in_person_card: number; cash: number; }
export interface EventTypeProfit {
  event_type: string;
  label: string;
  revenue: number;
  estCost: number;
  profit: number;
  sessions: number;
}
export interface DaySeriesPoint { date: string; total: number; }
export interface DashboardStats {
  today: number;
  week: number;
  month: number;
  allTime: number;
  methodTotals: MethodTotals;
  byEventType: EventTypeProfit[];
  daily: DaySeriesPoint[];
  pendingBookings: number;
  upcomingParties: number;
}

function startOf(daysAgo: number): string {
  const d = new Date();
  d.setHours(0, 0, 0, 0);
  d.setDate(d.getDate() - daysAgo);
  return d.toISOString().slice(0, 10);
}

export async function getDashboardStats(): Promise<DashboardStats> {
  const [payments, cash, events, bookings] = await Promise.all([
    listPayments(),
    listCashEntries(),
    listEvents(),
    listBookings(),
  ]);

  const today = startOf(0);
  const weekStart = startOf(7);
  const monthStart = startOf(30);

  // Combined money-in rows (card + cash) with a date + amount + optional event link
  type Row = { date: string; amount: number; method: PaymentMethod; eventType: string | null };
  const rows: Row[] = [];
  const eventTypeById = new Map(events.map((e) => [e.id, e.event_type]));

  for (const p of payments) {
    rows.push({
      date: p.paid_on,
      amount: Number(p.amount),
      method: p.method,
      eventType: p.event?.event_type ?? (p.event_id ? eventTypeById.get(p.event_id) ?? null : null),
    });
  }
  for (const c of cash) {
    rows.push({
      date: c.entry_date,
      amount: Number(c.amount),
      method: 'cash',
      eventType: c.event_id ? eventTypeById.get(c.event_id) ?? null : null,
    });
  }

  const sum = (filter: (r: Row) => boolean) => rows.filter(filter).reduce((a, r) => a + r.amount, 0);

  const methodTotals: MethodTotals = {
    online_card: sum((r) => r.method === 'online_card'),
    in_person_card: sum((r) => r.method === 'in_person_card'),
    cash: sum((r) => r.method === 'cash'),
  };

  // Profit by event type: revenue − (est_cost × distinct session days)
  const estCostByType = new Map<string, number>();
  for (const e of events) {
    estCostByType.set(e.event_type, (estCostByType.get(e.event_type) ?? 0) + Number(e.est_cost));
  }
  const typeAgg = new Map<string, { revenue: number; days: Set<string> }>();
  for (const r of rows) {
    if (!r.eventType) continue;
    const agg = typeAgg.get(r.eventType) ?? { revenue: 0, days: new Set<string>() };
    agg.revenue += r.amount;
    agg.days.add(r.date);
    typeAgg.set(r.eventType, agg);
  }
  // average est cost per session for the type (defs may have multiple rows of same type)
  const avgCostByType = new Map<string, number>();
  const typeDefCount = new Map<string, number>();
  for (const e of events) {
    avgCostByType.set(e.event_type, (avgCostByType.get(e.event_type) ?? 0) + Number(e.est_cost));
    typeDefCount.set(e.event_type, (typeDefCount.get(e.event_type) ?? 0) + 1);
  }
  const byEventType: EventTypeProfit[] = Array.from(typeAgg.entries())
    .map(([event_type, agg]) => {
      const sessions = agg.days.size;
      const perSession = (avgCostByType.get(event_type) ?? 0) / (typeDefCount.get(event_type) ?? 1);
      const estCost = perSession * sessions;
      return {
        event_type,
        label: eventTypeLabel(event_type),
        revenue: agg.revenue,
        estCost,
        profit: agg.revenue - estCost,
        sessions,
      };
    })
    .sort((a, b) => b.profit - a.profit);

  // Daily series, last 30 days
  const dayMap = new Map<string, number>();
  for (let i = 29; i >= 0; i--) dayMap.set(startOf(i), 0);
  for (const r of rows) {
    if (r.date >= monthStart && dayMap.has(r.date)) {
      dayMap.set(r.date, (dayMap.get(r.date) ?? 0) + r.amount);
    }
  }
  const daily: DaySeriesPoint[] = Array.from(dayMap.entries()).map(([date, total]) => ({ date, total }));

  const upcoming = bookings.filter(
    (b) => (b.status === 'confirmed' || b.status === 'inquiry') && b.party_date && b.party_date >= today
  );

  return {
    today: sum((r) => r.date === today),
    week: sum((r) => r.date >= weekStart),
    month: sum((r) => r.date >= monthStart),
    allTime: sum(() => true),
    methodTotals,
    byEventType,
    daily,
    pendingBookings: bookings.filter((b) => b.status === 'inquiry').length,
    upcomingParties: upcoming.length,
  };
}
