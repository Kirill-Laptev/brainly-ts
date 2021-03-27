import React from 'react'
import logo from '../../assets/img/logo_brainly.png'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import { AppStateType } from '../../redux/store/store'
import { authAPI, AuthDataType } from '../../api/auth-api'
import { setAuthDataAC } from '../../redux/auth-reducer/actions'


type PropsType = MapStateToPropsType & MapDispatchToPropsType

class HeaderContainer extends React.Component<PropsType> {

    componentDidMount(){
        authAPI.getAuthData()
        .then(({data}) => {
            if(data.resultCode === 0){
                this.props.setAuthData(data.data)
            }
        })
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
    setAuthData: (authData: AuthDataType) => void
}


const mapStateToProps = (state: AppStateType) => {
    return {
        isAuth: state.auth.isAuth
    }
}

const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        setAuthData: (authData: AuthDataType) => {
        dispatch(setAuthDataAC(authData))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(HeaderContainer)
