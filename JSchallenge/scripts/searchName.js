const searchByName = (val) => {
    
    var outerDiv = document.getElementById('tableOfBeers');   
    var xhttp = new XMLHttpRequest();
    if(val != ""){
        document.getElementById('noResults').style.display = "none";
        xhttp.open("GET", `http://apichallenge.canpango.com/beers/search/?q=${val}`, false);
        xhttp.setRequestHeader("Content-type", "application/json");
        xhttp.send();
        var response = JSON.parse(xhttp.responseText);        
        displayResults("tableOfBeers", "tableBod" , response);        
    }else{
        document.getElementById("tableOfBeers").style.display = "none";
        document.getElementById("noResults").style.display = "block";        
        
    }
    
    
}

const displayResults = (wrapper, tableBody, resp) => {
    
    var outerDiv = document.getElementById(wrapper);
    var tableBod = document.getElementById(tableBody);
    while (tableBod.hasChildNodes()) {
        tableBod.removeChild(tableBod.firstChild);
    }
    if(resp.length != 0){
        outerDiv.style.display = "block";
        
        resp.forEach(beer => {
            var tr = document.createElement("tr");
            var tdName = document.createElement("td");
            tdName.innerHTML = beer.name;
            var tdStyle = document.createElement("td");
            tdStyle.innerHTML = beer.style;
            var tdABV = document.createElement("td");
            tdABV.innerHTML = beer.abv;
            var tdButton = document.createElement("td");            
            tdButton.innerHTML = `<button class = 'btn btn-primary openBtn' onclick="viewBeer('${beer.url}')" >`+"View Beer"+"</button>";    
            
            tr.appendChild(tdName);
            tr.appendChild(tdStyle);
            tr.appendChild(tdABV);
            tr.appendChild(tdButton)
            tableBod.appendChild(tr);
        });
    }else{
        if(outerDiv.style.display != "none"){
            outerdiv.style.display = "none";
        }
        document.getElementById("noResults").style.display = "block";
    }
    
}

const viewBeer = (id) => {
        var renderFrame = document.getElementById("viewBeerFrame");
        var hide = document.getElementById("tableOfBeers");
        var searchbar = document.getElementById("searchForm");
        var xhttp = new XMLHttpRequest();    
        xhttp.open("GET", `${id}`, false);    
        xhttp.setRequestHeader("Content-type", "application/json");
        xhttp.send();
        var response = JSON.parse(xhttp.responseText);
        for (var prop in response){
            bindToDiv(prop, response[prop]);
        }
        searchbar.style.display = "none";
        hide.style.display = "none";
        renderFrame.style.display = "block";    
    
    
}
const bindToDiv = (attr, val) => {
    switch(attr){
        case "name":
            var name = document.getElementById("beerName");
            name.innerHTML = `Beer Name: ${val}`;
            break;
        case "abv":
            var abv = document.getElementById("beerAbv");
            abv.innerHTML = `ABV(%): ${val}`;
            break;
        case "brewery_location":
            var loc = document.getElementById("breweryLocation");
            loc.innerHTML = `Brewery Location: ${val}`;
            break;
        case "ibu":
            var ibu = document.getElementById("beerIbu");
            ibu.innerHTML = `IBU: ${val}`;
            break;
        case "style":
            var style = document.getElementById("beerStyle");
            style.innerHTML = `Style of Beer: ${val}`;
            break;
        case "calories":
            var cal = document.getElementById("beerCalories");
            cal.innerHTML = `Calories: ${val}`;
            break;
        default:
            break;
        
    }   
    
}

const backToSearch = () => {
    var renderFrame = document.getElementById("viewBeerFrame");
    var hide = document.getElementById("tableOfBeers");
    var searchbar = document.getElementById("searchForm");
    if(searchbar.style.display != "block"){
        searchbar.style.display = "block";
    }
    renderFrame.style.display = "none";
    hide.style.display = "block";
    
}