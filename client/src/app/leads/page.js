'use client';
import { useEffect, useState } from 'react';
import LeadCard from '../../components/LeadCard';
import LeadForm from '../../components/LeadForm';
import FilterBar from '../../components/FilterBar';
import { getAllLeads, addLead, updateLead, deleteLead } from '../../services/api';

export default function LeadsPage() {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editLead, setEditLead] = useState(null);
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [filters, setFilters] = useState({ filterTemperature: '', filterLeadSource: '', sortValue: '' });

  const fetchLeads = (f = filters) => {
    setLoading(true);
    const params = {};
    if (f.filterTemperature) params.filterTemperature = f.filterTemperature;
    if (f.filterLeadSource) params.filterLeadSource = f.filterLeadSource;
    if (f.sortValue) params.sortValue = f.sortValue;

    getAllLeads(params)
      .then(res => setLeads(res.data.data))
      .catch(() => setError('Failed to load leads'))
      .finally(() => setLoading(false));
  };

  useEffect(() => { fetchLeads(); }, []);

  const handleFilterChange = (f) => { setFilters(f); fetchLeads(f); };
  const handleAdd = async (data) => { await addLead(data); fetchLeads(); };
  const handleEdit = async (data) => { await updateLead(editLead._id, data); fetchLeads(); };
  const handleDelete = async (id) => { await deleteLead(id); setDeleteConfirm(null); fetchLeads(); };

  return (
    <main style={{ maxWidth: '1200px', margin: '0 auto', padding: '32px 24px' }}>

      {/* Header */}
      <div style={{
        display: 'flex', alignItems: 'flex-start',
        justifyContent: 'space-between',
        flexWrap: 'wrap', gap: '12px',
        marginBottom: '24px',
      }}>
        <div>
          <p style={{
            fontSize: '11px', color: 'var(--muted)',
            letterSpacing: '0.08em', textTransform: 'uppercase',
            fontWeight: 600, marginBottom: '6px'
          }}>
            {leads.length} leads
          </p>
          <h1 style={{
            fontFamily: 'Syne, sans-serif', fontWeight: 800,
            fontSize: 'clamp(22px, 4vw, 30px)',
            color: 'var(--text)', letterSpacing: '-0.02em'
          }}>
            All Leads
          </h1>
        </div>
        <button onClick={() => { setEditLead(null); setShowForm(true); }} style={{
          padding: '10px 20px',
          borderRadius: '10px', fontSize: '13px', fontWeight: 600,
          backgroundColor: 'var(--accent)',
          border: 'none', color: 'white', cursor: 'pointer',
          alignSelf: 'center', whiteSpace: 'nowrap',
        }}>
          + Add Lead
        </button>
      </div>

      {/* Filters */}
      <div style={{ marginBottom: '24px' }}>
        <FilterBar filters={filters} onChange={handleFilterChange} />
      </div>

      {/* Error */}
      {error && (
        <div style={{
          backgroundColor: '#ef444415', border: '1px solid #ef444430',
          borderRadius: '10px', padding: '12px 16px',
          fontSize: '13px', color: '#ef4444', marginBottom: '20px',
        }}>
          {error}
        </div>
      )}

      {/* Loading */}
      {loading && (
        <div style={{ color: 'var(--muted)', fontSize: '14px', padding: '40px 0' }}>
          Loading leads...
        </div>
      )}

      {/* Empty */}
      {!loading && leads.length === 0 && (
        <div style={{ textAlign: 'center', padding: '80px 0', color: 'var(--muted)' }}>
          <p style={{ fontSize: '40px', marginBottom: '12px' }}>📋</p>
          <p style={{ fontFamily: 'Syne, sans-serif', fontSize: '17px', color: 'var(--text)', fontWeight: 600, marginBottom: '6px' }}>
            No leads found
          </p>
          <p style={{ fontSize: '13px' }}>Add your first lead to get started</p>
        </div>
      )}

      {/* Grid — responsive */}
      {!loading && leads.length > 0 && (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
          gap: '14px',
        }}>
          {leads.map((lead) => (
            <LeadCard
              key={lead._id}
              lead={lead}
              onEdit={(l) => { setEditLead(l); setShowForm(true); }}
              onDelete={(id) => setDeleteConfirm(id)}
            />
          ))}
        </div>
      )}

      {/* Form Modal */}
      {showForm && (
        <LeadForm
          initialData={editLead}
          onSubmit={editLead ? handleEdit : handleAdd}
          onClose={() => { setShowForm(false); setEditLead(null); }}
        />
      )}

      {/* Delete Confirm */}
      {deleteConfirm && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.8)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          zIndex: 100, backdropFilter: 'blur(4px)',
          padding: '16px',
        }}>
          <div style={{
            backgroundColor: 'var(--surface)',
            border: '1px solid var(--border)',
            borderRadius: '18px', padding: '32px',
            width: '100%', maxWidth: '380px',
          }}>
            <p style={{ fontSize: '32px', marginBottom: '14px' }}>🗑️</p>
            <h3 style={{
              fontFamily: 'Syne, sans-serif', fontWeight: 700,
              fontSize: '18px', color: 'var(--text)', marginBottom: '8px',
            }}>
              Delete this lead?
            </h3>
            <p style={{ fontSize: '13px', color: 'var(--muted)', marginBottom: '28px' }}>
              This action cannot be undone.
            </p>
            <div style={{ display: 'flex', gap: '10px' }}>
              <button onClick={() => setDeleteConfirm(null)} style={{
                flex: 1, padding: '12px', borderRadius: '10px',
                fontSize: '13px', fontWeight: 500,
                backgroundColor: 'var(--surface2)',
                border: '1px solid var(--border)',
                color: 'var(--text)', cursor: 'pointer',
              }}>
                Cancel
              </button>
              <button onClick={() => handleDelete(deleteConfirm)} style={{
                flex: 1, padding: '12px', borderRadius: '10px',
                fontSize: '13px', fontWeight: 600,
                backgroundColor: '#ef4444', border: 'none',
                color: 'white', cursor: 'pointer',
              }}>
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}