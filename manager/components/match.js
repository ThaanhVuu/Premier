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
    //render data match và tạo hiển thị
    let render = (matches) => {
        let matchFilter = matches;
        if (keyword !== "") {
            matchFilter = matches.filter(match =>
                match.homeTeamId.name.toLowerCase().includes(keyword) ||
                match.awayTeamId.name.toLowerCase().includes(keyword) ||
                match.season.toLowerCase().includes(keyword) ||
                match.matchDate.toLowerCase().includes(keyword) ||
                match.homeTeamId.shortName.toLowerCase().includes(keyword) ||
                match.awayTeamId.shortName.toLowerCase().includes(keyword) ||
                match.referee.toLowerCase().includes(keyword)
            );
        }

        let container = document.getElementById("matches-container");
        container.innerHTML = "";

        matchFilter.forEach(match => {
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
                <span>Stadium: ${match.stadium?.name}</span>
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
                getTeam();
                getDataStadium();
                putDataToForm(match);
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

    //load match
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

    // ========================Render team ============================
    //render team để hiển thị trong select (chọn home team và awayteam nếu muốn tạo mới
    const renderTeam = (teams) => {
        let awayTeams = document.getElementById(`awayTeam`);
        let homeTeams = document.getElementById(`homeTeam`);
        awayTeams.innerHTML = ``;
        homeTeams.innerHTML = ``;
        teams.forEach(team => {
            let awayTeam = document.createElement(`option`);
            awayTeam.value = team.teamId;
            awayTeam.innerText = team.name
            let homeTeam = document.createElement(`option`);
            homeTeam.value = team.teamId;
            homeTeam.innerText = team.name;

            awayTeams.appendChild(awayTeam);
            homeTeams.appendChild(homeTeam);
        })
    }

    const getTeam = () => {
        axios.get(`${API_BASE_URL}team`)
            .then(response => {
                renderTeam(response.data.result);
            })
            .catch(error => {
                alert(`Lỗi khi lấy team trong select`);
                console.log(error.response.data || error.message);
            })
    }


    // ========================================Render stadium trong select
    const renderStadium = (stadiums) => {
        let stadiumSelect = document.getElementById(`stadium`);
        stadiumSelect.innerHTML = ``;
        stadiums.forEach(stadium => {
            let option = document.createElement(`option`);
            option.value = stadium.stadiumId;
            option.innerText = stadium.name;

            stadiumSelect.appendChild(option);
        })
    }

    const getDataStadium = () => {
        axios.get(`${API_BASE_URL}stadium`)
            .then(response => {
                renderStadium(response.data.result);
            })
            .catch(error => {
                alert(`Lỗi khi lấy stadium trong select`);
                console.log(error.response.data || error.message);
            })

    }


    // ===============Form handling
    //lấy data từ form 
    const getDataInForm = () => {
        return {
            homeTeamId: parseInt(document.getElementById(`homeTeam`).value),
            awayTeamId: parseInt(document.getElementById(`awayTeam`).value),
            homeScore: parseInt(document.getElementById(`homeScore`).value),
            awayScore: parseInt(document.getElementById(`awayScore`).value),
            stadiumId: parseInt(document.getElementById(`stadium`).value),
            matchDate: document.getElementById(`matchDate`).value,
            matchWeek: parseInt(document.getElementById(`matchWeek`).value),
            season: document.getElementById(`season`).value,
            referee: document.getElementById(`referee`).value,
            attendance: parseInt(document.getElementById(`attendance`).value),
            status: document.getElementById(`status`).value
        };
    }

    // clear form khi done hành động
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

    const putDataToForm = (match) => {
        document.getElementById("homeTeam").value = match.homeTeamId.teamId;
        document.getElementById("awayTeam").value = match.awayTeamId.teamId;
        document.getElementById("homeScore").value = match.homeScore;
        document.getElementById("awayScore").value = match.awayScore;
        document.getElementById("stadium").value = match.stadium?.stadiumId || "";
        document.getElementById("matchDate").value = match.matchDate;
        document.getElementById("matchWeek").value = match.matchWeek;
        document.getElementById("season").value = match.season;
        document.getElementById("referee").value = match.referee;
        document.getElementById("attendance").value = match.attendance;
        document.getElementById("status").value = match.status;
    }

    // ===============Event handling
    // khi ấn nút cancel
    cancelBtn.addEventListener(`click`, function () {
        form.style.display = `none`;
    })

    //khi tìm kiếm
    searchInput.addEventListener("input", (e) => {
        keyword = e.target.value.toLowerCase();
        loadTable(); // hoặc filter lại danh sách nếu đã có
    });


    //khi ấn nút create
    createBtn.addEventListener(`click`, function () {
        form.style.display = `flex`;
        saveMode = true;
        getTeam();
        getDataStadium();
    })

    //khi ấn nút save
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
                    loadTable();
                    clearForm();
                    form.style.display = `none`;
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
                    loadTable();
                    clearForm();
                    form.style.display = `none`;
                })
                .catch(error => {
                    alert(error.response?.data.info || error.message);
                })
        }

    });

}

initClubs();