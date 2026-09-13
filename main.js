gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

const EZ = "power3.out";
const EZ2 = "expo.out";
const EZB = "power4.inOut";

(function () {
  if (window.innerWidth <= 768) return;
  const dot = document.getElementById("cur-dot");
  const ring = document.getElementById("cur-ring");
  let mx = 0,
    my = 0,
    rx = 0,
    ry = 0;

  document.addEventListener(
    "mousemove",
    (e) => {
      mx = e.clientX;
      my = e.clientY;
    },
    { passive: true },
  );

  (function loop() {
    dot.style.transform = `translate(calc(${mx}px - 50%), calc(${my}px - 50%))`;
    rx += (mx - rx) * 0.1;
    ry += (my - ry) * 0.1;
    ring.style.transform = `translate(calc(${rx}px - 50%), calc(${ry}px - 50%))`;
    requestAnimationFrame(loop);
  })();

  document.querySelectorAll("a,button,.sk-card,.proj-card").forEach((el) => {
    el.addEventListener("mouseenter", () => document.body.classList.add("ch"));
    el.addEventListener("mouseleave", () =>
      document.body.classList.remove("ch"),
    );
  });

  document.querySelectorAll(".sec-dark").forEach((el) => {
    ScrollTrigger.create({
      trigger: el,
      start: "top 50%",
      end: "bottom 50%",
      onEnter: () => document.body.classList.add("cd"),
      onLeave: () => document.body.classList.remove("cd"),
      onEnterBack: () => document.body.classList.add("cd"),
      onLeaveBack: () => document.body.classList.remove("cd"),
    });
  });
})();

const prog = document.getElementById("prog");
window.addEventListener(
  "scroll",
  () => {
    prog.style.width =
      (scrollY / (document.body.scrollHeight - innerHeight)) * 100 + "%";
  },
  { passive: true },
);

const nav = document.getElementById("nav");
window.addEventListener(
  "scroll",
  () => {
    nav.classList.toggle("scrolled", scrollY > 60);
  },
  { passive: true },
);

document.querySelectorAll(".sec-dark").forEach((el) => {
  ScrollTrigger.create({
    trigger: el,
    start: "top 70px",
    end: "bottom 70px",
    onEnter: () => nav.classList.add("dark"),
    onLeave: () => nav.classList.remove("dark"),
    onEnterBack: () => nav.classList.add("dark"),
    onLeaveBack: () => nav.classList.remove("dark"),
  });
});

(function () {
  const loader = document.getElementById("loader");
  const letters = loader.querySelectorAll(".ld-name span");
  const fill = loader.querySelector(".ld-fill");
  const txt = loader.querySelector(".ld-txt");

  const tl = gsap.timeline({
    onComplete: () => {
      gsap.to(loader, {
        yPercent: -100,
        duration: 0.9,
        ease: EZB,
        onComplete: () => {
          loader.remove();
          heroIn();
        },
      });
    },
  });

  tl.to(letters, { y: 0, duration: 0.65, stagger: 0.055, ease: EZ2 })
    .to(fill, { width: "100%", duration: 0.8, ease: "power2.inOut" }, "-=.3")
    .to(txt, { opacity: 1, duration: 0.3 }, "-=.7")
    .to({}, { duration: 0.25 });
})();

function heroIn() {
  const tl = gsap.timeline({ defaults: { ease: EZ2 } });
  tl.to(".hero-vline", { scaleY: 1, duration: 1.1 }, 0)
    .to(".hero-side", { opacity: 1, duration: 0.7 }, 0.3)
    .to(".hero-stats", { opacity: 1, y: 0, duration: 0.7 }, 0.2)
    .to("#helloLine", { y: 0, duration: 1.0 }, 0.05)
    .to("#heroSub", { opacity: 1, y: 0, duration: 0.7 }, 0.55)
    .to("#heroCta", { opacity: 1, y: 0, duration: 0.7 }, 0.65)
    .from(
      "#heroImg",
      {
        clipPath: "inset(100% 0 0 0)",
        duration: 1.1,
        ease: EZB,
      },
      0,
    );

  setTimeout(runCounters, 700);
}

if (window.innerWidth > 768) {
  const outer = document.getElementById("photoOuter");
  // Set initial height
  gsap.set(outer, { height: "60vh" });

  gsap.to(outer, {
    height: "100vh",
    ease: "none",
    scrollTrigger: {
      trigger: "#hero",
      start: "top top",
      end: "bottom top",
      scrub: 1.8,
      invalidateOnRefresh: true,
    },
  });

  gsap.to("#heroImg", {
    y: "-6%",
    ease: "none",
    scrollTrigger: {
      trigger: "#hero",
      start: "top top",
      end: "bottom top",
      scrub: 2.5,
    },
  });
}

