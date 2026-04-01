'use client';

const selectStyle = {
    backgroundColor: 'var(--surface)',
    border: '1px solid var(--border)',
    borderRadius: '8px',
    padding: '8px 12px',
    fontSize: '13px',
    color: 'var(--text)',
    outline: 'none',
    cursor: 'pointer',
    fontFamily: 'DM Sans, sans-serif',
    flex: '1 1 140px',
};

export default function FilterBar({ filters, onChange }) {
    const hasFilters = filters.filterTemperature || filters.filterLeadSource || filters.sortValue;

    return (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', alignItems: 'center' }}>
            <select value={filters.filterTemperature || ''} style={selectStyle}
                onChange={e => onChange({ ...filters, filterTemperature: e.target.value })}>
                <option value="">All Temperatures</option>
                <option value="hot">🔥 Hot</option>
                <option value="warm">🌤 Warm</option>
                <option value="cold">🧊 Cold</option>
            </select>

            <select value={filters.filterLeadSource || ''} style={selectStyle}
                onChange={e => onChange({ ...filters, filterLeadSource: e.target.value })}>
                <option value="">All Sources</option>
                {['website', 'referral', 'conference', 'linkedin', 'cold outreach', 'other'].map(s => (
                    <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>
                ))}
            </select>

            <select value={filters.sortValue || ''} style={selectStyle}
                onChange={e => onChange({ ...filters, sortValue: e.target.value })}>
                <option value="">Sort: Oldest First</option>
                <option value="dateNewest">Sort: Newest First</option>
                <option value="companyNameAsc">Company Name A-Z</option>
                <option value="companyNameDesc">Company Name Z-A</option>
            </select>

            {hasFilters && (
                <button onClick={() => onChange({ filterTemperature: '', filterLeadSource: '', sortValue: '' })}
                    style={{
                        background: 'none', border: '1px solid var(--border)',
                        borderRadius: '8px', padding: '8px 12px',
                        fontSize: '13px', color: '#ef4444', cursor: 'pointer',
                        whiteSpace: 'nowrap',
                    }}>
                    Clear ✕
                </button>
            )}
        </div>
    );
}