import React from 'react'

interface ITextErrorPropsType {
    children?: React.ReactNode
}

export const TextError: React.FC<ITextErrorPropsType> = (props) => {
    return (
        <div className='text__error'>
            {props.children}
        </div>
    )
}
