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

export {useMedia};