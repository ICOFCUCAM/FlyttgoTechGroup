import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';

const Navbar: React.FC = () => {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const scrollTo = (id: string) => {
    if (location.pathname !== '/') {
      navigate(`/#${id}`);
      setOpen(false);
      // scroll after navigation
      setTimeout(() => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 120);
      return;
    }
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    setOpen(false);
  };


  const links = [
    { label: 'Platforms', id: 'platforms' },
    { label: 'White-Label', id: 'whitelabel' },
    { label: 'Solutions', id: 'government' },
    { label: 'Enterprise', id: 'enterprise' },
    { label: 'Technology', id: 'technology' },
    { label: 'Contact', id: 'contact' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 h-20 flex items-center justify-between">
        <button onClick={() => scrollTo('top')} className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-[#0A3A6B] to-[#1E6FD9] flex items-center justify-center">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path d="M4 12L10 6L14 10L20 4" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M4 18L10 12L14 16L20 10" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.5" />
            </svg>
          </div>
          <div className="flex flex-col leading-tight">
            <span className="font-semibold text-slate-900 tracking-tight text-[15px]">FlyttGo</span>
            <span className="text-[10px] uppercase tracking-[0.15em] text-slate-500 font-medium">Technologies Group</span>
          </div>
        </button>

        <nav className="hidden lg:flex items-center gap-1">
          {links.map((l) => (
            <button
              key={l.id}
              onClick={() => scrollTo(l.id)}
              className="px-4 py-2 text-sm font-medium text-slate-700 hover:text-slate-900 hover:bg-slate-50 rounded-md transition-colors"
            >
              {l.label}
            </button>
          ))}
        </nav>

        <div className="hidden lg:flex items-center gap-3">
          <button
            onClick={() => scrollTo('contact')}
            className="px-4 py-2 text-sm font-medium text-slate-700 hover:text-slate-900"
          >
            Sign In
          </button>
          <button
            onClick={() => scrollTo('whitelabel')}
            className="px-5 py-2.5 text-sm font-semibold bg-[#0A3A6B] text-white rounded-md hover:bg-[#0a2f57] transition-colors"
          >
            Launch Your Platform
          </button>
        </div>

        <button className="lg:hidden p-2 text-slate-700" onClick={() => setOpen(!open)}>
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {open && (
        <div className="lg:hidden border-t border-slate-200 bg-white">
          <div className="px-6 py-4 flex flex-col gap-1">
            {links.map((l) => (
              <button
                key={l.id}
                onClick={() => scrollTo(l.id)}
                className="text-left px-3 py-3 text-sm font-medium text-slate-700 hover:bg-slate-50 rounded-md"
              >
                {l.label}
              </button>
            ))}
            <button
              onClick={() => scrollTo('whitelabel')}
              className="mt-2 px-5 py-3 text-sm font-semibold bg-[#0A3A6B] text-white rounded-md text-center"
            >
              Launch Your Platform
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
