import React from 'react';
import './App.css';
import { Switch, Route, NavLink } from 'react-router-dom';
import ProfileContainer from './components/profile/ProfileContainer';
import UsersContainer from './components/users/UsersContainer';
import HeaderContainer from './components/header/HeaderContainer';
import LoginForm from './components/login/LoginForm';

function App() {
  return (
    <>
       <div className='app__wrapper'>
        <div className='app__inner'>
            <div className='container'>
                <HeaderContainer />
                <div className='main-content'>
                  <Switch>
                  <Route path='/profile/:userID?' component={ProfileContainer} />
                  <Route path='/news' render={() => <div>News Feed will be here</div>} />
                  <Route path='/messages' render={() => <div>Messages will be here</div>} />
                  <Route path='/users' component={UsersContainer} />
                  <Route path='/login' render={() => <LoginForm />} />
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
