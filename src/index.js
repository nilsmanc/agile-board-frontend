import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'

import RootStore from './store'
import { createContext } from 'react'

const store = RootStore.create({})

export const StoreContext = createContext(store)

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <StoreContext.Provider value={store}>
      <App />
    </StoreContext.Provider>
  </React.StrictMode>,
)
