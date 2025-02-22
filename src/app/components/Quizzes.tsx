import Link from 'next/link';
import postgres from 'postgres';
export default async function Quizzes() {
  const sql = postgres(process.env.DATABASE_URL as string);
  type Quiz = {
    quiz_id: number;
    description: string;
    title: string;
  };
  const quizzes = await sql<Quiz[]>`
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