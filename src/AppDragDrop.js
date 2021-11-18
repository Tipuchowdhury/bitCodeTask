import React from "react";
import "./App.css";

export default function App(props) {
  // initial state
  const [items, setItems] = React.useState({
    data: {
      items: {
        movableItem: {
          totalItem: 2,
          itemList: {
            [`item-1`]: {
              h: 10,
              w: 20,
              x: 0,
              y: 0,
            },
            [`item-2`]: {
              h: 10,
              w: 20,
              x: 70,
              y: 10,
            },
          },
        },
      },
    },
  });
  const itemList = items.data.items.movableItem.itemList;

  const refs = React.useRef(
    Array.from({ length: items.data.items.movableItem.totalItem }, () =>
      React.createRef()
    )
  );

  const dragState = React.useRef({ dragStarted: false });

  function onMouseMoveHandler(event, key) {
    if (dragState.current.dragStarted) {
      const { top, left } = event.target.getBoundingClientRect();
      const { clientX, clientY } = event;
      console.log(clientX, clientY);

      console.log(
        clientX - 16 - (clientX - left),
        clientY - 16 - (clientY - top)
      );

      setItems({
        ...items,
        data: {
          ...items.data,
          items: {
            ...items.data.items,
            movableItem: {
              ...items.data.items.movableItem,
              itemList: {
                ...items.data.items.movableItem.itemList,
                [key]: {
                  ...items.data.items.movableItem.itemList[key],
                  // x: clientX - (clientX - left),
                  // y: clientY - (clientY - top),
                  x: clientX - 16 - (itemList[key].w * 10) / 2,
                  y: clientY - 16 - (itemList[key].h * 10) / 2,
                },
              },
            },
          },
        },
      });
    }
  }

  function onMouseDownHandler() {
    dragState.current.dragStarted = true;
  }

  function onMouseUpHandler() {
    dragState.current.dragStarted = false;
  }

  return (
    <section className="board">
      {Object.keys(itemList).map((itemListKey, index) => {
        const calcStyle = {
          width: itemList[itemListKey].w * 10,
          height: itemList[itemListKey].h * 10,
          top: itemList[itemListKey].y,
          left: itemList[itemListKey].x,
        };

        return (
          <div
            onDragStart={() => false}
            onMouseDown={onMouseDownHandler}
            onMouseUp={onMouseUpHandler}
            onMouseMove={(event) => onMouseMoveHandler(event, itemListKey)}
            className="box"
            key={itemListKey}
            style={calcStyle}
            ref={refs.current[index]}
          >
            <h2>Item {index + 1}</h2>
          </div>
        );
      })}
    </section>
  );
}
