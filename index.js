// Jobs & Career extension for SillyTavern
// Jobs, leave tracker, salary, tasks, awareness, NPCs, Phone-ST integration (EN/RU)

import * as ST from '../../../../script.js';
import { extension_settings, getContext } from '../../../extensions.js';

const MODULE = 'jobs_ext';
const VERSION = '0.2.1';
const LS_OPACITY = 'jobsext_opacity';
const LS_FAB = 'jobsext_fab_pos';

/* ------------------------------------------------------------------ */
/* i18n                                                                */
/* ------------------------------------------------------------------ */
const I18N = {
    en: {
        powerTip: 'Turn the extension on/off for this chat', disabledMsg: 'Extension is turned off.', noChat: 'Open a chat first: jobs are saved per chat.', title: 'Jobs & Career', people: 'People', addNpc: '+ NPC', npcName: 'NPC name', age: 'Age', ageUnknown: 'unknown',
        jobs: 'Jobs', noJobs: 'No jobs yet.', sStandard: 'Job search', sPart: 'Part-time', sTeen: 'Teen jobs', sAdult: 'Adult jobs',
        manual: '+ Manual', scan: 'Scan chat/card', searching: 'Thinking…', ideas: 'Ideas', add: 'Add', errApi: 'API request failed',
        noIdeas: 'No ideas returned.', jTitle: 'Title', employer: 'Employer', category: 'Category', type: 'Type', mode: 'Work mode',
        schedule: 'Schedule', state: 'State', salary: 'Salary', amount: 'Amount', currency: 'Currency', period: 'Pay period',
        rateType: 'Freelance rate', totalEarned: 'Total earned', payPeriod: 'Pay one period', del: 'Delete', archive: 'Archive',
        history: 'Previous jobs', coworkers: 'Coworkers', addCoworker: 'Add coworker as NPC', commute: 'Commute / location',
        stress: 'Stress', satisfaction: 'Satisfaction', summarize: 'Summarize job chat', summary: 'Chat summary', export: 'Export', import: 'Import',
        opacity: 'Opacity', close: 'Close', confirm: 'Delete this?', tracker: 'Leave tracker', enabled: 'Enabled', allowance: 'Allowance (days)',
        adjust: 'Manual +/- days', used: 'Used', left: 'Left', reduced: 'Reduced pay', reducedPct: 'Reduced pay %', start: 'Start', end: 'End',
        reason: 'Reason', child: 'Child (NPC)', startLeave: 'Start leave', endLeave: 'End leave', entries: 'Leave log', days: 'days',
        tasks: 'Tasks', desc: 'Description', due: 'Due', pay: 'Pay', addTask: '+ Task', awareness: 'Who knows about this job',
        everyone: 'Everyone', specific: 'Specific characters', none: 'No one (only the owner)', phoneBalance: 'Phone bank balance',
        phoneMissing: 'Phone-ST not detected: earnings are tracked here but not deposited.', negative: 'Balance is negative!',
        depositFail: 'Could not reach the Phone-ST bank; amount recorded in "total earned" only.', paid: 'Paid',
        noLeaveTasks: 'This character is on leave: no work tasks.', adultBlocked: 'Adult jobs are not allowed for this age.',
        s_enable: 'Enable extension (global)', s_lang: 'Language', s_adult: 'Adult content (adult jobs)', s_api: 'API profile', s_fallback: 'Fallback profile',
        s_default: '(current API)', s_inject: 'Inject job info into chat', s_depth: 'Injection depth', s_bank: 'Include bank info in chat',
        s_phoneKey: 'Phone-ST folder name (optional, default: Phone-ST)', s_optional: 'Optional features', open: 'Open Jobs panel',
        o_history: 'Job history', o_coworkers: 'Link coworkers as NPCs', o_commute: 'Commute / location field', o_importExport: 'Import / export',
        o_events: 'Job event notifications', o_autosummary: 'Auto-summary of job chat', o_sliders: 'Stress & satisfaction sliders',
        t_standard: 'Standard', t_parttime: 'Part-time', t_teen: 'Teen', t_freelance: 'Freelance', t_adult: 'Adult',
        m_onsite: 'On-site', m_remote: 'Remote', m_hybrid: 'Hybrid', m_anywhere: 'Anywhere',
        st_idle: 'Idle', st_working: 'Working', st_offduty: 'Off duty', st_onleave: 'On leave', st_vacation: 'Vacation', st_sick: 'Sick leave',
        st_maternity: 'Maternity leave', st_paternity: 'Paternity leave', st_fired: 'Fired',
        l_vacation: 'Vacation', l_sick: 'Sick leave', l_maternity: 'Maternity leave', l_paternity: 'Paternity leave', l_unpaid: 'Unpaid leave',
        p_hour: 'hour', p_day: 'day', p_week: 'week', p_month: 'month', p_year: 'year', p_commission: 'commission', p_project: 'project',
        r_hour: 'per hour', r_project: 'per project', r_word: 'per word', r_commission: 'per commission',
        ts_pending: 'Pending', ts_active: 'Active', ts_done: 'Done', ts_failed: 'Failed', ts_cancelled: 'Cancelled',

        g_unknown: 'Unknown', g_child: 'Child', g_teen: 'Teenager', g_adult: 'Adult', ageGroup: 'Age group', childNoJobs: 'Children cannot have jobs.',
        resume: 'Resume', skills: 'Skills & abilities', seeking: 'Looking for', skillsPh: 'What this character can do: skills, education, experience…', seekingPh: 'What they want: field, schedule, pay, remote…',
        insurance: 'Insurance', vacationDays: 'Vacation days / year', yes: 'yes', no: 'no', setSalary: 'set salary',
        planned: 'Planned', plan: '📅 Plan', startNow: 'Start now', startEntry: '▶ Start', calendar: 'Add to Phone calendar', calFail: 'Could not add to the Phone-ST calendar.',
        planVacation: 'Plan / start time off', coworkerNew: 'New coworker name', sec_pay: 'Salary & benefits', sec_leave: 'Time off', sec_tasks: 'Tasks', sec_aware: 'Awareness',
        sec_more: 'Extras', s_fab: 'Show floating button', diag: 'Phone-ST diagnostics', diagHint: 'Copy this and send it to the developer if the bank or calendar does not connect.',
        s_global: 'General', s_ai: 'AI & prompt', s_phone: 'Phone-ST',
        ps_all: 'Phone-ST sync (everything)', ps_bank: 'Bank (balance, currency, deposits)', ps_cal: 'Calendar (time off)', ps_contacts: 'Contacts (link NPCs)', ps_date: 'Story date',
        phoneOff: 'Phone sync is off: earnings are tracked here only.', bankOff: 'Bank sync is off: earnings are tracked here only.', phoneTip: 'Phone-ST sync on/off',
        s_track: 'Tracking & penalties', s_tags: 'Track job events from the chat (hidden tags)', s_tagsHint: 'The model adds hidden tags like [job:task|…] at the end of its replies. The extension applies them and removes them from the message. Cheaper than scanning the chat.',
        s_promoDone: 'Promotion progress per completed task (%)', s_promoRaise: 'Default raise on promotion (%)', s_autoFail: 'Auto-fail overdue tasks', s_grace: 'Grace days after the due date',
        s_graceHint: 'Overdue detection needs the Phone-ST story date (Phone sync → Story date).', pen: 'Penalty for a failed task', pen_promo: 'Promotion progress lost (%)', pen_stress: 'Stress added', pen_sat: 'Satisfaction lost', pen_fine: 'Fine (% of the task pay)',
        s_defReduced: 'Default reduced pay % (new jobs)', reducedHint: 'Share of normal pay received while on a leave type that has "Reduced pay" ticked. Unticked leave types pay in full; unpaid leave pays nothing. Used by "Pay one period".',
        slidersHint: "Set by hand, or updated by hidden tags in the character's replies. The model sees the values.",
        sec_promo: 'Promotion', promoEnabled: 'Promotion track', promoMeter: 'Promotion progress', promoLevel: 'Level', promoRaise: 'Raise on promotion (%)', promoTitle: 'New title (optional)', promote: 'Promote',
        promoAvail: 'Promotion available', promoHint: 'Fills when tasks are completed and drops when they fail. At 100% a promotion becomes available and the model is told.', promoDone: 'Promoted',
        recent: 'Recent changes', restore: 'Restore', taskFailedMsg: 'Task failed', overdue: 'overdue', log_fail: 'failed', log_task: 'task added', log_done: 'done', log_cancel: 'cancelled', log_stress: 'stress', log_sat: 'satisfaction', log_promo: 'promotion progress',
        adultNeedsAge: 'Adult jobs (18+) are only available when the age group is set to Adult.',
        offChat: 'The extension is off for this chat. Use the power button to turn it on.', world: 'World', worldType: 'Setting', worldCur: 'Currency (symbol or name)', worldDesc: 'World description',
        worldDescPh: 'Era, technology, magic, economy, common employers, factions, locations…', scanLore: 'Scan lorebook', scanCard: 'Scan character card', savedWorlds: 'Saved worlds', load: 'Load',
        worldName: 'World name', saveWorld: 'Save as world', worldHint: 'The world belongs to this chat. It shapes job ideas and is sent to the model. Saved worlds are shared between chats.',
        noLore: 'No active lorebook entries found.', noCardText: 'No character card text found.', worldScanned: 'World description filled in. Review it, then save it if you like.', worldSaved: 'World saved.', s_newOff: 'Start new chats with the extension off',
        wp_modern: 'Modern', wp_fantasy: 'Fantasy', wp_scifi: 'Sci-fi', wp_cyberpunk: 'Cyberpunk', wp_historical: 'Historical', wp_postapoc: 'Post-apocalyptic', wp_steampunk: 'Steampunk', wp_custom: 'Custom',
        wb_modern: 'Present-day real world: modern economy, smartphones and internet, regular jobs, offices, shops, services and gig work.',
        wb_fantasy: 'Medieval fantasy world: guilds, taverns, farms, smiths, mages and adventurers. Magic exists. Pay is in coins.',
        wb_scifi: 'Spacefaring future: stations, colonies, corporations, ship crews, engineers and traders. Money is credits.',
        wb_cyberpunk: 'Neon dystopia: megacorporations, street gangs, hackers, gig economy, cybernetic augmentation. Money is credits.',
        wb_historical: 'A historical era (name the period here): trades, craftsmen, servants, merchants, farmers and clerks. No modern technology.',
        wb_postapoc: 'Post-apocalyptic wasteland: scavengers, traders, settlements, guards and mechanics. Barter and scrap are money.',
        wb_steampunk: 'Industrial steam-powered era: factories, airships, inventors, clerks, mechanics and guilds.', wb_custom: '',
        emoji: 'Emoji',
        settingsTip: 'Settings', back: 'Back',
        resetFab: 'Reset floating button position', fabReset: 'Floating button reset.',
        s_display: 'Display', dm_auto: 'Auto (popup window on phones)', dm_floating: 'Floating panel', dm_popup: 'Popup window', uiDiag: 'Interface diagnostics', uiDiagHint: 'Copy this and send it to the developer if the panel or button does not show.',
        langName: 'English', evPaid: 'Payment received', evLeave: 'Leave started', evLeaveEnd: 'Leave ended', evTask: 'Task update',
    },
    ru: {
        powerTip: 'Включить/выключить расширение для этого чата', disabledMsg: 'Расширение выключено.', noChat: 'Сначала откройте чат: работы сохраняются отдельно для каждого чата.', title: 'Работа и карьера', people: 'Персонажи', addNpc: '+ NPC', npcName: 'Имя NPC', age: 'Возраст', ageUnknown: 'неизвестен',
        jobs: 'Работы', noJobs: 'Пока нет работ.', sStandard: 'Поиск работы', sPart: 'Подработка', sTeen: 'Работа для подростков', sAdult: 'Работа 18+',
        manual: '+ Вручную', scan: 'Найти в чате/карточке', searching: 'Думаю…', ideas: 'Варианты', add: 'Добавить', errApi: 'Ошибка запроса к API',
        noIdeas: 'Вариантов нет.', jTitle: 'Должность', employer: 'Работодатель', category: 'Категория', type: 'Тип', mode: 'Формат работы',
        schedule: 'График', state: 'Состояние', salary: 'Зарплата', amount: 'Сумма', currency: 'Валюта', period: 'Период оплаты',
        rateType: 'Ставка фриланса', totalEarned: 'Всего заработано', payPeriod: 'Выплатить период', del: 'Удалить', archive: 'В архив',
        history: 'Прошлые работы', coworkers: 'Коллеги', addCoworker: 'Добавить коллегу как NPC', commute: 'Дорога / место',
        stress: 'Стресс', satisfaction: 'Удовлетворённость', summarize: 'Резюме рабочего чата', summary: 'Резюме чата', export: 'Экспорт', import: 'Импорт',
        opacity: 'Прозрачность', close: 'Закрыть', confirm: 'Удалить?', tracker: 'Учёт отпусков', enabled: 'Включено', allowance: 'Лимит (дней)',
        adjust: 'Ручная правка (+/- дней)', used: 'Использовано', left: 'Осталось', reduced: 'Сниженная оплата', reducedPct: 'Сниженная оплата, %', start: 'Начало', end: 'Конец',
        reason: 'Причина', child: 'Ребёнок (NPC)', startLeave: 'Начать отпуск', endLeave: 'Завершить', entries: 'Журнал отпусков', days: 'дн.',
        tasks: 'Задания', desc: 'Описание', due: 'Срок', pay: 'Оплата', addTask: '+ Задание', awareness: 'Кто знает об этой работе',
        everyone: 'Все', specific: 'Выбранные персонажи', none: 'Никто (только владелец)', phoneBalance: 'Баланс банка в телефоне',
        phoneMissing: 'Phone-ST не найден: заработок считается здесь, но не зачисляется.', negative: 'Баланс отрицательный!',
        depositFail: 'Не удалось связаться с банком Phone-ST; сумма записана только в «всего заработано».', paid: 'Оплачено',
        noLeaveTasks: 'Персонаж в отпуске: рабочих заданий нет.', adultBlocked: 'Работа 18+ недоступна для этого возраста.',
        s_enable: 'Включить расширение (глобально)', s_lang: 'Язык', s_adult: 'Контент 18+ (работа 18+)', s_api: 'Профиль API', s_fallback: 'Запасной профиль',
        s_default: '(текущий API)', s_inject: 'Добавлять инфо о работе в чат', s_depth: 'Глубина вставки', s_bank: 'Включать данные банка в чат',
        s_phoneKey: 'Имя папки Phone-ST (необязательно, по умолчанию Phone-ST)', s_optional: 'Дополнительные функции', open: 'Открыть панель работ',
        o_history: 'История работ', o_coworkers: 'Коллеги как NPC', o_commute: 'Поле «дорога / место»', o_importExport: 'Импорт / экспорт',
        o_events: 'Уведомления о событиях', o_autosummary: 'Авто-резюме рабочего чата', o_sliders: 'Ползунки стресса и удовлетворённости',
        t_standard: 'Обычная', t_parttime: 'Подработка', t_teen: 'Подростковая', t_freelance: 'Фриланс', t_adult: '18+',
        m_onsite: 'На месте', m_remote: 'Удалённо', m_hybrid: 'Гибрид', m_anywhere: 'Откуда угодно',
        st_idle: 'Без дела', st_working: 'Работает', st_offduty: 'Нерабочее время', st_onleave: 'В отпуске', st_vacation: 'Отпуск', st_sick: 'Больничный',
        st_maternity: 'Декрет', st_paternity: 'Отпуск отца', st_fired: 'Уволен',
        l_vacation: 'Отпуск', l_sick: 'Больничный', l_maternity: 'Декретный отпуск', l_paternity: 'Отпуск по уходу (отец)', l_unpaid: 'Без содержания',
        p_hour: 'час', p_day: 'день', p_week: 'неделя', p_month: 'месяц', p_year: 'год', p_commission: 'заказ', p_project: 'проект',
        r_hour: 'за час', r_project: 'за проект', r_word: 'за слово', r_commission: 'за заказ',
        ts_pending: 'Ожидает', ts_active: 'В работе', ts_done: 'Готово', ts_failed: 'Провалено', ts_cancelled: 'Отменено',

        g_unknown: 'Неизвестно', g_child: 'Ребёнок', g_teen: 'Подросток', g_adult: 'Взрослый', ageGroup: 'Возрастная группа', childNoJobs: 'У детей не бывает работы.',
        resume: 'Резюме', skills: 'Навыки и умения', seeking: 'Что ищет', skillsPh: 'Что умеет персонаж: навыки, образование, опыт…', seekingPh: 'Чего хочет: сфера, график, оплата, удалёнка…',
        insurance: 'Страховка', vacationDays: 'Дней отпуска в год', yes: 'да', no: 'нет', setSalary: 'укажите зарплату',
        planned: 'Запланировано', plan: '📅 Запланировать', startNow: 'Начать сейчас', startEntry: '▶ Начать', calendar: 'Добавить в календарь телефона', calFail: 'Не удалось добавить в календарь Phone-ST.',
        planVacation: 'Запланировать / начать отпуск', coworkerNew: 'Имя нового коллеги', sec_pay: 'Зарплата и условия', sec_leave: 'Отпуск и отгулы', sec_tasks: 'Задания', sec_aware: 'Кто знает',
        sec_more: 'Дополнительно', s_fab: 'Показывать плавающую кнопку', diag: 'Диагностика Phone-ST', diagHint: 'Скопируйте и отправьте разработчику, если банк или календарь не подключаются.',
        s_global: 'Основное', s_ai: 'ИИ и промпт', s_phone: 'Phone-ST',
        ps_all: 'Синхронизация с Phone-ST (всё)', ps_bank: 'Банк (баланс, валюта, зачисления)', ps_cal: 'Календарь (отпуска)', ps_contacts: 'Контакты (привязка NPC)', ps_date: 'Сюжетная дата',
        phoneOff: 'Синхронизация с телефоном выключена: заработок считается только здесь.', bankOff: 'Синхронизация банка выключена: заработок считается только здесь.', phoneTip: 'Синхронизация с Phone-ST вкл/выкл',
        s_track: 'Отслеживание и штрафы', s_tags: 'Отслеживать рабочие события из чата (скрытые теги)', s_tagsHint: 'Модель добавляет в конец ответа скрытые теги вроде [job:task|…]. Расширение применяет их и удаляет из сообщения. Дешевле, чем сканировать чат.',
        s_promoDone: 'Прогресс повышения за выполненное задание (%)', s_promoRaise: 'Прибавка к зарплате при повышении по умолчанию (%)', s_autoFail: 'Автоматически проваливать просроченные задания', s_grace: 'Дней отсрочки после срока',
        s_graceHint: 'Для просрочки нужна сюжетная дата Phone-ST (синхронизация → сюжетная дата).', pen: 'Штраф за проваленное задание', pen_promo: 'Потеря прогресса повышения (%)', pen_stress: 'Прибавка стресса', pen_sat: 'Потеря удовлетворённости', pen_fine: 'Штраф (% от оплаты задания)',
        s_defReduced: 'Сниженная оплата по умолчанию, % (для новых работ)', reducedHint: 'Какую долю обычной оплаты персонаж получает во время отпуска, у которого отмечено «Сниженная оплата». Без отметки отпуск оплачивается полностью, без содержания — не оплачивается. Используется кнопкой «Выплатить период».',
        slidersHint: 'Задаются вручную или обновляются скрытыми тегами в ответах персонажа. Модель видит значения.',
        sec_promo: 'Повышение', promoEnabled: 'Карьерный рост', promoMeter: 'Прогресс повышения', promoLevel: 'Уровень', promoRaise: 'Прибавка при повышении (%)', promoTitle: 'Новая должность (необязательно)', promote: 'Повысить',
        promoAvail: 'Повышение доступно', promoHint: 'Растёт при выполнении заданий и падает при провале. На 100% повышение становится доступным, и модель об этом узнаёт.', promoDone: 'Повышен',
        recent: 'Последние изменения', restore: 'Вернуть', taskFailedMsg: 'Задание провалено', overdue: 'просрочено', log_fail: 'провалено', log_task: 'новое задание', log_done: 'выполнено', log_cancel: 'отменено', log_stress: 'стресс', log_sat: 'удовлетворённость', log_promo: 'прогресс повышения',
        adultNeedsAge: 'Работа 18+ доступна только если возрастная группа — «Взрослый».',
        offChat: 'Расширение выключено для этого чата. Включите его кнопкой питания.', world: 'Мир', worldType: 'Сеттинг', worldCur: 'Валюта (символ или название)', worldDesc: 'Описание мира',
        worldDescPh: 'Эпоха, технологии, магия, экономика, типичные работодатели, фракции, места…', scanLore: 'Сканировать лорбук', scanCard: 'Сканировать карточку', savedWorlds: 'Сохранённые миры', load: 'Загрузить',
        worldName: 'Название мира', saveWorld: 'Сохранить как мир', worldHint: 'Мир относится к этому чату. Он влияет на идеи работ и отправляется модели. Сохранённые миры общие для всех чатов.',
        noLore: 'Активные записи лорбука не найдены.', noCardText: 'Текст карточки персонажа не найден.', worldScanned: 'Описание мира заполнено. Проверьте его и при желании сохраните.', worldSaved: 'Мир сохранён.', s_newOff: 'Новые чаты начинать с выключенным расширением',
        wp_modern: 'Современность', wp_fantasy: 'Фэнтези', wp_scifi: 'Научная фантастика', wp_cyberpunk: 'Киберпанк', wp_historical: 'Историческая эпоха', wp_postapoc: 'Постапокалипсис', wp_steampunk: 'Стимпанк', wp_custom: 'Свой мир',
        wb_modern: 'Наши дни: современная экономика, смартфоны и интернет, обычные работы, офисы, магазины, сфера услуг и подработки.',
        wb_fantasy: 'Средневековый фэнтези-мир: гильдии, таверны, фермы, кузнецы, маги и искатели приключений. Магия существует. Платят монетами.',
        wb_scifi: 'Космическое будущее: станции, колонии, корпорации, экипажи кораблей, инженеры и торговцы. Деньги — кредиты.',
        wb_cyberpunk: 'Неоновая антиутопия: мегакорпорации, уличные банды, хакеры, гиг-экономика, кибернетические импланты. Деньги — кредиты.',
        wb_historical: 'Историческая эпоха (укажите период): ремёсла, слуги, торговцы, крестьяне и писари. Современных технологий нет.',
        wb_postapoc: 'Постапокалиптическая пустошь: мусорщики, торговцы, поселения, охрана и механики. Деньги — бартер и хлам.',
        wb_steampunk: 'Индустриальная паровая эпоха: фабрики, дирижабли, изобретатели, клерки, механики и гильдии.', wb_custom: '',
        emoji: 'Эмодзи',
        settingsTip: 'Настройки', back: 'Назад',
        resetFab: 'Сбросить положение плавающей кнопки', fabReset: 'Плавающая кнопка сброшена.',
        s_display: 'Отображение', dm_auto: 'Авто (всплывающее окно на телефонах)', dm_floating: 'Плавающая панель', dm_popup: 'Всплывающее окно', uiDiag: 'Диагностика интерфейса', uiDiagHint: 'Скопируйте и отправьте разработчику, если панель или кнопка не отображаются.',
        langName: 'Russian', evPaid: 'Получена оплата', evLeave: 'Отпуск начался', evLeaveEnd: 'Отпуск закончился', evTask: 'Задание обновлено',
    },
};

