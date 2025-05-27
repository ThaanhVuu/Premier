const token = sessionStorage.getItem("accessToken");
if (token == null){
    window.location.href = "../login/index.html"
}



// Dashboard JavaScript
class AdminDashboard {
    constructor() {
        this.currentPage = 'Dashboard';
        this.token = localStorage.getItem('authToken');
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.loadPage('Dashboard');
        this.setActiveNavItem('Dashboard');
    }

    setupEventListeners() {
        // Navigation event listeners
        const navItems = document.querySelectorAll('aside nav ul li');
        navItems.forEach(item => {
            item.addEventListener('click', (e) => {
                const pageName = e.target.id;
                this.loadPage(pageName);
                this.setActiveNavItem(pageName);
            });
        });

        // Logout functionality (if needed)
        document.querySelector('.User').addEventListener('click', () => {
            this.showUserMenu();
        });
    }

    setActiveNavItem(pageName) {
        // Remove active class from all nav items
        document.querySelectorAll('aside nav ul li').forEach(item => {
            item.classList.remove('active');
        });
        
        // Add active class to clicked item
        const activeItem = document.getElementById(pageName);
        if (activeItem) {
            activeItem.classList.add('active');
        }
        
        this.currentPage = pageName;
    }

    loadPage(pageName) {
        const contentDiv = document.getElementById('content');
        
        switch(pageName) {
            case 'Dashboard':
                this.loadDashboard(contentDiv);
                break;
            case 'User':
                this.loadUserManagement(contentDiv);
                break;
            case 'Log':
                this.loadLogManagement(contentDiv);
                break;
            case 'Back up':
                this.loadBackupManagement(contentDiv);
                break;
            default:
                this.loadDashboard(contentDiv);
        }
    }

    loadDashboard(container) {
        container.innerHTML = `
            <div style="background-color: white; padding: 20px; border-radius: 8px; box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);">
                <h2>Dashboard Overview</h2>
                <div class="dashboard-stats" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 20px; margin: 20px 0;">
                    <div class="stat-card" style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 20px; border-radius: 10px; text-align: center;">
                        <h3>Total Users</h3>
                        <p style="font-size: 2em; margin: 10px 0;" id="totalUsers">Loading...</p>
                    </div>
                    <div class="stat-card" style="background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%); color: white; padding: 20px; border-radius: 10px; text-align: center;">
                        <h3>Active Sessions</h3>
                        <p style="font-size: 2em; margin: 10px 0;" id="activeSessions">Loading...</p>
                    </div>
                    <div class="stat-card" style="background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%); color: white; padding: 20px; border-radius: 10px; text-align: center;">
                        <h3>System Health</h3>
                        <p style="font-size: 2em; margin: 10px 0;" id="systemHealth">Loading...</p>
                    </div>
                </div>
                
                <div style="margin-top: 30px;">
                    <h3>Recent Activity</h3>
                    <div id="recentActivity" style="background: #f8f9fa; padding: 15px; border-radius: 8px; margin-top: 10px;">
                        Loading recent activities...
                    </div>
                </div>
            </div>
        `;
        
        // Load dashboard data
        this.loadDashboardData();
    }

    loadUserManagement(container) {
        container.innerHTML = `
            <div style="background-color: white; padding: 20px; border-radius: 8px; box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
                    <h2>User Management</h2>
                    <button onclick="dashboard.showAddUserForm()" style="background-color: #28a745; color: white;">
                        <i class="fas fa-plus"></i> Add User
                    </button>
                </div>
                
                <div style="margin-bottom: 20px;">
                    <input type="text" id="userSearchInput" placeholder="Search users..." 
                           style="width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 4px;"
                           onkeyup="dashboard.searchUsers()">
                </div>
                
                <div class="table-container" style="overflow-x: auto;">
                    <table style="width: 100%; border-collapse: collapse; margin-top: 10px;">
                        <thead>
                            <tr style="background-color: #f8f9fa;">
                                <th style="padding: 12px; text-align: left; border-bottom: 1px solid #ddd;">ID</th>
                                <th style="padding: 12px; text-align: left; border-bottom: 1px solid #ddd;">Name</th>
                                <th style="padding: 12px; text-align: left; border-bottom: 1px solid #ddd;">Email</th>
                                <th style="padding: 12px; text-align: left; border-bottom: 1px solid #ddd;">Role</th>
                                <th style="padding: 12px; text-align: left; border-bottom: 1px solid #ddd;">Status</th>
                                <th style="padding: 12px; text-align: left; border-bottom: 1px solid #ddd;">Actions</th>
                            </tr>
                        </thead>
                        <tbody id="userTableBody">
                            <tr>
                                <td colspan="6" style="text-align: center; padding: 20px;">Loading users...</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        `;
        
        this.loadUsers();
    }

