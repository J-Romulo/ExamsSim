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

export const ItemContainer = styled.TouchableOpacity`
    width: 100%;
    height: 70px;
    border-radius: 20px;
    border-style: solid;
    border-width: 1px;

    margin-bottom: 20px;

    display: flex;
    align-items: center;
    justify-content: center;
`

export const ItemTitle = styled.Text`
    font-size: 20px;
    color: black;
`