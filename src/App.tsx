import React from 'react';
import './App.css';
import { Switch, Route, NavLink } from 'react-router-dom';
import ProfileContainer from './components/profile/ProfileContainer';
import UsersContainer from './components/users/UsersContainer';
import HeaderContainer from './components/header/HeaderContainer';
import LoginForm from './components/login/LoginForm';
import { AppStateType, AppActionsType } from './redux/store/store';
import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import Preloader from './components/common/preloader/Preloader';
import { appInicializeTC } from './redux/app-reducer/actions'


type PropsType = MapStateToPropsType & MapDispatchToPropsType

class App extends React.Component<PropsType> {
  
  componentDidMount(){
    this.props.appInicialize()
  }

  render() {

    if(!this.props.isInicialized){
      return <Preloader />
    }

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

}



type MapStateToPropsType = {
  isInicialized: boolean
}

type MapDispatchToPropsType = {
  appInicialize: () => void
}


const mapStateToProps = (state: AppStateType) => {
  return {
    isInicialized: state.app.isInicialized
  }
}

const mapDispatchToProps = (dispatch: ThunkDispatch<AppStateType, unknown, AppActionsType>): MapDispatchToPropsType => {
  return {
    appInicialize: () => {
      dispatch(appInicializeTC())
    }
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(App)
