import * as S from './styles'
import { FlatList, Text, View } from 'react-native'
import { useEffect, useState } from 'react';
import { useStorage } from '../../hooks/useStorage';
import { LoadingModal } from '../../components/LoadingModal';
import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useIsFocused } from '@react-navigation/native';
import { Container } from '../../global/styles/globalComponents';

export function Subjects(){
    const {fetchSubjects, loading} = useStorage()
    const [refreshing, setRefreshing] = useState(false);

    const [subjects, setSubjects] = useState([])

    const { navigate } = useNavigation();
    const isFocused = useIsFocused();

    async function fetchSubjectItems(){
        const subjects = await fetchSubjects()

        setSubjects(subjects)
    }

    useEffect(() => {
        if(isFocused){
            fetchSubjectItems()
        }
    }, [isFocused])

    function onRefresh() {
        setRefreshing(true);
        fetchSubjectItems()
        setRefreshing(false);
    }

    function RenderSubject(item){
        return(
            <S.ItemContainer
                onPress={() => {
                    navigate('subject_details', {id: item.item.id})
                }}
            >
                <S.ItemTitle>{item.item.title}</S.ItemTitle>
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
            <LoadingModal isVisible={!subjects.length && loading} />
            <FlatList 
                data={subjects}
                renderItem={RenderSubject}
                keyExtractor={(item) => item.id}
                ListEmptyComponent={RenderEmptyListMessage}
                onRefresh={onRefresh}
                refreshing={refreshing}
            />
            <S.CreateButton
                onPress={() => {
                    navigate('create_subject')
                }}
            >
                <AntDesign name="plus" size={24} color="black" />
            </S.CreateButton>
        </Container>
    )
}