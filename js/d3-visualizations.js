// Heatmap Visualization
function generateHeatmap() {
  let html = `<h5>Heatmap of Parameter Scores</h5>
    <table class="table table-bordered text-center">
      <thead>
        <tr><th>Parameter</th><th>Score</th></tr>
      </thead>
      <tbody>`;
  parameters.forEach((param, index) => {
    const radios = document.getElementsByName("param" + index);
    let score = 0;
    radios.forEach(radio => {
      if (radio.checked) score = parseInt(radio.value);
    });
    const color = score >= 7.5 ? "#28a745" : score >= 5 ? "#ffc107" : "#dc3545";
    html += `<tr><td>${param.name}</td><td style="background-color:${color}; color:#fff;">${score}</td></tr>`;
  });
  html += `</tbody></table>`;
  document.getElementById("heatmapContainer").innerHTML = html;
  document.getElementById("heatmapInterpretation").innerHTML = "<p>The heatmap highlights your parameter scores with color intensity. Red indicates areas needing the most attention.</p>";
}

// Sankey Diagram
function generateSankeyDiagram() {
  document.getElementById("sankeyDiagram").innerHTML = "";
  const data = {
    nodes: [
      { name: "Aahara" },
      { name: "Vihara" },
      { name: "Achara" },
      { name: "Vichara" },
      { name: "Sattva" },
      { name: "Rajas" },
      { name: "Tamas" }
    ],
    links: [
      { source: 0, target: 4, value: 5 },
      { source: 0, target: 5, value: 3 },
      { source: 1, target: 4, value: 6 },
      { source: 1, target: 6, value: 4 },
      { source: 2, target: 5, value: 7 },
      { source: 2, target: 6, value: 2 },
      { source: 3, target: 4, value: 4 },
      { source: 3, target: 5, value: 5 }
    ]
  };
  const width = 400, height = 300;
  const svg = d3.select("#sankeyDiagram").append("svg")
                .attr("width", width)
                .attr("height", height);
  const sankey = d3.sankey()
                   .nodeWidth(15)
                   .nodePadding(10)
                   .extent([[1, 1], [width - 1, height - 6]]);
  const { nodes, links } = sankey({
    nodes: data.nodes.map(d => Object.assign({}, d)),
    links: data.links.map(d => Object.assign({}, d))
  });
  svg.append("g")
     .selectAll("rect")
     .data(nodes)
     .enter()
     .append("rect")
     .attr("x", d => d.x0)
     .attr("y", d => d.y0)
     .attr("height", d => d.y1 - d.y0)
     .attr("width", d => d.x1 - d.x0)
     .attr("fill", "#0d6efd")
     .attr("stroke", "#000");
  svg.append("g")
     .selectAll("path")
     .data(links)
     .enter()
     .append("path")
     .attr("d", d3.sankeyLinkHorizontal())
     .attr("stroke", "#ffc107")
     .attr("stroke-width", d => Math.max(1, d.width))
     .attr("fill", "none");
  svg.append("g")
     .selectAll("text")
     .data(nodes)
     .enter()
     .append("text")
     .attr("x", d => d.x0 - 6)
     .attr("y", d => (d.y1 + d.y0) / 2)
     .attr("dy", "0.35em")
     .attr("text-anchor", "end")
     .text(d => d.name);
  document.getElementById("sankeyInterpretation").innerHTML = "<p>The Sankey diagram visualizes the flow between your AVAV categories and their influence on your overall well-being.</p>";
}

// Sunburst Chart
function generateSunburstChart() {
  document.getElementById("sunburstChart").innerHTML = "";
  const data = {
    name: "AVAV",
    children: [
      { name: "Aahara", children: parameters.filter(p => p.category === "Aahara (Diet & Nutrition)").map(p => ({ name: p.name, value: 1 })) },
      { name: "Vihara", children: parameters.filter(p => p.category === "Vihara (Lifestyle & Daily Routine)").map(p => ({ name: p.name, value: 1 })) },
      { name: "Achara", children: parameters.filter(p => p.category === "Achara (Conduct, Behavior, and Ethics)").map(p => ({ name: p.name, value: 1 })) },
      { name: "Vichara", children: parameters.filter(p => p.category === "Vichara (Thought Process & Mental Discipline)").map(p => ({ name: p.name, value: 1 })) }
    ]
  };
  const width = 400, radius = width / 2;
  const partition = d3.partition().size([2 * Math.PI, radius]);
  const root = d3.hierarchy(data).sum(d => d.value);
  partition(root);
  const svg = d3.select("#sunburstChart").append("svg")
                .attr("width", width)
                .attr("height", width)
                .append("g")
                .attr("transform", `translate(${radius},${radius})`);
  const arc = d3.arc()
                .startAngle(d => d.x0)
                .endAngle(d => d.x1)
                .innerRadius(d => d.y0)
                .outerRadius(d => d.y1);
  svg.selectAll("path")
     .data(root.descendants())
     .enter().append("path")
     .attr("display", d => d.depth ? null : "none")
     .attr("d", arc)
     .style("stroke", "#fff")
     .style("fill", d => {
       if (d.depth === 1) return "#0d6efd";
       if (d.depth === 2) return "#ffc107";
       return "#dc3545";
     })
     .append("title")
     .text(d => d.data.name);
  document.getElementById("sunburstInterpretation").innerHTML = "<p>The sunburst chart provides a hierarchical view of your AVAV traits, highlighting areas for improvement.</p>";
}

