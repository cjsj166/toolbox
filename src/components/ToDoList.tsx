import { useState, useReducer } from "react";
import { ItemDisplay } from "./ItemDisplay";
import { Item } from "./Item.types";

// Action types for dispatching state
type PriorityActionType = {
  type: "deleteItem" | "priorityUp" | "priorityDown";
  priority: number;
};
type TextActionType = {
  type: "textEdit";
  priority: number;
};
type CreateActionType = {
  type: "itemCreate";
  text: string;
};
type ItemsActionType = PriorityActionType | TextActionType | CreateActionType;

// implemented outside of the function as it needs to be implemented
// before using it inside the function component
function itemsReducer(items: Item[], action: ItemsActionType) {
  let newItem: Item;
  let swappedItem: Item;
  let currentItem: Item;
  let copyItems: Item[];
  copyItems = items.map((x) => x);
  switch (action.type) {
    case "deleteItem":
      // remove 1 item whose index is action.priority - 1
      copyItems.splice(action.priority - 1, 1);
      // subtract 1 to all items' priority whose priority is bigger than action.priority
      copyItems = copyItems.map((item) => {
        if (item.priority > action.priority) {
          return { ...item, priority: item.priority - 1 };
        } else {
          return item;
        }
      });
      return copyItems;
    case "priorityUp":
      // 1 is subtracted to currentItem's property
      if (action.priority - 1 - 1 >= 0) {
        currentItem = copyItems[action.priority - 1];
        swappedItem = copyItems[action.priority - 1 - 1];
        //setting priority according to the order of array
        copyItems[action.priority - 1 - 1] = {
          ...currentItem,
          priority: currentItem.priority - 1,
        };
        copyItems[action.priority - 1] = {
          ...swappedItem,
          priority: swappedItem.priority + 1,
        };
        //swap the item with another item with upper priority
      }
      return copyItems;
    case "priorityDown":
      // 1 is added to currentItem's property
      if (action.priority - 1 + 1 < items.length) {
        currentItem = copyItems[action.priority - 1];
        swappedItem = copyItems[action.priority - 1 + 1];
        //setting priority according to the order of array
        copyItems[action.priority - 1 + 1] = {
          ...currentItem,
          priority: currentItem.priority + 1,
        };
        copyItems[action.priority - 1] = {
          ...swappedItem,
          priority: swappedItem.priority - 1,
        };
        //swap the item with another item with upper priority
      }
      return copyItems;
    case "textEdit":
      return items;
    case "itemCreate":
      newItem = { priority: 1, text: action.text };
      // Making a room for newItem. add 1 to all items priority
      if (copyItems !== []) {
        copyItems = copyItems.map((item) => {
          return { ...item, priority: item.priority + 1 };
        });
      }
      // Adding newItem at the head
      console.log("itemsReducer : itemCreate ", copyItems);
      copyItems = [newItem, ...copyItems];
      console.log("itemsReducer : itemCreate ", copyItems);
      return copyItems;
  }
}

export const ToDoList = () => {
  const [inputText, setInputText] = useState("");
  const [items, dispatchItems] = useReducer(itemsReducer, []);

  // property for making input form avaliable
  const textChange = (event: React.FormEvent<HTMLInputElement>) => {
    setInputText(event.currentTarget.value);
  };

  // Executed when submit button is clicked
  const submitClick = () => {
    dispatchItems({ type: "itemCreate", text: inputText });
    //console.log('item', items)
  };

  return (
    <div>
      {/* input tag. It's responsible for passing in description text of Todo item */}
      <input type="text" value={inputText} onChange={textChange} />
      {/* submitting button. It passes in the value of input to ItemDisplay component */}
      <button onClick={submitClick}>submit</button>
      {/* Implements ToDoList. All the items covered with <li> line up by map function */}
      <ul style={{ listStyleType: "none" }}>
        {items.map((item: Item) => {
          return (
            // TODO - Adding key property
            <li>
              <ItemDisplay
                key={item.priority}
                item={item}
                deleteItem={() =>
                  dispatchItems({ type: "deleteItem", priority: item.priority })
                }
                priorityUp={() =>
                  dispatchItems({ type: "priorityUp", priority: item.priority })
                }
                priorityDown={() =>
                  dispatchItems({
                    type: "priorityDown",
                    priority: item.priority,
                  })
                }
              />
            </li>
          );
        })}
      </ul>
    </div>
  );
};
