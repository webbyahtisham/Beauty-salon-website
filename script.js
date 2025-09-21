const items = document.querySelectorAll('.category-item .item');
const preview = document.querySelector('.image-preview');

items.forEach(item => {
  const img = item.getAttribute('data-img');

  // ===== Desktop hover preview only =====
  item.addEventListener('mouseenter', () => {
    if (window.innerWidth > 900) {
      preview.style.backgroundImage = `url(${img})`;
      preview.style.display = 'block';
    }
  });

  item.addEventListener('mousemove', e => {
    if (window.innerWidth > 900) {
      preview.style.top = `${e.clientY}px`;
      preview.style.left = `${e.clientX}px`;
    }
  });

  item.addEventListener('mouseleave', () => {
    if (window.innerWidth > 900) {
      preview.style.display = 'none';
    }
  });
});
