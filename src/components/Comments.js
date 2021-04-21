import { useState } from "react";
import useComments from "../firebase/hooks/useComments";

const Comments = ({ postId }) => {
  const { comments } = useComments(postId);
  return <div className="bg-gray-700">
    {
      comments.map(comment => (
        <CommentTile key={comment.id} comment={comment} />
      ))
    }
  </div>;
};

const CommentTile = ({ comment }) => {

  const [user, setUser] = useState('');

  useState(() => {
    comment.user.get().then(user => {
      let gUser = user.data().email.split("@")[0]
      setUser(gUser);
    })
  }, []);

  return (
    <div className="flex justify-start items-center">
      <p className="font-semibold">{user}</p>
      <p className="text-gray-200 ml-2">{comment.body}</p>
    </div>
  );
};

export default Comments;
