import { useDispatch, useSelector } from "react-redux";
import ActionButton from "./components/ActionButton";
import List from "./components/List";
import { setList, sort } from "./redux/features/listSlice";
import { DragDropContext } from 'react-beautiful-dnd';

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
      result.draggableId
    ))
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="flex flex-wrap">
        {
          lists.map(list => (
            <List title={list.title} tasks={list.tasks} listId={list.id} key={`${list.id}`} />
          ))
        }

        <div>
          <ActionButton lists={lists} />
        </div>
      </div>
    </DragDropContext>

  );
}

export default App;
