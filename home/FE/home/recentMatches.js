document.addEventListener('DOMContentLoaded', async () => {
  try {
    // Lấy danh sách trận đấu
    const matchesResp = await fetch('https://premier-dl8h.onrender.com/api/match');
    const matchesData = (await matchesResp.json()).result;

    // Lọc ra các trận đã kết thúc
    const finishedMatches = matchesData.filter(m => m.status === 'finished');
    if (!finishedMatches.length) return;

    // Lọc ra 2 ngày gần nhất có trận đã đá
    const uniqueDates = [...new Set(finishedMatches.map(m => m.matchDate.split('T')[0]))];
    uniqueDates.sort((a, b) => new Date(b) - new Date(a));
    const recent2Days = uniqueDates.slice(0, 2);

    // Lấy khung container và mẫu
    const container = document.querySelector('#recent-matches .match-body');
    if (!container) return;
    const template = container.querySelector('.match-result-area');
    if (!template) return;

    // Xóa các phần tử cũ
    container.querySelectorAll('.match-result-area').forEach(e => e.remove());

    // Tạo hiển thị theo từng ngày
    recent2Days.forEach(day => {
      const dateDiv = document.createElement('div');
      dateDiv.style.fontSize = '1.5vw';
      dateDiv.style.paddingBottom = '5px';
      dateDiv.style.paddingTop = '10px';
      dateDiv.textContent = new Date(day).toLocaleDateString("en-US", {
        weekday: 'long',
        day: 'numeric',
        month: 'long'
      });
      container.appendChild(dateDiv);

      const matchesOfDay = finishedMatches.filter(m => m.matchDate.startsWith(day));
      matchesOfDay.forEach(m => {
        const home = m.homeTeamId;
        const away = m.awayTeamId;
        if (!home || !away) return;

        // Clone mẫu
        const clone = template.cloneNode(true);
        clone.style.display = 'flex';
        clone.style.justifyContent = 'center';

        const resultDiv = clone.querySelector('.match-result');
        resultDiv.innerHTML = `
          <p>${home.shortName || home.name}</p>
          <img src="${home.logoUrl}" alt="${home.name}">
          <span>${m.homeScore} - ${m.awayScore}</span>
          <img src="${away.logoUrl}" alt="${away.name}">
          <p>${away.shortName || away.name}</p>
        `;

        container.appendChild(clone);
      });
    });

  } catch (e) {
    console.error('Lỗi recentMatches:', e);
  }
});
