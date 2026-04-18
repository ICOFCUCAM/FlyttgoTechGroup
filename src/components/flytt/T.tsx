'use client';

import React from 'react';
import { useI18n } from '@/lib/i18n/I18nProvider';

type Props = {
  k: string;
  /**
   * Optional replacements for {placeholders} inside the dictionary string.
   * Values are rendered as plain text (HTML-safe). Useful for pages like
   * industry / deployment templates where the label interpolates a noun.
   */
  vars?: Record<string, string>;
  as?: keyof JSX.IntrinsicElements;
  className?: string;
};

/**
 * Drop-in translation span. Lets server components embed translated
 * strings from the client-side i18n dictionaries without themselves
 * becoming client components (page-level JSON-LD + generateMetadata
 * need to stay on the server).
 */
export const T: React.FC<Props> = ({ k, vars, as: Tag = 'span', className }) => {
  const { t } = useI18n();
  let out = t(k);
  if (vars) {
    for (const [name, value] of Object.entries(vars)) {
      out = out.replaceAll(`{${name}}`, value);
    }
  }
  return React.createElement(Tag, { className }, out);
};
