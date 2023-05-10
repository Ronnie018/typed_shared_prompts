import '@styles/globals.css';
import Nav from '@components/Navbar';
import Provider from '@components/Provider';

export const metadata = {
  title: 'promptopia',
  description: 'Discover And Share AI Prompts',
};

type Props = {
  children: React.ReactNode;
};

const RootLayout = ({ children }: Props) => {
  return (
    <html lang='en'>
      <body>
        <Provider>
          <div className='main'>
            <div className='gradient' />
          </div>
          <main className='app'>
            <Nav />
            {children}
          </main>
        </Provider>
      </body>
    </html>
  );
};

export default RootLayout;
