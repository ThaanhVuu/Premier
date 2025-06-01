
document.addEventListener("DOMContentLoaded", () => {
    const apiUrl = "https://premier-dl8h.onrender.com/api/stadium";
    const searchInput = document.getElementById("searchInput");
    const selectElements = document.querySelectorAll(".filter-select");
    const stadiumList = document.getElementById("stadiumList");

    let stadiums = [];

    // Fetch data
    fetch(apiUrl)
        .then(res => res.json())
        .then(data => {
            stadiums = data.result;
            renderStadiums(stadiums);
        })
        .catch(err => {
            stadiumList.innerHTML = "<p>Error loading stadium data.</p>";
            console.error(err);
        });

    // Render function
    function renderStadiums(data) {
        stadiumList.innerHTML = "";
        data.forEach((stadium, index) => {
            const card = document.createElement("div");
            card.className = "content";
            card.innerHTML = `
                <div class="header-content">
                    <span>${index + 1}.</span>
                    <h2>${stadium.name}</h2>
                </div>
                <img src="${stadium.photoUrl}" alt="${stadium.name}">
                <div>
                    <p><strong>Address:</strong> ${stadium.address}</p>
                    <p><strong>Built in:</strong> ${stadium.builtYear}</p>
                    <p><strong>Capacity:</strong> ${stadium.capacity.toLocaleString()}</p>
                </div>
            `;
            stadiumList.appendChild(card);
        });
    }

    // Search functionality
    searchInput.addEventListener("input", () => {
        applyFilters();
    });

    // Sort select filters
    selectElements.forEach(select => {
        select.addEventListener("change", () => {
            applyFilters();
        });
    });

    function applyFilters() {
        let filtered = [...stadiums];

        // Search filter
        const searchValue = searchInput.value.toLowerCase();
        if (searchValue) {
            filtered = filtered.filter(s =>
                s.name.toLowerCase().includes(searchValue)
            );
        }

        // Sort filters
        const capacitySort = selectElements[0].value;
        const yearSort = selectElements[1].value;

        if (capacitySort === "capacity-desc") {
            filtered.sort((a, b) => b.capacity - a.capacity);
        } else if (capacitySort === "capacity-asc") {
            filtered.sort((a, b) => a.capacity - b.capacity);
        }

        if (yearSort === "year-desc") {
            filtered.sort((a, b) => b.builtYear - a.builtYear);
        } else if (yearSort === "year-asc") {
            filtered.sort((a, b) => a.builtYear - b.builtYear);
        }

        renderStadiums(filtered);
    }
});

