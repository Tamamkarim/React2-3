import {Link, Outlet} from 'react-router-dom';
import {useUserContext} from '../hooks/ContextHooks.ts';
import {useEffect} from 'react';

const Layout = () => {
  const {handleAutoLogin, user, loading} = useUserContext();
  useEffect(() => {
    handleAutoLogin();
  }, []);
  return (
    <div className="min-h-screen bg-stone-600 text-stone-50">
      <nav className="border-b border-stone-500 bg-stone-700/60">
        <ul className="mx-auto flex max-w-7xl items-center gap-4 px-6 py-3 text-sm font-medium">
          <li>
            <Link className="hover:text-stone-200" to="/">
              Home
            </Link>
          </li>
          {user ? (
            <>
              <li>
                <Link className="hover:text-stone-200" to="/profile">
                  Profile
                </Link>
              </li>
              <li>
                <Link className="hover:text-stone-200" to="/upload">
                  Upload
                </Link>
              </li>
              <li className="ml-auto">
                <Link className="hover:text-stone-200" to="/logout">
                  Logout
                </Link>
              </li>
            </>
          ) : (
            <li className="ml-auto">
              <Link className="hover:text-stone-200" to="/login">
                Login
              </Link>
            </li>
          )}
        </ul>
      </nav>

      {loading ? (
        <main className="flex min-h-[60vh] items-center justify-center">
          <div className="flex flex-col items-center gap-3 text-stone-200">
            <span className="h-8 w-8 animate-spin rounded-full border-2 border-stone-300 border-t-transparent" />
            <p className="text-sm text-stone-200/80">Loading your session...</p>
          </div>
        </main>
      ) : (
        <main className="mx-auto max-w-7xl p-6">
          <Outlet />
        </main>
      )}
    </div>
  );
};

export default Layout;