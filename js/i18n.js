let currentTranslations = {};

document.addEventListener('DOMContentLoaded', () => {
    const savedLang = localStorage.getItem('portfolio-lang') || 'es';
    setLanguage(savedLang);
});

async function setLanguage(lang) {
    try {
        const response = await fetch(`lang/${lang}.json`);
        if (!response.ok) {
            throw new Error(`Could not load language file: ${lang}`);
        }
        currentTranslations = await response.json();
        
        document.querySelectorAll('[data-i18n]').forEach(element => {
            const key = element.getAttribute('data-i18n');
            if (currentTranslations[key]) {
                element.textContent = currentTranslations[key];
            }
        });

        document.documentElement.lang = lang;
        localStorage.setItem('portfolio-lang', lang);

        // Update active state of buttons if needed
        updateActiveLangButton(lang);

    } catch (error) {
        console.error('Error loading language:', error);
    }
}

function getTranslation(key) {
    return currentTranslations[key] || key;
}

function updateActiveLangButton(lang) {
    const buttons = document.querySelectorAll('.lang-switch button');
    buttons.forEach(btn => {
        if (btn.getAttribute('data-lang') === lang) {
            btn.style.background = 'var(--accent)';
            btn.style.color = 'var(--bg)';
        } else {
            btn.style.background = 'var(--accent-soft)';
            btn.style.color = 'var(--accent)';
        }
    });
}
