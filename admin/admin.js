const API_BASE_URL = 'https://premier-dl8h.onrender.com/api/';
const token = sessionStorage.getItem("accessToken");


if (!token || token == null) {
    window.location.href = "../login/index.html";
}

axios.get(`${API_BASE_URL}user`, {
    headers: {
        authorization: `Bearer ${token}`
    }
})
    .then(response => {
        console.log(response.data.result);
    })
    .catch(error => {
        console.error(error.response.data.info || error.message);
    });

// DOM elements
const menuItems = document.querySelectorAll('.menu-item');
const contentSections = document.querySelectorAll('.content-section');

// Menu navigation functionality
function initializeNavigation() {
    menuItems.forEach(item => {
        item.addEventListener('click', function () {
            const targetId = this.id.toLowerCase();

            // Remove active class from all menu items
            menuItems.forEach(menu => menu.classList.remove('active'));

            // Add active class to clicked menu item
            this.classList.add('active');

            // Hide all content sections
            contentSections.forEach(section => section.classList.remove('active'));

            // Show corresponding content section
            const targetSection = document.getElementById(`${targetId}-content`);
            if (targetSection) {
                targetSection.classList.add('active');
            }

            // Load specific content based on selection
            loadSectionContent(targetId);
        });
    });
}

// Load content for specific sections
function loadSectionContent(sectionId) {
    switch (sectionId) {
        case 'dashboard':
            loadDashboardData();
            break;
        case 'user':
            loadUserData();
            break;
        case 'log':
            loadLogData();
            break;
        case 'back-up':
            loadBackupData();
            break;
        default:
            console.log('Unknown section:', sectionId);
    }
}

// Dashboard data loading
function loadDashboardData() {
    // In a real implementation, you would fetch data from your API:
    /*
    axios.get(`${API_BASE_URL}dashboard/stats`)
    .then(response => {
        updateDashboardStats(response.data);
    })
    .catch(error => {
        console.error('Error loading dashboard data:', error);
    });
    */

    // For now, we'll simulate loading with empty data
    updateDashboardStats({
        totalUsers: 0,
        totalLogs: 0,
        totalBackups: 0,
        systemStatus: 'Online'
    });
}

// Update dashboard statistics
function updateDashboardStats(data) {
    const statNumbers = document.querySelectorAll('.stat-number');
    if (statNumbers.length >= 4) {
        statNumbers[0].textContent = data.totalUsers || 0;
        statNumbers[1].textContent = data.totalLogs || 0;
        statNumbers[2].textContent = data.totalBackups || 0;
        statNumbers[3].textContent = data.systemStatus || 'Online';
    }
}

// User data loading
function loadUserData() {
    console.log('Loading user data...');
    const userTableBody = document.querySelector('#user-content .data-table tbody');

    // Clear existing content
    userTableBody.innerHTML = '';

    // In a real implementation:

    axios.get(`${API_BASE_URL}user`,
        { headers: { authorization: `Bearer ${token}` } }
    )
        .then(response => {
            populateUserTable(response.data);
        })
        .catch(error => {
            console.log(error.response?.data.info || error.message);
            showEmptyState(userTableBody, 'No users found');
        });


    // For now, show empty state
    showEmptyState(userTableBody, 'No users found', 7);
}

// Log data loading
function loadLogData() {
    console.log('Loading log data...');
    const logTableBody = document.querySelector('#log-content .data-table tbody');

    // Clear existing content
    logTableBody.innerHTML = '';

    // In a real implementation:
    /*
    axios.get(`${API_BASE_URL}logs`)
    .then(response => {
        populateLogTable(response.data);
    })
    .catch(error => {
        console.error('Error loading log data:', error);
        showEmptyState(logTableBody, 'No logs found');
    });
    */

    // For now, show empty state
    showEmptyState(logTableBody, 'No logs found', 7);
}

// Backup data loading
function loadBackupData() {
    console.log('Loading backup data...');
    const backupTableBody = document.querySelector('#backup-content .data-table tbody');

    // Clear existing content
    backupTableBody.innerHTML = '';

    // In a real implementation:
    /*
    axios.get(`${API_BASE_URL}backups`)
    .then(response => {
        populateBackupTable(response.data);
    })
    .catch(error => {
        console.error('Error loading backup data:', error);
        showEmptyState(backupTableBody, 'No backups found');
    });
    */

    // For now, show empty state
    showEmptyState(backupTableBody, 'No backups found', 7);
}

