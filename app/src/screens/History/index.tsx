import React, { useEffect, useState } from "react";

import { useTheme } from "styled-components";
import { FlatList, StatusBar } from "react-native";
import { WordButton } from "../../components/WordButton";

import { Container, ListContainer, Title, TitleContainer, WordBordered, WordText } from "./styles";
import { WordModal } from "../../components/WordModal";
import { useAuth } from "../../hooks/auth";
import { dictionaryApi } from "../../services/api";

interface WordData {
    name: string;
    phonetic: string;
    meaning: string;
    history: boolean;
}

export function History() {
    const [loading, setLoading] = useState(false);

    const [wordOpen, setWordOpen] = useState<WordData>();
    const [showWordModal, setShowWordModal] = useState(false);

    const [refreshing, setRefreshing] = useState<boolean>(false);

    const { colors } = useTheme();

    const { user, getUserById } = useAuth();

    async function getUserData() {
        setRefreshing(true);
        await getUserById();
        setRefreshing(false);
    }

    function onRefresh() {
        setRefreshing(true);
        getUserData();
    }

    async function requestWord(word: string) {
        try {
            const response = await dictionaryApi.get(`/${word}`);
            setLoading(true);
            const formatedResponse: WordData = {
                name: word,
                phonetic: response.data[0].phonetic ? response.data[0].phonetic : "",
                meaning: response.data[0].meanings
                    ? response.data[0].meanings[0].definitions[0].definition
                    : "",
                history: true
            };
            setWordOpen(formatedResponse);
            setShowWordModal(true);
        } catch (error) {
            console.warn("Error when get the words", error);
        } finally {
            //If th request was ok or not, set the loading false
            setLoading(false);
        }
    }

    // Refresh user when favorite
    useEffect(() => {
        getUserData();
    }, []);

    return (
        <>
            {showWordModal && (
                <WordModal
                    isVisible={showWordModal}
                    setIsVisible={setShowWordModal}
                    data={wordOpen}
                />
            )}
            <Container>
                <TitleContainer>
                    <Title>History</Title>
                </TitleContainer>
                <ListContainer>
                    <FlatList
                        data={user.history}
                        renderItem={({ item }) => (
                            <WordBordered onPress={() => requestWord(item)}>
                                <WordText>{item}</WordText>
                            </WordBordered>
                        )}
                        keyExtractor={(item, index) => item[index]}
                        horizontal={false}
                        showsVerticalScrollIndicator={false}
                        onRefresh={onRefresh}
                        refreshing={refreshing}
                        contentContainerStyle={{
                            justifyContent: "center",
                            alignItems: "center",
                        }}
                        initialNumToRender={10}
                    />
                </ListContainer>
            </Container>
        </>
    );
}
