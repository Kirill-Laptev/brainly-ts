import React from 'react'
import enterImg from '../../assets/img/enter.svg'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import { TextError } from '../../helpers/TextError/TextError'
import { AppStateType, AppActionsType } from '../../redux/store/store'
import { ThunkDispatch } from 'redux-thunk'
import { loginTC, logoutTC } from '../../redux/auth-reducer/actions'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

export interface IValuesType {
    email: string
    password: string
}

const InitialValues: IValuesType = {
    email: '',
    password: ''
}

const validationSchema = Yup.object({
    email: Yup.string().required('Username field is required').email('Incorrect email format')
    .max(30, 'Username length should be less than 30 symbols'),
    password: Yup.string().required('Password is required').max(30, 'Password length should be less than 30 symbols')
})

class LoginForm extends React.Component<LoginFormPropsType> {
    

    render() {

        if(this.props.isAuth) return <Redirect to='/profile' /> 

        return (
            <>
                 <div className='login__form'>
                    <div className='form'>
                        <div className='form__user'>
                            <div>SIGN IN</div>
                            <img src={enterImg} />
                        </div>
                        <Formik
                        initialValues={InitialValues}
                        validationSchema={validationSchema}
                        onSubmit={(values, {setSubmitting}) => {
                            this.props.login(values.email, values.password, setSubmitting) 
                        }}>
                            {
                                (formik) => {
                                    return (
                                        <Form>
                                        <div className='form__username'>
                                            <div><label htmlFor='email'>username</label></div>
                                            <Field type='text' id='email' name='email' />
                                            <ErrorMessage name='email' component={TextError}/>
                                        </div>
                                        <div className='form__password'>
                                            <div><label htmlFor='password'>password</label></div>
                                            <Field type='password' id='password' name='password' />
                                            <ErrorMessage name='password' component={TextError}/>
                                        </div>
                                        <div className='form__submit'>
                                            <button type='submit' disabled={formik.isSubmitting || !formik.isValid}>Login</button>
                                        </div>
                                        </Form>
                                    )
                                }
                            }
                        </Formik>
                    </div>
                </div>
            </>
        )
    }  
}



export type MapStateToPropsType = {
    isAuth: boolean
}

export type MapDispatchToPropsType = {
    login: (email: string, password: string, setSubmitting: Function) => void
}

type LoginFormPropsType = MapStateToPropsType & MapDispatchToPropsType


const mapStateToProps = (state: AppStateType): MapStateToPropsType => {
    return {
        isAuth: state.auth.isAuth
    }
}

const mapDispatchToProps = (dispatch: ThunkDispatch<AppStateType, unknown, AppActionsType>): MapDispatchToPropsType => {
    return {
        login: (email: string, password: string, setSubmitting: Function) => {
            dispatch(loginTC(email, password, setSubmitting))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm) 
