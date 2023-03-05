let button = document.querySelector("button");
button.addEventListener("click", start);
function start() {
  button.style.display = "none";
  let cnv = document.getElementById("canvas");
  let ctx = cnv.getContext("2d");
  let bird = new Image();
  let bg = new Image();
  let fg = new Image();
  let pipeUp = new Image();

  let pipeBottom = new Image();
  bird.src = "img/bird.png";
  bg.src = "img/bg.png";

  fg.src = "img/fg.png";
  pipeUp.src = "img/pipeUp.png";
  console.log(pipeUp.height);
  pipeBottom.src = "img/pipeBottom.png";

  let fly = new Audio(); // Создание аудио объекта
  let score_audio = new Audio(); // Создание аудио объекта
  let gameover = new Audio();
  fly.src = "audio/fly.mp3"; // Указание нужной записи
  fly.type = "audio/mp3";
  score_audio.src = "audio/score.mp3";
  gameover.src = "audio/over.mp3";
  console.log(pipeUp.width);
  let gap = 120;
  let score = 0;
  let xPos = 10;
  let yPos = 200;
  let grap = 1.2;
  let timerId;
  let pipe = [];
  pipe[0] = {
    x: cnv.width,
    y: 0,
  };

  document.addEventListener("keydown", moveUp);
  function moveUp() {
    yPos -= 30;
    fly.play();
  }

  function draw() {
    ctx.drawImage(bg, 0, 0);
    for (let i = 0; i < pipe.length; i++) {
      ctx.drawImage(pipeUp, pipe[i].x, pipe[i].y);
      ctx.drawImage(pipeBottom, pipe[i].x, pipe[i].y + pipeUp.height + gap);

      if (pipe[i].x == 80) {
        pipe.push({
          x: cnv.width,
          y: Math.floor(Math.random() * pipeUp.height) - pipeUp.height,
        });
      }
      if (score == 10) {
        alert("Победа");
        button.style.display = "block";
        cancelAnimationFrame();
        alert("Победа");
        button.style.display = "block";
      }
      if (
        (xPos + bird.width >= pipe[i].x &&
          xPos <= pipe[i].x + pipeUp.width &&
          (yPos <= pipe[i].y + pipeUp.height ||
            yPos + bird.height >= pipe[i].y + pipeUp.height + gap)) ||
        yPos + bird.height >= cnv.height - fg.height ||
        yPos <= 0
      ) {
        setTimeout(function () {
          gameover.play();

          pipe = "";
          button.style.display = "block";
        }, 0);
      }
      pipe[i].x--;
      if (pipe[i].x == 5) {
        score++;
        score_audio.play();
      }
    }

    ctx.drawImage(fg, 0, bg.height - fg.height);
    ctx.drawImage(bird, xPos, yPos);
    yPos += grap;
    ctx.fillStyle = "#000";
    ctx.font = "24px Verdana";
    ctx.fillText("Счет: " + score, 10, cnv.height - 20);
    requestAnimationFrame(draw);
  }
  pipeBottom.onload = draw;
}
