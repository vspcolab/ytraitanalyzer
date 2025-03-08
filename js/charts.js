// Bar Chart
function generateBarChart(categoryAverages) {
  const ctx = document.getElementById("barChart").getContext("2d");
  const labels = Object.keys(categoryAverages);
  const data = labels.map(cat => categoryAverages[cat]);
  if (window.barChartInstance) window.barChartInstance.destroy();
  window.barChartInstance = new Chart(ctx, {
    type: "bar",
    data: {
      labels: labels,
      datasets: [{
        label: "Weighted Average Score",
        data: data,
        backgroundColor: ["#28a745", "#ffc107", "#17a2b8", "#dc3545"]
      }]
    },
    options: { scales: { y: { beginAtZero: true, max: 10 } } }
  });
}

// Radar Chart
function generateRadarChart(categoryAverages) {
  const ctx = document.getElementById("radarChart").getContext("2d");
  const labels = Object.keys(categoryAverages);
  const data = labels.map(cat => categoryAverages[cat]);
  if (window.radarChartInstance) window.radarChartInstance.destroy();
  window.radarChartInstance = new Chart(ctx, {
    type: "radar",
    data: {
      labels: labels,
      datasets: [{
        label: "Weighted Average Score",
        data: data,
        backgroundColor: "rgba(13,110,253,0.2)",
        borderColor: "#0d6efd",
        pointBackgroundColor: "#0d6efd"
      }]
    },
    options: { scales: { r: { beginAtZero: true, max: 10 } } }
  });
}

// Pie Chart
function generatePieChart(categoryAverages) {
  const ctx = document.getElementById("pieChart").getContext("2d");
  const labels = Object.keys(categoryAverages);
  const data = labels.map(cat => categoryAverages[cat]);
  if (window.pieChartInstance) window.pieChartInstance.destroy();
  window.pieChartInstance = new Chart(ctx, {
    type: "pie",
    data: {
      labels: labels,
      datasets: [{
        label: "Category Distribution (%)",
        data: data,
        backgroundColor: ["#28a745", "#ffc107", "#17a2b8", "#dc3545"]
      }]
    },
    options: {
      plugins: {
        tooltip: {
          callbacks: {
            label: function(context) {
              const sum = data.reduce((a, b) => a + b, 0);
              const percentage = ((context.parsed / sum) * 100).toFixed(2) + "%";
              return context.label + ": " + percentage;
            }
          }
        }
      }
    }
  });
}

// Donut Chart
function generateDonutChart() {
  const ctx = document.getElementById("donutChart").getContext("2d");
  // Example classification count (can be modified based on your logic)
  const classificationCount = { Sattva: 1, Rajas: 1, Tamas: 2 };
  const labels = Object.keys(classificationCount);
  const data = labels.map(label => classificationCount[label]);
  if (window.donutChartInstance) window.donutChartInstance.destroy();
  window.donutChartInstance = new Chart(ctx, {
    type: "doughnut",
    data: {
      labels: labels,
      datasets: [{
        label: "Classification Distribution",
        data: data,
        backgroundColor: ["#28a745", "#ffc107", "#dc3545"]
      }]
    }
  });
}

// Line Chart
function generateLineChart(trendData) {
  const ctx = document.getElementById("lineChart").getContext("2d");
  const labels = trendData.map(entry => entry.time);
  const data = trendData.map(entry => entry.score);
  if (window.lineChartInstance) window.lineChartInstance.destroy();
  window.lineChartInstance = new Chart(ctx, {
    type: "line",
    data: {
      labels: labels,
      datasets: [{
        label: "Overall Score Over Time",
        data: data,
        fill: false,
        borderColor: "#0d6efd",
        tension: 0.1
      }]
    },
    options: { scales: { y: { beginAtZero: true, max: 10 } } }
  });
}

// Scatter Chart
function generateScatterChart(scatterData) {
  const ctx = document.getElementById("scatterChart").getContext("2d");
  if (window.scatterChartInstance) window.scatterChartInstance.destroy();
  window.scatterChartInstance = new Chart(ctx, {
    type: "scatter",
    data: {
      datasets: [{
        label: "Parameter Scores",
        data: scatterData,
        backgroundColor: "#0d6efd"
      }]
    },
    options: {
      scales: {
        x: { title: { display: true, text: "Parameter Index" } },
        y: { title: { display: true, text: "Score" }, beginAtZero: true, max: 10 }
      }
    }
  });
}
