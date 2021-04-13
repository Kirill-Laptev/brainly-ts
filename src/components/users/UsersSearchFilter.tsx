import React from 'react'

const UsersSearchFilter = () => {
    return (
        <>
            <div className='user__search'>
                <div className='search__title'>Search and filter</div>
                <div className='search__field'><input placeholder='Search by name' /></div>
                <div className='search__select'>
                    <select>
                        <option value='all'>All</option>
                        <option value='following'>Only following</option>
                        <option value='unfollowing'>Only unfollowing</option>
                    </select>
                </div>
                <div className='search__btn'>
                    <button>Search</button>
                </div>
            </div>
        </>
    )
}

export default UsersSearchFilter
