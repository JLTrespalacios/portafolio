document.addEventListener('DOMContentLoaded', () => {
    const themeSelect = document.getElementById('themeSelect');
    const savedTheme = localStorage.getItem('portfolio-theme') || 'theme-hybrid';

    // Apply saved theme
    document.body.className = savedTheme;
    
    // Set select value
    if (themeSelect) {
        themeSelect.value = savedTheme;

        themeSelect.addEventListener('change', (e) => {
            const newTheme = e.target.value;
            document.body.className = newTheme;
            localStorage.setItem('portfolio-theme', newTheme);
        });
    }
});
