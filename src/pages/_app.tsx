
// Global styles
// -------------------------------------

import 'react-toastify/dist/ReactToastify.css';
import '../styles/globals.scss';

// Fonts
// -------------------------------------

import '../styles/fonts.scss';

// App
// -------------------------------------

import type { AppProps } from 'next/app';
import { SessionProvider } from 'next-auth/react';
import { appWithTranslation } from 'next-i18next';
import { useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import NiceModal from '@ebay/nice-modal-react';
import { QueryClient, QueryClientProvider } from 'react-query';
 
 const queryClient = new QueryClient()

function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {

  // -- Add class kb-focus if the tab key was pressed.
  //    This is used to allow styling of components based on keyboard or mouse focus.
  //    Use with tailwind: kb-focus:text-red-400
  //      This works because of custom plugin in tailwind.config.js
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      const isTab = e.key === 'Tab' || e.keyCode === 9;
      if(isTab) document.body.classList.add('kb-focus');
      else document.body.classList.remove('kb-focus');
    }
    const onPointerDown = () => {
      document.body.classList.remove('kb-focus');
    }
    addEventListener('keydown', onKeyDown);
    addEventListener('pointerdown', onPointerDown);
    addEventListener('mousedown', onPointerDown);
    return () => {
      removeEventListener('keydown', onKeyDown);
      removeEventListener('pointerdown', onPointerDown);
      removeEventListener('mousedown', onPointerDown);
    }
  }, []);
  // --

  return (
    <SessionProvider session={session}>
      <QueryClientProvider client={queryClient}>
        <NiceModal.Provider>
          <Component {...pageProps} />
          <ToastContainer 
            position="top-center"
            autoClose={3000}
            hideProgressBar={false} 
            theme="colored"
            className="fixed top-0 w-full px-4 flex flex-col items-center"
          />
        </NiceModal.Provider>
      </QueryClientProvider>
    </SessionProvider>
  );
}

export default appWithTranslation(App);
