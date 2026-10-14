// Jobs & Career extension for SillyTavern
// Jobs, leave tracker, salary, tasks, awareness, NPCs, Phone-ST integration (EN/RU)

import * as ST from '../../../../script.js';
import { extension_settings, getContext } from '../../../extensions.js';

const MODULE = 'jobs_ext';
const LS_OPACITY = 'jobsext_opacity';

/* ------------------------------------------------------------------ */
/* i18n                                                                */
/* ------------------------------------------------------------------ */
const I18N = {
    en: {
        powerTip: 'Turn extension on/off', disabledMsg: 'Extension is turned off.', noChat: 'Open a chat first: jobs are saved per chat.', title: 'Jobs & Career', people: 'People', addNpc: '+ NPC', npcName: 'NPC name', age: 'Age', ageUnknown: 'unknown',
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
        s_enable: 'Enable extension', s_lang: 'Language', s_adult: 'Adult content (adult jobs)', s_api: 'API profile', s_fallback: 'Fallback profile',
        s_default: '(current API)', s_inject: 'Inject job info into chat', s_depth: 'Injection depth', s_bank: 'Include bank info in chat',
        s_phoneKey: 'Phone-ST settings key (optional)', s_optional: 'Optional features', open: 'Open Jobs panel',
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
        langName: 'English', evPaid: 'Payment received', evLeave: 'Leave started', evLeaveEnd: 'Leave ended', evTask: 'Task update',
    },
    ru: {
        powerTip: 'Включить/выключить расширение', disabledMsg: 'Расширение выключено.', noChat: 'Сначала откройте чат: работы сохраняются отдельно для каждого чата.', title: 'Работа и карьера', people: 'Персонажи', addNpc: '+ NPC', npcName: 'Имя NPC', age: 'Возраст', ageUnknown: 'неизвестен',
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
        s_enable: 'Включить расширение', s_lang: 'Язык', s_adult: 'Контент 18+ (работа 18+)', s_api: 'Профиль API', s_fallback: 'Запасной профиль',
        s_default: '(текущий API)', s_inject: 'Добавлять инфо о работе в чат', s_depth: 'Глубина вставки', s_bank: 'Включать данные банка в чат',
        s_phoneKey: 'Ключ настроек Phone-ST (необязательно)', s_optional: 'Дополнительные функции', open: 'Открыть панель работ',
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
    if (!md[MODULE]) md[MODULE] = { people: {} };
    if (!md[MODULE].people) md[MODULE].people = {};
    return md[MODULE];
}
const hasChat = () => { try { return !!getContext().getCurrentChatId?.(); } catch { return false; } };
function save() {
    ST.saveSettingsDebounced();
    try { const c = getContext(); (c.saveMetadataDebounced || c.saveMetadata)?.call(c); } catch (e) { console.warn('[Jobs] chat save failed', e); }
}

const uid = () => Math.random().toString(36).slice(2, 10);
const esc = (s) => String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const today = () => new Date().toISOString().slice(0, 10);

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

const fmt = (n, cur) => `${cur || ''}${Number(n || 0).toLocaleString(undefined, { maximumFractionDigits: 2 })}`;

/* ------------------------------------------------------------------ */
/* Data model                                                          */
/* ------------------------------------------------------------------ */
function newLeave() {
    return {
        enabled: true,
        balances: {
            vacation: { allowance: 14, adj: 0 }, sick: { allowance: 10, adj: 0 }, maternity: { allowance: 90, adj: 0 },
            paternity: { allowance: 14, adj: 0 }, unpaid: { allowance: 0, adj: 0 },
        },
        reduced: { vacation: false, sick: false, maternity: false, paternity: false, unpaid: false },
        entries: [],
    };
}

function newJob(p = {}) {
    return {
        id: uid(), title: p.title || '', employer: p.employer || '', category: p.category || '', type: p.type || 'standard',
        mode: p.mode || 'onsite', schedule: p.schedule || '', state: p.state || 'working',
        salary: { amount: Number(p.amount) || 0, currency: p.currency || '$', period: p.period || 'month', rateType: p.rateType || 'hour', totalEarned: 0 },
        leave: newLeave(), tasks: [], awareness: { mode: 'everyone', who: [] },
        commute: '', stress: 50, satisfaction: 50, coworkers: [], summary: '', description: p.description || '',
    };
}

function ensurePeople() {
    const s = S();
    const ctx = getContext();
    if (!D().people.user) D().people.user = { id: 'user', name: ctx.name1 || 'User', kind: 'user', age: '', jobs: [], history: [], phoneContact: '' };
    D().people.user.name = ctx.name1 || D().people.user.name;
    const ch = ctx.characters?.[ctx.characterId];
    if (ch) {
        const id = 'char:' + ch.avatar;
        if (!D().people[id]) D().people[id] = { id, name: ch.name, kind: 'bot', age: '', jobs: [], history: [], phoneContact: '' };
        D().people[id].name = ch.name;
        ui.botId = id;
    } else ui.botId = null;
    if (!D().people[ui.selected]) ui.selected = 'user';
    // upgrade older records
    for (const p of Object.values(D().people)) for (const j of p.jobs) { if (!j.leave) j.leave = newLeave(); if (!j.awareness) j.awareness = { mode: 'everyone', who: [] }; }
}

function visiblePeople() {
    const s = S();
    return Object.values(D().people).filter((p) => p.kind === 'user' || p.kind === 'npc' || p.id === ui.botId);
}
const jobVisible = (j) => S().adult || j.type !== 'adult';
const isOnLeave = (j) => ['onleave', 'vacation', 'sick', 'maternity', 'paternity'].includes(j.state);

function ageClass(p) {
    const n = parseInt(p.age, 10);
    if (Number.isNaN(n)) return 'unknown';
    return n < 18 ? 'minor' : 'adult';
}
function canTeen(p) { const n = parseInt(p.age, 10); return Number.isNaN(n) || (n >= 13 && n <= 17); }
function canAdult(p) { return S().adult && ageClass(p) !== 'minor'; }

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
function usedDays(j, type) {
    const b = j.leave.balances[type];
    return (Number(b.adj) || 0) + j.leave.entries.filter((e) => e.type === type).reduce((a, e) => a + entryDays(e), 0);
}
const leftDays = (j, type) => (Number(j.leave.balances[type].allowance) || 0) - usedDays(j, type);

function leaveFactor(j) {
    if (!isOnLeave(j)) return 1;
    const type = STATE_LEAVE[j.state];
    if (type === 'unpaid') return 0;
    return j.leave.reduced[type] ? (Number(S().reducedPct) || 0) / 100 : 1;
}

/* ------------------------------------------------------------------ */
/* Phone-ST bridge (the only place that touches Phone-ST)              */
/* ------------------------------------------------------------------ */
const bank = { installed: false, balance: null, currency: null };

function findKey(obj, re, depth = 3) {
    if (!isObj(obj) || depth < 0) return null;
    for (const k of Object.keys(obj)) if (re.test(k) && typeof obj[k] === 'number') return { owner: obj, key: k };
    for (const k of Object.keys(obj)) { const r = findKey(obj[k], re, depth - 1); if (r) return r; }
    return null;
}
const SYMBOLS = { RUB: '₽', USD: '$', EUR: '€', GBP: '£', JPY: '¥', '₽': '₽', $: '$', '€': '€', '£': '£', '¥': '¥' };

const PhoneBridge = {
    api() {
        for (const k of ['PhoneST', 'phoneST', 'Phone_ST', 'STPhone', 'stPhone', 'phone_st']) if (window[k] && typeof window[k] === 'object') return window[k];
        return null;
    },
    store() {
        const es = extension_settings;
        const key = S().phoneKey;
        if (key && isObj(es[key])) return es[key];
        for (const k of Object.keys(es)) if (k !== MODULE && /phone/i.test(k) && isObj(es[k])) return es[k];
        return null;
    },
    installed() { return !!(this.api() || this.store()); },
    async call(names, ...args) {
        const api = this.api();
        if (!api) return undefined;
        for (const scope of [api, api.bank].filter(Boolean)) {
            for (const n of names) if (typeof scope[n] === 'function') { try { return await scope[n](...args); } catch (e) { console.warn('[Jobs] phone call failed', n, e); } }
        }
        return undefined;
    },
    async getBalance() {
        const v = await this.call(['getBalance', 'getBankBalance', 'balance']);
        if (typeof v === 'number') return v;
        const st = this.store();
        const hit = st && findKey(st, /^(bank)?(balance|money|funds)$/i);
        return hit ? hit.owner[hit.key] : null;
    },
    async getCurrency() {
        let v = await this.call(['getCurrency', 'currency']);
        if (!v) { const st = this.store(); v = st?.bank?.currency ?? st?.currency ?? st?.settings?.currency; }
        return v ? (SYMBOLS[String(v).toUpperCase()] || SYMBOLS[v] || String(v)) : null;
    },
    async addMoney(amount, reason) {
        window.dispatchEvent(new CustomEvent('jobsext:bank-credit', { detail: { amount, reason } }));
        const r = await this.call(['addMoney', 'addBalance', 'deposit', 'creditBank', 'bankDeposit', 'changeBalance'], amount, reason);
        if (r !== undefined) return r !== false;
        const st = this.store();
        const hit = st && findKey(st, /^(bank)?(balance|money|funds)$/i);
        if (hit) { hit.owner[hit.key] = Math.round((hit.owner[hit.key] + amount) * 100) / 100; save(); return true; }
        return false;
    },
    async getContacts() {
        let v = await this.call(['getContacts', 'contacts']);
        if (!v) v = this.store()?.contacts;
        if (Array.isArray(v)) return v.map((c) => (typeof c === 'string' ? c : c?.name)).filter(Boolean);
        if (isObj(v)) return Object.values(v).map((c) => c?.name).filter(Boolean);
        return [];
    },
    async getMessages(limit = 30) {
        let v = await this.call(['getMessages', 'messages']);
        if (!v) v = this.store()?.messages;
        const out = [];
        const walk = (x) => { if (Array.isArray(x)) x.forEach(walk); else if (isObj(x)) { if (typeof x.text === 'string') out.push(x.text); else if (typeof x.mes === 'string') out.push(x.mes); else Object.values(x).forEach(walk); } };
        walk(v);
        return out.slice(-limit);
    },
    async getStatus() {
        const v = await this.call(['getStatus', 'status']);
        if (typeof v === 'string') return v;
        const s = this.store()?.status;
        return typeof s === 'string' ? s : null;
    },
    async notify(title, text) {
        const r = await this.call(['notify', 'addNotification', 'pushNotification', 'sendNotification'], title, text);
        return r !== undefined;
    },
};

async function refreshBank() {
    if (!S().enabled) return;
    bank.installed = PhoneBridge.installed();
    if (!bank.installed) { bank.balance = null; bank.currency = null; return; }
    try { bank.balance = await PhoneBridge.getBalance(); bank.currency = await PhoneBridge.getCurrency(); } catch (e) { console.warn('[Jobs] bank refresh', e); }
}
const effCur = (p, j) => (p.kind === 'user' && bank.currency ? bank.currency : j.salary.currency);

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
        if (!ok) toastr.warning(bank.installed ? t('depositFail') : t('phoneMissing'));
        await refreshBank();
    }
    notify(t('evPaid'), `${p.name}: ${fmt(amount, effCur(p, j))} (${j.title})`);
    save(); applyPrompt();
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
            const r = await svc.sendRequest(id, [{ role: 'system', content: sys }, { role: 'user', content: prompt }], 1200);
            const txt = typeof r === 'string' ? r : (r?.content ?? '');
            if (txt) return txt;
        } catch (e) { console.warn('[Jobs] profile failed', id, e); }
    }
    try { if (typeof ctx.generateRaw === 'function') { const r = await ctx.generateRaw({ prompt, systemPrompt: sys, responseLength: 1200 }); if (r) return r; } } catch (e) { console.warn(e); }
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
    adult: 'mature adult-industry occupations for adults (nightlife, entertainment, modeling, companionship services, etc.); list job metadata only, keep descriptions non-graphic',
};

