function load_images() {
  virus_image = new Image();
  virus_image.src = "/Assets/v1.png";

  player_image = new Image();
  player_image.src = "/Assets/superhero.png";

  gem_image = new Image();
  gem_image.src = "/Assets/gemm.png";
}

function init() {
  canvas = document.getElementById("myCanvas");

  W = 700;
  H = 400;

  score = 0;
  game_over = false;

  canvas.width = W;
  canvas.height = H;

  pen = canvas.getContext("2d");

  e1 = {
    x: 150,
    y: 50,
    w: 60,
    h: 60,
    speed: 20,
  };
  e2 = {
    x: 300,
    y: 150,
    w: 60,
    h: 60,
    speed: 30,
  };
  e3 = {
    x: 450,
    y: 20,
    w: 60,
    h: 60,
    speed: 40,
  };

  enemy = [e1, e2, e3];

  player = {
    x: 20,
    y: 200,
    w: 60,
    h: 60,
    speed: 20,
    moving: false,
  };

  gem = {
    x: 600,
    y: 200,
    w: 60,
    h: 60,
  };
  canvas.addEventListener("mousedown", () => {
    player.moving = true;
  });
  canvas.addEventListener("mouseup", () => {
    player.moving = false;
  });
}

function draw() {
  pen.clearRect(0, 0, W, H);
  pen.fillStyle = "red";
  //   pen.fillRect(bird.x, bird.y, bird.w, bird.h);
  pen.drawImage(player_image, player.x, player.y, player.w, player.h);
  pen.drawImage(gem_image, gem.x, gem.y, gem.w, gem.h);
  for (let i = 0; i < enemy.length; i++) {
    pen.drawImage(virus_image, enemy[i].x, enemy[i].y, enemy[i].w, enemy[i].h);
  }

  pen.fillStyle = "white";
  pen.fillText("Score " + score, 10, 20);
}

function isColliding(b1, b2) {
  if (Math.abs(b1.x - b2.x) < b1.w && Math.abs(b1.y - b2.y) < b1.h) {
    return true;
  }
  return false;
}
function update() {
  if (player.moving == true) {
    player.x += player.speed;
    score += 20;
  }

  for (let i = 0; i < enemy.length; i++) {
    if (isColliding(player, enemy[i])) {
      score -= 20*(i+1);
      if (score < 0) {
        game_over = true;
        alert("Game Over");
      }
    }
  }

  if (isColliding(player, gem)) {
    game_over = true;
    alert("Your score " + score);
  }
  for (let i = 0; i < enemy.length; i++) {
    enemy[i].y += enemy[i].speed;
    if (enemy[i].y + enemy[i].h > H || enemy[i].y < 0) {
      enemy[i].speed *= -1;
    }
  }
}

function gameLoop() {
  if (game_over == true) {
    clearInterval(f);
  }
  draw();
  update();
}

load_images();
init();

let f = setInterval(gameLoop, 100);
