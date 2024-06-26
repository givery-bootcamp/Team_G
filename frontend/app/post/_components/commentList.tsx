import { mockComments } from "@/constants/mock";

function createDateString(baseDate: Date): string {
  const year: string = String(baseDate.getFullYear());
  const month: string = String(baseDate.getMonth());
  const day: string = String(baseDate.getDay());
  const timeH: string = String(baseDate.getHours());
  const timeM: string = String(baseDate.getMinutes());
  const timeS: string = String(baseDate.getSeconds());
  return year + "-" + month + "-" + day + " " + timeH + ":" + timeM + ":" + timeS;
}

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
