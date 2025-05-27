document.addEventListener("DOMContentLoaded", async () => {
  try {
    // 1. Lấy dữ liệu từ API
    const [teamsData, matchesData, eventsData, playersData] = await Promise.all([
      fetch("https://premier-dl8h.onrender.com/api/team").then(res => res.json()),
      fetch("https://premier-dl8h.onrender.com/api/match").then(res => res.json()),
      fetch("https://premier-dl8h.onrender.com/api/matchevent").then(res => res.json()),
      fetch("https://premier-dl8h.onrender.com/api/player").then(res => res.json())
    ]);
    
    const teams = {};
    (teamsData.result || []).forEach(t => teams[t.teamId] = t);

    const matches = matchesData.result || [];
    const events = eventsData.result || [];
    const players = playersData.result || [];

    const recentMatchesContainer = document.querySelector("#recent-matches .match-body");
    if (recentMatchesContainer) {
      recentMatchesContainer.innerHTML = "";

      // Lọc trận đã đá (status khác 'scheduled')
      const playedMatches = matches.filter(m => m.status !== "scheduled");

      // Nhóm trận theo ngày
      const matchesByDate = {};
      playedMatches.forEach(m => {
        const dateKey = new Date(m.matchDate).toISOString().split("T")[0];
        if (!matchesByDate[dateKey]) matchesByDate[dateKey] = [];
        matchesByDate[dateKey].push(m);
      });

      // Sắp xếp ngày tăng dần
      const sortedDates = Object.keys(matchesByDate).sort();

      // Hàm format ngày tiếng Anh
      function formatDateEN(dateString) {
        const options = { weekday: "long", day: "numeric", month: "long", year: "numeric" };
        return new Date(dateString).toLocaleDateString("en-GB", options);
      }

      sortedDates.forEach(date => {
        // Header ngày
        const dateHeader = document.createElement("h3");
        dateHeader.className = "date-header";
        dateHeader.textContent = formatDateEN(date);
        recentMatchesContainer.appendChild(dateHeader);

        matchesByDate[date].forEach(match => {
          const matchItem = document.createElement("div");
          matchItem.className = "match-item";
          matchItem.innerHTML = `
            <div class="result-section">
              <div class="match-result">
                <p class="name-left">${match.homeTeamId.name}</p>
                <img src="${match.homeTeamId.logoUrl}" alt="${match.homeTeamId.name}">
                <span>${match.homeScore} - ${match.awayScore}</span>
                <img src="${match.awayTeamId.logoUrl}" alt="${match.awayTeamId.name}">
                <p class="name-right">${match.awayTeamId.name}</p>   
              </div>
              <div class="stadium-location">
                <svg viewBox="0 0 16 11" xmlns="http://www.w3.org/2000/svg">
                  <path d="..."/> <!-- SVG path -->
                </svg>
                <p>${match.stadium.name}, ${match.stadium.city}</p>
              </div>
              <i class="fa-solid fa-circle-chevron-down"></i>
            </div>
          `;

          // Div chi tiết ẩn
          const detailDiv = document.createElement("div");
          detailDiv.className = "match-detail";
          detailDiv.style.display = "none";
          matchItem.appendChild(detailDiv);

          // Click mở/đóng chi tiết
          matchItem.querySelector(".result-section").addEventListener("click", () => {
            // Đóng tất cả các chi tiết khác
            const allDetails = recentMatchesContainer.querySelectorAll(".match-detail");
            allDetails.forEach(d => {
              if (d !== detailDiv) d.style.display = "none";
            });
            
            if (detailDiv.style.display === "none") {
              // Lấy events của trận đấu này
              const matchEvents = events.filter(e => e.match.matchId === match.matchId);

              console.log("Match ID:", match.matchId);
              console.log("Home Team ID:", match.homeTeamId.teamId);
              console.log("Away Team ID:", match.awayTeamId.teamId);
              console.log("Match Events:", matchEvents);

              // Phân chia sự kiện theo đội - SỬA LOGIC TẠI ĐÂY
              const homeTeamEvents = matchEvents.filter(e => {
                // Kiểm tra xem player có thuộc về đội nhà không
                // Dựa vào cấu trúc API: e.player.team.teamId
                const playerTeamId = e.player && e.player.team ? e.player.team.teamId : null;
                console.log("Player Team ID:", playerTeamId, "vs Home Team:", match.homeTeamId.teamId);
                return playerTeamId === match.homeTeamId.teamId;
              });

              const awayTeamEvents = matchEvents.filter(e => {
                // Kiểm tra xem player có thuộc về đội khách không
                const playerTeamId = e.player && e.player.team ? e.player.team.teamId : null;
                console.log("Player Team ID:", playerTeamId, "vs Away Team:", match.awayTeamId.teamId);
                return playerTeamId === match.awayTeamId.teamId;
              });

              console.log("Home Team Events:", homeTeamEvents);
              console.log("Away Team Events:", awayTeamEvents);

              // Tạo HTML cho từng đội
              const createTeamEventsHTML = (teamEvents, teamName) => {
                if (teamEvents.length === 0) {
                  return `<li style="color: #666; font-style: italic;">No events for ${teamName}</li>`;
                }
                
                return teamEvents
                  .sort((a, b) => a.minute - b.minute) // Sắp xếp theo phút
                  .map(e => {
                    // Lấy tên player trực tiếp từ event (không cần find thêm)
                    const playerName = e.player && e.player.name ? e.player.name : "Unknown Player";
                    
                    // Format event type
                    const eventTypeFormatted = e.eventType.charAt(0).toUpperCase() + e.eventType.slice(1);
                    
                    return `
                      <li style="margin-bottom: 8px; padding: 5px; background-color: #f8f9fa; border-radius: 4px;">
                        <strong style="color: #28a745;">${e.minute}'</strong> - 
                        <span style="color: #007bff; font-weight: bold;">${eventTypeFormatted}</span> - 
                        <span>${playerName}</span>
                        ${e.description ? `<br><small style="color: #666;">${e.description}</small>` : ''}
                      </li>
                    `;
                  }).join("");
              };

              detailDiv.innerHTML = `
                <div style="display: flex; gap: 20px; padding: 15px; background-color: #f8f9fa; border-radius: 8px; margin-top: 10px;">
                  <div style="flex: 1;">
                    <h4 style="color: #007bff; margin-bottom: 10px; display: flex; align-items: center;">
                      <img src="${match.homeTeamId.logoUrl}" alt="${match.homeTeamId.name}" style="width: 20px; height: 20px; margin-right: 8px;">
                      ${match.homeTeamId.name} (Home)
                    </h4>
                    <ul style="list-style-type: none; padding-left: 0; margin: 0;">
                      ${createTeamEventsHTML(homeTeamEvents, match.homeTeamId.name)}
                    </ul>
                  </div>
                  
                  <div style="width: 2px; background-color: #ddd; margin: 0 10px;"></div>
                  
                  <div style="flex: 1;">
                    <h4 style="color: #dc3545; margin-bottom: 10px; display: flex; align-items: center;">
                      <img src="${match.awayTeamId.logoUrl}" alt="${match.awayTeamId.name}" style="width: 20px; height: 20px; margin-right: 8px;">
                      ${match.awayTeamId.name} (Away)
                    </h4>
                    <ul style="list-style-type: none; padding-left: 0; margin: 0;">
                      ${createTeamEventsHTML(awayTeamEvents, match.awayTeamId.name)}
                    </ul>
                  </div>
                </div>
              `;
              detailDiv.style.display = "block";
            } else {
              detailDiv.style.display = "none";
            }
          });

          recentMatchesContainer.appendChild(matchItem);
        });
      });
    }

    // --- HIỂN THỊ PHẦN UPCOMING MATCHES (Trận sắp đấu)
    const upcomingMatchesContainer = document.querySelector("#upcoming-matches .match-body");
    if (upcomingMatchesContainer) {
      upcomingMatchesContainer.innerHTML = ""; // Xóa hết cũ

      // Lọc trận sắp đấu
      const upcomingMatches = matches.filter(m => m.status === "scheduled");

      // Gom nhóm theo ngày yyyy-mm-dd
      const upcomingByDate = {};
      upcomingMatches.forEach(m => {
        const dateKey = new Date(m.matchDate).toISOString().split("T")[0];
        if (!upcomingByDate[dateKey]) upcomingByDate[dateKey] = [];
        upcomingByDate[dateKey].push(m);
      });

      // Sắp xếp ngày tăng dần
      const upcomingDates = Object.keys(upcomingByDate).sort();

      upcomingDates.forEach(date => {
        // Tạo header ngày
        const dateHeaderDiv = document.createElement("div");
        dateHeaderDiv.className = "date-header";
        dateHeaderDiv.style.fontSize = "1.5vw";
        dateHeaderDiv.style.paddingBottom = "5px";
        dateHeaderDiv.style.paddingTop = "10px";
        dateHeaderDiv.textContent = new Date(date).toLocaleDateString("en-US", {
          weekday: "long",
          day: "numeric",
          month: "long"
        });
        upcomingMatchesContainer.appendChild(dateHeaderDiv);

        upcomingByDate[date].forEach(match => {
          const home = match.homeTeamId;
          const away = match.awayTeamId;
          if (!home || !away) return;

          const matchDiv = document.createElement("div");
          matchDiv.className = "match-upc-area";

          matchDiv.innerHTML = `
            <div class="match-upc">
              <p>${home.shortName || home.name}</p>
              <img src="${home.logoUrl}" alt="${home.name}">
              <span>${new Date(match.matchDate).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</span>
              <img src="${away.logoUrl}" alt="${away.name}">
              <p>${away.shortName || away.name}</p>
            </div>
          `;

          upcomingMatchesContainer.appendChild(matchDiv);
        });
      });
    }
  } catch (error) {
    console.error("Failed to load matches data:", error);
  }
});