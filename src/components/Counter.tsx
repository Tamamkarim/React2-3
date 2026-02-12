// TEMP Greeting & dummylogin example

import {useState} from 'react';

const UserGreeting = () => {
  return <p>Terve kirjautunut käyttäjä!</p>;
};

const GuestGreeting = () => {
  return <p>Terve vieras!</p>;
};

const Greeting = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  return (
    <>
      {isLoggedIn ? <UserGreeting /> : <GuestGreeting />}
      {!isLoggedIn && (
        <button
          onClick={() => {
            setIsLoggedIn(true);
          }}
        >
          Login
        </button>
      )}
      {/* toinen tapa, toggle-nappula (huom. jsx:n sisällä oleva kommentti)*/}
      <button
        onClick={() => {
          // kommentit toimii normaalisti koodin sisällä
          setIsLoggedIn(!isLoggedIn);
        }}
      >
        {isLoggedIn ? 'Log out' : 'Login'}
      </button>
    </>
  );
};

export default Greeting;