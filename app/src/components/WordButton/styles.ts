import styled from "styled-components/native";

import { RFValue, RFPercentage } from "react-native-responsive-fontsize";

export const Container = styled.View`
  flex: 1;
`;

export const WordBordered = styled.TouchableOpacity`
  width: ${RFPercentage(20)}px;

  margin: 5px;
  padding: 5px;

  align-items: center;
  justify-content: center;

  border: 0.3px solid ${({ theme }) => theme.colors.title};
  border-radius: 5px;
`;

export const WordText = styled.Text`
  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: ${RFValue(14)}px;

  color: ${({ theme }) => theme.colors.text_dark};

  text-align: left;
`;
