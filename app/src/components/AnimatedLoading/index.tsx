import React from "react";

import { AnimatedModal, Container, LottieIcon } from "./styles";

interface Props {
    isVisible: boolean;
}

export function AnimatedLoading({ isVisible }: Props) {
    return (
        <Container>
            <AnimatedModal isVisible={isVisible} >
                <LottieIcon
                    autoPlay
                    loop
                    source={require("../../assets/lottie/Animated-Loading")}
                />
            </AnimatedModal>
        </Container>
    );
}
