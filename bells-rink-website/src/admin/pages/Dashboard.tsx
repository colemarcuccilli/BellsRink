import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Page } from '../components/AdminLayout';
import { KpiCard, Loading } from '../components/ui';
import { HBarChart, AreaChart, Donut } from '../components/charts';
import { getDashboardStats, DashboardStats } from '../lib/adminApi';
import { money } from '../lib/format';

const Dashboard: React.FC = () => {
  const [stats, setStats] = useState<DashboardStats | null>(null);

  useEffect(() => {
    getDashboardStats().then(setStats).catch((e) => console.error(e));
  }, []);

  const greeting = (() => {
    const h = new Date().getHours();
    if (h < 12) return 'Good morning';
    if (h < 17) return 'Good afternoon';
    return 'Good evening';
  })();

  return (
    <Page title="Dashboard" subtitle={`${greeting}! Here's how Bell's is doing.`}>
      {!stats ? (
        <Loading label="Adding up your numbers…" />
      ) : (
        <>
          <div className="a-grid a-grid-4 a-mb">
            <KpiCard label="Money In Today" value={money(stats.today)} icon="💵" tint="green" sub="Card + cash so far" />
            <KpiCard label="This Week" value={money(stats.week)} icon="📅" tint="purple" sub="Last 7 days" />
            <KpiCard label="This Month" value={money(stats.month)} icon="📈" tint="gold" sub="Last 30 days" />
            <KpiCard
              label="Parties Coming Up"
              value={String(stats.upcomingParties)}
              icon="🎉"
              tint="blue"
              sub={`${stats.pendingBookings} new inquiry${stats.pendingBookings === 1 ? '' : 's'} to answer`}
            />
          </div>

          <div className="a-grid a-grid-2 a-mb" style={{ gridTemplateColumns: '1.6fr 1fr' }}>
            <div className="a-card">
              <div className="a-card-head">
                <div>
                  <h2>Money In — Last 30 Days</h2>
                  <p>Every dollar from cards and cash, day by day</p>
                </div>
                <strong style={{ fontSize: '1.3rem', color: '#5142c4' }}>{money(stats.month)}</strong>
              </div>
              <div className="a-card-pad">
                <AreaChart points={stats.daily} />
              </div>
            </div>

            <div className="a-card">
              <div className="a-card-head">
                <h2>How People Pay</h2>
              </div>
              <div className="a-card-pad">
                <Donut
                  segments={[
                    { label: 'Online Card', value: stats.methodTotals.online_card, color: '#6b5cf0' },
                    { label: 'Card at Door', value: stats.methodTotals.in_person_card, color: '#2563eb' },
                    { label: 'Cash', value: stats.methodTotals.cash, color: '#e8920c' },
                  ]}
                />
              </div>
            </div>
          </div>

          <div className="a-card">
            <div className="a-card-head">
              <div>
                <h2>Which Events Make the Most Money?</h2>
                <p>Estimated profit after DJ, staff &amp; pizza costs — your biggest winners on top</p>
              </div>
              <Link to="/admin/accounting" className="a-btn a-btn-ghost">
                Full reports →
              </Link>
            </div>
            <div className="a-card-pad">
              <HBarChart
                data={stats.byEventType.slice(0, 8).map((t) => ({ label: t.label, value: Math.round(t.profit) }))}
              />
              <p className="a-muted" style={{ fontSize: '0.85rem', marginTop: '1rem', marginBottom: 0 }}>
                💡 Profit = money taken in minus what it costs to run that kind of night. A red number means it cost
                more than it brought in.
              </p>
            </div>
          </div>
        </>
      )}
    </Page>
  );
};

export default Dashboard;
