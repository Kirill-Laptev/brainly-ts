import React from 'react'
import studentMan from '../../assets/img/man-student.png'
import { UserProfileType } from '../../api/profile-api'

type PropsType = {
    user: UserProfileType
}

const ProfileInfo: React.FC<PropsType> = (props) => {
    return (
        <>
            <div className='profile__wrapper'>
                <div className='profile__inner'>
                    <div className='profile__image'>
                        <div className='profile__avatar'>
                            <img src={props.user.photos.large ? props.user.photos.large : studentMan} alt='' />
                        </div>
                    </div>
                    <div className='profile__name'>{props.user.fullName}</div>
                    <div className='profile__skills'>
                        <div className='skills__title'>
                            <div>SKILLS</div>
                        </div>
                        <div className='skills__text'>My skills will be here soon...</div>
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
                                    <div className='mail__text'>
                                    {props.user.contacts.mainLink 
                                        ? props.user?.contacts.mainLink
                                        : 'example@gmail.com'}
                                    </div>
                                </div>
                                <div className='contacts__github'>
                                    <div className='github__title'>
                                        <div>GITHUB</div>
                                    </div>
                                    <div className='github__text'>{
                                    props.user.contacts.github
                                    ? props.user.contacts.github
                                    :`https://github.com/${props.user.fullName}`
                                    }</div>
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
        </>
    )
}

export default ProfileInfo
