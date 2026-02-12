
import {useEffect, useState} from 'react';
import {useUser} from '../hooks/apiHooks';
import type {UserWithNoPassword} from '../types/DBTypes';

const Profile = () => {
  const [user, setUser] = useState<UserWithNoPassword | null>(null);
  const {getUserByToken} = useUser();

  useEffect(() => {
    const getUserInfo = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        const userResponse = await getUserByToken(token);
        console.log('user profile', userResponse);
        setUser(userResponse.user);
      }
    };
    getUserInfo();
  }, []);

  return (
    <>
      {user && (
        <>
          <h2>{user.username}</h2>
          <p>TODO: print user info here</p>
        </>
      )}
    </>
  );
};

export default Profile;
