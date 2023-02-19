const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');

    // Ball variables
    let ballX = canvas.width/2;
    let ballY = canvas.height/2;
    let ballRadius = 10;
    let ballSpeedX = 5;
    let ballSpeedY = 5;

    // Paddle variables
    let paddleHeight = 75;
    let paddleWidth = 10;
    let playerY = (canvas.height - paddleHeight) / 2;
    let computerY = (canvas.height - paddleHeight) / 2;

    // Event listener for player paddle movement
    canvas.addEventListener('mousemove', function(event) {
      let rect = canvas.getBoundingClientRect();
      playerY = event.clientY - rect.top - paddleHeight/2;
    });

    // Draw ball function
    function drawBall() {
      ctx.beginPath();
      ctx.arc(ballX, ballY, ballRadius, 0, Math.PI*2);
      ctx.fillStyle = "#000";
      ctx.fill();
      ctx.closePath();
    }

    // Draw player paddle function
    function drawPlayerPaddle() {
      ctx.beginPath();
      ctx.rect(0, playerY, paddleWidth, paddleHeight);
      ctx.fillStyle = "#000";
      ctx.fill();
      ctx.closePath();
    }

    // Draw computer paddle function
    function drawComputerPaddle() {
      ctx.beginPath();
      ctx.rect(canvas.width - paddleWidth, computerY, paddleWidth, paddleHeight);
      ctx.fillStyle = "#000";
      ctx.fill();
      ctx.closePath();
    }

    // Main game loop
    function gameLoop() {
      // Move the ball
      ballX += ballSpeedX;
      ballY += ballSpeedY;

      // Bounce the ball off the walls
      if (ballY + ballRadius > canvas.height || ballY - ballRadius < 0) {
        ballSpeedY = -ballSpeedY;
      }
      if (ballX + ballRadius > canvas.width || ballX - ballRadius < 0) {
        ballSpeedX = -ballSpeedX;
      }

      // Bounce the ball off the player paddle
      if (ballX - ballRadius < paddleWidth && ballY > playerY && ballY < playerY + paddleHeight) {
        ballSpeedX = -ballSpeedX;
      }

      // Move the computer paddle
      computerY = ballY - paddleHeight/2;

       // Clear the canvas
       ctx.clearRect(0, 0, canvas.width, canvas.height);

       // Draw the ball and paddles
       drawBall();
       drawPlayerPaddle();
       drawComputerPaddle();
 
       // Request a new frame
       requestAnimationFrame(gameLoop);
     }
 
     // Start the game loop
     gameLoop();