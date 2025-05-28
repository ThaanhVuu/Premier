import { API_BASE_URL } from "../../config.js";

if (token == null) {
    window.location.href = "../login/index.html";
}

let initClubs = () => {
    // ===== STATE =====
    let saveMode = true;
    let editingTeamId = null;
    let currentEditingStadium = null;

    // ===== DOM ELEMENTS =====
    const form = document.getElementById("popup-form");
    const createBtn = document.getElementById("createBtn");
    const cancelBtn = document.getElementById("cancel-btn");
    const submitBtn = document.getElementById("submit-btn");
    const clubContainer = document.getElementById("clubs-container");
    const stadiumSelect = document.getElementById("stadiumInForm");

    // ===== CLASS =====
    class Team {
        constructor(teamId, name, shortname, foundedYear, logoUrl, website, coach, currentPosition, stadiumId) {
            this.teamId = teamId;
            this.name = name;
            this.shortname = shortname;
            this.foundedYear = foundedYear;
            this.logoUrl = logoUrl;
            this.website = website;
            this.coach = coach;
            this.currentPosition = currentPosition;
            this.stadiumId = stadiumId;
        }
    }

    // ===== RENDER FUNCTIONS =====
    function renderClubs(teams) {
        clubContainer.innerHTML = "";
        teams.forEach(team => {

            const card = document.createElement("div");
            card.className = "club-card";

            const imageWrapper = document.createElement("div");
            imageWrapper.className = "image-wrapper";
            const img = document.createElement("img");
            img.src = team.logoUrl ?? "https://www.usanetwork.com/sites/usablog/files/2023/07/epl-most-valuable-teams-2023_6.jpg";
            img.alt = team.name;
            imageWrapper.appendChild(img);

            const clubInfo = document.createElement("div");
            clubInfo.innerHTML = `
                <span>${team.name}</span>
                <span>${team.shortName}</span>
                <span>📅 Founded Year: ${team.foundedYear}</span>
                <span>🌐 Website: ${team.website}</span>
                <span>👨🏻‍🏫 Coach: ${team.coach}</span>
                <span>🔝 Current Position: ${team.currentPosition}</span>
                <span>🏟 Stadium: ${team.stadium?.name}</span>
            `;

            const btnDiv = document.createElement("div");
            btnDiv.className = "btn-func";
            btnDiv.innerHTML = `
                <button class="update">📝 Update</button>
                <button class="delete">🗑️ Delete</button>
            `;

            // Nút update
            btnDiv.querySelector(".update").onclick = () => {
                saveMode = false;
                editingTeamId = team.teamId;
                currentEditingStadium = team.stadium;

                form.style.display = "block";
                loadTeamToForm(team);
                getStadiums(false);
            };

            // Nút delete
            btnDiv.querySelector(".delete").onclick = () => {
                if (confirm(`Are you sure you want to delete team "${team.name}"?`)) {
                    axios.delete(`${API_BASE_URL}team/${team.teamId}`, {
                        headers: { Authorization: `Bearer ${token}` }
                    })
                        .then(response => alert(response.data.info))
                        .catch(error => alert(error.response?.data?.info ?? error.message))
                        .finally(loadClubs);
                }
            };

            card.appendChild(imageWrapper);
            card.appendChild(clubInfo);
            card.appendChild(btnDiv);
            clubContainer.appendChild(card);
        });
    }

    function renderStadium(stadiums, isCreateMode) {
        stadiumSelect.innerHTML = "";

        stadiums.forEach(stadium => {
            const option = document.createElement("option");
            option.value = stadium.stadiumId;
            option.textContent = stadium.name;
            if (!isCreateMode && stadium.stadiumId == currentEditingStadium?.stadiumId) {
                option.selected = true;
            }
            stadiumSelect.appendChild(option);
        });
    }

    // ===== FORM HANDLING =====
    function resetFormInputs() {
        form.reset();
    }

    function loadTeamToForm(team) {
        document.getElementById("name").value = team.name;
        document.getElementById("shortname").value = team.shortname;
        document.getElementById("foundedYear").value = team.foundedYear;
        document.getElementById("website").value = team.website;
        document.getElementById("coach").value = team.coach;
        document.getElementById("currentPosition").value = team.currentPosition;
    }

    function getSelectedStadiumId() {
        return stadiumSelect.value;
    }

    function getStadiums(isCreateMode) {
        axios.get(`${API_BASE_URL}stadium/unassigned`)
            .then(res => {
                let stadiums = res.data.result;

                if (!isCreateMode && currentEditingStadium) {
                    stadiums.unshift(currentEditingStadium);
                }

                renderStadium(stadiums, isCreateMode);
            })
            .catch(error => alert(error.response?.data?.info ?? error.message));
    }

    // ===== EVENT HANDLERS =====
    createBtn.onclick = () => {
        saveMode = true;
        editingTeamId = null;
        currentEditingStadium = null;

        form.style.display = "block";
        resetFormInputs();
        getStadiums(true);
    };

    cancelBtn.onclick = () => {
        form.style.display = "none";
    };

    submitBtn.onclick = () => {
        const newTeam = new Team(
            saveMode ? null : editingTeamId,
            document.getElementById("name").value,
            document.getElementById("shortname").value,
            document.getElementById("foundedYear").value,
            null,
            document.getElementById("website").value,
            document.getElementById("coach").value,
            document.getElementById("currentPosition").value,
            getSelectedStadiumId()
        );

        const request = saveMode
            ? axios.post(`${API_BASE_URL}team`, newTeam, { headers: { Authorization: `Bearer ${token}` } })
            : axios.put(`${API_BASE_URL}team/${editingTeamId}`, newTeam, { headers: { Authorization: `Bearer ${token}` } });

        request
            .then(res => alert(res.data.info))
            .catch(err => alert(err.response?.data?.info ?? "Unexpected error: " + err.message))
            .finally(() => {
                form.style.display = "none";
                loadClubs();
            });
    };

    // ===== INITIAL LOAD =====
    function loadClubs() {
        axios.get(`${API_BASE_URL}team`)
            .then(res => renderClubs(res.data.result))
            .catch(err => console.error(err));
    }

    loadClubs();
};

initClubs();
