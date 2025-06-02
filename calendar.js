const calendarEl = document.getElementById("calendar");
const monthYearEl = document.getElementById("current-month-year");

let today = new Date();
let currentMonth = today.getMonth();
let currentYear = today.getFullYear();

function renderCalendar(month, year) {
  const firstDay = new Date(year, month, 1).getDay();
  const lastDate = new Date(year, month + 1, 0).getDate();

  // 제목 갱신
  const monthNames = ["1월", "2월", "3월", "4월", "5월", "6월", "7월", "8월", "9월", "10월", "11월", "12월"];
  monthYearEl.textContent = `${year}년 ${monthNames[month]}`;

  // 달력 초기화
  calendarEl.innerHTML = `
    <thead>
      <tr>
        <th>일</th><th>월</th><th>화</th><th>수</th><th>목</th><th>금</th><th>토</th>
      </tr>
    </thead>
    <tbody></tbody>
  `;

  const tbody = calendarEl.querySelector("tbody");
  let date = 1;

  for (let i = 0; i < 6; i++) {
    const row = document.createElement("tr");

    for (let j = 0; j < 7; j++) {
      const cell = document.createElement("td");

      if (i === 0 && j < firstDay) {
        cell.textContent = "";
      } else if (date > lastDate) {
        break;
      } else {
        cell.textContent = date;

        const events = getEventsForDate(year, month, date);
        events.forEach(event => {
          const eventEl = document.createElement("span");
          eventEl.className = "event";
          eventEl.textContent = event.title;
          if (event.color) {
            eventEl.style.backgroundColor = event.color;
            eventEl.style.color = "#000"; // 글씨색 자동 조절 (필요시 수정)
          }
          cell.appendChild(eventEl);
        });

        // 오늘 날짜 강조
        const isToday =
          date === today.getDate() &&
          month === today.getMonth() &&
          year === today.getFullYear();
        if (isToday) {
          cell.style.backgroundColor = "#e6f7ff";
        }

        date++;
      }

      row.appendChild(cell);
    }

    tbody.appendChild(row);
  }
}

function prevMonth() {
  currentMonth--;
  if (currentMonth < 0) {
    currentMonth = 11;
    currentYear--;
  }
  renderCalendar(currentMonth, currentYear);
}

function nextMonth() {
  currentMonth++;
  if (currentMonth > 11) {
    currentMonth = 0;
    currentYear++;
  }
  renderCalendar(currentMonth, currentYear);
}

function getEventsForDate(year, month, day) {
  const allEvents = JSON.parse(localStorage.getItem("events") || "[]");
  return allEvents.filter(event => {
    const d = new Date(event.date);
    return (
      d.getFullYear() === year &&
      d.getMonth() === month &&
      d.getDate() === day
    );
  });
}

renderCalendar(currentMonth, currentYear);
