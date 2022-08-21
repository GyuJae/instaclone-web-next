import { useSeeComments } from '@apollo/queries/seeComments.query';
import React, { useMemo } from 'react';
import CommentItem from './CommentItem';

interface IProps {
  postId: number;
}

const styles = {
  container: 'h-[440px] space-y-2 overflow-y-auto px-3',
};

const Comments: React.FC<IProps> = ({ postId }) => {
  const { comments } = useSeeComments(postId);

  const commentList = useMemo(() => {
    if (!comments) return null;
    return comments.map((comment, index) => {
      const key = `comment-${postId}-${comment.id}-${index}`;
      return <CommentItem key={key} comment={comment} />;
    });
  }, [comments, postId]);

  if (!comments || comments.length === 0) return <div className={styles.container} />;
  return <div className={styles.container}>{commentList}</div>;
};

export default Comments;
