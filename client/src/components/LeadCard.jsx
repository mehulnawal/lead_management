'use client';

const tempConfig = {
    hot: { color: '#ef4444', bg: '#ef444415', label: '🔥 Hot', border: '#ef444435' },
    warm: { color: '#f59e0b', bg: '#f59e0b15', label: '🌤 Warm', border: '#f59e0b35' },
    cold: { color: '#60a5fa', bg: '#60a5fa15', label: '🧊 Cold', border: '#60a5fa35' },
};

export default function LeadCard({ lead, onEdit, onDelete }) {
    const t = tempConfig[lead.temperature] || tempConfig.cold;

    return (
        <div style={{
            backgroundColor: 'var(--surface)',
            border: '1px solid var(--border)',
            borderRadius: '16px',
            padding: '20px',
            display: 'flex',
            flexDirection: 'column',
            gap: '0',
            transition: 'border-color 0.2s',
        }}>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '4px' }}>
                <h3 style={{
                    fontFamily: 'Syne, sans-serif',
                    fontWeight: 700,
                    fontSize: '15px',
                    color: 'var(--text)',
                    flex: 1,
                    marginRight: '10px',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                }}>
                    {lead.companyName}
                </h3>
                <span style={{
                    fontSize: '11px',
                    fontWeight: 600,
                    padding: '4px 10px',
                    borderRadius: '20px',
                    backgroundColor: t.bg,
                    color: t.color,
                    border: `1px solid ${t.border}`,
                    whiteSpace: 'nowrap',
                    flexShrink: 0,
                }}>
                    {t.label}
                </span>
            </div>

            <p style={{ fontSize: '13px', color: 'var(--muted)', marginBottom: '16px' }}>
                {lead.contactPerson}
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '16px' }}>
                <InfoRow icon="✉️" value={lead.email} />
                {lead.phone && <InfoRow icon="📞" value={lead.phone} />}
                {lead.leadSource && <InfoRow icon="📌" value={lead.leadSource} />}
                {lead.notes && (
                    <p style={{
                        fontSize: '12px',
                        color: 'var(--muted)',
                        fontStyle: 'italic',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                        marginTop: '2px',
                    }}>
                        "{lead.notes}"
                    </p>
                )}
            </div>

            <p style={{
                fontSize: '11px',
                color: 'var(--muted)',
                borderTop: '1px solid var(--border)',
                paddingTop: '12px',
                marginBottom: '12px',
            }}>
                Added {new Date(lead.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
            </p>

            <div style={{ display: 'flex', gap: '8px' }}>
                <button onClick={() => onEdit(lead)} style={{
                    flex: 1,
                    padding: '9px 0',
                    borderRadius: '9px',
                    fontSize: '13px',
                    fontWeight: 500,
                    backgroundColor: 'var(--surface2)',
                    border: '1px solid var(--border)',
                    color: 'var(--text)',
                    cursor: 'pointer',
                    transition: 'background-color 0.15s',
                }}>
                    Edit
                </button>
                <button onClick={() => onDelete(lead._id)} style={{
                    flex: 1,
                    padding: '9px 0',
                    borderRadius: '9px',
                    fontSize: '13px',
                    fontWeight: 500,
                    backgroundColor: '#ef444415',
                    border: '1px solid #ef444430',
                    color: '#ef4444',
                    cursor: 'pointer',
                    transition: 'background-color 0.15s',
                }}>
                    Delete
                </button>
            </div>
        </div>
    );
}

function InfoRow({ icon, value }) {
    return (
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '13px', flexShrink: 0 }}>{icon}</span>
            <span style={{
                fontSize: '13px',
                color: 'var(--muted)',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
            }}>
                {value}
            </span>
        </div>
    );
}