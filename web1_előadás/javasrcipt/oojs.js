class Task {
    constructor(szoveg) {
      this.szoveg = szoveg;
      this.elem = null;
    }

    megjelenit(container) {
      const div = document.createElement('div');
      div.className = 'task';

      const szovegElem = document.createElement('span');
      szovegElem.textContent = this.szoveg;

      const gombok = document.createElement('div');
      gombok.className = 'btn-group';

      const keszBtn = document.createElement('button');
      keszBtn.textContent = 'Kész';
      keszBtn.className = 'keszGomb';
      keszBtn.addEventListener('click', () => this.kesz());

      const torlesBtn = document.createElement('button');
      torlesBtn.textContent = 'Törlés';
      keszBtn.className = 'torlesGomb';
      torlesBtn.addEventListener('click', () => this.torol());

      gombok.appendChild(keszBtn);
      gombok.appendChild(torlesBtn);

      div.appendChild(szovegElem);
      div.appendChild(gombok);

      container.appendChild(div);
      this.elem = div;
    }

    kesz() {
      this.elem.classList.toggle('done');
    }

    torol() {
      this.elem.remove();
    }
  }

  class FontosTask extends Task {
    constructor(szoveg) {
      super(szoveg);
    }

    megjelenit(container) {
      super.megjelenit(container);
      this.elem.classList.add('important');
    }
  }

  class ToDoList {
    constructor(containerId) {
      this.container = document.getElementById(containerId);
      this.feladatok = [];
    }

    hozzaad(task) {
      this.feladatok.push(task);
      task.megjelenit(this.container);
    }
  }

  const lista = new ToDoList('taskContainer');

  document.getElementById('addTask').addEventListener('click', () => {
    const input = document.getElementById('taskInput');
    if (input.value.trim() !== '') {
      const task = new Task(input.value.trim());
      lista.hozzaad(task);
      input.value = '';
    }
  });

  document.getElementById('addImportantTask').addEventListener('click', () => {
    const input = document.getElementById('taskInput');
    if (input.value.trim() !== '') {
      const fontos = new FontosTask(input.value.trim());
      lista.hozzaad(fontos);
      input.value = '';
    }
  });