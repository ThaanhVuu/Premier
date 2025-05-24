import { API_BASE_URL } from "../../config.js";

const init = () => {

    const container = document.getElementById("player-container");


    const loadrender = () => {
        axios.get(`${API_BASE_URL}player`)
            .then(response => {
                render(response.data.result)
                console.log(response.data.result);
            })
    }

    loadrender();

    const render = (players) => {
        container.innerHTML = ``;

        players.forEach(player => {
            container.innerHTML += `
        <div class="card-player">
            <div class="image-wrapper">
                <img src="${player.photoUrl}" alt="${player.name}" />
            </div>
            <div class="info">
                <span class="name">${player.name}</span>
                <span>Nationality: ${player.nationality}</span>
                <span>position: ${player.position}</span>
                <span>club: ${player.team.name}</span>
                <span>age: ${player.age}</span>
                <span>jerseyNumber: ${player.jerseyNumber}</span>
                <span>dateOfBirth: ${player.dateOfBirth}</span>
                <span>height: ${player.height}</span>
                <span>weight: ${player.weight}</span>
            </div>
            <div class="action">
                <button class="updateBtn">Update</button>
                <button class="deleteBtn">Delete</button>
            </div>
        </div>
        `;
        });
    };
}

init();