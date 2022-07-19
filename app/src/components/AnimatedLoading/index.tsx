import React from "react";

import LottieView from "lottie-react-native";
import { AnimatedModal, LottieIcon } from "./styles";

interface Props {
    isVisible: boolean;
}

export function AnimatedLoading({ isVisible }: Props) {
    return (
        <AnimatedModal isVisible={isVisible} >
            <LottieIcon
                autoPlay
                loop
                source={require("../../assets/lottie/Animated-Loading")}
            />
        </AnimatedModal>
    );
}
