import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

import *  as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Alert, KeyboardAvoidingView, Platform, Text } from 'react-native';
import { AnimatedLoading } from '../../components/AnimatedLoading';
import { InputForm } from '../../components/Form/InputForm';
import { useAuth } from '../../hooks/auth';
import { Container, ContentContainer, InfoContainer, Title, TitleContainer } from './styles';
import ReactNativeModal from 'react-native-modal';
import { ApplyButton } from '../../components/ApplyButton';

interface WordData {
    name: string;
    phonetic: string;
    meaning: string;
}

interface FormData {
    email: string;
    password: string;
}

export function SignIn() {
    const { userStoragedLoading } = useAuth();
    const { login } = useAuth();

    const [data, setData] = useState({} as FormData);

    const schema = Yup.object().shape({
        email: Yup
            .string()
            .email("Please enter valid email")
            .required('Email Address is Required'),
        password: Yup
            .string()
            .min(6, ({ min }) => `Password must be at least ${min} characters`)
            .required('Password is required'),
    })

    const { control, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    });

    function handleRegister(form: FormData) {
        const userData = {
            email: form.email,
            password: form.password
        }
        setData(userData);
        login(userData);
    }


    return (
        <Container>
            <AnimatedLoading isVisible={userStoragedLoading} />
            <ReactNativeModal
                animationIn={"slideInUp"}
                animationInTiming={500}
                animationOut={"slideOutDFown"}
                animationInOut={500}
                isVisible={true}
            >
                <InfoContainer>
                    <TitleContainer>
                        <Title>Login</Title>
                    </TitleContainer>
                    <ContentContainer>
                        <InputForm
                            name={'email'}
                            control={control}
                            placeholder={'email'}
                            autoCapitalize={'none'}
                            autoCorrect={false}
                            keyboardType={'email-address'}
                            error={errors.email && errors.email.message}
                        />
                        <InputForm
                            name={'password'}
                            control={control}
                            placeholder={'password'}
                            autoCapitalize={'none'}
                            autoCorrect={false}
                            secureTextEntry={true}
                            error={errors.password && errors.password.message}
                        />
                    </ContentContainer>
                    <ApplyButton onPress={handleSubmit(handleRegister)} />
                </InfoContainer>
            </ReactNativeModal>
        </Container>
    );
}