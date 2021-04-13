import React from 'react'
import { MessagesType } from '../../../redux/profile-reducer/profile-reducer'

type PropsType = {
    post: MessagesType
}

const ProfilePost: React.FC<PropsType> = ({post}) => {
    return (
        <>
            <div key={post.id} className='message'>
                <div className='message__container'>
                    <div className='message__info'>
                        <div className='message__img'>
                            <img src={post.photo} alt='' />
                        </div>
                        <div className='info__container'>
                            <div className='info__name'>{post.author}</div>
                            <div className='info__time'>{post.time}</div>
                        </div>
                    </div>
                    <div className='message__text'>
                        {post.message}
                    </div>
                </div>
            </div>
        </>
    )
}

export default ProfilePost
