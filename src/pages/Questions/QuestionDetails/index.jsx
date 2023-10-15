import { useState, useEffect } from 'react'
import { useIsFocused } from '@react-navigation/native';
import { useStorage } from '../../../hooks/useStorage';
import { LoadingModal } from '../../../components/LoadingModal';
import { useNavigation } from '@react-navigation/native';
import * as S from './styles'

export function QuestionDetails({ route }){
    const { id } = route.params;
    const {fetchQuestion, loading} = useStorage()
    const [ question, setQuestion ] = useState()
    const isFocused = useIsFocused();

    async function fetchQuestionItem(){
        const question = await fetchQuestion(id)

        setQuestion(question)
    }

    useEffect(() => {
        if(id){
            fetchQuestionItem()
        }
    }, [isFocused, id])

    return(
        <S.Container>
            <LoadingModal isVisible={loading} />
            <S.FieldLabel>Questão</S.FieldLabel>
            <S.FieldValue>{question?.question}</S.FieldValue>

            <S.FieldLabel>Alternativas</S.FieldLabel>
            {
                question?.answers.map((answer) => {
                    return (
                        <S.FieldValue key={answer}>{answer}</S.FieldValue>
                    )
                })
            }

            <S.FieldLabel>Alternativa correta</S.FieldLabel>
            <S.FieldValue>{`#${Number(question?.correct_answer)+1}`}</S.FieldValue>

        </S.Container>
    )
}