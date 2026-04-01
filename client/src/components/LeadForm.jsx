'use client';
import { useState, useEffect } from 'react';

const COUNTRY_CODES = [
    { code: '+91', flag: '🇮🇳', name: 'India' },
    { code: '+1', flag: '🇺🇸', name: 'USA' },
    { code: '+971', flag: '🇦🇪', name: 'UAE' },
    { code: '+44', flag: '🇬🇧', name: 'UK' },
    { code: '+61', flag: '🇦🇺', name: 'Australia' },
    { code: '+65', flag: '🇸🇬', name: 'Singapore' },
    { code: '+60', flag: '🇲🇾', name: 'Malaysia' },
    { code: '+49', flag: '🇩🇪', name: 'Germany' },
    { code: '+33', flag: '🇫🇷', name: 'France' },
    { code: '+971', flag: '🇸🇦', name: 'Saudi Arabia' },
];

const defaultForm = {
    companyName: '', contactPerson: '', email: '',
    phoneCode: '+91', phoneNumber: '',
    leadSource: 'other', temperature: 'warm', notes: ''
};

const inputStyle = {
    width: '100%',
    backgroundColor: 'var(--surface2)',
    border: '1px solid var(--border)',
    borderRadius: '8px',
    padding: '10px 12px',
    fontSize: '13px',
    color: 'var(--text)',
    outline: 'none',
    fontFamily: 'DM Sans, sans-serif',
};

const labelStyle = {
    display: 'block',
    fontSize: '11px',
    fontWeight: 600,
    color: 'var(--muted)',
    marginBottom: '6px',
    letterSpacing: '0.05em',
    textTransform: 'uppercase',
};