    loadLogManagement(container) {
        container.innerHTML = `
            <div style="background-color: white; padding: 20px; border-radius: 8px; box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
                    <h2>System Logs</h2>
                    <div>
                        <select id="logFilter" style="padding: 8px; margin-right: 10px; border: 1px solid #ddd; border-radius: 4px;">
                            <option value="all">All Levels</option>
                            <option value="error">Error</option>
                            <option value="warning">Warning</option>
                            <option value="info">Info</option>
                        </select>
                        <button onclick="dashboard.refreshLogs()" style="background-color: #17a2b8; color: white;">
                            <i class="fas fa-refresh"></i> Refresh
                        </button>
                    </div>
                </div>
                
                <div class="log-container" style="max-height: 500px; overflow-y: auto; background: #f8f9fa; padding: 15px; border-radius: 8px; font-family: monospace;">
                    <div id="logContent">Loading logs...</div>
                </div>
                
                <div style="margin-top: 15px; text-align: right;">
                    <button onclick="dashboard.downloadLogs()" style="background-color: #6c757d; color: white;">
                        <i class="fas fa-download"></i> Download Logs
                    </button>
                </div>
            </div>
        `;
        
        this.loadLogs();
    }

    loadBackupManagement(container) {
        container.innerHTML = `
            <div style="background-color: white; padding: 20px; border-radius: 8px; box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);">
                <h2>Backup Management</h2>
                
                <div style="margin: 20px 0;">
                    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 20px;">
                        <div style="border: 1px solid #ddd; padding: 20px; border-radius: 8px;">
                            <h3>Create Backup</h3>
                            <p>Create a new system backup</p>
                            <button onclick="dashboard.createBackup()" style="background-color: #28a745; color: white; width: 100%;">
                                <i class="fas fa-save"></i> Create Backup
                            </button>
                        </div>
                        
                        <div style="border: 1px solid #ddd; padding: 20px; border-radius: 8px;">
                            <h3>Scheduled Backups</h3>
                            <p>Manage automatic backup schedule</p>
                            <button onclick="dashboard.manageSchedule()" style="background-color: #007bff; color: white; width: 100%;">
                                <i class="fas fa-clock"></i> Manage Schedule
                            </button>
                        </div>
                    </div>
                </div>
                
                <h3>Backup History</h3>
                <div class="table-container" style="overflow-x: auto; margin-top: 10px;">
                    <table style="width: 100%; border-collapse: collapse;">
                        <thead>
                            <tr style="background-color: #f8f9fa;">
                                <th style="padding: 12px; text-align: left; border-bottom: 1px solid #ddd;">Date</th>
                                <th style="padding: 12px; text-align: left; border-bottom: 1px solid #ddd;">Type</th>
                                <th style="padding: 12px; text-align: left; border-bottom: 1px solid #ddd;">Size</th>
                                <th style="padding: 12px; text-align: left; border-bottom: 1px solid #ddd;">Status</th>
                                <th style="padding: 12px; text-align: left; border-bottom: 1px solid #ddd;">Actions</th>
                            </tr>
                        </thead>
                        <tbody id="backupTableBody">
                            <tr>
                                <td colspan="5" style="text-align: center; padding: 20px;">Loading backup history...</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        `;
        
        this.loadBackupHistory();
    }

    // Dashboard Data Loading Methods
    async loadDashboardData() {
        try {
            // Simulate API calls - replace with actual API endpoints
            const stats = await this.fetchDashboardStats();
            
            document.getElementById('totalUsers').textContent = stats.totalUsers || '0';
            document.getElementById('activeSessions').textContent = stats.activeSessions || '0';
            document.getElementById('systemHealth').textContent = stats.systemHealth || 'Good';
            
            this.loadRecentActivity();
        } catch (error) {
            console.error('Error loading dashboard data:', error);
            this.showNotification('Error loading dashboard data', 'error');
        }
    }

    async fetchDashboardStats() {
        // TODO: Replace with actual API call
        // return await axios.get('/api/dashboard/stats', { headers: { Authorization: `Bearer ${this.token}` }});
        
        // Mock data for now
        return new Promise(resolve => {
            setTimeout(() => {
                resolve({
                    totalUsers: 1250,
                    activeSessions: 89,
                    systemHealth: 'Excellent'
                });
            }, 1000);
        });
    }

