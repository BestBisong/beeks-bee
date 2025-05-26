// website designed By Bisong Best
//     contact info +234 814 0683 459
//     email  bestbisong32@gmail.com



// Dark Mode Toggle Functionality
const darkModeToggle = document.getElementById('darkModeToggle');
const theme = localStorage.getItem('theme');

// Check if dark mode is enabled in localStorage
if (theme === 'dark') {
  document.documentElement.setAttribute('data-theme', 'dark');
  darkModeToggle.innerHTML = '<i class="fas fa-sun"></i>';
}

// Toggle dark/light mode
darkModeToggle.addEventListener('click', () => {
  const currentTheme = document.documentElement.getAttribute('data-theme');
  
  if (currentTheme === 'dark') {
    document.documentElement.removeAttribute('data-theme');
    localStorage.setItem('theme', 'light');
    darkModeToggle.innerHTML = '<i class="fas fa-moon"></i>';
  } else {
    document.documentElement.setAttribute('data-theme', 'dark');
    localStorage.setItem('theme', 'dark');
    darkModeToggle.innerHTML = '<i class="fas fa-sun"></i>';
  }
});

// Mobile Menu Toggle
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const mobileNav = document.createElement('div');
mobileNav.className = 'mobile-nav';
mobileNav.innerHTML = `
  <div class="mobile-nav-header">
    <div class="logo">
      <h1>Bekks&Bee<span>Construction</span></h1>
    </div>
    <button class="close-mobile-nav" aria-label="Close menu">
      <i class="fas fa-times"></i>
    </button>
  </div>
  <div class="mobile-nav-content">
    <ul>
      <li><a href="#hero">Home</a></li>
      <li><a href="about.html">About Us</a></li>
      <li><a href="#services">Services</a></li>
      <li><a href="#projects">Projects</a></li>
      <li><a href="#expertise">Expertise</a></li>
      <li><a href="#contact">Contact</a></li>
    </ul>
  </div>
  <div class="mobile-nav-footer">
    <div class="social-links">
      <a href="#" aria-label="LinkedIn"><i class="fab fa-linkedin"></i></a>
      <a href="#" aria-label="Twitter"><i class="fab fa-twitter"></i></a>
      <a href="#" aria-label="Facebook"><i class="fab fa-facebook"></i></a>
      <a href="#" aria-label="Instagram"><i class="fab fa-instagram"></i></a>
    </div>
  </div>
`;

const overlay = document.createElement('div');
overlay.className = 'overlay';

document.body.appendChild(mobileNav);
document.body.appendChild(overlay);

mobileMenuBtn.addEventListener('click', () => {
  mobileNav.classList.add('active');
  overlay.classList.add('active');
  document.body.style.overflow = 'hidden';
});

document.querySelector('.close-mobile-nav').addEventListener('click', () => {
  mobileNav.classList.remove('active');
  overlay.classList.remove('active');
  document.body.style.overflow = '';
});

overlay.addEventListener('click', () => {
  mobileNav.classList.remove('active');
  overlay.classList.remove('active');
  document.body.style.overflow = '';
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    
    const targetId = this.getAttribute('href');
    const targetElement = document.querySelector(targetId);
    
    if (targetElement) {
      window.scrollTo({
        top: targetElement.offsetTop - 80,
        behavior: 'smooth'
      });
      
      // Close mobile menu if open
      mobileNav.classList.remove('active');
      overlay.classList.remove('active');
      document.body.style.overflow = '';
    }
  });
});

// Header scroll effect
window.addEventListener('scroll', () => {
  const header = document.querySelector('header');
  if (window.scrollY > 50) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
});

// Animate stats counter
function animateStats() {
  const statElements = document.querySelectorAll('.stat-number');
  const speed = 200;
  
  statElements.forEach(stat => {
    const target = parseInt(stat.getAttribute('data-count'));
    const count = parseInt(stat.textContent);
    const increment = target / speed;
    
    if (count < target) {
      stat.textContent = Math.ceil(count + increment);
      setTimeout(animateStats, 1);
    } else {
      stat.textContent = target;
    }
  });
}

// Intersection Observer for animations
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      if (entry.target.classList.contains('stats-container')) {
        animateStats();
      }
      entry.target.classList.add('animate-fadeInUp');
      observer.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.1
});

document.querySelectorAll('.fade-in').forEach(el => {
  observer.observe(el);
});


let currentTestimonial = 0;
const testimonials = document.querySelectorAll('.testimonial-item');
const dots = document.querySelectorAll('.dot');

function showTestimonial(index) {
  testimonials.forEach(testimonial => testimonial.classList.remove('active'));
  dots.forEach(dot => dot.classList.remove('active'));
  
  testimonials[index].classList.add('active');
  dots[index].classList.add('active');
  currentTestimonial = index;
}

dots.forEach((dot, index) => {
  dot.addEventListener('click', () => showTestimonial(index));
});

document.querySelector('.testimonial-btn.prev').addEventListener('click', () => {
  currentTestimonial = (currentTestimonial - 1 + testimonials.length) % testimonials.length;
  showTestimonial(currentTestimonial);
});

document.querySelector('.testimonial-btn.next').addEventListener('click', () => {
  currentTestimonial = (currentTestimonial + 1) % testimonials.length;
  showTestimonial(currentTestimonial);
});

// Auto-rotate testimonials
setInterval(() => {
  currentTestimonial = (currentTestimonial + 1) % testimonials.length;
  showTestimonial(currentTestimonial);
}, 5000);

// Tab functionality
const tabButtons = document.querySelectorAll('.tab-btn');
const tabContents = document.querySelectorAll('.tab-content');

tabButtons.forEach(button => {
  button.addEventListener('click', () => {
    const tabId = button.getAttribute('data-tab');
    
    tabButtons.forEach(btn => btn.classList.remove('active'));
    tabContents.forEach(content => content.classList.remove('active'));
    
    button.classList.add('active');
    document.getElementById(tabId).classList.add('active');
  });
});

// Project filter functionality
const filterButtons = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterButtons.forEach(button => {
  button.addEventListener('click', () => {
    const filter = button.getAttribute('data-filter');
    
    filterButtons.forEach(btn => btn.classList.remove('active'));
    button.classList.add('active');
    
    projectCards.forEach(card => {
      if (filter === 'all' || card.getAttribute('data-category') === filter) {
        card.style.display = 'block';
      } else {
        card.style.display = 'none';
      }
    });
  });
});
