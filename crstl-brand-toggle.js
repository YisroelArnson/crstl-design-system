(() => {
  const root = document.documentElement;
  const paletteAttribute = 'data-brand-palette';
  const typingSelector = 'input, textarea, select, [contenteditable="true"], [contenteditable=""]';

  const isTypingTarget = target => target instanceof Element && Boolean(target.closest(typingSelector));

  const toggleBrandPalette = () => {
    if (root.getAttribute(paletteAttribute) === 'cobalt') {
      root.removeAttribute(paletteAttribute);
      return;
    }

    root.setAttribute(paletteAttribute, 'cobalt');
  };

  document.addEventListener('keydown', event => {
    if (event.key.toLowerCase() !== 'r') return;
    if (event.repeat || event.metaKey || event.ctrlKey || event.altKey) return;
    if (isTypingTarget(event.target)) return;

    toggleBrandPalette();
  });
})();
