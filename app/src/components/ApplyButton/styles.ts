import styled from "styled-components/native";
import { RFValue } from "react-native-responsive-fontsize";

export const Container = styled.TouchableOpacity`
  width: 40%;
  height: ${RFValue(34)}px;

  position: absolute;
  bottom: 2%;

  align-items: center;
  justify-content: center;

  background-color: ${({ theme }) => theme.colors.secondary};

  border-radius: 10px;

  align-self: center;
`;

export const Title = styled.Text`
  font-family: ${({ theme }) => theme.fonts.medium};
  font-size: ${RFValue(18)}px;

  color: ${({ theme }) => theme.colors.shape};
`;
