import React, {Component} from 'react';
import './contacts-filter.css'

export default class  ContactsFilter extends Component {

    state = {
        isAll :      true,
        isFavorite : false
    }

    showAllContacts = () => {
        this.props.showAllContacts()
        this.setState({
            isAll :      true,
            isFavorite : false
        })

    }

    showFavoriteContacts = () => {
        this.props.showFavoriteContacts()
        this.setState({
            isAll :      false,
            isFavorite : true
        })
    }



    render() {
        const isAll = this.state.isAll ?            'contacts-filter-item active' : 'contacts-filter-item';
        const isFavorite =  this.state.isFavorite ? 'contacts-filter-item active' : 'contacts-filter-item';

        return(
            <div className='contacts-filter'>
                <div className={isAll} onClick={this.showAllContacts}>Все</div>
                <div className={isFavorite} onClick={this.showFavoriteContacts}>Избранные</div>
            </div>
        )
    }
}