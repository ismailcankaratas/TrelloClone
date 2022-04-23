import React, { useState } from 'react';
import ActionButton from './ActionButton';
import Task from './Task';
import { BiDotsHorizontalRounded } from 'react-icons/bi';
import { Menu } from '@headlessui/react'
import { AiOutlineClose } from 'react-icons/ai'
import { Droppable } from 'react-beautiful-dnd';
import { setList } from '../redux/features/listSlice';
import { useDispatch } from 'react-redux';
import { Draggable } from 'react-beautiful-dnd';

const List = ({ title, tasks, listId, index }) => {
    const [formOpen, setFormOpen] = useState(false);
    const [inputChange, setInputChange] = useState(null);

    const dispatch = useDispatch();

    function listDelete(listId) {
        const newLocalList = JSON.parse(localStorage.getItem("localList"));
        const list = newLocalList.find(list => list.id == listId);
        newLocalList.splice(newLocalList.indexOf(list), 1)
        localStorage.setItem("localList", JSON.stringify(newLocalList))
        dispatch(setList(newLocalList))
    }
    function handleEditTitle(listId, text) {
        const localList = JSON.parse(localStorage.getItem("localList"));
        const currentList = localList.find(list => list.id == listId);
        if (!text) {
            return setFormOpen(false)
        }
        const newLocalList = localList.map(list => {
            if (list.id == listId) {
                return {
                    ...currentList,
                    title: text
                }
            } else {
                return list
            }
        })
        localStorage.setItem("localList", JSON.stringify(newLocalList))
        dispatch(setList(newLocalList))
        return setFormOpen(false)
    }
    function renderForm(listId) {
        const localList = JSON.parse(localStorage.getItem("localList"));
        const listTitle = localList.find(list => list.id == listId).title;
        return (
            <input
                type="text"
                placeholder="Liste başlığı girin..."
                autoFocus
                onBlur={() => handleEditTitle(listId, inputChange)}
                onChange={(e) => setInputChange(e.target.value)}
                className=" w-72 m-2 mt-3 ml-0 p-1 py-0 rounded resize-none outline-none border-2 border-[#0079bf]"
                defaultValue={listTitle}
            />
        )
    }
    return (
        <Draggable draggableId={`${listId}`} index={index}>
            {provided => (
                <div {...provided.draggableProps}
                    ref={provided.innerRef}
                    {...provided.dragHandleProps}
                    className="bg-[#ebecf0] rounded-sm w-72 px-2 pb-2 m-2">
                    <Droppable droppableId={`${listId}`}>
                        {provided => (
                            <div {...provided.droppableProps} ref={provided.innerRef}>
                                <div className='flex items-center justify-between'>
                                    {
                                        formOpen ? renderForm(listId)
                                            :
                                            <h2
                                                onClick={() => setFormOpen(true)}
                                                className='cursor-pointer font-semibold m-2 pt-2 text-[#172b4d]'>
                                                {title}
                                            </h2>
                                    }

                                    <Menu as="div">
                                        <Menu.Button className='hover:bg-[#00000014] rounded p-2'>
                                            <BiDotsHorizontalRounded />
                                        </Menu.Button>
                                        <Menu.Items className="flex flex-col w-72 absolute py-2 z-50 bg-white font-normal">
                                            <div className='flex justify-between border-b-2 text-base py-2 mx-2'>
                                                <span className='w-full text-center'>
                                                    Liste İşlemleri
                                                </span>
                                                <AiOutlineClose className='cursor-pointer' />
                                            </div>
                                            <div className='flex flex-col mt-2'>
                                                <Menu.Item>
                                                    {({ active }) => (
                                                        <span
                                                            className={`p-1 text-[#5e6c84] ${active && ' bg-[#091e4214] text-[#172b4d] '}`}
                                                            onClick={() => listDelete(listId)}
                                                        >
                                                            Sil
                                                        </span>
                                                    )
                                                    }
                                                </Menu.Item >
                                            </div >

                                            {/* <Menu.Item disabled>
                                    <span className="opacity-75">Bir arkadaşınızı davet edin (çok yakında!)</span>
                                </Menu.Item> */}
                                        </Menu.Items >
                                    </Menu >
                                </div>
                                {
                                    tasks.map((task, index) => (
                                        <Task text={task.text} id={task.id} listId={listId} index={index} key={`${task.id}`} />
                                    ))
                                }
                                < ActionButton listId={listId} />
                                {provided.placeholder}
                            </div>
                        )}
                    </Droppable>
                </div>
            )
            }
        </Draggable >


    );
}

export default List;
