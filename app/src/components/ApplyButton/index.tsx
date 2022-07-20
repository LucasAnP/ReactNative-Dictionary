import React from 'react';
import { TouchableOpacityProps } from 'react-native';

import { Container, Title } from './styles';

type Props = TouchableOpacityProps;

export function ApplyButton({ ...rest }: Props) {
    return (
        <Container {...rest}>
            <Title>Apply</Title>
        </Container>
    )
}