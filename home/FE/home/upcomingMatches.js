document.addEventListener('DOMContentLoaded', async () => {
  try {
    const teamsData = (await fetch('https://premier-dl8h.onrender.com/api/team').then(r => r.json())).result || [];
    const teams = {};
    teamsData.forEach(t => teams[t.teamId] = t);

    const matchesData = await fetch('https://premier-dl8h.onrender.com/api/match').then(r => r.json());
    const matches = matchesData.result || [];

    // Lọc các trận sắp đấu (status = 'scheduled')
    const upcomingMatches = matches.filter(m => m.status === 'scheduled');

    // Gom nhóm theo ngày
    const matchesByDate = {};
    upcomingMatches.forEach(m => {
      const dateKey = new Date(m.matchDate).toISOString().split('T')[0];
      if (!matchesByDate[dateKey]) matchesByDate[dateKey] = [];
      matchesByDate[dateKey].push(m);
    });

    // Lấy 2 ngày gần nhất
    const dates = Object.keys(matchesByDate).sort();
    const nearestTwoDates = dates.slice(0, 2);

    // Lấy container hiển thị
    const container = document.querySelector('#upcoming-matches .match-body');
    if (!container) return;
    container.querySelectorAll('.match-upc-area').forEach(e => e.remove());

    nearestTwoDates.forEach(date => {
      const dateHeaderDiv = document.createElement('div');
      dateHeaderDiv.style.fontSize = '1.5vw';
      dateHeaderDiv.style.paddingBottom = '5px';
      dateHeaderDiv.style.paddingTop = '10px';
      dateHeaderDiv.textContent = new Date(date).toLocaleDateString("en-US", {
        weekday: 'long',
        day: 'numeric',
        month: 'long'
      });
      container.appendChild(dateHeaderDiv);

      matchesByDate[date].forEach(match => {
        // Lấy trực tiếp từ đối tượng team trong match
        const home = match.homeTeamId;
        const away = match.awayTeamId;
        if (!home || !away) return;

        const matchDiv = document.createElement('div');
        matchDiv.className = 'match-upc-area';

        matchDiv.innerHTML = `
          <div class="match-upc">
            <p>${home.shortName || home.name}</p>
            <img src="${home.logoUrl}" alt="${home.name}">
            <span>${new Date(match.matchDate).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
            <img src="${away.logoUrl}" alt="${away.name}">
            <p>${away.shortName || away.name}</p>
          </div>
        `;
        container.appendChild(matchDiv);
      });
    });
  } catch (error) {
    console.error('Failed to load upcoming matches:', error);
  }
});
