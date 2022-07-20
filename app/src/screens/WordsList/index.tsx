import React, { useContext, useEffect, useMemo, useState } from 'react';

import { useTheme } from 'styled-components';
import { apiAllWords, dictionaryApi } from '../../services/api'
import { ActivityIndicator, FlatList, StatusBar } from 'react-native';
import { AnimatedLoading } from '../../components/AnimatedLoading';
import { WordButton } from '../../components/WordButton';

import { Container, FloatContainer, FooterContainer, FooterEndText, ListContainer, Title, TitleContainer } from './styles';
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
    const [words, setWords] = useState([]);
    const [loading, setLoading] = useState(false);

    const [wordOpen, setWordOpen] = useState<WordData>();
    const [showWordModal, setShowWordModal] = useState(false);

    const { logout, registerHistory } = useAuth();

    const [initialBase, setInitialBase] = useState(0);
    const [finalBase, setFinalBase] = useState(200);

    const [refreshLoading, setRefreshLoading] = useState(false);
    const [listIsEnd, setListIsEnd] = useState(false);

    const { colors } = useTheme();

    // To save request in cache
    const [requestedsWords, setRequestedsWords] = useState([]);
    const [requestedContainsInCache, setRequestedContainsInCache] = useState(false);

    async function requestWord(word: string) {
        setLoading(true);
        await registerHistory(word);

        //If the word is in cache, dont do the request to API
        let finded = requestedsWords.find((object) => {
            if (object.name == word) {
                const formatedResponse: WordData = {
                    name: object.name,
                    phonetic: object.phonetic,
                    meaning: object.meaning

                }
                setWordOpen(formatedResponse);
                setShowWordModal(true);
                return true;
            } else {
                return false;
            }
        });

        finded && setRequestedContainsInCache(true);
        setLoading(false);

        //If the word isnt in cache, do the request to Library API
        if (!requestedContainsInCache) {
            try {
                const response = await dictionaryApi.get(`/${word}`);
                const formatedResponse: WordData = {
                    name: word,
                    phonetic: response.data[0].phonetic ? response.data[0].phonetic : '',
                    meaning: response.data[0].meanings ? response.data[0].meanings[0].definitions[0].definition : ''

                }
                requestedsWords.length > 0
                    ? setRequestedsWords([...requestedsWords, formatedResponse])
                    : setRequestedsWords([formatedResponse])
                setWordOpen(formatedResponse);
                setShowWordModal(true);
            } catch (error) {
                console.warn(error)
            } finally {
                //If th request was ok or not, set the loading false
                setLoading(false);
            }
        }


    }

    async function fetchWords() {
        setLoading(true);
        setRefreshLoading(true)
        if (finalBase <= 3000) {
            try {
                const response = await apiAllWords.get('/words?select=*',
                    {
                        headers: {
                            range: `${initialBase}-${finalBase}`
                        }
                    }
                );
                let arrayConcat = [];
                if (words.length > 0) {
                    arrayConcat = words.concat(response.data);
                } else {
                    arrayConcat = response.data;
                }

                // Do the pagination 0 ~ 200 / 201 ~ 400
                setInitialBase(initialBase + 201);
                setFinalBase(finalBase + 200);
                setWords(arrayConcat);
            } catch (error) {
                console.warn(error)
            } finally {
                //If th request was ok or not, set the loading false
                setLoading(false);
                setRefreshLoading(false)
            }
        } else {
            setListIsEnd(true);
            setLoading(false);
            setRefreshLoading(false)
        }
    }

    useEffect(() => {
        fetchWords()
    }, [])

    function renderFooter() {
        return (
            <FooterContainer>
                {refreshLoading && <ActivityIndicator size={30} />}
                {listIsEnd && <FooterEndText>End</FooterEndText>}
            </FooterContainer>
        )
    }

    return (
        <>
            <StatusBar backgroundColor={colors.background} />
            {showWordModal &&
                <WordModal isVisible={showWordModal} setIsVisible={setShowWordModal} data={wordOpen} />}
            <Container>
                <AnimatedLoading isVisible={loading} />
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
                            zIndex: 2
                        }}
                        onEndReached={fetchWords}
                        ListFooterComponent={renderFooter}
                    />
                </ListContainer>
            </Container>

        </>
    );
}