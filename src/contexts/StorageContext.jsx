import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useState } from 'react';

export const StorageContext = createContext({});

export function StorageProvider({ children }) {
  const [loading, setLoading] = useState(false);

  async function fetchSubjects() {
    setLoading(true);
    try {
      const subjects = JSON.parse(await AsyncStorage.getItem('@subjects'));

      return subjects;
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  }

  async function fetchSubject(subject_id) {
    setLoading(true);
    try {
      const subjects = JSON.parse(await AsyncStorage.getItem('@subjects'));

      const subject = subjects.find((subject) => subject.id === subject_id);

      const questions = JSON.parse(await AsyncStorage.getItem('@questions'));

      const subjects_questions = [];

      questions?.forEach((question) => {
        const find_subject = question.subjects.find((elem) => elem === subject.id);

        if (find_subject) {
          subjects_questions.push(question);
        }
      });

      const subject_formatted = {
        ...subject,
        questions: subjects_questions,
      };

      return subject_formatted;
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  }

  async function fetchSubjectByTitle(subject_title) {
    setLoading(true);
    try {
      const subjects = JSON.parse(await AsyncStorage.getItem('@subjects'));

      const subject = subjects.find((subject) => subject.title === subject_title);

      const questions = JSON.parse(await AsyncStorage.getItem('@questions'));

      const subjects_questions = [];

      questions.forEach((question) => {
        const find_subject = question.subjects.find((elem) => elem === subject.id);

        if (find_subject) {
          subjects_questions.push(question);
        }
      });

      const subject_formatted = {
        ...subject,
        questions: subjects_questions,
      };

      return subject_formatted;
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  }

  async function addSubject(subject) {
    try {
      setLoading(true);
      let subjects = JSON.parse(await AsyncStorage.getItem('@subjects'));

      if (subjects) {
        subjects.push(subject);
      } else {
        subjects = [subject];
      }

      await AsyncStorage.setItem('@subjects', JSON.stringify(subjects));

      return subjects;
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  }

  async function saveSubject(subject) {
    setLoading(true);
    try {
      const subjects = JSON.parse(await AsyncStorage.getItem('@subjects'));

      const new_subjects = subjects.filter((subj) => subj.id !== subject.id);

      new_subjects.push(subject);

      await AsyncStorage.setItem('@subjects', JSON.stringify(new_subjects));
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  }

  async function dissociateQuestionFromSubject(subject_id, question_id) {
    const question = await fetchQuestion(question_id);

    question.subjects = question.subjects.filter((subject) => subject !== subject_id);

    await saveQuestion(question);
  }

  async function fetchQuestions() {
    setLoading(true);
    try {
      const questions = JSON.parse(await AsyncStorage.getItem('@questions'));

      return questions;
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  }

  async function addQuestion(question) {
    setLoading(true);
    try {
      let questions = JSON.parse(await AsyncStorage.getItem('@questions'));

      if (questions && questions.length) {
        questions.push(question);
      } else {
        questions = [question];
      }

      await AsyncStorage.setItem('@questions', JSON.stringify(questions));

      return questions;
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  }

  async function saveQuestion(question) {
    setLoading(true);
    try {
      const questions = JSON.parse(await AsyncStorage.getItem('@questions'));

      const new_questions = questions.filter((quest) => quest.id !== question.id);

      new_questions.push(question);

      await AsyncStorage.setItem('@questions', JSON.stringify(new_questions));
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  }

  async function fetchQuestion(question_id) {
    setLoading(true);
    try {
      const questions = JSON.parse(await AsyncStorage.getItem('@questions'));

      const question = questions.find((question) => question.id === question_id);

      return question;
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  }

  async function saveQuestion(question) {
    setLoading(true);
    try {
      const questions = JSON.parse(await AsyncStorage.getItem('@questions'));

      const new_questions = questions.filter((quest) => quest.id !== question.id);

      new_questions.push(question);

      await AsyncStorage.setItem('@questions', JSON.stringify(new_questions));
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  }

  async function addExam(exam) {
    setLoading(true);
    try {
      let exams = JSON.parse(await AsyncStorage.getItem('@exams'));

      if (exams) {
        exams.push(exam);
      } else {
        exams = [exam];
      }

      await AsyncStorage.setItem('@exams', JSON.stringify(exams));

      return exams;
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  }

  async function fetchExam(exam_id) {
    setLoading(true);
    try {
      const exams = JSON.parse(await AsyncStorage.getItem('@exams'));

      const exam = exams.find((exam) => exam.id === exam_id);

      return exam;
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <StorageContext.Provider
      value={{
        fetchSubjects,
        fetchSubject,
        fetchSubjectByTitle,
        addSubject,
        saveSubject,
        fetchQuestions,
        addQuestion,
        fetchQuestion,
        addExam,
        fetchExam,
        dissociateQuestionFromSubject,
        saveQuestion,
        loading,
      }}>
      {children}
    </StorageContext.Provider>
  );
}
