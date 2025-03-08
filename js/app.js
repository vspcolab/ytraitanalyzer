// Global variables
let trendData = [];
let wizardIndex = 0;

// The 40 parameters with weights.
const parameters = [
  {
    category: "Aahara (Diet & Nutrition)",
    name: "Meal Timing Consistency",
    criteria: "Regularity of meals in alignment with circadian rhythm",
    weight: 1.2,
  },
  {
    category: "Aahara (Diet & Nutrition)",
    name: "Food Variety",
    criteria: "Varied intake of nutrient-rich foods",
    weight: 1.0,
  },
  {
    category: "Aahara (Diet & Nutrition)",
    name: "Hydration & Water Intake",
    criteria: "Adequate daily water consumption",
    weight: 1.0,
  },
  {
    category: "Aahara (Diet & Nutrition)",
    name: "Portion Control",
    criteria: "Ability to avoid overeating or under-eating",
    weight: 1.0,
  },
  {
    category: "Aahara (Diet & Nutrition)",
    name: "Cooking Methods",
    criteria: "Preference for natural, unprocessed techniques",
    weight: 1.0,
  },
  {
    category: "Aahara (Diet & Nutrition)",
    name: "Mindful Eating Practices",
    criteria: "Conscious eating with gratitude",
    weight: 1.0,
  },
  {
    category: "Aahara (Diet & Nutrition)",
    name: "Refined Sugar & Processed Food Intake",
    criteria: "Minimizing refined sugars and processed foods",
    weight: 1.0,
  },
  {
    category: "Aahara (Diet & Nutrition)",
    name: "Meal Composition (Macronutrient Balance)",
    criteria: "Balanced proportions of proteins, carbs, and fats",
    weight: 1.2,
  },
  {
    category: "Aahara (Diet & Nutrition)",
    name: "Seasonal & Local Food Preference",
    criteria: "Preference for fresh, regional produce",
    weight: 1.0,
  },
  {
    category: "Aahara (Diet & Nutrition)",
    name: "Ayurvedic/Yogic Dietary Alignment",
    criteria: "Adherence to Sattvic, Rajasic, or Tamasic diet",
    weight: 1.5,
  },
  {
    category: "Vihara (Lifestyle & Daily Routine)",
    name: "Sleep Quality & Duration",
    criteria: "Consistent, restorative sleep",
    weight: 1.5,
  },
  {
    category: "Vihara (Lifestyle & Daily Routine)",
    name: "Physical Activity & Movement",
    criteria: "Regular exercise (Yoga, Walking, etc.)",
    weight: 1.3,
  },
  {
    category: "Vihara (Lifestyle & Daily Routine)",
    name: "Stress Management Techniques",
    criteria: "Use of meditation, pranayama, etc.",
    weight: 1.4,
  },
  {
    category: "Vihara (Lifestyle & Daily Routine)",
    name: "Work-Life Balance",
    criteria: "Balanced approach between work and rest",
    weight: 1.0,
  },
  {
    category: "Vihara (Lifestyle & Daily Routine)",
    name: "Leisure & Recreation",
    criteria: "Engagement in hobbies, music, travel, etc.",
    weight: 1.0,
  },
  {
    category: "Vihara (Lifestyle & Daily Routine)",
    name: "Exposure to Nature",
    criteria: "Regular contact with natural elements",
    weight: 1.0,
  },
  {
    category: "Vihara (Lifestyle & Daily Routine)",
    name: "Technology Usage & Digital Detox",
    criteria: "Balanced screen time and digital breaks",
    weight: 1.0,
  },
  {
    category: "Vihara (Lifestyle & Daily Routine)",
    name: "Community & Social Connections",
    criteria: "Quality interactions with family, friends",
    weight: 1.2,
  },
  {
    category: "Vihara (Lifestyle & Daily Routine)",
    name: "Routine & Rituals",
    criteria: "Consistency in daily habits and rituals",
    weight: 1.0,
  },
  {
    category: "Vihara (Lifestyle & Daily Routine)",
    name: "Exploration & Learning",
    criteria: "Curiosity and willingness to learn new things",
    weight: 1.0,
  },
  {
    category: "Achara (Conduct, Behavior, and Ethics)",
    name: "Self-Discipline & Punctuality",
    criteria: "Maintaining schedules and commitments",
    weight: 1.5,
  },
  {
    category: "Achara (Conduct, Behavior, and Ethics)",
    name: "Compassion & Kindness",
    criteria: "Exhibiting empathy and care towards others",
    weight: 1.2,
  },
  {
    category: "Achara (Conduct, Behavior, and Ethics)",
    name: "Honesty & Integrity",
    criteria: "Truthfulness and ethical behavior",
    weight: 1.2,
  },
  {
    category: "Achara (Conduct, Behavior, and Ethics)",
    name: "Conflict Resolution & Communication",
    criteria: "Effective and peaceful communication",
    weight: 1.0,
  },
  {
    category: "Achara (Conduct, Behavior, and Ethics)",
    name: "Spiritual & Ethical Practices",
    criteria: "Engagement in prayer, rituals, and seva",
    weight: 1.0,
  },
  {
    category: "Achara (Conduct, Behavior, and Ethics)",
    name: "Community Service & Volunteering",
    criteria: "Participation in acts of service",
    weight: 1.0,
  },
  {
    category: "Achara (Conduct, Behavior, and Ethics)",
    name: "Minimalism & Detachment",
    criteria: "Avoidance of material excess",
    weight: 1.0,
  },
  {
    category: "Achara (Conduct, Behavior, and Ethics)",
    name: "Respect for Elders, Teachers & Nature",
    criteria: "Honoring wisdom and traditions",
    weight: 1.2,
  },
  {
    category: "Achara (Conduct, Behavior, and Ethics)",
    name: "Personal Boundaries & Energy Management",
    criteria: "Maintaining personal space and energy",
    weight: 1.0,
  },
  {
    category: "Achara (Conduct, Behavior, and Ethics)",
    name: "Leadership & Influence",
    criteria: "Inspiring others positively",
    weight: 1.3,
  },
  {
    category: "Vichara (Thought Process & Mental Discipline)",
    name: "Decision-Making Clarity",
    criteria: "Making clear, informed decisions",
    weight: 1.0,
  },
  {
    category: "Vichara (Thought Process & Mental Discipline)",
    name: "Mindfulness & Self-Awareness",
    criteria: "Being present and introspective",
    weight: 1.5,
  },
  {
    category: "Vichara (Thought Process & Mental Discipline)",
    name: "Emotional Intelligence & Control",
    criteria: "Managing emotions effectively",
    weight: 1.5,
  },
  {
    category: "Vichara (Thought Process & Mental Discipline)",
    name: "Intellectual Curiosity & Learning",
    criteria: "Eagerness to learn and grow",
    weight: 1.0,
  },
  {
    category: "Vichara (Thought Process & Mental Discipline)",
    name: "Resilience & Ability to Handle Failures",
    criteria: "Bouncing back from setbacks",
    weight: 1.2,
  },
  {
    category: "Vichara (Thought Process & Mental Discipline)",
    name: "Perspective-Taking & Empathy",
    criteria: "Understanding diverse viewpoints",
    weight: 1.2,
  },
  {
    category: "Vichara (Thought Process & Mental Discipline)",
    name: "Creativity & Innovation",
    criteria: "Thinking outside the box",
    weight: 1.0,
  },
  {
    category: "Vichara (Thought Process & Mental Discipline)",
    name: "Skepticism vs. Open-Mindedness",
    criteria: "Balancing critical thinking and openness",
    weight: 1.0,
  },
  {
    category: "Vichara (Thought Process & Mental Discipline)",
    name: "Goal-Setting & Vision Clarity",
    criteria: "Having clear, achievable goals",
    weight: 1.0,
  },
  {
    category: "Vichara (Thought Process & Mental Discipline)",
    name: "Optimism & Pessimism Balance",
    criteria: "Maintaining a positive yet realistic outlook",
    weight: 1.0,
  },
];