// ----------------- Interpretations & Insights ----------------- //
function getParameterScores() {
  const scoresByCategory = {
    "Aahara (Diet & Nutrition)": [],
    "Vihara (Lifestyle & Daily Routine)": [],
    "Achara (Conduct, Behavior, and Ethics)": [],
    "Vichara (Thought Process & Mental Discipline)": [],
  };
  parameters.forEach((param, index) => {
    const radios = document.getElementsByName("param" + index);
    let score = 0;
    radios.forEach(radio => {
      if (radio.checked) score = parseInt(radio.value);
    });
    scoresByCategory[param.category].push({ name: param.name, score: score });
  });
  return scoresByCategory;
}

function generateCategoryInterpretation(category, scores, average) {
  const lowParams = scores.filter(p => p.score < 5).map(p => p.name);
  const midParams = scores.filter(p => p.score >= 5 && p.score < 7.5).map(p => p.name);
  const highParams = scores.filter(p => p.score >= 7.5).map(p => p.name);
  let text = `<h4>${category} Analysis</h4>`;
  text += `<p><strong>Average Score:</strong> ${average.toFixed(2)} (${classify(average)})</p>`;
  if (lowParams.length) text += `<p><strong>Needs Improvement:</strong> ${lowParams.join(", ")}</p>`;
  if (midParams.length) text += `<p><strong>Moderate Areas:</strong> ${midParams.join(", ")}</p>`;
  if (highParams.length) text += `<p><strong>Strengths:</strong> ${highParams.join(", ")}</p>`;
  text += `<p>Focus on the low scoring aspects to enhance overall balance.</p>`;
  return text;
}

function generateChartInterpretations(categoryAverages, trendData, scatterData) {
  const scoresByCategory = getParameterScores();
  let barInterp = `<h3>Bar Chart Analysis</h3>`;
  Object.keys(categoryAverages).forEach(cat => {
    barInterp += generateCategoryInterpretation(cat, scoresByCategory[cat], categoryAverages[cat]);
  });
  document.getElementById("barChartInterpretation").innerHTML = barInterp;

  const radarInterp = `<h3>Radar Chart Analysis</h3>
                         <p>The radar chart mirrors the bar chart data. Notice any significant imbalances between categories and target low-scoring areas.</p>`;
  document.getElementById("radarChartInterpretation").innerHTML = radarInterp;

  const pieInterp = `<h3>Pie Chart Analysis</h3>
                     <p>This chart shows the proportional contribution of each category to your overall score.</p>`;
  document.getElementById("pieChartInterpretation").innerHTML = pieInterp;

  const donutInterp = `<h3>Donut Chart Analysis</h3>
                       <p>The donut chart displays the distribution of classifications (Sattva, Rajas, Tamas) across categories.</p>`;
  document.getElementById("donutChartInterpretation").innerHTML = donutInterp;

  const lineInterp = `<h3>Line Chart Analysis</h3>
                      <p>Your overall score trend over time is depicted in the line chart. Monitor changes to adjust your practice.</p>`;
  document.getElementById("lineChartInterpretation").innerHTML = lineInterp;

  const scatterInterp = `<h3>Scatter Plot Analysis</h3>
                         <p>The scatter plot displays individual parameter scores. Clusters of low scores indicate focus areas.</p>`;
  document.getElementById("scatterChartInterpretation").innerHTML = scatterInterp;
}

function generatePersonalizedInsights() {
  const parameterScores = [];
  parameters.forEach((param, index) => {
    const radios = document.getElementsByName("param" + index);
    let score = 0;
    radios.forEach(radio => {
      if (radio.checked) score = parseInt(radio.value);
    });
    if (score > 0)
      parameterScores.push({ name: param.name, score: score, category: param.category });
  });
  const top3 = [...parameterScores].sort((a, b) => b.score - a.score).slice(0, 3);
  const bottom3 = [...parameterScores].sort((a, b) => a.score - b.score).slice(0, 3);
  const actionPlan = "Focus on the low scoring parameters. Consider adopting mindful practices, seeking expert guidance, and tracking your progress consistently.";
  const html = `<h2>Insights & Personalized Recommendations</h2>
    <div class="insights">
      <h3>Strengths</h3>
      <p><strong>Top 3 Strongest Traits:</strong> ${top3.map(p => `${p.name} (${p.score})`).join(", ")}</p>
      <h3>Areas for Improvement</h3>
      <p><strong>Bottom 3 Weakest Parameters:</strong> ${bottom3.map(p => `${p.name} (${p.score})`).join(", ")}</p>
      <p><strong>Recommended Action Plan:</strong> ${actionPlan}</p>
    </div>`;
  document.getElementById("personalizedInsights").innerHTML = html;
}
