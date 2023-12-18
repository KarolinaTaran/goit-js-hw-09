const form = document.querySelector('.feedback-form');
let formData = JSON.parse(localStorage.getItem('feedback-form-state')) || {};

form.addEventListener('input', event => {
  if (
    (event.target.nodeName === 'INPUT' && event.target.type === 'email') ||
    event.target.nodeName === 'TEXTAREA'
  ) {
    formData[event.target.name] = event.target.value.trim();
    localStorage.setItem('feedback-form-state', JSON.stringify(formData));
  }
});

form.addEventListener('submit', event => {
  event.preventDefault();

  const emailInput = document.querySelector('input[name="email"]');
  emailInput.value = formData.email || '';

  const otherInputs = document.querySelectorAll('input:not([name="email"])');
  otherInputs.forEach(input => {
    input.value = formData[input.name] || '';
  });

  let isFormValid = true;
  for (let key in formData) {
    if (!formData[key]) {
      isFormValid = false;
      break;
    }
  }

  if (isFormValid) {
    console.log(formData);
    localStorage.removeItem('feedback-form-state');
    form.reset();
  }
});