const STATES = ['idle', 'working', 'offduty', 'onleave', 'vacation', 'sick', 'maternity', 'paternity', 'fired'];
const LEAVE_TYPES = ['vacation', 'sick', 'maternity', 'paternity', 'unpaid'];
const LEAVE_STATE = { vacation: 'vacation', sick: 'sick', maternity: 'maternity', paternity: 'paternity', unpaid: 'onleave' };
const STATE_LEAVE = { vacation: 'vacation', sick: 'sick', maternity: 'maternity', paternity: 'paternity', onleave: 'unpaid' };
const JOB_TYPES = ['standard', 'parttime', 'teen', 'freelance', 'adult'];
const MODES = ['onsite', 'remote', 'hybrid', 'anywhere'];
const PERIODS = ['hour', 'day', 'week', 'month', 'year', 'commission', 'project'];
const RATES = ['hour', 'project', 'word', 'commission'];
const TASK_STATUS = ['pending', 'active', 'done', 'failed', 'cancelled'];
const CURRENCIES = ['₽', '$', '€', '£', '¥'];

/* ------------------------------------------------------------------ */
/* Settings                                                            */
/* ------------------------------------------------------------------ */
const DEFAULTS = {
    enabled: true,
    showFab: true,
    displayMode: 'auto',
    phone: { all: true, bank: true, calendar: true, contacts: true, storyDate: true },
    tags: true,
    newChatsOff: false,
    worlds: [],
    promoDone: 10,
    promoRaise: 10,
    autoFail: true,
    overdueGrace: 0,
    penalty: { promo: 15, stress: 10, satisfaction: 10, finePct: 0 },
    lang: 'auto',
    adult: false,
    apiProfile: '',
    fallbackProfile: '',
    inject: true,
    injectDepth: 2,
    bankInChat: true,
    phoneKey: '',
    reducedPct: 50,
    opt: { history: false, coworkers: false, commute: false, importExport: false, events: false, autosummary: false, sliders: false },
};

const clone = (o) => JSON.parse(JSON.stringify(o));
const isObj = (o) => o && typeof o === 'object' && !Array.isArray(o);
function ensure(target, defs) {
    for (const k of Object.keys(defs)) {
        if (target[k] === undefined) target[k] = clone(defs[k]);
        else if (isObj(defs[k]) && isObj(target[k])) ensure(target[k], defs[k]);
    }
}
function S() {
    if (!extension_settings[MODULE]) extension_settings[MODULE] = clone(DEFAULTS);
    ensure(extension_settings[MODULE], DEFAULTS);
    return extension_settings[MODULE];
}
// Global settings live in extension_settings; everything else (people, jobs, NPCs, leave, tasks...) is stored per chat.
function D() {
    const md = getContext().chatMetadata;
    if (!md[MODULE]) md[MODULE] = { people: {}, log: [], off: !!S().newChatsOff };
    if (!md[MODULE].log) md[MODULE].log = [];
    if (!md[MODULE].world) md[MODULE].world = { preset: 'modern', description: '', currency: '' };
    if (!md[MODULE].people) md[MODULE].people = {};
    return md[MODULE];
}
const chatOff = () => { try { return !!getContext().chatMetadata?.[MODULE]?.off; } catch { return false; } };
const isOn = () => S().enabled && !chatOff();
const hasChat = () => { try { return !!getContext().getCurrentChatId?.(); } catch { return false; } };
function save() {
    ST.saveSettingsDebounced();
    try { const c = getContext(); (c.saveMetadataDebounced || c.saveMetadata)?.call(c); } catch (e) { console.warn('[Jobs] chat save failed', e); }
}

const uid = () => Math.random().toString(36).slice(2, 10);
const esc = (s) => String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const today = () => rpDate || new Date().toISOString().slice(0, 10);

function curLang() {
    const l = S().lang;
    if (l === 'en' || l === 'ru') return l;
    return (navigator.language || 'en').toLowerCase().startsWith('ru') ? 'ru' : 'en';
}
const t = (k) => I18N[curLang()][k] ?? I18N.en[k] ?? k;

function getByPath(o, path) { return path.split('.').reduce((a, k) => (a == null ? a : a[k]), o); }
function setByPath(o, path, v) {
    const keys = path.split('.');
    const last = keys.pop();
    let cur = o;
    for (const k of keys) { if (cur[k] == null) cur[k] = {}; cur = cur[k]; }
    cur[last] = v;
}

const fmt = (n, cur) => {
    const v = Number(n || 0).toLocaleString(undefined, { maximumFractionDigits: 2 });
    if (!cur) return v;
    return /^\p{L}{2,}/u.test(cur) ? `${v} ${cur}` : `${cur}${v}`;
};

/* ------------------------------------------------------------------ */
/* Data model                                                          */
/* ------------------------------------------------------------------ */
function newLeave(vacationDays = 14) {
    return {
        enabled: true,
        balances: {
            vacation: { allowance: vacationDays, adj: 0 }, sick: { allowance: 10, adj: 0 }, maternity: { allowance: 90, adj: 0 },
            paternity: { allowance: 14, adj: 0 }, unpaid: { allowance: 0, adj: 0 },
        },
        reduced: { vacation: false, sick: false, maternity: false, paternity: false, unpaid: false },
        entries: [],
    };
}

const num = (x) => { const n = parseFloat(String(x ?? '').replace(/,/g, '').replace(/[^0-9.\-]/g, '')); return Number.isNaN(n) ? 0 : n; };
const truthy = (x) => x === true || /^(true|yes|y|да|1)$/i.test(String(x).trim());

function newJob(p = {}) {
    const j = {
        id: uid(), title: p.title || '', employer: p.employer || '', category: p.category || '', type: p.type || 'standard',
        mode: p.mode || 'onsite', schedule: p.schedule || '', state: p.state || 'working', insurance: truthy(p.insurance),
        salary: { amount: num(p.amount), currency: p.currency || '$', period: p.period || 'month', rateType: p.rateType || 'hour', totalEarned: 0 },
        leave: newLeave(p.vacationDays != null && p.vacationDays !== '' ? num(p.vacationDays) : 14), tasks: [], awareness: { mode: 'everyone', who: [] },
        commute: '', stress: 50, satisfaction: 50, coworkers: [], summary: '', description: p.description || '',
        reducedPct: S().reducedPct, promo: { enabled: (p.type || 'standard') !== 'freelance', meter: 0, level: 1, raise: S().promoRaise },
    };
    return j;
}

function mkPerson(id, name, kind) {
    return { id, name, kind, emoji: '', group: 'unknown', resume: { skills: '', seeking: '' }, jobs: [], history: [], phoneContact: '' };
}

function ensurePeople() {
    const ctx = getContext();
    const P = D().people;
    if (!P.user) P.user = mkPerson('user', ctx.name1 || 'User', 'user');
    P.user.name = ctx.name1 || P.user.name;
    const ch = ctx.characters?.[ctx.characterId];
    if (ch) {
        const id = 'char:' + ch.avatar;
        if (!P[id]) P[id] = mkPerson(id, ch.name, 'bot');
        P[id].name = ch.name;
        ui.botId = id;
    } else ui.botId = null;
    if (!P[ui.selected]) ui.selected = 'user';
    for (const p of Object.values(P)) {
        if (!p.group) { const n = parseInt(p.age, 10); p.group = Number.isNaN(n) ? 'unknown' : n < 13 ? 'child' : n < 18 ? 'teen' : 'adult'; }
        if (!p.resume) p.resume = { skills: '', seeking: '' };
        for (const j of p.jobs) {
            if (!j.leave) j.leave = newLeave();
            if (!j.awareness) j.awareness = { mode: 'everyone', who: [] };
            if (j.insurance === undefined) j.insurance = false;
            if (j.reducedPct === undefined) j.reducedPct = S().reducedPct;
            if (!j.promo) j.promo = { enabled: j.type !== 'freelance', meter: 0, level: 1, raise: S().promoRaise };
            for (const k of j.tasks) { if (k.show === undefined) k.show = 0; if (k.penalized === undefined) k.penalized = false; }
            j.coworkers = (j.coworkers || []).filter((id) => P[id]);
            for (const e of j.leave.entries) { if (e.active === undefined) e.active = !e.end && !e.planned; if (e.calId === undefined) e.calId = ''; }
        }
    }
}

function visiblePeople() {
    return Object.values(D().people).filter((p) => p.kind === 'user' || p.kind === 'npc' || p.id === ui.botId);
}
const isOnLeave = (j) => ['onleave', 'vacation', 'sick', 'maternity', 'paternity'].includes(j.state);

// Age group rules
const minor = (p) => p.group === 'child' || p.group === 'teen';
const canTeen = (p) => p.group === 'unknown' || p.group === 'teen';
const canAdult = (p) => S().adult && p.group === 'adult';
const canWork = (p) => p.group !== 'child';
const jobVisibleFor = (p, j) => j.type !== 'adult' || (S().adult && p.group === 'adult');

/* ------------------------------------------------------------------ */
/* Leave maths                                                         */
/* ------------------------------------------------------------------ */
function entryDays(e) {
    if (e.start && e.end) {
        const d = Math.round((new Date(e.end) - new Date(e.start)) / 86400000) + 1;
        if (!Number.isNaN(d) && d > 0) return d;
    }
    return Number(e.days) || 0;
}
const entrySum = (j, type, planned) => j.leave.entries.filter((e) => e.type === type && !!e.planned === planned).reduce((a, e) => a + entryDays(e), 0);
const usedDays = (j, type) => (Number(j.leave.balances[type].adj) || 0) + entrySum(j, type, false);
const plannedDays = (j, type) => entrySum(j, type, true);
const leftDays = (j, type) => (Number(j.leave.balances[type].allowance) || 0) - usedDays(j, type);

