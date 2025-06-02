const postId = localStorage.getItem("currentPostId");
const posts = JSON.parse(localStorage.getItem("freeboardPosts")) || [];
const post = posts.find(p => p.id == postId);

if (post) {
  document.getElementById("post-title").textContent = post.title;
  document.getElementById("post-meta").textContent = `작성자: ${post.author} | 작성일: ${post.date}`;
  document.getElementById("post-content").textContent = post.content;
} else {
  document.getElementById("post-title").textContent = "게시글을 찾을 수 없습니다.";
  document.getElementById("post-content").textContent = "삭제되었거나 존재하지 않는 글입니다.";
}

// 댓글 관련
function addComment() {
  const input = document.getElementById("comment-input");
  const content = input.value.trim();
  if (!content) return;

  const comments = JSON.parse(localStorage.getItem(`comments-${postId}`)) || [];
  comments.push({ text: content, date: new Date().toLocaleString() });
  localStorage.setItem(`comments-${postId}`, JSON.stringify(comments));

  input.value = "";
  renderComments();
}

function renderComments() {
  const comments = JSON.parse(localStorage.getItem(`comments-${postId}`)) || [];
  const list = document.getElementById("comment-list");
  list.innerHTML = "";

  comments.forEach(c => {
    const div = document.createElement("div");
    div.className = "comment-item";
    div.innerHTML = `<p>${c.text}</p><small>${c.date}</small>`;
    list.appendChild(div);
  });
}

window.onload = renderComments;