const revObs = new IntersectionObserver(
  (entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        e.target.classList.add("vis");
        revObs.unobserve(e.target);
      }
    });
  },
  { threshold: 0.13 },
);
document.querySelectorAll(".reveal").forEach((el) => revObs.observe(el));

function runCounters() {
  [
    ["c1", 200],
    ["c2", 50],
  ].forEach(([id, target]) => {
    const el = document.getElementById(id);
    if (!el) return;
    gsap.to(
      { v: 0 },
      {
        v: target,
        duration: 1.8,
        ease: "power2.out",
        onUpdate: function () {
          el.textContent = Math.floor(this.targets()[0].v);
        },
        onComplete: function () {
          el.textContent = target;
        },
      },
    );
  });
}

ScrollTrigger.create({
  trigger: "#barsBlock",
  start: "top 80%",
  once: true,
  onEnter: () => {
    document.querySelectorAll(".bar-fill").forEach((b) => {
      gsap.to(b, {
        width: b.dataset.w + "%",
        duration: 1.6,
        ease: "power2.out",
        onComplete: () => b.classList.add("lit"),
      });
    });
    document.querySelectorAll(".bar-pct").forEach((p) => {
      const t = +p.dataset.pct;
      gsap.to(
        { v: 0 },
        {
          v: t,
          duration: 1.6,
          ease: "power2.out",
          onUpdate: function () {
            p.textContent = Math.floor(this.targets()[0].v) + "%";
          },
          onComplete: function () {
            p.textContent = t + "%";
          },
        },
      );
    });
  },
});

if (window.innerWidth > 768) {
  document.querySelectorAll(".proj-card").forEach((card) => {
    card.addEventListener("mousemove", (e) => {
      const r = card.getBoundingClientRect();
      const dx = ((e.clientX - r.left) / r.width - 0.5) * 8;
      const dy = ((e.clientY - r.top) / r.height - 0.5) * 8;
      card.style.transform = `perspective(600px) rotateY(${dx}deg) rotateX(${-dy}deg) scale(1.015)`;
    });
    card.addEventListener("mouseleave", () => {
      card.style.transition =
        "transform .7s var(--ease),box-shadow .5s var(--ease)";
      card.style.transform = "";
      setTimeout(() => (card.style.transition = ""), 700);
    });
  });
}

document.querySelectorAll(".proj-card").forEach((c) => {
  const img = c.querySelector(".proj-photo");
  const ph = c.querySelector(".proj-ph");
  if (img && img.getAttribute("src")) {
    img.style.display = "block";
    if (ph) ph.style.display = "none";
  }
});

if (window.innerWidth > 768) {
  document
    .querySelectorAll(".btn-pill,.nav-cta,.contact-email")
    .forEach((el) => {
      el.addEventListener("mousemove", (e) => {
        const r = el.getBoundingClientRect();
        const dx = (e.clientX - (r.left + r.width / 2)) * 0.22;
        const dy = (e.clientY - (r.top + r.height / 2)) * 0.22;
        el.style.transform = `translate(${dx}px,${dy}px)`;
      });
      el.addEventListener("mouseleave", () => {
        el.style.transition = "transform .6s var(--ease)";
        el.style.transform = "";
        setTimeout(() => (el.style.transition = ""), 600);
      });
    });
}

const ham = document.getElementById("ham");
const mob = document.getElementById("mob");
ham.addEventListener("click", () => {
  const open = ham.classList.toggle("open");
  mob.classList.toggle("open", open);
  document.body.style.overflow = open ? "hidden" : "";
});
mob.querySelectorAll("a").forEach((a) => {
  a.addEventListener("click", () => {
    ham.classList.remove("open");
    mob.classList.remove("open");
    document.body.style.overflow = "";
  });
});

document.querySelectorAll('a[href^="#"]').forEach((a) => {
  a.addEventListener("click", (e) => {
    const t = document.querySelector(a.getAttribute("href"));
    if (!t) return;
    e.preventDefault();
    ham.classList.remove("open");
    mob.classList.remove("open");
    document.body.style.overflow = "";
    gsap.to(window, {
      scrollTo: { y: t, offsetY: 70 },
      duration: 1.1,
      ease: EZB,
    });
  });
});

const btt = document.getElementById("btt");
window.addEventListener(
  "scroll",
  () => btt.classList.toggle("show", scrollY > 400),
  { passive: true },
);
btt.addEventListener("click", () =>
  gsap.to(window, { scrollTo: 0, duration: 1.1, ease: EZB }),
);

