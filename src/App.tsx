import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { routers } from './shared';
import _ from 'lodash'
import NotFound from './pages/not-found';
import Layout from './pages/layout';

function App() {
  const [count, setCount] = useState(0)

  return (
    <BrowserRouter>
      {/* <div className='font-roboto'> */}
      <div>
        <Routes>
          <Route path='*' element={<NotFound />} />
          {
            _.map(routers.landing, (index:any, key:number) => (
              <Route key={key} path={index.path} element={<Layout title={index.title}><index.component /></Layout>} />
            ))
          }
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
