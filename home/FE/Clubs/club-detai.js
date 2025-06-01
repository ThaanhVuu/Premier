// Lấy teamId từ URL
const urlParams = new URLSearchParams(window.location.search);
const teamId = urlParams.get('teamId');

// Kiểm tra nếu có teamId
if (!teamId) {
  console.error('Không tìm thấy teamId trên URL');
} else {
  console.log('teamId:', teamId);

  // ================================
  // Fetch thông tin đội bóng (header)
  // ================================
  fetch('https://premier-dl8h.onrender.com/api/team')
    .then(response => response.json())
    .then(data => {
      const team = data.result.find(t => t.teamId == teamId);
      if (!team) {
        console.error('Không tìm thấy đội bóng!');
        return;
      }

      const headerDiv = document.querySelector('.detail-section-header');
      headerDiv.innerHTML = `
        <img src="${team.logoUrl}" alt="${team.name}">
        <div class="title">
          <h2>${team.name}</h2>
          <div class="mini-title">
            <p>Est: ${team.foundedYear}</p>
            <span>•</span>
            <p>${team.stadium.name}, ${team.stadium.city}</p>
            <span>•</span>
            <p>Capacity: ${team.stadium.capacity.toLocaleString()}</p>
          </div>
        </div>
      `;
    })
    .catch(error => console.error('Lỗi lấy dữ liệu đội:', error));

  // ================================
  // Fetch danh sách cầu thủ của đội
  // ================================
  fetch('https://premier-dl8h.onrender.com/api/player')
    .then(response => response.json())
    .then(data => {
      const players = data.result.filter(player => player.team.teamId == teamId);
      console.log(`Tìm thấy ${players.length} cầu thủ cho teamId=${teamId}`);

      const positions = {
        Goalkeepers: [],
        Defenders: [],
        Midfielders: [],
        Forwards: []
      };

      // Phân loại cầu thủ theo vị trí
      players.forEach(player => {
        const pos = player.position.toLowerCase();
        if (pos.includes('goalkeeper')) {
          positions.Goalkeepers.push(player);
        } else if (pos.includes('defender') || pos.includes('back') || pos.includes('centre-back') || pos.includes('full-back')) {
          positions.Defenders.push(player);
        } else if (pos.includes('midfield')) {
          positions.Midfielders.push(player);
        } else {
          positions.Forwards.push(player);
        }
      });

      // Hiển thị cầu thủ theo từng nhóm vị trí
      const container = document.querySelector('.detail-container');
      container.innerHTML = ''; // Xóa nội dung cũ nếu có

      Object.entries(positions).forEach(([pos, playersList]) => {
        if (playersList.length === 0) return;

        const section = document.createElement('div');
        section.innerHTML = `<h2>${pos}</h2><div class="detail-container-section"></div>`;
        const sectionContent = section.querySelector('.detail-container-section');

        playersList.forEach(player => {
          const dob = new Date(player.dateOfBirth);
          const age = new Date().getFullYear() - dob.getFullYear();

          const playerHTML = `
            <div class="detail-content">
              <div class="detail-header-content">
                <div class="header-content-statistic">
                  <div class="header-content-point">
                    <p>Height</p>
                    <a>${player.height ? Number(player.height).toFixed(2) + ' m' : '-'}</a>

                  </div>
                  <div class="header-content-point">
                    <p>Weight</p>
                    <a>${player.weight ? player.weight + ' kg' : '-'}</a>
                  </div>
                  <div class="header-content-point">
                    <p>Age</p>
                    <a>${age}</a>
                  </div>
                </div>
                <img src="${player.photoUrl}" alt="${player.name}">
              </div>
              <div class="detail-main-content">
                <b>${player.name}</b>
                <div class="main-content-detail">
                  <div class="main-flex">
                    <p>${player.jerseyNumber || '-'}</p>
                    <p>${player.position}</p>
                  </div>
                  <b>${player.nationality}</b>
                </div>
              </div>
              <div class="line1"></div>
            </div>
          `;
          sectionContent.insertAdjacentHTML('beforeend', playerHTML);
        });

        container.appendChild(section);
      });
    })
    .catch(error => console.error('Lỗi lấy dữ liệu cầu thủ:', error));
}
