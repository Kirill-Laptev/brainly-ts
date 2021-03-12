import React from 'react'
import studentMan from '../../common/img/man-student.png'
import { connect } from 'react-redux'
import { AppStateType } from '../../redux/store/store'
import { addPostAC, changeInputAC } from '../../redux/profile-reducer/actions' 
import { ProfileStateType } from '../../redux/profile-reducer/profile-reducer'
import { Dispatch } from 'redux'



const Profile = (props: UsersPropsType) => {

    const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        props.changeInput(e.currentTarget.value)
    }

    const addPost = () => {
        props.addPost()
    }

    return (
        <>
            <div className='profile__wrapper'>
                <div className='profile__inner'>
                    <div className='profile__image'>
                        <div className='profile__avatar'><img src={studentMan} alt='' /></div>
                    </div>
                    <div className='profile__name'>Kirill Laptev 🇷🇺</div>
                    <div className='profile__skills'>
                        <div className='skills__title'>
                            <div>SKILLS</div>
                        </div>
                        <div className='skills__text'>HTML, CSS, JS, REACT, TS, REST-API, JEST</div>
                    </div>
                    <div className='profile__about'>
                        <div className='about__title'>
                            <div>ABOUT ME</div>
                        </div>
                        <div className='about__text'>
                            <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit.</p>
                            <p>Odio doloremque saepe autem natus excepturi repudiandae, odit adipisci sit unde</p>
                            <p>culpa fugit quos maxime, temporibus vero laudantium illo dolores ea! Quaerat?</p>
                        </div>
                    </div>
                    <div className='profile__connection'>
                        <div className='profile__contacts'>
                            <div className='contacts__container'>
                                <div className='contacts__title'>
                                    <span>Contact me</span>
                                </div>
                                <div className='contacts__mail'>
                                    <div className='mail__title'>
                                        <div>MAIL</div>
                                    </div>
                                    <div className='mail__text'>laptevkirill.wwc@gmail.com</div>
                                </div>
                                <div className='contacts__github'>
                                    <div className='github__title'>
                                        <div>GITHUB</div>
                                    </div>
                                    <div className='github__text'>https://github.com/Kirill-Laptev</div>
                                </div>
                            </div>
                        </div>
                        <div className='profile__actions'>
                            <div className='actions__container'>
                                <div className='actions__subscribe'>
                                    <button>FOLLOW</button>
                                </div>
                                <div className='actions__message'>
                                    <button>SEND MESSAGE</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
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
                            onChange={onInputChange}
                            value={props.profile.newPostText} />
                        </div>
                        <div className='post__send'>
                            <button
                            onClick={addPost}
                            >SEND</button>
                        </div>
                    </div>
                    {props.profile.posts.map((post) => {
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


type MapStateToPropsType = {
    profile: ProfileStateType
}

type MapDispatchToPropsType = {
    changeInput: (inputValue: string) => void
    addPost: () => void
}

type UsersPropsType = MapStateToPropsType & MapDispatchToPropsType


const mapStateToProps = (state: AppStateType): MapStateToPropsType => {
    return {
        profile: state.profile
    }
}

const MapDispatchToProps = (dispatch: Dispatch): MapDispatchToPropsType => {
    return {
        changeInput: (inputValue: string) => {
            dispatch(changeInputAC(inputValue))
        },
        addPost: () => {
            dispatch(addPostAC())
        }
    }
}


export default connect(mapStateToProps, MapDispatchToProps)(Profile)