function leaveFactor(j) {
    if (!isOnLeave(j)) return 1;
    const type = STATE_LEAVE[j.state];
    if (type === 'unpaid') return 0;
    return j.leave.reduced[type] ? (Number(j.reducedPct ?? S().reducedPct) || 0) / 100 : 1;
}

/* ------------------------------------------------------------------ */
/* Phone-ST bridge (the only place that touches Phone-ST)              */
/* ------------------------------------------------------------------ */
// bank.detected = Phone-ST present; bank.installed = bank sync active; cal / contacts = those syncs active
const bank = { detected: false, installed: false, cal: false, contacts: false, balance: null, currency: null };

const PHONE_KEY = 'glassphone'; // Phone-ST stores settings in extension_settings[PHONE_KEY] and per-chat data in chat_metadata[PHONE_KEY]
const SYMBOLS = { RUB: '₽', USD: '$', EUR: '€', GBP: '£', JPY: '¥', '₽': '₽', $: '$', '€': '€', '£': '£', '¥': '¥' };
let rpDate = null; // Phone-ST's in-story "today" (YYYY-MM-DD), when available

// Phone-ST's own modules (official functions are preferred; direct data access is the fallback)
let phoneMods = null;
let phoneModsTried = false;
async function loadPhoneMods() {
    if (phoneMods || phoneModsTried) return phoneMods;
    phoneModsTried = true;
    const folders = [S().phoneKey, 'Phone-ST', 'Phone-ST-main', 'phone-st', 'PhoneST'].filter(Boolean);
    for (const folder of folders) {
        try {
            const base = new URL(`../${folder}/`, import.meta.url);
            const [state, bankM, plans] = await Promise.all(['state.js', 'bank.js', 'plans.js'].map((f) => import(new URL(f, base).href)));
            phoneMods = { state, bank: bankM, plans, folder };
            return phoneMods;
        } catch { /* try next folder name */ }
    }
    return null;
}
const resetPhoneMods = () => { phoneMods = null; phoneModsTried = false; };

const PhoneBridge = {
    settings() { return isObj(extension_settings[PHONE_KEY]) ? extension_settings[PHONE_KEY] : null; },
    meta() { const m = getContext().chatMetadata?.[PHONE_KEY]; return isObj(m) ? m : null; },
    installed() { const st = this.settings(); return !!st && st.isEnabled !== false; },
    async getBalance() {
        const mods = await loadPhoneMods();
        try { if (mods) return Number(mods.bank.getBank().balance) || 0; } catch (e) { console.warn('[Jobs] getBank failed', e); }
        const b = this.meta()?.bank;
        return typeof b?.balance === 'number' ? b.balance : 0;
    },
    async getCurrency() {
        const mods = await loadPhoneMods();
        let v;
        try { v = mods ? mods.bank.getBank().currency : this.meta()?.bank?.currency; } catch { /* ignore */ }
        v = v || '₽';
        return SYMBOLS[String(v).toUpperCase()] || SYMBOLS[v] || String(v);
    },
    // Deposits go through Phone-ST's own addTransaction (same path as its bank app).
    // Note: Phone-ST's bank works in whole currency units, so cents are rounded.
    async addMoney(amount, label) {
        const mods = await loadPhoneMods();
        if (mods) {
            try { return !!mods.bank.addTransaction({ amount, label, category: 'зарплата' }); } catch (e) { console.warn('[Jobs] addTransaction failed', e); }
        }
        const m = this.meta();
        const amt = Math.round(Number(amount) || 0);
        if (!m || !amt) return false;
        if (!isObj(m.bank)) m.bank = {};
        const b = m.bank;
        if (typeof b.balance !== 'number') b.balance = 0;
        if (typeof b.currency !== 'string') b.currency = '₽';
        for (const k of ['transactions', 'loans', 'recurring', 'seenTags', 'seenRpBalances', 'syncQueue', 'txKeys']) if (!Array.isArray(b[k])) b[k] = [];
        b.transactions.unshift({ id: uid(), amount: amt, label: String(label || '').slice(0, 60) || 'Salary', category: 'зарплата', time: Date.now() });
        b.balance += amt;
        b.syncQueue.push({ amount: amt, at: getContext().chat?.length || 0 });
        save();
        return true;
    },
    async getContacts() {
        const c = this.meta()?.contacts;
        return Array.isArray(c) ? c.map((x) => (typeof x === 'string' ? x : x?.name)).filter(Boolean) : [];
    },
    // Phone SMS live inside the chat history, which the scan already reads
    async getMessages() { return []; },
    async notify() { return false; },
    async rpToday() {
        const mods = await loadPhoneMods();
        try { return mods?.plans?.rpToday?.() || null; } catch { return null; }
    },
    // Calendar = Phone-ST "plans" (single-date entries on the story calendar)
    async addCalendarEvent({ title, date, who = 'user' }) {
        if (!date) return null;
        const mods = await loadPhoneMods();
        if (mods) {
            try { return mods.plans.addPlan({ text: title, date, who, source: 'jobs' })?.id || null; } catch (e) { console.warn('[Jobs] addPlan failed', e); }
        }
        const m = this.meta();
        if (!m || !/^\d{4}-\d{2}-\d{2}$/.test(date)) return null;
        if (!Array.isArray(m.plans)) m.plans = [];
        const plan = { id: uid(), text: String(title).slice(0, 200), date, time: '', who, done: false, source: 'jobs', at: Date.now() };
        m.plans.push(plan);
        m.plans.sort((a, b) => a.date.localeCompare(b.date));
        save();
        return plan.id;
    },
    async removeCalendarEvent(id) {
        const mods = await loadPhoneMods();
        if (mods) { try { mods.plans.deletePlan(id); return; } catch (e) { console.warn('[Jobs] deletePlan failed', e); } }
        const m = this.meta();
        if (m && Array.isArray(m.plans)) { m.plans = m.plans.filter((p) => p.id !== id); save(); }
    },
};

async function diagnose() {
    const mods = await loadPhoneMods();
    const md = getContext().chatMetadata || {};
    const m = PhoneBridge.meta();
    return [
        'Jobs & Career diagnostics',
        `Phone-ST settings (extension_settings.${PHONE_KEY}): ${PhoneBridge.settings() ? 'found' + (PhoneBridge.settings().isEnabled === false ? ' (disabled)' : '') : 'NOT found'}`,
        `Phone-ST chat data (chat_metadata.${PHONE_KEY}): ${m ? 'found' : 'NOT found in this chat'}`,
        `Phone-ST modules imported: ${mods ? 'yes, folder "' + mods.folder + '"' : 'no (using direct data access)'}`,
        `bank: ${m?.bank ? `balance ${m.bank.balance}, currency ${m.bank.currency}, ${m.bank.transactions?.length || 0} transactions` : 'no bank data yet'}`,
        `contacts: ${Array.isArray(m?.contacts) ? m.contacts.length : 0}, plans: ${Array.isArray(m?.plans) ? m.plans.length : 0}`,
        `story date (rpToday): ${rpDate || 'unknown'}`,
        `extension_settings keys with "phone": ${Object.keys(extension_settings).filter((k) => /phone/i.test(k)).join(', ') || '(none)'}`,
        `chat metadata keys with "phone"/"glass": ${Object.keys(md).filter((k) => /phone|glass/i.test(k)).join(', ') || '(none)'}`,
    ].join('\n');
}

async function refreshBank() {
    if (!isOn()) return;
    const ph = S().phone;
    bank.detected = PhoneBridge.installed();
    const avail = bank.detected && ph.all;
    bank.installed = avail && ph.bank;
    bank.cal = avail && ph.calendar;
    bank.contacts = avail && ph.contacts;
    bank.balance = null; bank.currency = null; rpDate = null;
    try {
        if (bank.installed) { bank.balance = await PhoneBridge.getBalance(); bank.currency = await PhoneBridge.getCurrency(); }
        if (avail && ph.storyDate) rpDate = await PhoneBridge.rpToday();
    } catch (e) { console.warn('[Jobs] phone refresh', e); }
}
const effCur = (p, j) => (p.kind === 'user' && bank.currency ? bank.currency : j.salary.currency);
const worldCur = () => bank.currency || D().world?.currency || '$';

/* ------------------------------------------------------------------ */
/* Payments                                                            */
/* ------------------------------------------------------------------ */
function notify(title, msg) {
    if (!S().opt.events) return;
    try { toastr.info(msg, title); } catch { /* noop */ }
    PhoneBridge.notify(title, msg);
}

async function credit(p, j, amount, reason) {
    amount = Math.round(Number(amount) * 100) / 100;
    if (!(amount > 0)) return;
    j.salary.totalEarned = Math.round(((Number(j.salary.totalEarned) || 0) + amount) * 100) / 100;
    if (p.kind === 'user') {
        const ok = bank.installed ? await PhoneBridge.addMoney(amount, reason) : false;
        if (!ok && S().phone.all && S().phone.bank) toastr.warning(bank.installed ? t('depositFail') : t('phoneMissing'));
        await refreshBank();
    }
    notify(t('evPaid'), `${p.name}: ${fmt(amount, effCur(p, j))} (${j.title})`);
    save(); applyPrompt();
}

/* ------------------------------------------------------------------ */
/* Tasks, penalties, promotion and hidden-tag tracking                 */
/* ------------------------------------------------------------------ */
const clamp100 = (n) => Math.max(0, Math.min(100, Math.round(Number(n) || 0)));
const norm = (x) => String(x || '').toLowerCase().replace(/[^\p{L}\p{N}\s]/gu, ' ').replace(/\s+/g, ' ').trim();
function similar(a, b) {
    a = norm(a); b = norm(b);
    if (!a || !b) return 0;
    if (a === b) return 1;
    if (a.includes(b) || b.includes(a)) return 0.9;
    const A = new Set(a.split(' ')), B = new Set(b.split(' '));
    let hit = 0;
    for (const w of A) if (B.has(w)) hit++;
    return hit / Math.max(A.size, B.size);
}

function addLog(txt) {
    const L = D().log;
    L.unshift({ at: Date.now(), txt });
    if (L.length > 40) L.length = 40;
}

const DATE_RE = /^\d{4}-\d{2}-\d{2}$/;
function addDays(d, n) { const x = new Date(d + 'T00:00:00Z'); x.setUTCDate(x.getUTCDate() + n); return x.toISOString().slice(0, 10); }
const isOpen = (k) => k.status === 'pending' || k.status === 'active';
const isOverdue = (k) => !!(rpDate && DATE_RE.test(k.due || '') && isOpen(k) && addDays(k.due, Number(S().overdueGrace) || 0) < rpDate);

function bumpPromo(p, j, delta, why) {
    if (!j.promo?.enabled || !delta) return;
    const was = j.promo.meter >= 100;
    j.promo.meter = clamp100((Number(j.promo.meter) || 0) + delta);
    if (!was && j.promo.meter >= 100) {
        toastr.success(`${p.name}: ${t('promoAvail')} (${j.title})`);
        notify(t('promoAvail'), `${p.name} — ${j.title}`);
        addLog(`⭐ ${p.name} · ${j.title}: ${t('promoAvail')}${why ? ' (' + why + ')' : ''}`);
    }
}

async function applyPenalty(p, j, k, why) {
    if (k.penalized) return;
    k.penalized = true;
    const pen = S().penalty;
    bumpPromo(p, j, -(Number(pen.promo) || 0));
    j.stress = clamp100((Number(j.stress) || 0) + (Number(pen.stress) || 0));
    j.satisfaction = clamp100((Number(j.satisfaction) || 0) - (Number(pen.satisfaction) || 0));
    let fine = 0;
    const pct = Number(pen.finePct) || 0;
    if (pct > 0 && Number(k.pay) > 0) {
        fine = Math.round(Number(k.pay) * pct) / 100;
        j.salary.totalEarned = Math.max(0, Math.round(((Number(j.salary.totalEarned) || 0) - fine) * 100) / 100);
        if (p.kind === 'user' && bank.installed) { await PhoneBridge.addMoney(-fine, `Fine: ${k.desc}`); await refreshBank(); }
    }
    toastr.warning(`${t('taskFailedMsg')}: ${k.desc} (${p.name})${fine ? ' −' + fmt(fine, effCur(p, j)) : ''}`);
    addLog(`⚠ ${p.name} · ${j.title}: "${k.desc}" ${t('log_fail')}${why ? ' (' + why + ')' : ''}`);
}

// Single place that reacts to a task changing status (panel, hidden tags, overdue check)
async function taskStatusChanged(p, j, k, prev, why) {
    if (k.status === prev) return;
    k.show = (k.status === 'done' || k.status === 'failed') ? 2 : 0;
    notify(t('evTask'), `${j.title}: ${k.desc} → ${t('ts_' + k.status)}`);
    if (k.status === 'done') {
        bumpPromo(p, j, Number(S().promoDone) || 0, `"${k.desc}"`);
        if (!k.paid && Number(k.pay) > 0) { k.paid = true; await credit(p, j, k.pay, `Task: ${k.desc}`); }
    } else if (k.status === 'failed') await applyPenalty(p, j, k, why);
}

async function checkOverdue() {
    if (!isOn() || !S().autoFail || !rpDate || !hasChat()) return false;
    let changed = false;
    for (const p of Object.values(D().people)) for (const j of p.jobs) {
        if (isOnLeave(j)) continue; // deadlines pause during leave
        for (const k of j.tasks) {
            if (!isOverdue(k)) continue;
            const prev = k.status;
            k.status = 'failed'; changed = true;
            await taskStatusChanged(p, j, k, prev, t('overdue'));
        }
    }
    if (changed) save();
    return changed;
}

async function promote(p, j, title, raise) {
    const r = Number(raise) || 0;
    const from = j.title;
    j.promo.level = (Number(j.promo.level) || 1) + 1;
    j.promo.meter = 0;
    if (title) j.title = title;
    if (r > 0) j.salary.amount = Math.round(Number(j.salary.amount) * (1 + r / 100) * 100) / 100;
    toastr.success(`${p.name}: ${t('promoDone')} — ${j.title}${r ? ' (+' + r + '%)' : ''}`);
    notify(t('promoDone'), `${p.name} — ${j.title}`);
    addLog(`⭐ ${p.name}: ${from} → ${j.title}${r ? ' (+' + r + '%)' : ''}`);
}

/* ---- hidden tags: [job:kind|Person|Job|arg|arg|arg] ---- */
const TAG_RE = /\[job:\s*([a-z]+)\s*\|([^\]\n]*)\]/gi;

function findPerson(name) {
    const n = norm(name);
    if (!n) return null;
    const list = visiblePeople();
    return list.find((p) => norm(p.name) === n) || list.find((p) => norm(p.name).includes(n) || n.includes(norm(p.name))) || null;
}
function findJobFor(p, title) {
    const jobs = p.jobs.filter((j) => jobVisibleFor(p, j) && j.state !== 'fired');
    if (!jobs.length) return null;
    if (!title) return jobs.length === 1 ? jobs[0] : null;
    return jobs.find((j) => norm(j.title) === norm(title))
        || jobs.map((j) => ({ j, sc: Math.max(similar(j.title, title), similar(j.employer, title)) })).filter((x) => x.sc >= 0.5).sort((a, b) => b.sc - a.sc)[0]?.j
        || (jobs.length === 1 ? jobs[0] : null);
}
function findTask(j, text, statuses) {
    let best = null, score = 0.49;
    for (const k of j.tasks) {
        if (!statuses.includes(k.status)) continue;
        const sc = similar(k.desc, text);
        if (sc > score) { best = k; score = sc; }
    }
    return best;
}
function parseDelta(v) {
    const m = String(v || '').trim().match(/^([=+\-−]?)\s*(\d+(?:\.\d+)?)/);
    if (!m) return null;
    const n = Number(m[2]);
    return m[1] === '=' ? { abs: n } : { delta: Math.max(-30, Math.min(30, (m[1] === '-' || m[1] === '−') ? -n : n)) };
}

