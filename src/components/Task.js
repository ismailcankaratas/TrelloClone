import React from 'react';
import { Draggable } from 'react-beautiful-dnd';

const Task = ({ text, id, index }) => {
    return (
        <Draggable draggableId={"task-" + id} index={index}>
            {provided => (
                <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                    <div className="w-sm bg-white rounded overflow-hidden shadow-lg p-2 my-2">
                        <div className="text-sm">{text}</div>
                    </div>
                </div>
            )}
        </Draggable>

    );
}

export default Task;
