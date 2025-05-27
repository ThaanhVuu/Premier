import { API_BASE_URL } from "../../config.js";

const init = () => {
    // ===== STATE =====
    let createMode = true;
    let teamId = -1;
    const token = sessionStorage.getItem("accessToken");
    // ===== DOM ELEMENTS =====
    const form = document.getElementById("form-popup");
    const createBtn = document.getElementById("createBtn");
    const saveBtn = document.getElementById("saveBtn");
    const cancelBtn = document.getElementById("cancelBtn");
    const formData = document.getElementById("playerForm");
    const teamSelection = document.getElementById("team")

    // ===== RENDER FUNCTIONS =====
    //render team
    const renderTeam = (teams) => {
        teamSelection.innerHTML = "";
        teamSelection.innerHTML = `
            <option value = "-1">N/A</option>
        `;
        teams.forEach(team => {
            teamSelection.innerHTML += `
            <option value="${team.teamId}">${team.name}</option>
            `;
        })
    }

    const loadTeamSelection = () => {
        axios.get(`${API_BASE_URL}team`)
            .then(response => {
                renderTeam(response.data.result);
            })
            .catch(error => {
                console.log("error in loadteamselection");
                
                alert(error.response.data.info) || alert(error.message);
            })
    }



    //render player
    const renderData = (players) => {
        let playerFilter = players;
        const container = document.getElementById("player-container");
        container.innerHTML = "";
        //loc player theo team id
        if(teamId != -1){
            playerFilter = players.filter(player => player.team.teamId == teamId);
        }
        
        playerFilter.forEach(player => {
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
                <span>Club: ${player.team?.name}</span>
                <span>Jersey number: ${player.jerseyNumber}</span>
                <span>Date of birth: ${player.dateOfBirth}</span>
                <span>Height: ${player.height.toFixed(2)}</span>
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
                renderInfoToForm(player);
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
    const getDataFromForm = () => {
        const formPlayer = new FormData(formData);
        const player = Object.fromEntries(formPlayer.entries());
        return player;
    }

    const renderInfoToForm = (player) => {
        document.getElementById("playerName").value = player.name;
        document.getElementById("nationality").value = player.nationality;
        document.getElementById("position").value = player.position;
        document.getElementById("club").value = player.team?.name;
        document.getElementById("jersey").value = player.jerseyNumber;
        document.getElementById("dob").value = player.dateOfBirth;
        document.getElementById("height").value = player.height;
        document.getElementById("weight").value = player.weight;
        document.getElementById("photoUrl").value = player.photoUrl;
    }

    const clearForm = () => {
        document.getElementById("playerName").value = "";
        document.getElementById("nationality").value = "";
        document.getElementById("position").value = "";
        document.getElementById("club").value = "";
        document.getElementById("jersey").value = "";
        document.getElementById("dob").value = "";
        document.getElementById("height").value = "";
        document.getElementById("weight").value = "";
        document.getElementById("photoUrl").value = "";
    }

    // ===== EVENT HANDLERS =====
    createBtn.addEventListener("click", function () {
        createMode = true;
        form.style.display = "flex";
    });

    saveBtn.addEventListener("click", function () {
    const playerData = getDataFromForm();
    
    if (createMode) {
        axios.post(`${API_BASE_URL}player`, playerData, {
            headers: {
                Authorization: `Bearer ${token}` 
            }
        })
        .then(response => {
            alert(response.data.info);
            form.style.display = "none";  
            clearForm();                  
            loadData();                   
        })
        .catch(error => {
            alert(error.response?.data?.info || error.message);
        });
    }
});


    cancelBtn.addEventListener("click", function () {
        form.style.display = "none";
        clearForm();
    })

    teamSelection.addEventListener("click", function () {
        teamId = teamSelection.value;
        loadData();
    })
    // ===== INITIAL LOAD =====
    loadData();
    loadTeamSelection();

}
init();