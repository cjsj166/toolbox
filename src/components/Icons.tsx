import React, { useState, useEffect } from 'react'
import { Icon } from './Icon.types'

type IconsProps = {
    icon: Icon | null
    setIcon : React.Dispatch<React.SetStateAction<Icon | null>>
}

export const Icons = ({icon, setIcon} : IconsProps) => {

    const defaultStyle : React.CSSProperties = {
        backgroundColor: 'white',
        color: 'black',
        border: '2px solid gray',
        fontSize: '24px',
        padding: '20px 60px'
    }

    const [toDoListStyle, setToDoListStyle] = useState(defaultStyle)
    const [timerStyle, setTimerStyle ] = useState(defaultStyle)
    const [canvasStyle, setCanvasStyle] = useState(defaultStyle)

    useEffect(() => {
        setToDoListStyle(defaultStyle)
        setTimerStyle(defaultStyle)
        setCanvasStyle(defaultStyle)

        if(icon === Icon.ToDoList){
            setToDoListStyle({...defaultStyle, border:'4px solid green'})
        }
        else if(icon === Icon.Timer){
            setTimerStyle({...defaultStyle, border:'4px solid green'})
        }
        else if(icon === Icon.Canvas){
            setCanvasStyle({...defaultStyle, border:'4px solid green'})
        }

    },[icon])

    const ToDoListClick = () => {
        setIcon(Icon.ToDoList)
    }

    const TimerClick = () => {
        setIcon(Icon.Timer)
    }

    const CanvasClick = () => {
        setIcon(Icon.Canvas)
    }

    return (
        <div>
        <button style={toDoListStyle} onClick={ToDoListClick}>ToDoList</button>
        <button style={timerStyle} onClick={TimerClick}>Timer</button>
        <button style={canvasStyle} onClick={CanvasClick}>Canvas</button>
        </div>
    )

}