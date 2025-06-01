document.addEventListener("DOMContentLoaded", async () => {
  try {
    const standingsResp = await fetch('https://premier-dl8h.onrender.com/api/standing');
    const standingsData = await standingsResp.json();
    const standings = Array.isArray(standingsData.result) ? standingsData.result : [];

    const tableBody = document.querySelector('#standings-table tbody');
    if (!tableBody) {
      console.error("Không tìm thấy tbody trong bảng #standings-table");
      return;
    }
    tableBody.innerHTML = '';

    standings.forEach(standing => {
      const team = standing.team;
      if (!team) {
        console.warn("Không có team trong standing:", standing);
        return;
      }

      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td>${standing.position}</td>
        <td class="team">
          <div class="team-content">
            <img src="${team.logoUrl}" alt="${team.name}" class="team-logo" />
            <span class="team-name">${team.name}</span>
          </div>
        </td>
        <td>${standing.played}</td>
        <td>${standing.goalDifference}</td>
        <td><b>${standing.points}</b></td>
      `;
      tableBody.appendChild(tr);
    });

  } catch (error) {
    console.error("Lỗi khi tải dữ liệu bảng xếp hạng:", error);
  }
});
