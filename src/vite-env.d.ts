/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_GOOGLE_MAPS_API_KEY: string;
  // Ajoutez d'autres variables d'environnement au besoin
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
