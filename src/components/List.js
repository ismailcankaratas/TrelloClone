import React from 'react';
import ActionButton from './ActionButton';
import Task from './Task';
import { BiDotsHorizontalRounded } from 'react-icons/bi';
import { Menu } from '@headlessui/react'
import { AiOutlineClose } from 'react-icons/ai'
import { Droppable } from 'react-beautiful-dnd';

const List = ({ title, tasks, listId }) => {
    return (
        <div>
            <Droppable droppableId={`${listId}`}>
                {provided => (
                    <div {...provided.droppableProps} ref={provided.innerRef} className="bg-[#ebecf0] rounded-sm w-72 px-2 pb-2 m-2">
                        <h2 className='flex items-center justify-between font-semibold m-2 pt-2 text-[#172b4d]'>
                            {title}
                            <Menu as="div">
                                <Menu.Button className='hover:bg-[#00000014] rounded p-2'>
                                    <BiDotsHorizontalRounded />
                                </Menu.Button>
                                <Menu.Items className="flex flex-col w-72 absolute py-2 z-50 bg-white font-normal">
                                    <div className='flex justify-between border-b-2 text-base py-2 px-2'>
                                        <span className='w-full text-center'>
                                            Liste İşlemleri
                                        </span>
                                        <AiOutlineClose className='cursor-pointer' />
                                    </div>
                                    <div className='flex flex-col mt-2'>
                                        <Menu.Item>
                                            {({ active }) => (
                                                <a
                                                    className={`p - 1 text - [#5e6c84] ${active && ' bg-[#091e4214] text-[#172b4d] '}`}
                                                    href="/account-settings"
                                                >
                                                    Sil
                                                </a>
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
                    </div >
                )}
            </Droppable >
        </div>

    );
}

export default List;
