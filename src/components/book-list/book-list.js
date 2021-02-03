import React, {Component} from 'react';
import './book-list.css'

export default class BookList extends Component {

    deleteContact = (id) => {
        return this.props.deleteContact(id);
    }

    favoriteContact = (id) => {
        return this.props.favoriteContact(id);
    }

    render() {
        const contacts = this.props.contacts.map(item => {
            return (
                <div className='book-list__item' key={item.id}>
                    <div className='contact-name'>{item.name}</div>
                    <div className='contact-number'>{item.number}</div>
                    <div className='controls-wrapper'>
                        <button className='delete-contact' onClick={() => this.deleteContact(item.id)}> <i className='fa fa-trash-o'/></button>
                        <button className='favorite-contact' onClick={() => this.favoriteContact(item.id)}> <i className='fa fa-star'/></button>
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
}