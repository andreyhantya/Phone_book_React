import React, {Component} from 'react';
import './contacts-filter.css'

export default class  ContactsFilter extends Component {


    render() {
        return(
            <div className='contacts-filter'>
                <div className='contacts-filter-item' onClick={this.props.showAllContacts}>Все</div>
                <div className='contacts-filter-item' onClick={this.props.showFavoriteContacts}>Избранные</div>
            </div>
        )
    }
}