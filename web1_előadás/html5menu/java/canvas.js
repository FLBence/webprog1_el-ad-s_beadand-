const vaszon = document.getElementById('vaszon');
    const ctx = vaszon.getContext('2d');

    let x = 50;
    let y = 150;
    let radius = 30;
    let dx = 2;

    function rajzol() {
      ctx.clearRect(0, 0, vaszon.width, vaszon.height);

      ctx.beginPath();
      ctx.arc(x, y, radius, 0, Math.PI * 2);
      ctx.fillStyle = 'tomato';
      ctx.fill();
      ctx.closePath();

      x += dx;

      if (x + radius > vaszon.width || x - radius < 0) {
        dx = -dx;
      }

      requestAnimationFrame(rajzol);
    }

    rajzol();