const PROJECTS = [
  {
    title: "Website Organisasi",
    category: "Programing",
    image: "/image/web osis.png",
    description:
      "Website ini dikembangkan sebagai bagian dari kegiatan promosi sekolah, sekaligus menjadi wadah untuk menampilkan karya dan kemampuan siswa dalam membangun sebuah website untuk organisasi intra sekolah secara mandiri. Project ini menunjukkan bagaimana siswa mampu menerapkan keterampilan teknologi, kreativitas, dan kerja mandiri untuk menghasilkan solusi digital yang dapat digunakan secara nyata oleh lingkungan sekolah.",
    technologies: ["Figma", "User Research", "Design System"],
  },
  {
    title: "Brand Identity",
    category: "Programing",
    image: "image/Metasoul.png",
    description:
      "Merancang dan membangun landing page untuk sebuah platform yang bergerak di bidang NFT, dengan fokus pada tampilan visual yang modern, informatif, dan menarik untuk memperkenalkan platform serta membangun ketertarikan pengguna terhadap layanan yang ditawarkan.",
    technologies: ["Figma", "Adobe Illustrator"],
  },
  {
    title: "Mobile Device Managemenet",
    category: "Programing",
    image: "image/Device Admin.png",
    description:
      "Membangun sistem monitoring yang memungkinkan pengawasan aktivitas melalui device screen sharing, pelacakan device serta integrasi perangkat mobile karyawan. Sistem ini juga dilengkapi fitur pengunggahan file dan tugas yang memudahkan karyawan dalam mengirimkan dokumen secara cepat dan terorganisir melalui satu platform.",
    technologies: ["Android Studio", "Figma", "Claude Ai"],
  },

  {
    title: "Ticketing System",
    category: "Programing",
    image: "image/TICKET.png",
    description:
      "Membangun dashboard manajemen event dan sistem ticketing untuk mempermudah pengelolaan peserta, pendaftaran, serta proses validasi tiket saat acara berlangsung.",
    technologies: ["Figma", "Web Design"],
  },

  {
    title: "Web Portfolio",
    category: "Programing",
    image: "image/Porto Web.png",
    description:
      "Membangun personal portfolio website sebagai bagian dari persyaratan pendaftaran sebuah program, sekaligus sebagai platform untuk menampilkan profil, pengalaman, keterampilan, dan berbagai project yang telah saya kerjakan.",
    technologies: ["Figma", "Web Design", "Typography", "Interaction Design"],
  },
  {
    title: "Ediitng Kegiatan Qurban",
    category: "Editing",
    image: "image/Editing.png",
    description:
      "Mengedit dan menyusun video dokumentasi kegiatan Qurban dari footage berformat Log, termasuk proses color grading dan penyatuan footage menjadi video yang menarik serta mudah dikonsumsi publik.",
    technologies: "Davinci Resolve",
  },
];

(function () {
  const overlay = document.getElementById("qp-overlay");
  const modal = document.getElementById("qp-modal");
  const closeBtn = document.getElementById("qp-close");
  const cards = document.querySelectorAll(".proj-card");

  let scrollY = 0;

  function openModal(idx) {
    const p = PROJECTS[idx];
    if (!p) return;

    document.getElementById("qp-title").textContent = p.title;
    document.getElementById("qp-cat").textContent = p.category;
    document.getElementById("qp-desc").textContent = p.description;

    const techWrap = document.getElementById("qp-tech");
    techWrap.innerHTML = p.technologies
      .map((t) => `<span class="qp-tag">${t}</span>`)
      .join("");

    const photo = document.getElementById("qp-photo");
    const ph = document.getElementById("qp-ph");
    if (p.image) {
      photo.src = p.image;
      photo.style.display = "block";
      ph.style.display = "none";
    } else {
      photo.style.display = "none";
      ph.style.display = "flex";
    }

    scrollY = window.scrollY;
    document.body.style.overflow = "hidden";

    overlay.classList.add("active");
    modal.scrollTop = 0;

    setTimeout(() => closeBtn.focus(), 50);
  }

  function closeModal() {
    overlay.classList.remove("active");
    document.body.style.overflow = "";
    window.scrollTo(0, scrollY);
  }

  cards.forEach((card, i) => {
    card.addEventListener("click", () => openModal(i));
  });

  closeBtn.addEventListener("click", closeModal);
  overlay.addEventListener("click", (e) => {
    if (e.target === overlay) closeModal();
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && overlay.classList.contains("active"))
      closeModal();
  });
})();

(function () {
  const logo = document.querySelector(".nav-logo");
  const orig = logo.textContent;
  const chars = "!<>-_\/[]{}=+*^?#✦●○◆";
  let raf,
    hovering = false,
    f = 0;
  function run() {
    f++;
    logo.textContent = orig
      .split("")
      .map((c, i) =>
        !hovering || f > i * 3
          ? c
          : chars[Math.floor(Math.random() * chars.length)],
      )
      .join("");
    if (hovering || f < orig.length * 3) raf = requestAnimationFrame(run);
  }
  logo.addEventListener("mouseenter", () => {
    hovering = true;
    f = 0;
    cancelAnimationFrame(raf);
    run();
  });
  logo.addEventListener("mouseleave", () => {
    hovering = false;
    setTimeout(() => (logo.textContent = orig), 200);
  });
})();
