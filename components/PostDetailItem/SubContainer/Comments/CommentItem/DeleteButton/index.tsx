import React from 'react';
import TrashIcon from '@assets/svgs/trash.svg';
import { useDeleteComment } from '@apollo/mutations/deleteComment.mutation';

interface IProps {
  commentId: number;
  inView: boolean;
}

const DeleteButton: React.FC<IProps> = ({ commentId, inView }) => {
  const { deleteCommentMutate, loading } = useDeleteComment();
  const handleClickDelete = () => {
    if (loading) return;
    deleteCommentMutate({
      variables: {
        input: {
          commentId,
        },
      },
    });
  };

  if (!inView) return null;
  return (
    <button name='deleteComment' type='button' onClick={handleClickDelete}>
      <div className='h-2 w-2 fill-gray-400 hover:brightness-110 active:brightness-90'>
        <TrashIcon />
      </div>
    </button>
  );
};

export default DeleteButton;
