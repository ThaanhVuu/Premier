fetch('https://premier-dl8h.onrender.com/api/team')
  .then(response => response.json())
  .then(data => {
    const container = document.getElementById('club-container');

    data.result.forEach(team => {
      const clubDiv = document.createElement('div');
      clubDiv.classList.add('club-area');

      clubDiv.innerHTML = `
        <img src="${team.logoUrl}" alt="${team.name}">
        <div class="club-name">
          <p>${team.name}</p>
          <i class="fas fa-arrow-right"></i>
        </div>
        <div class="line"></div>
      `;
        clubDiv.addEventListener('click', () => {
        window.location.href = `club-detail.html?teamId=${team.teamId}`;
        });

      container.appendChild(clubDiv);
    });
  })
  .catch(error => {
    console.error('Lỗi lấy dữ liệu:', error);
  });