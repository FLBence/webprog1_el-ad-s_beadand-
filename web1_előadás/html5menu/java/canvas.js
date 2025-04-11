var canvas =  document.getElementById("canvas"); 
if (canvas.getContext)
{
    var ctx = canvas.getContext('2d');
    ctx.fillRect(25, 25, 250, 100);
    ctx.clearRect(45, 45, 210, 60); 
    ctx.strokeRect(50,50,200,50); 
}
else {
    alert("A canvas nem támogatott");
}
