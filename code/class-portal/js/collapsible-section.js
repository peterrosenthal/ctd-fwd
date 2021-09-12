// progressively turn lab/project entries into (hopefully accessible) collapsible/expandable
// sections so that if the user doesn't have js enabled, the content isn't just hidden, but
// it's more fun if js is enabled of course :)
// written based on what I've learned from Heydon of the blog 'Inclusive Components' an
// amazing resource that I learned about in ATLS 3519 - Universal Design
// https://inclusive-components.design/

const headings = document.querySelectorAll('section h2');

headings.forEach((heading) => {
  heading.innerHTML = `<button aria-expanded="false">${heading.textContent}</button>`;
  const infoContainer = heading.parentNode.querySelector('.infoContainer');
  infoContainer.style.display = 'none';
  const button = heading.querySelector('button');
  button.addEventListener('click', () => {
    let expanded = false;
    if (button.getAttribute('aria-expanded') === 'true') {
      expanded = true;
      infoContainer.style.display = 'none';
    } else {
      infoContainer.style.display = 'flex';
    }
    button.setAttribute('aria-expanded', !expanded);
  });
});