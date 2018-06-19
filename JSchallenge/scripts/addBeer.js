$(document).ready (function(){
    
    var xhttp = new XMLHttpRequest();    
    xhttp.open("GET", "http://apichallenge.canpango.com/categories", false);    
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send();
    var response = JSON.parse(xhttp.responseText);    
    listCats(response, "chooseCat");
    
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

////////////

const pleaseWork = () => {
    var form = document.getElementById("beerForm");
    var obj = { name: form[0].value, ibu: form[2].value, calories: form[3].value, abv: form[4].value, style: form[5].value, brewery_location: form[1].value, category: form[6].value };
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "http://apichallenge.canpango.com/beers/", true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify(obj));
    xhr.onload = function() {
      window.location = "success.html";
    };
}


