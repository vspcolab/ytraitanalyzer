// Global guideData variable – will be loaded from JSON.
let guideData = [];

// Load guide data from the JSON file on page load.
document.addEventListener("DOMContentLoaded", () => {
  fetch("data/guideData.json")
    .then(response => response.json())
    .then(data => {
      guideData = data;
    })
    .catch(error => console.error("Error loading guide data:", error));
});

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
