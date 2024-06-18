import { NextPage } from "next";
import Form from "./_coponents/form";

const MyPage: NextPage = () => {
  return (
    <main className="mx-auto min-h-screen max-w-xl pt-4">
      <section className="flex flex-col space-y-4">
        <h1 className="text-4xl font-bold">My page</h1>
        <Form />
      </section>
    </main>
  );
};

export default MyPage;
