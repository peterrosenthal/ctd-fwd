// progressively turn lab/project entries into (hopefully accessible) collapsible/expandable
// sections so that if the user doesn't have js enabled, the content isn't just hidden, but
// it's more fun if js is enabled of course :)
// written based on what I've learned from Heydon of the blog 'Inclusive Components' an
// amazing resource that I learned about in ATLS 3519 - Universal Design
// https://inclusive-components.design/

const createCollapsibleSection = (heading) => {
  heading.innerHTML =
    `<button aria-expanded="false">
      ${heading.textContent}
      <svg aria-hidden="true" focusable="false" viewBox="0 0 10 10">
        <line class="verticalSvgStrut" x1="5" y1="1" x2="5" y2="9"
          stroke-linecap="round" stroke-width="2" stroke="#2d2d2e" />
        <line x1="1" y1="5" x2="9" y2="5"
          stroke-linecap="round" stroke-width="2" stroke="#2d2d2e" />
      </svg>
    </button>`;
  
  const button = heading.querySelector('button');
  const parentSection = heading.parentElement;
  const infoContainer = parentSection.querySelector('.infoContainer');
  const verticalSvgStrut = button.querySelector('.verticalSvgStrut');

  const setParentSectionStyle = (background, foreground) => {
    parentSection.style.background = background;
    parentSection.style.color = foreground;
    button.querySelector('svg').querySelectorAll('line').forEach((line) => {
      line.style.stroke = foreground;
    });
  };
  const fillSectionColor = () => {
    if (parentSection.className == 'labsSection') {
      setParentSectionStyle('#936194', 'white');
    } else if (parentSection.className == 'projectsSection') {
      setParentSectionStyle('#ee7b30', 'white');
    }
  };
  const fillSectionWhite = () => {
    setParentSectionStyle('none', '#2d2d2e');
  }
  const enableHoverEffects = () => {
    parentSection.addEventListener('mouseenter', fillSectionColor);
    parentSection.addEventListener('mouseleave', fillSectionWhite);
  };
  const disableHoverEffects = () => {
    parentSection.removeEventListener('mouseenter', fillSectionColor);
    parentSection.removeEventListener('mouseleave', fillSectionWhite);
  };
  const expandSection = () => {
    button.setAttribute('aria-expanded', true);
    fillSectionColor();
    disableHoverEffects();
    infoContainer.style.display = 'flex';
    verticalSvgStrut.style.display = 'none';
  };
  const collapseSection = () => {
    button.setAttribute('aria-expanded', false);
    fillSectionWhite();
    enableHoverEffects();
    infoContainer.style.display = 'none';
    verticalSvgStrut.style.display = 'inline';
  };

  collapseSection();
  button.addEventListener('click', () => {
    if (button.getAttribute('aria-expanded') == 'true') {
      collapseSection();
    } else {
      expandSection();
    }
  });
};

const headings = document.querySelectorAll('section h2');
headings.forEach((heading) => {createCollapsibleSection(heading)});