import { connect } from 'react-redux';
import { AppStateType } from '../redux/store/store';
import React, { ComponentType } from 'react'
import { Redirect } from 'react-router-dom';


type MapStateToPropsType = {
    isAuth: boolean
}

const mapStateToProps = (state: AppStateType): MapStateToPropsType => {
    return {
        isAuth: state.auth.isAuth
    }
}

export function withAuthRedirect<T>(Component: ComponentType<T>) {

    const WithRedirectComponent = (props: MapStateToPropsType) => {

        const {isAuth, ...restProps} = props;

        if(!isAuth) return <Redirect to='/login' />
        return <Component {...restProps as T} />
    }

    const ConnectedRedirectComponent = connect(mapStateToProps)(WithRedirectComponent)
    return ConnectedRedirectComponent
}