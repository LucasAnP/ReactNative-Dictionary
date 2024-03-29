import AnimatedLottieView from 'lottie-react-native';
import React from 'react';

import { Container, Title } from './styles';

interface SplashProps {
    onLayout: () => void;
}

export function Splash({ onLayout }: SplashProps) {
    return (
        <Container onLayout={onLayout}>
            <AnimatedLottieView autoPlay
                loop
                style={{
                    width: 200,
                    height: 200,
                }}
                source={require('../../../src/assets/lottie/Animated-Splash.json')}
            />
            <Title>Dictionary</Title>
        </Container>
    )
}