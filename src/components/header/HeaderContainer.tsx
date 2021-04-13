import React from 'react'
import logo from '../../assets/img/logo_brainly.png'
import { connect } from 'react-redux'
import { AppStateType, ActionsType } from '../../redux/store/store'
import { getAuthUserDataTC, logoutTC } from '../../redux/auth-reducer/actions'
import { ThunkDispatch } from 'redux-thunk'


type PropsType = MapStateToPropsType & MapDispatchToPropsType

class HeaderContainer extends React.Component<PropsType> {

    componentDidMount(){
        this.props.getAuthUserData()
    }

    render() {
        return (
            <>
                <div className='header'>
                    <div className='header__body'>
                        <div className='header__logo'>
                            <img src={logo} alt='' />
                        </div>
                        <div className='header__login'>
                            {this.props.isAuth
                            ? <button onClick={this.props.logout}>Log out</button>
                            : <button>Login</button>}
                        </div>  
                    </div>
                </div>
            </>
        )
    }
}


type MapStateToPropsType = {
    isAuth: boolean
}

type MapDispatchToPropsType = {
    getAuthUserData: () => void
    logout: () => void
}


const mapStateToProps = (state: AppStateType): MapStateToPropsType => {
    return {
        isAuth: state.auth.isAuth
    }
}

const mapDispatchToProps = (dispatch: ThunkDispatch<AppStateType, unknown, ActionsType>): MapDispatchToPropsType => {
    return {
        getAuthUserData: () => {
            dispatch(getAuthUserDataTC())
        },
        logout: () => {
            dispatch(logoutTC())
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(HeaderContainer)
