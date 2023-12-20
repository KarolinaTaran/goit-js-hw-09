const form = document.querySelector('.feedback-form');
let formData = JSON.parse(localStorage.getItem('feedback-form-state')) || {};
const emailInput = document.querySelector('input[name="email"]');
const messageInput = document.querySelector('textarea[name="message"]');

window.addEventListener('load', () => {
  const { email, message } = formData;
  if (email || message) {
    emailInput.value = email || '';
    messageInput.value = message || '';
  }
});

form.addEventListener('input', event => {
  formData[event.target.name] = event.target.value.trim();
  localStorage.setItem('feedback-form-state', JSON.stringify(formData));
});

form.addEventListener('submit', event => {
  event.preventDefault();

  const { email, message } = formData;
  emailInput.value = email || '';
  messageInput.value = message || '';

  const isFormValid = Object.values(formData).some(
    value => value.trim() !== ''
  );
  console.log(isFormValid);
  if (!isFormValid) {
    alert('Fill in all fields');
  } else {
    console.log(formData);
    formData = {};
    localStorage.removeItem('feedback-form-state');
    form.reset();
  }
});
