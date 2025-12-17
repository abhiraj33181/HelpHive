import { Search } from 'lucide-react'
import React from 'react'

const SearchBox = () => {
  return (
    <div className='shadow flex justify-center items-center'>
        <select>
            <option value="Gaya">Gaya</option>
            <option value="Gaya">Patna</option>
            <option value="Gaya">New Delhi</option>
            <option value="Gaya">Hyderabad</option>
            <option value="Gaya">Bangloore</option>
        </select>

        <input type="text" placeholder='Search Service or helpers..' />
        <button><Search/></button>
    </div>
  )
}

export default SearchBox