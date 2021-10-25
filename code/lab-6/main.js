import { addTestData, getTestData } from './firestuff.js';

const main = document.querySelector('main');
const newItemButton = document.querySelector('#new-item-button');

let data;

// function to fill page with items
async function fillItems() {
  data = await getTestData();
  for (const item of data) {
    const div = document.createElement('div');
    div.classList.add('cms-entry');
    main.insertBefore(div, newItemButton);

    const h2 = document.createElement('h2');
    h2.textContent = item.title;
    div.appendChild(h2);

    for (const paragraph of item.paragraphs) {
      const p = document.createElement('p');
      p.textContent = paragraph;
      div.appendChild(p);
    }
  }
}
fillItems();

// function to clear page of items
function clearItems() {
  for (const item of document.querySelectorAll('.cms-entry')) {
    item.remove();
  }
}

// add new item
async function createItem() {
  const item = {};

  newItemButton.remove();
  const form = document.createElement('form');
  main.appendChild(form);

  const title = {
    div: document.createElement('div'),
    label: document.createElement('label'),
    entry: document.createElement('input'),
  };
  title.div.style.display = 'flex';
  title.div.style.flexFlow = 'row';
  title.div.style.justifyContent = 'safe center';
  title.div.style.alignContent = 'center';
  title.label.textContent = 'Title: ';
  title.label.htmlFor = 'title-entry';
  title.entry.id = 'title-entry';
  title.entry.type = 'text';
  title.entry.addEventListener('focusout', () => { item.title = title.entry.value; });
  title.div.appendChild(title.label);
  title.div.appendChild(title.entry);
  form.appendChild(title.div);

  const buttons = {
    div: document.createElement('div'),
    paragraph: document.createElement('button'),
    save: document.createElement('button'),
  };
  buttons.div.style.display = 'flex';
  buttons.div.style.flexFlow = 'row';
  buttons.div.style.justifyContent = 'safe center';
  buttons.div.style.alignContent = 'center';
  buttons.paragraph.type = 'button';
  buttons.paragraph.id = 'new-paragraph-button';
  buttons.paragraph.textContent = 'Add paragraph';
  buttons.paragraph.addEventListener('click', createParagraph);
  buttons.save.type = 'button';
  buttons.save.id = 'save-entry-button';
  buttons.save.textContent = 'Save';
  buttons.save.addEventListener('click', saveItem);
  buttons.div.appendChild(buttons.paragraph);
  buttons.div.appendChild(buttons.save);
  form.appendChild(buttons.div);

  function createParagraph() {
    let index;
    if (item.paragraphs === undefined) {
      item.paragraphs = [];
      index = 0;
    } else {
      index = item.paragraphs.length;
    }
    item.paragraphs.push('');

    const div = document.createElement('div');
    const paragraph = document.createElement('textarea');
    paragraph.addEventListener('focusout', () => {
      item.paragraphs[index] = paragraph.value;
    });
    div.appendChild(paragraph);
    form.insertBefore(div, buttons.div);
  }

  async function saveItem() {
    await addTestData(item);
    form.remove();
    main.appendChild(newItemButton);
    clearItems();
    fillItems();
  }
}
newItemButton.addEventListener('click', createItem);
