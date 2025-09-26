// ==========================
// 🌐 NAV MENU TOGGLE
// ==========================
  const menuBtn = document.querySelector(".menu-btn");
    const menu = document.querySelector(".menu-overlay");
    let menuOpen = false;

    function openMenu() {
      gsap.to(menu, { left: 0, duration: 0.6, ease: "power4.out" });
      gsap.fromTo(".menu-overlay a",
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, stagger: 0.1, delay: 0.2 }
      );
      menuBtn.classList.remove("ri-menu-3-line");
      menuBtn.classList.add("ri-close-large-line");
      menuBtn.style.background = "#fff";
      menuBtn.style.color = "#111";
      document.body.style.overflow = "hidden";
      menuOpen = true;
    }

    function closeMenu() {
      gsap.to(menu, { left: "-100%", duration: 0.6, ease: "power4.inOut" });
      menuBtn.classList.remove("ri-close-large-line");
      menuBtn.classList.add("ri-menu-3-line");
      menuBtn.style.background = "#F77C00";
      menuBtn.style.color = "#fff";
      document.body.style.overflow = "auto";
      menuOpen = false;
    }

    menuBtn.addEventListener("click", () => {
      if (!menuOpen) {
        openMenu();
      } else {
        closeMenu();
      }
    });

    // Close menu when clicking a link
    document.querySelectorAll(".menu-overlay a").forEach(link => {
      link.addEventListener("click", () => {
        closeMenu();
      });
    });

    // Close menu on scroll
    window.addEventListener("scroll", () => {
  if (menuOpen) {
    closeMenu();
  }
});

// ==========================
// 🖼️ CATEGORY IMAGE PREVIEW
// ==========================
const items = document.querySelectorAll('.category-item .item');
const preview = document.querySelector('.image-preview');

items.forEach(item => {
  const img = item.getAttribute('data-img');

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


// ==========================
// ⭐ REVIEWS SLIDER
// ==========================
const reviews = [
  {
    text: "Thank you Glow Better for your continuous assistance and support. Looking forward for the same support in upcoming days.",
    author: "Pristia Candra",
    role: "Beauty Blogger",
    img: "images/customer1.png"
  },
  {
    text: "Glow Better has changed my skincare routine completely. I love the results and the service is amazing!",
    author: "Amanda Lee",
    role: "Content Creator",
    img: "images/customer2.png"
  },
  {
    text: "Excellent products with top quality support. Highly recommended to everyone!",
    author: "Michael Tan",
    role: "Entrepreneur",
    img: "images/customer3.png"
  }
];

let index = 0;
const reviewText = document.getElementById("reviewText");
const reviewAuthor = document.getElementById("reviewAuthor");
const reviewRole = document.getElementById("reviewRole");

function showReview(newIndex) {
  const review = reviews[newIndex];

  // Fade out old content
  gsap.to([reviewText, reviewAuthor, reviewRole], {
    opacity: 0,
    duration: 0.5,
    onComplete: () => {
      // Update content
      reviewText.textContent = review.text;
      reviewAuthor.textContent = review.author;
      reviewRole.textContent = review.role;

      // Fade in new content
      gsap.to([reviewText, reviewAuthor, reviewRole], {
        opacity: 1,
        duration: 0.5
      });
    }
  });
}

// Manual navigation
document.getElementById("nextBtn").addEventListener("click", () => {
  index = (index + 1) % reviews.length;
  showReview(index);
});

document.getElementById("prevBtn").addEventListener("click", () => {
  index = (index - 1 + reviews.length) % reviews.length;
  showReview(index);
});

// Auto change every 6s
setInterval(() => {
  index = (index + 1) % reviews.length;
  showReview(index);
}, 6000);


// ==========================
// ⏳ PRELOADER
// ==========================
const counter = document.getElementById("counter");
const preloader = document.getElementById("preloader");
const topSplit = document.querySelector(".top");
const bottomSplit = document.querySelector(".bottom");
const topLine = document.querySelector(".top .line-half");
const bottomLine = document.querySelector(".bottom .line-half");
const content = document.getElementById("content");

let tl = gsap.timeline({ paused: true });

// Count-up
function startCount() {
  let count = { val: 0 };
  gsap.to(count, {
    val: 100,
    duration: 2.2,
    ease: "power1.out",
    onUpdate: () => {
      counter.textContent = Math.floor(count.val) + "%";
    },
    onComplete: showLineAndSplit
  });
}

// Show line animation
function showLineAndSplit() {
  gsap.to([topLine, bottomLine], {
    scaleX: 1,
    duration: 0.8,
    ease: "power2.inOut",
    onComplete: playRevealAnimation
  });
}

// Reveal site content
function playRevealAnimation() {
  tl.to(topSplit, {
    y: "-100%",
    duration: 1.2,
    ease: "power4.inOut"
  })
    .to(bottomSplit, {
      y: "100%",
      duration: 1.2,
      ease: "power4.inOut"
    }, "<")
    .to(preloader, {
      opacity: 0,
      duration: 0.5,
      onComplete: () => {
        preloader.style.display = "none";
        content.style.display = "block";
        document.body.style.overflow = "auto";
      }
    }, "-=0.3");

  tl.play();
}

// Start loader when page is ready
window.onload = startCount;

// ==========================
// Fotter scroll to top
// ==========================

function scrollToHero() {
  document.querySelector("main .hero").scrollIntoView({
    behavior: "smooth"
  });
}