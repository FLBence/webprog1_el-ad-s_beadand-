const ctx = document.getElementById('lineChart').getContext('2d');
  let chart;

  const dataTable = document.getElementById('dataTable');
  dataTable.addEventListener('click', function (e) {
    const row = e.target.closest('tr');
    if (!row) return;

    const values = Array.from(row.children).map(td => parseFloat(td.textContent));
    const labels = values.map((_, i) => `Oszlop ${i + 1}`);

    if (chart) {
      chart.destroy();
    }

    chart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: labels,
        datasets: [{
          label: 'Kiválasztott sor adatai',
          data: values,
          borderColor: 'gray',
          backgroundColor: 'darkgray',
          fill: false,
          tension: 0.2
        }]
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  });