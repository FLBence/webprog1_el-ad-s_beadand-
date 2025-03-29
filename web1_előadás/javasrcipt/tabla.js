document.addEventListener("DOMContentLoaded", function () {
    const tableBody = document.getElementById("table-body");
    const form = document.getElementById("crud-form");
    const searchInput = document.getElementById("search");

    let data = [];
    let editIndex = -1;

    form.addEventListener("submit", function (event) {
        event.preventDefault();
        
        const name = document.getElementById("name").value.trim();
        const age = document.getElementById("age").value.trim();
        const city = document.getElementById("city").value.trim();
        const email = document.getElementById("email").value.trim();

        if (!name || !age || !city || !email) {
            alert("Minden mező kitöltése kötelező!");
            return;
        }

        if (name.length < 3 || name.length > 50) {
            alert("A név 3 és 50 karakter között lehet!");
            return;
        }

        if (city.length < 2 || city.length > 50) {
            alert("A város neve 2 és 50 karakter között lehet!");
            return;
        }

        if (editIndex === -1) {
            data.push({ name, age, city, email });
        } else {
            data[editIndex] = { name, age, city, email };
            editIndex = -1;
        }

        form.reset();
        renderTable();
    });

    function renderTable(filteredData = null) {
        tableBody.innerHTML = "";
        (filteredData || data).forEach((item, index) => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${item.name}</td>
                <td>${item.age}</td>
                <td>${item.city}</td>
                <td>${item.email}</td>
                <td>
                    <button onclick="editRow(${index})">✏️</button>
                    <button onclick="deleteRow(${index})">🗑️</button>
                </td>
            `;
            tableBody.appendChild(row);
        });
    }

    window.editRow = function (index) {
        editIndex = index;
        document.getElementById("name").value = data[index].name;
        document.getElementById("age").value = data[index].age;
        document.getElementById("city").value = data[index].city;
        document.getElementById("email").value = data[index].email;
    };

    window.deleteRow = function (index) {
        data.splice(index, 1);
        renderTable();
    };

    searchInput.addEventListener("input", function () {
        const query = searchInput.value.toLowerCase();
        const filteredData = data.filter(item =>
            Object.values(item).some(value => value.toLowerCase().includes(query))
        );
        renderTable(filteredData);
    });

    window.sortTable = function (column) {
        data.sort((a, b) => (a[column] > b[column] ? 1 : -1));
        renderTable();
    };
});
