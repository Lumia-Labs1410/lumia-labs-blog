// =========================
// Mobile Menu Toggle
// =========================
document.addEventListener('DOMContentLoaded', function () {
  const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
  const navLinks = document.querySelector('.nav-links');

  mobileMenuBtn.addEventListener('click', function () {
    navLinks.classList.toggle('active');
    this.setAttribute('aria-expanded', navLinks.classList.contains('active'));
  });

  document.addEventListener('click', function (event) {
    if (!navLinks.contains(event.target) && !mobileMenuBtn.contains(event.target)) {
      navLinks.classList.remove('active');
      mobileMenuBtn.setAttribute('aria-expanded', 'false');
    }
  });
});

// =========================
// Hero Carousel
// =========================
document.addEventListener('DOMContentLoaded', function () {
  const slides = document.querySelectorAll('.carousel-slide');
  const indicators = document.querySelectorAll('.indicator');
  const prevBtn = document.querySelector('.prev');
  const nextBtn = document.querySelector('.next');
  const carousel = document.querySelector('.hero-carousel');
  let currentSlide = 0;
  let slideInterval;

  function initCarousel() {
    slides[currentSlide].classList.add('active');
    indicators[currentSlide].classList.add('active');
    startCarousel();
  }

  function startCarousel() {
    slideInterval = setInterval(nextSlide, 5000);
  }

  function goToSlide(n) {
    slides[currentSlide].classList.remove('active');
    indicators[currentSlide].classList.remove('active');
    currentSlide = (n + slides.length) % slides.length;
    slides[currentSlide].classList.add('active');
    indicators[currentSlide].classList.add('active');
  }

  function nextSlide() {
    goToSlide(currentSlide + 1);
  }

  function prevSlide() {
    goToSlide(currentSlide - 1);
  }

  prevBtn.addEventListener('click', () => {
    prevSlide();
    resetInterval();
  });

  nextBtn.addEventListener('click', () => {
    nextSlide();
    resetInterval();
  });

  indicators.forEach((indicator, index) => {
    indicator.addEventListener('click', () => {
      goToSlide(index);
      resetInterval();
    });
  });

  function resetInterval() {
    clearInterval(slideInterval);
    startCarousel();
  }

  carousel.addEventListener('mouseenter', () => clearInterval(slideInterval));
  carousel.addEventListener('mouseleave', startCarousel);

  initCarousel();
});

// =========================
// Blog Posts Section
// =========================
const searchInput = document.getElementById("searchInput");
const searchBtn = document.getElementById("searchBtn");
const blogGrid = document.getElementById("blogGrid");
const loadMoreBtn = document.getElementById("loadMore");

let page = 1;
const shownHeadlines = new Set();
const topics = ["technology", "innovation", "design", "science", "apps", "education", "health", "business", "finance", "travel", "lifestyle"];
let currentTopicIndex = 0;

async function fetchBlogPosts() {
  loadMoreBtn.disabled = true;
  loadMoreBtn.textContent = "Loading...";

  try {
    const topic = topics[currentTopicIndex % topics.length];
    currentTopicIndex++;

    const now = new Date().toISOString();
    const response = await fetch(
      `https://gnews.io/api/v4/search?q=${topic}&to=${now}&lang=en&token=304c96b01f74b7d3ee4a38030fb787c9&max=6`
    );
    const data = await response.json();

    if (!data.articles || data.articles.length === 0) {
      loadMoreBtn.textContent = "No more posts";
      loadMoreBtn.disabled = true;
      return;
      behavior: 'smooth'
    }

    renderPosts(data.articles);
    loadMoreBtn.textContent = "Load more";
    loadMoreBtn.disabled = false;

  } catch (error) {
    console.error("Error fetching blog posts:", error);
    loadMoreBtn.textContent = "Failed to load";
    loadMoreBtn.disabled = false;
  }
}

function renderPosts(posts) {
  posts.forEach((post) => {
    if (shownHeadlines.has(post.title)) return;
    shownHeadlines.add(post.title);

    const card = document.createElement("div");
    card.className = "blog-card";

    card.innerHTML = `
      <img src="${post.image || 'https://via.placeholder.com/300x180'}" alt="${post.title}" />
      <div class="blog-content">
        <h3>${post.title}</h3>
        <p>${post.description || "No description available."}</p>
        <small>${post.source.name} • ${new Date(post.publishedAt).toLocaleDateString()}</small>
      </div>
    `;

    blogGrid.appendChild(card);
  });
}

// =========================
// Search Functionality
// =========================
searchBtn.addEventListener("click", () => {
  const query = searchInput.value.trim();
  if (!query) return;
  searchNews(query);
});

async function searchNews(query) {
  blogGrid.innerHTML = "";
  loadMoreBtn.innerText = "Searching...";
  loadMoreBtn.disabled = true;

  try {
    const res = await fetch(`https://gnews.io/api/v4/search?q=${encodeURIComponent(query)}&lang=en&token=304c96b01f74b7d3ee4a38030fb787c9&max=8`);
    const data = await res.json();
    shownHeadlines.clear();
    renderPosts(data.articles);
    loadMoreBtn.innerText = "Search again";
    loadMoreBtn.disabled = false;
  } catch (err) {
    console.error("Search error:", err);
    loadMoreBtn.innerText = "Error!";
    loadMoreBtn.disabled = false;
  }
}

// =========================
// Load More + Auto Refresh
// =========================
loadMoreBtn.addEventListener("click", () => {
  fetchBlogPosts();
});

fetchBlogPosts();

setInterval(() => {
  page = 1;
  loadMoreBtn.innerText = "Refreshing...";
  fetchBlogPosts();
}, 5 * 60 * 1000);