async function applyOp({ kind, args }) {
    const [who, jobT, a, b, c] = args;
    const p = findPerson(who);
    const j = p && findJobFor(p, jobT);
    if (!p || !j) return;
    const tag = `${p.name} · ${j.title}`;
    const OPEN = ['pending', 'active'];
    switch (kind) {
        case 'task': {
            if (!a || isOnLeave(j) || j.tasks.length >= 30) return;
            if (findTask(j, a, OPEN) && similar(findTask(j, a, OPEN).desc, a) >= 0.8) return; // duplicate
            j.tasks.push({ id: uid(), desc: a.slice(0, 200), due: DATE_RE.test(b || '') ? b : '', pay: num(c), status: 'active', paid: false, show: 0, penalized: false });
            addLog(`📋 ${tag}: ${t('log_task')} "${a}"`);
            return;
        }
        case 'done': case 'fail': case 'cancel': {
            const k = findTask(j, a, OPEN);
            if (!k) return;
            const prev = k.status;
            k.status = kind === 'done' ? 'done' : kind === 'fail' ? 'failed' : 'cancelled';
            addLog(`📋 ${tag}: "${k.desc}" ${t(kind === 'done' ? 'log_done' : kind === 'fail' ? 'log_fail' : 'log_cancel')}`);
            await taskStatusChanged(p, j, k, prev, 'chat');
            return;
        }
        case 'stress': case 'sat': {
            const d = parseDelta(a);
            if (!d) return;
            const key = kind === 'stress' ? 'stress' : 'satisfaction';
            const before = Number(j[key]) || 0;
            j[key] = clamp100('abs' in d ? d.abs : before + d.delta);
            addLog(`📊 ${tag}: ${t(kind === 'stress' ? 'log_stress' : 'log_sat')} ${before} → ${j[key]}`);
            return;
        }
        case 'promo': {
            const d = parseDelta(a);
            if (!d || !j.promo?.enabled) return;
            const before = j.promo.meter;
            if ('abs' in d) bumpPromo(p, j, clamp100(d.abs) - before, 'chat'); else bumpPromo(p, j, d.delta, 'chat');
            addLog(`⭐ ${tag}: ${t('log_promo')} ${before}% → ${j.promo.meter}%`);
            return;
        }
        case 'promoted': {
            if (!j.promo?.enabled) return;
            await promote(p, j, a || '', b ? num(b) : j.promo.raise);
            return;
        }
        default:
    }
}

// Applies and strips the tags of a freshly received character message
async function processMessage(id) {
    const s = S();
    if (!isOn() || !s.tags || !hasChat()) return;
    const ctx = getContext();
    const msg = ctx.chat?.[id];
    if (!msg || msg.is_user || typeof msg.mes !== 'string') return;
    // outcomes stay visible to the model for two replies
    let touched = false;
    for (const p of Object.values(D().people)) for (const j of p.jobs) for (const k of j.tasks) if (k.show > 0) { k.show--; touched = true; }
    const ops = [...msg.mes.matchAll(TAG_RE)].map((m) => ({ kind: m[1].toLowerCase(), args: m[2].split('|').map((x) => x.trim()) }));
    if (!ops.length) { if (touched) save(); return; }
    for (const op of ops) { try { await applyOp(op); } catch (e) { console.warn('[Jobs] tag failed', op, e); } }
    const clean = msg.mes.replace(TAG_RE, '').replace(/[ \t]+\n/g, '\n').replace(/\n{3,}/g, '\n\n').trimEnd();
    msg.mes = clean;
    if (Array.isArray(msg.swipes) && msg.swipes[msg.swipe_id] != null) msg.swipes[msg.swipe_id] = clean;
    try { ctx.updateMessageBlock?.(id, msg); } catch { /* ignore */ }
    try { await ctx.saveChat?.(); } catch { /* ignore */ }
    save(); applyPrompt();
}

function trackingInstructions() {
    const s = S();
    const anyPromo = visiblePeople().some((p) => p.jobs.some((j) => j.promo?.enabled && jobVisibleFor(p, j)));
    const L = [`[Job tracking: when job events happen in your reply, add hidden tags on their own lines at the very end of the reply. They are stripped automatically, so never mention or explain them. Use the exact names and job titles above${rpDate ? `. Story date: ${rpDate}; write dates as YYYY-MM-DD` : ''}.`,
        '[job:task|Person|Job|task text|due date|pay] a new work task is given',
        '[job:done|Person|Job|task text]  [job:fail|Person|Job|task text]  [job:cancel|Person|Job|task text]'];
    if (s.opt.sliders) L.push('[job:stress|Person|Job|+N or -N]  [job:sat|Person|Job|+N or -N] (0-100 scale, small steps)');
    if (anyPromo) L.push('[job:promo|Person|Job|+N or -N] progress toward a promotion;  [job:promoted|Person|Job|new title|raise %] only when a promotion really happens');
    L.push('Only tag real changes.]');
    return L.join('\n');
}

/* ------------------------------------------------------------------ */
/* World / setting                                                     */
/* ------------------------------------------------------------------ */
const WORLD_IDS = ['modern', 'fantasy', 'scifi', 'cyberpunk', 'historical', 'postapoc', 'steampunk', 'custom'];
const WORLD_EN = { modern: 'Modern day', fantasy: 'Fantasy', scifi: 'Sci-fi', cyberpunk: 'Cyberpunk', historical: 'Historical', postapoc: 'Post-apocalyptic', steampunk: 'Steampunk', custom: 'Custom world' };

function worldText() {
    const w = D().world;
    if (!w) return '';
    const d = (w.description || '').trim();
    if (w.preset === 'modern' && !d) return '';
    return `${WORLD_EN[w.preset] || ''}${d ? ': ' + d.slice(0, 700) : ''}`.trim();
}
const isBlurb = (d) => !d.trim() || WORLD_IDS.some((id) => Object.values(I18N).some((L) => L['wb_' + id] === d));

function curOptions(cur) {
    const list = [...CURRENCIES];
    for (const c of [D().world?.currency, cur]) if (c && !list.includes(c)) list.push(c);
    return list.map((c) => `<option ${c === cur ? 'selected' : ''}>${esc(c)}</option>`).join('');
}

function parseJsonObject(txt) {
    const clean = String(txt).replace(/```json|```/g, '');
    const a = clean.indexOf('{'), b = clean.lastIndexOf('}');
    if (a < 0 || b < 0) return null;
    try { const v = JSON.parse(clean.slice(a, b + 1)); return isObj(v) ? v : null; } catch { return null; }
}

// Active lorebook entries (global + character + chat books), via SillyTavern's own world-info module
async function loreEntries() {
    let WI = null;
    try { WI = await import('../../../world-info.js'); } catch (e) { console.warn('[Jobs] world-info import failed', e); }
    let entries = [];
    try { if (WI?.getSortedEntries) entries = await WI.getSortedEntries(); } catch (e) { console.warn('[Jobs] getSortedEntries failed', e); }
    if (!entries.length && WI?.loadWorldInfo) {
        const ctx = getContext();
        const names = new Set(WI.selected_world_info || []);
        const cw = ctx.characters?.[ctx.characterId]?.data?.extensions?.world;
        if (cw) names.add(cw);
        if (ctx.chatMetadata?.world_info) names.add(ctx.chatMetadata.world_info);
        for (const n of names) { try { const d = await WI.loadWorldInfo(n); entries.push(...Object.values(d?.entries || {})); } catch { /* skip book */ } }
    }
    return entries.filter((e) => e && !e.disable && e.content);
}

function loreText(entries) {
    const sorted = [...entries].sort((a, b) => (b.constant ? 1 : 0) - (a.constant ? 1 : 0));
    let out = '', n = 0;
    for (const e of sorted) {
        const title = e.comment || (Array.isArray(e.key) ? e.key.slice(0, 3).join(', ') : '');
        const line = `- ${title}: ${String(e.content).replace(/\s+/g, ' ').slice(0, 350)}\n`;
        if (out.length + line.length > 9000 || ++n > 60) break;
        out += line;
    }
    return out;
}

async function scanWorld(source) {
    let material = '';
    if (source === 'lore') {
        const entries = await loreEntries();
        if (!entries.length) throw new Error('nolore');
        material = loreText(entries);
    } else {
        material = cardText();
        if (!material) throw new Error('nocard');
    }
    const sys = 'You summarize roleplay settings. Reply with ONLY a JSON object, no commentary.';
    const prompt = `Source material (${source === 'lore' ? 'lorebook entries' : 'character card'}):\n${material}\n\nDescribe the world/setting so it can be used to invent fitting jobs. JSON object with keys: preset (one of ${WORLD_IDS.join('|')}), currency (the money used, as a symbol or short name, or ""), description (max 180 words: era and technology, economy, common industries and employers, notable organizations/factions/locations, anything unusual such as magic). Write in ${outLang()}.`;
    const o = parseJsonObject(await llm(prompt, sys));
    if (!o || !o.description) throw new Error('parse');
    const w = D().world;
    w.preset = WORLD_IDS.includes(o.preset) ? o.preset : 'custom';
    if (o.currency) w.currency = String(o.currency).slice(0, 20);
    w.description = String(o.description).trim();
}

/* ------------------------------------------------------------------ */
/* LLM helper                                                          */
/* ------------------------------------------------------------------ */
function profiles() { return extension_settings.connectionManager?.profiles || []; }

async function llm(prompt, sys) {
    const ctx = getContext();
    for (const id of [S().apiProfile, S().fallbackProfile].filter(Boolean)) {
        try {
            const svc = ctx.ConnectionManagerRequestService;
            if (!svc) break;
            const r = await svc.sendRequest(id, [{ role: 'system', content: sys }, { role: 'user', content: prompt }], 1400);
            const txt = typeof r === 'string' ? r : (r?.content ?? '');
            if (txt) return txt;
        } catch (e) { console.warn('[Jobs] profile failed', id, e); }
    }
    try { if (typeof ctx.generateRaw === 'function') { const r = await ctx.generateRaw({ prompt, systemPrompt: sys, responseLength: 1400 }); if (r) return r; } } catch (e) { console.warn(e); }
    try { const r = await ST.generateQuietPrompt({ quietPrompt: `${sys}\n\n${prompt}`, skipWIAN: true }); if (r) return r; } catch (e) { console.warn(e); }
    throw new Error('No API available');
}

function parseJsonArray(txt) {
    const clean = String(txt).replace(/```json|```/g, '');
    const a = clean.indexOf('['), b = clean.lastIndexOf(']');
    if (a < 0 || b < 0) return [];
    try { const v = JSON.parse(clean.slice(a, b + 1)); return Array.isArray(v) ? v : []; } catch { return []; }
}

function cardText() {
    const ctx = getContext();
    const ch = ctx.characters?.[ctx.characterId];
    if (!ch) return '';
    return [ch.description, ch.personality, ch.scenario].filter(Boolean).join('\n').slice(0, 2500);
}
function chatText(n = 20) {
    const ctx = getContext();
    return (ctx.chat || []).slice(-n).map((m) => `${m.name}: ${m.mes}`).join('\n').slice(0, 5000);
}
const outLang = () => (S().lang === 'auto' ? 'the same language as the chat/character card' : I18N[curLang()].langName);

const KIND_HINT = {
    standard: 'ordinary full-time jobs',
    parttime: 'part-time jobs',
    teen: 'age-appropriate casual jobs for a teenager (no hazardous or adult work)',
    adult: 'explicit adult-industry and sex-work occupations for adult characters, for example: prostitute / sex worker, escort, stripper / exotic dancer, cam model, adult-film performer, dominatrix, brothel or club hostess, erotic masseuse, sugar-dating companion, phone-sex operator. Be frank and uncensored: name each job honestly and describe what the work actually involves, the clientele, the venue and the working conditions. All characters involved are consenting adults'
};

const JOB_JSON_SPEC = 'title, employer, category, mode (onsite|remote|hybrid|anywhere), schedule, amount (a plain number greater than 0, never text), period (hour|day|week|month|year|project), vacation_days (integer paid vacation days per year), insurance (true or false), description';

function resumeText(p) {
    const r = p.resume || {};
    if (!r.skills && !r.seeking) return '';
    return `Resume of ${p.name}:\nSkills/abilities: ${r.skills || '-'}\nLooking for: ${r.seeking || '-'}\n`;
}

async function searchIdeas(kind) {
    const p = D().people[ui.selected];
    const cur = worldCur();
    const sys = 'You generate realistic job offers for a roleplay character. Reply with ONLY a JSON array, no commentary.';
    const wt = worldText();
    const prompt = `Character: ${p.name}. Age group: ${p.group}.\n${wt ? `World/setting: ${wt}\nThe jobs must fit this world: adapt occupation names, employers and pay to it.\n` : ''}${resumeText(p)}Context:\n${cardText()}\n\nSuggest 4 ${KIND_HINT[kind]} that fit this character${p.resume?.seeking ? ' and what they are looking for' : ''}.\nEvery offer MUST have a realistic numeric salary in ${cur} (amount + period), paid vacation days per year, and whether health insurance is included.\nJSON array of objects with keys: ${JOB_JSON_SPEC}.\nWrite text values in ${outLang()}.`;
    const arr = parseJsonArray(await llm(prompt, sys));
    return arr.map((x) => ({ ...x, amount: num(x.amount), vacation_days: num(x.vacation_days), insurance: truthy(x.insurance), type: kind }));
}

async function scanJobs() {
    const p = D().people[ui.selected];
    const names = visiblePeople().map((x) => x.name).join(', ');
    const phone = bank.installed ? (await PhoneBridge.getMessages(15)).join('\n') : '';
    const sys = 'You extract jobs mentioned in roleplay text. Reply with ONLY a JSON array, no commentary.';
    const prompt = `Known people: ${names}.\nCharacter card:\n${cardText()}\n\nRecent chat:\n${chatText()}\n\n${phone ? 'Phone messages:\n' + phone + '\n\n' : ''}Find jobs/occupations that any known person currently has. JSON array of objects with keys: owner (a known person's name, default "${p.name}"), type (standard|parttime|teen|freelance${S().adult ? '|adult' : ''}), ${JOB_JSON_SPEC}. Use 0 or false when unknown. Write text values in ${outLang()}.`;
    return parseJsonArray(await llm(prompt, sys)).map((x) => ({ ...x, amount: num(x.amount), vacation_days: x.vacation_days, insurance: truthy(x.insurance) }));
}

/* ------------------------------------------------------------------ */
/* Prompt injection                                                    */
/* ------------------------------------------------------------------ */
function knownBy(owner, j) {
    if (j.awareness.mode === 'everyone') return 'everyone';
    if (j.awareness.mode === 'none') return `only ${owner.name}`;
    return [owner.name, ...(j.awareness.who || [])].join(', ');
}

function buildPrompt() {
    const s = S();
    if (!isOn() || !s.inject || !hasChat()) return '';
    const P = D().people;
    const lines = [];
    const resumes = [];
    for (const p of visiblePeople()) {
        const r = p.resume;
        if (r && (r.skills || r.seeking) && canWork(p)) resumes.push(`- ${p.name} — skills: ${String(r.skills || '-').slice(0, 400)}; looking for: ${String(r.seeking || '-').slice(0, 300)}`);
        for (const j of p.jobs.filter((x) => jobVisibleFor(p, x))) {
            let l = `- ${p.name}: ${j.title}${j.employer ? ' at ' + j.employer : ''} [${j.category || j.type}; ${t('st_' + j.state)}; ${j.mode}`;
            if (j.schedule) l += `; schedule: ${j.schedule}`;
            if (j.salary.amount) l += `; pay: ${fmt(j.salary.amount, effCur(p, j))}/${j.type === 'freelance' ? j.salary.rateType : j.salary.period}`;
            l += `; vacation ${j.leave.balances.vacation.allowance} days/yr; insurance: ${j.insurance ? 'yes' : 'no'}]. Known by: ${knownBy(p, j)}.`;
            const cw = j.coworkers.map((id) => P[id]?.name).filter(Boolean);
            if (cw.length) l += ` Coworkers: ${cw.join(', ')}.`;
            if (isOnLeave(j)) {
                l += ` On ${t('st_' + j.state).toLowerCase()} now: no work tasks; may mention it.`;
                const act = j.leave.entries.find((e) => e.active);
                const child = act?.childId && P[act.childId];
                if (child) l += ` Parental leave for child ${child.name}.`;
                if (act?.reason && j.state === 'sick') l += ` Reason: ${act.reason}.`;
            } else {
                const open = j.tasks.filter(isOpen);
                if (open.length) l += ` Tasks: ${open.map((x) => `${x.desc}${x.due ? ` (due ${x.due}${isOverdue(x) ? ', OVERDUE' : ''})` : ''}${x.pay ? ` [pay ${x.pay}]` : ''}`).join('; ')}.`;
            }
            const recent = j.tasks.filter((x) => x.show > 0 && (x.status === 'done' || x.status === 'failed'));
            if (recent.length) l += ` Recent: ${recent.map((x) => `"${x.desc}" ${x.status === 'done' ? 'completed' : 'FAILED (consequences apply)'}`).join('; ')}.`;
            if (j.promo?.enabled) l += j.promo.meter >= 100 ? ' PROMOTION AVAILABLE (the employer may offer it when the story fits).' : ` Promotion progress ${j.promo.meter}%.`;
            const plan = j.leave.entries.filter((e) => e.planned);
            if (plan.length) l += ` Planned time off: ${plan.map((e) => `${t('l_' + e.type).toLowerCase()} ${e.start || '?'}–${e.end || '?'}`).join('; ')}.`;
            if (s.opt.sliders) l += ` Stress ${j.stress}/100, satisfaction ${j.satisfaction}/100.`;
            if (s.opt.commute && j.commute) l += ` Commute: ${j.commute}.`;
            if (s.opt.autosummary && j.summary) l += ` Recent work events: ${j.summary}`;
            lines.push(l);
        }
    }
    const showBank = s.bankInChat && bank.installed && bank.balance != null;
    if (!lines.length && !resumes.length && !showBank) return '';
    let out = `[Jobs & career info (reference). A job may only be mentioned by or to characters who know about it (see "Known by"). Characters on leave get no work tasks. Write job-related text in the chat's language.]`;
    const wt = worldText();
    if (wt) out += `\nWorld: ${wt}`;
    if (resumes.length) out += `\nResumes:\n${resumes.join('\n')}`;
    if (lines.length) out += `\nJobs:\n${lines.join('\n')}`;
    if (s.tags && lines.length) out += `\n${trackingInstructions()}`;
    if (showBank) {
        out += `\n${P.user.name}'s phone bank balance: ${fmt(bank.balance, bank.currency || '')}${bank.balance < 0 ? ' (negative, in debt)' : ''}.`;
    }
    return out;
}

