import { describe, it, expect } from 'vitest';
import { parseVoiceCommand } from '@/lib/ai/voice-commands';

describe('parseVoiceCommand', () => {
  it('routes "go to security" to /security', () => {
    const r = parseVoiceCommand('go to security');
    expect(r.kind).toBe('route');
    if (r.kind === 'route') expect(r.href).toBe('/security');
  });

  it('routes "open the platforms page" to /platforms', () => {
    const r = parseVoiceCommand('open the platforms page');
    expect(r.kind).toBe('route');
    if (r.kind === 'route') expect(r.href).toBe('/platforms');
  });

  it('routes "show me Ledgera" to /platforms/ledgera', () => {
    const r = parseVoiceCommand('show me Ledgera');
    expect(r.kind).toBe('route');
    if (r.kind === 'route') expect(r.href).toBe('/platforms/ledgera');
  });

  it('routes a literal /audit path', () => {
    const r = parseVoiceCommand('navigate to /audit');
    expect(r.kind).toBe('route');
    if (r.kind === 'route') expect(r.href).toBe('/audit');
  });

  it('falls back to search for non-nav phrases', () => {
    const r = parseVoiceCommand('what is your pricing model');
    expect(r.kind).toBe('search');
  });

  it('prefers longer keyword matches', () => {
    const r = parseVoiceCommand('take me to deployment lifecycle');
    expect(r.kind).toBe('route');
    if (r.kind === 'route') expect(r.href).toBe('/deployment-lifecycle');
  });

  it('handles trailing punctuation', () => {
    const r = parseVoiceCommand('Open sustainability!');
    expect(r.kind).toBe('route');
    if (r.kind === 'route') expect(r.href).toBe('/sustainability');
  });
});
