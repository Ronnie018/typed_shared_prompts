'use client';

import { SessionProvider, getSession } from 'next-auth/react';
import { Session } from 'next-auth';
import { ReactNode } from 'react';

type Props = {
  children: ReactNode;
  session: Session;
};

const Provider = ({ children, session }: Props) => {
  return <SessionProvider session={session}>{children}</SessionProvider>;
};

export default Provider;
