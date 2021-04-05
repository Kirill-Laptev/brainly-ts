import React from 'react'
import studentAvatar from '../../assets/img/man-student.png'
import { connect } from 'react-redux'
import { setUsersAC, setCurrentPageAC, setTotalUsersCountAC, toggleFollowingProgressAC, getUsersTC, followTC, unfollowTC, onPageChangedTC } from '../../redux/users-reducer/actions'
import { AppStateType, ActionsType } from '../../redux/store/store'
import { NavLink } from 'react-router-dom'
import { ThunkDispatch } from 'redux-thunk'
import { compose } from 'redux'
import { withAuthRedirect } from '../../hoc/withAuthRedirect'
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




class UsersContainer extends React.Component<UsersContainerPropsType> {

    componentDidMount(){
        this.props.getUsers(this.props.countItems, this.props.currentPage)
    }

    render (){

        const pagesCount = Math.ceil(this.props.totalUsersCount / this.props.countItems)
        let pages: Array<number> = []
        for(let i = 1; i < pagesCount; i++){
            pages = [...pages, i]
        }


        return (
             <>
                <div className='users__wrapper'>
                    <div className='users__inner'>
                        <div className='users__title'>
                            <div className='title__main'>Members</div>
                            <div className='title__subtitle'>Browse all the members of the community!</div>
                        </div>
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
                        <div className='users__pagination'>
                            <span>{'<<'}</span>
                            <span>{'<'}</span>
                            {pages.map((page) => {
                                return (
                                    <span 
                                    key={page} 
                                    onClick={() => this.props.onPageChanged(this.props.countItems, page)}
                                    className={this.props.currentPage === page ? 'active' : ''}
                                    >{page}</span>
                                )
                            })}
                            <span>{'>'}</span>
                            <span>{'>>'}</span>
                        </div>
                        <div className='users__content'>    
                            {this.props.users.map((user, i) => {
                                return (
                                    <div key={user.id} className='user__wrapper'>
                                    <div className='user__inner'>
                                        <div className='user__bg'></div>
                                        <div className='user__avatar'>
                                            <NavLink to={`/profile/${user.id}`}>
                                                <img src={user.photos.large ? user.photos.large : studentAvatar} />
                                            </NavLink>
                                            </div>
                                        <div className='user__name'>{user.name}</div>
                                        <div className='user__topskill'>{randomSpecialization[i]}</div>
                                        <div className='user__contacts'>
                                            <div className='contacts__following'>
                                            <div className='following__count'>{arrFollowing[i]}</div>
                                                <div className='following__text'>FOLLOWING</div>
                                            </div>
                                            <div className='contacts__followers'>
                                            <div className='followers__count'>{arrFollowers[i]}</div>
                                                <div className='followers__text'>FOLLOWERS</div>
                                            </div>
                                        </div>
                                        <div className='user__action'>
                                            {user.followed 
                                            ? <button 
                                            className='action__unfollow' 
                                            onClick={() => this.props.unfollow(user.id)}
                                            disabled={this.props.followingInprogress.includes(user.id)}
                                            >Unfollow</button>
                                            : <button 
                                            className='action__follow' 
                                            onClick={() => this.props.follow(user.id)}
                                            disabled={this.props.followingInprogress.includes(user.id)}
                                            >Follow</button>}
                                            <button className='action__message'>Message</button>
                                        </div>
                                    </div>
                                </div>
                                )
                            })}
                        </div>
                    </div>
                </div>
            </>
        )
    }
}



type mapStateToPropsType = {
    users: Array<UserType>
    countItems: number
    totalUsersCount: number
    currentPage: number
    followingInprogress: Array<number>
}

type mapDispatchToPropsType = {
    setUsers: (users: Array<UserType>) => void
    setTotalUsersCount: (totalUsersCount: number) => void 
    setCurrentPage: (currentPage: number) => void 
    toggleFollowingProgress: (toggle: boolean, userID: number) => void
    getUsers: (countItems: number, pagesCount: number) => void
    follow: (userID: number) => void
    unfollow: (userID: number) => void
    onPageChanged: (countItems: number, page: number) => void
}

type UsersContainerPropsType = mapStateToPropsType & mapDispatchToPropsType

const mapStateToProps = (state: AppStateType): mapStateToPropsType => {
    return {
        users: state.users.users,
        countItems: state.users.countItems,
        totalUsersCount: state.users.totalUsersCount,
        currentPage: state.users.currentPage,
        followingInprogress: state.users.followingInProgress
    }
}

const mapDispatchToProps = (dispatch: ThunkDispatch<AppStateType, unknown, ActionsType>): mapDispatchToPropsType => {
    return {
        setUsers: (users: Array<UserType>) => {
            dispatch(setUsersAC(users))
        },
        setTotalUsersCount: (totalUsersCount: number) => {
            dispatch(setTotalUsersCountAC(totalUsersCount))
        },
        setCurrentPage: (currentPage: number) => {
            dispatch(setCurrentPageAC(currentPage))
        },
        toggleFollowingProgress: (toggle: boolean, userID: number) => {
            dispatch(toggleFollowingProgressAC(toggle, userID))
        },
        getUsers: (countItems: number, currentPage: number) => {
            dispatch(getUsersTC(countItems, currentPage))
        },
        follow: (userID: number) => {
            dispatch(followTC(userID))
        },
        unfollow: (userID: number) => {
            dispatch(unfollowTC(userID))
        },
        onPageChanged: (countItems: number, page: number) => {
            dispatch(onPageChangedTC(countItems, page))
        }
    }
}

export default compose<React.ComponentType>(
    connect(mapStateToProps, mapDispatchToProps),
    withAuthRedirect
)(UsersContainer)

