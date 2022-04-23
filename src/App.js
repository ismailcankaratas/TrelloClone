import { useDispatch, useSelector } from "react-redux";
import ActionButton from "./components/ActionButton";
import List from "./components/List";
import { setList } from "./redux/features/listSlice";
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


  const onDragEnd = () => {
    // TODO yeniden sıralama mantığı
  }

  return (
    <div className="flex flex-wrap">
      <DragDropContext onDragEnd={onDragEnd}>
        {
          lists.map(list => (
            <List title={list.title} tasks={list.tasks} listId={list.id} key={"list-" + list.id} />
          ))
        }
      </DragDropContext>

      <div>
        <ActionButton lists={lists} />
      </div>
    </div>
  );
}

export default App;