// Build parameter table rows with help icons.
const tableBody = document.getElementById("parametersTable");
parameters.forEach((param, index) => {
  const row = document.createElement("tr");
  row.innerHTML = `
    <td>${param.category}</td>
    <td>
      ${param.name}
      <span class="help-icon" onclick="showGuide(${index})">?</span>
    </td>
    <td>${param.criteria}</td>
    <td class="options">
      ${[...Array(10)].map((_, i) => `<label><input type="radio" name="param${index}" value="${i+1}"> ${i+1}</label>`).join(" ")}
    </td>
    <td><input type="text" name="remark${index}" placeholder="Comments"></td>
  `;
  tableBody.appendChild(row);
});

// Utility: Classification function.
function classify(avg) {
  if (avg >= 7.5) return '<span class="text-success">Sattva</span>';
  else if (avg >= 5) return '<span class="text-warning">Rajas</span>';
  else return '<span class="text-danger">Tamas</span>';
}

// Main calculation function.
function calculateScore() {
  let totalWeighted = 0, totalWeight = 0;
  const categoryWeighted = {
    "Aahara (Diet & Nutrition)": 0,
    "Vihara (Lifestyle & Daily Routine)": 0,
    "Achara (Conduct, Behavior, and Ethics)": 0,
    "Vichara (Thought Process & Mental Discipline)": 0
  };
  let scatterData = [];
  parameters.forEach((param, index) => {
    const radios = document.getElementsByName("param" + index);
    let selectedScore = 0;
    radios.forEach(radio => {
      if (radio.checked) selectedScore = parseInt(radio.value);
    });
    scatterData.push({ x: index + 1, y: selectedScore });
    const weightedScore = selectedScore * param.weight;
    totalWeighted += weightedScore;
    totalWeight += (10 * param.weight);
    categoryWeighted[param.category] += weightedScore;
  });
  const overallAvg = (totalWeighted / totalWeight) * 10;
  let resultText = `<h3>Results</h3>
      <p><strong>Total Weighted Score:</strong> ${totalWeighted.toFixed(2)} / ${totalWeight.toFixed(2)}</p>
      <p><strong>Overall Classification:</strong> ${classify(overallAvg)} (Weighted Average: ${overallAvg.toFixed(2)})</p>`;
  
  let lowestCat = "", lowestAvg = 11, categoryAverages = {};
  Object.keys(categoryWeighted).forEach(cat => {
    const catTotalWeight = parameters.filter(p => p.category === cat)
      .reduce((sum, p) => sum + p.weight, 0) * 10;
    const avg = (categoryWeighted[cat] / catTotalWeight) * 10;
    categoryAverages[cat] = avg;
    resultText += `<p><strong>${cat}:</strong> ${classify(avg)} (Weighted Average: ${avg.toFixed(2)})</p>`;
    if (avg < lowestAvg) {
      lowestAvg = avg;
      lowestCat = cat;
    }
  });
  document.getElementById("result").innerHTML = resultText;
  const insightsText = `<h3>Dynamic Insights & Recommendations</h3>
      <p>Your lowest scoring category is <strong>${lowestCat}</strong> (Weighted Average: ${lowestAvg.toFixed(2)}). Focus on this area for improvement.</p>`;
  document.getElementById("insights").innerHTML = insightsText;
  trendData.push({ time: new Date().toLocaleTimeString(), score: overallAvg });
  // Trigger chart and D3 functions (defined in separate JS files)
  generateBarChart(categoryAverages);
  generateRadarChart(categoryAverages);
  generatePieChart(categoryAverages);
  generateDonutChart();
  generateLineChart(trendData);
  generateScatterChart(scatterData);
  generateHeatmap();
  generateSankeyDiagram();
  generateSunburstChart();
  generateChartInterpretations(categoryAverages, trendData, scatterData);
  generatePersonalizedInsights();
}

