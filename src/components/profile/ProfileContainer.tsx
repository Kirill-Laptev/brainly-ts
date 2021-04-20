import React from 'react'
import { connect } from 'react-redux'
import { AppStateType, AppActionsType } from '../../redux/store/store'
import { addPostAC, changeInputAC, getUserProfileDataTC } from '../../redux/profile-reducer/actions' 
import { MessagesType } from '../../redux/profile-reducer/profile-reducer'
import { compose } from 'redux'
import ProfileInfo from './ProfileInfo'
import { withRouter, RouteComponentProps, Redirect } from 'react-router-dom'
import { withAuthRedirect } from '../../hoc/withAuthRedirect'
import { ThunkDispatch } from 'redux-thunk'
import { UserProfileType } from '../../api/profile-api'
import ProfilePosts from './profile-posts/ProfilePosts'

// Типизация userID, получаемого из URL
type PathParamsType = {
    userID: string
}

type OwnPropsType = MapStateToPropsType & MapDispatchToPropsType

// Общая типизация входящих props. Включая получаемые props, благодаря withRouter
type PropsType = RouteComponentProps<PathParamsType> & OwnPropsType



class ProfileContainer extends React.Component<PropsType> {

    componentDidMount(){
        let userID = this.props.match.params.userID
        if(!userID){
            userID = this.props.authorizedUserID!
        } 
        this.props.getUserProfileData(userID)
    }


    render() {
        return (
            <>
                {this.props.userProfile && <ProfileInfo user={this.props.userProfile} />}
                
                <ProfilePosts
                posts={this.props.posts}
                addPost={this.props.addPost}
                />
            </>
        )
    }
    
}



type MapStateToPropsType = {
    posts: Array<MessagesType>
    userProfile: UserProfileType | null
    authorizedUserID: string | null
    isAuth: boolean
}

type MapDispatchToPropsType = {
    addPost: (newPostText: string) => void
    getUserProfileData: (userID: string) => void
}

const mapStateToProps = (state: AppStateType): MapStateToPropsType => {
    return {
        posts: state.profile.posts,
        userProfile: state.profile.userProfile,
        authorizedUserID: state.auth.id,
        isAuth: state.auth.isAuth
    }
}

const MapDispatchToProps = (dispatch: ThunkDispatch<AppStateType, unknown, AppActionsType>): MapDispatchToPropsType => {
    return {
        addPost: (newPostText: string) => {
            dispatch(addPostAC(newPostText))
        },
        getUserProfileData: (userID: string) => {
            dispatch(getUserProfileDataTC(userID))
        }
    }
}

// Типизация compose
export default compose<React.ComponentType>(
    connect(mapStateToProps, MapDispatchToProps),
    withRouter,
    withAuthRedirect
)(ProfileContainer)
