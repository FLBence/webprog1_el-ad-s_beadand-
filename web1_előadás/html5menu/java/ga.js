var x = document.getElementById("test"); 
function getLocation()  { 
if (navigator.geolocation) 
navigator.geolocation.getCurrentPosition(showPosition); 
else  
x.innerHTML = "Geolocation is not supported by this browser."; 
} 
function showPosition(position)  { 
x.innerHTML = "Magasság: " + position.coords.latitude + "<br>Szélesség: " + 
position.coords.longitude;  
} 