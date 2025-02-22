import { Suspense } from 'react';
import Quizzes from './components/Quizzes';
import QuizForm from './quiz/quiz-form';
export default function Home() {
  return (
    <section>
      <h1 className='font-2xl font-semibold text-blue-700'>All Quizzes</h1>
      <Suspense fallback={<p>loading...</p>}>
        <Quizzes />
        <QuizForm />
      </Suspense>
    </section>
  );
}
