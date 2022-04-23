import { useDispatch, useSelector } from "react-redux";
import ActionButton from "./components/ActionButton";
import List from "./components/List";
import { setList, sort } from "./redux/features/listSlice";
import { DragDropContext } from 'react-beautiful-dnd';
import Sidebar from "./components/Sidebar";
import { Droppable } from "react-beautiful-dnd";

function App() {
  const lists = useSelector(state => state.list.lists)
  const dispatch = useDispatch();
  const localList = JSON.parse(localStorage.getItem("localList"));

  if (localList === null) {
    localStorage.setItem("localList", JSON.stringify(lists));
  }

  if (localList !== null && JSON.stringify(localList) !== JSON.stringify(lists)) {
    dispatch(setList(localList))
  }

  const onDragEnd = (result) => {
    if (!result.destination) {
      return;
    }
    dispatch(sort(
      result.source.droppableId,
      result.destination.droppableId,
      result.source.index,
      result.destination.index,
      result.draggableId,
      result.type
    ))
  }
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="flex flex-no-wrap dark ">
        <div className="fixed left-0 top-0 h-full">
          <Sidebar />
        </div>
        {/* Remove class [ h-64 ] when adding a card block */}
        <div className="container mx-auto py-10 md:w-4/5 w-11/12 md:pr-10">
          {/* Remove class [ border-dashed border-2 border-gray-300 ] to remove dotted border */}
          <Droppable droppableId="all-lists" direction="horizontal" type="list">
            {provided => (
              <div
                {...provided.droppableProps} ref={provided.innerRef}
                className="flex w-full justify-evenly flex-wrap rounded border-dashed border-2 border-gray-300 md:ml-36">
                {
                  lists.map((list, index) => (
                    <List title={list.title} tasks={list.tasks} listId={list.id} key={`${list.id}`} index={index} />
                  ))
                }
                {provided.placeholder}
                <div>
                  <ActionButton lists={lists} />
                </div>
              </div>
            )}

          </Droppable>

        </div>
      </div>
    </DragDropContext>

  );
}

export default App;
