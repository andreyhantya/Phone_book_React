import React from 'react';
import './Contacts-filter.css'

function ContactsFilter (props) {

    const { favoriteTab, changeTab } = props;
    const isAll = !favoriteTab ?      'contacts-filter-item active' : 'contacts-filter-item';
    const isFavorite =  favoriteTab ? 'contacts-filter-item active' : 'contacts-filter-item';

    return(
            <div className='contacts-filter'>
                <div className={isAll} onClick={changeTab}>Все</div>
                <div className={isFavorite} onClick={changeTab}>Избранные</div>
            </div>
    )
}


export default ContactsFilter;