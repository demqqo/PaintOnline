import { makeAutoObservable } from "mobx";


class CanvasState{
    canvas= null
    socket = null
    sessionid = null
    undoList =[]
    redoList=[]
    username=''
    constructor(){
        makeAutoObservable(this)
    }
    setUsername(name){
        this.username = name
    }
    setSessionId(id) {
        this.sessionid = id
    }
    setSocket(socket) {
        this.socket = socket
    }
    setCanvas(canvas){
        this.canvas = canvas
    }

    pushToUndo(data){
        this.undoList.push(data)
    }

    pushToRedo(data){
        this.redoList.push(data)
    }

    undo(){
        let ctx= this.canvas.getContext('2d')
        if(this.undoList.length > 0){
            
            let dataURL = this.undoList.pop()
            this.redoList.push(this.canvas.toDataURL())
            let img = new Image()
            img.src = dataURL
            img.onload=()=>{
                ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
                ctx.drawImage(img, 0, 0, this.canvas.width, this.canvas.height)
            }
        }else{
            ctx.clearRect(0,0,this.canvas.width, this.canvas.height)
        }
    }

    redo(){
        let ctx= this.canvas.getContext('2d')
        if(this.redoList.length > 0){
            let dataURL = this.redoList.pop()
            this.undoList.push(this.canvas.toDataURL())
            let img = new Image()
            img.src = dataURL
            img.onload=()=>{
                ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
                ctx.drawImage(img, 0, 0, this.canvas.width, this.canvas.height)
            }
        }else{

        }
    }
}

export default new CanvasState();