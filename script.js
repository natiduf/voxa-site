// ===== ANIMACIONES ELEMENTOS =====
const fadeElements = document.querySelectorAll(".fade");

const fadeObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  },
  {
    threshold: 0.2,
  }
);

fadeElements.forEach((el) => fadeObserver.observe(el));


// ===== SCROLL SUAVE =====
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    const targetSelector = this.getAttribute("href");
    const target = document.querySelector(targetSelector);

    if (!target) return;

    e.preventDefault();

    target.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  });
});


// ===== CAROUSEL =====
const carousel = document.querySelector(".carousel");
const btnLeft = document.querySelector(".carousel-btn.left");
const btnRight = document.querySelector(".carousel-btn.right");

if (carousel) {
  let isDown = false;
  let startX = 0;
  let scrollLeft = 0;

  const scrollAmount = 320;

  // BOTONES
  if (btnRight && btnLeft) {
    btnRight.addEventListener("click", () => {
      carousel.scrollBy({
        left: scrollAmount,
        behavior: "smooth",
      });
    });

    btnLeft.addEventListener("click", () => {
      carousel.scrollBy({
        left: -scrollAmount,
        behavior: "smooth",
      });
    });
  }

  // DRAG DESKTOP
  carousel.addEventListener("mousedown", (e) => {
    isDown = true;
    carousel.classList.add("active");

    startX = e.pageX - carousel.offsetLeft;
    scrollLeft = carousel.scrollLeft;
  });

  carousel.addEventListener("mouseleave", () => {
    isDown = false;
    carousel.classList.remove("active");
  });

  carousel.addEventListener("mouseup", () => {
    isDown = false;
    carousel.classList.remove("active");
  });

  carousel.addEventListener("mousemove", (e) => {
    if (!isDown) return;

    e.preventDefault();
    const x = e.pageX - carousel.offsetLeft;
    const walk = (x - startX) * 1.5;

    carousel.scrollLeft = scrollLeft - walk;
  });

  // MOBILE
  carousel.addEventListener("touchstart", (e) => {
    startX = e.touches[0].pageX;
    scrollLeft = carousel.scrollLeft;
  }, { passive: true });

  carousel.addEventListener("touchmove", (e) => {
    const x = e.touches[0].pageX;
    const walk = (x - startX) * 1.5;

    carousel.scrollLeft = scrollLeft - walk;
  }, { passive: true });
}


// ===== TIMELINE =====
const timeline = document.querySelector(".timeline");
const steps = document.querySelectorAll(".step");

if (timeline) {
  const timelineObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          timeline.classList.add("active");

          steps.forEach((step, index) => {
            setTimeout(() => {
              step.classList.add("active");
            }, index * 300);
          });
        }
      });
    },
    {
      threshold: 0.4,
    }
  );

  timelineObserver.observe(timeline);
}


// ===== PARALLAX ART =====
const parallaxArts = document.querySelectorAll(".parallax-art");

function updateParallaxArt() {
  const scrollY = window.scrollY;

  parallaxArts.forEach((el, index) => {
    const speed = parseFloat(el.dataset.speed || (0.02 + index * 0.005));
    const drift = parseFloat(el.dataset.drift || 2);

    const y = scrollY * speed;
    const r = Math.sin((scrollY + index * 120) / 500) * drift;

    el.style.transform = `translate3d(0, ${y}px, 0) rotate(${r}deg)`;
  });
}

let ticking = false;

window.addEventListener("scroll", () => {
  if (!ticking) {
    window.requestAnimationFrame(() => {
      updateParallaxArt();
      ticking = false;
    });
    ticking = true;
  }
});

window.addEventListener("resize", updateParallaxArt);
document.addEventListener("DOMContentLoaded", updateParallaxArt);


// ===== REVEAL + PUSH SECTIONS =====
const sections = document.querySelectorAll(".section");

const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show-section");
      }
    });
  },
  {
    threshold: 0.15,
  }
);

sections.forEach((section) => sectionObserver.observe(section));


// ===== STACK ORDER (CLAVE PARA OVERLAP) =====
sections.forEach((section, index) => {
  section.style.zIndex = index + 1;
});


// ===== NAV ACTIVO SEGÚN SECCIÓN =====
const navLinks = document.querySelectorAll(".top-nav a");

if (navLinks.length && sections.length) {
  const navObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        const id = entry.target.getAttribute("id");
        if (!id) return;

        navLinks.forEach((link) => {
          link.classList.toggle(
            "active",
            link.getAttribute("href") === `#${id}`
          );
        });
      });
    },
    {
      threshold: 0.5,
    }
  );

  sections.forEach((section) => navObserver.observe(section));
}


// ===== WHATSAPP FORM =====
const whatsappForm = document.getElementById("whatsapp-form");

if (whatsappForm) {
  whatsappForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const nombre = document.getElementById("nombre")?.value.trim() || "";
    const email = document.getElementById("email")?.value.trim() || "";
    const celular = document.getElementById("celular")?.value.trim() || "";
    const mensaje = document.getElementById("mensaje")?.value.trim() || "";

    const texto = `
Hola! Soy ${nombre}

Email: ${email}
Celular: ${celular}

Mensaje:
${mensaje}
`;

    const numero = "59891607215";
    const url = `https://wa.me/${numero}?text=${encodeURIComponent(texto)}`;

    window.open(url, "_blank");
  });
}