import React, { useMemo, useState } from 'react';

import { useTheme } from 'styled-components';
import { apiAllWords, dictionaryApi } from '../../services/api'
import { FlatList, StatusBar } from 'react-native';
import { AnimatedLoading } from '../../components/AnimatedLoading';
import { WordButton } from '../../components/WordButton';

import { Container, ListContainer, Title, TitleContainer } from './styles';

export function WordList() {
    const [words, setWords] = useState();
    const [loading, setLoading] = useState(false);

    const { colors } = useTheme();

    async function requestWord(word: string) {
        setLoading(true);
        console.log('palavra', word)
        try {
            const response = await dictionaryApi.get(`/${word}`);
            console.log('response', response.data);
        } catch (error) {
            console.log(error)
        } finally {
            //If th request was ok or not, set the loading false
            setLoading(false);
        }
    }

    useMemo(() => {
        async function fetchWords() {
            setLoading(true);
            try {
                const response = await apiAllWords.get('/words?select=*',
                    {
                        headers: {
                            range: "0-100"
                        }
                    }
                );
                setWords(response.data);
            } catch (error) {
                console.log(error)
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
            <Container>
                <TitleContainer>
                    <Title>Listagem de Palavras</Title>
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