document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('contactForm');
  const button = document.getElementById('button');
  const warning = document.getElementById('form-message-warning');
  const success = document.getElementById('form-message-success');

  if (!form || !button || !warning || !success) return;

  const showEmailFallback = () => {
    const formData = new FormData(form);
    const subject = formData.get('subject');
    const body = [
      `Name: ${formData.get('from_name')}`,
      `Email: ${formData.get('from_email')}`,
      '',
      formData.get('message')
    ].join('\n');
    const link = document.createElement('a');

    link.href = `mailto:skandar.allouche@enis.tn?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    link.textContent = 'Send your message by email';
    warning.replaceChildren(
      document.createTextNode('The online form is unavailable. '),
      link
    );
    warning.style.display = 'block';
  };

  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    warning.style.display = 'none';
    success.style.display = 'none';
    button.disabled = true;
    button.value = 'Sending...';

    try {
      if (!window.emailjs) throw new Error('Email service unavailable');

      window.emailjs.init('iwpsYR0GjetoLk6Hq');
      await window.emailjs.sendForm('service_nnef1n5', 'template_i6gajwq', form);
      success.style.display = 'block';
      form.reset();
    } catch (error) {
      showEmailFallback();
    } finally {
      button.disabled = false;
      button.value = 'Send Message';
    }
  });
});