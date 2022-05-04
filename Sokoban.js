for (let x=1;x<=tileMap01.width;x++){
    for (let y=1;y<=tileMap01.height;y++){
        const gridSquare = document.createElement("div");
        const img = document.createElement("img");
        const switchExpr = tileMap01.mapGrid[y-1][x-1][0];
        gridSquare.classList.add ("gameSquare");
        gridSquare.classList.add (`X:${x},Y:${y}`);
        gridSquare.style.gridColumnStart = x;
        gridSquare.style.gridRowStart = y;
        gridSquare.style.backgroundImage = 'url("./img/dirt.png")';
        gridSquare.appendChild(img);
        switch (switchExpr){
            case "W":
                img.src="./img/rock wall tileset.png"
                gridSquare.classList.add(Tiles.Wall);
                img.width = 50;
                img.height = 50;
                break
            case "B":
                gridSquare.classList.add(Entities.Block);
                img.src="./img/Rusty Crate.png";
                img.width = 50;
                img.height = 50;
                break;
            case "P":
                gridSquare.classList.add(Entities.Character);
                img.src="./img/player-down.png";
                img.width = 50;
                img.height = 50;
                document.addEventListener("keydown",handleKeys);
                break;

            case "G":
                gridSquare.classList.add(Tiles.Goal);
                gridSquare.style.backgroundColor = "green";
                gridSquare.style.backgroundImage = "";
                img.src="./img/dirt.png";
                img.style.opacity = 0.7;
                img.width = 50;
                img.height = 50;
                break;

            default:
                img.src="./img/dirt.png";
                gridSquare.classList.add(Tiles.Space);
                img.width = 50;
                img.height = 50;
        }
        
        document.body.appendChild(gridSquare);
    }
}

const winBox = document.createElement("div");
const winBoxText = document.createElement("p");
winBox.style.position = "absolute";
winBox.style.display = "block";
winBox.style.width = "900px";
winBox.style.height = "775px";
winBox.style.marginLeft = "25px";
winBox.style.marginTop = "25px";
winBox.style.backgroundColor = "white";
winBox.style.opacity = 0.9;
winBox.style.border ="2px solid black";
winBoxText.textContent = "You WIN!";
winBoxText.style.textAlign = "center";
winBoxText.style.padding = "35% 0";
winBoxText.style.fontSize = "100px";
winBoxText.style.margin = 0;
winBox.style.visibility = "hidden";

document.body.appendChild(winBox);
winBox.appendChild(winBoxText);
console.log("TEST");

function handleKeys(event){
    event.preventDefault();
                    switch(event.key){
                        case "ArrowUp":
                            movePlayerUp();
                            break;
                        case "ArrowDown":
                            movePlayerDown();
                            break;
                        case "ArrowLeft":
                            movePlayerLeft();
                            break;
                        case "ArrowRight":
                            movePlayerRight();
                            break;
                    }
}

function movePlayerUp(){
    var currentTile=document.getElementsByClassName(Entities.Character)[0];
    var y = currentTile.classList[1].split("Y:")[1];
    var x = currentTile.classList[1].split("X:")[1].split(",")[0];
    y--;
    var nextTile = document.getElementsByClassName(`X:${x},Y:${y}`)[0];
    if(nextTile.classList.contains(Entities.Block)){
        if(!moveCrate(nextTile,document.getElementsByClassName(`X:${x},Y:${y-1}`)[0])){
            return;
        }
    }
    if(nextTile.classList.contains(Tiles.Wall)){
        return;
    }
    nextTile.classList.add(Entities.Character);
    nextTile.getElementsByTagName("img")[0].src = "./img/player-up.png";
    currentTile.classList.remove(Entities.Character);
    currentTile.getElementsByTagName("img")[0].src = "./img/dirt.png";
    

}

function movePlayerDown(x,y){
    var currentTile=document.getElementsByClassName(Entities.Character)[0];
    var y = currentTile.classList[1].split("Y:")[1];
    var x = currentTile.classList[1].split("X:")[1].split(",")[0];
    y++;
    var nextTile = document.getElementsByClassName(`X:${x},Y:${y}`)[0];
    if(nextTile.classList.contains(Entities.Block)){
        if(!moveCrate(nextTile,document.getElementsByClassName(`X:${x},Y:${y+1}`)[0])){
            return;
        }
    }
    if(nextTile.classList.contains(Tiles.Wall)){
        return;
    }
    nextTile.classList.add(Entities.Character);
    nextTile.getElementsByTagName("img")[0].src = "./img/player-down.png";
    currentTile.classList.remove(Entities.Character);
    currentTile.getElementsByTagName("img")[0].src = "./img/dirt.png";
}

function movePlayerLeft(x,y){
    var currentTile=document.getElementsByClassName(Entities.Character)[0];
    var y = currentTile.classList[1].split("Y:")[1];
    var x = currentTile.classList[1].split("X:")[1].split(",")[0];
    x--;
    var nextTile = document.getElementsByClassName(`X:${x},Y:${y}`)[0];
    if(nextTile.classList.contains(Entities.Block)){
        if(!moveCrate(nextTile,document.getElementsByClassName(`X:${x-1},Y:${y}`)[0])){
            return;
        }
    }
    if(nextTile.classList.contains(Tiles.Wall)){
        return;
    }
    nextTile.classList.add(Entities.Character);
    nextTile.getElementsByTagName("img")[0].src = "./img/player-left.png";
    currentTile.classList.remove(Entities.Character);
    currentTile.getElementsByTagName("img")[0].src = "./img/dirt.png";
}

function movePlayerRight(x,y){
    var currentTile=document.getElementsByClassName(Entities.Character)[0];
    var y = currentTile.classList[1].split("Y:")[1];
    var x = currentTile.classList[1].split("X:")[1].split(",")[0];
    x++;
    var nextTile = document.getElementsByClassName(`X:${x},Y:${y}`)[0];
    if(nextTile.classList.contains(Entities.Block)){
        if(!moveCrate(nextTile,document.getElementsByClassName(`X:${x+1},Y:${y}`)[0])){
            return;
        }
    }
    if(nextTile.classList.contains(Tiles.Wall)){
        return;
    }
    nextTile.classList.add(Entities.Character);
    nextTile.getElementsByTagName("img")[0].src = "./img/player-right.png";
    currentTile.classList.remove(Entities.Character);
    currentTile.getElementsByTagName("img")[0].src = "./img/dirt.png";

}




function moveCrate(crate,beyondCrate){
    if(beyondCrate.classList.contains(Tiles.Space)||(beyondCrate.classList.contains(Tiles.Goal)&&!beyondCrate.classList.contains(Entities.Block))){
        crate.classList.remove(Entities.Block);
        crate.classList.add(Tiles.Space);
        beyondCrate.classList.add(Entities.Block);
        beyondCrate.classList.remove(Tiles.Space);
        beyondCrate.getElementsByTagName("img")[0].src = "./img/Rusty Crate.png";
        let goals = document.getElementsByClassName(Tiles.Goal);
        let win=true;
        for( let i=0;i<goals.length;i++){
            if (!goals[i].classList.contains(Entities.Block)){
                win=false;
            }
            
        }
        if(win){
            document.removeEventListener("keydown",handleKeys);
            winBox.style.visibility = "visible";
            
        }
        
        return true;
    }else{
        return false;
    }

}




