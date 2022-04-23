import React, { useState } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { BsPencil } from 'react-icons/bs';
import { useDispatch } from 'react-redux';
import TextArea from 'react-textarea-autosize';
import { setList } from '../redux/features/listSlice';

const Task = ({ text, id, index, listId }) => {
    const [formOpen, setFormOpen] = useState(false);
    const [inputChange, setInputChange] = useState(null);

    const dispatch = useDispatch();

    function handleEditTask(listId, taskId, text) {
        const localList = JSON.parse(localStorage.getItem("localList"));
        const currentList = localList.find(list => list.id == listId);
        const currentTask = currentList.tasks.find(task => task.id == taskId);
        if (!text) {
            return setFormOpen(false)
        }
        const newLocalList = localList.map(list => {
            if (list.id == listId) {
                return {
                    ...list,
                    tasks: [
                        ...list.tasks.map(task => {
                            if (task.id == taskId) {
                                return {
                                    ...task,
                                    text: text
                                }
                            } else {
                                return task;
                            }
                        })
                    ]
                }
            } else {
                return list;
            }
        })
        localStorage.setItem("localList", JSON.stringify(newLocalList))
        dispatch(setList(newLocalList))
        return setFormOpen(false)
    }

    function renderForm(listId, taskId) {
        const localList = JSON.parse(localStorage.getItem("localList"));
        const currentList = localList.find(list => list.id == listId);
        const currentTaskText = currentList.tasks.find(task => task.id == taskId).text;
        return (
            <TextArea
                placeholder={"Bu kart için başlık girin..."}
                autoFocus
                onBlur={() => handleEditTask(listId, id, inputChange)}
                onChange={(e) => setInputChange(e.target.value)}
                className="min-h-[5rem] w-full p-2 rounded resize-none outline-none border-none"
                defaultValue={currentTaskText}
            />
        )
    }
    return (
        <Draggable draggableId={`${id}`} index={index}>
            {provided => (
                <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                    <div className="flex task items-center justify-between w-sm bg-white rounded overflow-hidden shadow-lg p-2 my-2">
                        <div className="text-sm">
                            {
                                (formOpen) ? renderForm(listId, id) : text
                            }
                        </div>
                        <div
                            onClick={() => setFormOpen(true)}
                            className='hover:bg-[#00000014] cursor-pointer rounded p-2 taskEdit opacity-0 transition duration-150 ease-in-out'>
                            <BsPencil className='w-3 h-3' />
                        </div>
                    </div>
                </div>
            )}
        </Draggable>

    );
}

export default Task;
