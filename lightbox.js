// Click a photo to view it large, with its caption. Used by gallery.html and journal posts.
(function () {
  const box = document.getElementById('lightbox');
  if (!box) return;
  const img = box.querySelector('.lightbox__image');
  const cap = box.querySelector('.lightbox__caption');
  const photos = document.querySelectorAll('.gallery-item img, .post-photos img');

  function open(el) {
    img.src = el.src;
    img.alt = el.alt;
    const fig = el.closest('figure');
    const text = el.dataset.caption || (fig && fig.querySelector('figcaption') ? fig.querySelector('figcaption').textContent : '');
    if (cap) cap.textContent = text;
    box.classList.add('lightbox--active');
    document.body.style.overflow = 'hidden';
  }
  function close() {
    box.classList.remove('lightbox--active');
    document.body.style.overflow = '';
    img.src = '';
  }
  photos.forEach(el => {
    el.style.cursor = 'pointer';
    el.addEventListener('click', () => open(el));
  });
  box.querySelector('.lightbox__close').addEventListener('click', close);
  box.addEventListener('click', e => { if (e.target === box) close(); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') close(); });
  // Discourage right-click saving
  document.addEventListener('contextmenu', e => { if (e.target.tagName === 'IMG') e.preventDefault(); });
})();
