import React from 'react'
import studentMan from '../../assets/img/man-student.png'
import { connect } from 'react-redux'
import { AppStateType } from '../../redux/store/store'
import { addPostAC, changeInputAC, setUserProfileAC } from '../../redux/profile-reducer/actions' 
import { UserProfileType, MessagesType } from '../../redux/profile-reducer/profile-reducer'
import { Dispatch, compose } from 'redux'
import ProfileInfo from './ProfileInfo'
import { profileAPI } from '../../api/profile-api'
import { withRouter, RouteComponentProps } from 'react-router-dom'

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
            userID = '12705'
        }
        profileAPI.getUserProfile(userID)
        .then(({data}) => this.props.setUserProfile(data))
    }

    onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        this.props.changeInput(e.currentTarget.value)
    }

    addPost = () => {
        this.props.addPost()
    }

    render() {
        return (
            <>
                {this.props.userProfile && <ProfileInfo user={this.props.userProfile} />}
                <div className='messages__wrapper'>
                    <div className='messages__title'>
                        <span>My posts</span>
                    </div>
                    <div className='messages__inner'>
                        <div className='messages__post'>
                            <div className='post__user'>
                                <img src={studentMan} alt='' />
                            </div>
                            <div className='post__input'>
                                <input 
                                type='text' 
                                placeholder="Hey, what's new ?"
                                onChange={this.onInputChange}
                                value={this.props.newPostText} />
                            </div>
                            <div className='post__send'>
                                <button
                                onClick={this.addPost}
                                >SEND</button>
                            </div>
                        </div>
                        {this.props.posts.map((post) => {
                            return <div key={post.id} className='message'>
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
                        })}
                    </div>
                </div>
            </>
        )
    }
    
}




type MapStateToPropsType = {
    newPostText: string
    posts: Array<MessagesType>
    userProfile: UserProfileType | null
}

type MapDispatchToPropsType = {
    changeInput: (inputValue: string) => void
    addPost: () => void
    setUserProfile: (userProfile: UserProfileType) => void
}

const mapStateToProps = (state: AppStateType): MapStateToPropsType => {
    return {
        newPostText: state.profile.newPostText,
        posts: state.profile.posts,
        userProfile: state.profile.userProfile
    }
}

const MapDispatchToProps = (dispatch: Dispatch): MapDispatchToPropsType => {
    return {
        changeInput: (inputValue: string) => {
            dispatch(changeInputAC(inputValue))
        },
        addPost: () => {
            dispatch(addPostAC())
        },
        setUserProfile: (userProfile: UserProfileType) => {
            dispatch(setUserProfileAC(userProfile))
        }
    }
}

// Типизация compose
export default compose<React.ComponentType>(
    connect(mapStateToProps, MapDispatchToProps),
    withRouter
)(ProfileContainer)
