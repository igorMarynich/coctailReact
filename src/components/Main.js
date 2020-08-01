import React, {useState, useEffect} from 'react'
import NavbarMain from '../components/NavbarMain'
import Paginator from 'react-hooks-paginator';


const Main = ({listExmp, coctails}) => {

    const pageLimit = 1;
    const [offset, setOffset] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [currentData, setCurrentData] = useState([]);

      useEffect(() => {
        setCurrentData(coctails.slice(offset, offset + pageLimit));
      }, [offset, coctails]);


    return (
        <>
            <NavbarMain />
             <h1>{listExmp[currentPage - 1]}</h1>
            {listExmp && listExmp.map((_, index) => (
                <>
                    {currentData.length > index && currentData[index].map( coc => (
                        <>
                            <p>{coc.strDrink}</p>
                            <img src={coc.strDrinkThumb} style={{ width: 100, heigth: 100}}/>
                        </>
                    ))}
                </>
            ))}
            <Paginator
                totalRecords={coctails.length}
                pageLimit={pageLimit}
                pageNeighbours={2}
                setOffset={setOffset}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
            />
        </>
    )
}

export default Main