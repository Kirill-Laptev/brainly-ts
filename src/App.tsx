import React from 'react';
import './App.css';
import Profile from './components/profile/Profile';
import logo from './common/img/logo_brainly.png'

function App() {
  return (
    <>
       <div className='app__wrapper'>
        <div className='app__inner'>
            <div className='container'>
                <div className='header'>
                    <div className='header__body'>
                        <div className='header__logo'>
                            <img src={logo} alt=''/>
                        </div>
                        <div className='header__login'>
                            <button>Login</button>
                        </div>
                    </div>
                </div>
                <div className='main-content'>
                  <Profile />
                </div>
                <div className='sidebar'>
                    <div className='sidebar__links'>
                        <div><a href='#'>Profile</a></div>
                        <div><a href='#'>News feed</a></div>
                        <div><a href='#'>Messages</a></div>
                        <div><a href='#'>Users</a></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    </>
  );
}

export default App;
