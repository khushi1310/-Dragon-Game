let score = 0;
let scoreCount = document.getElementsByClassName('scoreCount')[0];
let dino = document.getElementsByClassName('dino')[0];
let gameOver = document.getElementsByClassName('gameOver')[0];
let gameOver1 = document.getElementsByClassName('gameOver')[1];
let obstacle = document.getElementsByClassName('obstacle')[0];
let gameContainer = document.getElementsByClassName('gameContainer')[0];


audiogo = new Audio('gameover.mp3');

audio = new Audio('music.mp3');
setTimeout(() => {
    audio.play();
}, 1000);

let cross = true;
document.onkeydown = (e) => {

    if (e.code == 'ArrowUp') {
        dino.classList.add('jumpDino');
        setTimeout(() => {
            dino.classList.remove('jumpDino');
        }, 600);
    }
    else if (e.code == 'ArrowLeft') {
        let dx = parseInt(window.getComputedStyle(dino, null).getPropertyValue('left'));
        if (dx > 0)
            dino.style.left = `${dx - 20}px`;
    }
    else if (e.code == 'ArrowRight') {
        let dx = parseInt(window.getComputedStyle(dino, null).getPropertyValue('left'));
        if (dx < 1000)
            dino.style.left = `${dx + 20}px`;
    }
    else if (e.code == 'Enter')
        document.location.reload()
};
setInterval(() => {
    let dx = parseInt(window.getComputedStyle(dino, null).getPropertyValue('left'));
    let dy = parseInt(window.getComputedStyle(dino, null).getPropertyValue('bottom'));

    let ox = parseInt(window.getComputedStyle(obstacle, null).getPropertyValue('left'));
    let oy = parseInt(window.getComputedStyle(obstacle, null).getPropertyValue('bottom'));

    offsetX = Math.abs(dx - ox);
    offsety = Math.abs(dy - oy);
    if (offsetX < 98 && offsety < 98) {
        gameOver.style.visibility = 'visible';
        gameOver1.style.visibility = 'visible';
        gameContainer.style.opacity = '0.5';
        obstacle.classList.remove('obstacleAny');
        obstacle.style.left = `${ox}px`;
        cross = false;
        audio.pause();
        audiogo.play();
        setTimeout(() => {
            audiogo.pause();
        }, 1000);

    }
    else if (offsetX < 50 && cross) {
        score++;
        scoreCount.innerHTML = `Your Score: ${score}`;
        cross = false;
        setTimeout(() => {
            let speed = parseFloat(window.getComputedStyle(obstacle, null).getPropertyValue('animation-Duration'));
            console.log(speed);
            obstacle.style.animationDuration = speed - 0.1 + 's';
            cross = true;
        }, 200);

    }
}, 100);
