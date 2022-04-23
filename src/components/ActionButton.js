import React, { useState } from 'react';
import { AiOutlineClose } from 'react-icons/ai'
import { GrAdd } from 'react-icons/gr'
import TextArea from 'react-textarea-autosize';
import { useDispatch } from "react-redux";
import { setList } from '../redux/features/listSlice';
import { v4 as uuid } from 'uuid';

const styles = {
    openForButtonGroup: `flex items-center cursor-pointer rounded py-2 pl-2`
}
const ActionButton = ({ lists, listId }) => {
    const [formOpen, setFormOpen] = useState(false);
    const [inputChange, setInputChange] = useState(null);
    const dispatch = useDispatch();

    function handleAddList(listTitle) {
        const unique_id = uuid();
        const localList = JSON.parse(localStorage.getItem("localList"));
        const list =
        {
            title: listTitle,
            id: `list-${unique_id}`,
            tasks: []
        };
        if (listTitle) {
            localStorage.setItem("localList", JSON.stringify([...localList, list]));
            dispatch(setList([...localList, list]))
        }
    }

    function handleAddTask(listId, taksText) {
        const unique_id = uuid();
        const small_id = unique_id.slice(0, 8)
        const localList = JSON.parse(localStorage.getItem("localList"));
        if (taksText) {
            const newLocalList = localList.map(list => {
                if (list.id == listId) {
                    const newTask = { text: taksText, id: `task-${small_id}` }
                    return {
                        ...list,
                        tasks: [...list.tasks, newTask]
                    }
                } else {
                    return {
                        ...list
                    }
                }

            })
            localStorage.setItem("localList", JSON.stringify(newLocalList));
            dispatch(setList(localList))
        }
    }


    function renderAddButton(lists) {
        const buttonText = lists ? "Başka liste ekleyin" : "Kart ekle";
        return (
            <div
                onClick={() => setFormOpen(true)}
                className={lists
                    ?
                    styles.openForButtonGroup + ' w-72 m-2 pl-2 opacity-100 text-[#172b4d] bg-[#00000014] hover:bg-[#00000029]'
                    :
                    styles.openForButtonGroup + ' hover:bg-[#091e4214] hover:text-[#172b4d] text-[#5e6c84] opacity-50 text-inherit bg-inherit '}>
                <GrAdd />
                <p className='ml-1'>{buttonText}</p>
            </div >
        )
    }

    function renderForm(lists) {
        const placeHolder = lists ? "Liste başlığı girin..." : "Bu kart için başlık girin...";
        const buttonTittle = lists ? "Liste ekle" : "Kart ekle";
        const container = lists ? `bg-[#ebecf0] hover:bg-[#00000029] m-2 p-2 rounded overflow-visible` : ``
        return (
            <div className={container}>
                {
                    (lists) ?
                        <input
                            type="text"
                            placeholder={placeHolder}
                            autoFocus
                            onBlur={() => setFormOpen(false)}
                            onChange={(e) => setInputChange(e.target.value)}
                            className=" w-72 p-2 mb-2 rounded resize-none outline-none border-2 border-[#0079bf]"
                            value={(inputChange == null) ? "" : inputChange}
                        />
                        :
                        <TextArea
                            placeholder={placeHolder}
                            autoFocus
                            onBlur={() => setFormOpen(false)}
                            onChange={(e) => setInputChange(e.target.value)}
                            className="min-h-[5rem] w-full p-2 rounded resize-none outline-none border-none"
                            value={(inputChange == null) ? "" : inputChange}
                        />
                }

                <div className='flex items-center'>
                    <button
                        onMouseDown={() => lists ? handleAddList(inputChange) : handleAddTask(listId, inputChange)}
                        className='py-1 px-4 flex-1 rounded text-white bg-[#0079bf]'>
                        {buttonTittle}
                    </button>
                    <div>
                        <AiOutlineClose className='w-7 h-7 cursor-pointer' />
                    </div>
                </div>

            </div >
        )
    }

    return (
        <div>
            {
                formOpen ? renderForm(lists) : renderAddButton(lists)
            }
        </div>
    );
}

export default ActionButton;
