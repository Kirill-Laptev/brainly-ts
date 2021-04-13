import React from 'react'
import { MessagesType } from '../../../redux/profile-reducer/profile-reducer'
import ProfilePost from './ProfilePost'
import ProfileAddPost from './ProfileAddPost'

type PropsType = {
    posts: Array<MessagesType>
    // changeInput: (inputValue: string) => void
    // newPostText: string
    addPost: (newPostText: string) => void
}

const ProfilePosts: React.FC<PropsType> = (props) => {

    const {
        posts,
        addPost
    } = props

    return (
        <>
            <div className='messages__wrapper'>
                <div className='messages__title'>
                    <span>My posts</span>
                </div>
                <div className='messages__inner'>
                    <ProfileAddPost 
                    addPost={addPost}
                    />
                    {posts.map((post) => {
                        return (
                            <ProfilePost
                            key={post.id}
                            post={post} 
                            />
                        )
                    })}
                </div>
            </div>
        </>
    )
}

export default ProfilePosts
