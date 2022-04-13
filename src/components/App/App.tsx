import React from 'react'
import {
  Footer,
  Navbar,
  Page,
} from 'decentraland-ui'
import './App.css'
import { Route, Routes, useLocation } from 'react-router-dom'
import { Wallet } from '../Wallet'
import { Transfer } from '../Transfer'

const App: React.FC = () => {
  let location = useLocation();  
  let locationState: any = location.state;
  let background = locationState && locationState.background;

  return (
    <>
      <Navbar />
      <Page className="App">
        <Routes location={background || location}>
          <Route index element={<Wallet />} />
          <Route path="/" element={<Wallet />} />
        </Routes>
        {background && 
        <Routes>
          <Route path="/transfer" element={<Transfer />} />
        </Routes>
        }
        
      </Page>
      <Footer />
    </>
  )
}

export default App
