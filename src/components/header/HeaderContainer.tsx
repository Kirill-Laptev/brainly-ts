import React from 'react'
import logo from '../../assets/img/logo_brainly.png'
import { connect } from 'react-redux'
import { AppStateType, ActionsType } from '../../redux/store/store'
import { getAuthUserDataTC } from '../../redux/auth-reducer/actions'
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
                            ? <button>Log out</button>
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
}


const mapStateToProps = (state: AppStateType) => {
    return {
        isAuth: state.auth.isAuth
    }
}

const mapDispatchToProps = (dispatch: ThunkDispatch<AppStateType, unknown, ActionsType>) => {
    return {
        getAuthUserData: () => {
            dispatch(getAuthUserDataTC())
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(HeaderContainer)
