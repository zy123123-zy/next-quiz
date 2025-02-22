import { revalidatePath } from 'next/cache';
import postgres from 'postgres';
const sql = postgres(process.env.DATABASE_URL);
function Answer({ id }: { id: number }) {
  return (
    <label>
      Ansewer{id}
      <input className="bg-gray-50 border border-gray-200 rounded p-2"
        type="text"
        name={`answer${id}`} />
      <input type="checkbox" name={`correct-${id}`} />
    </label>
  );
}

export default function QuizForm() {
  async function createQuiz(formData: FormData) {
    'use server'
    const title = formData.get('title') as string
    const description = formData.get('description') as string
    const question = formData.get('question') as string
    const answers = [1, 2, 3].map((id) => {
      return {
        answer: formData.get(`answer${id}`),
        isCorrect: formData.get(`correct-${id}`) === 'on'
      }
    })
    await sql`
      WITH new_quiz AS (
        INSERT INTO quizzes (title, description, question_text, created_at)
        VALUES (${title}, ${description}, ${question}, NOW())
        RETURNING quiz_id
      )
      INSERT INTO answers (quiz_id, answer_text, ts_correct)
      VALUES 
        ((SELECT quiz_id FROM new_quiz), ${answers[0].answer}, ${answers[0].isCorrect}),
        ((SELECT quiz_id FROM new_quiz), ${answers[1].answer}, ${answers[1].isCorrect}),
        ((SELECT quiz_id FROM new_quiz), ${answers[2].answer}, ${answers[2].isCorrect});
    `
    revalidatePath('/')
  }
  return (
    <form className='flex flex-col mt-8' action={createQuiz}>
      <h3 className="text-lg font-semibold">Create a Quiz</h3>
      <label>
        Title
        <input className="bg-gray-50 border border-gray-200 rounded p-2" type="text" name="title" />
      </label>
      <label>
        Description
        <input className="bg-gray-50 border border-gray-200 rounded p-2" type="text" name="description" />
      </label>
      <label>
        Question
        <input className="bg-gray-50 border border-gray-200 rounded p-2" type="text" name="question" />
      </label>
      <div className="my-4" />
      <Answer id={1} />
      <Answer id={2} />
      <Answer id={3} />
      <button type="submit">Submit</button>
    </form >
  );
}