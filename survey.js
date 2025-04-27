// Symptoms to ask
const symptoms = [
    "Fever", "Fatigue", "Cough", "Sore Throat", "Headache",
    "Body Aches", "Nausea or Vomiting", "Diarrhea", "Skin Issues",
    "Breathing Issues", "Congestion", "Chills or Shivers",
    "Loss of Appetite", "Dizziness or Lightheadedness",
    "Chest Pain or Pressure", "Swelling", "Rashes",
    "Runny Nose", "Sweating"
];

// Illnesses and symptoms
const illnesses = {
    "Common Cold": ["Cough", "Sore Throat", "Runny Nose", "Congestion"],
    "Flu (Influenza)": ["Fever", "Fatigue", "Cough", "Chills or Shivers", "Body Aches"],
    "COVID-19": ["Fever", "Cough", "Breathing Issues", "Loss of Appetite", "Fatigue"],
    "Stomach Bug (Gastroenteritis)": ["Nausea or Vomiting", "Diarrhea", "Fatigue"],
    "Heat Exhaustion": ["Sweating", "Dizziness or Lightheadedness", "Fatigue", "Headache"],
    "Mild Infection": ["Fever", "Swelling", "Skin Issues"]
};

// Herbal treatments
const herbs = {
    "Common Cold": ["Elderberry", "Echinacea", "Peppermint"],
    "Flu (Influenza)": ["Elderberry", "Ginger", "Yarrow"],
    "COVID-19": ["Licorice Root", "Andrographis", "Green Tea"],
    "Stomach Bug (Gastroenteritis)": ["Ginger", "Chamomile", "Mint"],
    "Heat Exhaustion": ["Hibiscus Tea", "Dandelion", "Coconut Water"],
    "Mild Infection": ["Garlic", "Echinacea", "Goldenseal"]
};

const answers = {};

const surveyDiv = document.getElementById("surveyContent");

// Generate questions dynamically
symptoms.forEach(symptom => {
    const div = document.createElement("div");
    div.className = "question";
    div.innerHTML = `
        <p>Do you have <strong>${symptom}</strong>?</p>
        <button class="answer-btn" onclick="saveAnswer('${symptom}', 'Yes', this)">Yes</button>
        <button class="answer-btn" onclick="saveAnswer('${symptom}', 'No', this)">No</button>
    `;
    surveyDiv.appendChild(div);
});

// Save answer and highlight
function saveAnswer(symptom, answer, button) {
    answers[symptom] = answer;
    const parent = button.parentElement;
    const allBtns = parent.querySelectorAll(".answer-btn");
    allBtns.forEach(btn => btn.classList.remove("selected"));
    button.classList.add("selected");
}

// Show results
function showResults() {
    const resultsDiv = document.getElementById("results");
    resultsDiv.classList.remove("hidden");

    // Find possible illnesses
    const possible = [];
    for (let illness in illnesses) {
        const required = illnesses[illness];
        const matched = required.filter(symptom => answers[symptom] === "Yes").length;
        if (matched >= required.length - 1) {
            possible.push(illness);
        }
    }

    // Build results
    let html = `<h2>Your Possible Diagnosis:</h2>`;
    if (possible.length > 0) {
        html += `<ul>`;
        possible.forEach(illness => {
            const herbList = herbs[illness].join(", ");
            html += `<li><strong>${illness}</strong> — Herbal Remedies: <em>${herbList}</em></li>`;
        });
        html += `</ul>`;
    } else {
        html += `<p>No matching diagnosis found based on your answers.</p>`;
    }

    resultsDiv.innerHTML = html;
}
