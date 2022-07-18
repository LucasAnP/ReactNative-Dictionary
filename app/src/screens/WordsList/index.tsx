import React, { useContext, useEffect, useMemo, useState } from 'react';

import { useTheme } from 'styled-components';
import { apiAllWords, dictionaryApi } from '../../services/api'
import { FlatList, StatusBar } from 'react-native';
import { AnimatedLoading } from '../../components/AnimatedLoading';
import { WordButton } from '../../components/WordButton';

import { Container, ListContainer, Title, TitleContainer } from './styles';
import { WordModal } from '../../components/WordModal';
import { AuthContext } from '../../AuthContext';
import { useAuth } from '../../hooks/auth';

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

    const { user } = useAuth();

    async function requestWord(word: string) {
        setLoading(true);
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
                            range: "0-50"
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
            {loading && <AnimatedLoading isVisible={loading} />}
            <StatusBar backgroundColor={colors.background} />
            {showWordModal &&
                <WordModal isVisible={showWordModal} setIsVisible={setShowWordModal} data={wordOpen} />}
            <Container>
                <TitleContainer>
                    <Title>Word List</Title>
                </TitleContainer>
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