// ----------------- Data Export & Persistence ----------------- //
function downloadCSV() {
  let csvContent = "data:text/csv;charset=utf-8,Category,Parameter,Score,Weight,Remarks\n";
  parameters.forEach((param, index) => {
    const radios = document.getElementsByName("param" + index);
    let score = "";
    radios.forEach(radio => {
      if (radio.checked) score = radio.value;
    });
    const remark = document.getElementsByName("remark" + index)[0].value;
    csvContent += `"${param.category}","${param.name}","${score}","${param.weight}","${remark}"\n`;
  });
  const encodedUri = encodeURI(csvContent);
  const link = document.createElement("a");
  link.setAttribute("href", encodedUri);
  link.setAttribute("download", "AVAV_Yogic_Traits_Report.csv");
  document.body.appendChild(link);
  link.click();
}

function downloadPDF() {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();
  doc.setFontSize(16);
  doc.text("AVAV Yogic Traits Report", 10, 20);
  doc.setFontSize(12);
  const resultText = document.getElementById("result").innerText;
  const insightsText = document.getElementById("insights").innerText;
  doc.text(resultText, 10, 30);
  doc.text(insightsText, 10, 50);
  doc.save("AVAV_Yogic_Traits_Report.pdf");
}

function downloadGuideJSON() {
  const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(guideData, null, 2));
  const downloadAnchorNode = document.createElement('a');
  downloadAnchorNode.setAttribute("href", dataStr);
  downloadAnchorNode.setAttribute("download", "criteria_guide.json");
  document.body.appendChild(downloadAnchorNode);
  downloadAnchorNode.click();
  downloadAnchorNode.remove();
}

