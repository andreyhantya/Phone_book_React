import React, {Component} from 'react';
import './Book-list.css'



function BookList (props){

   const deleteContact = (id) => {
        return props.deleteContact(id);
    }

    const favoriteContact = (id) => {
        return props.favoriteContact(id);
    }

        const hideFavoriteButton = props.favoriteTab ? 'favorite-contact hide' : 'favorite-contact'

        const contacts = props.contacts.map(item => {
            return (
                <div className='book-list__item' key={item.id}>
                    <div className='contact-name'>{item.name}</div>
                    <div className='contact-number'>{item.number}</div>
                    <div className='controls-wrapper'>
                        <button className='delete-contact'
                                onClick={() => deleteContact(item.id)}>
                            <i className='fa fa-trash-o'/>
                        </button>
                        <button className={hideFavoriteButton} onClick={() => favoriteContact(item.id)}>
                            <i className='fa fa-star'/>
                        </button>
                    </div>
                 </div>
            )
        })

        return (
            <div className='book-list'>
                {contacts}
            </div>
        );

}

export default BookList;