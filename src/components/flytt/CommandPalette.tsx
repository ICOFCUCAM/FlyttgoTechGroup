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
  Route,
  UserCheck,
  Landmark,
  GraduationCap,
  Fingerprint,
  CreditCard,
  Calculator,
  Truck,
  Network,
  Briefcase,
  Code2,
  ServerCog,
  Building,
  MessageCircle,
  Globe2,
  type LucideIcon,
} from 'lucide-react';
import { platformList } from '@/data/platforms';

type Entry = {
  id: string;
  label: string;
  description?: string;
  href: string;
  group: 'Platforms' | 'Navigate' | 'Company';
  icon: LucideIcon;
};

const platformIcon: Record<string, LucideIcon> = {
  transify: Route,
  workverge: UserCheck,
  civitas: Landmark,
  edupro: GraduationCap,
  identra: Fingerprint,
  payvera: CreditCard,
  ledgera: Calculator,
  flyttgo: Truck,
};

const staticEntries: Entry[] = [
  {
    id: 'nav-platforms',
    label: 'Platforms',
    description: 'Explore the platform ecosystem',
    href: '/platforms',
    group: 'Navigate',
    icon: Network,
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
    id: 'nav-deployment',
    label: 'Deployment',
    description: 'Managed, customer-cloud or sovereign national datacenter',
    href: '/deployment',
    group: 'Navigate',
    icon: ServerCog,
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
    id: 'nav-company',
    label: 'Company',
    description: 'About FlyttGo Technologies Group',
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
      <CommandInput placeholder="Search platforms, pages…" />
      <CommandList>
        <CommandEmpty>No results.</CommandEmpty>

        <CommandGroup heading="Platforms">
          {platformEntries.map((e) => {
            const Icon = e.icon;
            return (
              <CommandItem
                key={e.id}
                value={`${e.label} ${e.description ?? ''}`}
                onSelect={() => runAction(e.href)}
              >
                <Icon size={16} className="mr-2 text-slate-500" strokeWidth={1.75} />
                <span className="font-medium">{e.label}</span>
                {e.description && <span className="ml-2 text-xs text-slate-500">{e.description}</span>}
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
                <CommandItem
                  key={e.id}
                  value={`${e.label} ${e.description ?? ''}`}
                  onSelect={() => runAction(e.href)}
                >
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
                <CommandItem
                  key={e.id}
                  value={`${e.label} ${e.description ?? ''}`}
                  onSelect={() => runAction(e.href)}
                >
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
