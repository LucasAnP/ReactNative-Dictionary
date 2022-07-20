import styled from "styled-components/native";

import ReactNativeModal from "react-native-modal";
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";

export const Container = styled.View`
  flex: 1;
`;

export const AnimatedModal = styled(ReactNativeModal)`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

export const ModalContainer = styled.View`
  width: ${RFPercentage(48)}px;
  height: ${RFPercentage(65)}px;

  border-radius: 5px;

  background-color: ${({ theme }) => theme.colors.background};

  align-items: center;
`;

export const TopButtonsContainer = styled.View`
  width: 90%;
  height: 13%;

  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

//CloseButton
export const CloseButtonContainer = styled.TouchableOpacity`
  width: ${RFValue(30)}px;
  height: ${RFValue(30)}px;

  border-radius: 80px;

  align-items: center;
  justify-content: center;

  background-color: ${({ theme }) => theme.colors.title};
`;

export const WordContainer = styled.View`
  height: 35%;
  width: 90%;

  border-radius: 5px;

  padding: 30px 0;

  align-items: center;
  justify-content: space-around;

  background-color: ${({ theme }) => theme.colors.secondary_light};
`;

export const WordSelectedText = styled.Text`
  font-family: ${({ theme }) => theme.fonts.medium};
  font-size: ${RFValue(25)}px;

  color: ${({ theme }) => theme.colors.text_dark};
`;

export const PhoneticSelectedText = styled.Text`
  font-family: ${({ theme }) => theme.fonts.medium};
  font-size: ${RFValue(25)}px;

  color: ${({ theme }) => theme.colors.text};
`;

export const MeaningsTitleContainer = styled.View`
  height: 10%;
  width: 90%;

  margin-top: 20px;
`;

export const Title = styled.Text`
  font-family: ${({ theme }) => theme.fonts.bold};
  font-size: ${RFValue(22)}px;

  color: ${({ theme }) => theme.colors.title};
`;

export const MeaningsContainer = styled.View`
  height: 20%;
  width: 90%;

  justify-content: center;
`;

export const MeaningsText = styled.Text`
  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: ${RFValue(18)}px;
  text-align: justify;

  color: ${({ theme }) => theme.colors.text};
`;
