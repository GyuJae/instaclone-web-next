import { useEditProfile } from '@apollo/mutations/editProfile.mutation';
import { useCacheMe } from '@apollo/queries/me.query';
import AuthInput from '@components/Auth/AuthInput';
import AuthSubmitButton from '@components/Auth/AuthSubmitButton';
import Avatar from '@components/Avatar';
import { useImageUpload } from '@hooks/useImageUpload';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

interface IProps {
  handleCloseEditForm: () => void;
}

interface IForm {
  avatar?: FileList;
  username: string;
}

const EditForm: React.FC<IProps> = ({ handleCloseEditForm }) => {
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const router = useRouter();
  const {
    register,
    formState: { isValid },
    setValue,
    watch,
    handleSubmit,
  } = useForm<IForm>({
    mode: 'onChange',
  });

  const { user } = useCacheMe();
  const { mutate: imageUploadMutate, loading: uploadLoaindg } = useImageUpload();
  const { loading, editProfileMutate } = useEditProfile();

  const isLoading = uploadLoaindg || loading;

  const onSubmit: SubmitHandler<IForm> = async ({ avatar, username }) => {
    if (loading) return;
    if (avatar && avatar.length > 0) {
      const { avatarName, uploadURL } = await imageUploadMutate();
      const form = new FormData();
      form.append('file', avatar[0], `${user?.username || avatarName}`);
      const {
        result: { id },
      } = await fetch(uploadURL, {
        method: 'POST',
        body: form,
      }).then((res) => res.json());
      editProfileMutate({
        variables: {
          input: {
            avatar: `https://imagedelivery.net/ZYLViq3IecpAakTgPse5sg/${id}/avatar`,
            username,
          },
        },
        onCompleted: () => {
          router.replace(`/profile/${username}`);
          handleCloseEditForm();
        },
      });
    } else {
      editProfileMutate({
        variables: {
          input: {
            username,
          },
        },
        onCompleted: () => {
          router.replace(`/profile/${username}`);
          handleCloseEditForm();
        },
      });
    }
  };

  useEffect(() => {
    setValue('username', user?.username || '');
    if (user?.avatar) setAvatarPreview(user.avatar);
  }, [setValue, user?.avatar, user?.username]);

  const avatarWatch = watch('avatar');

  useEffect(() => {
    if (avatarWatch && avatarWatch.length > 0) {
      const file = avatarWatch[0];
      setAvatarPreview(URL.createObjectURL(file));
    }
  }, [avatarWatch]);

  if (!user) return null;
  return (
    <div className='w-96 rounded-md bg-white shadow-lg'>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className='flex w-full flex-col items-center justify-center space-y-3 py-4 px-2'
      >
        <label htmlFor='avatar' className='cursor-pointer'>
          <Avatar size='L' avatar={avatarPreview} />
        </label>
        <input id='avatar' type='file' {...register('avatar')} accept='image/*' className='hidden' />
        <AuthInput label='Username' type='text' name='username' register={register('username', { required: true })} />
        <AuthSubmitButton payload='SAVE' isValid={isValid} loading={isLoading} />
      </form>
    </div>
  );
};

export default EditForm;
