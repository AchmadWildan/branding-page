import dashboardQc from '../assets/video/dashboard-qc.mp4';
import timbanganMp4 from '../assets/video/timbangan.mp4';
import ControlHormann from '../assets/video/ControlHormann.mp4';

$(document).ready(function () {

  /* ----------------------------------------
     VIDEO MODAL
  ---------------------------------------- */
  const videoMap = {
    'dashboard-qc': dashboardQc,
    'timbangan': timbanganMp4,
    'ControlHormann': ControlHormann,
  };

  $("#videoModal").on("show.bs.modal", function (event) {
    var button = $(event.relatedTarget);
    var keyOrUrl = button.data("video");
    var src = videoMap[keyOrUrl] || keyOrUrl;
    $("#videoSource").attr("src", src);
    $("#modalVideo")[0].load();
  });

  $("#videoModal").on("hidden.bs.modal", function () {
    var video = $("#modalVideo")[0];
    video.pause();
    video.currentTime = 0;
    $("#videoSource").attr("src", "");
  });

  /* ----------------------------------------
     LIMIT TEXT (read more)
  ---------------------------------------- */
  $(".limit-text").each(function () {
    let max = 250;
    let fullText = $(this).text().trim();
    if (fullText.length > max) {
      let shortText = fullText.substring(0, max) + "...";
      let moreLink = $('<a href="#" class="more-link"> Selengkapnya..</a>');
      $(this).data("full-text", fullText);
      $(this).data("short-text", shortText);
      $(this).html(shortText).append(moreLink);
    }
  });

  $(document).on("click", ".more-link", function (e) {
    e.preventDefault();
    let parent = $(this).parent();
    let shortText = parent.data("short-text");
    let fullText = parent.data("full-text");
    if ($(this).text().trim() === "Selengkapnya..") {
      parent.html(fullText + ' <a href="#" class="more-link"> Lebih sedikit..</a>');
    } else {
      parent.html(shortText + ' <a href="#" class="more-link"> Selengkapnya..</a>');
    }
  });

  /* ----------------------------------------
     NAVBAR – Glassmorphism on scroll + Scroll Spy
  ---------------------------------------- */
  const navbar = document.getElementById('mainNavbar');
  const navLinks = document.querySelectorAll('.nav-link-custom');
  const sections = Array.from(document.querySelectorAll('section[id], header[id]'));

  function updateNavbar() {
    if (window.scrollY > 60) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }

  function updateScrollSpy() {
    const scrollPos = window.scrollY + 80;
    let currentSection = '';
    sections.forEach(section => {
      if (section.offsetTop <= scrollPos) {
        currentSection = section.id;
      }
    });
    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('data-section') === currentSection) {
        link.classList.add('active');
      }
    });
  }

  window.addEventListener('scroll', () => {
    updateNavbar();
    updateScrollSpy();
    updateBackToTop();
    triggerReveal();
    triggerSkillBars();
  }, { passive: true });

  updateNavbar();
  updateScrollSpy();

  /* ----------------------------------------
     TYPING ANIMATION (Hero)
  ---------------------------------------- */
  const typingEl = document.getElementById('typingText');
  if (typingEl) {
    const roles = [
      'Software Developer',
      'Industrial IT',
      'Full-Stack Builder',
    ];
    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    const SPEED_TYPE = 90;
    const SPEED_DELETE = 50;
    const PAUSE_END = 1800;
    const PAUSE_START = 300;

    function typeLoop() {
      const currentRole = roles[roleIndex];
      if (!isDeleting) {
        typingEl.textContent = currentRole.slice(0, charIndex + 1);
        charIndex++;
        if (charIndex === currentRole.length) {
          isDeleting = true;
          setTimeout(typeLoop, PAUSE_END);
          return;
        }
        setTimeout(typeLoop, SPEED_TYPE);
      } else {
        typingEl.textContent = currentRole.slice(0, charIndex - 1);
        charIndex--;
        if (charIndex === 0) {
          isDeleting = false;
          roleIndex = (roleIndex + 1) % roles.length;
          setTimeout(typeLoop, PAUSE_START);
          return;
        }
        setTimeout(typeLoop, SPEED_DELETE);
      }
    }
    setTimeout(typeLoop, 800);
  }

  /* ----------------------------------------
     SCROLL REVEAL
  ---------------------------------------- */
  // Add reveal class to elements we want animated
  const revealTargets = document.querySelectorAll(
    '.timeline-item, .skills-card, .contact-card, .about-point, .persona-tag, .resume-group'
  );
  revealTargets.forEach(el => el.classList.add('reveal'));

  function triggerReveal() {
    const windowBottom = window.scrollY + window.innerHeight;
    document.querySelectorAll('.reveal:not(.revealed)').forEach(el => {
      if (el.getBoundingClientRect().top + window.scrollY < windowBottom - 60) {
        el.classList.add('revealed');
      }
    });
  }
  // Initial trigger for elements above fold
  setTimeout(triggerReveal, 100);

  /* ----------------------------------------
     SKILL BAR ANIMATION
  ---------------------------------------- */
  let skillBarsAnimated = false;
  function triggerSkillBars() {
    if (skillBarsAnimated) return;
    const skillsCard = document.querySelector('.skills-card');
    if (!skillsCard) return;
    const rect = skillsCard.getBoundingClientRect();
    if (rect.top < window.innerHeight - 50) {
      skillBarsAnimated = true;
      document.querySelectorAll('.skill-bar-fill').forEach(bar => {
        const width = bar.getAttribute('data-width') || '0';
        bar.style.width = width + '%';
      });
    }
  }

  /* ----------------------------------------
     BACK TO TOP BUTTON
  ---------------------------------------- */
  const backToTopBtn = document.getElementById('backToTop');

  function updateBackToTop() {
    if (!backToTopBtn) return;
    if (window.scrollY > 350) {
      backToTopBtn.classList.add('visible');
    } else {
      backToTopBtn.classList.remove('visible');
    }
  }

  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* ----------------------------------------
     PROJECT CAROUSEL
  ---------------------------------------- */
  const track = document.getElementById('projectTrack');
  const viewport = document.getElementById('projectViewport');
  const btnPrev = document.getElementById('projPrev');
  const btnNext = document.getElementById('projNext');
  const dotsWrap = document.getElementById('projDots');
  const progressBar = document.getElementById('projProgressBar');

  if (!track) return; // guard

  const slides = Array.from(track.querySelectorAll('.project-slide'));
  const totalSlides = slides.length;
  const AUTO_DELAY = 4000;

  let currentIndex = 0;
  let visibleCount = getVisibleCount();
  let autoTimer = null;
  let isPaused = false;

  function getVisibleCount() {
    const w = window.innerWidth;
    if (w <= 640) return 1;
    if (w <= 1024) return 2;
    return 3;
  }
  function maxIndex() {
    return Math.max(0, totalSlides - visibleCount);
  }
  function buildDots() {
    dotsWrap.innerHTML = '';
    const count = maxIndex() + 1;
    for (let i = 0; i < count; i++) {
      const btn = document.createElement('button');
      btn.className = 'proj-dot' + (i === currentIndex ? ' active' : '');
      btn.setAttribute('role', 'tab');
      btn.setAttribute('aria-label', 'Slide ' + (i + 1));
      btn.addEventListener('click', () => { goTo(i); resetAutoPlay(); });
      dotsWrap.appendChild(btn);
    }
  }
  function updateDots() {
    dotsWrap.querySelectorAll('.proj-dot').forEach((d, i) => d.classList.toggle('active', i === currentIndex));
  }
  function updateButtons() {
    btnPrev.classList.toggle('proj-nav-disabled', currentIndex === 0);
    btnNext.classList.toggle('proj-nav-disabled', currentIndex >= maxIndex());
    btnPrev.disabled = currentIndex === 0;
    btnNext.disabled = currentIndex >= maxIndex();
  }
  function goTo(index) {
    currentIndex = Math.max(0, Math.min(index, maxIndex()));
    const slideWidth = slides[0].offsetWidth
      + parseFloat(getComputedStyle(slides[0]).marginLeft)
      + parseFloat(getComputedStyle(slides[0]).marginRight);
    track.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
    updateDots();
    updateButtons();
  }
  function startProgress() {
    progressBar.style.transition = 'none';
    progressBar.style.width = '0%';
    progressBar.offsetHeight; // reflow
    progressBar.style.transition = `width ${AUTO_DELAY}ms linear`;
    progressBar.style.width = '100%';
  }
  function startAutoPlay() {
    stopAutoPlay();
    startProgress();
    autoTimer = setInterval(() => {
      if (isPaused) return;
      goTo(currentIndex >= maxIndex() ? 0 : currentIndex + 1);
      startProgress();
    }, AUTO_DELAY);
  }
  function stopAutoPlay() { clearInterval(autoTimer); }
  function resetAutoPlay() { stopAutoPlay(); startAutoPlay(); }

  btnPrev.addEventListener('click', () => { goTo(currentIndex - 1); resetAutoPlay(); });
  btnNext.addEventListener('click', () => { goTo(currentIndex + 1); resetAutoPlay(); });

  viewport.addEventListener('mouseenter', () => { isPaused = true; });
  viewport.addEventListener('mouseleave', () => { isPaused = false; });

  document.getElementById('videoModal')?.addEventListener('show.bs.modal', () => stopAutoPlay());
  document.getElementById('videoModal')?.addEventListener('hidden.bs.modal', () => startAutoPlay());

  document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') { goTo(currentIndex - 1); resetAutoPlay(); }
    if (e.key === 'ArrowRight') { goTo(currentIndex + 1); resetAutoPlay(); }
  });

  let touchStartX = 0;
  viewport.addEventListener('touchstart', (e) => { touchStartX = e.touches[0].clientX; }, { passive: true });
  viewport.addEventListener('touchend', (e) => {
    const diff = touchStartX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) {
      diff > 0 ? goTo(currentIndex + 1) : goTo(currentIndex - 1);
      resetAutoPlay();
    }
  });

  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      visibleCount = getVisibleCount();
      buildDots();
      goTo(Math.min(currentIndex, maxIndex()));
    }, 150);
  });

  buildDots();
  goTo(0);
  startAutoPlay();

});
