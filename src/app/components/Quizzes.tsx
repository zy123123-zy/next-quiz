import Link from 'next/link';
import postgres from 'postgres';
export default async function Quizzes() {
  const sql = postgres(process.env.DATABASE_URL);
  type Quiz = {
    quiz_id: number;
    description: string;
    title: string;
  };
  const quizzes: Quiz[] = await sql`
    SELECT quiz_id, description, title FROM quizzes
  `;
  // const quizzes = [
  //   { quiz_id: 1, title: 'Quiz 1' },
  //   { quiz_id: 2, title: 'Quiz 2' },
  //   { quiz_id: 3, title: 'Quiz 3' }
  // ]
  console.log(`%c======================== %cQuizzes-17 %c========================>`, 'color: #9089e3', 'color: #5e8d0a', 'color: #9089e3');
  console.log('quizzes :', quizzes);
  console.log(`%c======================== %cQuizzes-17 %c========================>`, 'color: #9089e3', 'color: #5e8d0a', 'color: #9089e3');
  return (
    <ul>
      {quizzes.map((quiz) => (
        <li key={quiz.quiz_id}>
          {/* <Link href={`/quiz/${quiz.quiz_id}`}>1</Link> */}
          <Link href={`/quiz/${quiz.quiz_id}`}>
            {quiz.description}
          </Link>
        </li>
      ))}
    </ul>
  );
}