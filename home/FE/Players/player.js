  // Global variables to store player data and filters
        let allPlayers = [];
        let filteredPlayers = [];
        let selectedPlayer = null;

        // DOM elements
        const playerTableBody = document.getElementById('playerTableBody');
        const playerTable = document.getElementById('playerTable');
        const loadingDiv = document.getElementById('loading');
        const noResultsDiv = document.getElementById('noResults');
        const playerDetails = document.getElementById('playerDetails');
        const playerDetailContent = document.getElementById('playerDetailContent');
        const positionFilter = document.getElementById('positionFilter');
        const countryFilter = document.getElementById('countryFilter');
        const clubFilter = document.getElementById('clubFilter');
        const searchInput = document.getElementById('searchInput');
        const resetBtn = document.getElementById('reset-filter');

        // Fetch players data from API
        async function fetchPlayers() {
            try {
                showLoading();
                const response = await fetch('https://premier-dl8h.onrender.com/api/player');
                const data = await response.json();
                
                if (data.code === 200 && data.result) {
                    allPlayers = data.result;
                    filteredPlayers = [...allPlayers];
                    populateFilterOptions();
                    displayPlayers();
                    hideLoading();
                } else {
                    throw new Error('Failed to fetch players data');
                }
            } catch (error) {
                console.error('Error fetching players:', error);
                hideLoading();
                showError('Failed to load players. Please try again later.');
            }
        }

        // Calculate age from date of birth
        function calculateAge(dateOfBirth) {
            const today = new Date();
            const birthDate = new Date(dateOfBirth);
            let age = today.getFullYear() - birthDate.getFullYear();
            const monthDiff = today.getMonth() - birthDate.getMonth();
            
            if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
                age--;
            }
            
            return age;
        }

        // Populate filter dropdown options based on available data
        function populateFilterOptions() {
            // Get unique countries
            const countries = [...new Set(allPlayers.map(player => player.nationality))].sort();
            countryFilter.innerHTML = '<option value="">All Countries</option>';
            countries.forEach(country => {
                const option = document.createElement('option');
                option.value = country;
                option.textContent = country;
                countryFilter.appendChild(option);
            });

            // Get unique clubs
            const clubs = [...new Set(allPlayers.map(player => player.team.name))].sort();
            clubFilter.innerHTML = '<option value="">All Clubs</option>';
            clubs.forEach(club => {
                const option = document.createElement('option');
                option.value = club;
                option.textContent = club;
                clubFilter.appendChild(option);
            });
        }

        // Display players in the table
        function displayPlayers() {
            if (filteredPlayers.length === 0) {
                showNoResults();
                return;
            }

            hideNoResults();
            
            playerTableBody.innerHTML = '';
            
            filteredPlayers.forEach(player => {
                const row = document.createElement('tr');
                row.style.cursor = 'pointer';
                row.className = 'player-row';
                row.dataset.playerId = player.playerId; // Add data attribute for identification
                
                row.innerHTML = `
                    <td>
                        <div style="display: flex; align-items: center;">
                            ${player.photoUrl ? 
                                `<img src="${player.photoUrl}" alt="${player.name}" style="width: 40px; height: 40px; border-radius: 50%; margin-right: 10px; object-fit: cover;">` : 
                                `<div style="width: 40px; height: 40px; border-radius: 50%; margin-right: 10px; background-color: #f0f0f0; display: flex; align-items: center; justify-content: center;">
                                    <i class="fa-solid fa-user" style="color: #999;"></i>
                                </div>`
                            }
                            <span>${player.name}</span>
                        </div>
                    </td>
                    <td>${player.position}</td>
                    <td>${player.nationality}</td>
                `;
                
                // Add click event to show player details
                row.addEventListener('click', () => showPlayerDetails(player));
                
                // Add hover effect
                row.addEventListener('mouseenter', () => {
                    if (!row.classList.contains('selected')) {
                        row.style.backgroundColor = '#f5f5f5';
                    }
                });
                row.addEventListener('mouseleave', () => {
                    if (!row.classList.contains('selected')) {
                        row.style.backgroundColor = '';
                    }
                });
                
                playerTableBody.appendChild(row);
            });

            // Restore selected player highlighting and details if it still exists in filtered results
            if (selectedPlayer) {
                const selectedRow = document.querySelector(`[data-player-id="${selectedPlayer.playerId}"]`);
                if (selectedRow) {
                    selectedRow.classList.add('selected');
                    // Re-show the detail row for the selected player
                    showPlayerDetails(selectedPlayer);
                }
            }
        }

        function showPlayerDetails(player) {
    selectedPlayer = player;
    const age = calculateAge(player.dateOfBirth);

    // Remove any existing detail rows
    const existingDetailRows = document.querySelectorAll('.player-detail-row');
    existingDetailRows.forEach(row => row.remove());

    // Update selected row appearance
    const rows = document.querySelectorAll('.player-row');
    rows.forEach(row => {
        row.classList.remove('selected');
        row.style.backgroundColor = '';
    });

    // Highlight selected row
    const selectedRow = document.querySelector(`[data-player-id="${player.playerId}"]`);
    if (selectedRow) {
        selectedRow.classList.add('selected');

        // Create detail row (Chỉ phần thông tin cầu thủ)
        const detailRow = document.createElement('tr');
        detailRow.className = 'player-detail-row';
        detailRow.innerHTML = `
            <td colspan="3" style="padding-left:10px; border: none;">
                <div style="background: #f8f9fa; padding: 20px; border-left: 4px solid #667eea; margin: 10px 0;">
                    <div style="display: grid; grid-template-columns: auto 1fr; gap: 20px; align-items: start;">
                        <div style="text-align: center;">
                            ${player.photoUrl ? 
                                `<img src="${player.photoUrl}" alt="${player.name}" style="width: 120px; height: 120px; border-radius: 50%; object-fit: cover; border: 3px solid #ddd;">` : 
                                `<div style="width: 120px; height: 120px; border-radius: 50%; background-color: #f0f0f0; display: flex; align-items: center; justify-content: center; border: 3px solid #ddd;">
                                    <i class="fa-solid fa-user" style="font-size: 40px; color: #999;"></i>
                                </div>`
                            }
                            <h3 style="margin: 10px 0 5px 0; font-size: 20px; color: #667eea;">${player.name}</h3>
                            <p style="margin: 0; color: #666; font-size: 16px;">#${player.jerseyNumber}</p>
                        </div>
                        
                        <div>
                            <h4 style="margin: 0 0 15px 0; color: #333; border-bottom: 2px solid #dee2e6; padding-bottom: 5px; font-size: 16px;">Personal Information</h4>
                            <div style="line-height: 1.6; font-size: 14px;">
                                <p style="margin: 5px 0;"><strong>Position:</strong> ${player.position}</p>
                                <p style="margin: 5px 0;"><strong>Nationality:</strong> ${player.nationality}</p>
                                <p style="margin: 5px 0;"><strong>Age:</strong> ${age} years old</p>
                                <p style="margin: 5px 0;"><strong>Date of Birth:</strong> ${new Date(player.dateOfBirth).toLocaleDateString()}</p>
                                <p style="margin: 5px 0;"><strong>Height:</strong> ${parseFloat(player.height).toFixed(2)}m</p>
                                <p style="margin: 5px 0;"><strong>Weight:</strong> ${player.weight}kg</p>
                            </div>
                        </div>
                        
                        <button onclick="hidePlayerDetails()" style="position: absolute; top: 10px; right: 10px; background: #dc3545; color: white; border: none; border-radius: 50%; width: 30px; height: 30px; cursor: pointer; font-size: 16px; display: flex; align-items: center; justify-content: center;">×</button>
                    </div>
                </div>
            </td>
        `;

        // Insert detail row right after the selected row
        selectedRow.parentNode.insertBefore(detailRow, selectedRow.nextSibling);

        // Smooth scroll to the detail row
        setTimeout(() => {
            detailRow.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }, 100);
    }

    // Hide the old player details section
    playerDetails.style.display = 'none';
}


        // Function to hide player details
        function hidePlayerDetails() {
            const existingDetailRows = document.querySelectorAll('.player-detail-row');
            existingDetailRows.forEach(row => row.remove());
            
            const rows = document.querySelectorAll('.player-row');
            rows.forEach(row => {
                row.classList.remove('selected');
                row.style.backgroundColor = '';
            });
            
            selectedPlayer = null;
        }

        // Get position suffix (1st, 2nd, 3rd, 4th, etc.)
        function getPositionSuffix(position) {
            const lastDigit = position % 10;
            const lastTwoDigits = position % 100;
            
            if (lastTwoDigits >= 11 && lastTwoDigits <= 13) {
                return 'th';
            }
            
            switch (lastDigit) {
                case 1: return 'st';
                case 2: return 'nd';  
                case 3: return 'rd';
                default: return 'th';
            }
        }

        function filterPlayers() {
            const positionValue = positionFilter.value.toLowerCase();
            const countryValue = countryFilter.value.toLowerCase();
            const clubValue = clubFilter.value.toLowerCase();
            const searchValue = searchInput.value.toLowerCase().trim();
            
            filteredPlayers = allPlayers.filter(player => {
                const matchesPosition = !positionValue || player.position.toLowerCase().includes(positionValue);
                const matchesCountry = !countryValue || player.nationality.toLowerCase().includes(countryValue);
                const matchesClub = !clubValue || player.team.name.toLowerCase().includes(clubValue);
                const matchesSearch = !searchValue || 
                    player.name.toLowerCase().includes(searchValue) ||
                    player.position.toLowerCase().includes(searchValue) ||
                    player.nationality.toLowerCase().includes(searchValue) ||
                    player.team.name.toLowerCase().includes(searchValue);
                
                return matchesPosition && matchesCountry && matchesClub && matchesSearch;
            });
            
            // Hide player details if selected player is not in filtered results
            if (selectedPlayer && !filteredPlayers.some(p => p.playerId === selectedPlayer.playerId)) {
                hidePlayerDetails();
            }
            
            displayPlayers();
        }

        // Reset all filters
        function resetFilters() {
            positionFilter.value = '';
            countryFilter.value = '';
            clubFilter.value = '';
            searchInput.value = '';
            filteredPlayers = [...allPlayers];
            hidePlayerDetails();
            displayPlayers();
        }

        // Show/hide loading state
        function showLoading() {
            loadingDiv.style.display = 'block';
            playerTable.style.display = 'none';
            noResultsDiv.style.display = 'none';
        }

        function hideLoading() {
            loadingDiv.style.display = 'none';
            playerTable.style.display = 'table';
        }

        // Show/hide no results message
        function showNoResults() {
            noResultsDiv.style.display = 'block';
            playerTable.style.display = 'none';
        }

        function hideNoResults() {
            noResultsDiv.style.display = 'none';
            playerTable.style.display = 'table';
        }

        // Show error message
        function showError(message) {
            loadingDiv.innerHTML = `<p style="color: red;"><i class="fa-solid fa-exclamation-triangle"></i> ${message}</p>`;
        }

        // Debounce function for search input to improve performance
        function debounce(func, wait) {
            let timeout;
            return function executedFunction(...args) {
                const later = () => {
                    clearTimeout(timeout);
                    func(...args);
                };
                clearTimeout(timeout);
                timeout = setTimeout(later, wait);
            };
        }

        // Event listeners
        document.addEventListener('DOMContentLoaded', function() {
            // Fetch players when page loads
            fetchPlayers();
            
            // Add event listeners for filters
            positionFilter.addEventListener('change', filterPlayers);
            countryFilter.addEventListener('change', filterPlayers);
            clubFilter.addEventListener('change', filterPlayers);
            
            // Apply debounce to search input
            const debouncedFilter = debounce(filterPlayers, 300);
            searchInput.addEventListener('input', debouncedFilter);
            
            resetBtn.addEventListener('click', resetFilters);
            
            // Add search button functionality (optional - input already has live search)
            const searchBtn = document.getElementById('searchBtn');
            if (searchBtn) {
                searchBtn.addEventListener('click', filterPlayers);
            }
            
            // Add Enter key support for search input
            searchInput.addEventListener('keypress', function(e) {
                if (e.key === 'Enter') {
                    filterPlayers();
                }
            });
        });