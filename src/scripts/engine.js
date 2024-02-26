const state = {
    view: {
        squares: document.querySelectorAll(".square"),
        enemy: document.querySelector(".enemy"),
        timeLeft: document.querySelector("#time-left"),
        score: document.querySelector("#score"),
        life: document.querySelector("#life"),
        pontuacoes: document.querySelector("#pontuacoes"),
    },
    values: {
        timerId: null,
        gameVelocity: 700,
        hitPosition: 0,
        result: 0,
        currentTime: 60,
        life: 3,
    },
    actions: {
        //timerId: setInterval(randomSquare,1000),
        countDownTimerId: setInterval(countDown, 1000),
    }
};

function countDown() {
    state.values.currentTime--;
    state.view.timeLeft.textContent = state.values.currentTime;
    if (state.values.currentTime <= 0) {
        alert("Game Over! O seu resultado foi: " + state.values.result);
        //Reiniciar o Jogo
        restartGame();
    }
}

function randomSquare() {
    state.view.squares.forEach((square) => {
        square.classList.remove("enemy");
    });

    let randomNumber = Math.floor(Math.random() * 9); // sorteia um numero aleatorio de 1-9
    let randomSquare = state.view.squares[randomNumber];
    randomSquare.classList.add("enemy")
    state.values.hitPosition = randomSquare.id;
}

function moveEnemy() {
    state.values.timerId = setInterval(randomSquare, state.values.gameVelocity);
}

function addListenerHitBox() {
    state.view.squares.forEach((square) => {
        square.addEventListener("mousedown", () => {
            if (square.id === state.values.hitPosition) {
                state.values.result++
                state.view.score.textContent = state.values.result;
                state.values.hitPosition = null;
                playSound();
            }
            else if (square.id !== state.values.hitPosition) {
                state.values.life--;
                state.view.life.textContent = state.values.life;
                state.values.hitPosition = null;
                if (state.values.life <= 0) {
                    alert("Game Over! O seu resultado foi: " + state.values.result);
                    state.view.pontuacoes.textContent = "Sua Pontuação é: " + state.values.result;
                    //Reiniciar o Jogo
                    restartGame();
                }
            }
        });
    });

}

function restartGame() {
    //Reiniciar o resultado
    state.values.result = 0;
    state.view.score.textContent = state.values.result;

    //Reniciar o contador de vidas
    state.values.life = 3;
    state.view.life.textContent = state.values.life;

    //Reiniciar o contador de tempo
    state.values.currentTime = 60;
    state.view.timeLeft.textContent = state.values.currentTime;

    clearInterval(state.actions.countDownTimerId)
    state.actions.countDownTimerId = setInterval(countDown, 1000);
}


function playSound() {
    let audio = new Audio("./src/audios/hit.m4a");
    audio.volume = 0.2;
    audio.play();
}

function inicio() {
    moveEnemy();
    addListenerHitBox();
}

inicio();