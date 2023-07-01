import React from 'react'
import ReactDOM from 'react-dom/client'
import Header from './components/Header/Header'
import './index.scss'
import Table from './components/Table/Table'
import Modal from './components/Modal/Modal'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Header />
    <section>
      <h1>Otimize seu tempo e se organize com o nosso Planejador Diário.</h1>
      <Table />
      <Modal />
    </section>
    
  </React.StrictMode>,
)
