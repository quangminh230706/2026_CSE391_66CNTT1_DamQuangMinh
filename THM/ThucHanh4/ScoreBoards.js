const nameInput = document.getElementById("name");
const scoreInput = document.getElementById("score");
const addBtn = document.getElementById("addBtn");
const tableBody = document.getElementById("tableBody");
const stats = document.getElementById("stats");
const searchInput = document.getElementById("SearchName");
const rankFilter = document.getElementById("rankFilter");
let students = [];

function getRank(score) {
  if (score >= 8.5) return "Giỏi";
  if (score >= 7) return "Khá";
  if (score >= 5) return "Trung bình";
  return "Yếu";
}

function renderTable() {
  tableBody.innerHTML = "";

  let keyword = searchInput.value.trim().toLowerCase();
  let rank = rankFilter.value;

  let filtered = students.filter(function (sv) {
    let matchesKeyword = sv.name.toLowerCase().includes(keyword);
    let matchesRank = rank === "all" || getRank(sv.score) === rank;
    return matchesKeyword && matchesRank;
  });

  if (filtered.length === 0) {
    tableBody.innerHTML =
      "<tr><td colspan='5'>Không có sinh viên nào phù hợp</td></tr>";
    return;
  }

  filtered.forEach((sv, index) => {
    const tr = document.createElement("tr");

    if (sv.score < 5) {
      tr.classList.add("low-score");
    }

    tr.innerHTML = `
        <td>${index + 1}</td>
        <td>${sv.name}</td>
        <td>${sv.score}</td>
        <td>${getRank(sv.score)}</td>
       <td><button data-index="${students.indexOf(sv)}">Xóa</button></td>
        `;

    tableBody.appendChild(tr);
  });

  updateStats();
}

function updateStats() {
  const total = students.length;

  let avg = 0;

  if (total > 0) {
    const sum = students.reduce((acc, sv) => acc + sv.score, 0);
    avg = (sum / total).toFixed(2);
  }

  stats.textContent = `Tổng sinh viên: ${total} | Điểm trung bình: ${avg}`;
}

function addStudent() {
  const name = nameInput.value.trim();
  const score = parseFloat(scoreInput.value);

  if (name === "") {
    alert("Họ tên không được trống");
    return;
  }

  if (isNaN(score) || score < 0 || score > 10) {
    alert("Điểm phải từ 0 đến 10");
    return;
  }

  students.push({
    name: name,
    score: score,
  });

  renderTable();

  nameInput.value = "";
  scoreInput.value = "";

  nameInput.focus();
}

addBtn.addEventListener("click", addStudent);

scoreInput.addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    addStudent();
  }
});

tableBody.addEventListener("click", function (e) {
  if (e.target.tagName === "BUTTON") {
    const index = e.target.dataset.index;

    students.splice(index, 1);

    renderTable();
  }
});
searchInput.addEventListener("input", renderTable);
rankFilter.addEventListener("change", renderTable);