    loadRecentActivity() {
        const activityDiv = document.getElementById('recentActivity');
        // Mock recent activities
        const activities = [
            { time: '2 minutes ago', action: 'User john.doe@email.com logged in', type: 'info' },
            { time: '15 minutes ago', action: 'Backup completed successfully', type: 'success' },
            { time: '1 hour ago', action: 'Failed login attempt detected', type: 'warning' },
            { time: '2 hours ago', action: 'System maintenance completed', type: 'info' }
        ];

        activityDiv.innerHTML = activities.map(activity => `
            <div style="padding: 10px; margin: 5px 0; border-left: 3px solid ${this.getActivityColor(activity.type)}; background: white; border-radius: 4px;">
                <span style="color: #666; font-size: 0.9em;">${activity.time}</span> - ${activity.action}
            </div>
        `).join('');
    }

    getActivityColor(type) {
        const colors = {
            'info': '#17a2b8',
            'success': '#28a745',
            'warning': '#ffc107',
            'error': '#dc3545'
        };
        return colors[type] || '#6c757d';
    }

    // User Management Methods
    async loadUsers() {
        try {
            // TODO: Replace with actual API call
            const users = await this.fetchUsers();
            this.renderUserTable(users);
        } catch (error) {
            console.error('Error loading users:', error);
            this.showNotification('Error loading users', 'error');
        }
    }

    async fetchUsers() {
        // TODO: Replace with actual API call
        // return await axios.get('/api/users', { headers: { Authorization: `Bearer ${this.token}` }});
        
        // Mock data
        return new Promise(resolve => {
            setTimeout(() => {
                resolve([
                    { id: 1, name: 'John Doe', email: 'john.doe@email.com', role: 'Admin', status: 'Active' },
                    { id: 2, name: 'Jane Smith', email: 'jane.smith@email.com', role: 'User', status: 'Active' },
                    { id: 3, name: 'Bob Johnson', email: 'bob.johnson@email.com', role: 'User', status: 'Inactive' }
                ]);
            }, 500);
        });
    }

    renderUserTable(users) {
        const tbody = document.getElementById('userTableBody');
        tbody.innerHTML = users.map(user => `
            <tr>
                <td style="padding: 12px; border-bottom: 1px solid #eee;">${user.id}</td>
                <td style="padding: 12px; border-bottom: 1px solid #eee;">${user.name}</td>
                <td style="padding: 12px; border-bottom: 1px solid #eee;">${user.email}</td>
                <td style="padding: 12px; border-bottom: 1px solid #eee;">${user.role}</td>
                <td style="padding: 12px; border-bottom: 1px solid #eee;">
                    <span style="padding: 4px 8px; border-radius: 4px; font-size: 0.9em; background-color: ${user.status === 'Active' ? '#d4edda' : '#f8d7da'}; color: ${user.status === 'Active' ? '#155724' : '#721c24'};">
                        ${user.status}
                    </span>
                </td>
                <td style="padding: 12px; border-bottom: 1px solid #eee;">
                    <button onclick="dashboard.editUser(${user.id})" style="background-color: #007bff; color: white; margin-right: 5px; padding: 6px 12px;">Edit</button>
                    <button onclick="dashboard.deleteUser(${user.id})" style="background-color: #dc3545; color: white; padding: 6px 12px;">Delete</button>
                </td>
            </tr>
        `).join('');
    }

    searchUsers() {
        const searchTerm = document.getElementById('userSearchInput').value.toLowerCase();
        // TODO: Implement user search functionality
        console.log('Searching for:', searchTerm);
    }

    showAddUserForm() {
        // TODO: Show add user modal/form
        this.showNotification('Add user form - to be implemented', 'info');
    }

    editUser(userId) {
        // TODO: Show edit user modal/form
        this.showNotification(`Edit user ${userId} - to be implemented`, 'info');
    }

    deleteUser(userId) {
        if (confirm('Are you sure you want to delete this user?')) {
            // TODO: Implement user deletion
            this.showNotification(`Delete user ${userId} - to be implemented`, 'info');
        }
    }

    // Log Management Methods
    async loadLogs() {
        try {
            const logs = await this.fetchLogs();
            this.renderLogs(logs);
        } catch (error) {
            console.error('Error loading logs:', error);
            this.showNotification('Error loading logs', 'error');
        }
    }

    async fetchLogs() {
        // TODO: Replace with actual API call
        // Mock data
        return new Promise(resolve => {
            setTimeout(() => {
                resolve([
                    { timestamp: '2024-01-15 10:30:25', level: 'INFO', message: 'User authentication successful' },
                    { timestamp: '2024-01-15 10:29:18', level: 'WARNING', message: 'High memory usage detected' },
                    { timestamp: '2024-01-15 10:28:45', level: 'ERROR', message: 'Database connection timeout' },
                    { timestamp: '2024-01-15 10:27:32', level: 'INFO', message: 'Backup process started' }
                ]);
            }, 500);
        });
    }

