import styled from 'styled-components/native';

export const Container = styled.View`
    flex: 1;
    padding: 20px;
`

export const FieldLabel = styled.Text`
    font-size: 16px;
    font-weight: bold;
`

export const FieldValue = styled.Text`
    font-size: 16px;
`

export const QuestionsHeader = styled.View`
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-direction: row;
`

export const CreateQuestionButton = styled.TouchableOpacity`
    width: 30px;
    height: 30px;
    border-radius: 50px;
    border-style: solid;
    border-color: gray;
    border-width: 1px;
    background-color: white;

    display: flex;
    align-items: center;
    justify-content: center;
`