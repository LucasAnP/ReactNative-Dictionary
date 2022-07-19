import React, { useEffect, useState } from "react";

import { AnimatedModal, CloseButtonContainer, MeaningsContainer, MeaningsText, MeaningsTitleContainer, ModalContainer, PhoneticSelectedText, Title, TopButtonsContainer, WordContainer, WordSelectedText } from "./styles";
import { MaterialIcons } from "@expo/vector-icons";
import { RFValue } from "react-native-responsive-fontsize";
import { useTheme } from "styled-components";
import { TouchableOpacity } from "react-native";
import { useAuth } from "../../hooks/auth";
import { AnimatedLoading } from "../AnimatedLoading";

interface WordData {
    name: string;
    phonetic: string;
    meaning: string;
    favorite?: boolean;
    history?: boolean;
}

interface Props {
    isVisible: boolean;
    setIsVisible: (visible: boolean) => void;
    data: WordData;
}

export function WordModal({ isVisible, setIsVisible, data }: Props) {
    const { colors } = useTheme();
    const [starFilled, setStarFilled] = useState(false);

    const { user, favoriteWord, unfavoritWord, userRequestLoading } = useAuth();

    function closeModal() {
        setIsVisible(!isVisible);
    }

    useEffect(() => {
        if (data.favorite) {
            setStarFilled(true);
        } else {
            user.favorites.forEach((value) => {
                if (value === data.name) {
                    setStarFilled(true);
                }
            })
        }

    }, [])

    function onPressStar() {
        if (data.favorite && starFilled) {
            unfavoritWord(data.name);
            setStarFilled(false);
            closeModal();
        } else {
            setStarFilled(!starFilled);
            favoriteWord(data.name);
        }
        if (starFilled && !(data.favorite || data.history)) {
            favoriteWord(data.name);
        }
    }

    return (
        <AnimatedModal isVisible={isVisible}
            animationIn={"slideInUp"}
            animationInTiming={500}
            animationOut={"slideOutDFown"}
            animationInOut={500}
        >
            <AnimatedLoading isVisible={userRequestLoading} />
            <ModalContainer>
                <TopButtonsContainer>
                    <CloseButtonContainer onPress={closeModal}>
                        <MaterialIcons
                            name="close"
                            size={RFValue(20)}
                            color={colors.background}
                        />
                    </CloseButtonContainer>
                    <TouchableOpacity onPress={onPressStar} disabled={starFilled && !data.favorite}>
                        <MaterialIcons
                            name={starFilled ? "star" : "star-outline"}
                            size={RFValue(35)}
                            color={starFilled ? colors.secondary : colors.title}
                        />
                    </TouchableOpacity>
                </TopButtonsContainer>

                <WordContainer>
                    <WordSelectedText>{data.name}</WordSelectedText>
                    <PhoneticSelectedText>{data.phonetic}</PhoneticSelectedText>
                </WordContainer>

                <MeaningsTitleContainer>
                    <Title>Meanings</Title>
                </MeaningsTitleContainer>

                <MeaningsContainer>
                    <MeaningsText>{data.meaning}</MeaningsText>
                </MeaningsContainer>

            </ModalContainer>
        </AnimatedModal>
    );
}