async function searchIdeas(kind) {
    const p = D().people[ui.selected];
    const sys = 'You generate job ideas for a roleplay character. Reply with ONLY a JSON array, no commentary.';
    const prompt = `Character: ${p.name}. Age: ${p.age || 'unknown'}.\nContext:\n${cardText()}\n\nSuggest 4 ${KIND_HINT[kind]} fitting this character.\nJSON array of objects with keys: title, employer, category, mode (onsite|remote|hybrid|anywhere), schedule, amount (number), period (hour|day|week|month|year|project), description.\nWrite text values in ${outLang()}.`;
    const arr = parseJsonArray(await llm(prompt, sys));
    return arr.map((x) => ({ ...x, type: kind === 'parttime' ? 'parttime' : kind }));
}

async function scanJobs() {
    const p = D().people[ui.selected];
    const names = visiblePeople().map((x) => x.name).join(', ');
    const phone = bank.installed ? (await PhoneBridge.getMessages(15)).join('\n') : '';
    const sys = 'You extract jobs mentioned in roleplay text. Reply with ONLY a JSON array, no commentary.';
    const prompt = `Known people: ${names}.\nCharacter card:\n${cardText()}\n\nRecent chat:\n${chatText()}\n\n${phone ? 'Phone messages:\n' + phone + '\n\n' : ''}Find jobs/occupations that any known person currently has. JSON array of objects with keys: owner (a known person's name, default "${p.name}"), title, employer, category, mode, schedule, amount (number or 0), period, type (standard|parttime|teen|freelance${S().adult ? '|adult' : ''}). Write text values in ${outLang()}.`;
    return parseJsonArray(await llm(prompt, sys));
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
    if (!s.enabled || !s.inject || !hasChat()) return '';
    const lines = [];
    for (const p of visiblePeople()) {
        for (const j of p.jobs.filter(jobVisible)) {
            let l = `- ${p.name}: ${j.title}${j.employer ? ' at ' + j.employer : ''} [${j.category || j.type}; ${t('st_' + j.state)}; ${j.mode}`;
            if (j.schedule) l += `; schedule: ${j.schedule}`;
            if (j.salary.amount) l += `; pay: ${fmt(j.salary.amount, effCur(p, j))}/${j.type === 'freelance' ? j.salary.rateType : j.salary.period}`;
            l += `]. Known by: ${knownBy(p, j)}.`;
            if (isOnLeave(j)) {
                l += ` On ${t('st_' + j.state).toLowerCase()} now: no work tasks; may mention it.`;
                const ch = j.leave.entries.find((e) => !e.end && e.childId);
                const child = ch && D().people[ch.childId];
                if (child) l += ` Parental leave for child ${child.name}.`;
                const rs = j.leave.entries.find((e) => !e.end && e.reason);
                if (rs && j.state === 'sick') l += ` Reason: ${rs.reason}.`;
            } else {
                const open = j.tasks.filter((x) => x.status === 'pending' || x.status === 'active');
                if (open.length) l += ` Tasks: ${open.map((x) => x.desc + (x.due ? ` (due ${x.due})` : '') + (x.pay ? ` [pay ${x.pay}]` : '')).join('; ')}.`;
            }
            if (s.opt.sliders) l += ` Stress ${j.stress}/100, satisfaction ${j.satisfaction}/100.`;
            if (s.opt.commute && j.commute) l += ` Commute: ${j.commute}.`;
            if (s.opt.autosummary && j.summary) l += ` Recent work events: ${j.summary}`;
            lines.push(l);
        }
    }
    if (!lines.length && !(s.bankInChat && bank.installed)) return '';
    let out = `[Jobs & career info (reference). A job may only be mentioned by or to characters who know about it (see "Known by"). Characters on leave get no work tasks. Write job-related text in the chat's language.]\n${lines.join('\n')}`;
    if (s.bankInChat && bank.installed && bank.balance != null) {
        const u = D().people.user;
        out += `\n${u.name}'s phone bank balance: ${fmt(bank.balance, bank.currency || '')}${bank.balance < 0 ? ' (negative, in debt)' : ''}.`;
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
const ui = { open: false, selected: 'user', botId: null, exp: {}, ideas: [], busy: '', ideaFor: null };

function opacity() { const v = parseFloat(localStorage.getItem(LS_OPACITY)); return Number.isNaN(v) ? 1 : v; }

function opts(list, cur, prefix) { return list.map((v) => `<option value="${v}" ${v === cur ? 'selected' : ''}>${esc(t(prefix + v))}</option>`).join(''); }

function fld(j, path, label, kind = 'text', o = {}) {
    const val = getByPath(j, path);
    const base = `data-j="${j.id}" data-f="${path}"`;
    let ctl;
    if (kind === 'select') ctl = `<select ${base}>${o.html}</select>`;
    else if (kind === 'check') ctl = `<input type="checkbox" ${base} data-c="1" ${val ? 'checked' : ''}>`;
    else if (kind === 'num') ctl = `<input type="number" step="any" ${base} data-n="1" value="${esc(val)}">`;
    else if (kind === 'range') ctl = `<input type="range" min="0" max="100" ${base} data-n="1" value="${esc(val)}"><span>${esc(val)}</span>`;
    else if (kind === 'area') ctl = `<textarea rows="2" ${base}>${esc(val)}</textarea>`;
    else if (kind === 'date') ctl = `<input type="date" ${base} value="${esc(val)}">`;
    else ctl = `<input type="text" ${base} value="${esc(val)}">`;
    return `<label class="jx-f ${kind === 'check' ? 'jx-fc' : ''}"><span>${esc(label)}</span>${ctl}</label>`;
}

function salaryLine(p, j) {
    if (!j.salary.amount) return '';
    return `${fmt(j.salary.amount, effCur(p, j))}/${t(j.type === 'freelance' ? 'r_' + j.salary.rateType : 'p_' + j.salary.period)}`;
}

function renderLeave(j) {
    const L = j.leave;
    let h = `<div class="jx-sec"><div class="jx-st">${t('tracker')}</div>${fld(j, 'leave.enabled', t('enabled'), 'check')}`;
    if (!L.enabled) return h + '</div>';
    h += '<table class="jx-tbl"><tr><th></th><th>' + t('allowance') + '</th><th>' + t('adjust') + '</th><th>' + t('used') + '</th><th>' + t('left') + '</th><th>' + t('reduced') + '</th></tr>';
    for (const ty of LEAVE_TYPES) {
        const left = leftDays(j, ty);
        h += `<tr><td>${t('l_' + ty)}</td>
        <td><input type="number" data-j="${j.id}" data-f="leave.balances.${ty}.allowance" data-n="1" value="${L.balances[ty].allowance}"></td>
        <td><input type="number" data-j="${j.id}" data-f="leave.balances.${ty}.adj" data-n="1" value="${L.balances[ty].adj}"></td>
        <td>${usedDays(j, ty)}</td><td class="${left < 0 ? 'jx-neg' : ''}">${left}</td>
        <td><input type="checkbox" data-j="${j.id}" data-f="leave.reduced.${ty}" data-c="1" ${L.reduced[ty] ? 'checked' : ''}></td></tr>`;
    }
    h += '</table>';
    const children = Object.values(D().people).filter((p) => p.kind === 'npc');
    h += `<div class="jx-lf"><select class="jx-l-type">${LEAVE_TYPES.map((x) => `<option value="${x}">${esc(t('l_' + x))}</option>`).join('')}</select>
      <input type="date" class="jx-l-start" value="${today()}" title="${t('start')}"><input type="date" class="jx-l-end" title="${t('end')}">
      <input type="number" class="jx-l-days" placeholder="${t('days')}" style="width:60px">
      <input type="text" class="jx-l-reason" placeholder="${t('reason')}">
      <select class="jx-l-child"><option value="">${t('child')}: —</option>${children.map((c) => `<option value="${c.id}">${esc(c.name)}</option>`).join('')}</select>
      <button class="menu_button" data-a="startLeave" data-j="${j.id}">${t('startLeave')}</button></div>`;
    if (L.entries.length) {
        h += `<div class="jx-st">${t('entries')}</div>`;
        h += L.entries.map((e, i) => `<div class="jx-row">${esc(t('l_' + e.type))}: ${esc(e.start || '?')} → ${esc(e.end || '…')} (${entryDays(e)} ${t('days')})${e.reason ? ' · ' + esc(e.reason) : ''}${e.childId && D().people[e.childId] ? ' · ' + esc(D().people[e.childId].name) : ''}
          ${!e.end ? `<button class="menu_button" data-a="endLeave" data-j="${j.id}" data-i="${i}">${t('endLeave')}</button>` : ''}
          <button class="menu_button" data-a="delLeave" data-j="${j.id}" data-i="${i}">✕</button></div>`).join('');
    }
    return h + '</div>';
}

function renderTasks(p, j) {
    let h = `<div class="jx-sec"><div class="jx-st">${t('tasks')} <button class="menu_button" data-a="addTask" data-j="${j.id}">${t('addTask')}</button></div>`;
    if (isOnLeave(j)) h += `<div class="jx-warn">${t('noLeaveTasks')}</div>`;
    j.tasks.forEach((k, i) => {
        h += `<div class="jx-task"><input type="text" data-j="${j.id}" data-f="tasks.${i}.desc" value="${esc(k.desc)}" placeholder="${t('desc')}">
        <input type="date" data-j="${j.id}" data-f="tasks.${i}.due" value="${esc(k.due)}" title="${t('due')}">
        <input type="number" step="any" data-j="${j.id}" data-f="tasks.${i}.pay" data-n="1" value="${esc(k.pay)}" title="${t('pay')}" style="width:80px">
        <select data-j="${j.id}" data-f="tasks.${i}.status">${opts(TASK_STATUS, k.status, 'ts_')}</select>
        ${k.paid ? `<span class="jx-ok">${t('paid')}</span>` : ''}<button class="menu_button" data-a="delTask" data-j="${j.id}" data-i="${i}">✕</button></div>`;
    });
    return h + '</div>';
}

function renderAwareness(p, j) {
    const others = visiblePeople().filter((x) => x.id !== p.id);
    let h = `<div class="jx-sec"><div class="jx-st">${t('awareness')}</div>
      <select data-j="${j.id}" data-f="awareness.mode"><option value="everyone" ${j.awareness.mode === 'everyone' ? 'selected' : ''}>${t('everyone')}</option>
      <option value="specific" ${j.awareness.mode === 'specific' ? 'selected' : ''}>${t('specific')}</option>
      <option value="none" ${j.awareness.mode === 'none' ? 'selected' : ''}>${t('none')}</option></select>`;
    if (j.awareness.mode === 'specific') {
        h += others.map((o) => `<label class="jx-fc"><input type="checkbox" data-a="aware" data-j="${j.id}" data-name="${esc(o.name)}" ${j.awareness.who.includes(o.name) ? 'checked' : ''}> ${esc(o.name)}</label>`).join('');
    }
    return h + '</div>';
}

function renderJob(p, j) {
    const s = S();
    const open = ui.exp[j.id];
    const types = JOB_TYPES.filter((x) => x !== 'adult' || canAdult(p) || j.type === 'adult').filter((x) => x !== 'teen' || canTeen(p) || j.type === 'teen');
    let h = `<div class="jx-job" data-job="${j.id}"><div class="jx-jh" data-a="toggle" data-j="${j.id}"><b>${esc(j.title || '—')}</b>
      <span class="jx-badge jx-s-${j.state}">${t('st_' + j.state)}</span>${j.category ? `<span class="jx-tag">${esc(j.category)}</span>` : ''}${j.type === 'adult' ? '<span class="jx-tag">18+</span>' : ''}
      <span class="jx-sal">${esc(salaryLine(p, j))}</span></div>`;
    if (isOnLeave(j) && !open) h += `<div class="jx-sub">${t('st_' + j.state)} · ${t('left')}: ${leftDays(j, STATE_LEAVE[j.state])} ${t('days')}</div>`;
    if (open) {
        h += '<div class="jx-body">';
        h += `<div class="jx-grid">${fld(j, 'title', t('jTitle'))}${fld(j, 'employer', t('employer'))}${fld(j, 'category', t('category'))}
          ${fld(j, 'type', t('type'), 'select', { html: opts(types, j.type, 't_') })}
          ${fld(j, 'mode', t('mode'), 'select', { html: opts(MODES, j.mode, 'm_') })}
          ${fld(j, 'state', t('state'), 'select', { html: opts(STATES, j.state, 'st_') })}</div>${fld(j, 'schedule', t('schedule'), 'area')}`;
        h += `<div class="jx-sec"><div class="jx-st">${t('salary')}</div><div class="jx-grid">${fld(j, 'salary.amount', t('amount'), 'num')}
          ${p.kind === 'user' && bank.currency ? `<label class="jx-f"><span>${t('currency')}</span><input disabled value="${esc(bank.currency)}"></label>`
            : fld(j, 'salary.currency', t('currency'), 'select', { html: CURRENCIES.map((c) => `<option ${c === j.salary.currency ? 'selected' : ''}>${c}</option>`).join('') })}
          ${j.type === 'freelance' ? fld(j, 'salary.rateType', t('rateType'), 'select', { html: opts(RATES, j.salary.rateType, 'r_') }) : fld(j, 'salary.period', t('period'), 'select', { html: opts(PERIODS, j.salary.period, 'p_') })}
          ${fld(j, 'salary.totalEarned', t('totalEarned'), 'num')}</div>
          <button class="menu_button" data-a="payPeriod" data-j="${j.id}">${t('payPeriod')}</button></div>`;
        h += renderLeave(j) + renderTasks(p, j) + renderAwareness(p, j);
        if (s.opt.commute) h += fld(j, 'commute', t('commute'));
        if (s.opt.sliders) h += fld(j, 'stress', t('stress'), 'range') + fld(j, 'satisfaction', t('satisfaction'), 'range');
        if (s.opt.coworkers) {
            h += `<div class="jx-sec"><div class="jx-st">${t('coworkers')}</div>${j.coworkers.map((c) => `<span class="jx-tag">${esc(c)}</span>`).join('')}
              <div class="jx-row"><input type="text" class="jx-cw" placeholder="${t('npcName')}"><button class="menu_button" data-a="addCoworker" data-j="${j.id}">${t('addCoworker')}</button></div></div>`;
        }
        if (s.opt.autosummary) h += `<div class="jx-sec">${fld(j, 'summary', t('summary'), 'area')}<button class="menu_button" data-a="summarize" data-j="${j.id}">${t('summarize')}</button></div>`;
        h += `<div class="jx-row">${s.opt.history ? `<button class="menu_button" data-a="archiveJob" data-j="${j.id}">${t('archive')}</button>` : ''}<button class="menu_button" data-a="delJob" data-j="${j.id}">${t('del')}</button></div></div>`;
    }
    return h + '</div>';
}

function updatePower() {
    const on = S().enabled;
    document.getElementById('jx_panel')?.classList.toggle('jx-off', !on);
    document.getElementById('jx_fab')?.classList.toggle('jx-off', !on);
    const b = document.getElementById('jx_power');
    if (b) { b.title = t('powerTip'); b.classList.toggle('jx-on', on); }
}

function renderPanel() {
    const body = document.getElementById('jx_body');
    if (!body) return;
    updatePower();
    if (!S().enabled) { body.innerHTML = `<div class="jx-dim">${t('disabledMsg')}</div>`; return; }
    if (!hasChat()) { body.innerHTML = `<div class="jx-dim">${t('noChat')}</div>`; return; }
    ensurePeople();
    const s = S();
    const p = D().people[ui.selected];
    const scroll = body.scrollTop;
    let h = '';
    if (bank.installed) {
        h += `<div class="jx-bank ${bank.balance < 0 ? 'jx-neg' : ''}">🏦 ${t('phoneBalance')}: <b>${bank.balance == null ? '—' : esc(fmt(bank.balance, bank.currency || ''))}</b>${bank.balance < 0 ? ` ⚠ ${t('negative')}` : ''}</div>`;
    } else h += `<div class="jx-bank jx-dim">${t('phoneMissing')}</div>`;
    h += '<div class="jx-people">' + visiblePeople().map((x) => `<button class="menu_button ${x.id === ui.selected ? 'jx-on' : ''}" data-a="select" data-id="${esc(x.id)}">${esc(x.name)}</button>`).join('')
        + `<button class="menu_button" data-a="addNpc">${t('addNpc')}</button></div>`;
    h += `<div class="jx-row"><label class="jx-f"><span>${t('age')}</span><input type="text" data-p="age" value="${esc(p.age)}" placeholder="${t('ageUnknown')}" style="width:90px"></label>`;
    if (p.kind === 'npc') {
        h += `<button class="menu_button" data-a="delNpc">${t('del')} NPC</button>`;
        if (bank.installed) h += `<select data-p="phoneContact" class="jx-contact"><option value="">📱 —</option>${(ui.contacts || []).map((c) => `<option ${p.phoneContact === c ? 'selected' : ''}>${esc(c)}</option>`).join('')}</select>`;
    }
    h += '</div><div class="jx-row jx-search">';
    h += `<button class="menu_button" data-a="search" data-k="standard">${t('sStandard')}</button><button class="menu_button" data-a="search" data-k="parttime">${t('sPart')}</button>`;
    if (canTeen(p)) h += `<button class="menu_button" data-a="search" data-k="teen">${t('sTeen')}</button>`;
    if (canAdult(p)) h += `<button class="menu_button" data-a="search" data-k="adult">${t('sAdult')}</button>`;
    h += `<button class="menu_button" data-a="manual">${t('manual')}</button><button class="menu_button" data-a="scan">${t('scan')}</button></div>`;
    if (s.opt.importExport) h += `<div class="jx-row"><button class="menu_button" data-a="export">${t('export')}</button><button class="menu_button" data-a="import">${t('import')}</button><input type="file" id="jx_file" accept=".json" hidden></div>`;
    if (ui.busy) h += `<div class="jx-dim">${t('searching')}</div>`;
    if (ui.ideas.length && ui.ideaFor === p.id) {
        h += `<div class="jx-sec"><div class="jx-st">${t('ideas')}</div>${ui.ideas.map((x, i) => `<div class="jx-idea"><b>${esc(x.title)}</b> ${esc(x.employer || '')} <span class="jx-dim">${esc(x.schedule || '')} ${x.amount ? fmt(x.amount, '') + '/' + esc(x.period || '') : ''}</span><div class="jx-dim">${esc(x.description || '')}</div><button class="menu_button" data-a="addIdea" data-i="${i}">${t('add')}</button></div>`).join('')}</div>`;
    }
    const jobs = p.jobs.filter(jobVisible);
    h += `<div class="jx-st">${t('jobs')}</div>` + (jobs.length ? jobs.map((j) => renderJob(p, j)).join('') : `<div class="jx-dim">${t('noJobs')}</div>`);
    if (s.opt.history && p.history.length) {
        h += `<div class="jx-st">${t('history')}</div>` + p.history.map((j) => `<div class="jx-row jx-dim">${esc(j.title)} ${j.employer ? '· ' + esc(j.employer) : ''} · ${esc(fmt(j.salary.totalEarned, j.salary.currency))}</div>`).join('');
    }
    body.innerHTML = h;
    body.scrollTop = scroll;
    const op = document.getElementById('jx_opacity');
    if (op) op.title = t('opacity');
}

function renderSettings() {
    const el = document.getElementById('jx_settings_body');
    if (!el) return;
    const s = S();
    const chk = (path, label) => `<label class="checkbox_label"><input type="checkbox" data-s="${path}" data-c="1" ${getByPath(s, path) ? 'checked' : ''}><span>${esc(label)}</span></label>`;
    const profOpts = (cur) => `<option value="">${t('s_default')}</option>` + profiles().map((p) => `<option value="${esc(p.id)}" ${p.id === cur ? 'selected' : ''}>${esc(p.name)}</option>`).join('');
    el.innerHTML = `${chk('enabled', t('s_enable'))}
      <label>${t('s_lang')} <select data-s="lang" class="text_pole"><option value="auto" ${s.lang === 'auto' ? 'selected' : ''}>Auto</option><option value="en" ${s.lang === 'en' ? 'selected' : ''}>English</option><option value="ru" ${s.lang === 'ru' ? 'selected' : ''}>Русский</option></select></label>
      ${chk('adult', t('s_adult'))}
      <label>${t('s_api')} <select data-s="apiProfile" class="text_pole">${profOpts(s.apiProfile)}</select></label>
      <label>${t('s_fallback')} <select data-s="fallbackProfile" class="text_pole">${profOpts(s.fallbackProfile)}</select></label>
      ${chk('inject', t('s_inject'))}
      <label>${t('s_depth')} <input type="number" min="0" max="20" data-s="injectDepth" data-n="1" class="text_pole" value="${s.injectDepth}"></label>
      ${chk('bankInChat', t('s_bank'))}
      <label>${t('reducedPct')} <input type="number" min="0" max="100" data-s="reducedPct" data-n="1" class="text_pole" value="${s.reducedPct}"></label>
      <label>${t('s_phoneKey')} <input type="text" data-s="phoneKey" class="text_pole" value="${esc(s.phoneKey)}"></label>
      <h4>${t('s_optional')}</h4>
      ${Object.keys(DEFAULTS.opt).map((k) => chk('opt.' + k, t('o_' + k))).join('')}
      <div class="menu_button" id="jx_open_btn">${t('open')}</div>`;
}

function rerenderAll() { updatePower(); renderPanel(); renderSettings(); const h = document.querySelector('#jx_panel .jx-title'); if (h) h.textContent = '💼 ' + t('title'); }

/* ------------------------------------------------------------------ */
/* Actions                                                             */
/* ------------------------------------------------------------------ */
const findJob = (id) => { for (const p of Object.values(D().people)) { const j = p.jobs.find((x) => x.id === id); if (j) return { p, j }; } return {}; };

async function afterChange() { save(); applyPrompt(); renderPanel(); }

function readNum(el) { const v = parseFloat(el.value); return Number.isNaN(v) ? 0 : v; }

async function onChange(e) {
    const el = e.target;
    if (el.dataset.a === 'aware') {
        const { j } = findJob(el.dataset.j);
        const set = new Set(j.awareness.who);
        el.checked ? set.add(el.dataset.name) : set.delete(el.dataset.name);
        j.awareness.who = [...set];
        return afterChange();
    }
    if (!el.dataset.f && !el.dataset.p && !el.dataset.s) return;
    const val = el.dataset.c ? el.checked : el.dataset.n ? readNum(el) : el.value;
    if (el.dataset.s) {
        setByPath(S(), el.dataset.s, val);
        save(); applyPrompt(); rerenderAll();
        return;
    }
    if (el.dataset.p) {
        const p = D().people[ui.selected];
        setByPath(p, el.dataset.p, val);
        return afterChange();
    }
    const { p, j } = findJob(el.dataset.j);
    if (!j) return;
    const path = el.dataset.f;
    if (path === 'type' && val === 'adult' && !canAdult(p)) { toastr.warning(t('adultBlocked')); return renderPanel(); }
    const prev = getByPath(j, path);
    setByPath(j, path, val);
    const m = path.match(/^tasks\.(\d+)\.status$/);
    if (m) {
        const k = j.tasks[+m[1]];
        notify(t('evTask'), `${j.title}: ${k.desc} → ${t('ts_' + k.status)}`);
        if (val === 'done' && !k.paid && Number(k.pay) > 0) { k.paid = true; await credit(p, j, k.pay, `Task: ${k.desc}`); }
    }
    if (path === 'state' && prev !== val && isOnLeave(j)) notify(t('evLeave'), `${p.name}: ${t('st_' + val)}`);
    if (path === 'type' && val === 'freelance') j.salary.period = 'project';
    return afterChange();
}

function download(name, text) {
    const a = document.createElement('a');
    a.href = URL.createObjectURL(new Blob([text], { type: 'application/json' }));
    a.download = name; a.click(); URL.revokeObjectURL(a.href);
}

async function onClick(e) {
    const el = e.target.closest('[data-a]');
    if (!el || el.tagName === 'INPUT') return;
    const a = el.dataset.a;
    const s = S();
    const p = D().people[ui.selected];
    const ctx = getContext();
    const { p: jp, j } = el.dataset.j ? findJob(el.dataset.j) : {};
    switch (a) {
        case 'select': ui.selected = el.dataset.id; ui.ideas = []; return renderPanel();
        case 'addNpc': {
            const name = (await ctx.Popup?.show?.input?.(t('npcName'), t('npcName'))) ?? prompt(t('npcName'));
            if (!name) return;
            const id = 'npc:' + uid();
            D().people[id] = { id, name: String(name).trim(), kind: 'npc', age: '', jobs: [], history: [], phoneContact: '' };
            ui.selected = id; return afterChange();
        }
        case 'delNpc': if (confirm(t('confirm'))) { delete D().people[ui.selected]; ui.selected = 'user'; return afterChange(); } return;
        case 'toggle': ui.exp[j.id] = !ui.exp[j.id]; return renderPanel();
        case 'manual': { const nj = newJob({ title: '—' }); nj.title = ''; p.jobs.push(nj); ui.exp[nj.id] = true; return afterChange(); }
        case 'delJob': if (confirm(t('confirm'))) { jp.jobs = jp.jobs.filter((x) => x.id !== j.id); return afterChange(); } return;
        case 'archiveJob': jp.history.push(clone(j)); jp.jobs = jp.jobs.filter((x) => x.id !== j.id); return afterChange();
        case 'search': case 'scan': {
            const kind = el.dataset.k;
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
            let type = JOB_TYPES.includes(x.type) ? x.type : 'standard';
            if (type === 'adult' && !canAdult(owner)) type = 'standard';
            const nj = newJob({ ...x, type, mode: MODES.includes(x.mode) ? x.mode : 'onsite', period: PERIODS.includes(x.period) ? x.period : 'month' });
            owner.jobs.push(nj); ui.exp[nj.id] = true; ui.ideas.splice(+el.dataset.i, 1); return afterChange();
        }
        case 'addTask':
            if (isOnLeave(j)) return toastr.warning(t('noLeaveTasks'));
            j.tasks.push({ id: uid(), desc: '', due: '', pay: 0, status: 'pending', paid: false }); return afterChange();
        case 'delTask': j.tasks.splice(+el.dataset.i, 1); return afterChange();
        case 'payPeriod': {
            const f = leaveFactor(j);
            await credit(jp, j, (Number(j.salary.amount) || 0) * f, 'Salary');
            return renderPanel();
        }
        case 'startLeave': {
            const box = el.closest('.jx-lf');
            const type = box.querySelector('.jx-l-type').value;
            const entry = {
                id: uid(), type, start: box.querySelector('.jx-l-start').value, end: box.querySelector('.jx-l-end').value,
                days: Number(box.querySelector('.jx-l-days').value) || 0, reason: box.querySelector('.jx-l-reason').value.trim(),
                childId: (type === 'maternity' || type === 'paternity') ? box.querySelector('.jx-l-child').value : '',
            };
            j.leave.entries.push(entry);
            if (!entry.end) { j.state = LEAVE_STATE[type]; notify(t('evLeave'), `${jp.name}: ${t('l_' + type)}`); }
            return afterChange();
        }
        case 'endLeave': {
            const en = j.leave.entries[+el.dataset.i];
            en.end = today();
            if (en.start && en.end < en.start) en.end = en.start;
            if (isOnLeave(j)) j.state = 'working';
            notify(t('evLeaveEnd'), `${jp.name}: ${t('l_' + en.type)}`);
            return afterChange();
        }
        case 'delLeave': j.leave.entries.splice(+el.dataset.i, 1); return afterChange();
        case 'addCoworker': {
            const inp = el.closest('.jx-row').querySelector('.jx-cw');
            const name = inp.value.trim();
            if (!name) return;
            j.coworkers.push(name);
            const id = 'npc:' + uid();
            D().people[id] = { id, name, kind: 'npc', age: '', jobs: [newJob({ title: '', employer: j.employer, category: j.category })], history: [], phoneContact: '' };
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
        case 'export': download(`jobs_${p.name}.json`, JSON.stringify({ jobs: p.jobs, history: p.history }, null, 2)); return;
        case 'import': document.getElementById('jx_file')?.click(); return;
        case 'power':
            s.enabled = !s.enabled; save(); applyPrompt(); rerenderAll(); return;
        case 'close': ui.open = false; document.getElementById('jx_panel').classList.remove('jx-open'); return;
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
        afterChange();
    } catch { toastr.error('Invalid file'); }
    e.target.value = '';
}

/* ------------------------------------------------------------------ */
/* Init                                                                */
/* ------------------------------------------------------------------ */
async function openPanel() {
    ui.open = true;
    document.getElementById('jx_panel').classList.add('jx-open');
    if (S().enabled) {
        await refreshBank();
        ui.contacts = bank.installed ? await PhoneBridge.getContacts() : [];
    }
    renderPanel();
}

function buildUi() {
    const panel = document.createElement('div');
    panel.id = 'jx_panel';
    panel.innerHTML = `<div class="jx-head"><span class="jx-title">💼 ${t('title')}</span>
      <input type="range" id="jx_opacity" min="0.3" max="1" step="0.05" value="${opacity()}">
      <button class="menu_button" id="jx_power" data-a="power">⏻</button>
      <button class="menu_button" data-a="close">✕</button></div><div id="jx_body"></div>`;
    document.body.appendChild(panel);
    panel.style.opacity = opacity();
    panel.querySelector('#jx_opacity').addEventListener('input', (e) => { panel.style.opacity = e.target.value; localStorage.setItem(LS_OPACITY, e.target.value); });
    panel.addEventListener('click', onClick);
    panel.addEventListener('change', onChange);
    panel.addEventListener('change', (e) => { if (e.target.id === 'jx_file') onFile(e); });

    const fab = document.createElement('div');
    fab.id = 'jx_fab'; fab.textContent = '💼'; fab.title = t('title');
    fab.addEventListener('click', () => (ui.open ? onClick({ target: panel.querySelector('[data-a="close"]') }) : openPanel()));
    document.body.appendChild(fab);

    const menu = document.getElementById('extensionsMenu');
    if (menu) {
        const item = document.createElement('div');
        item.className = 'list-group-item flex-container flexGap5';
        item.innerHTML = '<div class="fa-solid fa-briefcase extensionsMenuExtensionButton"></div>Jobs';
        item.addEventListener('click', openPanel);
        menu.appendChild(item);
    }

    const host = document.getElementById('extensions_settings2') || document.getElementById('extensions_settings');
    if (host) {
        const d = document.createElement('div');
        d.className = 'inline-drawer';
        d.innerHTML = '<div class="inline-drawer-toggle inline-drawer-header"><b>Jobs &amp; Career</b><div class="inline-drawer-icon fa-solid fa-circle-chevron-down down"></div></div><div class="inline-drawer-content" id="jx_settings_body"></div>';
        host.appendChild(d);
        d.addEventListener('change', onChange);
        d.addEventListener('click', (e) => { if (e.target.id === 'jx_open_btn') openPanel(); });
    }
}

jQuery(async () => {
    S();
    buildUi();
    if (hasChat()) ensurePeople();
    await refreshBank();
    rerenderAll();
    applyPrompt();
    const { eventSource, event_types } = ST;
    eventSource.on(event_types.CHAT_CHANGED, async () => { ui.selected = 'user'; ui.ideas = []; ui.exp = {}; if (hasChat()) ensurePeople(); await refreshBank(); applyPrompt(); rerenderAll(); });
    const genEvt = event_types.GENERATION_AFTER_COMMANDS || event_types.GENERATION_STARTED;
    eventSource.on(genEvt, async () => { await refreshBank(); applyPrompt(); });
    eventSource.on(event_types.MESSAGE_RECEIVED, async () => { if (ui.open) { await refreshBank(); renderPanel(); } });
    console.log('[Jobs & Career] loaded');
});
