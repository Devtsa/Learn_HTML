// import AuthService from './auth.js';
// import Game from './game.js';

document.addEventListener('DOMContentLoaded', () => {
    const auth = new AuthService();
    const game = new Game('gameCanvas');

    const loginView = document.getElementById('login-view');
    const dashboardView = document.getElementById('dashboard-view');
    const gameView = document.getElementById('game-view');

    const notificationElement = document.getElementById('notification');
    let notificationTimeOut;
    const usernameInput = document.getElementById('username-input');
    const loginBtn = document.getElementById('login-btn');
    
    const welcomeMessage = document.getElementById('welcome-message');
    const maxLevelDisplay = document.getElementById('max-level-display');
    const startGameBtn = document.getElementById('start-game-btn');
    const logoutBtn = document.getElementById('logout-btn');

    const restartBtn = document.getElementById('restart-btn');
    const nextLevelBtn = document.getElementById('next-level-btn');

    function showNotification(message, duration = 3000) {
        clearTimeout(notificationTimeOut);

        notificationElement.textContent = message;
        notificationElement.classList.remove('hidden');

        notificationTimeOut = setTimeout(() => {
            notificationElement.classList.add('hidden');
        }, duration);
    }

    function showView(view) {
        document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
        view.classList.add('active');
    }

    function showDashboard() {
        const user = auth.getCurrentUser();
        if (user) {
            welcomeMessage.textContent = `Welcom, ${user.username}!`;
            maxLevelDisplay.textContent = user.maxLevel;
            game.currentLevel = user.maxLevel;
            showView(dashboardView);
        } else {
            showView(loginView);
        }
    }

    //events
    loginBtn.addEventListener('click', () => {
        const username = usernameInput.value.trim();
        if (auth.login(username)) {
            showDashboard();
        }
        else {
            showNotification("Username cannot be empty or already exists.");
        }
    });

    logoutBtn.addEventListener('click', () => {
        auth.logout();
        showView(loginView);
    });

    startGameBtn.addEventListener('click', () => {
        showView(gameView);
        game.start();
    });
    

    document.addEventListener('gameOver', (e) => {
    });

    document.addEventListener('levelComplete', (e) => {
        const completedLevel = e.detail.level;
        auth.updateMaxLevel(completedLevel + 1);
    });

    restartBtn.addEventListener('click', () => {
        showDashboard();
    });

    nextLevelBtn.addEventListener('click', () => {
        game.currentLevel++;
        if (game.currentLevel >= game.levelDesigns.length) {
            alert("Congratulations! You've completed all levels!");
            showDashboard();
        } else {
            showView(gameView);
            game.start();
        }
    });

    // Initialization
    showView(loginView);
});
