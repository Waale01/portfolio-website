if ('scrollRestoration' in history) {
  history.scrollRestoration = 'manual';
}
window.scrollTo(0, 0);

const form = document.getElementById('contact-form');
const statusMessage = document.getElementById('form-status');

form.addEventListener('submit', async function (event) {
  event.preventDefault();

  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const message = document.getElementById('message').value;
  const company = document.getElementById('company').value;

  statusMessage.textContent = 'Sending...';
  statusMessage.style.color = '#555';

  try {
    const response = await fetch('https://portfolio-website-kjh5.onrender.com/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name, email, message, company })
    });

    const data = await response.json();

    if (response.ok) {
      statusMessage.textContent = 'Thanks, ' + name + '! Your message has been sent.';
      statusMessage.style.color = '#2c3e50';
      form.reset();
    } else {
      statusMessage.textContent = data.error || 'Something went wrong.';
      statusMessage.style.color = '#c0392b';
    }
  } catch (error) {
    console.error(error);
    statusMessage.textContent = 'Could not connect to the server. Please try again later.';
    statusMessage.style.color = '#c0392b';
  }
});

const fadeElements = document.querySelectorAll('.fade-in');

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.15 });

fadeElements.forEach(el => observer.observe(el));
const readMoreButtons = document.querySelectorAll('.read-more-btn');

readMoreButtons.forEach(button => {
  button.addEventListener('click', () => {
    const card = button.closest('.project-card');
    card.classList.toggle('expanded');
    button.textContent = card.classList.contains('expanded') ? 'Show less' : 'Read more';
  });
});

const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('nav-links');

hamburger.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('open');
  hamburger.classList.toggle('open', isOpen);
  hamburger.setAttribute('aria-expanded', isOpen);
});

navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    hamburger.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
  });
});