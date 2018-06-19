$(document).ready (function(){
    
    var xhttp = new XMLHttpRequest();    
    xhttp.open("GET", "http://apichallenge.canpango.com/categories", false);    
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send();
    var response = JSON.parse(xhttp.responseText);    
    listCats(response, "catList");
    
});

const listCats = (objs, id) => {
    var parentDiv = document.getElementById(id);
    objs.forEach(item => {
        var opt = document.createElement("option");
        opt.innerHTML = item.name;
        opt.value = item.url;
        
        parentDiv.appendChild(opt);
    });
    
}

const listBeersByCat = (table, selId, tableId) => {
    var tableDiv = document.getElementById(table);
    var val = document.getElementById(selId).value;
    var tableBod =document.getElementById(tableId);
    while (tableBod.hasChildNodes()) {
        tableBod.removeChild(tableBod.firstChild);
    }
    var beers = callByType(val);
    if(beers.length != 0){
        beers.forEach(beer => {
          
            tableDiv.style.display = "block";       
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
        tableDiv.style.display = "none";
    }
}



const callByType = (cat) => {
    
    var xhttp = new XMLHttpRequest();    
    xhttp.open("GET", "http://apichallenge.canpango.com/beers/", false);    
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send();
    var response = JSON.parse(xhttp.responseText);
    var filtered = response.filter(item => item.category == cat);
    return filtered;
}
const viewBeer = (id) => {
        var renderFrame = document.getElementById("viewBeerFrame");
        var hide = document.getElementById("tableOfBeers");
        var dropdown = document.getElementById("categories");
        var xhttp = new XMLHttpRequest();    
        xhttp.open("GET", `${id}`, false);    
        xhttp.setRequestHeader("Content-type", "application/json");
        xhttp.send();
        var response = JSON.parse(xhttp.responseText);
        for (var prop in response){
            bindToDiv(prop, response[prop]);
        }
        dropdown.style.display = "none";
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
    var dropdwn = document.getElementById("categories");
    if(dropdwn.style.display != "block"){
        dropdwn.style.display = "block";
    }
    renderFrame.style.display = "none";
    hide.style.display = "block";
    
}

