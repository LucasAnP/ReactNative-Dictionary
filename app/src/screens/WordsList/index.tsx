import React, { useContext, useEffect, useMemo, useState } from 'react';

import { useTheme } from 'styled-components';
import { apiAllWords, dictionaryApi } from '../../services/api'
import { FlatList, StatusBar } from 'react-native';
import { AnimatedLoading } from '../../components/AnimatedLoading';
import { WordButton } from '../../components/WordButton';

import { Container, FloatContainer, ListContainer, Title, TitleContainer } from './styles';
import { WordModal } from '../../components/WordModal';
import { useAuth } from '../../hooks/auth';
import { MaterialIcons } from "@expo/vector-icons";
import { RFValue } from 'react-native-responsive-fontsize';

interface WordData {
    name: string;
    phonetic: string;
    meaning: string;
}

export function WordList() {
    const [words, setWords] = useState();
    const [loading, setLoading] = useState(false);

    const [wordOpen, setWordOpen] = useState<WordData>();
    const [showWordModal, setShowWordModal] = useState(false);

    const { colors } = useTheme();

    const { registerHistory, logout } = useAuth();

    async function requestWord(word: string) {
        setLoading(true);
        await registerHistory(word);
        try {
            const response = await dictionaryApi.get(`/${word}`);
            const formatedResponse: WordData = {
                name: word,
                phonetic: response.data[0].phonetic ? response.data[0].phonetic : '',
                meaning: response.data[0].meanings ? response.data[0].meanings[0].definitions[0].definition : ''

            }
            setWordOpen(formatedResponse);
            setShowWordModal(true);
        } catch (error) {
            console.warn(error)
        } finally {
            //If th request was ok or not, set the loading false
            setLoading(false);
        }
    }


    useEffect(() => {
        async function fetchWords() {
            setLoading(true);
            try {
                const response = await apiAllWords.get('/words?select=*',
                    {
                        headers: {
                            range: "0-200"
                        }
                    }
                );
                setWords(response.data);
            } catch (error) {
                console.warn(error)
            } finally {
                //If th request was ok or not, set the loading false
                setLoading(false);
            }
        }
        fetchWords()
    }, [])

    return (
        <>
            <AnimatedLoading isVisible={loading} />
            <StatusBar backgroundColor={colors.background} />
            {showWordModal &&
                <WordModal isVisible={showWordModal} setIsVisible={setShowWordModal} data={wordOpen} />}
            <Container>
                <TitleContainer>
                    <Title>Word List</Title>
                </TitleContainer>
                <FloatContainer onPress={logout}>
                    <MaterialIcons
                        name="logout"
                        size={RFValue(20)}
                        color={colors.background}
                    />
                </FloatContainer>
                <ListContainer>
                    <FlatList
                        data={words}
                        renderItem={({ item }) => (
                            <WordButton word={item.word} onPress={() => requestWord(item.word)} />
                        )}
                        keyExtractor={item => item.id}

                        numColumns={2}
                        horizontal={false}
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={{
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                        initialNumToRender={10}
                    />
                </ListContainer>
            </Container>

        </>
    );
}