function saveData() {
  const data = [];
  parameters.forEach((param, index) => {
    const radios = document.getElementsByName("param" + index);
    let selectedScore = "";
    radios.forEach(radio => {
      if (radio.checked) selectedScore = radio.value;
    });
    const remark = document.getElementsByName("remark" + index)[0].value;
    data.push({ score: selectedScore, remark: remark });
  });
  localStorage.setItem("avavData", JSON.stringify(data));
  alert("Data saved successfully!");
}

function loadData() {
  const data = JSON.parse(localStorage.getItem("avavData"));
  if (!data) {
    alert("No saved data found.");
    return;
  }
  data.forEach((entry, index) => {
    const radios = document.getElementsByName("param" + index);
    radios.forEach(radio => {
      if (radio.value === entry.score) radio.checked = true;
    });
    document.getElementsByName("remark" + index)[0].value = entry.remark;
  });
  alert("Data loaded successfully!");
}

// ----------------- Guide Wizard / Help Modal Functions ----------------- //
function showGuide(index) {
  wizardIndex = index;
  if (!guideData.length) {
    alert("Guide data not loaded yet. Please try again later.");
    return;
  }
  displayGuide(guideData[wizardIndex]);
  const guideModal = new bootstrap.Modal(document.getElementById("guideModal"));
  guideModal.show();
  updateModalButtons();
}
function startGuideWizard() {
  wizardIndex = 0;
  if (!guideData.length) {
    alert("Guide data not loaded yet. Please try again later.");
    return;
  }
  displayGuide(guideData[wizardIndex]);
  const guideModal = new bootstrap.Modal(document.getElementById("guideModal"));
  guideModal.show();
  updateModalButtons();
}
function displayGuide(guide) {
  document.getElementById("guideModalLabel").innerHTML = `${guide.Category} - ${guide.Parameter}`;
  document.getElementById("guideModalBody").innerHTML = `<p>${guide.Guide}</p>`;
}
function nextGuide() {
  if (wizardIndex < guideData.length - 1) {
    wizardIndex++;
    displayGuide(guideData[wizardIndex]);
    updateModalButtons();
  } else {
    const modalEl = document.getElementById("guideModal");
    const modal = bootstrap.Modal.getInstance(modalEl);
    modal.hide();
  }
}
function prevGuide() {
  if (wizardIndex > 0) {
    wizardIndex--;
    displayGuide(guideData[wizardIndex]);
    updateModalButtons();
  }
}
function updateModalButtons() {
  document.getElementById("prevBtn").disabled = (wizardIndex === 0);
  document.getElementById("nextBtn").innerText =
    (wizardIndex === guideData.length - 1) ? "Finish" : "Next";
}
function resetWizard() {
  wizardIndex = 0;
}
