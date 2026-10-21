export const measurementId = 'G-KJ75X36E90';
export const consentKey = 'nhlzone-analytics-consent-v1';
const consentDuration = 180 * 24 * 60 * 60 * 1000;

export function readConsent() {
    try {
        const saved = JSON.parse(localStorage.getItem(consentKey) || 'null');
        if (saved && typeof saved.accepted === 'boolean' && saved.expires > Date.now()) {
            return saved.accepted;
        }
    } catch { /* Le stockage peut être indisponible. */ }
    return null;
}

/** @param {boolean} accepted */
export function saveConsent(accepted) {
    try {
        localStorage.setItem(consentKey, JSON.stringify({ accepted, expires: Date.now() + consentDuration }));
    } catch { /* Le choix reste valable pour la page ouverte. */ }
}

export function startAnalytics() {
    // Les visites locales et les prévisualisations ne sont pas comptabilisées.
    if (location.hostname !== 'nhlzone.com' || document.getElementById('nhl-analytics')) return;
    const analyticsWindow = /** @type {Window & { dataLayer?: unknown[], gtag?: (...args: unknown[]) => void }} */ (window);
    analyticsWindow.dataLayer = analyticsWindow.dataLayer || [];
    analyticsWindow.gtag = function () { analyticsWindow.dataLayer?.push(arguments); };
    const gtag = analyticsWindow.gtag;
    gtag('consent', 'default', {
        analytics_storage: 'denied', ad_storage: 'denied',
        ad_user_data: 'denied', ad_personalization: 'denied'
    });
    gtag('consent', 'update', { analytics_storage: 'granted' });
    gtag('js', new Date());
    // GA4 suit ensuite l'historique du navigateur via les mesures améliorées.
    // Ne pas ajouter de page_view manuel en parallèle.
    gtag('config', measurementId, {
        allow_google_signals: false,
        allow_ad_personalization_signals: false,
        cookie_expires: consentDuration / 1000,
        cookie_update: false
    });
    const script = document.createElement('script');
    script.id = 'nhl-analytics';
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
    document.head.appendChild(script);
}

export function stopAnalytics() {
    // Bloque immédiatement les événements avant de décharger la balise.
    Reflect.set(window, `ga-disable-${measurementId}`, true);
    for (const cookie of document.cookie.split(';')) {
        const name = cookie.trim().split('=')[0];
        if (name !== '_ga' && !name.startsWith('_ga_')) continue;
        for (const domain of ['', `; domain=${location.hostname}`, '; domain=.nhlzone.com']) {
            document.cookie = `${name}=; Max-Age=0; path=/${domain}; SameSite=Lax`;
        }
    }
    // Le rechargement supprime également les écouteurs installés par Google.
    location.reload();
}
