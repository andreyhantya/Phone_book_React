import React, {useState} from 'react';
import './Search-input.css';


function SearchInput(props) {

    const changeSearchValue = (e) => {
        props.searchContact(e.target.value)
    }

        return(
            <React.Fragment>
                <input type="text"
                       className='search-input'
                       placeholder='Поиск... '
                       onChange={changeSearchValue}/>
            </React.Fragment>
        )
}

export default SearchInput;