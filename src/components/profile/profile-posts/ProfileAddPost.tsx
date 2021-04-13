import React from 'react'
import studentMan from '../../../assets/img/man-student.png'
import { Formik, Form, Field, FormikHelpers } from 'formik'

type PropsType = {
    addPost: (newPostText: string) => void
}

const ProfileAddPost: React.FC<PropsType> = ({addPost}) => {

    const handleSubmit = (values: {profilePost: string}, actions: FormikHelpers<{profilePost: string}>) => {
        addPost(values.profilePost)
        actions.resetForm()
    }

    return (
        <>
            <div className='messages__post'>
                <div className='post__user'>
                    <img src={studentMan} alt='' />
                </div>
                <div className='post__input'>
                    <Formik
                    initialValues={{profilePost: ''}}
                    onSubmit={handleSubmit}
                    >
                        <Form>
                            <Field
                            type='text'
                            name='profilePost'
                            placeholder="Hey, what's new ?"/>

                            <div className='post__send'>
                                <button type='submit'>SEND</button>
                            </div>
                        </Form>
                    </Formik>
                </div>
            </div>
        </>
    )
}

export default ProfileAddPost
