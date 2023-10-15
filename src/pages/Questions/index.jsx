import * as S from './styles'
import { FlatList, Text, View } from 'react-native'
import { useEffect, useState } from 'react';
import { useStorage } from '../../hooks/useStorage';
import { LoadingModal } from '../../components/LoadingModal';
import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useIsFocused } from '@react-navigation/native';
import { Container } from '../../global/styles/globalComponents';

export function Questions(){
    const {fetchQuestions, loading} = useStorage()
    const [refreshing, setRefreshing] = useState(false);

    const [questions, setQuestions] = useState([])

    const { navigate } = useNavigation();
    const isFocused = useIsFocused();

    async function fetchQuestionsItems(){
        const questions = await fetchQuestions()

        setQuestions(questions)
    }

    useEffect(() => {
        if(isFocused){
            fetchQuestionsItems()
        }
    }, [isFocused])

    function onRefresh() {
        setRefreshing(true);
        fetchQuestionsItems()
        setRefreshing(false);
    }

    function RenderSubject(item){
        return(
            <S.ItemContainer
                onPress={() => {
                    navigate('question_details', {id: item.item.id})
                }}
            >
                <S.ItemTitle>{item.item.question}</S.ItemTitle>
            </S.ItemContainer>
        )
    }

    function RenderEmptyListMessage(){
        return(
            <View style={{ alignItems: "center" }}>
                <Text>No data found</Text>
            </View>
        )
    }

    return(
        <Container>
            <LoadingModal isVisible={!questions.length && loading} />
            <FlatList 
                data={questions}
                renderItem={RenderSubject}
                keyExtractor={(item) => item.id}
                ListEmptyComponent={RenderEmptyListMessage}
                onRefresh={onRefresh}
                refreshing={refreshing}
            />
            <S.CreateButton
                onPress={() => {
                    navigate('create_question')
                }}
            >
                <AntDesign name="plus" size={24} color="black" />
            </S.CreateButton>
        </Container>
    )
}