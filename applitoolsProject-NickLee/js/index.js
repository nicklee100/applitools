import data from './data.js'
class ColorBoard {
    constructor(data) {
        this.colors = this.initialSetup(data);
        this.colorsCount = [];
        this.primaryColors = [];
        this.calculateColorCounts();
        this.setPrimaryColors();
        this.gridSetUpTable()
        this.gridAddOnClick();
        this.updatePrimaryColorUI();
    }

    initialSetup(data){  // imput data is multidimensional array, which then sets array with objects + status
        let state = [];  
        for (let i = 0; i < data.length; i++){
            state[i] = [];
            for ( let j = 0; j<data[i].length; j++ ){
                state[i].push({color:data[i][j],active:true})
            }
        }
        return state;
    }

    gridSetUpTable(){
        const table = document.getElementById("table");
    
        for(let i = 0; i<this.colors.length; i++){
            // create index column
            let tr = document.createElement("tr");//creat tr for each row

            let tdIndex= document.createElement("td");
            tdIndex.append(i);
            tr.appendChild(tdIndex);
            table.append(tr);
            let tdColors= document.createElement("td");
            tdColors.setAttribute("class","colorsRow")

            for(let j = 0; j<this.colors[i].length;j++){
                //create colorBlocks w/ class
                let square = document.createElement("div");
                square.setAttribute("id", "div"+i+""+j);
                // square.setAttribute("data-row",i);
                // square.setAttribute("data-col",j);
                square.setAttribute("data-color",this.colors[i][j].color);
                square.setAttribute("class",this.colors[i][j].color)
                square.classList.add("color");
                tdColors.appendChild(square);
            }
            tr.append(tdColors)
            // create priamry color column 
            let parentPrimaryDiv= document.createElement("td");
            let childPrimaryDiv = document.createElement("div");
            childPrimaryDiv.setAttribute("id", "primary"+i);
            childPrimaryDiv.setAttribute("class", "primary");
            parentPrimaryDiv.appendChild(childPrimaryDiv);
            tr.appendChild(parentPrimaryDiv);
            table.append(tr)
        }
    }

    gridAddOnClick(){
        for(let i = 0; i<this.colors.length;i++){
            for(let j = 0; j<this.colors[i].length;j++){
                const square = document.getElementById("div"+i+""+j);
                square.addEventListener("click", (e) => {  // click function is toggeling ui, then updating board state
                    console.log('HI')
                    const color = e.target.dataset.color;
                    this.toggleSquare(color);
                    this.calculateColorCounts();
                    this.setPrimaryColors();
                    this.updatePrimaryColorUI();
                });  
            }
        }
    }

    toggleSquare(color){ // update color state and css class
        for(let i = 0; i<this.colors.length;i++){
            for(let j = 0; j<this.colors[i].length;j++){
                let colorObject = this.colors[i][j];
                if(colorObject.color === color){
                    if(colorObject.active){ 
                        let div = document.getElementById("div"+i+""+j)
                        colorObject.active = false;
                        div.classList.add("hidden");
                    } else {
                        let div = document.getElementById("div"+i+""+j)

                        colorObject.active = true;
                        div.classList.remove("hidden");
                    }
                }
            }
        }        
    }
    
    calculateColorCounts(){   //counts colors initialy
        this.colorsCount = [];
        for(let i = 0; i<this.colors.length; i++){ // loops through each array of color squares
            this.colorsCount.push({});              
            let wordArray = this.colors[i];        // grabs set of color,array of objects 
            wordArray.forEach((colorObj)=>{           // loops over the array, word is {color:"green", active: true}
                if(!this.colorsCount[i][colorObj.color]){ //if not in colorsCount, continue
                    if(colorObj.active){
                        this.colorsCount[i][colorObj.color] = 0;
                    }
                }
                if(colorObj.active){
                    this.colorsCount[i][colorObj.color] = this.colorsCount[i][colorObj.color] + 1;
                }
            })
        }
    }
    
    setPrimaryColors(){ // looks at color count and sets primary in array 
        for ( let i = 0; i<this.colorsCount.length; i++){
            this.primaryColors[i]="";
            let highest = 0;
            for(const c in this.colorsCount[i]){
                if(this.colorsCount[i][c]>highest){
                    highest = this.colorsCount[i][c];
                    this.primaryColors[i]= c;
                }
            }
        }
    }

    updatePrimaryColorUI(){
        for ( let i = 0; i<this.primaryColors.length; i++){
            document.getElementById("primary"+i).setAttribute("class","primary "+this.primaryColors[i])
        }
    }
} 

const game = new ColorBoard(data)
