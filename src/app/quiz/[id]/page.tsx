type Props = {
  params: Promise<{ id: string }>;
};

export default async function QuizPage(props: Props) {
  const { id } = await props.params;
  return (
    <section>
      <h1>Quiz {id}</h1>
    </section>
  );
}