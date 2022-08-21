import { gql, useMutation } from '@apollo/client';
import { useCacheMe } from '@apollo/queries/me.query';

export const useEditProfile = () => {
  const { user } = useCacheMe();
  const [editProfileMutate, { loading }] = useMutation<IEditProfileMutation, IEditProfileVariables>(
    EDIT_PROFILE_MUTATION,
    {
      update: (cache, { data }, { variables }) => {
        if (data && data.editProfile.ok && variables && user) {
          cache.modify({
            id: `UserEntity:${user.id}`,
            fields: {
              avatar(prev) {
                if (variables.input.avatar) {
                  return variables.input.avatar;
                }
                return prev;
              },
              username(prev) {
                if (variables.input.username) {
                  return variables.input.username;
                }
                return prev;
              },
            },
          });
        }
      },
    }
  );

  return {
    editProfileMutate,
    loading,
  };
};

export const EDIT_PROFILE_MUTATION = gql`
  mutation EditProfile($input: EditProfileInput!) {
    editProfile(input: $input) {
      ok
      error
    }
  }
`;

export interface IEditProfileOutput {
  ok: boolean;
  error: string | null;
}

export interface IEditProfileMutation {
  editProfile: IEditProfileOutput;
}

export interface IEditProfileInput {
  username: string;
  avatar?: string;
}

export interface IEditProfileVariables {
  input: IEditProfileInput;
}
