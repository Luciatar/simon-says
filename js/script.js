
let lvl = 3, score = 0, gameSequence = [], playerSequence = [], isPlayerTurn = false;
window.addEventListener('load', function () {
    const scoreEle = document.querySelector('.score__info')
    const btnStart = document.querySelector('.start-game');
    const panels = document.querySelectorAll('[class^="color-panel-"]')
    for (let i = 0; i < panels.length; i++) {
        panels[i].addEventListener('click', function () {
            interactionHandler(i);
        }, false);
    }
    btnStart.addEventListener('click', function () {
        if (isPlayerTurn) { return }
        scoreEle.textContent = "000";
        play();
    }, false);
    function interactionHandler(btnNum) {
        if (isPlayerTurn && playerSequence.length < gameSequence.length) {
            playerSequence.push(btnNum);
            lightPanel(btnNum);
        }
        checkWinCond();
    }
    function generateSequence(dificulty) {
        let sequence = [];
        for (let i = 0; i < dificulty; i++) {
            sequence.push(Math.floor(Math.random() * 4));
        }
        return sequence;
    }
    function checkWinCond() {
        if (playerSequence.length !== gameSequence.length) {
            return;
        }
        for (let i = 0; i < gameSequence.length; i++) {
            if (playerSequence[i] !== gameSequence[i]) {
                btnStart.children[0].textContent = "You loose!"
                setTimeout(() => {
                    isPlayerTurn = false;
                    gameSequence = [];
                    playerSequence = [];
                    score = 0;
                    btnStart.children[0].textContent = "Start Game";
                }, 1000);
                return;
            }
            if (playerSequence[i] == gameSequence[i] && i == gameSequence.length - 1) {
                btnStart.children[0].textContent = "You win!"
                score++;
                scoreEle.textContent = ('00' + score * 10).slice(-3)
                setTimeout(() => {
                    isPlayerTurn = false;
                    gameSequence = [];
                    playerSequence = [];
                    btnStart.children[0].textContent = "Ready?";
                    setTimeout(() => {
                        play();
                    }, 500);
                }, 1000);
                return;
            }
        }
    }
    function playSequence(sequence) {
        for (let i = 0; i < sequence.length; i++) {
            setTimeout(() => {
                lightPanel(sequence[i]);
            }, 1000 * i);
        }
    }
    function lightPanel(btnNum) {
        panels[btnNum].classList.add("active");
        setTimeout(() => {
            panels[btnNum].classList.remove("active");
        }, 500);
    }
    function play() {
        btnStart.children[0].textContent = "Watch!";
        gameSequence = [...generateSequence(lvl + score)];
        playSequence(gameSequence);
        setTimeout(() => {
            btnStart.children[0].textContent = "Your turn";
            isPlayerTurn = true;
        }, lvl * 1000);
    }
}, false);


