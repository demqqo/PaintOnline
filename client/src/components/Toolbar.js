import React, {useState} from 'react'
import '../styles/toolbar.scss'
import toolState from '../store/toolState.js'
import canvasState from '../store/canvasState'
import Brush from '../tools/Brush'
import Rect from '../tools/Rect'
import Eraser from '../tools/Eraser'
import Line from '../tools/Line'
import Circle from '../tools/Circle'



const Toolbar = () => {
const [color, setColor] = useState('#000000')
const [eraserActive, setEraserActive] = useState(false)
  const changeColor = (e) => {
    setColor(e.target.value)
    toolState.setStrokeColor(color)
    toolState.setFillColor(color)
    console.log(color)
  }

  const activeEraser = (e) => {
  toolState.setTool(new Eraser(canvasState.canvas))
  setEraserActive(true)
  }

  const checkForEraser=(i)=>{
    if(i){
      toolState.setStrokeColor(color)
      setEraserActive(false)
    }
  }
  
  const download =()=>{
    const dataURL = canvasState.canvas.toDataURL();
    console.log(dataURL)
    const a = document.createElement('a')
    a.href = dataURL
    a.download = canvasState.sessionid + '.jpg'
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
  }

  return (
    <div className="toolbar">
        <button className='toolbar__btn brush' onClick={()=>{
          toolState.setTool(new Brush(canvasState.canvas, canvasState.socket, canvasState.sessionid))
          checkForEraser(eraserActive)
          }}/>
        <button className='toolbar__btn rect' onClick={()=>{
          toolState.setTool(new Rect(canvasState.canvas, canvasState.socket, canvasState.sessionid))
          checkForEraser(eraserActive)
          }}/>
        <button className='toolbar__btn circle' onClick={()=>{
          toolState.setTool(new Circle(canvasState.canvas))
          checkForEraser(eraserActive)
        }}/>
        <button className='toolbar__btn eraser' onClick={activeEraser}/>
        <button className='toolbar__btn line' onClick={()=>{
          toolState.setTool(new Line(canvasState.canvas))
          checkForEraser(eraserActive)
          }}/>
        <input onChange={changeColor} type="color" className='toolbar__btn colors' />
        
        <button className='toolbar__btn undo' onClick={()=>canvasState.undo()}/>
        <button className='toolbar__btn redo' onClick={()=>canvasState.redo()}/>
        <button className='toolbar__btn save' onClick={()=>download()}/>
        
    </div>
  )
}

export default Toolbar
