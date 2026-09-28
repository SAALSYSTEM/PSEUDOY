(() => {
  const section = document.querySelector('[data-product-preview]');
  if (!section) return;

  const columns = {
    kunde: {
      title: 'Kundenname',
      type: 'Text',
      action: 'Pseudonymisieren',
      input: 'Anna Müller',
      output: 'Kunde_001Y',
      index: 2
    },
    email: {
      title: 'E-Mail-Adresse',
      type: 'E-Mail',
      action: 'Maskieren',
      input: 'anna.mueller@mail.de',
      output: 'Mail_001Y@example.invalid',
      index: 3
    },
    datum: {
      title: 'Geburtsdatum',
      type: 'Datum',
      action: 'Generalisieren',
      input: '03.06.1990',
      output: '30–39 Jahre',
      index: 4
    },
    umsatz: {
      title: 'Umsatz',
      type: 'Zahl',
      action: 'Skalieren',
      input: '10.000 €',
      output: '20,0',
      index: 5
    }
  };

  const buttons = [...section.querySelectorAll('[data-column]')];
  const title = section.querySelector('[data-rule-title]');
  const type = section.querySelector('[data-rule-type]');
  const action = section.querySelector('[data-rule-action]');
  const input = section.querySelector('[data-rule-input]');
  const output = section.querySelector('[data-rule-output]');
  const rows = [...section.querySelectorAll('.demo-row:not(.demo-head)')];

  function selectColumn(key) {
    const data = columns[key];
    if (!data) return;

    buttons.forEach(btn => btn.classList.toggle('is-selected', btn.dataset.column === key));

    rows.forEach(row => {
      [...row.children].forEach((cell, i) => cell.classList.toggle('selected-cell', i === data.index));
    });

    if (title) title.textContent = data.title;
    if (type) type.textContent = data.type;
    if (action) action.textContent = data.action;
    if (input) input.textContent = data.input;
    if (output) output.textContent = data.output;
  }

  buttons.forEach(btn => btn.addEventListener('click', () => selectColumn(btn.dataset.column)));
  selectColumn('email');
})();
