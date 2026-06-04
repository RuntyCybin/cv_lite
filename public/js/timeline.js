import { createBlendy } from "/blendy.js";

const backdrop = document.getElementById("timeline-backdrop");
const popupsRoot = document.getElementById("timeline-popups");
let blendy;
let activeId = null;

function parseTimelineList(raw) {
  if (!raw) return [];
  const trimmed = raw.trim();
  if (trimmed.startsWith("[")) {
    try {
      const parsed = JSON.parse(trimmed);
      return Array.isArray(parsed) ? parsed.map(String) : [];
    } catch {
      return [];
    }
  }
  return trimmed.split("|").map((item) => item.trim()).filter(Boolean);
}

function fillPopupBody(container, { text, list }) {
  container.replaceChildren();

  if (text) {
    const paragraph = document.createElement("p");
    paragraph.className = "text-sm leading-relaxed text-ink-300";
    paragraph.textContent = text;
    container.appendChild(paragraph);
  }

  if (list.length > 0) {
    const listEl = document.createElement("ul");
    listEl.className =
      "mt-3 list-inside list-disc space-y-1 text-sm leading-relaxed text-ink-300";
    for (const item of list) {
      const li = document.createElement("li");
      li.textContent = item;
      listEl.appendChild(li);
    }
    container.appendChild(listEl);
  }
}

function buildPopup(id, title, text, list) {
  const popup = document.createElement("div");
  popup.hidden = true;
  popup.dataset.blendyTo = id;
  popup.className = "timeline-popup pointer-events-auto";
  popup.innerHTML = `
    <div>
      <h3 class="font-display text-lg font-semibold text-ink-50"></h3>
      <div class="timeline-popup-body mt-3"></div>
      <button
        type="button"
        class="timeline-close mt-5 rounded-lg border border-ink-600 px-3 py-1.5 text-sm text-ink-300 transition hover:border-ink-500 hover:text-ink-100"
      >
        Close
      </button>
    </div>
  `;
  popup.querySelector("h3").textContent = title;
  fillPopupBody(popup.querySelector(".timeline-popup-body"), { text, list });
  popup.querySelector(".timeline-close").addEventListener("click", closeTimeline);
  return popup;
}

function hidePopup(id) {
  const popup = document.querySelector(`[data-blendy-to="${id}"]`);
  if (popup) popup.hidden = true;
  backdrop.hidden = true;
  backdrop.setAttribute("aria-hidden", "true");
}

function openTimeline(id) {
  if (activeId === id) return;

  if (activeId) {
    blendy.untoggle(activeId, () => {
      hidePopup(activeId);
      activeId = null;
      openTimeline(id);
    });
    return;
  }

  const popup = document.querySelector(`[data-blendy-to="${id}"]`);
  popup.hidden = false;
  backdrop.hidden = false;
  backdrop.setAttribute("aria-hidden", "false");
  blendy.toggle(id);
  activeId = id;
}

function closeTimeline() {
  if (!activeId) return;
  const id = activeId;
  blendy.untoggle(id, () => {
    hidePopup(id);
    activeId = null;
  });
}

function init() {
  document.querySelectorAll(".timeline-trigger").forEach((trigger) => {
    const { timelineId, timelineTitle, timelineText, timelineList } = trigger.dataset;
    trigger.dataset.blendyFrom = timelineId;
    const list = parseTimelineList(timelineList);

    if (!document.querySelector(`[data-blendy-to="${timelineId}"]`)) {
      popupsRoot.appendChild(buildPopup(timelineId, timelineTitle, timelineText, list));
    }

    const open = (event) => {
      if (event.type === "keydown" && event.key !== "Enter" && event.key !== " ") return;
      if (event.type === "keydown") event.preventDefault();
      if (event.target.closest("a")) return;
      openTimeline(timelineId);
    };

    trigger.addEventListener("click", open);
    trigger.addEventListener("keydown", open);
  });

  blendy = createBlendy({ animation: "dynamic" });
  blendy.update();

  backdrop.addEventListener("click", closeTimeline);
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeTimeline();
  });
}

init();
