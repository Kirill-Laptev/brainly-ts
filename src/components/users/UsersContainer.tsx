import React from 'react'
import { connect } from 'react-redux'
import { setUsersAC, setCurrentPageAC, setTotalUsersCountAC, toggleFollowingProgressAC, getUsersTC, followTC, unfollowTC, onPageChangedTC } from '../../redux/users-reducer/actions'
import { AppStateType, ActionsType } from '../../redux/store/store'
import { ThunkDispatch } from 'redux-thunk'
import { compose } from 'redux'
import { withAuthRedirect } from '../../hoc/withAuthRedirect'
import { UserType } from '../../api/users-api'
import UsersSearchFilter from './UsersSearchFilter'
import UsersPagination from './UsersPagination'
import User from './User'


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
                        <UsersSearchFilter />
                        <UsersPagination 
                        pages={pages}
                        onPageChanged={this.props.onPageChanged}
                        countItems={this.props.countItems}
                        currentPage={this.props.currentPage}
                        />
                        <div className='users__content'>    
                            {this.props.users.map((user, index) => {
                                return (
                                    <User 
                                    key={user.id}
                                    user={user}
                                    index={index}
                                    unfollow={this.props.unfollow}
                                    follow={this.props.follow}
                                    followingInProgress={this.props.followingInprogress}
                                    />
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