function applyPrompt() {
    try {
        const pos = ST.extension_prompt_types?.IN_CHAT ?? 1;
        const role = ST.extension_prompt_roles?.SYSTEM ?? 0;
        ST.setExtensionPrompt(MODULE, buildPrompt(), pos, Number(S().injectDepth) || 2, false, role);
    } catch (e) { console.warn('[Jobs] inject failed', e); }
}

/* ------------------------------------------------------------------ */
/* UI state & rendering                                                */
/* ------------------------------------------------------------------ */
function byId(id) {
    const el = document.getElementById(id);
    if (el) return el;
    const root = ui.panelEl;
    if (!root) return null;
    return root.id === id ? root : root.querySelector('#' + id);
}
const LS_SETSEC = 'jobsext_setsec';
function loadSetSec() { try { return JSON.parse(localStorage.getItem(LS_SETSEC) || 'null') || { general: true }; } catch { return { general: true }; } }
const ui = { view: 'main', setSec: loadSetSec(), open: false, selected: 'user', botId: null, exp: {}, sec: {}, resume: false, worldOpen: false, logOpen: false, ideas: [], busy: '', ideaFor: null, contacts: [] };

function opacity() { const v = parseFloat(localStorage.getItem(LS_OPACITY)); return Number.isNaN(v) ? 1 : v; }

function opts(list, cur, prefix) { return list.map((v) => `<option value="${v}" ${v === cur ? 'selected' : ''}>${esc(t(prefix + v))}</option>`).join(''); }

function fld(j, path, label, kind = 'text', o = {}) {
    const val = getByPath(j, path);
    const base = `data-j="${j.id}" data-f="${path}"`;
    let ctl;
    if (kind === 'select') ctl = `<select ${base}>${o.html}</select>`;
    else if (kind === 'check') ctl = `<input type="checkbox" ${base} data-c="1" ${val ? 'checked' : ''}>`;
    else if (kind === 'num') ctl = `<input type="number" step="any" ${base} data-n="1" value="${esc(val)}">`;
    else if (kind === 'range') ctl = `<input type="range" min="0" max="100" ${base} data-n="1" value="${esc(val)}"><b>${esc(val)}</b>`;
    else if (kind === 'area') ctl = `<textarea rows="2" ${base}>${esc(val)}</textarea>`;
    else if (kind === 'date') ctl = `<input type="date" ${base} value="${esc(val)}">`;
    else ctl = `<input type="text" ${base} value="${esc(val)}">`;
    return `<label class="jx-f ${kind === 'check' ? 'jx-fc' : ''}"><span>${esc(label)}</span>${ctl}</label>`;
}

const chip = (txt, cls = '') => `<span class="jx-chip ${cls}">${txt}</span>`;

function salaryLine(p, j) {
    if (!j.salary.amount) return '';
    return `${fmt(j.salary.amount, effCur(p, j))}/${t(j.type === 'freelance' ? 'r_' + j.salary.rateType : 'p_' + j.salary.period)}`;
}

function sec(j, name, icon, title, html, badge = '') {
    const key = `${j.id}:${name}`;
    const open = ui.sec[key] ?? (name === 'pay');
    return `<div class="jx-sec"><div class="jx-sh" data-a="sec" data-j="${j.id}" data-sec="${name}"><span>${icon} ${esc(title)}</span><span class="jx-sbadge">${badge}</span><span class="jx-chev">${open ? '▾' : '▸'}</span></div>${open ? `<div class="jx-sb">${html}</div>` : ''}</div>`;
}

function renderLeave(j) {
    const L = j.leave;
    let h = fld(j, 'leave.enabled', t('enabled'), 'check');
    if (!L.enabled) return h;
    h += `<div class="jx-scroll"><table class="jx-tbl"><tr><th></th><th>${t('allowance')}</th><th>±</th><th>${t('used')}</th><th>${t('planned')}</th><th>${t('left')}</th><th>${t('reduced')}</th></tr>`;
    for (const ty of LEAVE_TYPES) {
        const left = leftDays(j, ty);
        h += `<tr><td>${t('l_' + ty)}</td>
        <td><input type="number" data-j="${j.id}" data-f="leave.balances.${ty}.allowance" data-n="1" value="${L.balances[ty].allowance}"></td>
        <td><input type="number" data-j="${j.id}" data-f="leave.balances.${ty}.adj" data-n="1" value="${L.balances[ty].adj}"></td>
        <td>${usedDays(j, ty)}</td><td>${plannedDays(j, ty)}</td><td class="${left < 0 ? 'jx-neg' : ''}"><b>${left}</b></td>
        <td><input type="checkbox" data-j="${j.id}" data-f="leave.reduced.${ty}" data-c="1" ${L.reduced[ty] ? 'checked' : ''}></td></tr>`;
    }
    h += '</table></div>';
    h += `<div class="jx-grid">${fld(j, 'reducedPct', t('reducedPct'), 'num')}</div><div class="jx-hint">${t('reducedHint')}</div>`;
    const kids = Object.values(D().people).filter((p) => p.kind === 'npc');
    h += `<div class="jx-st">${t('planVacation')}</div><div class="jx-lf">
      <select class="jx-l-type">${LEAVE_TYPES.map((x) => `<option value="${x}">${esc(t('l_' + x))}</option>`).join('')}</select>
      <input type="date" class="jx-l-start" value="${today()}" title="${t('start')}"><input type="date" class="jx-l-end" title="${t('end')}">
      <input type="number" class="jx-l-days" placeholder="${t('days')}" title="${t('days')}" style="width:64px">
      <input type="text" class="jx-l-reason" placeholder="${t('reason')}">
      <select class="jx-l-child"><option value="">${t('child')}: —</option>${kids.map((c) => `<option value="${c.id}">${esc(c.name)}</option>`).join('')}</select>
      ${bank.cal ? `<label class="jx-fc"><input type="checkbox" class="jx-l-cal" checked> 📅 ${t('calendar')}</label>` : ''}
      <button class="menu_button" data-a="planLeave" data-j="${j.id}">${t('plan')}</button>
      <button class="menu_button" data-a="startLeave" data-j="${j.id}">${t('startNow')}</button></div>`;
    if (L.entries.length) {
        h += `<div class="jx-st">${t('entries')}</div>`;
        h += L.entries.map((e, i) => `<div class="jx-entry ${e.planned ? 'jx-planned' : e.active ? 'jx-active' : ''}">
          <div><b>${esc(t('l_' + e.type))}</b> · ${esc(e.start || '?')} → ${esc(e.end || '…')} · ${entryDays(e)} ${t('days')}
          ${e.planned ? chip(t('planned'), 'jx-c-warn') : e.active ? chip('●', 'jx-c-ok') : ''}${e.calId ? chip('📅') : ''}
          ${e.reason ? `<div class="jx-dim">${esc(e.reason)}${e.childId && D().people[e.childId] ? ' · ' + esc(D().people[e.childId].name) : ''}</div>` : ''}</div>
          <div class="jx-ebtn">${e.planned ? `<button class="menu_button" data-a="startEntry" data-j="${j.id}" data-i="${i}">${t('startEntry')}</button>` : ''}
          ${e.active ? `<button class="menu_button" data-a="endLeave" data-j="${j.id}" data-i="${i}">■ ${t('endLeave')}</button>` : ''}
          ${bank.cal && !e.calId ? `<button class="menu_button" data-a="calEntry" data-j="${j.id}" data-i="${i}" title="${t('calendar')}">📅</button>` : ''}
          <button class="menu_button" data-a="delLeave" data-j="${j.id}" data-i="${i}">×</button></div></div>`).join('');
    }
    return h;
}

function renderTasks(j) {
    let h = `<button class="menu_button" data-a="addTask" data-j="${j.id}">${t('addTask')}</button>`;
    if (isOnLeave(j)) h += `<div class="jx-warn">${t('noLeaveTasks')}</div>`;
    j.tasks.forEach((k, i) => {
        h += `<div class="jx-task"><input type="text" data-j="${j.id}" data-f="tasks.${i}.desc" value="${esc(k.desc)}" placeholder="${t('desc')}">
        <input type="date" data-j="${j.id}" data-f="tasks.${i}.due" value="${esc(k.due)}" title="${t('due')}">
        <input type="number" step="any" data-j="${j.id}" data-f="tasks.${i}.pay" data-n="1" value="${esc(k.pay)}" title="${t('pay')}" style="width:80px">
        <select data-j="${j.id}" data-f="tasks.${i}.status">${opts(TASK_STATUS, k.status, 'ts_')}</select>
        ${k.paid ? chip(t('paid'), 'jx-c-ok') : ''}${isOverdue(k) ? chip('⏰ ' + t('overdue'), 'jx-c-warn') : ''}<button class="menu_button" data-a="delTask" data-j="${j.id}" data-i="${i}">×</button></div>`;
    });
    return h;
}

function renderPromo(p, j) {
    const pr = j.promo;
    let h = fld(j, 'promo.enabled', t('promoEnabled'), 'check');
    if (!pr.enabled) return h;
    h += fld(j, 'promo.meter', t('promoMeter'), 'range');
    h += `<div class="jx-hint">${t('promoHint')}</div>`;
    h += `<div class="jx-grid">${fld(j, 'promo.raise', t('promoRaise'), 'num')}<label class="jx-f"><span>${t('promoLevel')}</span><input disabled value="${pr.level}"></label></div>`;
    h += `<div class="jx-row"><input type="text" class="jx-ptitle" placeholder="${esc(t('promoTitle'))}"><button class="menu_button ${pr.meter >= 100 ? 'jx-hot' : ''}" data-a="promote" data-j="${j.id}">⭐ ${t('promote')}</button></div>`;
    return h;
}

function renderAwareness(p, j) {
    const others = visiblePeople().filter((x) => x.id !== p.id);
    let h = `<select data-j="${j.id}" data-f="awareness.mode"><option value="everyone" ${j.awareness.mode === 'everyone' ? 'selected' : ''}>${t('everyone')}</option>
      <option value="specific" ${j.awareness.mode === 'specific' ? 'selected' : ''}>${t('specific')}</option>
      <option value="none" ${j.awareness.mode === 'none' ? 'selected' : ''}>${t('none')}</option></select>`;
    if (j.awareness.mode === 'specific') {
        h += '<div class="jx-pills">' + others.map((o) => `<label class="jx-pill"><input type="checkbox" data-a="aware" data-j="${j.id}" data-name="${esc(o.name)}" ${j.awareness.who.includes(o.name) ? 'checked' : ''}> ${esc(o.name)}</label>`).join('') + '</div>';
    }
    return h;
}

const kindIcon = (p) => p.emoji || (p.kind === 'user' ? '👤' : p.kind === 'bot' ? '🤖' : '🙂');
const EMOJI_PICKS = ['👤', '🤖', '🙂', '😎', '🧑‍💼', '👩‍🍳', '🧑‍🔧', '🧑‍⚕️', '🧑‍🎨', '🧑‍🏫', '🧙', '🧝', '🧛', '🐱', '🐶', '🦊', '🐺', '🐉', '⭐', '💼', '💖', '🔥', '🌙', '🍀'];
function firstEmoji(v) {
    const str = String(v || '').trim();
    if (!str) return '';
    try { return [...new Intl.Segmenter(undefined, { granularity: 'grapheme' }).segment(str)][0].segment; } catch { return Array.from(str)[0]; }
}

function renderCoworkers(p, j) {
    const others = visiblePeople().filter((x) => x.id !== p.id);
    return `<div class="jx-pills">${others.map((o) => `<label class="jx-pill"><input type="checkbox" data-a="cow" data-j="${j.id}" data-id="${esc(o.id)}" ${j.coworkers.includes(o.id) ? 'checked' : ''}> ${kindIcon(o)} ${esc(o.name)}</label>`).join('')}</div>
      <div class="jx-row"><input type="text" class="jx-cw" placeholder="${t('coworkerNew')}"><button class="menu_button" data-a="addCoworker" data-j="${j.id}">+ NPC</button></div>`;
}

function renderJob(p, j) {
    const s = S();
    const open = ui.exp[j.id];
    const types = JOB_TYPES.filter((x) => x !== 'adult' || canAdult(p) || j.type === 'adult').filter((x) => x !== 'teen' || canTeen(p) || j.type === 'teen');
    const vac = j.leave.balances.vacation.allowance;
    let h = `<div class="jx-job jx-s-${j.state}" data-job="${j.id}"><div class="jx-jh" data-a="toggle" data-j="${j.id}">
      <div class="jx-jt"><div class="jx-name">${esc(j.title || '—')}</div><div class="jx-emp">${esc(j.employer || '')}${j.category ? ' · ' + esc(j.category) : ''}</div></div>
      <div class="jx-chips">${j.salary.amount ? chip('💰 ' + esc(salaryLine(p, j)), 'jx-c-pay') : chip(t('setSalary'), 'jx-c-warn')}
      ${chip('🏖 ' + vac)}${j.insurance ? chip('🛡') : ''}${j.type === 'adult' ? chip('18+') : ''}${j.promo?.enabled ? chip(j.promo.meter >= 100 ? '⭐ !' : '⭐ ' + j.promo.meter + '%', j.promo.meter >= 100 ? 'jx-c-ok' : '') : ''}${chip(t('st_' + j.state), 'jx-badge jx-b-' + j.state)}</div>
      ${j.promo?.enabled ? `<div class="jx-meter ${j.promo.meter >= 100 ? 'jx-full' : ''}" title="${esc(t('promoMeter'))}"><i style="width:${j.promo.meter}%"></i></div>` : ''}</div>`;
    if (isOnLeave(j) && !open) h += `<div class="jx-subline">${t('st_' + j.state)} · ${t('left')}: ${leftDays(j, STATE_LEAVE[j.state])} ${t('days')}</div>`;
    if (open) {
        const paySec = `<div class="jx-grid">${fld(j, 'salary.amount', t('amount'), 'num')}
          ${p.kind === 'user' && bank.currency ? `<label class="jx-f"><span>${t('currency')}</span><input disabled value="${esc(bank.currency)}"></label>`
            : fld(j, 'salary.currency', t('currency'), 'select', { html: curOptions(j.salary.currency) })}
          ${j.type === 'freelance' ? fld(j, 'salary.rateType', t('rateType'), 'select', { html: opts(RATES, j.salary.rateType, 'r_') }) : fld(j, 'salary.period', t('period'), 'select', { html: opts(PERIODS, j.salary.period, 'p_') })}
          ${fld(j, 'salary.totalEarned', t('totalEarned'), 'num')}
          ${fld(j, 'leave.balances.vacation.allowance', t('vacationDays'), 'num')}
          ${fld(j, 'insurance', t('insurance'), 'check')}</div>
          <button class="menu_button" data-a="payPeriod" data-j="${j.id}">💵 ${t('payPeriod')}</button>`;
        h += `<div class="jx-body"><div class="jx-grid">${fld(j, 'title', t('jTitle'))}${fld(j, 'employer', t('employer'))}${fld(j, 'category', t('category'))}
          ${fld(j, 'type', t('type'), 'select', { html: opts(types, j.type, 't_') })}
          ${fld(j, 'mode', t('mode'), 'select', { html: opts(MODES, j.mode, 'm_') })}
          ${fld(j, 'state', t('state'), 'select', { html: opts(STATES, j.state, 'st_') })}</div>${fld(j, 'schedule', t('schedule'), 'area')}`;
        h += sec(j, 'pay', '💰', t('sec_pay'), paySec);
        h += sec(j, 'leave', '🏖', t('sec_leave'), renderLeave(j), j.leave.entries.some((e) => e.planned) ? '📅' : '');
        h += sec(j, 'tasks', '📋', t('sec_tasks'), renderTasks(j), j.tasks.length ? String(j.tasks.length) : '');
        h += sec(j, 'promo', '⭐', t('sec_promo'), renderPromo(p, j), j.promo.enabled ? (j.promo.meter >= 100 ? '!' : j.promo.meter + '%') : '');
        h += sec(j, 'aware', '👁', t('sec_aware'), renderAwareness(p, j));
        if (s.opt.coworkers) h += sec(j, 'cow', '🤝', t('coworkers'), renderCoworkers(p, j), j.coworkers.length ? String(j.coworkers.length) : '');
        let more = '';
        if (s.opt.commute) more += fld(j, 'commute', t('commute'));
        if (s.opt.sliders) more += fld(j, 'stress', t('stress'), 'range') + fld(j, 'satisfaction', t('satisfaction'), 'range') + `<div class="jx-hint">${t('slidersHint')}</div>`;
        if (s.opt.autosummary) more += fld(j, 'summary', t('summary'), 'area') + `<button class="menu_button" data-a="summarize" data-j="${j.id}">${t('summarize')}</button>`;
        if (more) h += sec(j, 'more', '✨', t('sec_more'), more);
        h += `<div class="jx-row jx-end">${s.opt.history ? `<button class="menu_button" data-a="archiveJob" data-j="${j.id}">📦 ${t('archive')}</button>` : ''}<button class="menu_button" data-a="delJob" data-j="${j.id}">🗑 ${t('del')}</button></div></div>`;
    }
    return h + '</div>';
}

