

const toggleNav = (id) => {    
    
    switch(id){
        case 'buttonGroupIcons':
           document.getElementById("beerNav").style.width = "300px";
           document.getElementById("landing").style.marginLeft = "300px";
           document.getElementById("iFrameArea").style.marginLeft = "300px";
           document.getElementById("buttonGroupIcons").style.display = "none";
           document.getElementById("buttonGroupTextWithIcons").style.display = "block"; 
           break;
        case 'buttonGroupTextWithIcons':    
           document.getElementById("beerNav").style.width = "75px";
           document.getElementById("landing").style.marginLeft = "75px";
           document.getElementById("iFrameArea").style.marginLeft = "75px";
           document.getElementById("buttonGroupTextWithIcons").style.display = "none";
           document.getElementById("buttonGroupIcons").style.display = "block"; 
           break;
        default:
           break;
    }
    
}
function submitForm() {
    
}


const iframeToggle = (active, frameId) => {
    
    var iframediv = document.getElementById("iFrameArea");
    var landingdiv = document.getElementById("landing");
    var iframe = document.getElementById(frameId);
    
    if(landingdiv.style.display != "none"){
        landingdiv.style.display = "none";
    }    
    if(iframediv.style.display != "block"){
        iframediv.style.display = "block";
    }
    switch(active){
        case "searchByCat":
            iframe.src = "searchByCat.html";
            break;   
        case "searchByName":
            iframe.src = "searchByName.html";
            break;
        case "addBeer":
            iframe.src = "addBeer.html";
            break;
        default:
            break;
    }   
    
}