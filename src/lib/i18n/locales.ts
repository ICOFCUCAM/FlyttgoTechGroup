export type LocaleCode =
  | 'EN'
  | 'NO'
  | 'FR'
  | 'DE'
  | 'ES'
  | 'SV'
  | 'DA'
  | 'NL'
  | 'PT'
  | 'AR';

export type LocaleMeta = {
  code: LocaleCode;
  label: string;
  native: string;
  flag: string;
  rtl?: boolean;
};

export const LOCALES: LocaleMeta[] = [
  { code: 'EN', label: 'English', native: 'English', flag: '🇬🇧' },
  { code: 'NO', label: 'Norwegian', native: 'Norsk', flag: '🇳🇴' },
  { code: 'FR', label: 'French', native: 'Français', flag: '🇫🇷' },
  { code: 'DE', label: 'German', native: 'Deutsch', flag: '🇩🇪' },
  { code: 'ES', label: 'Spanish', native: 'Español', flag: '🇪🇸' },
  { code: 'SV', label: 'Swedish', native: 'Svenska', flag: '🇸🇪' },
  { code: 'DA', label: 'Danish', native: 'Dansk', flag: '🇩🇰' },
  { code: 'NL', label: 'Dutch', native: 'Nederlands', flag: '🇳🇱' },
  { code: 'PT', label: 'Portuguese', native: 'Português', flag: '🇵🇹' },
  { code: 'AR', label: 'Arabic', native: 'العربية', flag: '🇸🇦', rtl: true },
];

export const DEFAULT_LOCALE: LocaleCode = 'EN';

export const STORAGE_KEY = 'flyttgo.lang';