// Show empty state in tables
function showEmptyState(tableBody, message, columnCount = 7) {
    const row = document.createElement('tr');
    const cell = document.createElement('td');
    cell.colSpan = columnCount;
    cell.style.textAlign = 'center';
    cell.style.padding = '40px';
    cell.style.color = '#666';
    cell.style.fontStyle = 'italic';
    cell.textContent = message;
    row.appendChild(cell);
    tableBody.appendChild(row);
}

// Populate user table (for future use)
function populateUserTable(users) {
    const tableBody = document.querySelector('#user-content .data-table tbody');
    tableBody.innerHTML = '';

    users.forEach(user => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${user.id}</td>
            <td>${user.name}</td>
            <td>${user.email}</td>
            <td>${user.role}</td>
            <td><span class="status ${user.status.toLowerCase()}">${user.status}</span></td>
            <td>${formatDate(user.createdDate)}</td>
            <td>
                <button onclick="editUser(${user.id})" class="action-btn edit-btn">Edit</button>
                <button onclick="deleteUser(${user.id})" class="action-btn delete-btn">Delete</button>
            </td>
        `;
        tableBody.appendChild(row);
    });
}

// Populate log table (for future use)
function populateLogTable(logs) {
    const tableBody = document.querySelector('#log-content .data-table tbody');
    tableBody.innerHTML = '';

    logs.forEach(log => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${log.id}</td>
            <td>${formatDateTime(log.timestamp)}</td>
            <td><span class="log-level ${log.level.toLowerCase()}">${log.level}</span></td>
            <td>${log.message}</td>
            <td>${log.user || 'System'}</td>
            <td>${log.ipAddress}</td>
            <td>
                <button onclick="viewLogDetails(${log.id})" class="action-btn view-btn">View</button>
            </td>
        `;
        tableBody.appendChild(row);
    });
}

// Populate backup table (for future use)
function populateBackupTable(backups) {
    const tableBody = document.querySelector('#backup-content .data-table tbody');
    tableBody.innerHTML = '';

    backups.forEach(backup => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${backup.id}</td>
            <td>${backup.name}</td>
            <td>${backup.type}</td>
            <td>${formatFileSize(backup.size)}</td>
            <td><span class="status ${backup.status.toLowerCase()}">${backup.status}</span></td>
            <td>${formatDate(backup.createdDate)}</td>
            <td>
                <button onclick="downloadBackup(${backup.id})" class="action-btn download-btn">Download</button>
                <button onclick="deleteBackup(${backup.id})" class="action-btn delete-btn">Delete</button>
            </td>
        `;
        tableBody.appendChild(row);
    });
}

// Utility functions
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });
}

function formatDateTime(dateString) {
    const date = new Date(dateString);
    return date.toLocaleString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
}

function formatFileSize(bytes) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

// Button event handlers (placeholder functions)
function editUser(userId) {
    console.log('Edit user:', userId);
    // Implement edit user functionality
}

function deleteUser(userId) {
    if (confirm('Are you sure you want to delete this user?')) {
        console.log('Delete user:', userId);
        // Implement delete user functionality
    }
}

function viewLogDetails(logId) {
    console.log('View log details:', logId);
    // Implement view log details functionality
}

function downloadBackup(backupId) {
    console.log('Download backup:', backupId);
    // Implement download backup functionality
}

function deleteBackup(backupId) {
    if (confirm('Are you sure you want to delete this backup?')) {
        console.log('Delete backup:', backupId);
        // Implement delete backup functionality
    }
}

// Filter functionality for logs
function initializeFilters() {
    const filterSelect = document.querySelector('.filter-select');
    const refreshBtn = document.querySelector('.refresh-btn');

    if (filterSelect) {
        filterSelect.addEventListener('change', function () {
            const filterValue = this.value;
            console.log('Filter logs by:', filterValue);
            // Implement log filtering functionality
            loadLogData(); // Reload with filter
        });
    }

    if (refreshBtn) {
        refreshBtn.addEventListener('click', function () {
            console.log('Refreshing logs...');
            loadLogData();
        });
    }

    // Add new user button
    const addUserBtn = document.querySelector('#user-content .add-btn');
    if (addUserBtn) {
        addUserBtn.addEventListener('click', function () {
            console.log('Add new user');
            // Implement add user functionality
        });
    }

    // Create backup button
    const createBackupBtn = document.querySelector('#backup-content .add-btn');
    if (createBackupBtn) {
        createBackupBtn.addEventListener('click', function () {
            console.log('Create new backup');
            // Implement create backup functionality
        });
    }
}

// Initialize the application
document.addEventListener('DOMContentLoaded', function () {
    initializeNavigation();
    initializeFilters();

    // Load dashboard data by default
    loadDashboardData();
});