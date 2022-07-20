import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
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

export const ListContainer = styled.View`
  flex: 1;

  justify-content: center;
`;

export const WordBordered = styled.TouchableOpacity`
  width: ${RFPercentage(40)}px;

  margin: 5px;
  padding: 5px;

  align-items: center;
  justify-content: center;

  border: 0.3px solid ${({ theme }) => theme.colors.title};
  border-radius: 5px;
`;

export const WordText = styled.Text`
  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: ${RFValue(16)}px;

  color: ${({ theme }) => theme.colors.text_dark};

  text-align: left;
`;
