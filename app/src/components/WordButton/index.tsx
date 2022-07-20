import React, { memo } from "react";
import { TouchableOpacityProps } from "react-native";
import { WordBordered, WordText } from "./styles";

interface Props extends TouchableOpacityProps {
    word: string;
}

function WordButton({ word, ...rest }: Props) {
    return (
        <WordBordered {...rest}>
            <WordText>{word}</WordText>
        </WordBordered>
    );
}

// To memorize previous state, to set flatList faster.
export const Word = memo(WordButton, (prevProps, nextProps) => {
    return Object.is(prevProps.word, nextProps.word)
})