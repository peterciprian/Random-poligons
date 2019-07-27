
var num = 200;
var radius = 0.5;
var max = {x:1366, y: 512};
createRandomNodes(num, radius, max);

const btnReset = document.getElementById("btnReset");
btnReset.addEventListener("click", function() {
    let minHosszSlider = document.getElementById("myRange");
    let maxHosszSlider = document.getElementById("myRange2");
    let maxElek = document.getElementById("e");
    let numberoni = document.getElementById("numberr");
    let p1 = document.getElementById("myRange2P");
    let p2 = document.getElementById("myRangeP");
    let p3 = document.getElementById("eP");
    let p4 = document.getElementById("PÉ");
    minHosszSlider.oninput = function() {
        p2.innerHTML = "Minimum élhossz: "+this.value;
    }
    maxHosszSlider.oninput = function() {
        p1.innerHTML = "Maximum élhossz: "+this.value;
    }
    maxElek.oninput = function() {
        p3.innerHTML = "Egy pontban találkozó élek száma: "+this.value+" ((Természetesen néha nem müködik (: ))";
    }
    numberoni.oninput = function() {
        p4.innerHTML = "Pontok száma: "+this.value;
    }
    // numberoni.oninput = function() {
    //     num = this.value;
    //     }
    // p4.innerText = num+ "pontra megkeresi a hozzá 3 legközelebbi pontot amikkel még nincs összekötve, és amiknek nincs még 3 párjuk"
    let minHossz = minHosszSlider.value;
    let maxHossz = maxHosszSlider.value;
    createRandomNodes(numberoni.value, radius, max, minHossz, maxHossz, maxElek.value );
});

function distance( point1, point2 ){
    let xs = Math.pow(point2.x - point1.x, 2);
    let ys = Math.pow(point2.y - point1.y, 2);
    // console.log(xs)
    // console.log(ys)
    return Math.sqrt( xs + ys );
}

/* function pontokbolMelyikkelIndex(pont,arr){
    let array = []
    for(let i = 0; i< arr.length; i++)
    {
        array[i]=distance(pont,arr[i])
    }
    array=leastN(array)
    return array;
} */

/* function leastN(arr){
    let tosort = new Array(...arr);
    let resres = [];
    let res = tosort.sort((a,b) => a - b).slice(0,3);
    for (let i = 0; i < res.length; i++){
        resres.push(arr.indexOf(res[i]))
    }
    return resres;
}  */

function createRandomNodes(num, radius, max, minHossz, maxHossz, maxElek) {
    const canvas = document.getElementById("canvas");
    const context = canvas.getContext("2d");
    context.clearRect(0, 0, canvas.width, canvas.height);
    let dots = [];
    for (let i = 0; i <= num;i++){
        dots.push({
            x: Math.random() * max.x,
            y: Math.random() * max.y,
            connections: []
            
        });
    }
    for (let i = 0; i <=num; i++) {
        context.beginPath();
        context.arc(dots[i].x, dots[i].y, radius, 0, 2*Math.PI);
        context.fill();
        context.closePath();
    }


    context.beginPath();
    for (let i = 0, x = num; i < x; i++) {
        let dots2 = Hova(dots,i,minHossz, maxHossz, maxElek)
        for(let j = 0; j<dots2.length;j++)
        {
            let indexe = dots2[j];
            context.moveTo(dots[i].x,dots[i].y);
            context.lineTo(dots[indexe].x,dots[indexe].y);
            dots[i].connections.push(indexe);
            dots[indexe].connections.push(i);
        }
        
    }
    function Hova(arr, pontindex, minHossz, maxHossz, maxElek)
    {
        pont = arr[pontindex]
        //deklarálás
        let ret = [];
        let n = Math.floor(Math.random()*maxElek);

        let tempMins =[];
        for(let i = 0;i<n+1;i++)
        {
            tempMins.push({index: pontindex, distance: Number.MAX_SAFE_INTEGER});
        }
        let tempMinsMaxIndex = tempMins.length-1;

        //innen
        let vanilyen = false;
        for(let i = 0; i<arr.length;i++)
        {
            let dddd = distance(arr[i],pont);
            if(
                !arr[i].connections.includes(pontindex) &&              
                arr[i].connections.length < maxElek &&                                                //ITT KEll ÁLLÍTGATNI
                dddd < maxHossz && 
                dddd> minHossz )
            {   
                let maxOfMins = tempMins[tempMinsMaxIndex];
                let maxOfMinsDistance = maxOfMins.distance;
                let dotDist = distance(arr[i],pont);
                if(dotDist < maxOfMinsDistance)
                {
                    let obj = {index: i,distance: dotDist}
                    tempMins = beilleszt(tempMins,obj)
                }
            }
        }
        
            for(let i =0;i<tempMins.length;i++)
            {
                ret.push(tempMins[i].index);
            }
            return ret;
       
        
    }
    function beilleszt(arraybe, objektumot)//legfelsot midnig felulirja
    {
        let maxIndex = arraybe.length-1

        arraybe[maxIndex] = objektumot;

        for(let i = maxIndex-1; i>-1;i--)
        {
            if(arraybe[i+1].distance < arraybe[i].distance)
            {
                let buborek = arraybe[i+1];
                arraybe[i+1] = arraybe[i];
                arraybe[i] = buborek;
            }
        }
        return arraybe;
    }

    
        /* for (let i = 0; i <= num; i++) {
            const dot = dots[i];
            context.moveTo(dot.x,dot.y);
            let repeat = Math.floor(Math.random() * 5) + 2 
            for (let j = 0; j<= num; j++) {
                const dot2 = dots[j];
                if(dot2.x == dot.x && dot2.y == dot.y  || distance(dot, dot2) > 150 || dot2.connections > 3) {
                    continue; 
                } else {
                    context.lineTo(dot2.x,dot2.y);
                    dot2.connections++;
                    dot.connections++;
                }
                if(dot.connections >= repeat) break;
            }
        } */
    context.lineWidth = 0.5;
    context.strokeStyle = 'black';
    context.stroke(); 



    /** TODO
     * ez alapján: 
     * ctx.beginPath();
        for (var i = 0, x = stars.length; i < x; i++) {
            var starI = stars[i];
            ctx.moveTo(starI.x,starI.y); 
            if(distance(mouse, starI) < 150) ctx.lineTo(mouse.x, mouse.y);
            for (var j = 0, x = stars.length; j < x; j++) {
            var starII = stars[j];
            if(distance(starI, starII) < 150) {
                //ctx.globalAlpha = (1 / 150 * distance(starI, starII).toFixed(1));
                ctx.lineTo(starII.x,starII.y); 
            }
            }
        }
        ctx.lineWidth = 0.05;
        ctx.strokeStyle = 'white';
        ctx.stroke();
        }
     *  random 2-4 közötti számú vonal indul 1-1 pontból (de csak a pontok feléből (randomizálni: pl: pontok száma/2 alatti számokat generálva*2 indexnek))
     *  random másik pontok felé (index: random(pontok száma))
     */
}
