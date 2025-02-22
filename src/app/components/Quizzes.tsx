import Link from 'next/link';
import postgres from 'postgres';
export default async function Quizzes() {
  // const sql = ;
  type Quiz = {
    quiz_id: number;
    description: string;
    title: string;
  };
  const quizzes = await postgres(process.env.DATABASE_URL)<Quiz[]>`
    SELECT quiz_id, description, title FROM quizzes
  `;
  return (
    <ul>
      {quizzes.map((quiz) => (
        <li key={quiz.quiz_id}>
          <Link href={`/quiz/${quiz.quiz_id}`}>
            {quiz.description}
          </Link>
        </li>
      ))}
    </ul>
  );
}