import postgres from 'postgres';
import { redirect } from 'next/navigation';
// type Props = {
//   params: Promise<{ id: string }>;
// };
const sql = postgres(process.env.DATABASE_URL as string);
// type QuizItem = {
//   quiz_id: number;
//   name: string;
//   title: string;
// };
async function Quiz({ id, show }: { id: string, show?: string }) {
  const answers = await sql`
    SELECT
      q.quiz_id,
      q.title AS quiz_title,
      q.description AS quiz_description,
      q.question_text AS quiz_question,
      a.answer_id,
      a.answer_text,
      a.ts_correct
    FROM quizzes AS q
    JOIN answers AS a ON q.quiz_id = a.quiz_id
    WHERE q.quiz_id = ${id}
      `;
  return (
    <div>
      <h1 className='text-2xl'>{answers[0].quiz_title}</h1>
      <p className='text-2xl text-gray-700'>{answers[0].quiz_description}</p>
      <p className='text-xl my-4'>{answers[0].quiz_question}</p>
      <ul>
        {answers.map((answer) => (
          <li key={answer.answer_id}>
            <label>
              <p>{answer.answer_text}</p>
              {show === 'true' && answer.ts_correct && 'v'}
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default async function QuizPage({
  params, searchParams
}: {
  params: Promise<{ id: string }>,
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const { id } = await params;
  const queryParams = await searchParams
  return (
    <section>
      <h1>Quiz {id}</h1>
      <Quiz id={id} show={queryParams.show === 'true' ? 'true' : 'false'} />
      <form action={async () => {
        'use server';
        redirect(`/quiz/${id}?show=true`);
      }}>
        <button className="bg-gray-200 p-2 m-2 rounded hover:bg-gray-300 transition-all" type="submit">Submit</button>
      </form>
    </section>
  );
}