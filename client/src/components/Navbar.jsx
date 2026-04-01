'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navbar() {
    const pathname = usePathname();

    return (
        <nav style={{
            backgroundColor: 'var(--surface)',
            borderBottom: '1px solid var(--border)',
            position: 'sticky',
            top: 0,
            zIndex: 40,
        }}>
            <div style={{
                maxWidth: '1200px',
                margin: '0 auto',
                padding: '0 24px',
                height: '56px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
            }}>
                {/* Logo */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ fontSize: '18px' }}>🎯</span>
                    <span style={{
                        fontFamily: 'Syne, sans-serif',
                        fontWeight: 700,
                        fontSize: '16px',
                        color: 'var(--text)',
                        letterSpacing: '-0.02em',
                    }}>
                        LeadManager
                    </span>
                </div>

                {/* Links */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    {[{ href: '/', label: 'Dashboard' }, { href: '/leads', label: 'Leads' }].map(({ href, label }) => {
                        const active = pathname === href;
                        return (
                            <Link key={href} href={href} style={{
                                padding: '6px 14px',
                                borderRadius: '8px',
                                fontSize: '13px',
                                fontWeight: 500,
                                color: active ? 'var(--text)' : 'var(--muted)',
                                backgroundColor: active ? 'var(--surface2)' : 'transparent',
                                border: active ? '1px solid var(--border)' : '1px solid transparent',
                                transition: 'all 0.2s',
                                textDecoration: 'none',
                                whiteSpace: 'nowrap',
                            }}>
                                {label}
                            </Link>
                        );
                    })}
                </div>
            </div>
        </nav>
    );
}