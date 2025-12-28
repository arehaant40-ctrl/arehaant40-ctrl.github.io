const grid = document.getElementById("videoGrid");
const searchInput = document.getElementById("search");
const themeToggle = document.getElementById("themeToggle");

/* ---------- UTILITIES ---------- */
function hashNumber(str, max) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  return Math.abs(hash % max);
}

function formatNumber(num) {
  if (num >= 1_000_000) return (num / 1_000_000).toFixed(1) + "M";
  if (num >= 1_000) return (num / 1_000).toFixed(1) + "K";
  return num;
}

function pickRotatedLink(video) {
  const seed = video.id + navigator.userAgent;
  const index = hashNumber(seed, video.links.length);
  return video.links[index];
}

/* ---------- RENDER ---------- */
function renderVideos(list) {
  grid.innerHTML = "";

  if (!list.length) {
    grid.innerHTML = `<p class="no-results">No video found</p>`;
    return;
  }

  list.forEach(video => {
    const views = 1000 + hashNumber(video.id, 900000);
    const likes = 100 + hashNumber(video.id + "likes", 50000);
    const link = pickRotatedLink(video);

    const card = document.createElement("a");
    card.className = "card";
    card.href = link;
    card.target = "_blank";
    card.rel = "noopener noreferrer";

    card.innerHTML = `
      <div class="thumb">
        <img src="${video.thumbnail}" loading="lazy" alt="${video.title}">
      </div>
      <div class="info">
        <h3 title="${video.title}">${video.title}</h3>
        <div class="meta">
          <span>${formatNumber(views)} views</span>
          <span>•</span>
          <span>👍 ${formatNumber(likes)}</span>
        </div>
        <div class="id">ID: ${video.id}</div>
      </div>
    `;

    grid.appendChild(card);
  });
}

/* ---------- SEARCH ---------- */
searchInput.addEventListener("input", () => {
  const value = searchInput.value.trim().toUpperCase();
  renderVideos(videos.filter(v => v.id.includes(value)));
});

/* ---------- THEME ---------- */
function setTheme(theme) {
  document.documentElement.setAttribute("data-theme", theme);
  localStorage.setItem("theme", theme);
  themeToggle.textContent = theme === "dark" ? "☀️" : "🌙";
}

themeToggle.addEventListener("click", () => {
  const current = document.documentElement.getAttribute("data-theme") || "dark";
  setTheme(current === "dark" ? "light" : "dark");
});

setTheme(localStorage.getItem("theme") || "dark");

/* ---------- INIT ---------- */
renderVideos(videos);
