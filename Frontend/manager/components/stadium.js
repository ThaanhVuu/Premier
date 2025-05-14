import { API_BASE_URL } from '../../config.js';

if (sessionStorage.getItem("accessToken") == null) {
  window.location.href = "../../login/index.html";
}

function initStadium() {
  const cancelBtn = document.getElementById("cancel-btn");
  const form = document.getElementById("popup-form");
  const createBtn = document.getElementById("createBtn");
  const submitBtn = document.getElementById("submit-btn");
  const token = sessionStorage.getItem("accessToken");
  const searchInput = document.getElementById("searchInput");

  let stadiumId = -1;
  let saveMode = true;

  if (!cancelBtn || !form || !createBtn || !submitBtn) {
    console.error("Some required DOM elements are missing.");
    return;
  }

  function loadStadiumToForm(name, city, capacity, address, builtYear, photoUrl) {
    document.getElementById("stadiumName").value = name;
    document.getElementById("city").value = city;
    document.getElementById("capacity").value = capacity.toString();
    document.getElementById("address").value = address;
    document.getElementById("builtYear").value = builtYear.toString();
    document.getElementById("photoUrl").value = photoUrl || "";
  }

  function resetForm() {
    const ids = ["stadiumName", "city", "capacity", "address", "builtYear", "photoUrl"];
    ids.forEach(id => {
      const el = document.getElementById(id);
      if (el) el.value = "";
    });
  }

  function renderStadiumCards(stadiums) {
    const container = document.getElementById('card-container');
    container.innerHTML = "";

    stadiums.forEach(stadium => {
      const card = document.createElement('div');
      card.className = 'card';

      const image = document.createElement('img');
      image.src = stadium.photoUrl || 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQL--nVAP9pZ0eSdr89IyHwsdzIqDrRMI85YA&s';
      image.alt = stadium.name;

      const infoDiv = document.createElement('div');
      infoDiv.innerHTML = `
        <span class="h">${stadium.name}</span>
        <span>📍 ${stadium.address}</span>
        <span>👥 Capacity : ${stadium.capacity}</span>
        <span>🌇 City: ${stadium.city}</span>
        <span>📅 Year of construction: ${stadium.builtYear}</span>
        <div class="btn-func">
          <button class="update">📝 Update</button>
          <button class="delete">🗑️ Delete</button>
        </div>
      `;

      card.appendChild(image);
      card.appendChild(infoDiv);
      container.appendChild(card);

      const updateBtn = infoDiv.querySelector(".update");
      const deleteBtn = infoDiv.querySelector(".delete");

      updateBtn.onclick = () => {
        saveMode = false;
        stadiumId = stadium.stadiumId;
        form.style.display = "block";
        loadStadiumToForm(stadium.name, stadium.city, stadium.capacity, stadium.address, stadium.builtYear, stadium.photoUrl);
      };

      deleteBtn.onclick = () => {
        if (confirm(`Are you sure you want to delete stadium "${stadium.name}"?`)) {
          axios.delete(`${API_BASE_URL}stadium/${stadium.stadiumId}`, {
            headers: { Authorization: `Bearer ${token}` }
          })
            .then(res => {
              alert(res.data.info);
              loadStadiums();
            })
            .catch(err => {
              if (err.response?.data?.info) {
                alert(err.response.data.info);
              } else {
                alert("Error deleting stadium.");
              }
              console.error(err);
            });
        }
      };
    });
  }

  function searchStadiums(keyword, allStadiums) {
    const normalizedKeyword = removeAccents(keyword.trim().toLowerCase());

    const filtered = allStadiums.filter(stadium =>
      removeAccents(stadium.name.toLowerCase()).includes(normalizedKeyword) ||
      removeAccents(stadium.city.toLowerCase()).includes(normalizedKeyword) ||
      removeAccents(stadium.address.toLowerCase()).includes(normalizedKeyword) ||
      stadium.capacity.toString().includes(normalizedKeyword) ||
      stadium.builtYear.toString().includes(normalizedKeyword)
    );

    renderStadiumCards(filtered);
  }

  function loadStadiums() {
    axios.get(`${API_BASE_URL}stadium`)
      .then(response => {
        const stadiums = response.data.result;
        renderStadiumCards(stadiums);

        // Gắn sự kiện tìm kiếm
        searchInput.addEventListener("input", () => {
          const keyword = searchInput.value.trim();
          searchStadiums(keyword, stadiums);
        });
      })
      .catch(err => {
        console.error("Error fetching stadiums:", err);
      });
  }

  function removeAccents(str) {
    const map = {
      a: 'áàảãạăắằẳẵặâấầẩẫậ',
      e: 'éèẻẽẹêếềểễệ',
      i: 'íìỉĩị',
      o: 'óòỏõọôốồổỗộơớờởỡợ',
      u: 'úùủũụưứừửữự',
      y: 'ýỳỷỹỵ',
      d: 'đ',
    };

    for (let letter in map) {
      const regex = new RegExp(`[${map[letter]}]`, 'g');
      str = str.replace(regex, letter);
    }

    return str;
  }


  cancelBtn.onclick = () => {
    form.style.display = "none";
  };

  createBtn.onclick = () => {
    saveMode = true;
    form.style.display = "block";
    resetForm();
  };

  submitBtn.onclick = () => {
    const stadium = {
      stadiumId: stadiumId,
      name: document.getElementById("stadiumName").value,
      city: document.getElementById("city").value,
      capacity: Number(document.getElementById("capacity").value),
      address: document.getElementById("address").value,
      builtYear: Number(document.getElementById("builtYear").value),
      photoUrl: document.getElementById("photoUrl").value
    };

    const method = saveMode
      ? axios.post(`${API_BASE_URL}stadium`, stadium, { headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' } })
      : axios.put(`${API_BASE_URL}stadium/${stadiumId}`, stadium, { headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' } });

    method
      .then(res => alert(res.data.info))
      .catch(err => {
        if (err.response?.data?.info) {
          alert(err.response.data.info);
        } else {
          alert("Unexpected error: " + err.message);
        }
        console.error(err);
      })
      .finally(() => {
        loadStadiums();
        resetForm();
        form.style.display = "none";
      });
  };

  loadStadiums();
}

initStadium();
