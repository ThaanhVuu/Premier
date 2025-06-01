document.addEventListener("DOMContentLoaded", function () {
  let standings = [];
  let teams = [];
  let matches = [];
  let currentMatchweek = "";
  let currentHomeAway = "all";

  const tableBody = document.querySelector('#standings-table tbody');

  function renderTable() {
    tableBody.innerHTML = "";

    standings.forEach(standing => {
      const team = teams.find(t => t.teamId === standing.team.teamId);
      if (!team) return;

      // Lấy danh sách trận đã đấu của đội theo filter
      let playedMatches = matches.filter(m =>
        m.status === "finished" &&
        (m.homeTeamId.teamId === standing.team.teamId || m.awayTeamId.teamId === standing.team.teamId) &&
        (currentMatchweek === "" || m.matchWeek == currentMatchweek)
      );

      if (currentHomeAway === "home") {
        playedMatches = playedMatches.filter(m => m.homeTeamId.teamId === standing.team.teamId);
      } else if (currentHomeAway === "away") {
        playedMatches = playedMatches.filter(m => m.awayTeamId.teamId === standing.team.teamId);
      }

      playedMatches = playedMatches.sort((a, b) => new Date(b.matchDate) - new Date(a.matchDate)).slice(0, 5);

      const formHtml = Array.from({ length: 5 }).map((_, i) => {
        if (i >= playedMatches.length) return `<div class="form-circle empty"></div>`;
        const match = playedMatches[i];
        const isHome = match.homeTeamId.teamId === standing.team.teamId;
        const goalsFor = isHome ? match.homeScore : match.awayScore;
        const goalsAgainst = isHome ? match.awayScore : match.homeScore;

        if (goalsFor > goalsAgainst) return `<div class="form-circle win">W</div>`;
        if (goalsFor < goalsAgainst) return `<div class="form-circle loss">L</div>`;
        return `<div class="form-circle draw">D</div>`;
      }).join("");

      // Tìm trận kế tiếp
      let upcoming = matches.filter(m =>
        m.status === "scheduled" &&
        (m.homeTeamId.teamId === standing.team.teamId || m.awayTeamId.teamId === standing.team.teamId) &&
        (currentMatchweek === "" || m.matchWeek == currentMatchweek)
      );

      if (currentHomeAway === "home") {
        upcoming = upcoming.filter(m => m.homeTeamId.teamId === standing.team.teamId);
      } else if (currentHomeAway === "away") {
        upcoming = upcoming.filter(m => m.awayTeamId.teamId === standing.team.teamId);
      }

      upcoming = upcoming.sort((a, b) => new Date(a.matchDate) - new Date(b.matchDate))[0];

      let nextTeamLogo = '';
      if (upcoming) {
        const opponentId = upcoming.homeTeamId.teamId === standing.team.teamId ? upcoming.awayTeamId.teamId : upcoming.homeTeamId.teamId;
        const opponent = teams.find(t => t.teamId === opponentId);
        if (opponent) {
          nextTeamLogo = `
            <img src="${opponent.logoUrl}" alt="${opponent.name}" class="next-logo" title="Next match vs ${opponent.name}">
            <span class="next-team-name">${opponent.name}</span>
          `;
        }
      }

      const row = document.createElement('tr');
      row.dataset.teamId = standing.team.teamId;
      row.innerHTML = `
        <td class="position-cell">
          <span class="position">${standing.position}</span>
          <span class="status-icon">•</span>
        </td>
        <td class="club-cell">
          <img src="${team.logoUrl}" alt="${team.shortName}" class="club-logo">
          <span class="club-name">${team.name}</span>
        </td>
        <td>${standing.played}</td>
        <td>${standing.won}</td>
        <td>${standing.drawn}</td>
        <td>${standing.lost}</td>
        <td>${standing.goalsFor}</td>
        <td>${standing.goalsAgainst}</td>
        <td>${standing.goalDifference}</td>
        <td class="points">${standing.points}</td>
        <td><div class="form-container">${formHtml}</div></td>
        <td class="next-team">${nextTeamLogo}</td>
        <td class="expand-btn">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="6 9 12 15 18 9"></polyline>
          </svg>
        </td>
      `;
      tableBody.appendChild(row);
      
      // Add event listener to expand button
      const expandBtn = row.querySelector('.expand-btn');
      expandBtn.addEventListener('click', function() {
        handleExpandClick(standing.team.teamId, row);
      });
    });
  }

  // Handle expand button click
  function handleExpandClick(teamId, row) {
    // Check if detail row already exists
    const existingDetailRow = document.querySelector(`tr.detail-row[data-team-id="${teamId}"]`);
    
    // Close all other expanded rows first
    document.querySelectorAll('tr.detail-row').forEach(detailRow => {
      if (detailRow !== existingDetailRow) {
        detailRow.remove();
        
        // Reset the expand button icon for all other rows
        const parentRow = document.querySelector(`tr[data-team-id="${detailRow.dataset.teamId}"]`);
        if (parentRow) {
          const expandBtn = parentRow.querySelector('.expand-btn svg');
          expandBtn.innerHTML = '<polyline points="6 9 12 15 18 9"></polyline>';
        }
      }
    });
    
    if (existingDetailRow) {
      // If detail row exists, remove it (collapse)
      existingDetailRow.remove();
      
      // Reset the expand button icon
      const expandBtn = row.querySelector('.expand-btn svg');
      expandBtn.innerHTML = '<polyline points="6 9 12 15 18 9"></polyline>';
    } else {
      // If no detail row, create it (expand)
      const expandBtn = row.querySelector('.expand-btn svg');
      expandBtn.innerHTML = '<polyline points="18 15 12 9 6 15"></polyline>';
      
      createDetailRow(teamId, row);
    }
  }

  function createDetailRow(teamId, row) {
    const team = teams.find(t => t.teamId === teamId);
    if (!team) return;
    
    // Create detail row
    const detailRow = document.createElement('tr');
    detailRow.className = 'detail-row';
    detailRow.dataset.teamId = teamId;
    
    // Create detail cell that spans all columns
    const detailCell = document.createElement('td');
    detailCell.colSpan = 13; // Span all columns in table
    
    // Create container for recent and upcoming matches
    const detailContainer = document.createElement('div');
    detailContainer.className = 'team-detail-container';
    detailContainer.innerHTML = `
      <div class="team-matches-container">
        <div class="team-recent-matches">
          <h3>Recent Matches</h3>
          <div id="team-recent-matches-${teamId}" class="match-body"></div>
        </div>
        <div class="team-upcoming-matches">
          <h3>Upcoming Matches</h3>
          <div id="team-upcoming-matches-${teamId}" class="match-body"></div>
        </div>
      </div>
    `;
    
    detailCell.appendChild(detailContainer);
    detailRow.appendChild(detailCell);
    
    // Insert detail row after the team row
    row.parentNode.insertBefore(detailRow, row.nextSibling);
    
    // Load recent matches data
    loadRecentMatches(teamId);
    
    // Load upcoming matches data
    loadUpcomingMatches(teamId);
  }

  // Load recent matches for a team
  async function loadRecentMatches(teamId) {
    try {
      const recentMatchesContainer = document.querySelector(`#team-recent-matches-${teamId}`);
      if (!recentMatchesContainer) return;
      
      // Get finished matches for this team
      const teamMatches = matches.filter(m => 
        m.status === 'finished' && 
        (m.homeTeamId.teamId === teamId || m.awayTeamId.teamId === teamId)
      );
      
      // Sort by date (newest first) and take the most recent 5
      const recentMatches = teamMatches
        .sort((a, b) => new Date(b.matchDate) - new Date(a.matchDate))
        .slice(0, 5);
      
      if (recentMatches.length === 0) {
        recentMatchesContainer.innerHTML = '<p>No recent matches found.</p>';
        return;
      }
      
      // Group matches by date
      const matchesByDate = {};
      recentMatches.forEach(match => {
        const dateKey = match.matchDate.split('T')[0];
        if (!matchesByDate[dateKey]) {
          matchesByDate[dateKey] = [];
        }
        matchesByDate[dateKey].push(match);
      });
      
      // Clear container
      recentMatchesContainer.innerHTML = '';
      
      // Add matches by date
      Object.keys(matchesByDate)
        .sort((a, b) => new Date(b) - new Date(a))
        .forEach(date => {
          // Create date header
          const dateHeader = document.createElement('div');
          dateHeader.className = 'match-date-header';
          dateHeader.textContent = new Date(date).toLocaleDateString("en-US", {
            weekday: 'long',
            day: 'numeric',
            month: 'long'
          });
          recentMatchesContainer.appendChild(dateHeader);
          
          // Add matches for this date
          matchesByDate[date].forEach(match => {
            const home = teams.find(t => t.teamId === match.homeTeamId.teamId);
            const away = teams.find(t => t.teamId === match.awayTeamId.teamId);
            if (!home || !away) return;
            
            const matchDiv = document.createElement('div');
            matchDiv.className = 'match-result-area';
            matchDiv.style.display = 'flex';
            matchDiv.style.justifyContent = 'center';
            
            matchDiv.innerHTML = `
              <div class="match-result">
                <p>${home.shortName || home.name}</p>
                <img src="${home.logoUrl}" alt="${home.name}">
                <span>${match.homeScore} - ${match.awayScore}</span>
                <img src="${away.logoUrl}" alt="${away.name}">
                <p>${away.shortName || away.name}</p>
              </div>
            `;
            
            recentMatchesContainer.appendChild(matchDiv);
          });
        });
    } catch (e) {
      console.error('Error loading recent matches:', e);
    }
  }

  // Load upcoming matches for a team
  async function loadUpcomingMatches(teamId) {
    try {
      const upcomingMatchesContainer = document.querySelector(`#team-upcoming-matches-${teamId}`);
      if (!upcomingMatchesContainer) return;
      
      // Get scheduled matches for this team
      const teamMatches = matches.filter(m => 
        m.status === 'scheduled' && 
        (m.homeTeamId.teamId === teamId || m.awayTeamId.teamId === teamId)
      );
      
      // Sort by date (oldest first) and take the next 5
      const upcomingMatches = teamMatches
        .sort((a, b) => new Date(a.matchDate) - new Date(b.matchDate))
        .slice(0, 5);
      
      if (upcomingMatches.length === 0) {
        upcomingMatchesContainer.innerHTML = '<p>No upcoming matches found.</p>';
        return;
      }
      
      // Group matches by date
      const matchesByDate = {};
      upcomingMatches.forEach(match => {
        const dateKey = new Date(match.matchDate).toISOString().split('T')[0];
        if (!matchesByDate[dateKey]) {
          matchesByDate[dateKey] = [];
        }
        matchesByDate[dateKey].push(match);
      });
      
      // Clear container
      upcomingMatchesContainer.innerHTML = '';
      
      // Add matches by date
      Object.keys(matchesByDate)
        .sort((a, b) => new Date(a) - new Date(b))
        .forEach(date => {
          // Create date header
          const dateHeader = document.createElement('div');
          dateHeader.className = 'match-date-header';
          dateHeader.textContent = new Date(date).toLocaleDateString("en-US", {
            weekday: 'long',
            day: 'numeric',
            month: 'long'
          });
          upcomingMatchesContainer.appendChild(dateHeader);
          
          // Add matches for this date
          matchesByDate[date].forEach(match => {
            const home = teams.find(t => t.teamId === match.homeTeamId.teamId);
            const away = teams.find(t => t.teamId === match.awayTeamId.teamId);
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
            
            upcomingMatchesContainer.appendChild(matchDiv);
          });
        });
    } catch (e) {
      console.error('Error loading upcoming matches:', e);
    }
  }

  // Load dữ liệu ban đầu
  Promise.all([
    fetch('https://premier-dl8h.onrender.com/api/standing').then(res => res.json()),
    fetch('https://premier-dl8h.onrender.com/api/team').then(res => res.json()),
    fetch('https://premier-dl8h.onrender.com/api/match').then(res => res.json())
  ]).then(([standingsData, teamsData, matchesData]) => {
    standings = standingsData.result;
    teams = teamsData.result;
    matches = matchesData.result;
    renderTable();
    
    // Populate matchweek dropdown sau khi có dữ liệu
    populateMatchweekDropdown();
  }).catch(error => console.error('Error loading data:', error));

  // Populate matchweek dropdown
  function populateMatchweekDropdown() {
    const matchWeeks = [...new Set(matches.map(m => m.matchWeek))].sort((a, b) => a - b);
    matchweekDropdown.innerHTML = `<a href="#" data-matchweek="">All Matchweek</a>` +
      matchWeeks.map(w => `<a href="#" data-matchweek="${w}">Matchweek ${w}</a>`).join('');
  }

  // Dropdown Matchweek
  const filtersSelect = document.getElementById('filters-select');
  const matchweekDropdown = document.getElementById('matchweek-dropdown');

  filtersSelect.addEventListener('click', () => {
    matchweekDropdown.classList.toggle('show');
  });

  matchweekDropdown.addEventListener('click', e => {
    if (e.target.tagName === 'A') {
      e.preventDefault();
      currentMatchweek = e.target.dataset.matchweek || "";
      filtersSelect.textContent = currentMatchweek ? `Matchweek ${currentMatchweek}` : "All Matchweek";
      matchweekDropdown.classList.remove('show');
      renderTable();
    }
  });

  // Dropdown Home/Away
  const homeAwaySelect = document.getElementById('home-away-select');
  const homeAwayDropdown = document.getElementById('home-away-dropdown');

  homeAwaySelect.addEventListener('click', () => {
    homeAwayDropdown.classList.toggle('show');
  });

  homeAwayDropdown.addEventListener('click', e => {
    if (e.target.tagName === 'A') {
      e.preventDefault();
      currentHomeAway = e.target.dataset.filter || "all";
      homeAwaySelect.textContent = e.target.textContent;
      homeAwayDropdown.classList.remove('show');
      renderTable();
    }
  });

  // Đóng dropdown khi click ra ngoài
  document.addEventListener('click', e => {
    if (!matchweekDropdown.contains(e.target) && e.target !== filtersSelect) {
      matchweekDropdown.classList.remove('show');
    }
    if (!homeAwayDropdown.contains(e.target) && e.target !== homeAwaySelect) {
      homeAwayDropdown.classList.remove('show');
    }
  });
  
  // Reset filters
  const resetFilterBtn = document.getElementById('reset-filter');

  resetFilterBtn.addEventListener('click', () => {
    currentMatchweek = "";
    currentHomeAway = "all";

    // Reset hiển thị label
    filtersSelect.textContent = "All Matchweek";
    homeAwaySelect.textContent = "All Matches";

    renderTable();
  });
  document.head.appendChild(style);
});