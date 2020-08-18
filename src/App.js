import React, { useReducer } from 'react';
import './App.css';
import Home from './components/Home';
import { initialState, reducer } from './context/languageContext'

export const LangContext = React.createContext();

function App() {
  const [lang, langDispatch] = useReducer(reducer, initialState);
  return (
    <LangContext.Provider value={{ langState: lang, langDispatch: langDispatch }} >
      <div className="App">
        <Home />
      </div>
    </ LangContext.Provider>
  );
}

export default App;
