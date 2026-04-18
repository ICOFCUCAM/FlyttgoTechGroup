'use client';

import React, { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from '@/components/ui/command';
import {
  Building2,
  GraduationCap,
  Truck,
  Store,
  Radar,
  Network,
  Landmark,
  Rocket,
  Code2,
  BarChart3,
  CreditCard,
  Fingerprint,
  LayoutDashboard,
  Sparkles,
  Globe2,
  MessageCircle,
  Briefcase,
  Building,
  type LucideIcon,
} from 'lucide-react';
import { platformList } from '@/data/platforms';

type Entry = {
  id: string;
  label: string;
  description?: string;
  href: string;
  group: 'Platforms' | 'Infrastructure' | 'Navigate' | 'Company';
  icon: LucideIcon;
};

const platformIcon: Record<string, LucideIcon> = {
  flyttgo: Truck,
  edupro: GraduationCap,
  govstack: Building2,
  marketstack: Store,
  fleetstack: Radar,
};

const staticEntries: Entry[] = [
  {
    id: 'nav-platforms',
    label: 'Platforms',
    description: 'Explore the 5-platform infrastructure ecosystem',
    href: '/platforms',
    group: 'Navigate',
    icon: Network,
  },
  {
    id: 'nav-infrastructure',
    label: 'Infrastructure modules',
    description: 'Composable components — payments, identity, marketplace engine, analytics',
    href: '/infrastructure',
    group: 'Navigate',
    icon: Sparkles,
  },
  {
    id: 'nav-industries',
    label: 'Industries',
    description: 'Transport · Education · Government · Marketplaces · Enterprise',
    href: '/industries',
    group: 'Navigate',
    icon: Briefcase,
  },
  {
    id: 'nav-technology',
    label: 'Technology',
    description: 'Cloud-native platform architecture',
    href: '/technology',
    group: 'Navigate',
    icon: Code2,
  },
  {
    id: 'nav-solutions',
    label: 'Solutions',
    description: 'Enterprise · Government · Deployment speed · Tabbed solutions',
    href: '/solutions',
    group: 'Navigate',
    icon: Landmark,
  },
  {
    id: 'nav-white-label',
    label: 'White-label',
    description: 'Launch a branded platform on FlyttGo infrastructure',
    href: '/white-label',
    group: 'Navigate',
    icon: Rocket,
  },
  {
    id: 'nav-developers',
    label: 'Developers',
    description: 'REST APIs · SDKs · webhooks · deployment guides',
    href: '/developers',
    group: 'Navigate',
    icon: Code2,
  },
  {
    id: 'nav-company',
    label: 'Company',
    description: 'About FlyttGo Technologies',
    href: '/company',
    group: 'Company',
    icon: Building,
  },
  {
    id: 'nav-contact',
    label: 'Contact — Deploy your platform',
    description: 'Start a deployment conversation with the platform team',
    href: '/contact',
    group: 'Company',
    icon: MessageCircle,
  },
];

const infrastructureEntries: Entry[] = [
  { id: 'module-payments', label: 'Payments layer', href: '/infrastructure#infrastructure-modules', group: 'Infrastructure', icon: CreditCard },
  { id: 'module-identity', label: 'Identity layer', href: '/infrastructure#infrastructure-modules', group: 'Infrastructure', icon: Fingerprint },
  { id: 'module-marketplace', label: 'Marketplace engine', href: '/infrastructure#infrastructure-modules', group: 'Infrastructure', icon: Store },
  { id: 'module-relocation', label: 'Relocation intelligence', href: '/infrastructure#infrastructure-modules', group: 'Infrastructure', icon: Sparkles },
  { id: 'module-admin', label: 'Admin dashboards', href: '/infrastructure#infrastructure-modules', group: 'Infrastructure', icon: LayoutDashboard },
  { id: 'module-analytics', label: 'Analytics layer', href: '/infrastructure#infrastructure-modules', group: 'Infrastructure', icon: BarChart3 },
];

const platformEntries: Entry[] = platformList.map((p) => ({
  id: `platform-${p.slug}`,
  label: p.name,
  description: p.subtitle,
  href: `/platforms/${p.slug}`,
  group: 'Platforms',
  icon: platformIcon[p.slug] ?? Globe2,
}));

type CommandPaletteContextType = {
  open: boolean;
  setOpen: (open: boolean) => void;
  toggle: () => void;
};

const CommandPaletteContext = React.createContext<CommandPaletteContextType | null>(null);

export function useCommandPalette() {
  const ctx = React.useContext(CommandPaletteContext);
  if (!ctx) throw new Error('useCommandPalette must be used within CommandPaletteProvider');
  return ctx;
}

export function CommandPaletteProvider({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const toggle = useCallback(() => setOpen((v) => !v), []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        toggle();
      }
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [toggle]);

  return (
    <CommandPaletteContext.Provider value={{ open, setOpen, toggle }}>
      {children}
      <CommandPalette />
    </CommandPaletteContext.Provider>
  );
}

function CommandPalette() {
  const { open, setOpen } = useCommandPalette();
  const router = useRouter();

  const runAction = (href: string) => {
    setOpen(false);
    router.push(href);
  };

  return (
    <CommandDialog open={open} onOpenChange={setOpen}>
      <CommandInput placeholder="Search platforms, modules, pages…" />
      <CommandList>
        <CommandEmpty>No results.</CommandEmpty>

        <CommandGroup heading="Platforms">
          {platformEntries.map((e) => {
            const Icon = e.icon;
            return (
              <CommandItem key={e.id} value={`${e.label} ${e.description ?? ''}`} onSelect={() => runAction(e.href)}>
                <Icon size={16} className="mr-2 text-slate-500" strokeWidth={1.75} />
                <span className="font-medium">{e.label}</span>
                {e.description && <span className="ml-2 text-xs text-slate-500">{e.description}</span>}
              </CommandItem>
            );
          })}
        </CommandGroup>

        <CommandSeparator />

        <CommandGroup heading="Infrastructure Modules">
          {infrastructureEntries.map((e) => {
            const Icon = e.icon;
            return (
              <CommandItem key={e.id} value={e.label} onSelect={() => runAction(e.href)}>
                <Icon size={16} className="mr-2 text-slate-500" strokeWidth={1.75} />
                <span>{e.label}</span>
              </CommandItem>
            );
          })}
        </CommandGroup>

        <CommandSeparator />

        <CommandGroup heading="Navigate">
          {staticEntries
            .filter((e) => e.group === 'Navigate')
            .map((e) => {
              const Icon = e.icon;
              return (
                <CommandItem key={e.id} value={`${e.label} ${e.description ?? ''}`} onSelect={() => runAction(e.href)}>
                  <Icon size={16} className="mr-2 text-slate-500" strokeWidth={1.75} />
                  <span>{e.label}</span>
                  {e.description && <span className="ml-2 text-xs text-slate-500">{e.description}</span>}
                </CommandItem>
              );
            })}
        </CommandGroup>

        <CommandSeparator />

        <CommandGroup heading="Company">
          {staticEntries
            .filter((e) => e.group === 'Company')
            .map((e) => {
              const Icon = e.icon;
              return (
                <CommandItem key={e.id} value={`${e.label} ${e.description ?? ''}`} onSelect={() => runAction(e.href)}>
                  <Icon size={16} className="mr-2 text-slate-500" strokeWidth={1.75} />
                  <span>{e.label}</span>
                  {e.description && <span className="ml-2 text-xs text-slate-500">{e.description}</span>}
                </CommandItem>
              );
            })}
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
}