function ideaCard(x, i) {
    const cur = worldCur();
    return `<div class="jx-idea"><div class="jx-it"><b>${esc(x.title)}</b><span class="jx-dim"> ${esc(x.employer || '')}</span></div>
      <div class="jx-chips">${x.amount ? chip('💰 ' + esc(fmt(x.amount, cur)) + '/' + esc(t('p_' + x.period) || x.period || ''), 'jx-c-pay') : chip(t('setSalary'), 'jx-c-warn')}
      ${x.vacation_days !== '' && x.vacation_days != null ? chip('🏖 ' + esc(num(x.vacation_days)) + ' ' + t('days')) : ''}
      ${chip('🛡 ' + (x.insurance ? t('yes') : t('no')), x.insurance ? 'jx-c-ok' : '')}${x.schedule ? chip('🕒 ' + esc(x.schedule)) : ''}${x.mode ? chip(esc(t('m_' + x.mode) || x.mode)) : ''}</div>
      ${x.description ? `<div class="jx-dim">${esc(x.description)}</div>` : ''}<button class="menu_button" data-a="addIdea" data-i="${i}">＋ ${t('add')}</button></div>`;
}

function renderWorld() {
    const w = D().world;
    const open = ui.worldOpen;
    let h = `<div class="jx-card jx-world"><div class="jx-sh" data-a="worldToggle"><span>🌍 ${t('world')} · ${esc(t('wp_' + w.preset))}</span><span class="jx-sbadge">${w.description ? '●' : ''}</span><span class="jx-chev">${open ? '▾' : '▸'}</span></div>`;
    if (open) {
        h += `<div class="jx-grid"><label class="jx-f"><span>${t('worldType')}</span><select data-w="preset">${WORLD_IDS.map((id) => `<option value="${id}" ${w.preset === id ? 'selected' : ''}>${esc(t('wp_' + id))}</option>`).join('')}</select></label>
          <label class="jx-f"><span>${t('worldCur')}</span><input type="text" data-w="currency" value="${esc(w.currency)}" placeholder="$ / gold / credits"></label></div>
          <label class="jx-f"><span>${t('worldDesc')}</span><textarea rows="5" data-w="description" placeholder="${esc(t('worldDescPh'))}">${esc(w.description)}</textarea></label>
          <div class="jx-row"><button class="menu_button" data-a="scanWorld" data-k="lore">📚 ${t('scanLore')}</button><button class="menu_button" data-a="scanWorld" data-k="card">🃏 ${t('scanCard')}</button></div>
          <div class="jx-st">${t('savedWorlds')}</div>
          <div class="jx-row"><select class="jx-wsel"><option value="">—</option>${S().worlds.map((x) => `<option value="${x.id}">${esc(x.name)}</option>`).join('')}</select>
            <button class="menu_button" data-a="loadWorld">${t('load')}</button><button class="menu_button" data-a="delWorld">×</button></div>
          <div class="jx-row"><input type="text" class="jx-wname" placeholder="${esc(t('worldName'))}"><button class="menu_button" data-a="saveWorld">💾 ${t('saveWorld')}</button></div>
          <div class="jx-hint">${t('worldHint')}</div>`;
    }
    return h + '</div>';
}

function updatePower() {
    const on = isOn();
    byId('jx_panel')?.classList.toggle('jx-off', !on);
    byId('jx_fab')?.classList.toggle('jx-off', !on);
    const b = byId('jx_power');
    if (b) { b.title = t('powerTip'); b.classList.toggle('jx-on', on); }
    const g = byId('jx_gear');
    if (g) { g.title = t('settingsTip'); g.classList.toggle('jx-on', ui.view === 'settings'); }
    const ph = byId('jx_phone');
    if (ph) { ph.title = t('phoneTip'); ph.classList.toggle('jx-on', !!S().phone.all); }
}
function updateFab() {
    const fab = byId('jx_fab');
    if (fab) fab.style.display = S().showFab ? '' : 'none';
}

function renderPanel() {
    const body = byId('jx_body');
    if (!body) return;
    updatePower(); updateFab();
    if (ui.view === 'settings') { const sc = body.scrollTop; body.innerHTML = settingsHtml(true); body.scrollTop = sc; return; }
    if (!S().enabled) { body.innerHTML = `<div class="jx-empty">${t('disabledMsg')}</div>`; return; }
    if (!hasChat()) { body.innerHTML = `<div class="jx-empty">${t('noChat')}</div>`; return; }
    if (chatOff()) { body.innerHTML = `<div class="jx-empty">${t('offChat')}</div>`; return; }
    ensurePeople();
    const s = S();
    const p = D().people[ui.selected];
    const scroll = body.scrollTop;
    let h = '';
    if (bank.installed) {
        h += `<div class="jx-bank ${bank.balance < 0 ? 'jx-neg' : ''}"><span>🏦 ${t('phoneBalance')}</span><b>${bank.balance == null ? '—' : esc(fmt(bank.balance, bank.currency || ''))}</b>${bank.balance < 0 ? `<span>⚠ ${t('negative')}</span>` : ''}</div>`;
    } else {
        const msg = !S().phone.all ? t('phoneOff') : !bank.detected ? t('phoneMissing') : t('bankOff');
        h += `<div class="jx-bank jx-dim">📵 ${msg}</div>`;
    }

    h += renderWorld();
    h += '<div class="jx-people">' + visiblePeople().map((x) => `<button class="jx-tab ${x.id === ui.selected ? 'jx-on' : ''}" data-a="select" data-id="${esc(x.id)}">${kindIcon(x)} ${esc(x.name)}</button>`).join('')
        + `<button class="jx-tab jx-add" data-a="addNpc">${t('addNpc')}</button></div>`;

    h += `<div class="jx-card"><div class="jx-row"><label class="jx-f jx-inline"><span>${t('ageGroup')}</span>
      <select data-p="group">${['unknown', 'child', 'teen', 'adult'].map((g) => `<option value="${g}" ${p.group === g ? 'selected' : ''}>${esc(t('g_' + g))}</option>`).join('')}</select></label>
      <label class="jx-f jx-inline"><span>${t('emoji')}</span><input type="text" data-p="emoji" list="jx_emoji" value="${esc(p.emoji || '')}" placeholder="${esc(kindIcon({ ...p, emoji: '' }))}" style="width:64px;text-align:center"></label>
      <datalist id="jx_emoji">${EMOJI_PICKS.map((e) => `<option value="${e}"></option>`).join('')}</datalist>`;
    if (p.kind === 'npc') {
        if (bank.contacts) h += `<select data-p="phoneContact" class="jx-contact"><option value="">📱 —</option>${ui.contacts.map((c) => `<option ${p.phoneContact === c ? 'selected' : ''}>${esc(c)}</option>`).join('')}</select>`;
        h += `<button class="menu_button" data-a="delNpc">🗑 NPC</button>`;
    }
    h += '</div>';

    if (!canWork(p)) h += `<div class="jx-dim">${t('childNoJobs')}</div>`;
    else {
        const rOpen = ui.resume;
        const filled = p.resume.skills || p.resume.seeking;
        h += `<div class="jx-sh jx-rh" data-a="resumeToggle"><span>📄 ${t('resume')}</span><span class="jx-sbadge">${filled ? '●' : ''}</span><span class="jx-chev">${rOpen ? '▾' : '▸'}</span></div>`;
        if (rOpen) {
            h += `<label class="jx-f"><span>${t('skills')}</span><textarea rows="3" data-p="resume.skills" placeholder="${esc(t('skillsPh'))}">${esc(p.resume.skills)}</textarea></label>
              <label class="jx-f"><span>${t('seeking')}</span><textarea rows="3" data-p="resume.seeking" placeholder="${esc(t('seekingPh'))}">${esc(p.resume.seeking)}</textarea></label>`;
        }
        h += '<div class="jx-row jx-search">';
        h += `<button class="menu_button" data-a="search" data-k="standard">🔎 ${t('sStandard')}</button><button class="menu_button" data-a="search" data-k="parttime">🕑 ${t('sPart')}</button>`;
        if (canTeen(p)) h += `<button class="menu_button" data-a="search" data-k="teen">🎒 ${t('sTeen')}</button>`;
        if (canAdult(p)) h += `<button class="menu_button" data-a="search" data-k="adult">🔞 ${t('sAdult')}</button>`;
        h += `<button class="menu_button" data-a="manual">✍ ${t('manual')}</button><button class="menu_button" data-a="scan">📡 ${t('scan')}</button></div>`;
        if (s.adult && p.group !== 'adult') h += `<div class="jx-hint">${t('adultNeedsAge')}</div>`;
    }
    h += '</div>';

    if (s.opt.importExport) h += `<div class="jx-row"><button class="menu_button" data-a="export">⬇ ${t('export')}</button><button class="menu_button" data-a="import">⬆ ${t('import')}</button><input type="file" id="jx_file" accept=".json" hidden></div>`;
    if (ui.busy) h += `<div class="jx-busy">⏳ ${t('searching')}</div>`;
    if (ui.ideas.length && ui.ideaFor === p.id) h += `<div class="jx-st">${t('ideas')}</div>${ui.ideas.map(ideaCard).join('')}`;

    const jobs = p.jobs.filter((j) => jobVisibleFor(p, j));
    h += `<div class="jx-st">💼 ${t('jobs')}</div>` + (jobs.length ? jobs.map((j) => renderJob(p, j)).join('') : `<div class="jx-empty">${t('noJobs')}</div>`);
    if (s.opt.history && p.history.length) {
        h += `<div class="jx-st">📦 ${t('history')}</div>` + p.history.map((j, i) => `<div class="jx-hist"><div><b>${esc(j.title)}</b> ${j.employer ? '· ' + esc(j.employer) : ''}<span class="jx-dim"> · ${esc(fmt(j.salary.totalEarned, j.salary.currency))}</span></div><div class="jx-ebtn"><button class="menu_button" data-a="restoreJob" data-i="${i}">↩ ${t('restore')}</button><button class="menu_button" data-a="delHist" data-i="${i}">×</button></div></div>`).join('');
    }
    const log = D().log || [];
    if (log.length) {
        h += `<div class="jx-sh" data-a="logToggle"><span>🧾 ${t('recent')}</span><span class="jx-chev">${ui.logOpen ? '▾' : '▸'}</span></div>`;
        if (ui.logOpen) h += log.slice(0, 20).map((x) => `<div class="jx-log"><span class="jx-dim">${esc(new Date(x.at).toLocaleString())}</span> ${esc(x.txt)}</div>`).join('');
    }
    body.innerHTML = h;
    body.scrollTop = scroll;
    const op = byId('jx_opacity');
    if (op) op.title = t('opacity');
}

function setSection(name, title, html) {
    const open = !!ui.setSec[name];
    return `<div class="jx-setsec"><div class="jx-sh" data-a="setSec" data-sec="${name}"><span>${esc(title)}</span><span class="jx-chev">${open ? '▾' : '▸'}</span></div>${open ? `<div class="jx-sb jx-setbody">${html}</div>` : ''}</div>`;
}

function settingsHtml(inPanel) {
    const s = S();
    const chk = (path, label, dis = false) => `<label class="checkbox_label"><input type="checkbox" data-s="${path}" data-c="1" ${getByPath(s, path) ? 'checked' : ''} ${dis ? 'disabled' : ''}><span>${esc(label)}</span></label>`;
    const numf = (path, label) => `<label>${esc(label)} <input type="number" min="0" data-s="${path}" data-n="1" class="text_pole" value="${getByPath(s, path)}"></label>`;
    const profOpts = (cur) => `<option value="">${t('s_default')}</option>` + profiles().map((p) => `<option value="${esc(p.id)}" ${p.id === cur ? 'selected' : ''}>${esc(p.name)}</option>`).join('');
    const top = inPanel
        ? `<div class="jx-row"><button class="menu_button" data-a="gear">← ${t('back')}</button></div>`
        : `<div class="menu_button" data-a="openPanel">${t('open')}</div>`;
    const general = `${chk('enabled', t('s_enable'))}${chk('showFab', t('s_fab'))}<div class="menu_button" data-a="resetFab">${t('resetFab')}</div>
      <label>${t('s_display')} <select data-s="displayMode" class="text_pole"><option value="auto" ${s.displayMode === 'auto' ? 'selected' : ''}>${t('dm_auto')}</option><option value="floating" ${s.displayMode === 'floating' ? 'selected' : ''}>${t('dm_floating')}</option><option value="popup" ${s.displayMode === 'popup' ? 'selected' : ''}>${t('dm_popup')}</option></select></label>
      <div class="menu_button" data-a="uiDiag">${t('uiDiag')}</div>
      <textarea class="text_pole jx-uidiag" rows="10" readonly hidden placeholder="${esc(t('uiDiagHint'))}"></textarea>${chk('newChatsOff', t('s_newOff'))}${chk('adult', t('s_adult'))}
      <label>${t('s_lang')} <select data-s="lang" class="text_pole"><option value="auto" ${s.lang === 'auto' ? 'selected' : ''}>Auto</option><option value="en" ${s.lang === 'en' ? 'selected' : ''}>English</option><option value="ru" ${s.lang === 'ru' ? 'selected' : ''}>Русский</option></select></label>
      <label>${t('s_defReduced')} <input type="number" min="0" max="100" data-s="reducedPct" data-n="1" class="text_pole" value="${s.reducedPct}"></label><small>${t('reducedHint')}</small>`;
    const ai = `<label>${t('s_api')} <select data-s="apiProfile" class="text_pole">${profOpts(s.apiProfile)}</select></label>
      <label>${t('s_fallback')} <select data-s="fallbackProfile" class="text_pole">${profOpts(s.fallbackProfile)}</select></label>
      ${chk('inject', t('s_inject'))}
      <label>${t('s_depth')} <input type="number" min="0" max="20" data-s="injectDepth" data-n="1" class="text_pole" value="${s.injectDepth}"></label>`;
    const phone = `${chk('phone.all', t('ps_all'))}${chk('phone.bank', t('ps_bank'), !s.phone.all)}${chk('phone.calendar', t('ps_cal'), !s.phone.all)}${chk('phone.contacts', t('ps_contacts'), !s.phone.all)}${chk('phone.storyDate', t('ps_date'), !s.phone.all)}${chk('bankInChat', t('s_bank'), !s.phone.all || !s.phone.bank)}
      <label>${t('s_phoneKey')} <input type="text" data-s="phoneKey" class="text_pole" value="${esc(s.phoneKey)}"></label>
      <div class="menu_button" data-a="diag">${t('diag')}</div>
      <textarea class="text_pole jx-diag" rows="8" readonly hidden placeholder="${esc(t('diagHint'))}"></textarea>`;
    const track = `${chk('tags', t('s_tags'))}<small>${t('s_tagsHint')}</small>
      ${numf('promoDone', t('s_promoDone'))}${numf('promoRaise', t('s_promoRaise'))}
      ${chk('autoFail', t('s_autoFail'))}${numf('overdueGrace', t('s_grace'))}<small>${t('s_graceHint')}</small>
      <h4>${t('pen')}</h4>${numf('penalty.promo', t('pen_promo'))}${numf('penalty.stress', t('pen_stress'))}${numf('penalty.satisfaction', t('pen_sat'))}${numf('penalty.finePct', t('pen_fine'))}`;
    const optional = Object.keys(DEFAULTS.opt).map((k) => chk('opt.' + k, t('o_' + k))).join('');
    return top
        + setSection('general', t('s_global'), general) + setSection('ai', t('s_ai'), ai) + setSection('phone', t('s_phone'), phone)
        + setSection('track', t('s_track'), track) + setSection('optional', t('s_optional'), optional);
}

