import { createDateString } from "@/utils/index";
import { Comment } from "@/gen/post_pb";
const CommentList = ({ commentList }: { commentList: Comment[] }) => {
  return (
    <main>
      {commentList.map((cm) => {
        return (
          <div className="p-2" key={cm.id}>
            <div className="flex justify-between p-1">
              <p className="text-m">{cm.id}</p>
              <p className="text-m text-gray-500">{createDateString(cm.createdAt?.toDate())}</p>
            </div>

            <p className="text-sm">{cm.body}</p>
          </div>
        );
      })}
    </main>
  );
};

export default CommentList;
