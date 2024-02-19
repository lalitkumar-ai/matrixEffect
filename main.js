const canvas = document.getElementById("canvas1");

const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

class Symbol {
    constructor(x, y, fontSize, canvasHeight) {
        this.characters = "アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズブヅプエェケセテネヘメレヱゲゼデベペオォコソトノホモヨョロヲゴゾドボポヴッン0123456789ABCDEFGHIJKLMNOPQRSTUVWXY";
        this.x = x;
        this.y = y;
        this.fontSize = fontSize;
        this.text = '';
        this.canvasHeight = canvasHeight;
    }
    draw(context) {
        this.text = this.characters.charAt(Math.floor(Math.random() * this.characters.length))
        
       
        context.fillText(this.text, this.x * this.fontSize, this.y * this.fontSize);
        if (this.y * this.fontSize > this.canvasHeight && Math.random() > 0.78) {
            this.y = 0;
        }
        else {
            this.y += 1;
        }


    }
}

class Effect {
    constructor(canvasWidth, canvasHeight) {
        this.canvasHeight = canvasHeight;
        this.canvasWidth = canvasWidth;
        this.fontSize = 25;
        this.columns = this.canvasWidth / this.fontSize;
        this.symbols = [];
        this.#initialize();

    }
    // # is used for private function declarations
    #initialize() {
        for (let i = 0; i < this.columns; i++) {
            this.symbols[i] = new Symbol(i, 0, this.fontSize, this.canvasHeight);
        }
    }

    resize(width,height){
        this.canvasWidth = width;
        this.canvasHeight = height;
        this.columns = this.canvasWidth/this.fontSize;
        this.symbols = [];
        this.#initialize();
        
    }
}
const effect = new Effect(canvas.width, canvas.height);
let lastTime = 0;
// You can change the frames 
const fps = 15;
const nextFrame = 1000 / fps;
let timer = 0;

function generateDifferentColors(numColors) {
    const colors = [];
    const saturation = 80; // Constant saturation value
    const lightness = 50; // Constant lightness value

    for (let i = 0; i < numColors; i++) {
        const hue = (360 / numColors) * i; // Vary the hue evenly
        const color = `hsl(${hue}, ${saturation}%, ${lightness}%)`;
        colors.push(color);
    }

    return colors;
}
const colors = generateDifferentColors(40);
function animate(timeStamp) {
    const deltaTime = timeStamp - lastTime;
    lastTime = timeStamp;
    if (timer > nextFrame) {
        ctx.fillStyle = "rgba(0,0,0,0.05)";
        ctx.textAlign = "center";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = "#0afffa";
        ctx.font = effect.fontSize + 'px monospace';
        effect.symbols.forEach(Symbol => Symbol.draw(ctx));
        timer = 0;
    }
    else{
        timer +=deltaTime;
    }
    requestAnimationFrame(animate);


}
animate(0);


window.addEventListener("resize",function(){
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;x
})