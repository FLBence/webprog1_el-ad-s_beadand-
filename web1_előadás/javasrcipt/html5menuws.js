if( sessionStorage.hits ) 
    sessionStorage.hits = Number(sessionStorage.hits) +1; 
    else 
    sessionStorage.hits = 1; 
    document.writeln("Frissítések száma:" + sessionStorage.hits );

 if( localStorage.hits ) 
    localStorage.hits = Number(localStorage.hits) +1; 
    else 
    localStorage.hits = 1; 
    document.write("Összes eddigi frissítés száma:" + localStorage.hits );