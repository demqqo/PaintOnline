import Tool from './Tool'

export default class Circle extends Tool{
    constructor(canvas){
        super(canvas)
        this.listen()
    }
    listen(){
        this.canvas.onmousemove=this.mouseMoveHandler.bind(this)
        this.canvas.onmouseup=this.mouseUpHandler.bind(this)
        this.canvas.onmousedown=this.mouseDownHandler.bind(this)
    }

    mouseUpHandler(e){
        this.mouseDown = false
    }
    mouseDownHandler(e){
        this.mouseDown = true
        this.ctx.beginPath()
        this.startX = e.offsetX;
        this.startY = e.offsetY;
        this.saved = this.canvas.toDataURL()
    }
    mouseMoveHandler(e){
        if(this.mouseDown){
            let currentX = e.offsetX;
            let currentY = e.offsetY;
            let width = currentX-this.startX;
            let height = currentY-this.startY;

            this.draw(this.startX, this.startY, width, height)
        }
    }
    draw(x, y, w ,h){
        this.ctx.beginPath()
// this.ctx.ellipse(x,y,w,h, 6, 0, 6);
// this.ctx.fill();
// this.ctx.stroke();
        const img = new Image()
        img.src = this.saved
        img.onload = async () =>{
            this.ctx.clearRect(0,0, this.canvas.width, this.canvas.height)
            this.ctx.drawImage(img, 0, 0, this.canvas.width, this.canvas.height)
            this.ctx.beginPath()
            this.ctx.ellipse(x, y, Math.abs(w / 2), Math.abs(h / 2), 0, 0, 2 * Math.PI);
            this.ctx.fill();
            this.ctx.stroke();
        }
      
    }
}