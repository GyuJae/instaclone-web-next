import React, { useMemo } from 'react'
import HeartIcon from '@assets/svgs/heart.svg'
import UnHeartIcon from '@assets/svgs/heart-outline.svg'
import { cls } from '@libs/index'

interface IProps {
  isLiked: boolean
}

const styles = {
  icon: "w-5 h-5"
}

const Liked: React.FC<IProps> = ({isLiked}) => {
  const LikedHeart = useMemo(() => (
    <div className={cls(styles.icon, 'fill-red-600')}>
      <HeartIcon />
    </div>
  ), [])

  const UnLikedHeart = useMemo(() => (
    <div className={styles.icon}>
      <UnHeartIcon />
    </div>
  ), [])
  
  const Heart = isLiked ? LikedHeart : UnLikedHeart;

  return (
    <button type='button'>{Heart}</button>
  )
}

export default Liked