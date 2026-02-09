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
    <section className="mx-auto max-w-md space-y-4 rounded-lg border border-stone-500/70 bg-stone-700/40 p-6 shadow">
      <header>
        <h2 className="text-2xl font-semibold tracking-tight">Profile</h2>
        <p className="text-sm text-stone-200/80">Your account information</p>
      </header>
      {user ? (
        <dl className="space-y-2 text-sm">
          <div className="flex justify-between gap-4">
            <dt className="text-stone-300">Email</dt>
            <dd className="font-medium text-stone-50">{user.email}</dd>
          </div>
          <div className="flex justify-between gap-4">
            <dt className="text-stone-300">User level</dt>
            <dd className="font-medium text-stone-50">{user.level_name}</dd>
          </div>
          <div className="flex justify-between gap-4">
            <dt className="text-stone-300">Registered</dt>
            <dd className="font-medium text-stone-50">
              {user.created_at
                ? new Date(user.created_at).toLocaleString('fi-FI')
                : 'N/A'}
            </dd>
          </div>
        </dl>
      ) : (
        <p className="text-sm text-stone-200/70">No user data loaded.</p>
      )}
    </section>
  );
};

export default Profile;