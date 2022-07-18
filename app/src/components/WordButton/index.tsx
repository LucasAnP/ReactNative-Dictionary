import React from "react";
import { TouchableOpacityProps } from "react-native";
import { WordBordered, WordText } from "./styles";

interface Props extends TouchableOpacityProps {
    word: string;
}

export function WordButton({ word, ...rest }: Props) {
    return (
        <WordBordered {...rest}>
            <WordText>{word}</WordText>
        </WordBordered>
    );
}