function renderSettings() {
    const el = byId('jx_settings_body');
    if (el) el.innerHTML = settingsHtml(false);
}

function rerenderAll() {
    updatePower(); updateFab(); renderPanel(); renderSettings();
    const h = document.querySelector('#jx_panel .jx-title'); if (h) h.textContent = '💼 ' + t('title');
}

/* ------------------------------------------------------------------ */
/* Actions                                                             */
/* ------------------------------------------------------------------ */
const findJob = (id) => { for (const p of Object.values(D().people)) { const j = p.jobs.find((x) => x.id === id); if (j) return { p, j }; } return {}; };

async function afterChange() { save(); applyPrompt(); renderPanel(); }

function readNum(el) { const v = parseFloat(el.value); return Number.isNaN(v) ? 0 : v; }

async function onChange(e) {
    const el = e.target;
    const a = el.dataset.a;
    if (a === 'aware' || a === 'cow') {
        const { j } = findJob(el.dataset.j);
        if (a === 'aware') {
            const set = new Set(j.awareness.who);
            el.checked ? set.add(el.dataset.name) : set.delete(el.dataset.name);
            j.awareness.who = [...set];
        } else {
            const set = new Set(j.coworkers);
            el.checked ? set.add(el.dataset.id) : set.delete(el.dataset.id);
            j.coworkers = [...set];
        }
        return afterChange();
    }
    if (!el.dataset.f && !el.dataset.p && !el.dataset.s && !el.dataset.w) return;
    const val = el.dataset.c ? el.checked : el.dataset.n ? readNum(el) : el.value;
    if (el.dataset.w) {
        const w = D().world;
        if (el.dataset.w === 'preset') {
            const prevPreset = w.preset;
            w.preset = val;
            if (isBlurb(w.description) || w.description === t('wb_' + prevPreset)) w.description = t('wb_' + val);
        } else w[el.dataset.w] = val;
        return afterChange();
    }
    if (el.dataset.s) {
        setByPath(S(), el.dataset.s, val);
        if (el.dataset.s === 'phoneKey') resetPhoneMods();
        if (el.dataset.s === 'phoneKey' || el.dataset.s.startsWith('phone.')) await refreshBank();
        save(); applyPrompt(); rerenderAll();
        return;
    }
    if (el.dataset.p) {
        const p = D().people[ui.selected];
        setByPath(p, el.dataset.p, el.dataset.p === 'emoji' ? firstEmoji(val) : val);
        return afterChange();
    }
    const { p, j } = findJob(el.dataset.j);
    if (!j) return;
    const path = el.dataset.f;
    if (path === 'type' && val === 'adult' && !canAdult(p)) { toastr.warning(t('adultBlocked')); return renderPanel(); }
    const prev = getByPath(j, path);
    setByPath(j, path, val);
    const m = path.match(/^tasks\.(\d+)\.status$/);
    if (m) await taskStatusChanged(p, j, j.tasks[+m[1]], prev);
    if (path === 'state' && prev !== val && isOnLeave(j)) notify(t('evLeave'), `${p.name}: ${t('st_' + val)}`);
    if (path === 'type' && val === 'freelance') j.salary.period = 'project';
    return afterChange();
}

function download(name, text) {
    const a = document.createElement('a');
    a.href = URL.createObjectURL(new Blob([text], { type: 'application/json' }));
    a.download = name; a.click(); URL.revokeObjectURL(a.href);
}

async function linkCalendar(p, j, e) {
    if (!e.start) { toastr.warning(t('calFail')); return; }
    const who = p.kind === 'user' ? 'user' : 'char';
    const base = `🏖 ${p.name}: ${t('l_' + e.type)} — ${j.title || ''}`;
    const ids = [];
    const a = await PhoneBridge.addCalendarEvent({ title: `${base} ▶`, date: e.start, who });
    if (a) ids.push(a);
    if (a && e.end && e.end !== e.start) { const b = await PhoneBridge.addCalendarEvent({ title: `${base} ■`, date: e.end, who }); if (b) ids.push(b); }
    if (ids.length) e.calId = ids.join(','); else toastr.warning(t('calFail'));
}

async function createEntry(box, j, jp, planned) {
    const type = box.querySelector('.jx-l-type').value;
    const entry = {
        id: uid(), type, start: box.querySelector('.jx-l-start').value, end: box.querySelector('.jx-l-end').value,
        days: Number(box.querySelector('.jx-l-days').value) || 0, reason: box.querySelector('.jx-l-reason').value.trim(),
        childId: (type === 'maternity' || type === 'paternity') ? box.querySelector('.jx-l-child').value : '',
        planned, active: !planned, calId: '',
    };
    j.leave.entries.push(entry);
    if (!planned) { j.state = LEAVE_STATE[type]; notify(t('evLeave'), `${jp.name}: ${t('l_' + type)}`); }
    if (box.querySelector('.jx-l-cal')?.checked) await linkCalendar(jp, j, entry);
}

async function onClick(e) {
    const el = e.target.closest('[data-a]');
    if (!el || el.tagName === 'INPUT') return;
    const a = el.dataset.a;
    const s = S();
    const P = D().people;
    const p = P[ui.selected];
    const ctx = getContext();
    const { p: jp, j } = el.dataset.j ? findJob(el.dataset.j) : {};
    switch (a) {
        case 'select': ui.selected = el.dataset.id; ui.ideas = []; return renderPanel();
        case 'resumeToggle': ui.resume = !ui.resume; return renderPanel();
        case 'sec': { const k = `${j.id}:${el.dataset.sec}`; ui.sec[k] = !(ui.sec[k] ?? el.dataset.sec === 'pay'); return renderPanel(); }
        case 'addNpc': {
            const name = (await ctx.Popup?.show?.input?.(t('npcName'), t('npcName'))) ?? prompt(t('npcName'));
            if (!name) return;
            const id = 'npc:' + uid();
            P[id] = mkPerson(id, String(name).trim(), 'npc');
            ui.selected = id; return afterChange();
        }
        case 'delNpc': if (confirm(t('confirm'))) { delete P[ui.selected]; ui.selected = 'user'; return afterChange(); } return;
        case 'toggle': ui.exp[j.id] = !ui.exp[j.id]; return renderPanel();
        case 'manual': {
            if (!canWork(p)) return;
            const nj = newJob({ currency: worldCur() }); p.jobs.push(nj); ui.exp[nj.id] = true; return afterChange();
        }
        case 'delJob': if (confirm(t('confirm'))) { jp.jobs = jp.jobs.filter((x) => x.id !== j.id); return afterChange(); } return;
        case 'promote': {
            const title = el.closest('.jx-row').querySelector('.jx-ptitle').value.trim();
            await promote(jp, j, title, j.promo.raise);
            return afterChange();
        }
        case 'restoreJob': { const h = p.history.splice(+el.dataset.i, 1)[0]; if (h) p.jobs.push(h); return afterChange(); }
        case 'delHist': if (confirm(t('confirm'))) { p.history.splice(+el.dataset.i, 1); return afterChange(); } return;
        case 'logToggle': ui.logOpen = !ui.logOpen; return renderPanel();
        case 'resetFab': { resetFabPos(); s.showFab = true; save(); updateFab(); rerenderAll(); toastr.success(t('fabReset')); setTimeout(rescueFab, 200); return; }
        case 'gear': ui.view = ui.view === 'settings' ? 'main' : 'settings'; rerenderAll(); return;
        case 'setSec': ui.setSec[el.dataset.sec] = !ui.setSec[el.dataset.sec]; try { localStorage.setItem(LS_SETSEC, JSON.stringify(ui.setSec)); } catch { /* ignore */ } rerenderAll(); return;
        case 'openPanel': ui.view = 'main'; await openPanel(); return;
        case 'diag': {
            const ta = el.closest('.jx-setbody, #jx_settings_body, #jx_body')?.querySelector('.jx-diag');
            if (ta) { ta.hidden = false; ta.value = '…'; ta.value = await diagnose(); ta.select(); }
            return;
        }
        case 'worldToggle': ui.worldOpen = !ui.worldOpen; return renderPanel();
        case 'scanWorld': {
            ui.busy = 'world'; renderPanel();
            try { await scanWorld(el.dataset.k); toastr.success(t('worldScanned')); }
            catch (err) {
                if (err.message === 'nolore') toastr.info(t('noLore'));
                else if (err.message === 'nocard') toastr.info(t('noCardText'));
                else { console.error(err); toastr.error(t('errApi')); }
            }
            ui.busy = ''; return afterChange();
        }
        case 'saveWorld': {
            const box = el.closest('.jx-world');
            const name = box.querySelector('.jx-wname').value.trim();
            if (!name) return;
            const w = D().world;
            const ex = s.worlds.find((x) => x.name.toLowerCase() === name.toLowerCase());
            const rec = { id: ex?.id || uid(), name, preset: w.preset, description: w.description, currency: w.currency };
            if (ex) Object.assign(ex, rec); else s.worlds.push(rec);
            if (s.worlds.length > 50) s.worlds.shift();
            toastr.success(t('worldSaved')); return afterChange();
        }
        case 'loadWorld': {
            const id = el.closest('.jx-world').querySelector('.jx-wsel').value;
            const rec = s.worlds.find((x) => x.id === id);
            if (!rec) return;
            D().world = { preset: rec.preset, description: rec.description, currency: rec.currency };
            return afterChange();
        }
        case 'delWorld': {
            const id = el.closest('.jx-world').querySelector('.jx-wsel').value;
            if (id && confirm(t('confirm'))) { s.worlds = s.worlds.filter((x) => x.id !== id); return afterChange(); }
            return;
        }
        case 'archiveJob': jp.history.push(clone(j)); jp.jobs = jp.jobs.filter((x) => x.id !== j.id); return afterChange();
        case 'search': case 'scan': {
            const kind = el.dataset.k;
            if (!canWork(p)) return;
            if (a === 'search' && ((kind === 'teen' && !canTeen(p)) || (kind === 'adult' && !canAdult(p)))) return;
            ui.busy = a; ui.ideas = []; ui.ideaFor = p.id; renderPanel();
            try {
                ui.ideas = a === 'search' ? await searchIdeas(kind) : await scanJobs();
                if (!ui.ideas.length) toastr.info(t('noIdeas'));
            } catch (err) { console.error(err); toastr.error(t('errApi')); }
            ui.busy = ''; return renderPanel();
        }
        case 'addIdea': {
            const x = ui.ideas[+el.dataset.i];
            let owner = p;
            if (x.owner) owner = visiblePeople().find((q) => q.name.toLowerCase() === String(x.owner).toLowerCase()) || p;
            if (!canWork(owner)) return;
            let type = JOB_TYPES.includes(x.type) ? x.type : 'standard';
            if (type === 'adult' && !canAdult(owner)) type = 'standard';
            if (type === 'teen' && !canTeen(owner)) type = 'parttime';
            const nj = newJob({
                title: x.title, employer: x.employer, category: x.category, description: x.description, schedule: x.schedule, type,
                mode: MODES.includes(x.mode) ? x.mode : 'onsite', period: PERIODS.includes(x.period) ? x.period : 'month',
                amount: x.amount, vacationDays: x.vacation_days, insurance: x.insurance, currency: worldCur(),
            });
            if (type === 'freelance') nj.salary.period = 'project';
            owner.jobs.push(nj); ui.exp[nj.id] = true; ui.ideas.splice(+el.dataset.i, 1); return afterChange();
        }
        case 'addTask':
            if (isOnLeave(j)) return toastr.warning(t('noLeaveTasks'));
            j.tasks.push({ id: uid(), desc: '', due: '', pay: 0, status: 'pending', paid: false, show: 0, penalized: false }); return afterChange();
        case 'delTask': j.tasks.splice(+el.dataset.i, 1); return afterChange();
        case 'payPeriod': {
            await credit(jp, j, (Number(j.salary.amount) || 0) * leaveFactor(j), 'Salary');
            return renderPanel();
        }
        case 'planLeave': await createEntry(el.closest('.jx-lf'), j, jp, true); return afterChange();
        case 'startLeave': await createEntry(el.closest('.jx-lf'), j, jp, false); return afterChange();
        case 'startEntry': {
            const en = j.leave.entries[+el.dataset.i];
            en.planned = false; en.active = true; j.state = LEAVE_STATE[en.type];
            notify(t('evLeave'), `${jp.name}: ${t('l_' + en.type)}`);
            return afterChange();
        }
        case 'endLeave': {
            const en = j.leave.entries[+el.dataset.i];
            en.active = false;
            if (!en.end) en.end = today();
            if (en.start && en.end < en.start) en.end = en.start;
            if (isOnLeave(j) && !j.leave.entries.some((x) => x.active)) j.state = 'working';
            notify(t('evLeaveEnd'), `${jp.name}: ${t('l_' + en.type)}`);
            return afterChange();
        }
        case 'calEntry': { const en = j.leave.entries[+el.dataset.i]; await linkCalendar(jp, j, en); return afterChange(); }
        case 'delLeave': {
            const en = j.leave.entries[+el.dataset.i];
            if (en.calId) for (const cid of en.calId.split(',')) await PhoneBridge.removeCalendarEvent(cid);
            j.leave.entries.splice(+el.dataset.i, 1);
            return afterChange();
        }
        case 'addCoworker': {
            const inp = el.closest('.jx-row').querySelector('.jx-cw');
            const name = inp.value.trim();
            if (!name) return;
            const id = 'npc:' + uid();
            P[id] = mkPerson(id, name, 'npc');
            P[id].jobs.push(newJob({ employer: j.employer, category: j.category, currency: j.salary.currency }));
            j.coworkers.push(id);
            return afterChange();
        }
        case 'summarize': {
            ui.busy = 'sum'; renderPanel();
            try {
                const txt = await llm(`Job: ${j.title} at ${j.employer}. Chat:\n${chatText(40)}\n\nSummarize in 2-3 short sentences only the events related to this job, in ${outLang()}.`, 'You write concise factual summaries.');
                j.summary = txt.trim();
            } catch { toastr.error(t('errApi')); }
            ui.busy = ''; return afterChange();
        }
        case 'export': download(`jobs_${p.name}.json`, JSON.stringify({ jobs: p.jobs, history: p.history, resume: p.resume }, null, 2)); return;
        case 'import': byId('jx_file')?.click(); return;
        case 'phone': s.phone.all = !s.phone.all; save(); await refreshBank(); applyPrompt(); rerenderAll(); return;
        case 'power':
            if (!s.enabled) s.enabled = true;
            else if (hasChat()) { const d = D(); d.off = !d.off; }
            save(); await refreshBank(); applyPrompt(); rerenderAll(); return;
        case 'close':
            if (ui.popup && ui.popupRef) { try { await ui.popupRef.complete(getContext().POPUP_RESULT?.AFFIRMATIVE ?? 1); } catch (e) { console.warn(e); } return; }
            ui.open = false; showPanel(false); return;
        case 'uiDiag': {
            const ta = el.closest('.jx-setbody, #jx_settings_body, #jx_body')?.querySelector('.jx-uidiag');
            if (ta) { ta.hidden = false; ta.value = uiDiagnostics(); ta.select(); }
            return;
        }
        default:
    }
}

async function onFile(e) {
    const f = e.target.files?.[0];
    if (!f) return;
    try {
        const data = JSON.parse(await f.text());
        const p = D().people[ui.selected];
        for (const j of data.jobs || []) { const nj = { ...newJob(), ...j, id: uid() }; ensure(nj, newJob()); p.jobs.push(nj); }
        if (S().opt.history && Array.isArray(data.history)) p.history.push(...data.history);
        if (data.resume && !p.resume.skills && !p.resume.seeking) p.resume = { skills: data.resume.skills || '', seeking: data.resume.seeking || '' };
        afterChange();
    } catch { toastr.error('Invalid file'); }
    e.target.value = '';
}

