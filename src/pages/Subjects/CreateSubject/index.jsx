import { TextField } from "../../../components/TextInput";
import { Button, Alert } from 'react-native'
import { useForm } from 'react-hook-form'
import { object, string } from 'yup';
import * as S from './styles'
import { useEffect } from "react";
import { yupResolver } from '@hookform/resolvers/yup';
import { uid } from 'uid';
import { LoadingModal } from '../../../components/LoadingModal';
import { useStorage } from '../../../hooks/useStorage';
import { useNavigation } from '@react-navigation/native';
import { Container } from '../../../global/styles/globalComponents';

const schema = object({
    title: string()
    .required('O campo de título não pode ser vazio.'),
    description: string()
    .required('O campo de descrição não pode ser vazio.')
})

export function CreateSubject(){
    const { addSubject, loading} = useStorage()
    const { register, setValue, handleSubmit, formState:{ errors } } = useForm({
        resolver: yupResolver(schema)
    })
    const { navigate } = useNavigation();

    useEffect(() => {
        register('title')
        register('description')
    }, [register])

    async function onSubmit(data){
        const subject = {
            id: uid(),
            ...data,
            questions: []
        }

        await addSubject(subject)

        navigate('Matérias')
    }

    return(
        <Container>
            <LoadingModal isVisible={loading} />
            <TextField 
                label={'Título'}
                error={errors?.title}
                placeholder={'Ex.: Português ENEM'}
                onChangeText={text => setValue('title', text)}
            />
            <TextField 
                label={'Descrição'}
                error={errors?.description}
                placeholder={'Ex.: Questões de portugues ENEM'}
                onChangeText={text => setValue('description', text)}
            />
            <Button   
                onPress={handleSubmit(onSubmit)}
                title="Criar matéria"
                color="#1969d3"
            />
        </Container>
    )
}