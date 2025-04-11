function allowDrop(esemeny) { 
    esemeny.preventDefault(); 
    } 
    function drag(esemeny) {
    esemeny.dataTransfer.setData("text", esemeny.target.id); 
    } 
    function drop(esemeny) { 
    esemeny.preventDefault(); 
    var data = esemeny.dataTransfer.getData("text"); 
    esemeny.target.appendChild(document.getElementById(data)); 
    }
    