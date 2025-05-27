import { API_BASE_URL } from "../../config.js";

let initClubs = () => {
    var saveMode = true;
    let form = document.getElementById("popup-form");
    let createBtn = document.getElementById("createBtn");
    let cancelBtn = document.getElementById("cancel-btn");
    let submitBtn = document.getElementById("submit-btn");
    let teamId = -1;

    let teamName = document.getElementById("name").value;
    let teamShortName = document.getElementById("shortname").value;
    let teamFoundedYear = document.getElementById("foundedYear").value;
    let teamWebsite = document.getElementById("website").value;
    let teamCoach = document.getElementById("coach").value;
    let teamCurrentPosition = document.getElementById("currentPosition").value;
    let teamstadiumId = document.getElementById("Stadium").value;

    class team {
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

    let renderClubs = (teams) => {
        let container = document.getElementById("clubs-container");
        container.innerHTML = "";

        teams.forEach(team => {
            let card = document.createElement("div");
            let wrapper = document.createElement("section");
            wrapper.className = "image-wrapper"
            let img = document.createElement("img");
            let h = document.createElement("h2");
            h.innerText = team.name;
            if (team.logoUrl != null) {
                img.src = team.logoUrl;
                img.alt = team.name;
            } else {
                img.src = "https://www.usanetwork.com/sites/usablog/files/2023/07/epl-most-valuable-teams-2023_6.jpg";
            }
            let infoDiv = document.createElement("div");
            infoDiv.innerHTML = `
            <span>${team.shortname}</span>
            <span>📅 Founded Year: ${team.foundedYear}</span>
            <span>🌐 Website : ${team.website}</span>
            <span>👨🏻‍🏫 Coach: ${team.coach}</span>
            <span>🔝 Current Position: ${team.currentPosition}</span>
            <span>🏟 Stadium: ${team.stadium.name}</span>
            <section class="btn-func">
                <button class="update">📝 Update</button>
                <button class="delete">🗑️ Delete</button>
            </section>
        `;

            container.appendChild(card);
            card.appendChild(wrapper);
            wrapper.appendChild(img);
            card.appendChild(h);
            card.appendChild(infoDiv);

            const updateBtn = infoDiv.querySelector(".update");
            const deleteBtn = infoDiv.querySelector(".delete");

            deleteBtn.onclick = function () {
                if (confirm(`Are you sure you want to delete stadium "${team.name}"?`)) {
                    alert(team.teamId);
                    // axios.delete(`${API_BASE_URL}team/${team.teamId}`, { headers: { Authorization: `Bearer ${token}` } })
                    //     .then(response => {
                    //         alert(response.data.info);
                    //     })
                    //     .catch(error => {
                    //         alert(error.response.data.info);
                    //     })
                }
            }

            updateBtn.onclick = function () {
                form.style.display = "block";
                saveMode = false;
                loadtoForm(team);
                teamId = team.teamId;
            }
        });
    }

    function loadClubs() {
        axios.get(`${API_BASE_URL}team`)
            .then(response => {
                const clubs = response.data.result;
                renderClubs(clubs);
            })
            .catch(err => {
                console.error("Error fetching clubs:", err.response.data.info);
            });
    }

    createBtn.onclick = () => {
        form.style.display = "block";
    }

    cancelBtn.onclick = () => {
        form.style.display = "none";
    }

    let loadtoForm = (team) => {
        teamName = team.name;
        teamShortName = team.shortname;
        teamFoundedYear = team.foundedYear;
        teamWebsite = team.website;
        teamCoach = team.coach;
        teamCurrentPosition = team.currentPosition;
        teamstadiumId = team.stadium.name;
    }

    let resetForm = () => {
        teamName = "";
        teamShortName = "";
        teamFoundedYear = "";
        teamWebsite = "";
        teamCoach = "";
        teamCurrentPosition = "";
        teamstadiumId = "";
    }

    submitBtn.onclick = () => {
        team(teamName, teamShortName, teamFoundedYear, teamWebsite, teamCoach, teamCurrentPosition, teamstadiumId)
        const method = saveMode
            ? axios.post(`${API_BASE_URL}team`, stadium, { headers: { Authorization: `Bearer ${token}` } })
            : axios.put(`${API_BASE_URL}team/${stadiumId}`, stadium, { headers: { Authorization: `Bearer ${token}` } });
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
                loadClubs();
                resetForm();
                form.style.display = "none";
            });
    }

    loadClubs();
}

initClubs();