const form = document.getElementById('contact-form');
const statusMessage = document.getElementById('form-status');

form.addEventListener('submit', async function (event) {
  event.preventDefault();

  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const message = document.getElementById('message').value;

  statusMessage.textContent = 'Sending...';
  statusMessage.style.color = '#555';

  try {
    const response = await fetch('http://localhost:3000/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name, email, message })
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