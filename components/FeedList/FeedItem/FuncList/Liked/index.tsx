import React, { useCallback, useEffect, useMemo, useState } from 'react'
import HeartIcon from '@assets/svgs/heart.svg'
import UnHeartIcon from '@assets/svgs/heart-outline.svg'
import { cls } from '@libs/index'
import { useToggleLike } from '@apollo/mutations/toggleLike.mutation'

interface IProps {
  isLiked: boolean;
  postId: number;
}

const styles = {
  icon: "w-5 h-5"
}

const Liked: React.FC<IProps> = ({ isLiked, postId }) => {
  const [mounted, setMounted] = useState<boolean>(false);
  const {toggleLikeMutate, loading} = useToggleLike(postId, isLiked)

  const handleClickToggleLike = useCallback(() => {
    if (loading) return;
    toggleLikeMutate()
  }, [loading, toggleLikeMutate])

  const LikedHeart = useMemo(() => (
    <button type='button' onClick={handleClickToggleLike} className={cls(styles.icon, 'fill-red-600')}>
      <HeartIcon />
    </button>
  ), [handleClickToggleLike])

  const UnLikedHeart = useMemo(() => (
    <button type='button' onClick={handleClickToggleLike} className={styles.icon}>
      <UnHeartIcon />
    </button>
  ), [handleClickToggleLike])

  
  const Heart = isLiked ? LikedHeart : UnLikedHeart;
  
  useEffect(() => setMounted(true), [])
  if(!mounted) return null
  return Heart
}

export default Liked