    renderLogs(logs) {
        const logContent = document.getElementById('logContent');
        logContent.innerHTML = logs.map(log => `
            <div style="margin-bottom: 5px; color: ${this.getLogColor(log.level)};">
                [${log.timestamp}] ${log.level}: ${log.message}
            </div>
        `).join('');
    }

    getLogColor(level) {
        const colors = {
            'ERROR': '#dc3545',
            'WARNING': '#ffc107',
            'INFO': '#17a2b8'
        };
        return colors[level] || '#6c757d';
    }

    refreshLogs() {
        this.loadLogs();
        this.showNotification('Logs refreshed', 'success');
    }

    downloadLogs() {
        // TODO: Implement log download functionality
        this.showNotification('Download logs - to be implemented', 'info');
    }

    // Backup Management Methods
    async loadBackupHistory() {
        try {
            const backups = await this.fetchBackupHistory();
            this.renderBackupTable(backups);
        } catch (error) {
            console.error('Error loading backup history:', error);
            this.showNotification('Error loading backup history', 'error');
        }
    }

    async fetchBackupHistory() {
        // TODO: Replace with actual API call
        // Mock data
        return new Promise(resolve => {
            setTimeout(() => {
                resolve([
                    { date: '2024-01-15 02:00:00', type: 'Full', size: '2.3 GB', status: 'Completed' },
                    { date: '2024-01-14 02:00:00', type: 'Incremental', size: '450 MB', status: 'Completed' },
                    { date: '2024-01-13 02:00:00', type: 'Full', size: '2.1 GB', status: 'Failed' }
                ]);
            }, 500);
        });
    }

    renderBackupTable(backups) {
        const tbody = document.getElementById('backupTableBody');
        tbody.innerHTML = backups.map(backup => `
            <tr>
                <td style="padding: 12px; border-bottom: 1px solid #eee;">${backup.date}</td>
                <td style="padding: 12px; border-bottom: 1px solid #eee;">${backup.type}</td>
                <td style="padding: 12px; border-bottom: 1px solid #eee;">${backup.size}</td>
                <td style="padding: 12px; border-bottom: 1px solid #eee;">
                    <span style="padding: 4px 8px; border-radius: 4px; font-size: 0.9em; background-color: ${backup.status === 'Completed' ? '#d4edda' : '#f8d7da'}; color: ${backup.status === 'Completed' ? '#155724' : '#721c24'};">
                        ${backup.status}
                    </span>
                </td>
                <td style="padding: 12px; border-bottom: 1px solid #eee;">
                    <button onclick="dashboard.downloadBackup('${backup.date}')" style="background-color: #28a745; color: white; margin-right: 5px; padding: 6px 12px;">Download</button>
                    <button onclick="dashboard.restoreBackup('${backup.date}')" style="background-color: #007bff; color: white; padding: 6px 12px;">Restore</button>
                </td>
            </tr>
        `).join('');
    }

    createBackup() {
        if (confirm('Are you sure you want to create a new backup? This may take some time.')) {
            this.showNotification('Creating backup...', 'info');
            // TODO: Implement backup creation
        }
    }

    manageSchedule() {
        // TODO: Show backup schedule management form
        this.showNotification('Backup schedule management - to be implemented', 'info');
    }

    downloadBackup(date) {
        // TODO: Implement backup download
        this.showNotification(`Download backup from ${date} - to be implemented`, 'info');
    }

    restoreBackup(date) {
        if (confirm(`Are you sure you want to restore backup from ${date}? This will overwrite current data.`)) {
            // TODO: Implement backup restoration
            this.showNotification(`Restore backup from ${date} - to be implemented`, 'info');
        }
    }

    // Utility Methods
    showUserMenu() {
        // TODO: Show user dropdown menu with logout option
        if (confirm('Do you want to logout?')) {
            this.logout();
        }
    }

    logout() {
        localStorage.removeItem('authToken');
        window.location.href = 'login.html'; // Adjust path as needed
    }

    showNotification(message, type = 'info') {
        // Create notification element
        const notification = document.createElement('div');
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 15px 20px;
            border-radius: 4px;
            color: white;
            z-index: 1000;
            max-width: 300px;
            font-weight: 500;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        `;
        
        const colors = {
            'success': '#28a745',
            'error': '#dc3545',
            'warning': '#ffc107',
            'info': '#17a2b8'
        };
        
        notification.style.backgroundColor = colors[type] || colors.info;
        notification.textContent = message;
        
        document.body.appendChild(notification);
        
        // Remove notification after 3 seconds
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 3000);
    }
}

// Initialize dashboard when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.dashboard = new AdminDashboard();
});