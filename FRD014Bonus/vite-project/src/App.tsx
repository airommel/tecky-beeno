import React, { Suspense } from 'react';

import { Routes, Route, useLocation } from "react-router-dom";

import { AnimatePresence } from 'framer-motion';

const MainPage = React.lazy(() => import('./pages/MainPage'));
const OtherPage = React.lazy(() => import('./pages/OtherPage'));

function App() {

  const location = useLocation();

  return (
    <>
    <Suspense fallback={<div>Loading...</div>}>

    <AnimatePresence exitBeforeEnter initial={false}>
      
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<MainPage />} />
        <Route path="/other" element={<OtherPage />} />
      </Routes>

    </AnimatePresence>

    </Suspense>
  </>
  )
}

export default App
