import React, { useState } from 'react';

import { useTheme } from 'styled-components';
import { FlatList, StatusBar } from 'react-native';
import { AnimatedLoading } from '../../components/AnimatedLoading';
import { WordButton } from '../../components/WordButton';

import { Container, ListContainer, Title, TitleContainer } from './styles';
import { WordModal } from '../../components/WordModal';
import { useAuth } from '../../hooks/auth';
import { dictionaryApi } from '../../services/api';

interface WordData {
    name: string;
    phonetic: string;
    meaning: string;
    favorite: boolean;
}

export function Favorites() {
    const [words, setWords] = useState();
    const [loading, setLoading] = useState(false);

    const [wordOpen, setWordOpen] = useState<WordData>();
    const [showWordModal, setShowWordModal] = useState(false);

    const { colors } = useTheme();

    const { user } = useAuth();

    async function requestWord(word: string) {
        try {
            const response = await dictionaryApi.get(`/${word}`);
            setLoading(true);
            const formatedResponse: WordData = {
                name: word,
                phonetic: response.data[0].phonetic ? response.data[0].phonetic : '',
                meaning: response.data[0].meanings ? response.data[0].meanings[0].definitions[0].definition : '',
                favorite: true
            }
            setWordOpen(formatedResponse);
            setShowWordModal(true);
        } catch (error) {
            console.warn('Error when get the words', error)
        } finally {
            //If th request was ok or not, set the loading false
            setLoading(false);
        }
    }

    return (
        <>
            {loading && <AnimatedLoading isVisible={loading} />}
            <StatusBar backgroundColor={colors.background} />
            {showWordModal &&
                <WordModal isVisible={showWordModal} setIsVisible={setShowWordModal} data={wordOpen} />}
            <Container>
                <TitleContainer>
                    <Title>Favorites</Title>
                </TitleContainer>
                <ListContainer>
                    <FlatList
                        data={user.favorites}
                        renderItem={({ item }) => (
                            <WordButton word={item} onPress={
                                () => requestWord(item)
                            } />
                        )}
                        keyExtractor={(item, index) => item[index]}

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