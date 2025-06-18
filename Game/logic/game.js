
class Game {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        this.ctx = this.canvas.getContext('2d');
        this.canvas.width = 800;
        this.canvas.height = 600;

        // Elements of game
        this.paddle = {};
        this.ball = {};
        this.bricks = [];
        
        // state variables
        this.score = 0;
        this.lives = 3;
        this.currentLevel = 0;
        this.isPaused = true;
        this.animationFrameId = null;

        this.setupControls();
    }

    setupControls() {
        document.addEventListener('mousemove', (e) => {
            let relativeX = e.clientX - this.canvas.offsetLeft;
            if (relativeX > 0 && relativeX < this.canvas.width) {
                this.paddle.x = relativeX - this.paddle.width / 2;
            }
        });
    }

    // level designs
    levelDesigns = [
        // Level 0
        [[1,1,1,1,1,1,1,1], [1,1,1,1,1,1,1,1]], 
        // Level 1
        [[0,1,1,1,1,1,1,0], [1,0,1,1,1,1,0,1], [1,1,0,1,1,0,1,1]],
        // ...
        // Level 2
        [[2,1,1,1,1,1,1,2], [1,2,1,1,1,1,2,1], [1,1,2,0,0,2,1,1]],
        // ... 
    ];

    initLevel(level) {
        this.currentLevel = level;
        
        // Difficults levels
        const paddleWidth = 150 - (level * 5);
        const ballSpeed = 5 + (level * 0.5);

        // paddle 
        this.paddle = {
            width: Math.max(80, paddleWidth),
            height: 20,
            x: (this.canvas.width - Math.max(80, paddleWidth)) / 2,
            y: this.canvas.height - 30,
            color: '#00f5d4'
        };

        // ball
        this.ball = {
            x: this.canvas.width / 2,
            y: this.canvas.height / 2,
            radius: 10,
            dx: ballSpeed * (Math.random() > 0.5 ? 1 : -1), // speed and direction X
            dy: -ballSpeed, // speed and direction Y
            color: '#f72585'
        };

        // Bricks
        this.bricks = [];
        const levelLayout = this.levelDesigns[level] || this.levelDesigns[0];
        const brickRowCount = levelLayout.length;
        const brickColumnCount = levelLayout[0].length;
        const brickInfo = {
            width: 75,
            height: 20,
            padding: 10,
            offsetTop: 40,
            offsetLeft: 65
        };

        for (let r = 0; r < brickRowCount; r++) {
            this.bricks[r] = [];
            for (let c = 0; c < brickColumnCount; c++) {
                if (levelLayout[r][c] > 0) {
                    this.bricks[r][c] = {
                        x: c * (brickInfo.width + brickInfo.padding) + brickInfo.offsetLeft,
                        y: r * (brickInfo.height + brickInfo.padding) + brickInfo.offsetTop,
                        status: levelLayout[r][c] // 1 = normal, 2 = solid
                    };
                }
            }
        }
    }

    // Functions to draw elements
    drawPaddle() {
        this.ctx.fillStyle = this.paddle.color;
        this.ctx.shadowBlur = 10;
        this.ctx.shadowColor = this.paddle.color;
        this.ctx.fillRect(this.paddle.x, this.paddle.y, this.paddle.width, this.paddle.height);
        this.ctx.shadowBlur = 0;
    }

    drawBall() {
        this.ctx.beginPath();
        this.ctx.arc(this.ball.x, this.ball.y, this.ball.radius, 0, Math.PI * 2);
        this.ctx.fillStyle = this.ball.color;
        this.ctx.shadowBlur = 15;
        this.ctx.shadowColor = this.ball.color;
        this.ctx.fill();
        this.ctx.closePath();
        this.ctx.shadowBlur = 0;
    }

    drawBricks() {
        this.bricks.forEach(row => {
            row.forEach(brick => {
                if (brick && brick.status > 0) {
                    this.ctx.beginPath();
                    this.ctx.rect(brick.x, brick.y, 75, 20);
                    // Change color based on status
                    this.ctx.fillStyle = brick.status === 2 ? '#7209b7' : '#4361ee';
                    this.ctx.shadowBlur = 10;
                    this.ctx.shadowColor = this.ctx.fillStyle;
                    this.ctx.fill();
                    this.ctx.closePath();
                    this.ctx.shadowBlur = 0;
                }
            });
        });
    }

    collisionDetection() {
        // collison in the walls
        if (this.ball.x + this.ball.dx > this.canvas.width - this.ball.radius || this.ball.x + this.ball.dx < this.ball.radius) {
            this.ball.dx = -this.ball.dx;
        }
        if (this.ball.y + this.ball.dy < this.ball.radius) {
            this.ball.dy = -this.ball.dy;
        } else if (this.ball.y + this.ball.dy > this.canvas.height - this.ball.radius) {
            // Collision in the paddle
            if (this.ball.x > this.paddle.x && this.ball.x < this.paddle.x + this.paddle.width) {
                this.ball.dy = -this.ball.dy;
            } else {
                this.lives--;
                if (this.lives === 0) {
                    this.gameOver();
                } else {
                    this.resetBallAndPaddle();
                }
            }
        }

        // Briks
        let allBricksBroken = true;
        this.bricks.forEach(row => {
            row.forEach(brick => {
                if (brick && brick.status > 0) {
                    allBricksBroken = false;
                    if (this.ball.x > brick.x && this.ball.x < brick.x + 75 && this.ball.y > brick.y && this.ball.y < brick.y + 20) {
                        this.ball.dy = -this.ball.dy;
                        brick.status--; // Decrease status
                        if (brick.status === 0) {
                            this.score += 10;
                        }
                    }
                }
            });
        });
        
        if (allBricksBroken) {
            this.levelComplete();
        }
    }

    update() {
        if (this.isPaused) return;

        this.ball.x += this.ball.dx;
        this.ball.y += this.ball.dy;
        this.collisionDetection();
        this.draw();

        // update score, lives, and level in the UI
        document.getElementById('score').textContent = this.score;
        document.getElementById('lives').textContent = this.lives;
        document.getElementById('level').textContent = this.currentLevel;

        this.animationFrameId = requestAnimationFrame(() => this.update());
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.drawPaddle();
        this.drawBall();
        this.drawBricks();
    }
    
    start() {
        this.score = 0;
        this.lives = 3;
        this.initLevel(this.currentLevel);
        this.isPaused = false;
        document.getElementById('game-over-screen').classList.add('hidden');
        document.getElementById('level-complete-screen').classList.add('hidden');
        this.update();
    }

    stop() {
        this.isPaused = true;
        if (this.animationFrameId) {
            cancelAnimationFrame(this.animationFrameId);
        }
    }
    
    resetBallAndPaddle() {
        this.ball.x = this.canvas.width / 2;
        this.ball.y = this.canvas.height / 2;
        this.paddle.x = (this.canvas.width - this.paddle.width) / 2;
        // Reset ball speed
        this.stop();
        setTimeout(() => {
            this.isPaused = false;
            this.update();
        }, 1000);
    }

    gameOver() {
        this.stop();
        document.getElementById('game-over-screen').classList.remove('hidden');
        // inform main.js of the game over
        document.dispatchEvent(new CustomEvent('gameOver', { detail: { level: this.currentLevel } }));
    }

    levelComplete() {
        this.stop();
        document.getElementById('level-complete-screen').classList.remove('hidden');
        // inform main.js of the level completion
        document.dispatchEvent(new CustomEvent('levelComplete', { detail: { level: this.currentLevel } }));
    }
}