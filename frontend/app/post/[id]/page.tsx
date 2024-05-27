import { NextPage } from "next";

interface Props {
  params: {
    id: string;
  };
}

const PostDetailPage: NextPage<Props> = ({ params }) => {
  return (
    <div>
      <h1>Post Detail Page {params.id}</h1>
    </div>
  );
};

export default PostDetailPage;
