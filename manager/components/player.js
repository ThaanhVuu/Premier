import { API_BASE_URL } from "../../config.js";

const init = () => {
    // ===== STATE =====
    let createMode = true;
    const token = sessionStorage.getItem("accessToken");
    // ===== DOM ELEMENTS =====
    const form = document.getElementById("form-popup");

    // ===== CLASS =====
    class Player {
        constructor(playerId, name, nationality, position, club, jerseyNumber, dateOfBirth, height, weight, photoUrl) {
            this.playerId = playerId;
            this.name = name;
            this.nationality = nationality;
            this.position = position;
            this.club = club;
            this.jerseyNumber = jerseyNumber;
            this.dateOfBirth = dateOfBirth;
            this.height = height;
            this.weight = weight;
            this.photoUrl = photoUrl;
        }
    }

    // ===== RENDER FUNCTIONS =====
    const renderData = (players) => {
        const container = document.getElementById("player-container");
        container.innerHTML = "";
        players.forEach(player => {
            let card = document.createElement("div");
            card.className = "card-player";
            container.appendChild(card)
            //taoj card ben trong container

            let imageWrapper = document.createElement("div");
            imageWrapper.className = "image-wrapper";
            card.appendChild(imageWrapper);
            //tao imgwrapper trong card

            let img = document.createElement("img");
            img.src = player.photoUrl || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTrYN9r00kSQ5YXVrSAllZ4c0GnAzlbspDJWA&s";
            imageWrapper.appendChild(img);
            //tao img trong imgwrapper

            let info = document.createElement("div");
            card.appendChild(info);
            info.className = "info";
            info.innerHTML = `
                <span class="name">${player.name}</span>
                <span>Nationality: ${player.nationality}</span>
                <span>Position: ${player.position}</span>
                <span>Club ${player.team?.name}</span>
                <span>Jersey number: ${player.jerseyNumber}</span>
                <span>Date of birth: ${player.dateOfBirth}</span>
                <span>Height: ${player.height}</span>
                <span>Weight: ${player.weight}</span>
            `;
            //tao info player trong card

            //tao nut bam trong card
            let action = document.createElement("div");
            action.className = "action";
            card.appendChild(action);

            let updateBtn = document.createElement("button");
            updateBtn.className = "updateBtn";
            updateBtn.innerText = "Update";

            let deleteBtn = document.createElement("button");
            deleteBtn.className = "deleteBtn";
            deleteBtn.innerText = "Delete";

            action.appendChild(updateBtn);
            action.appendChild(deleteBtn);

            //gan logic cho updatebtn
            action.querySelector(".updateBtn").onclick = () => {
                createMode = false;
                form.style.display = "flex";
            }

            //gan logic cho delete btn
            action.querySelector(".deleteBtn").onclick = () => {
                if (confirm(`Are you sure to delete this player with id: ${player.playerId}`)) {
                    axios.delete(
                        `${API_BASE_URL}player/${player.playerId}`,
                        {
                            headers: { Authorization: `Bearer ${token}` }
                        }
                    )
                        .then(response => {
                            alert(response.data.info)
                        })
                        .catch(error => {
                            alert(error.response?.data.info ?? error.message);
                            console.log("error From delete");
                        })
                        .finally(() => loadData())
                }
            }

        })
    }

    const loadData = () => {
        axios.get(`${API_BASE_URL}player`)
            .then(response => {
                let teams = response.data.result
                renderData(teams);
            })
            .catch(error => {
                alert(error.response?.data.info ?? error.message);
                console.log("error from loadData \n", error);
            })
    }
    // ===== FORM HANDLING =====
    // ===== EVENT HANDLERS =====
    // ===== INITIAL LOAD =====
    loadData();
}
init();