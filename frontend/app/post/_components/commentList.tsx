import { mockComments } from "@/constants/mock";
import { createDateString } from "@/utils/index";
const CommentList = () => {
  //const commentList = backend.comment.getCommentOld();
  return (
    <main>
      {mockComments.map((cm) => {
        return (
          <div className="p-2" key={cm.id}>
            <div className="flex justify-between p-1">
              <p className="text-m">{cm.id}</p>
              <p className="text-m text-gray-500">{createDateString(cm.createdAt)}</p>
            </div>

            <p className="text-sm">{cm.body}</p>
          </div>
        );
      })}
    </main>
  );
};

export default CommentList;
