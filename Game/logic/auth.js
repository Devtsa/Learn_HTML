// AuthService.js

class AuthService {
    constructor() {
        this.currentUser = null;
    }

    login(username) {
        if (!username) {
            // alert("Username cannot be empty.");
            return false;
        }
        
        let userData = localStorage.getItem(username);
        if (userData) {
            // User exists, change user data
            this.currentUser = JSON.parse(userData);
        } else {
            // New user, create default data
            this.currentUser = {
                username: username,
                maxLevel: 0
            };
            this.save();
        }
        return true;
    }

    logout() {
        this.currentUser = null;
    }

    save() {
        if (this.currentUser) {
            localStorage.setItem(this.currentUser.username, JSON.stringify(this.currentUser));
        }
    }

    updateMaxLevel(level) {
        if (this.currentUser && level > this.currentUser.maxLevel) {
            this.currentUser.maxLevel = level;
            this.save();
        }
    }

    getCurrentUser() {
        return this.currentUser;
    }
}