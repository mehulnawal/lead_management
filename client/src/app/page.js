'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import StatCard from '../components/StatCard';
import { getStats } from '../services/api';

export default function Dashboard() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    getStats()
      .then(res => setStats(res.data.data))
      .catch(() => setError('Failed to load stats'))
      .finally(() => setLoading(false));
  }, []);

  return (
    <main style={{ maxWidth: '1200px', margin: '0 auto', padding: '32px 24px' }}>

      {/* Header */}
      <div style={{
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '12px',
        marginBottom: '32px',
      }}>
        <div>
          <p style={{
            fontSize: '11px', color: 'var(--muted)',
            letterSpacing: '0.08em', textTransform: 'uppercase',
            fontWeight: 600, marginBottom: '6px'
          }}>
            Overview
          </p>
          <h1 style={{
            fontFamily: 'Syne, sans-serif', fontWeight: 800,
            fontSize: 'clamp(22px, 4vw, 30px)',
            color: 'var(--text)', letterSpacing: '-0.02em'
          }}>
            Dashboard
          </h1>
        </div>
        <Link href="/leads" style={{
          padding: '10px 18px',
          borderRadius: '10px',
          fontSize: '13px', fontWeight: 600,
          backgroundColor: 'var(--accent)',
          color: 'white', textDecoration: 'none',
          whiteSpace: 'nowrap',
          alignSelf: 'center',
        }}>
          View All Leads →
        </Link>
      </div>

      {/* Error */}
      {error && (
        <div style={{
          backgroundColor: '#ef444415', border: '1px solid #ef444430',
          borderRadius: '10px', padding: '12px 16px',
          fontSize: '13px', color: '#ef4444', marginBottom: '24px',
        }}>
          {error}
        </div>
      )}

      {/* Loading */}
      {loading && (
        <div style={{ color: 'var(--muted)', fontSize: '14px', padding: '40px 0' }}>
          Loading stats...
        </div>
      )}

      {/* Stats Grid — responsive */}
      {stats && (
        <>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
            gap: '14px',
            marginBottom: '32px',
          }}>
            <StatCard label="Total Leads" count={stats.totalLeads} accent="#e2e8f0" icon="📋" />
            <StatCard label="Hot Leads" count={stats.hotLeads} accent="#ef4444" icon="🔥" />
            <StatCard label="Warm Leads" count={stats.warmLeads} accent="#f59e0b" icon="🌤" />
            <StatCard label="Cold Leads" count={stats.coldLeads} accent="#60a5fa" icon="🧊" />
          </div>

          {/* Bottom card */}
          <div style={{
            padding: '20px 24px',
            backgroundColor: 'var(--surface)',
            border: '1px solid var(--border)',
            borderRadius: '14px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '12px',
          }}>
            <div>
              <p style={{ fontFamily: 'Syne, sans-serif', fontWeight: 600, fontSize: '15px', color: 'var(--text)' }}>
                Manage your leads
              </p>
              <p style={{ fontSize: '13px', color: 'var(--muted)', marginTop: '4px' }}>
                Add, edit, filter and track all your leads in one place.
              </p>
            </div>
            <Link href="/leads" style={{
              padding: '9px 16px',
              borderRadius: '8px', fontSize: '13px', fontWeight: 500,
              backgroundColor: 'var(--surface2)',
              border: '1px solid var(--border)',
              color: 'var(--text)', textDecoration: 'none',
              whiteSpace: 'nowrap',
            }}>
              Go to Leads →
            </Link>
          </div>
        </>
      )}
    </main>
  );
}