import React, {useEffect, useState } from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import Main from './components/Main'
import Filter from './components/Filter'
import axios from 'axios'
import Context from './context'

function App() {

  const [list , setList] = useState([])
  const [coctails, setCoctails] = useState([])
  const [listExmp , setlistExmp] = useState([])
  const [listFilter, setListFilter] = useState([])
  const [newFilter, setNewFilter] = useState([])

  useEffect( () => {
    axios.get(`https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list`)
      .then( response => setList(response.data.drinks))
      .catch( error => console.log('errr', error))
  }, [])

  useEffect(() => {
    list.map( l => setlistExmp( prev=> [...prev, l.strCategory]))
  }, [list])

  useEffect( () => {
    listExmp.map( lExmp => setListFilter( prevExmp=> [...prevExmp, { title: lExmp, check: true}]))
  }, [listExmp])

  useEffect( () => {
    setNewFilter([])
    listFilter.map( lExmp => {
      if(lExmp.check) {
        setNewFilter(state => [...state, lExmp.title])
      }
    })
  }, [listFilter])

  useEffect( () => {
    listFilter.map( l => l.check &&  axios.get(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${l.title}`)
      .then( response => setCoctails( state => [...state, response.data.drinks]))
      .catch( error => console.log('errr', error)))
      setCoctails([])
  }, [listFilter])

    const listToggleCheck = (title) => {
      setListFilter(listFilter.map( listFilt => {
        if(listFilt.title === title) {
          listFilt.check = !listFilt.check
        }
        return listFilt
      }
     ))
    }

  return (
    <Context.Provider value={{
      listToggleCheck
    }}>
      <Router>
        <Switch>
          <Route exact path="/" component={() => <Main listExmp={newFilter} listFilter={listFilter} coctails={coctails} />} />
          <Route path="/filter" component={() => <Filter listFilter={listFilter} />}/>
        </Switch>
      </Router>
    </Context.Provider>
  );
}

export default App;