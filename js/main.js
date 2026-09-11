  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');
  navToggle.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', isOpen);
  });
  // On mobile, tapping a top-level item with a dropdown expands it instead of navigating away
  document.querySelectorAll('.nav-item').forEach(item => {
    const topLink = item.querySelector(':scope > a');
    const dropdown = item.querySelector('.dropdown');
    if (!dropdown) return;
    topLink.addEventListener('click', (e) => {
      if (window.innerWidth <= 900) {
        e.preventDefault();
        item.classList.toggle('expanded');
      }
    });
  });
  navLinks.querySelectorAll('.dropdown a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });
