const STOP_WORDS = new Set([
  "the", "and", "for", "with", "you", "your", "our", "are", "this", "that",
  "from", "will", "have", "has", "was", "were", "job", "role", "about", "into",
  "using", "use", "their", "they", "them", "who", "what", "when", "where", "why",
  "how", "can", "should", "must", "all", "any", "not", "per", "via", "etc", "able"
]);

const resumeInput = document.getElementById("resumeInput");
const jdInput = document.getElementById("jdInput");
const analyzeBtn = document.getElementById("analyzeBtn");
const results = document.getElementById("results");
const scoreText = document.getElementById("scoreText");
const missingList = document.getElementById("missingList");
const tailoredOutput = document.getElementById("tailoredOutput");

function normalize(text) {
  return text.toLowerCase().replace(/[^a-z0-9\s]/g, " ");
}

function extractKeywords(text) {
  const words = normalize(text)
    .split(/\s+/)
    .filter(Boolean)
    .filter((word) => word.length >= 3 && !STOP_WORDS.has(word));

  const frequency = new Map();
  for (const word of words) {
    frequency.set(word, (frequency.get(word) || 0) + 1);
  }

  return [...frequency.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, 25)
    .map(([word]) => word);
}

function keywordSet(text) {
  return new Set(normalize(text).split(/\s+/).filter(Boolean));
}

function buildTailoredDraft(originalResume, missingKeywords) {
  if (!missingKeywords.length) {
    return `${originalResume}\n\n[Great news: your resume already reflects the top terms from this job description.]`;
  }

  const bulletLines = missingKeywords
    .slice(0, 8)
    .map((keyword) => `- Demonstrated impact related to ${keyword} in project/work outcomes.`)
    .join("\n");

  return `${originalResume.trim()}\n\nSuggested role-aligned achievements to add:\n${bulletLines}`;
}

analyzeBtn.addEventListener("click", () => {
  const resumeText = resumeInput.value.trim();
  const jdText = jdInput.value.trim();

  if (!resumeText || !jdText) {
    alert("Please paste both your resume and the job description.");
    return;
  }

  const jdKeywords = extractKeywords(jdText);
  const resumeWords = keywordSet(resumeText);

  const matched = jdKeywords.filter((word) => resumeWords.has(word));
  const missing = jdKeywords.filter((word) => !resumeWords.has(word));

  const score = Math.round((matched.length / Math.max(jdKeywords.length, 1)) * 100);

  scoreText.textContent = `${score}% keyword alignment (${matched.length}/${jdKeywords.length} top terms).`;

  missingList.innerHTML = "";
  const topMissing = missing.slice(0, 10);
  if (!topMissing.length) {
    const li = document.createElement("li");
    li.textContent = "No major keyword gaps found in top terms.";
    missingList.appendChild(li);
  } else {
    topMissing.forEach((word) => {
      const li = document.createElement("li");
      li.textContent = word;
      missingList.appendChild(li);
    });
  }

  tailoredOutput.value = buildTailoredDraft(resumeText, topMissing);
  results.classList.remove("hidden");
});
