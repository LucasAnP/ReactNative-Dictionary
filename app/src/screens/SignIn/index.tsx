import React, { useEffect } from 'react';

import { Alert, Text } from 'react-native';
import { useAuth } from '../../hooks/auth';

interface WordData {
    name: string;
    phonetic: string;
    meaning: string;
}

export function SignIn() {
    const { user, login } = useAuth();

    async function loginInApp() {
        try {
            await login();
        } catch (error) {
            console.log(error)
            Alert.alert('Wrong Credentials')
        }
    }

    useEffect(() => {
        console.log('insideUseEffect');
        loginInApp();
    })

    return (
        <>
            <Text>SignIn</Text>
        </>
    );
}