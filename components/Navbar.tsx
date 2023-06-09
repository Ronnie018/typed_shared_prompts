'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect, Fragment } from 'react';
import { signIn, signOut, useSession, getProviders } from 'next-auth/react';

type Props = {};

const Navbar = (props: Props) => {
  const isUserLoggedIn = true;

  const [providers, setProviders] = useState(null);
  const [toggleDropdown, setToggleDropdown] = useState(false);

  useEffect(() => {
    const setProviders = async () => {
      const response = await getProviders();
      setProviders(response);
    };

    setProviders();
  }, []);

  return (
    <nav className='flex-between w-full mb-16 pt-3'>
      <Link className='flex gap-2 flex-center' href='/'>
        <Image
          src='/assets/images/logo.svg'
          alt='Promptopia Logo'
          width={30}
          height={30}
          className='object-contain'
        />
        <p className='logo_text'>Promptopia</p>
      </Link>

      <div className='sm:flex hidden'>
        {isUserLoggedIn ? (
          <div className='flex gap-3 md:gap-5'>
            <Link href='/create-prompt' className='black_btn'>
              Create Post
            </Link>
            <button
              className='outline_btn'
              onClick={() => {
                signOut();
              }}
              type='button'
            >
              Sign out
            </button>
            <Link className='' href='/profile'>
              <Image
                src='/assets/images/logo.svg'
                alt='profile'
                width={37}
                height={37}
                className='rounded-full'
              ></Image>
            </Link>
          </div>
        ) : (
          <>
            {providers &&
              Object.values(providers).map((provider: any) => {
                return (
                  <button
                    type='button'
                    key={provider.name}
                    onClick={() => signIn(provider.id)}
                    className='black_btn'
                  >
                    {}
                  </button>
                );
              })}
          </>
        )}
      </div>

      {/* Mobile nav */}

      <div className='sm:hidden flex relative'>
        {isUserLoggedIn ? (
          <div className='flex'>
            <Image
              src='/assets/images/logo.svg'
              width={37}
              height={37}
              className='rounded-full'
              alt='profile'
              onClick={() => setToggleDropdown((state) => !state)}
            />
            {toggleDropdown && (
              <div className='dropdown'>
                <Link
                  href='/profile'
                  className='dropdown_link'
                  onClick={() => setToggleDropdown((state) => !state)}
                >
                  My Profile
                </Link>
                <Link
                  href='/create-prompt'
                  className='dropdown_link'
                  onClick={() => setToggleDropdown((state) => !state)}
                >
                  New Prompt
                </Link>
                <button
                  type='button'
                  onClick={() => {
                    setToggleDropdown(() => false);
                    signOut();
                  }}
                  className='mt-5 w-full black_btn'
                >
                  Sign Out
                </button>
              </div>
            )}
          </div>
        ) : (
          <>
            {providers &&
              Object.values(providers).map((provider: any) => {
                return (
                  <button
                    type='button'
                    key={provider.name}
                    onClick={() => signIn(provider.id)}
                    className='black_btn'
                  >
                    {}
                  </button>
                );
              })}
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
