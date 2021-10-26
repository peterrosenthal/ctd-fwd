import { addTestData, deleteTestData, getTestData, updateTestData } from './firestuff.js';

let data;

const main = document.querySelector('main');
const newItemButtonWrapper = document.querySelector('#new-item-button-wrapper');
const newItemButton = document.querySelector('#new-item-button');
newItemButton.addEventListener('click', () => {editItem(undefined, newItemButtonWrapper); });

// function to fill page with items
async function fillItems() {
  data = await getTestData();
  for (const item of data) {
    const itemWrapper = document.createElement('div');
    itemWrapper.classList.add('cms-entry');
    main.insertBefore(itemWrapper, newItemButtonWrapper);

    const textWrapper = document.createElement('div');
    textWrapper.style.width = '75%';
    itemWrapper.appendChild(textWrapper);

    const h2 = document.createElement('h2');
    h2.textContent = item.title;
    textWrapper.appendChild(h2);

    for (const paragraph of item.paragraphs) {
      const p = document.createElement('p');
      p.textContent = paragraph;
      textWrapper.appendChild(p);
    }
    
    const buttonsWrapper = document.createElement('div');
    buttonsWrapper.style.width = '20%';
    buttonsWrapper.style.display = 'flex';
    buttonsWrapper.style.flexFlow = 'column';
    buttonsWrapper.style.justifyContent = 'center';
    buttonsWrapper.style.alignItems = 'flex-end';
    itemWrapper.appendChild(buttonsWrapper);

    const editButton = document.createElement('button');
    editButton.type = 'button';
    editButton.textContent = 'Edit';
    // TODO: add function to event listener for editing an entry
    editButton.addEventListener('click', () => { editItem(item, itemWrapper); });
    buttonsWrapper.appendChild(editButton);

    const deleteButton = document.createElement('button');
    deleteButton.type = 'button';
    deleteButton.textContent = 'Delete';
    deleteButton.addEventListener('click', () => { deleteItem(item.id); });
    buttonsWrapper.appendChild(deleteButton);
  }
}
fillItems();

// function to clear page of items
function clearItems() {
  for (const item of document.querySelectorAll('.cms-entry')) {
    item.remove();
  }
}

// edit an existing (or new) item
async function editItem(item, before) {
  const isNew = (item === undefined || item === null);
  item = isNew ? {} : item;

  const form = document.createElement('form');
  main.insertBefore(form, before);
  before.remove();

  const title = {
    div: document.createElement('div'),
    label: document.createElement('label'),
    entry: document.createElement('input'),
  };
  title.div.className = 'title-wrapper';
  title.label.textContent = 'Title: ';
  title.label.htmlFor = 'title-entry';
  title.entry.id = 'title-entry';
  title.entry.type = 'text';
  if (!isNew) {
    title.entry.value = item.title;
  }
  title.entry.addEventListener('focusout', () => { item.title = title.entry.value; });
  title.div.appendChild(title.label);
  title.div.appendChild(title.entry);
  form.appendChild(title.div);

  const buttons = {
    div: document.createElement('div'),
    paragraph: document.createElement('button'),
    save: document.createElement('button'),
  };
  buttons.div.className = 'buttons-wrapper';
  buttons.paragraph.type = 'button';
  buttons.paragraph.id = 'new-paragraph-button';
  buttons.paragraph.textContent = 'Add paragraph';
  buttons.paragraph.addEventListener('click', () => { createParagraph(undefined); });
  buttons.save.type = 'button';
  buttons.save.id = 'save-entry-button';
  buttons.save.textContent = 'Save';
  buttons.save.addEventListener('click', saveItem);
  buttons.div.appendChild(buttons.paragraph);
  buttons.div.appendChild(buttons.save);
  form.appendChild(buttons.div);

  let paragraphIndex = 0;

  if (!isNew) {
    for (const paragraph of item.paragraphs) {
      createParagraph(paragraph);
    }
  }

  function createParagraph(value) {
    if (item.paragraphs === undefined) {
      item.paragraphs = [];
      paragraphIndex = 0;
    }
    if (paragraphIndex >= item.paragraphs.length) {
      item.paragraphs.push('');
    }
    const index = paragraphIndex;

    const paragraph = {
      div: document.createElement('div'),
      entry: document.createElement('textarea'),
    };
    paragraph.div.className = 'paragraph-wrapper';
    if (value !== undefined) {
      paragraph.entry.value = value;
    }
    paragraph.entry.addEventListener('focusout', () => {
      item.paragraphs[index] = paragraph.entry.value;
    });
    paragraph.div.appendChild(paragraph.entry);
    form.insertBefore(paragraph.div, buttons.div);

    paragraphIndex++;
  }

  async function saveItem() {
    if (isNew) {
      await addTestData(item);
      form.remove();
      main.appendChild(before);
    } else {
      const id = item.id;
      const newItem = {
        title: item.title,
        paragraphs: item.paragraphs,
      };
      await updateTestData(id, newItem);
      form.remove();
    }
    clearItems();
    fillItems();
  }
}

async function deleteItem(id) {
  await deleteTestData(id);
  clearItems();
  fillItems();
}
