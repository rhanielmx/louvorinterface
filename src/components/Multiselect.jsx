import axios from 'axios';
import { useState, useEffect } from 'react';
import Dropdown from './Dropdown';


export default function Multiselect({ selectedItems, setSelected }) {
    // state showing if dropdown is open or closed
    const [dropdown, setDropdown] = useState(false);
    // managing dropdown items (list of dropdown items)
    // const [items, setItems] = useState(['Adoração(Abertura)', "Contrição", "Santa Ceia", "Contraternização(Unidade)", "Adoração(Ritmada)", "Edificação", "Consagração"]);
    const [items, setItems] = useState([]);
    // contains selected items
    // const [selectedItems, setSelected] = useState([]);

    async function toogleDropdown() {        
        setDropdown(!dropdown)
    };

    // adds new item to multiselect 
    const addTag = (item) => {
        if (!selectedItems.includes(item)) {
            setSelected(selectedItems.concat(item));
            setDropdown(false);
        }
    };

    // removes item from multiselect
    const removeTag = (item) => {
        const filtered = selectedItems.filter((e) => e !== item);
        setSelected(filtered);
    }

    async function getCategories() {
        let res = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/handler/categories/list`)
        let categories = res.data.categories.map(category => {return category.name})
        return categories
    }

    useEffect(()=>{
        getCategories().then(categories => {
            setItems(categories)
        })
    },[])


    // useEffect(() => {
    //     axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/songs/categories`)
    //         .then(res => {
    //             categories = res.data.categories.map(category => { category.name })
    //             console.log(res)
    //             setItems(['Adoração'])
    //         }
    //         ).catch(err => {
    //             console.log(err)
    //         }
    //         )
    // }, [dropdown])

    return (<div className="autcomplete-wrapper">
        <div className="autcomplete">
            <div className="w-full flex flex-col items-center mx-auto">
                <div className="w-full">
                    <div className="flex flex-col items-center relative">
                        <div className="w-full">
                            <div className="my-2 p-1 flex border border-black bg-white rounded ">
                                <div className="flex flex-auto flex-wrap">
                                    {
                                        selectedItems.map((tag, index) => {
                                            return (
                                                <div key={index} className="flex justify-center items-center m-1 font-medium py-1 px-2 rounded-full text-teal-700 bg-teal-100 border border-teal-300 ">
                                                    <div className="text-xs font-normal leading-none w-full flex-initial">{tag}</div>
                                                    <div className="flex flex-auto flex-row-reverse">
                                                        <div onClick={() => removeTag(tag)}>
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                                                                className="feather feather-x cursor-pointer hover:text-teal-400 rounded-full w-4 h-4 ml-2">
                                                                <line x1="18" y1="6" x2="6" y2="18"></line>
                                                                <line x1="6" y1="6" x2="18" y2="18"></line>
                                                            </svg>
                                                        </div>
                                                    </div>
                                                </div>)
                                        })
                                    }
                                    <div className="flex-1">
                                        <input placeholder="" className="bg-transparent p-1 px-2 appearance-none outline-none h-full  text-gray-800" disabled />
                                    </div>
                                </div>
                                <div className="text-gray-300 w-8 py-1 pl-2 pr-1 border-l flex items-center border-gray-200" onClick={toogleDropdown}>
                                    <button className="cursor-pointer w-6 h-6 text-gray-600 outline-none focus:outline-none flex flex-row items-center" disabled>
                                        <ion-icon name={`${dropdown ? 'chevron-up' : 'chevron-down'}`}></ion-icon>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    {dropdown ? <Dropdown list={items} addItem={addTag}></Dropdown> : null}
                </div>
            </div>
        </div>
    </div>)
};
