window.onload = function () {
  loadUpcomingNews();
  loadRecentPosts();
  upcomingIndex = SHOW_COUNT;
recentIndex = SHOW_COUNT;
renderLimitedPosts("upcoming");
renderLimitedPosts("recent");
};

function loadUpcomingNews() {
  const events = JSON.parse(localStorage.getItem("events")) || [];
  const today = new Date();
  const upcoming = events.filter(event => new Date(event.date) >= today);
  const list = document.getElementById("upcoming-news");

  upcoming.slice(0, 6).forEach(event => {
    const div = document.createElement("div");
    div.className = "preview-card";
    div.innerHTML = `
      <h3>${event.title}</h3>
      <p>${event.date}</p>
      <p>${event.content.slice(0, 50)}...</p>
    `;
    list.appendChild(div);
  });
}

function loadRecentPosts() {
  const posts = JSON.parse(localStorage.getItem("freeboardPosts")) || [];
  const list = document.getElementById("recent-posts");

  posts.slice(0, 6).forEach(post => {
    const div = document.createElement("div");
    div.className = "preview-card";
    div.innerHTML = `
      <h3>${post.title}</h3>
      <p>작성자: ${post.author} | ${post.date}</p>
      <p>${post.content.slice(0, 50)}...</p>
    `;
    list.appendChild(div);
  });
}

function searchPosts() {
  const keyword = document.getElementById("search-input").value.trim();
  if (!keyword) return alert("검색어를 입력하세요.");

  localStorage.setItem("searchKeyword", keyword);
  window.location.href = "board.html";
}
let upcomingIndex = 0;
let recentIndex = 0;
const SHOW_COUNT = 3;


