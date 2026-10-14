# Jobs & Career / Работа и карьера (SillyTavern extension)

## Install
Copy this folder to `SillyTavern/public/scripts/extensions/third-party/SillyTavern-Jobs`
(or `data/<user>/extensions/SillyTavern-Jobs`), restart/reload SillyTavern.
Open the panel with the 💼 button, the Extensions menu entry "Jobs", or the settings drawer.

## Storage
- Global (Extensions settings): on/off, language, adult toggle, API profile + fallback, injection options, optional features, Phone-ST key.
- Per chat (chat metadata): people, ages, jobs, leave, tasks, awareness, NPCs, history. A new chat starts empty.

## On/off
The ⏻ button in the panel header (also the checkbox in settings) turns the extension off: nothing is injected into the prompt and the panel shows a disabled message.

## Phone-ST
All access lives in the `PhoneBridge` object in index.js. If your Phone-ST build stores its bank somewhere the bridge can't find,
put its settings key in "Phone-ST settings key" or adjust `PhoneBridge.getBalance / getCurrency / addMoney`.
It also fires a `jobsext:bank-credit` window event on every deposit.
