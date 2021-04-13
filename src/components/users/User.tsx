import React from 'react'
import studentAvatar from '../../assets/img/man-student.png'
import { NavLink } from 'react-router-dom'
import { UserType } from '../../api/users-api'

// Всю эту рандомизацию вынести в отдельный файл
const randomSpecialization = ['Frontend developer', 'Project manager', 'React developer', 'Web designer(UX/UI)',
'DevOps engineer', 'Python developer', 'Mobile app developer', 'Data analyst', 'Machine learning', 'C# developer', 'QA engineer', 'Game developer']

let arrFollowing: Array<number> = []
for(let i = 0; i < 12; i++){
    arrFollowing = [...arrFollowing, Math.floor(Math.random() * 30) + 80]
}

let arrFollowers: Array<number> = []
for(let i = 0; i < 12; i++){
    arrFollowers = [...arrFollowers, Math.floor(Math.random() * 50) + 70]
}


type PropsType = {
    user: UserType,
    index: number,
    unfollow: (userID: number) => void
    follow: (userID: number) => void
    followingInProgress: Array<number>
}

const User: React.FC<PropsType> = (props) => {

    const {
        user,
        index,
        unfollow,
        follow,
        followingInProgress
    } = props

    return (
        <>
            <div className='user__wrapper'>
                <div className='user__inner'>
                    <div className='user__bg'></div>
                    <div className='user__avatar'>
                        <NavLink to={`/profile/${user.id}`}>
                            <img src={user.photos.large ? user.photos.large : studentAvatar} />
                        </NavLink>
                    </div>
                    <div className='user__name'>{user.name}</div>
                    <div className='user__topskill'>{randomSpecialization[index]}</div>
                    <div className='user__contacts'>
                        <div className='contacts__following'>
                            <div className='following__count'>{arrFollowing[index]}</div>
                            <div className='following__text'>FOLLOWING</div>
                        </div>
                        <div className='contacts__followers'>
                            <div className='followers__count'>{arrFollowers[index]}</div>
                            <div className='followers__text'>FOLLOWERS</div>
                        </div>
                    </div>
                    <div className='user__action'>
                        {user.followed
                            ? <button
                                className='action__unfollow'
                                onClick={() => unfollow(user.id)}
                                disabled={followingInProgress.includes(user.id)}
                            >Unfollow</button>
                            : <button
                                className='action__follow'
                                onClick={() => follow(user.id)}
                                disabled={followingInProgress.includes(user.id)}
                            >Follow</button>}
                        <button className='action__message'>Message</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default User
