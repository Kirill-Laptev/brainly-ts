import React from 'react'

type PropsType = {
    pages: Array<number>
    onPageChanged: (countItems: number, page: number) => void
    countItems: number
    currentPage: number
}

const UsersPagination: React.FC<PropsType> = (props) => {

    const {
        pages,
        onPageChanged,
        countItems,
        currentPage
    } = props

    return (
        <>
            <div className='users__pagination'>
                <span>{'<<'}</span>
                <span>{'<'}</span>
                {pages.map((page) => {
                    return (
                        <span
                            key={page}
                            onClick={() => onPageChanged(countItems, page)}
                            className={currentPage === page ? 'active' : ''}
                        >{page}</span>
                    )
                })}
                <span>{'>'}</span>
                <span>{'>>'}</span>
            </div>
        </>
    )
}

export default UsersPagination