/* ------------------------------------------------------------------ */
/* Floating button (draggable) + init                                  */
/* ------------------------------------------------------------------ */
async function openPanel() {
    try { await openPanelInner(); } catch (e) {
        console.error('[Jobs] open failed', e);
        try { toastr.error(`Jobs & Career: ${e?.message || e}`); } catch { /* ignore */ }
    }
}

async function openPanelInner() {
    if (ui.popup) return;
    if (useWindow() && await openPopup()) return;
    ui.open = true;
    showPanel(true);
    if (isOn()) {
        await refreshBank();
        if (hasChat()) { ensurePeople(); await checkOverdue(); }
        ui.contacts = bank.contacts ? await PhoneBridge.getContacts() : [];
    }
    renderPanel();
    setTimeout(rescuePanel, 120);
}
function togglePanel() { ui.open ? onClick({ target: document.querySelector('#jx_panel [data-a="close"]') }) : openPanel(); }

// Positions use top/left in pixels only. Some pages put a transform on <html>, which makes
// position:fixed relative to a zero-height box and sends bottom/right-based elements off-screen.
const FAB_SIZE = 48;
function placeFab(fab, x, y) {
    const nx = Math.min(Math.max(0, x), Math.max(0, window.innerWidth - FAB_SIZE));
    const ny = Math.min(Math.max(0, y), Math.max(0, window.innerHeight - FAB_SIZE));
    fab.style.left = Math.round(nx) + 'px'; fab.style.top = Math.round(ny) + 'px';
    fab.style.right = 'auto'; fab.style.bottom = 'auto';
}
function fabDefaults(fab) {
    const phone = window.innerWidth <= 800;
    placeFab(fab, window.innerWidth - FAB_SIZE - (phone ? 10 : 14), window.innerHeight - FAB_SIZE - (phone ? 120 : 90));
    fab.style.zIndex = '5000';
}
function layoutFab(fab) {
    let pos = null;
    try { pos = JSON.parse(localStorage.getItem(LS_FAB) || 'null'); } catch { /* ignore */ }
    if (pos && Number.isFinite(pos.x) && Number.isFinite(pos.y)) placeFab(fab, pos.x, pos.y);
    else fabDefaults(fab);
}
function layoutPanel(panel) {
    const vw = window.innerWidth, vh = window.innerHeight, st = panel.style;
    if (vw <= 800) {
        const top = Math.round(vh * 0.1);
        st.left = '0px'; st.top = top + 'px'; st.width = vw + 'px'; st.height = (vh - top) + 'px'; st.borderRadius = '18px 18px 0 0';
    } else {
        const w = Math.min(460, vw - 32);
        st.left = (vw - w - 16) + 'px'; st.top = '60px'; st.width = w + 'px'; st.height = Math.round(vh * 0.76) + 'px'; st.borderRadius = '16px';
    }
    st.right = 'auto'; st.bottom = 'auto'; st.maxWidth = 'none'; st.maxHeight = 'none';
}
function clearPanelLayout(panel) {
    for (const k of ['left', 'top', 'width', 'height', 'maxWidth', 'maxHeight', 'borderRadius', 'right', 'bottom']) panel.style[k] = '';
}

function initFab(fab) {
    layoutFab(fab);
    let drag = null;
    let wasDragged = false;
    fab.addEventListener('pointerdown', (e) => {
        drag = { sx: e.clientX, sy: e.clientY, ox: parseFloat(fab.style.left) || 0, oy: parseFloat(fab.style.top) || 0, moved: false };
        try { fab.setPointerCapture(e.pointerId); } catch { /* ignore */ }
    });
    fab.addEventListener('pointermove', (e) => {
        if (!drag) return;
        const dx = e.clientX - drag.sx, dy = e.clientY - drag.sy;
        if (Math.abs(dx) + Math.abs(dy) > 6) drag.moved = true;
        if (drag.moved) placeFab(fab, drag.ox + dx, drag.oy + dy);
    });
    fab.addEventListener('pointerup', () => {
        if (!drag) return;
        const d = drag; drag = null;
        if (d.moved) { wasDragged = true; localStorage.setItem(LS_FAB, JSON.stringify({ x: parseFloat(fab.style.left), y: parseFloat(fab.style.top) })); }
    });
    fab.addEventListener('click', () => { if (wasDragged) { wasDragged = false; return; } togglePanel(); });
    fab.addEventListener('pointercancel', () => { drag = null; });
    window.addEventListener('resize', () => {
        layoutFab(fab);
        const panel = byId('jx_panel');
        if (panel && ui.open && !ui.popup) layoutPanel(panel);
    });
}

/* ------------------------------------------------------------------ */
/* Display modes (floating panel / SillyTavern popup) + diagnostics    */
/* ------------------------------------------------------------------ */
function useWindow() {
    const m = S().displayMode;
    if (m === 'popup') return true;
    if (m === 'floating') return false;
    return window.innerWidth <= 800; // auto: phones get the popup window
}

function showPanel(on) {
    const panel = byId('jx_panel');
    if (!panel) return;
    panel.classList.toggle('jx-open', on);
    if (on && !panel.classList.contains('jx-embedded')) layoutPanel(panel);
    panel.style.setProperty('display', on ? 'flex' : 'none', 'important');
}

// Hosts the panel inside one of SillyTavern's own popups, which are always on top and work on phones
async function openPopup() {
    const ctx = getContext();
    const Popup = ctx.Popup, TYPE = ctx.POPUP_TYPE;
    const panel = byId('jx_panel');
    if (typeof Popup !== 'function' || !TYPE || !panel) return false;
    const holder = document.createElement('div');
    holder.className = 'jx-popup-holder';
    panel.classList.add('jx-embedded');
    clearPanelLayout(panel);
    holder.appendChild(panel);
    showPanel(true);
    ui.popup = true; ui.open = true;
    let pop;
    const restore = () => {
        panel.classList.remove('jx-embedded');
        document.body.appendChild(panel);
        showPanel(false);
        ui.popup = false; ui.open = false; ui.popupRef = null;
    };
    try {
        pop = new Popup(holder, TYPE.TEXT, '', { wide: true, large: true, okButton: t('close'), cancelButton: false, allowVerticalScrolling: false, onOpen: () => { try { renderPanel(); } catch (e) { console.warn(e); } } });
    } catch (e) { console.warn('[Jobs] popup unavailable, using the floating panel', e); restore(); return false; }
    ui.popupRef = pop;
    if (isOn()) {
        await refreshBank();
        ui.contacts = bank.contacts ? await PhoneBridge.getContacts() : [];
        if (hasChat()) { ensurePeople(); await checkOverdue(); }
    }
    renderPanel();
    try { await pop.show(); } finally { restore(); }
    return true;
}

function describeEl(el) {
    if (!el) return 'none';
    return `${el.tagName.toLowerCase()}${el.id ? '#' + el.id : ''}${el.className && typeof el.className === 'string' ? '.' + el.className.trim().split(/\s+/).slice(0, 2).join('.') : ''}`;
}

function uiDiagnostics() {
    const ctx = getContext();
    const L = [`Jobs & Career UI diagnostics v${VERSION}`];
    const rect = (el) => { if (!el) return 'MISSING'; const r = el.getBoundingClientRect(); return `x${Math.round(r.left)} y${Math.round(r.top)} ${Math.round(r.width)}x${Math.round(r.height)}`; };
    const panel = byId('jx_panel'), fab = byId('jx_fab');
    L.push(`viewport ${window.innerWidth}x${window.innerHeight}, dpr ${window.devicePixelRatio}, ${navigator.userAgent}`);
    L.push(`display setting: ${S().displayMode}; popup mode used here: ${useWindow()}; Popup API: ${typeof ctx.Popup}/${!!ctx.POPUP_TYPE}; /jobs registered: ${ui.slashOk}`);
    if (fab) {
        const c = getComputedStyle(fab), r = fab.getBoundingClientRect();
        const top = document.elementFromPoint(Math.min(Math.max(r.left + r.width / 2, 1), window.innerWidth - 1), Math.min(Math.max(r.top + r.height / 2, 1), window.innerHeight - 1));
        L.push(`fab: ${rect(fab)} display ${c.display} vis ${c.visibility} opacity ${c.opacity} z ${c.zIndex} position ${c.position}; topmost at its centre: ${describeEl(top)}; parent ${describeEl(fab.parentElement)}`);
    } else L.push('fab: MISSING from the page');
    if (panel) {
        const c = getComputedStyle(panel);
        L.push(`panel: ${rect(panel)} display ${c.display} opacity ${c.opacity} z ${c.zIndex} position ${c.position}; open ${ui.open}; popup ${!!ui.popup}; parent ${describeEl(panel.parentElement)}`);
    } else L.push('panel: MISSING from the page');
    if (fab) L.push(`fab inline position: left ${fab.style.left} top ${fab.style.top}; saved ${localStorage.getItem(LS_FAB) || 'none'}`);
    L.push(`stylesheet applied: ${fab ? getComputedStyle(fab).borderTopLeftRadius : '?'} (expect 24px or 50%)`);
    for (const el of [document.documentElement, document.body]) {
        const c = getComputedStyle(el);
        L.push(`${(el.tagName || "?").toLowerCase()}: position ${c.position} overflow ${c.overflow} transform ${c.transform} filter ${c.filter} contain ${c.contain} zoom ${c.zoom}`);
    }
    return L.join('\n');
}

/* ------------------------------------------------------------------ */
/* Visibility rescue (phones): off-screen / covered / reset            */
/* ------------------------------------------------------------------ */
function rescueProblem(el) {
    try {
        const r = el.getBoundingClientRect();
        const vw = window.innerWidth, vh = window.innerHeight;
        if (r.width < 20 || r.height < 20) return 'size';
        if (r.bottom < 24 || r.top > vh - 24 || r.right < 24 || r.left > vw - 24) return 'off';
        const x = Math.min(Math.max(r.left + r.width / 2, 1), vw - 1);
        const y = Math.min(Math.max(r.top + r.height / 2, 1), vh - 1);
        const top = document.elementFromPoint(x, y);
        if (top && !el.contains(top)) return 'covered';
    } catch { /* ignore */ }
    return '';
}

function resetFabPos() {
    try { localStorage.removeItem(LS_FAB); } catch { /* ignore */ }
    const fab = byId('jx_fab');
    if (fab) fabDefaults(fab);
}

function rescueFab() {
    const fab = byId('jx_fab');
    if (!fab || fab.style.display === 'none') return;
    const p = rescueProblem(fab);
    if (p === 'off') { console.warn('[Jobs] floating button was off-screen, resetting'); resetFabPos(); }
    else if (p === 'covered') { console.warn('[Jobs] floating button was covered, raising'); fab.style.zIndex = '10050'; }
}

function rescuePanel() {
    const panel = byId('jx_panel');
    if (!panel || !ui.open || ui.popup) return;
    const p = rescueProblem(panel);
    if (p === 'off' || p === 'size') {
        console.warn('[Jobs] panel was off-screen, re-anchoring');
        Object.assign(panel.style, { left: '0', right: '0', top: 'auto', bottom: '0', width: '100%', maxWidth: '100%', height: '80vh' });
    } else if (p === 'covered') { console.warn('[Jobs] panel was covered, raising'); panel.style.zIndex = '10050'; }
}

function closeWandMenu() {
    try { window.$?.('#extensionsMenu').hide(); } catch { /* ignore */ }
    try { document.body.click(); } catch { /* ignore */ }
}

// /jobs opens the panel (handy on phones)
async function registerSlash() {
    const run = async () => { await openPanel(); return ''; };
    try {
        const [{ SlashCommandParser }, { SlashCommand }] = await Promise.all([import('../../../slash-commands/SlashCommandParser.js'), import('../../../slash-commands/SlashCommand.js')]);
        SlashCommandParser.addCommandObject(SlashCommand.fromProps({ name: 'jobs', callback: run, helpString: 'Open the Jobs & Career panel.' }));
        ui.slashOk = 'yes';
    } catch {
        try { getContext().registerSlashCommand?.('jobs', run, [], 'Open the Jobs & Career panel.', true, true); ui.slashOk = 'legacy'; } catch { ui.slashOk = 'failed'; }
    }
}

function buildUi() {
    const panel = document.createElement('div');
    panel.id = 'jx_panel';
    ui.panelEl = panel;
    panel.innerHTML = `<div class="jx-head"><span class="jx-title">💼 ${t('title')}</span>
      <input type="range" id="jx_opacity" min="0.3" max="1" step="0.05" value="${opacity()}">
      <button class="menu_button" id="jx_gear" data-a="gear"><i class="fa-solid fa-gear"></i></button>
      <button class="menu_button" id="jx_phone" data-a="phone"><i class="fa-solid fa-mobile-screen-button"></i></button>
      <button class="menu_button" id="jx_power" data-a="power"><i class="fa-solid fa-power-off"></i></button>
      <button class="menu_button" data-a="close"><i class="fa-solid fa-xmark"></i></button></div><div id="jx_body"></div>`;
    panel.style.setProperty('position', 'fixed', 'important');
    panel.style.setProperty('z-index', '5001', 'important');
    panel.style.setProperty('display', 'none', 'important');
    document.body.appendChild(panel);
    panel.style.opacity = opacity();
    panel.querySelector('#jx_opacity').addEventListener('input', (e) => { panel.style.opacity = e.target.value; localStorage.setItem(LS_OPACITY, e.target.value); });
    panel.addEventListener('click', onClick);
    panel.addEventListener('change', onChange);
    panel.addEventListener('change', (e) => { if (e.target.id === 'jx_file') onFile(e); });

    const fab = document.createElement('div');
    fab.id = 'jx_fab'; fab.textContent = '💼'; fab.title = t('title');
    fab.style.cssText = 'position:fixed;width:48px;height:48px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:22px;cursor:pointer;background:var(--SmartThemeBlurTintColor,#222);border:2px solid var(--SmartThemeQuoteColor,#7aa2ff);box-shadow:0 4px 14px rgba(0,0,0,.45);user-select:none;touch-action:none;';
    fabDefaults(fab);
    document.body.appendChild(fab);
    initFab(fab);

    const menu = document.getElementById('extensionsMenu');
    if (menu) {
        const item = document.createElement('div');
        item.className = 'list-group-item flex-container flexGap5';
        item.innerHTML = '<div class="fa-solid fa-briefcase extensionsMenuExtensionButton"></div>Jobs';
        item.addEventListener('click', () => { openPanel(); closeWandMenu(); });
        menu.appendChild(item);
    }

    const host = document.getElementById('extensions_settings2') || document.getElementById('extensions_settings');
    if (host) {
        const d = document.createElement('div');
        d.className = 'inline-drawer';
        d.innerHTML = '<div class="inline-drawer-toggle inline-drawer-header"><b>Jobs &amp; Career</b><div class="inline-drawer-icon fa-solid fa-circle-chevron-down down"></div></div><div class="inline-drawer-content" id="jx_settings_body"></div>';
        host.appendChild(d);
        d.addEventListener('change', onChange);
        d.addEventListener('click', onClick);
    }
}

jQuery(async () => {
    try { await initJobs(); } catch (e) {
        console.error('[Jobs] init failed', e);
        try { toastr.error(`Jobs & Career failed to start: ${e?.message || e}`); } catch { /* ignore */ }
    }
});

async function initJobs() {
    S();
    buildUi();
    if (hasChat()) ensurePeople();
    await refreshBank();
    rerenderAll();
    applyPrompt();
    const { eventSource, event_types } = ST;
    eventSource.on(event_types.CHAT_CHANGED, async () => { ui.selected = 'user'; ui.ideas = []; ui.exp = {}; if (hasChat()) ensurePeople(); await refreshBank(); await checkOverdue(); applyPrompt(); rerenderAll(); setTimeout(rescueFab, 1000); });
    const genEvt = event_types.GENERATION_AFTER_COMMANDS || event_types.GENERATION_STARTED;
    eventSource.on(genEvt, async () => { await refreshBank(); await checkOverdue(); applyPrompt(); });
    eventSource.on(event_types.MESSAGE_RECEIVED, async (id) => {
        try {
            const idx = typeof id === 'number' ? id : (getContext().chat?.length || 1) - 1;
            await processMessage(idx);
            await refreshBank(); await checkOverdue(); applyPrompt();
        } catch (e) { console.warn('[Jobs] message handling failed', e); }
        if (ui.open) renderPanel();
    });
    registerSlash();
    setTimeout(rescueFab, 1500);
    window.addEventListener('orientationchange', () => setTimeout(() => { rescueFab(); rescuePanel(); }, 400));
    console.log('[Jobs & Career] loaded');
}
