export default function StatCard({ label, count, accent, icon }) {
    return (
        <div style={{
            backgroundColor: 'var(--surface)',
            border: '1px solid var(--border)',
            borderRadius: '14px',
            padding: '24px',
            position: 'relative',
            overflow: 'hidden',
            transition: 'border-color 0.2s',
        }}
            className="fade-up hover:border-[var(--border2)]"
        >
            <div style={{
                position: 'absolute', top: 0, right: 0,
                width: '80px', height: '80px',
                background: `radial-gradient(circle at top right, ${accent}18, transparent 70%)`,
                borderRadius: '0 14px 0 0',
            }} />
            <p style={{ fontSize: '22px', marginBottom: '10px' }}>{icon}</p>
            <p style={{ fontSize: '32px', fontWeight: 700, color: accent, fontFamily: 'Syne, sans-serif', lineHeight: 1 }}>
                {count ?? '—'}
            </p>
            <p style={{ fontSize: '12px', color: 'var(--muted)', marginTop: '6px', fontWeight: 500, letterSpacing: '0.04em', textTransform: 'uppercase' }}>
                {label}
            </p>
        </div>
    );
}