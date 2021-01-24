import React, {Component} from 'react';
import './book-list.css'

export default class BookList extends Component {


    render() {
        const contacts = this.props.contacts.map(item => {
            return (
                <div className='book-list__item' key={item.id}>
                    <div className='contact-name'>{item.name}</div>
                    <div className='contact-number'>{item.number}</div>
                    <button className='delete-contact'>х</button>
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