import React, { Component } from 'react'
import { Item } from './Item.types'

type ItemProps = {
    item : Item
    deleteItem : () => void
    priorityUp : () => void
    priorityDown : () => void
}
const divStyle: React.CSSProperties = {
    border: "2px solid"
}

export const ItemDisplay = ({item, deleteItem, priorityUp, priorityDown} : ItemProps) => {
    return (
        <div style={divStyle}>
          {`${item.priority} : ${item.text}`}
          <button onClick={priorityUp}>↑</button>
          <button onClick={priorityDown}>↓</button>
          <button onClick={deleteItem}>X</button>
        </div>
    )
}