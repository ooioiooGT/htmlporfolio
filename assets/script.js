// Keep the footer current. All content and navigation work without JavaScript.
document.querySelectorAll('[data-year]').forEach((element) => {
  element.textContent = new Date().getFullYear();
});
