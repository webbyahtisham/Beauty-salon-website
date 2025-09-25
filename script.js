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

function showReview(newIndex) {
  const review = reviews[newIndex];

  // fade out old
  gsap.to([reviewText, reviewAuthor, reviewRole], {
    opacity: 0,
    duration: 0.5,
    onComplete: () => {
      // change content
      reviewText.textContent = review.text;
      reviewAuthor.textContent = review.author;
      reviewRole.textContent = review.role;

      // fade in new
      gsap.to([reviewText, reviewAuthor, reviewRole], {
        opacity: 1,
        duration: 0.5
      });
    }
  });
}

document.getElementById("nextBtn").addEventListener("click", () => {
  index = (index + 1) % reviews.length;
  showReview(index);
});

document.getElementById("prevBtn").addEventListener("click", () => {
  index = (index - 1 + reviews.length) % reviews.length;
  showReview(index);
});

// Auto change every 4 seconds
setInterval(() => {
  index = (index + 1) % reviews.length;
  showReview(index);
}, 6000);

// loader
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
        onComplete: () => {
          showLineAndSplit();
        }
      });
    }

    function showLineAndSplit() {
      // Reveal both line halves (grow from center)
      gsap.to([topLine, bottomLine], {
        scaleX: 1,
        duration: 0.8,
        ease: "power2.inOut",
        onComplete: playRevealAnimation
      });
    }

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

    window.onload = function() {
      startCount();
    };