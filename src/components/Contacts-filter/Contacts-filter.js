import React from 'react';
import './Contacts-filter.css'

function ContactsFilter (props) {

    const { favoriteTab, showFavoriteContacts, showAllContacts } = props;
    const isAll = !favoriteTab ?      'contacts-filter-item active' : 'contacts-filter-item';
    const isFavorite =  favoriteTab ? 'contacts-filter-item active' : 'contacts-filter-item';

    return(
            <div className='contacts-filter'>
                <div className={isAll} onClick={showAllContacts}>Все</div>
                <div className={isFavorite} onClick={showFavoriteContacts}>Избранные</div>
            </div>
    )
}


export default ContactsFilter;