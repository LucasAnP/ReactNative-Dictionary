import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import styled from "styled-components/native";

export const Container = styled.SafeAreaView`
  flex: 1;

  align-items: center;
  justify-content: flex-start;
  flex-direction: column-reverse;

  background-color: ${({ theme }) => theme.colors.primary};
`;

export const InfoContainer = styled.View`
  width: 100%;
  height: ${RFPercentage(40)}px;
  min-height: ${RFPercentage(40)}px;

  align-items: center;
  justify-content: center;

  border-radius: 15px;
  background-color: ${({ theme }) => theme.colors.background};
`;

export const TitleContainer = styled.View`
  width: 90%;
  height: 20%;

  align-items: flex-start;
  justify-content: flex-start;
`;

export const Title = styled.Text`
  font-family: ${({ theme }) => theme.fonts.bold};
  font-size: ${RFValue(30)}px;

  color: ${({ theme }) => theme.colors.title};
`;

export const ContentContainer = styled.View`
  width: 100%;
  height: 70%;

  align-items: center;
  justify-content: flex-start;
`;
