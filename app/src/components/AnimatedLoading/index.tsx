import React from "react";

import { AnimatedModal, Container, LottieIcon } from "./styles";

interface Props {
    isVisible: boolean;
}

export function AnimatedLoading({ isVisible }: Props) {
    return (
        <>
            {isVisible && (
                <Container>
                    <LottieIcon
                        autoPlay
                        loop
                        source={require("../../assets/lottie/Animated-Loading")}
                    />
                </Container>
            )}
        </>
    );
}
