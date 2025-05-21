import { API_BASE_URL } from "../../config.js";

if (token == null) {
    window.location.href = "../login/index.html";
}


let initClubs = () => {
    // ===== STATE =====
    let saveMode = true;

    // ===== DOM ELEMENTS =====

    const form = document.getElementById

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
                alert(`Cập nhật trận đấu ID: ${match.matchId}`);
                // TODO: Mở form update hoặc gọi API cập nhật
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
                console.log(response.data);
                render(response.data.result);
            })
    }
    loadTable();
}

initClubs();