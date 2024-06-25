// script.js
document.addEventListener('DOMContentLoaded', () => {
    const toggle = document.getElementById('mode-toggle');
    const currentMode = localStorage.getItem('mode') || 'light';

    document.body.classList.add(`${currentMode}-mode`);
    if (currentMode === 'dark') {
        toggle.checked = true;
    }

    toggle.addEventListener('change', () => {
        if (toggle.checked) {
            document.body.classList.replace('light-mode', 'dark-mode');
            localStorage.setItem('mode', 'dark');
        } else {
            document.body.classList.replace('dark-mode', 'light-mode');
            localStorage.setItem('mode', 'light');
        }
    });
});
