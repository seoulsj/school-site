// 공통 저장 함수 (사용할 경우)
function saveToStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

function loadFromStorage(key) {
  return JSON.parse(localStorage.getItem(key)) || [];
}

// 예: 건의사항 저장
function submitSuggestion() {
  const name = document.getElementById("suggest-name").value.trim();
  const content = document.getElementById("suggest-content").value.trim();
  if (!content) return alert("내용을 입력하세요.");

  const suggestions = loadFromStorage("suggestions");
  suggestions.push({
    name,
    content,
    date: new Date().toLocaleString()
  });

  saveToStorage("suggestions", suggestions);
  alert("건의가 제출되었습니다.");
  document.getElementById("suggest-name").value = "";
  document.getElementById("suggest-content").value = "";
}
