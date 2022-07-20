import styled from "styled-components/native";

import AnimatedLottieView from "lottie-react-native";
import ReactNativeModal from "react-native-modal";
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";

export const Container = styled.View`
  width: ${RFPercentage(100)}px;
  height: ${RFPercentage(105)}px;

  position: absolute;
  z-index: 2;

  align-items: center;
  justify-content: center;

  background-color: rgba(1, 1, 1, 0.7);
`;

export const LottieIcon = styled(AnimatedLottieView)`
  width: ${RFValue(150)}px;
  height: ${RFValue(150)}px;
`;
