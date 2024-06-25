import { Textarea } from "@/components/ui/textarea";
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

const CommentList = ({}) => {
  return (
    <main>
      {mockComments.map((cm) => {
        return (
          <div className="text-left">
            <p>{cm.id}</p>
            <p>{createDateString(cm.createdAt)}</p>
            <p>{cm.body}</p>
          </div>
        );
      })}
    </main>
  );
};

export default CommentList;
