import { Icon } from "./Icon.types"
import { ToDoList } from "./ToDoList"
import { Canvas } from "./Canvas"
import { Timer } from "./Timer"

type DisplayProps = {
    selectedIcon : Icon | null
}

export const Display = ({selectedIcon} : DisplayProps) => {
    
    if(selectedIcon == Icon.ToDoList){
        return <div><ToDoList/></div>
    }
    else if(selectedIcon == Icon.Timer) {
        return <div><Timer/></div>
    }
    else if(selectedIcon == Icon.Canvas) {
        return <div><Canvas/></div>
    }
    else{
        return <div></div>
    }
    
}