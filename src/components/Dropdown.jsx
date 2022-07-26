import React from 'react';

const Dropdown = ({ list, addItem }) => {


    return (
        <div id="dropdown"
        className="bg-white">
            <div className="flex flex-col w-full overflow-hidden">
                {list.map((item, key) => {
                    return <div key={key}
                        className="cursor-pointer w-full border-gray-100 rounded-t border-b hover:bg-teal-100"
                        onClick={() => addItem(item)}>
                        <div className="flex w-full items-center p-2 pl-2 border-transparent border-l-2 relative hover:border-teal-100" >
                            <div className="w-full items-center flex">
                                <div className="mx-2 leading-6 ">
                                    {item}
                                </div>
                            </div>
                        </div>
                    </div>
                })}
            </div>
        </div>);

};

export default Dropdown;