import React, {Component} from 'react';
import './search-input.css';


export default class SearchInput extends Component {
    state = {
        searchValue : ''
    }

    changeSearchValue = (e) => {
        this.props.searchContact(e.target.value)
    }

    render() {
        return(
            <div>
                <input type="text" className='search-input' placeholder='Поиск... ' onChange={this.changeSearchValue}/>
            </div>
        )
    }
}