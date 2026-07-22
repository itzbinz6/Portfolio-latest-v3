import { useEffect, useState } from 'react';
import { NavLink, Outlet, useLocation } from 'react-router-dom';
import { useTheme } from '../hooks/useTheme';

const NAV_ITEMS = [
  { to: '/about', label: 'About' },
  { to: '/work', label: 'Work' },
  { to: '/certifications', label: 'Certifications' },
  { to: '/#faq-contact', label: 'Contact' },
];

export default function Layout() {
  const { theme, toggle } = useTheme();
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  // Close the mobile menu on every route change so it never lingers
  // open after a link is tapped.
  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname, location.hash]);

  // Hash links (Contact) always point at "/", so once we land on
  // the homepage with a hash, scroll to that section.
  useEffect(() => {
    if (location.pathname === '/' && location.hash) {
      const el = document.querySelector(location.hash);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  }, [location.pathname, location.hash]);

  const isSectionLink = (to: string) => to.startsWith('/#');
  // A "/#faq-contact" link should only show as active while sitting on that
  // section of the homepage — never on /work, /about, etc.
  const sectionIsActive = (to: string) =>
    location.pathname === '/' && location.hash === to.slice(1);

  return (
    <>
      <nav id="mainNav">
        <div className="container nav-inner">
          <NavLink to="/" className="logo">
            ajayi<span>.</span>
          </NavLink>
          <ul className="nav-links">
            {NAV_ITEMS.map((item) => (
              <li key={item.to}>
                {isSectionLink(item.to) ? (
                  <a href={item.to} className={sectionIsActive(item.to) ? 'active' : ''}>
                    {item.label}
                  </a>
                ) : (
                  <NavLink to={item.to} className={({ isActive }) => (isActive ? 'active' : '')}>
                    {item.label}
                  </NavLink>
                )}
              </li>
            ))}
          </ul>
          <div className="nav-right">
            <button
              className="theme-btn"
              aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
              onClick={toggle}
            >
              <i className={theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon'} aria-hidden="true" />
            </button>
            <button
              className="hamburger"
              aria-label="Menu"
              aria-expanded={menuOpen}
              aria-controls="mobileMenu"
              onClick={() => setMenuOpen((o) => !o)}
            >
              <span></span>
              <span></span>
              <span></span>
            </button>
          </div>
        </div>
      </nav>

      <div id="mobileMenu" className={`mobile-menu${menuOpen ? ' open' : ''}`}>
        {NAV_ITEMS.map((item) =>
          isSectionLink(item.to) ? (
            <a key={item.to} href={item.to} className="mobile-link">
              {item.label}
            </a>
          ) : (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) => `mobile-link${isActive ? ' active' : ''}`}
            >
              {item.label}
            </NavLink>
          )
        )}
      </div>

      <main>
        <Outlet />
      </main>

      <footer>
        <div className="container">
          <p>
            © 2026 Ajayi Abisola Enoch · Built by me, for me ·{' '}
            <a href="https://wa.me/2348081595625" style={{ color: 'var(--accent)' }}>
              Say hi on WhatsApp
            </a>
          </p>
        </div>
      </footer>
    </>
  );
}
