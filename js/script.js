
let lvl = 3;
let score = 0;
let gameSequence = [];
let playerSequence = [];
let isPlayerTurn = false;

window.addEventListener('load', function () {
    const scoreEle = document.querySelector('.score__info')
    const btnStart = document.querySelector('.start-game');
    const btnGreen = document.querySelector('.color-panel-green');
    const btnRed = document.querySelector('.color-panel-red');
    const btnYellow = document.querySelector('.color-panel-yellow');
    const btnBlue = document.querySelector('.color-panel-blue');

    btnGreen.addEventListener('click', function () {
        if (isPlayerTurn && playerSequence.length < gameSequence.length) {
            playerSequence.push(0)
            btnGreen.classList.add("active")
            setTimeout(() => {
                btnGreen.classList.remove("active")
            }, 500);
        }
        checkWinCond();


    }, false);
    btnRed.addEventListener('click', function () {
        if (isPlayerTurn && playerSequence.length < gameSequence.length) {
            playerSequence.push(1)
            btnRed.classList.add("active")
            setTimeout(() => {
                btnRed.classList.remove("active")
            }, 500);
        }
        checkWinCond();

    }, false);
    btnYellow.addEventListener('click', function () {
        if (isPlayerTurn && playerSequence.length < gameSequence.length) {
            playerSequence.push(2)
            btnYellow.classList.add("active")
            setTimeout(() => {
                btnYellow.classList.remove("active")
            }, 500);
        }
        checkWinCond();

    }, false);

    btnBlue.addEventListener('click', function () {
        if (isPlayerTurn && playerSequence.length < gameSequence.length) {
            playerSequence.push(3)
            btnBlue.classList.add("active")
            setTimeout(() => {
                btnBlue.classList.remove("active")
            }, 500);
        }
        checkWinCond();

    }, false)
    btnStart.addEventListener('click', function () {
        if (isPlayerTurn) {
            return
        }
        scoreEle.textContent = "000"
        play()
    }, false)


    function randColor() {
        let color = Math.floor(Math.random() * 4)
        return color;
    }

    function generateSequence(dificulty) {
        let sequence = []
        for (let index = 0; index < dificulty; index++) {
            sequence.push(randColor())

        }
        return sequence;
    }
    function checkWinCond() {
        if (playerSequence.length !== gameSequence.length) {

            return
        }
        for (let i = 0; i < gameSequence.length; i++) {
            if (playerSequence[i] !== gameSequence[i]) {
                btnStart.children[0].textContent = "You loose!"
                setTimeout(() => {
                    isPlayerTurn = false
                    gameSequence = []
                    playerSequence = []
                    score = 0
                    btnStart.children[0].textContent = "Start Game"
                }, 1000);

                return
            }
            if (playerSequence[i] == gameSequence[i] && i == gameSequence.length - 1) {
                btnStart.children[0].textContent = "You win!"
                score++
                scoreEle.textContent = ('00' + score * 10).slice(-3)
                setTimeout(() => {
                    isPlayerTurn = false
                    gameSequence = []
                    playerSequence = []
                    btnStart.children[0].textContent = "Ready?"
                    setTimeout(() => {
                        play()
                    }, 500);
                }, 1000);
                return
            }

        }

    }
    function playSequence(sequence) {
        for (let i = 0; i < sequence.length; i++) {
            setTimeout(() => {
                switch (sequence[i]) {
                    case 0:
                        btnGreen.classList.add("active")
                        setTimeout(() => {
                            btnGreen.classList.remove("active")
                        }, 500);
                        break;

                    case 1:
                        btnRed.classList.add("active")
                        setTimeout(() => {
                            btnRed.classList.remove("active")
                        }, 500);
                        break;

                    case 2:
                        btnYellow.classList.add("active")
                        setTimeout(() => {
                            btnYellow.classList.remove("active")
                        }, 500);
                        break;
                    case 3:
                        btnBlue.classList.add("active")
                        setTimeout(() => {
                            btnBlue.classList.remove("active")
                        }, 500);
                        break;

                }
            }, 1000 * i);

        }

    }

    function play() {
        btnStart.children[0].textContent = "Watch!"
        gameSequence = [...generateSequence(lvl + score)]


        playSequence(gameSequence)

        setTimeout(() => {
            btnStart.children[0].textContent = "Your turn"
            isPlayerTurn = true;
        }, lvl * 1000);

    }




}, false)