export default function LeadForm({ onSubmit, onClose, initialData }) {
    const [form, setForm] = useState(defaultForm);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        if (initialData) {
            // Parse existing phone into code + number
            const existingPhone = initialData.phone || '';
            const matchedCode = COUNTRY_CODES.find(c => existingPhone.startsWith(c.code));
            setForm({
                ...initialData,
                phoneCode: matchedCode ? matchedCode.code : '+91',
                phoneNumber: matchedCode ? existingPhone.slice(matchedCode.code.length) : existingPhone,
            });
        } else {
            setForm(defaultForm);
        }
    }, [initialData]);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
        setError('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        try {
            const submitData = {
                companyName: form.companyName,
                contactPerson: form.contactPerson,
                email: form.email,
                phone: form.phoneNumber ? `${form.phoneCode}${form.phoneNumber}` : '',
                leadSource: form.leadSource,
                temperature: form.temperature,
                notes: form.notes,
            };
            await onSubmit(submitData);
            onClose();
        } catch (err) {
            setError(err?.response?.data?.message || 'Something went wrong');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{
            position: 'fixed', inset: 0,
            backgroundColor: 'rgba(0,0,0,0.8)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            zIndex: 50, padding: '16px',
            backdropFilter: 'blur(4px)',
        }}>
            <div style={{
                backgroundColor: 'var(--surface)',
                border: '1px solid var(--border)',
                borderRadius: '18px',
                width: '100%', maxWidth: '500px',
                maxHeight: '92vh', overflowY: 'auto',
            }}>

                {/* Header */}
                <div style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                    padding: '18px 24px',
                    borderBottom: '1px solid var(--border)',
                    position: 'sticky', top: 0,
                    backgroundColor: 'var(--surface)',
                    borderRadius: '18px 18px 0 0',
                    zIndex: 1,
                }}>
                    <h2 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: '16px', color: 'var(--text)' }}>
                        {initialData ? 'Edit Lead' : 'Add New Lead'}
                    </h2>
                    <button onClick={onClose} style={{
                        background: 'none', border: 'none',
                        color: 'var(--muted)', cursor: 'pointer', fontSize: '16px',
                        width: '30px', height: '30px',
                        borderRadius: '8px',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        backgroundColor: 'var(--surface2)',
                    }}>✕</button>
                </div>

                <form onSubmit={handleSubmit} style={{ padding: '20px 24px', display: 'flex', flexDirection: 'column', gap: '14px' }}>

                    {error && (
                        <div style={{
                            backgroundColor: '#ef444415', border: '1px solid #ef444430',
                            borderRadius: '8px', padding: '10px 14px',
                            fontSize: '13px', color: '#ef4444',
                        }}>
                            {error}
                        </div>
                    )}

                    {/* Company + Contact - responsive grid */}
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '12px' }}>
                        <div>
                            <label style={labelStyle}>Company Name *</label>
                            <input name="companyName" value={form.companyName} onChange={handleChange}
                                style={inputStyle} placeholder="TechCorp Inc" required />
                        </div>
                        <div>
                            <label style={labelStyle}>Contact Person *</label>
                            <input name="contactPerson" value={form.contactPerson} onChange={handleChange}
                                style={inputStyle} placeholder="John Smith" required />
                        </div>
                    </div>

                    {/* Email */}
                    <div>
                        <label style={labelStyle}>Email *</label>
                        <input name="email" type="email" value={form.email} onChange={handleChange}
                            style={inputStyle} placeholder="john@techcorp.com" required />
                    </div>

                    {/* Phone with country code */}
                    <div>
                        <label style={labelStyle}>Phone (Optional)</label>
                        <div style={{ display: 'flex', gap: '8px' }}>
                            <select
                                name="phoneCode"
                                value={form.phoneCode}
                                onChange={handleChange}
                                style={{
                                    ...inputStyle,
                                    width: 'auto',
                                    flexShrink: 0,
                                    padding: '10px 8px',
                                    cursor: 'pointer',
                                }}
                            >
                                {COUNTRY_CODES.map((c, i) => (
                                    <option key={i} value={c.code}>
                                        {c.flag} {c.code} {c.name}
                                    </option>
                                ))}
                            </select>
                            <input
                                name="phoneNumber"
                                value={form.phoneNumber}
                                onChange={handleChange}
                                style={{ ...inputStyle, flex: 1 }}
                                placeholder="9879216262"
                                type="tel"
                            />
                        </div>
                    </div>

                    {/* Lead Source + Temperature */}
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '12px' }}>
                        <div>
                            <label style={labelStyle}>Lead Source *</label>
                            <select name="leadSource" value={form.leadSource} onChange={handleChange} style={{ ...inputStyle, cursor: 'pointer' }}>
                                {['website', 'referral', 'conference', 'linkedin', 'cold outreach', 'other'].map(s => (
                                    <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label style={labelStyle}>Temperature *</label>
                            <select name="temperature" value={form.temperature} onChange={handleChange} style={{ ...inputStyle, cursor: 'pointer' }}>
                                <option value="hot">🔥 Hot</option>
                                <option value="warm">🌤 Warm</option>
                                <option value="cold">🧊 Cold</option>
                            </select>
                        </div>
                    </div>

                    {/* Notes */}
                    <div>
                        <label style={labelStyle}>Notes (Optional)</label>
                        <textarea name="notes" value={form.notes} onChange={handleChange}
                            style={{ ...inputStyle, resize: 'none' }} rows={3} placeholder="Any additional notes..." />
                    </div>

                    {/* Buttons */}
                    <div style={{ display: 'flex', gap: '10px', paddingTop: '4px' }}>
                        <button type="button" onClick={onClose} style={{
                            flex: 1, padding: '11px',
                            borderRadius: '10px', fontSize: '13px', fontWeight: 500,
                            backgroundColor: 'var(--surface2)',
                            border: '1px solid var(--border)',
                            color: 'var(--text)', cursor: 'pointer',
                        }}>
                            Cancel
                        </button>
                        <button type="submit" disabled={loading} style={{
                            flex: 1, padding: '11px',
                            borderRadius: '10px', fontSize: '13px', fontWeight: 600,
                            backgroundColor: 'var(--accent)',
                            border: 'none',
                            color: 'white', cursor: loading ? 'not-allowed' : 'pointer',
                            opacity: loading ? 0.7 : 1,
                        }}>
                            {loading ? 'Saving...' : initialData ? 'Update Lead' : 'Add Lead'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}