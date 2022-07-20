import { RFValue } from "react-native-responsive-fontsize";
import styled from "styled-components/native";

export const Container = styled.SafeAreaView`
  flex: 1;

  justify-content: center;
  align-items: center;

  background-color: ${({ theme }) => theme.colors.background};
`;

export const TitleContainer = styled.View`
  width: 100%;
  height: 10%;

  align-items: center;
  justify-content: center;
`;

export const Title = styled.Text`
  font-family: ${({ theme }) => theme.fonts.bold};
  font-size: ${RFValue(18)}px;

  color: ${({ theme }) => theme.colors.title};
`;

export const FooterEndText = styled.Text`
  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: ${RFValue(18)}px;

  color: ${({ theme }) => theme.colors.text};
`;

export const ListContainer = styled.View`
  flex: 1;

  justify-content: center;
`;

export const FloatContainer = styled.TouchableOpacity`
  width: ${RFValue(40)}px;
  height: ${RFValue(40)}px;

  background-color: ${({ theme }) => theme.colors.title};
  border-radius: 80px;

  align-items: center;
  justify-content: center;

  position: absolute;

  top: 2%;
  right: 5%;
`;

export const FooterContainer = styled.View`
  height: 50px;
  width: 100%;
  align-items: center;
  justify-content: center;
  margin: 0 10px;
`;
