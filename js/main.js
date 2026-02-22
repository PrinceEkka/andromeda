// Scroll reveal
document.addEventListener('DOMContentLoaded', () => {
  const reveals = document.querySelectorAll('.reveal');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08 });
  reveals.forEach(el => observer.observe(el));
});

// Show notification
function showNotification(msg = "Request submitted! We'll contact you shortly.") {
  let n = document.querySelector('.notification');
  if (!n) {
    n = document.createElement('div');
    n.className = 'notification';
    document.body.appendChild(n);
  }
  n.textContent = msg;
  n.classList.add('show');
  setTimeout(() => n.classList.remove('show'), 4000);
}

// Handle all quote forms
document.addEventListener('submit', function(e) {
  e.preventDefault();
  const btn = e.target.querySelector('button[type="submit"]');
  if (btn) {
    const orig = btn.textContent;
    btn.textContent = '✓ Sent Successfully!';
    btn.style.opacity = '0.7';
    btn.disabled = true;
    setTimeout(() => {
      btn.textContent = orig;
      btn.style.opacity = '';
      btn.disabled = false;
      e.target.reset();
    }, 3000);
  }
  showNotification("✓ Quote request received! Our team will reach out within 24 hours.");
});

// Type card selection
document.addEventListener('click', function(e) {
  const card = e.target.closest('.type-card');
  if (card) {
    document.querySelectorAll('.type-card').forEach(c => c.classList.remove('selected'));
    card.classList.add('selected');
    // Scroll to pricing
    const pricing = document.getElementById('pricing');
    if (pricing) {
      pricing.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
});

// Pricing CTA buttons
document.addEventListener('click', function(e) {
  const btn = e.target.closest('.pricing-select-btn');
  if (btn) {
    const plan = btn.dataset.plan;
    const quote = document.getElementById('quote');
    if (quote) {
      quote.scrollIntoView({ behavior: 'smooth' });
      const planInput = quote.querySelector('[name="selected_plan"]');
      if (planInput) planInput.value = plan;
    }
  }
});
