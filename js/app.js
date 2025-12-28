const grid = document.getElementById("videoGrid");
const searchInput = document.getElementById("search");

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

function renderVideos(list) {
  grid.innerHTML = "";

  if (list.length === 0) {
    grid.innerHTML = `<p class="no-results">No video found.</p>`;
    return;
  }

  list.forEach(video => {
    const views = 1000 + hashNumber(video.id, 900000);
    const likes = 100 + hashNumber(video.id + "like", 50000);

    const card = document.createElement("a");
    card.className = "card";
    card.href = video.link;
    card.target = "_blank";

    card.innerHTML = `
      <div class="thumb">
        <img src="${video.thumbnail}" loading="lazy">
      </div>
      <div class="info">
        <h3>${video.title}</h3>
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

searchInput.addEventListener("input", () => {
  const value = searchInput.value.trim().toUpperCase();
  const filtered = videos.filter(v => v.id.includes(value));
  renderVideos(filtered);
});

renderVideos(videos);
