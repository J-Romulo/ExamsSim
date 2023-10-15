import { useState, useEffect } from 'react'
import { useIsFocused } from '@react-navigation/native';
import { useStorage } from '../../../hooks/useStorage';
import { LoadingModal } from '../../../components/LoadingModal';
import { FlatList, Text, View } from 'react-native'
import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import * as S from './styles'
import { Container } from '../../../global/styles/globalComponents';

export function SubjectDetails({ route }){
    const { id } = route.params;
    const {fetchSubject, loading} = useStorage()
    const [ subject, setSubject ] = useState()
    const [refreshing, setRefreshing] = useState(false);

    const isFocused = useIsFocused();
    const { navigate } = useNavigation();

    async function fetchSubjectItem(){
        const subject = await fetchSubject(id)

        setSubject(subject)
    }

    useEffect(() => {
        if(id){
            fetchSubjectItem()
        }
    }, [isFocused, id])

    function onRefresh() {
        setRefreshing(true);
        fetchSubjectItem()
        setRefreshing(false);
    }

    function RenderQuestion(item){
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
            <LoadingModal isVisible={loading} />
            <S.FieldLabel>Título</S.FieldLabel>
            <S.FieldValue>{subject?.title}</S.FieldValue>

            <S.FieldLabel>Descrição</S.FieldLabel>
            <S.FieldValue>{subject?.description}</S.FieldValue>

            <S.QuestionsHeader>
                <S.FieldLabel>Questões associadas</S.FieldLabel>
                <S.CreateQuestionButton
                    onPress={() => {
                        navigate('create_question', {id_subject: subject?.id})
                    }}
                >
                    <AntDesign name="plus" size={12} color="black" />
                </S.CreateQuestionButton>
            </S.QuestionsHeader>
            <FlatList 
                data={subject?.questions}
                renderItem={RenderQuestion}
                keyExtractor={(item) => item.id}
                ListEmptyComponent={RenderEmptyListMessage}
                onRefresh={onRefresh}
                refreshing={refreshing}
            />
        </Container>
    )
}