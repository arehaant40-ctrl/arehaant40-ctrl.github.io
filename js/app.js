const grid = document.getElementById("videoGrid");
const searchInput = document.getElementById("search");

function renderVideos(list) {
  grid.innerHTML = "";

  if (list.length === 0) {
    grid.innerHTML = "<p>No video found.</p>";
    return;
  }

  list.forEach(video => {
    const card = document.createElement("a");
    card.className = "card";
    card.href = video.link;
    card.target = "_blank";

    card.innerHTML = `
      <img src="${video.thumbnail}">
      <div class="info">
        <h3>${video.title}</h3>
        <span>ID: ${video.id}</span>
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
