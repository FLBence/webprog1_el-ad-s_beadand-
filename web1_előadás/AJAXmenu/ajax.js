const url = "http://gamf.nhely.hu/ajax2/";
const code = "OWUPUOuzb123";

document.addEventListener("DOMContentLoaded", () => {
    loadData();
    setupForm();
});

async function sendRequest(params) {
    const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({ code, ...params }).toString()
    });

    if (!response.ok) throw new Error("Szerverhiba!");
    return await response.json();
}

async function loadData() {
    try {
        const data = await sendRequest({ op: "read" });
        renderTable(data.list);
        displayStatus(data.rowCount, data.maxNum);
    } catch (err) {
        console.error(err);
        alert("Nem sikerült betölteni az adatokat!");
    }
}

function renderTable(records) {
    const content = document.querySelector(".mainSect");
    content.innerHTML = "<h2>Adatok</h2>";

    const table = document.createElement("table");
    table.innerHTML = `
        <tr>
            <th>ID</th>
            <th>Név</th>
            <th>Magasság</th>
            <th>Súly</th>
            <th>Műveletek</th>
        </tr>
    `;

    records.forEach(({ id, name, height, weight }) => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${id}</td>
            <td>${name}</td>
            <td>${height}</td>
            <td>${weight}</td>
            <td>
                <button data-edit="${id}">Szerkesztés</button>
                <button data-delete="${id}">Törlés</button>
            </td>
        `;
        table.appendChild(row);
    });

    content.appendChild(table);

    table.querySelectorAll("[data-edit]").forEach(btn =>
        btn.addEventListener("click", () => editRecord(btn.dataset.edit))
    );
    table.querySelectorAll("[data-delete]").forEach(btn =>
        btn.addEventListener("click", () => deleteRecord(btn.dataset.delete))
    );
}

function displayStatus(rowCount, maxNum) {
    const container = document.querySelector(".mainSect");
    let status = document.getElementById("status");

    if (!status) {
        status = document.createElement("div");
        status.id = "status";
        status.style.marginBottom = "10px";
        container.prepend(status);
    }

    status.innerHTML = `<p><strong>Rekordok száma:</strong> ${rowCount} / ${maxNum}</p>`;
}

function setupForm() {
    const container = document.querySelector("#addUser");
    const form = document.createElement("form");
    form.id = "dataForm";

    form.innerHTML = `
        <input type="hidden" id="recordId">
        <input type="text" id="name" placeholder="Név" required>
        <input type="number" id="height" placeholder="Magasság" min="1" required>
        <input type="number" id="weight" placeholder="Súly" min="1" required>
        <button type="submit" id="submitBtn">Hozzáadás</button>
        <button type="button" id="cancelBtn" style="display:none">Mégse</button>
    `;

    form.addEventListener("submit", async (e) => {
        e.preventDefault();

        const id = document.getElementById("recordId").value;
        const name = document.getElementById("name").value;
        const height = document.getElementById("height").value;
        const weight = document.getElementById("weight").value;

        if (id) {
            await updateRecord({ id, name, height, weight });
        } else {
            await createRecord({ name, height, weight });
        }

        resetForm();
        await loadData();
    });

    form.querySelector("#cancelBtn").addEventListener("click", resetForm);
    container.appendChild(form);
}

function resetForm() {
    const form = document.getElementById("dataForm");
    form.reset();
    form.recordId.value = "";
    form.submitBtn.textContent = "Hozzáadás";
    form.cancelBtn.style.display = "none";
}

async function editRecord(id) {
    try {
        const data = await sendRequest({ op: "read" });
        const record = data.list.find(item => item.id == id);

        if (record) {
            const form = document.getElementById("dataForm");
            form.recordId.value = record.id;
            form.name.value = record.name;
            form.height.value = record.height;
            form.weight.value = record.weight;
            form.submitBtn.textContent = "Frissítés";
            form.cancelBtn.style.display = "inline-block";
        }
    } catch (err) {
        console.error(err);
        alert("Nem sikerült betölteni a rekordot szerkesztéshez!");
    }
}

async function createRecord({ name, height, weight }) {
    try {
        await sendRequest({ op: "create", name, height, weight });
        alert("Rekord sikeresen létrehozva!");
    } catch (err) {
        console.error(err);
        alert("Hiba történt létrehozáskor!");
    }
}

async function updateRecord({ id, name, height, weight }) {
    try {
        await sendRequest({ op: "update", id, name, height, weight });
        alert("Rekord sikeresen frissítve!");
    } catch (err) {
        console.error(err);
        alert("Hiba történt frissítéskor!");
    }
}

async function deleteRecord(id) {
    if (!confirm("Biztosan törlöd ezt a rekordot?")) return;

    try {
        await sendRequest({ op: "delete", id });
        alert("Rekord sikeresen törölve!");
        await loadData();
    } catch (err) {
        console.error(err);
        alert("Hiba történt törléskor!");
    }
}
