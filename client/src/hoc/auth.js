import React, { useEffect, useContext } from 'react';
import { auth } from '../_actions/user_actions';
import { useSelector, useDispatch } from "react-redux";
import { AuthContext } from '../_context/authContext';

export default function (ComposedClass, reload, adminRoute = null) {
    function AuthenticationCheck(props) {

        let user = useSelector(state => state.user);
        const dispatch = useDispatch();
        const context = useContext(AuthContext);

        const { isAuthenticated, userData } = context.authData;

        // const requestBody = {
        //     query: `
        //     query{
        //        createUser(userInput:{email:"${email}",password:"${password}",name:"${name}",lastname:${lastname},image:"${image}"}){
        //         id
        //         email
        //     }
        // }
        // `};
        //     const request = axios.get(`${USER_SERVER}/auth`)
        //     .then(response => response.data);
        // return {
        //     type: AUTH_USER,
        //     payload: request
        // }


        useEffect(() => {
            dispatch(auth()).then(async response => {
                if (await !response.payload.isAuth) {
                    if (reload) {
                        props.history.push('/register_login')
                    }
                } else {
                    if (adminRoute && !response.payload.isAdmin) {
                        props.history.push('/')
                    }
                    else {
                        if (reload === false) {
                            props.history.push('/')
                        }
                    }
                }
            })

        }, [dispatch, props.history, user.googleAuth])

        return (
            <ComposedClass {...props} user={user} />
        )
    }
    return AuthenticationCheck
}


