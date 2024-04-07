const mario = document.querySelector('.mario');
const pipe = document.querySelector('.pipe');
const start = document.querySelector('.start');
const gameover = document.querySelector('.game-over');

let score = 0;
const scoreDisplay = document.getElementById('scoreDisplay');
let passedObstacle = false; 
const audioStart = new Audio('./soung/audio_theme.mp3');
const audioGameOver = new Audio('./soung/audio_gameover.mp3');

const startGame = () => {
    pipe.classList.add('pipe-animation');
    start.style.display = 'none';

    
    audioStart.play();

    
    loop();
}

function restartGame() {
    gameover.style.display = 'none';
    pipe.style.left = '';
    pipe.style.right = '0';
    mario.src = './img/mario.gif';
    mario.style.width = '150px';
    mario.style.bottom = '0';

    start.style.display = 'none';

    audioGameOver.pause();
    audioGameOver.currentTime = 0;

    audioStart.play();
    audioStart.currentTime = 0;

    passedObstacle = false; 
}

const jump = () => {
    mario.classList.add('jump');

    setTimeout(() => {
        mario.classList.remove('jump');
    }, 800);

    passedObstacle = false; 
}

const loop = () => {
    setInterval(() => {
        const pipePosition = pipe.offsetLeft;
        const marioPosition = parseInt(window.getComputedStyle(mario).bottom.replace('px', ''));

        if (pipePosition <= 120 && pipePosition > 0 && marioPosition < 80) {
            pipe.classList.remove('pipe-animation');
            pipe.style.left = `${pipePosition}px`;

            mario.classList.remove('jump');
            mario.style.bottom = `${marioPosition}px`;

            mario.src = './img/game-over.png';
            mario.style.width = '80px';
            mario.style.marginLeft = '50px';

            function stopAudioStart() {
                audioStart.pause();
            }
            stopAudioStart();

            audioGameOver.play();

            function stopAudio() {
                audioGameOver.pause();
            }
            setTimeout(stopAudio, 7000);

            gameover.style.display = 'flex';

            clearInterval(loop);
        } else {
   
            if (pipePosition <= 0 && !passedObstacle) {
                increaseScore();
                passedObstacle = true; 
            }
        }
    }, 10);
}

document.addEventListener('keypress', e => {
    const tecla = e.key;
    if (tecla === ' ') {
        jump();
    }
});

document.addEventListener('touchstart', e => {
    if (e.touches.length > 0) {
        jump();
    }
});

document.addEventListener('keypress', e => {
    const tecla = e.key;
    if (tecla === 'Enter') {
        startGame();
    }
});

function updateScoreDisplay() {
    scoreDisplay.textContent = score;
}

function increaseScore() {
    score++;
    updateScoreDisplay();
}

function resetScore() {
    score = 0;
    updateScoreDisplay();
}
