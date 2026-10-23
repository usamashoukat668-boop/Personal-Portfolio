(function () {
    var btn = document.getElementById('copy');
    var el = document.getElementById('email');
    if (btn && el) {
        var originalLabel = btn.textContent;
        function selectEmail() {
            var range = document.createRange();
            range.selectNodeContents(el);
            var selection = window.getSelection();
            selection.removeAllRanges();
            selection.addRange(range);
        }
        btn.addEventListener('click', function () {
            function done() { btn.textContent = 'Copied!'; btn.setAttribute('aria-live', 'polite'); window.setTimeout(function () { btn.textContent = originalLabel; }, 1800); }
            if (navigator.clipboard && window.isSecureContext) {
                navigator.clipboard.writeText(el.textContent).then(done, function () { selectEmail(); btn.textContent = 'Select and copy'; });
            } else {
                selectEmail(); btn.textContent = 'Press Ctrl+C';
            }
        });
    }

    var themeBtn = document.getElementById('theme-toggle');
    var root = document.documentElement;
    if (themeBtn) {
        var savedTheme = null;
        try { savedTheme = window.localStorage.getItem('portfolio-theme'); } catch (e) { }
        if (savedTheme === 'light' || savedTheme === 'dark') root.setAttribute('data-theme', savedTheme);
        function updateThemeButton() {
            var dark = root.getAttribute('data-theme') === 'dark' || (!root.hasAttribute('data-theme') && window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches);
            themeBtn.setAttribute('aria-pressed', String(dark));
            themeBtn.setAttribute('aria-label', dark ? 'Switch to light theme' : 'Switch to dark theme');
            var label = themeBtn.querySelector('.theme-label');
            if (label) label.textContent = dark ? 'Dark' : 'Light';
            var icon = themeBtn.querySelector('[aria-hidden="true"]');
            if (icon) icon.textContent = dark ? '☾' : '☼';
        }
        updateThemeButton();
        themeBtn.addEventListener('click', function () {
            var current = root.getAttribute('data-theme');
            var isDark = current === 'dark' || (!current && window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches);
            var next = isDark ? 'light' : 'dark';
            root.setAttribute('data-theme', next);
            try { window.localStorage.setItem('portfolio-theme', next); } catch (e) { }
            updateThemeButton();
        });
    }
    var year = document.getElementById('year');
    if (year) year.textContent = new Date().getFullYear();
})();