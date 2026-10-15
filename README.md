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

## Settings

The settings are grouped into collapsible sections (General, AI & prompt, Phone-ST, Tracking & penalties, Optional features); which sections are open is remembered per device. They are available in two places: the **Jobs & Career** drawer in Extensions settings, and inside the panel itself through the ⚙ gear button in the panel header (tap it again, or **Back**, to return to your jobs).

## Features

- Jobs for you, the bot and any NPCs, several per character, with type, work mode, schedule, state, category, salary, vacation days per year and insurance (yes/no)
- A custom emoji for you, the bot and every NPC (shown on the person tabs and coworker lists; pick from the suggestions or type any emoji, clear it to go back to the default)
- Age group picker (Unknown / Child / Teenager / Adult) that drives the job-search rules
- A resume per character (skills and what they are looking for), used by job search and shared with the model
- Coworkers: tick any person in the chat (you, the bot, NPCs) as a coworker, or create a new NPC coworker
- Leave tracker per job: vacation, sick, maternity, paternity and unpaid leave with allowances, used/planned/left days, dates, manual adjustments and reduced pay
- Vacation planner: plan time off ahead, start it later, end it; optionally add it to the Phone-ST calendar
- Salary with currency and pay period, running total earned, freelance rates, per-job tasks that pay out when done
- Job history: archived jobs can be restored from the Previous jobs list (optional feature)
- Job search (standard, part-time, teen, adult), manual entry, and scanning the chat or character card
- Age rules and an adult content toggle (off by default). With the toggle on, the **Adult jobs** search suggests explicit adult-industry work (sex work, escort, stripper, cam model and similar) with frank descriptions. It is only available for characters whose age group is set to **Adult**; adult jobs stay hidden for everyone else. If your model refuses these requests, pick a different **API profile** in the settings.
- Awareness: choose who knows about each job
- Phone-ST integration (bank balance, currency, deposits, contacts, messages, notifications)
- Optional extras (off by default): job history, coworkers as NPCs, commute field, import/export, event notifications, chat auto-summary, stress and satisfaction sliders

## World / setting

The **World** card at the top of the panel sets the setting for the chat: Modern, Fantasy, Sci-fi, Cyberpunk, Historical, Post-apocalyptic, Steampunk or Custom. Picking one fills in a short description that you can edit freely (era, technology, magic, economy, common employers, factions, locations), and you can set the currency (a symbol like `$`, or a name like `gold` or `credits`).

- Job searches use the world, so a fantasy chat gets blacksmiths and guild work, paid in the world's currency. The description is also sent to the model with the job info (Modern with no description sends nothing).
- **Scan lorebook** reads the active lorebook entries (global, character and chat books) and asks your model to write the world description, type and currency for you. **Scan character card** does the same from the card text. Review the result before relying on it.
- **Save as world** stores the current world in a library that is shared between chats; load or delete saved worlds from the same card. The active world itself belongs to the chat.

## Tracking from the chat (hidden tags)

When a job exists, the model is asked to add hidden tags at the end of its replies, for example:

```
[job:task|Alex|Chef|Prepare tasting menu|2026-11-06|200]
[job:done|Alex|Chef|tasting menu]
[job:fail|Alex|Chef|Order supplies]
[job:stress|Alex|Chef|+8]      (only with the stress/satisfaction option on)
[job:promo|Alex|Chef|+20]
[job:promoted|Alex|Chef|Head Chef|15]
```

After each character reply the extension applies the tags and removes them from the message, so they never stay in the chat or the context. The **Recent changes** list at the bottom of the panel shows what each tag did. Turn this off with **Track job events from the chat** in the settings.

- **Tasks:** new tasks appear in the job; done tasks pay out (into the Phone-ST bank for the user); failed tasks apply the penalty. Done and failed tasks are mentioned to the model for the next two replies so characters can react.
- **Overdue:** with Phone-ST's story date available, open tasks past their due date (plus grace days) are failed automatically. Deadlines pause while the character is on leave.
- **Penalty for a failed task** (all adjustable in the settings): promotion progress lost, stress added, satisfaction lost, and an optional fine as a percentage of the task pay.
- **Promotion:** each job has a progress meter. Completed tasks fill it, failures drain it. At 100% a notification appears and the model is told a promotion is available. Promote from the panel (new title and raise %) or let the model do it with `[job:promoted|…]`.

Limits: if you swipe or regenerate a reply, the changes from the discarded version are not undone, so adjust by hand if needed. Weaker models may forget to add tags; the panel always works by hand.

## On/off and floating button

The ⏻ button in the panel header turns the extension on or off **for the current chat only**. Other chats are not affected. The **Enable extension (global)** checkbox in the settings switches it off everywhere, and **Start new chats with the extension off** makes new chats begin disabled. When off, nothing is added to the prompt and the 💼 button is dimmed.

If the button ever goes missing (for example dragged off-screen on a phone), use **Reset floating button position** in the settings. The extension also resets it by itself when it finds it off-screen. You can always open the panel with the **/jobs** command in the chat box or from the Extensions menu (wand icon).

The 💼 floating button can be dragged anywhere (its position is remembered per device) and hidden with **Show floating button** in the settings. The panel is also reachable from the Extensions menu (wand icon).

## Where data is stored

- **Global** (extension settings): on/off, language, adult toggle, API profile and fallback, prompt injection options, optional features, Phone-ST key.
- **Per chat** (saved inside the chat): people, ages, jobs, leave, tasks, awareness, NPCs and job history. A new chat starts empty.

## Phone-ST

Phone-ST is optional. Without it, earnings only count toward "total earned" and are not deposited anywhere. The extension never keeps its own balance.

With Phone-ST (the "Телефон" / glassphone extension) enabled:

- **Bank:** the balance and currency shown in the panel come from the phone's bank. Salary and paid tasks are deposited as a "зарплата" (salary) transaction through Phone-ST's own bank code, so it shows up in the bank app and the story stays in sync. Phone-ST's bank works in whole currency units, so cents are rounded on deposit.
- **Calendar:** planned or started time off can be added to the phone calendar (a marker on the start date and one on the end date). Removing the leave entry removes those calendar entries.
- **Story date:** date fields default to the in-story "today" from Phone-ST when it can tell, instead of your computer's date.
- **Contacts:** NPCs can be linked to phone contacts.

Phone sync can be switched off completely (the phone button in the panel header, or **Phone-ST sync** in the settings), or per function: bank, calendar, contacts and story date. With bank sync off, earnings only count toward "total earned".

The extension finds Phone-ST in a folder named `Phone-ST` next to this one. If you installed it under a different folder name, enter that name under **Phone-ST folder name** in the extension settings. If anything does not connect, press **Phone-ST diagnostics** in the settings to see what was found.

## Languages

Interface language is Auto, English or Russian (Extensions settings). Job ideas are generated in the chosen language, and job info sent to the model tells it to answer in the chat's language.
