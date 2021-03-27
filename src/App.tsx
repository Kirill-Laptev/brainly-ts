import React from 'react';
import './App.css';
import { Switch, Route, NavLink } from 'react-router-dom';
import ProfileContainer from './components/profile/ProfileContainer';
import UsersContainer from './components/users/UsersContainer';
import HeaderContainer from './components/header/HeaderContainer';

function App() {
  return (
    <>
       <div className='app__wrapper'>
        <div className='app__inner'>
            <div className='container'>
                {/* <div className='header'>
                    <div className='header__body'>
                        <div className='header__logo'>
                            <img src={logo} alt=''/>
                        </div>
                        <div className='header__login'>
                            <button>Login</button>
                        </div>
                    </div>
                </div> */}
                <HeaderContainer />
                <div className='main-content'>
                  <Switch>
                  <Route path='/profile/:userID?' component={ProfileContainer} />
                  <Route path='/news' render={() => 'News Feed will be here'} />
                  <Route path='/messages' render={() => 'Messages will be here'} />
                  <Route path='/users' component={UsersContainer} />
                  </Switch>
                </div>
                <div className='sidebar'>
                    <div className='sidebar__links'>
                        <div><NavLink to='/profile'>Profile</NavLink></div>
                        <div><NavLink to='/news'>News feed</NavLink></div>
                        <div><NavLink to='/messages'>Messages</NavLink></div>
                        <div><NavLink to='/users'>Users</NavLink></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    </>
  );
}

export default App;
