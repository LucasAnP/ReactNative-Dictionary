import styled from "styled-components/native";
import { RFValue } from "react-native-responsive-fontsize";
import { TextInput } from "react-native";

export const Container = styled.View`
  width: 95%;
  align-items: center;

  margin-top: 10px;
`;

export const Error = styled.Text`
  color: ${({ theme }) => theme.colors.attention};
  font-size: ${RFValue(14)}px;
  font-family: ${({ theme }) => theme.fonts.regular};

  margin: 7px;
`;
