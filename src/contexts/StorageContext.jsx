import React, {
    createContext,
    useState,
} from 'react';

import AsyncStorage from '@react-native-async-storage/async-storage';

export const StorageContext = createContext({});

export function StorageProvider({children}) {
    const [loading, setLoading] = useState(false);

    async function fetchSubjects(){
        setLoading(true)
        try{
            const subjects = JSON.parse(await AsyncStorage.getItem('@subjects'))

            setLoading(false)
            return subjects
        }catch(err){
            console.log(err)
        }
    }

    async function addSubject(subject){
        setLoading(true)
        try{
            let subjects = JSON.parse(await AsyncStorage.getItem('@subjects'))

            if(subjects){
                subjects.push(subject)
            }else{
                subjects = [subject]
            }

            await AsyncStorage.setItem('@subjects', JSON.stringify(subjects))
            setLoading(false)
            return subjects
        }catch(err){
            console.log(err)
        }
    }

    return (
        <StorageContext.Provider value={{ fetchSubjects, addSubject, loading }}>
            {children}
        </StorageContext.Provider>
    )
}