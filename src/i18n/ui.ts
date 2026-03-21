export const languages = {
  en: 'English',
  es: 'Español',
  fr: 'Français',
};

export const defaultLang = 'en';

export const ui = {
  en: {
    'nav.title': 'Base64 Developer Tool',
    'tool.encode': 'Encode',
    'tool.decode': 'Decode',
    'tool.charset': 'Charset',
    'tool.placeholder': 'Enter text or Base64 here...',
    'tool.result': 'Result will appear here...',
    'tool.copy': 'Copy',
    'tool.clear': 'Clear',
    'theme.light': 'Light Mode',
    'theme.dark': 'Dark Mode',
  },
  es: {
    'nav.title': 'Herramienta Base64',
    'tool.encode': 'Codificar',
    'tool.decode': 'Decodificar',
    'tool.charset': 'Codificación',
    'tool.placeholder': 'Ingresa texto o Base64 aquí...',
    'tool.result': 'El resultado aparecerá aquí...',
    'tool.copy': 'Copiar',
    'tool.clear': 'Limpiar',
    'theme.light': 'Modo Claro',
    'theme.dark': 'Modo Oscuro',
  },
  fr: {
    'nav.title': 'Outil Base64',
    'tool.encode': 'Encoder',
    'tool.decode': 'Décoder',
    'tool.charset': 'Encodage',
    'tool.placeholder': 'Entrez du texte ou Base64 ici...',
    'tool.result': 'Le résultat apparaîtra ici...',
    'tool.copy': 'Copier',
    'tool.clear': 'Effacer',
    'theme.light': 'Mode Clair',
    'theme.dark': 'Mode Sombre',
  }
} as const;
