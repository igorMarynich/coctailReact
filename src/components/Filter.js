import React, {useContext}  from 'react'
import NavbarFilter from './NavbarFilter'
import List from '../components/List'
import { useHistory } from "react-router-dom";
import Context from '../context'

const Filter = ({listFilter}) => {

  let history = useHistory();
  const {listDeleteCoctails} = useContext(Context)

  const handler = () => {
    history.push("/")
  }

    return (
        <>
          <NavbarFilter />
          {listFilter.map(list =>
             <List list={list}/>
            )}
          <button onClick={handler}>Apply</button>
        </>
    )
}

export default Filter