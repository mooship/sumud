// Self-hosted via Fontsource. Each file declares a unicode-range per script, so English pages
// fetch only the Latin faces and Arabic pages only the Arabic ones. Fontaine (vite.config.ts)
// generates size-matched local fallbacks so first paint doesn't reflow when the fonts swap in.
//
// Body and UI: IBM Plex Sans with IBM Plex Sans Arabic, which share proportions and stroke.
import "@fontsource-variable/ibm-plex-sans/wght.css";
import "@fontsource/ibm-plex-sans-arabic/arabic-400.css";
import "@fontsource/ibm-plex-sans-arabic/arabic-500.css";
import "@fontsource/ibm-plex-sans-arabic/arabic-600.css";
// Headings and quotations: Newsreader with Noto Naskh Arabic. The wght builds are less than
// half the size of the optical-size ones.
import "@fontsource-variable/newsreader/wght.css";
import "@fontsource-variable/newsreader/wght-italic.css";
import "@fontsource-variable/noto-naskh-arabic/wght.css";
