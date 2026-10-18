const adviceForm = document.querySelector("#advice-form");
const adviceResult = document.querySelector("#advice-result");
const healthButton = document.querySelector("#health-button");
const healthResult = document.querySelector("#health-result");
const chatForm = document.querySelector("#chat-form");
const chatResult = document.querySelector("#chat-result");

const cropExamples = {
  black: {
    kharif: ["Cotton", "Pigeon pea"],
    rabi: ["Chickpea", "Wheat (where locally suitable)"],
    summer: ["Green gram (with suitable water)"]
  },
  red: {
    kharif: ["Groundnut", "Pigeon pea"],
    rabi: ["Chickpea", "Mustard (where locally suitable)"],
    summer: ["Green gram (with suitable water)"]
  },
  alluvial: {
    kharif: ["Rice (where water is sufficient)", "Maize"],
    rabi: ["Wheat", "Mustard"],
    summer: ["Mung bean (with suitable water)"]
  },
  sandy: {
    kharif: ["Pearl millet", "Mung bean"],
    rabi: ["Mustard (where locally suitable)", "Chickpea"],
    summer: ["Mung bean (with suitable water)"]
  }
};

const seasonLabels = { kharif: "Kharif", rabi: "Rabi", summer: "Summer" };

adviceForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const soil = document.querySelector("#soil").value;
  const season = document.querySelector("#season").value;
  const water = document.querySelector("#water").value;
  const location = document.querySelector("#location").value.trim();

  if (!soil || !season || !water) {
    adviceResult.hidden = false;
    adviceResult.textContent = "Please select soil, season, and water availability.";
    return;
  }

  const crops = cropExamples[soil]?.[season] ?? [];
  const waterNote = water === "low"
    ? "Water is limited: prioritise locally suitable drought-tolerant crops and water-saving methods."
    : water === "medium"
      ? "Water is moderate: plan irrigation carefully and avoid waterlogging."
      : "Irrigation is available: check crop water needs and local irrigation guidance.";

  adviceResult.replaceChildren();
  const heading = document.createElement("h3");
  heading.textContent = "Sample crop ideas";
  const intro = document.createElement("p");
  intro.textContent = `For ${soil} soil during ${seasonLabels[season]}${location ? ` near ${location}` : ""}:`;
  const list = document.createElement("ul");
  crops.forEach((crop) => {
    const item = document.createElement("li");
    item.textContent = crop;
    list.appendChild(item);
  });
  const waterText = document.createElement("p");
  waterText.textContent = waterNote;
  const caution = document.createElement("p");
  caution.textContent = "These are general examples, not a guaranteed recommendation. Confirm with local agricultural experts and current conditions.";
  adviceResult.append(heading, intro, list, waterText, caution);
  adviceResult.hidden = false;
});

const healthAdvice = {
  spots: "Take clear photos of affected leaves, check whether the spots are spreading, and avoid wetting foliage during watering. Ask a local agriculture expert to identify the cause before applying any treatment.",
  yellow: "Check soil moisture, drainage, and whether yellowing affects old or new leaves. Nutrient issues, pests, water stress, and disease can look similar; seek local assessment before applying fertiliser or chemicals.",
  wilting: "Check soil moisture and drainage, and inspect stems and roots if safe to do so. Both excess water and lack of water can cause wilting. Get local advice if the problem spreads quickly.",
  insects: "Take a clear photo, inspect several plants, and note how many are affected. Avoid spraying unknown chemicals; ask a local agriculture expert about identification and integrated pest management."
};

healthButton.addEventListener("click", () => {
  const symptom = document.querySelector("#symptom").value;
  healthResult.hidden = false;
  healthResult.textContent = symptom
    ? healthAdvice[symptom]
    : "Please choose a plant health concern first.";
});

function answerCommonQuestion(question) {
  const q = question.toLowerCase();
  if (q.includes("water") || q.includes("irrigat")) {
    return "Water early in the morning where practical, check soil moisture before watering, reduce weeds, and consider mulch where suitable. Water needs vary by crop and local weather.";
  }
  if (q.includes("soil") || q.includes("test")) {
    return "A soil test can help check pH and nutrient levels. Contact your local agriculture department or soil-testing laboratory for sampling instructions and crop-specific interpretation.";
  }
  if (q.includes("yellow") || q.includes("disease") || q.includes("leaf") || q.includes("pest") || q.includes("insect")) {
    return "Symptoms can have several causes. Take clear photos, note when symptoms started, check nearby plants, and consult a local agricultural expert before applying pesticides or fertilisers.";
  }
  if (q.includes("crop") || q.includes("plant") || q.includes("seed")) {
    return "Crop choice depends on season, local climate, soil test, water availability, and market access. Use the crop form for sample ideas and confirm them with local agricultural experts.";
  }
  return "I am a simple demo helper and can answer only common farming topics. Try asking about crop choice, soil testing, water conservation, yellow leaves, or pests. For important decisions, consult a local agricultural expert.";
}

chatForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const question = document.querySelector("#question").value.trim();
  chatResult.hidden = false;
  chatResult.textContent = question
    ? answerCommonQuestion(question)
    : "Please type a question first.";
});
