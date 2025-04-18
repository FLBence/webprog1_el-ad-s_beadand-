const apiUrl = "http://gamf.nhely.hu/ajax2/";
const code = "OWUPUOuzb123"; 

document.addEventListener("DOMContentLoaded", () => {
  loadData();
  document.getElementById("createBtn").addEventListener("click", createRecord);
  document.getElementById("updateBtn").addEventListener("click", updateRecord);
  document.getElementById("deleteBtn").addEventListener("click", deleteRecord);
  document.getElementById("getByIdBtn").addEventListener("click", getDataById);
});

function sendRequest(params) {
  return fetch(apiUrl, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({ code, ...params }).toString()
  }).then(res => {
    if (!res.ok) throw new Error("Hálózati hiba!");
    return res.json();
  });
}

function showMessage(msg, isError = false) {
  const fb = document.getElementById("feedback");
  fb.textContent = msg;
  fb.className = isError ? "msg error" : "msg";
}

function validateInput(name) {
  if (!name || name.trim() === "") {
    showMessage("A név mező nem lehet üres!", true);
    return false;
  }
  if (name.length > 30) {
    showMessage("A név túl hosszú! (max 30 karakter)", true);
    return false;
  }
  return true;
}

async function loadData() {
  try {
    const res = await sendRequest({ op: "read" });
    renderData(res.list);
    renderHeightStats(res.list);
  } catch (err) {
    showMessage("Nem sikerült betölteni az adatokat!", true);
  }
}

function renderData(data) {
    const tableBody = document.getElementById("dataList");
    tableBody.innerHTML = "";
  
    data.forEach(item => {
      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td>${item.id}</td>
        <td>${item.name}</td>
        <td>${item.height}</td>
        <td>${item.weight}</td>
      `;
      tableBody.appendChild(tr);
    });
  }

  function renderHeightStats(data) {
    if (!data.length) return;
  
    const heightSum = data.reduce((sum, item) => sum + Number(item.height), 0);
    const maxHeight = Math.max(...data.map(item => Number(item.height)));
    const avgHeight = (heightSum / data.length).toFixed(2);
  
    const statsEl = document.getElementById("heightStats");
    statsEl.innerHTML = `
      <strong>Magasság statisztika</strong><br>
      Összeg: ${heightSum}, Átlag: ${avgHeight}, Legnagyobb: ${maxHeight}
    `;
  }

async function createRecord() {
  const name = document.getElementById("name").value;
  const height = document.getElementById("height").value;
  const weight = document.getElementById("weight").value;

  if (!validateInput(name)) return;

  try {
    await sendRequest({ op: "create", name, height, weight });
    showMessage("Sikeresen hozzáadva!");
    loadData();
  } catch {
    showMessage("Hiba történt létrehozáskor!", true);
  }
}

async function updateRecord() {
  const id = document.getElementById("id").value;
  const name = document.getElementById("name").value;
  const height = document.getElementById("height").value;
  const weight = document.getElementById("weight").value;

  if (!id || !validateInput(name)) return;

  try {
    await sendRequest({ op: "update", id, name, height, weight });
    showMessage("Sikeres frissítés!");
    loadData();
  } catch {
    showMessage("Hiba frissítéskor!", true);
  }
}

async function deleteRecord() {
  const id = document.getElementById("id").value;
  if (!id) {
    showMessage("Adj meg ID-t a törléshez!", true);
    return;
  }

  if (!confirm("Biztosan törlöd ezt a rekordot?")) return;

  try {
    await sendRequest({ op: "delete", id });
    showMessage("Sikeres törlés!");
    loadData();
  } catch {
    showMessage("Hiba történt törléskor!", true);
  }
}

async function getDataById() {
  const id = document.getElementById("id").value;
  if (!id) return showMessage("Adj meg egy ID-t!", true);

  try {
    const res = await sendRequest({ op: "read" });
    const record = res.list.find(r => r.id == id);

    if (!record) return showMessage("Nincs ilyen ID!", true);

    document.getElementById("name").value = record.name;
    document.getElementById("height").value = record.height;
    document.getElementById("weight").value = record.weight;

    showMessage("Adatok betöltve módosításhoz.");
  } catch {
    showMessage("Hiba történt lekérdezéskor!", true);
  }
}
