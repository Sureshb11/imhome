(function () {
  var nav = document.getElementById('site-nav');
  var toggle = document.querySelector('.nav-toggle');
  var menu = document.getElementById('nav-menu');
  if (!nav || !toggle || !menu) return;

  function closeMenu() {
    nav.classList.remove('nav-open');
    toggle.setAttribute('aria-expanded', 'false');
    document.body.classList.remove('nav-lock');
  }

  function openMenu() {
    nav.classList.add('nav-open');
    toggle.setAttribute('aria-expanded', 'true');
    document.body.classList.add('nav-lock');
  }

  toggle.addEventListener('click', function () {
    if (nav.classList.contains('nav-open')) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  menu.querySelectorAll('.nav-links > li > a:not(.nav-parent)').forEach(function (link) {
    link.addEventListener('click', closeMenu);
  });

  menu.querySelectorAll('.nav-submenu a').forEach(function (link) {
    link.addEventListener('click', closeMenu);
  });

  menu.querySelectorAll('.nav-has-submenu > .nav-parent').forEach(function (link) {
    link.addEventListener('click', function (e) {
      if (window.innerWidth <= 900) {
        e.preventDefault();
        var item = link.closest('.nav-has-submenu');
        var isOpen = item.classList.contains('open');
        menu.querySelectorAll('.nav-has-submenu.open').forEach(function (openItem) {
          openItem.classList.remove('open');
        });
        if (!isOpen) item.classList.add('open');
      }
    });
  });

  window.addEventListener('resize', function () {
    if (window.innerWidth > 900) {
      menu.querySelectorAll('.nav-has-submenu.open').forEach(function (item) {
        item.classList.remove('open');
      });
      closeMenu();
    }
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeMenu();
  });
})();
