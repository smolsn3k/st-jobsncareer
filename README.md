# Jobs & Career / Работа и карьера

A SillyTavern extension for jobs, leave tracking, salary, tasks and NPC careers, with Phone-ST bank integration. English and Russian.

## Installation

1. In SillyTavern, open the **Extensions** panel (the stacked-blocks icon in the top bar).
2. Click **Install extension**.
3. Paste this URL and confirm:

   ```
   https://github.com/smolsn3k/st-jobsncareer
   ```

4. Reload SillyTavern if it doesn't refresh on its own.

To update later, use the same Extensions panel (**Manage extensions**, then the update button).

Open the panel with the 💼 button, the **Jobs** entry in the Extensions menu (wand icon), or the **Jobs & Career** drawer in Extensions settings.

## Features

- Jobs for you, the bot and any NPCs, several per character, with type, work mode, schedule, state, category, salary, vacation days per year and insurance (yes/no)
- Age group picker (Unknown / Child / Teenager / Adult) that drives the job-search rules
- A resume per character (skills and what they are looking for), used by job search and shared with the model
- Coworkers: tick any person in the chat (you, the bot, NPCs) as a coworker, or create a new NPC coworker
- Leave tracker per job: vacation, sick, maternity, paternity and unpaid leave with allowances, used/planned/left days, dates, manual adjustments and reduced pay
- Vacation planner: plan time off ahead, start it later, end it; optionally add it to the Phone-ST calendar
- Salary with currency and pay period, running total earned, freelance rates, per-job tasks that pay out when done
- Job search (standard, part-time, teen, adult), manual entry, and scanning the chat or character card
- Age rules and an adult content toggle (off by default)
- Awareness: choose who knows about each job
- Phone-ST integration (bank balance, currency, deposits, contacts, messages, notifications)
- Optional extras (off by default): job history, coworkers as NPCs, commute field, import/export, event notifications, chat auto-summary, stress and satisfaction sliders

## On/off and floating button

Use the ⏻ button in the panel header, or the checkbox in the extension settings. When off, nothing is added to the prompt.

The 💼 floating button can be dragged anywhere (its position is remembered per device) and hidden with **Show floating button** in the settings. The panel is also reachable from the Extensions menu (wand icon).

## Where data is stored

- **Global** (extension settings): on/off, language, adult toggle, API profile and fallback, prompt injection options, optional features, Phone-ST key.
- **Per chat** (saved inside the chat): people, ages, jobs, leave, tasks, awareness, NPCs and job history. A new chat starts empty.

## Phone-ST

Phone-ST is optional. Without it, earnings only count toward "total earned" and are not deposited anywhere. The extension never keeps its own balance.

All Phone-ST access lives in the `PhoneBridge` object in `index.js`. If your Phone-ST version keeps its bank somewhere the bridge can't find, enter its settings key under **Phone-ST settings key** in the extension settings, or adjust `getBalance`, `getCurrency` and `addMoney`. Every deposit also fires a `jobsext:bank-credit` event on `window`.

If the balance does not show, open the extension settings and press **Phone-ST diagnostics**: it prints how Phone-ST stores its data (types only, no message text) so the bridge can be matched to it. Calendar linking likewise goes through Phone-ST's own functions and fires `jobsext:calendar-add` / `jobsext:calendar-remove` events.

## Languages

Interface language is Auto, English or Russian (Extensions settings). Job ideas are generated in the chosen language, and job info sent to the model tells it to answer in the chat's language.
