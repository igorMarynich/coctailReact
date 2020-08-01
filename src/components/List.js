import React, {useState, useContext} from 'react'
import Context from '../context'

const List = ({list}) => {
    const {listToggleCheck} = useContext(Context)
    return(
        <div style={{display: 'flex'}}>
            <p>{list.title}</p>
            <input
                style={{ marginTop: 18, marginLeft: 5}}
                type="checkbox"
                checked={list && list.check}
                onChange={() => listToggleCheck(list.title)}
                />
        </div>
    )
}

export default List