import type {
  MediaItem,
  MediaItemWithOwner,
  UserWithNoPassword,
} from '../types/DBTypes';
import {useEffect, useState} from 'react';
import {fetchData} from '../utils/fetch-data';

const useMedia = () => {
  const [mediaArray, setMediaArray] = useState<MediaItemWithOwner[]>([]);

  useEffect(() => {
    const getMedia = async () => {
      try {
        const media = await fetchData<MediaItem[]>(
          import.meta.env.VITE_MEDIA_API + '/media',
        );
        const mediaWithOwners = await Promise.all<MediaItemWithOwner>(
          media.map(async (item: MediaItem) => {
            try {
              const owner = await fetchData<UserWithNoPassword>(
                `${import.meta.env.VITE_AUTH_API}/users/${item.user_id}`,
              );
              const mediaItemWithOwner: MediaItemWithOwner = {
                ...item,
                username: owner.username,
              };
              return mediaItemWithOwner;
            } catch (error) {
              console.error(error);
              return {
                ...item,
                username: 'not found',
              };
            }
          }),
        );
        setMediaArray(mediaWithOwners);
        console.log(mediaWithOwners);
      } catch (error) {
        console.error(error);
      }
    };

    getMedia();
  }, []);
  return {mediaArray};
};

// Dummy useAuthentication hook for login functionality
import type {Credentials, RegisterCredentials} from '../types/LocalTypes';

const useAuthentication = () => {
  // Simulate login API call
  const postLogin = async (credentials: Credentials) => {
    // Replace with real API call
    return {
      token: 'dummy-token',
      user: { username: credentials.username },
    };
  };
  return { postLogin };
};

// Dummy useUser hook for registration + user retrieval functionality
const useUser = () => {
  // Simulate register API call
  const postRegister = async (credentials: RegisterCredentials) => {
    // Replace with real API call
    return {
      success: true,
      user: { username: credentials.username, email: credentials.email },
    };
  };

  // Simulate retrieving user by token
  const getUserByToken = async (token: string) => {
    // Replace with real API call that validates token
    // For now return a dummy user
    const user: UserWithNoPassword = { username: token === 'dummy-token' ? 'demo-user' : 'unknown' };
    return { user };
  };

  return { postRegister, getUserByToken };
};

export {useMedia, useAuthentication, useUser};