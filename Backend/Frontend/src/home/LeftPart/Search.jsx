import React, { useState } from 'react'
import { FaSearch } from "react-icons/fa";
import UseGetAllUsers from '../../context/UseGetAllUsers.jsx'
import useConversation from '../../components/zustand/useConversation.js';
import toast from 'react-hot-toast';

const Search = () => {

    const [search, setSearch] = useState("");
    const [allUsers] = UseGetAllUsers();
    const {setSelectedConversation} = useConversation();

    const handleSubmit=(e) => {
        e.preventDefault();
        if(!search){
            return;
        }
        const conversation = allUsers.find((user) => user.fullname?.toLowerCase().includes(search.toLowerCase()));

        if(conversation){
            setSelectedConversation(conversation);
            setSearch("");
        }
        else{
            toast.error("User Not Found");
        }
    }
  return (
    <div className='h-[10vh]'>
        <div className='px-6 py-4'>
            <form onSubmit={handleSubmit}>

                <div className='flex space-x-3'>

                    <label className="border-[1px] border-gray-700 bg-slate-900 rounded-lg flex items-center gap-2 w-[80%] p-3">
                        <input type="text" className="grow outline-none bg-slate-900 bg-transparent" placeholder="Search"  value={search} onChange={(e) => setSearch(e.target.value)}/>
                    </label>

                    <button className='text-4xl p-2 hover:bg-gray-600 rounded-full duration-300'><FaSearch/></button>

                </div>

            </form>
        </div>
    </div>
  )
}

export default Search
