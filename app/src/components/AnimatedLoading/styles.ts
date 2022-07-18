import styled from "styled-components/native";

import AnimatedLottieView from "lottie-react-native";
import ReactNativeModal from "react-native-modal";
import { RFValue } from "react-native-responsive-fontsize";

export const Container = styled.View`
  flex: 1;
`;

export const AnimatedModal = styled(ReactNativeModal)`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

export const LottieIcon = styled(AnimatedLottieView)`
  width: ${RFValue(200)}px;
  height: ${RFValue(200)}px;
`;
