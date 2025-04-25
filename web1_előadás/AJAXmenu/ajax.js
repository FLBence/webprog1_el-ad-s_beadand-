const apiUrl = "http://gamf.nhely.hu/ajax2/";
const code = "OWUPUOuzb123"; 

const $ = id => document.getElementById(id);

const postData = data =>
  fetch(apiUrl, {
    method: "POST",
    body: new URLSearchParams({ ...data, code: code })
  });

const validateInputs = (...inputs) =>
  inputs.every(i => i.trim() !== "" && i.length <= 30);

function readData() {
  postData({ op: "read" })
    .then(res => res.json())
    .then(data => {
      const container = $("data");
      container.innerHTML = "";
      const heights = data.list.map(item => {
        container.innerHTML += `ID: ${item.id}, Név: ${item.name}, Magasság: ${item.height}, Súly: ${item.weight}<br>`;
        return parseInt(item.height);
      });

      const sum = heights.reduce((a, b) => a + b, 0);
      const avg = sum / heights.length;
      const max = Math.max(...heights);
      $("stat").innerHTML = `<br>Magasságok összege: ${sum}, átlaga: ${avg.toFixed(2)}, legnagyobb: ${max}`;
    });
}

function createData() {
  const name = $("createName").value;
  const height = $("createHeight").value;
  const weight = $("createWeight").value;

  if (!validateInputs(name, height, weight)) {
    $("createMsg").innerText = "Hiba! Nem jó a bevitel!";
    return;
  }

  postData({ op: "create", name, height, weight })
    .then(res => res.text())
    .then(result => {
      $("createMsg").innerText = `Válasz: ${result}`;
      readData();
    });
}

function getDataForId() {
  const id = $("updateId").value;

  postData({ op: "read" })
    .then(res => res.json())
    .then(data => {
      const item = data.list.find(i => i.id.toString() === id);
      if (item) {
        $("updateName").value = item.name;
        $("updateHeight").value = item.height;
        $("updateWeight").value = item.weight;
      } else {
        alert("Nincs ilyen ID!");
      }
    });
}

function updateData() {
  const id = $("updateId").value;
  const name = $("updateName").value;
  const height = $("updateHeight").value;
  const weight = $("updateWeight").value;

  if (!validateInputs(name, height, weight)) {
    $("updateMsg").innerText = "Hiba! Nem jó a bevitel!";
    return;
  }

  postData({ op: "update", id, name, height, weight })
    .then(res => res.text())
    .then(result => {
      $("updateMsg").innerText = `Válasz: ${result}`;
      readData();
    });
}

function deleteData() {
  const id = $("deleteId").value;

  postData({ op: "delete", id })
    .then(res => res.text())
    .then(result => {
      $("deleteMsg").innerText = `Válasz: ${result}`;
      readData();
    });
}