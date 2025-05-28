import { API_BASE_URL } from "../../config.js";

const token = sessionStorage.getItem("accessToken");

if (token == null) {
    window.location.href = "../login/index.html";
}



let initClubs = () => {
    // ===== STATE =====
    let saveMode = true;
    let updateId = -1;
    let keyword = "";
    // ===== DOM ELEMENTS =====

    const form = document.getElementById("form-popup");
    const saveBtn = document.getElementById("saveBtn");
    const cancelBtn = document.getElementById("cancelBtn");
    const createBtn = document.getElementById("createBtn");
    const searchInput = document.getElementById(`searchInput`);

    // ===== CLASS =====
    class match {
        constructor(matchId, homeTeamId, awayTeamId, stadium, matchDate, matchWeek, season, status, referee, attendance, homeScore, awayScore) {
            this.matchId = matchId;
            this.homeTeamId = homeTeamId;
            this.awayTeamId = awayTeamId;
            this.stadium = stadium;
            this.matchDate = matchDate;
            this.matchWeek = matchWeek;
            this.season = season;
            this.status = status;
            this.referee = referee;
            this.attendance = attendance;
            this.homeScore = homeScore;
            this.awayScore = awayScore;
        }
    }

    // ===== RENDER FUNCTIONS =====
    let render = (matches) => {
        let matchFilter = matches;
        if(keyword !== ""){
            matchFilter.filter(match => )
        }

        let container = document.getElementById("matches-container");
        container.innerHTML = "";

        matches.forEach(match => {
            let statusColor = "#ccc";
            if (match.status === "finished") statusColor = "#89c789";
            if (match.status === "scheduled") statusColor = "#f3e7a3";
            if (match.status === "canceled") statusColor = "#ee7d7d";

            // Tạo element qua template
            const matchEl = document.createElement("div");
            matchEl.classList.add("match");
            matchEl.innerHTML = `
            <div class="score">
                <span>${match.homeTeamId.shortName}</span>
                <img src="${match.homeTeamId.logoUrl}" />
                <span>${match.homeScore} - ${match.awayScore}</span>
                <img src="${match.awayTeamId.logoUrl}" />
                <span>${match.awayTeamId.shortName}</span>
            </div>
            <div class="info">
                <span>Stadium: ${match.stadium.name}</span>
                <span>Match Date: ${match.matchDate}</span>
                <span>Match Week: ${match.matchWeek}</span>
                <span>Season: ${match.season}</span>
                <span>Referee: ${match.referee}</span>
                <span>Attendance: ${match.attendance}</span>
                <span class="status" style="background-color: ${statusColor}">${match.status}</span>
            </div>
            <div class="action">
                <button class="updateBtn">Update</button>
                <button class="deleteBtn">Delete</button>
            </div>
        `;

            // Lấy các nút trong phần tử mới tạo
            const updateBtn = matchEl.querySelector(".updateBtn");
            const deleteBtn = matchEl.querySelector(".deleteBtn");

            updateBtn.addEventListener("click", () => {
                saveMode = false;
                form.style.display = "flex";
                updateId = match.matchId;
            });

            deleteBtn.addEventListener("click", () => {
                const confirmDelete = confirm(`Bạn có chắc muốn xoá trận đấu ID: ${match.matchId}?`);
                if (confirmDelete) {
                    const token = sessionStorage.getItem("accessToken");
                    axios.delete(`${API_BASE_URL}match/${match.matchId}`, {
                        headers: { Authorization: `Bearer ${token}` }
                    })
                        .then(response => {
                            alert(response.data.info + " Match ID: " + match.matchId);
                            loadTable(); // Reload bảng sau khi xóa
                        })
                        .catch(error => {
                            if (error.response?.data?.info) {
                                alert("Error: " + error.response.data.info);
                            } else {
                                alert("Unexpected error occurred");
                            }
                        });
                }
            });

            container.appendChild(matchEl);
        });
    };


    const loadTable = () => {
        axios.get(`${API_BASE_URL}match`)
            .then(response => {
                render(response.data.result);
            })
            .catch(error => {
                alert(error.response?.data.info || error.message); 
            })
    }
    loadTable();
    // ===============Form handling
    const getDataInForm = () => {
        match = {
            homeTeamId: document.getElementById(`homeTeam`),
            awayTeamId: document.getElementById(`awayTeam`),
            homeScore: document.getElementById(`homeScore`),
            awayScore: document.getElementById(`awayScore`),
            stadiumId: document.getElementById(`stadium`),
            matchDate: document.getElementById(`matchDate`),
            matchWeek: document.getElementById(`matchWeek`),
            season: document.getElementById(`season`),
            referee: document.getElementById(`referee`),
            attendance: document.getElementById(`attendance`),
            status: document.getElementById(`status`),
        }
        return match;
    }

    const clearForm = () => {
        document.getElementById(`homeTeam`).value = "";
        document.getElementById(`awayTeam`).value = "";
        document.getElementById(`homeScore`).value = "";
        document.getElementById(`awayScore`).value = "";
        document.getElementById(`stadium`).value = "";
        document.getElementById(`matchDate`).value = "";
        document.getElementById(`matchWeek`).value = "";
        document.getElementById(`season`).value = "";
        document.getElementById(`referee`).value = "";
        document.getElementById(`attendance`).value = "";
        document.getElementById(`status`).value = "";
    }

    // ===============Event handling
    cancelBtn.addEventListener(`click`, function () {
        form.style.display = `none`;
    })

    createBtn.addEventListener(`click`, function () {
        form.style.display = `flex`;
        saveMode = true;
    })

    saveBtn.addEventListener(`click`, function () {
        let matchObj = getDataInForm();
        if (saveMode) {
            axios.post(`${API_BASE_URL}match`, matchObj, {
                headers: {
                    authorization: `Bearer ${token}`
                }
            })
                .then(response => {
                    alert(response.data.info);
                })
                .catch(error => {
                    alert(error.response?.data.info || error.message);
                })
        } else {
            axios.put(`${API_BASE_URL}match/${updateId}`, matchObj, {
                headers: {
                    authorization: `Bearer ${token}`
                }
            })
                .then(response => {
                    alert(response.data.info);
                })
                .catch(error => {
                    alert(error.response?.data.info || error.message);
                })
        }
        clearForm();
        loadTable();
    })
}

initClubs();