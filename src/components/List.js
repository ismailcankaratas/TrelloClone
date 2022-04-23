import React from 'react';
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
    const dispatch = useDispatch();

    function listDelete(listId) {
        const newLocalList = JSON.parse(localStorage.getItem("localList"));
        const list = newLocalList.find(list => list.id == listId);
        newLocalList.splice(newLocalList.indexOf(list), 1)
        localStorage.setItem("localList", JSON.stringify(newLocalList))
        dispatch(setList(newLocalList))
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
                                <h2 className='flex items-center justify-between font-semibold m-2 pt-2 text-[#172b4d]'>
                                    {title}
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
                                </h2 >
                                {
                                    tasks.map((task, index) => (
                                        <Task text={task.text} id={task.id} index={index} key={`${task.id}`} />
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
