import React from 'react'

interface IProps {
  inView: boolean;
}

const EditProfileButton: React.FC<IProps> = ({inView}) => {
  if (!inView) return null;
  return (
    <div>EditProfileButton</div>
  )
}

export default EditProfileButton