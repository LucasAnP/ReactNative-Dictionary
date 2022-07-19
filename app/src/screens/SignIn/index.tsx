import React, { useEffect, useState } from 'react';

import { Alert, Text } from 'react-native';
import { AnimatedLoading } from '../../components/AnimatedLoading';
import { useAuth } from '../../hooks/auth';

interface WordData {
    name: string;
    phonetic: string;
    meaning: string;
}

export function SignIn() {
    const { userStoragedLoading } = useAuth();
    const { login } = useAuth();

    async function loginInApp() {
        try {
            return await login();
        } catch (error) {
            console.warn(error)
            Alert.alert('Wrong Credentials')
        }
    }

    // useEffect(() => {
    //     loginInApp();
    // }, [])

    return (
        <>
            <AnimatedLoading isVisible={userStoragedLoading} />
            <Text>SignIn</Text>
        </>
    );
}