import React, {Component} from 'react';
import './app.css'
import NavigationPanel from "../navigation-panel/navigation-panel";
import BookList from "../book-list/book-list";
import ContactCounter from "../contact-counter/contact-counter";


export default class App extends Component{

    maxId = 100;

    state = {
        contacts : [],
        contactCounter : 0
    }

    addContact = (name, number) => {
        const {contacts, contactCounter} = this.state;

        const newContact = {
            name: name,
            number : number,
            id: this.maxId++
        }

        this.contactCounter(contactCounter.length);

        this.setState(() => {
            return {
                contacts:[ ...contacts,
                            newContact
                ],
                contactCounter : contactCounter + 1
            }
        })

    };

    contactCounter = (count) => {
        return this.setState({contactCounter : count - 1})
    }

    deleteContact = (id) => {
        const {contacts, contactCounter} = this.state;
        const idx = this.state.contacts.findIndex(el => el.id === id);

        this.contactCounter(contactCounter.length);
        this.setState({
            contacts: [...contacts.slice(0, idx),
                    ...contacts.slice(idx+1)],
            contactCounter: contactCounter-1
        })
    }


    render() {
        return (
            <div className='phone-book__wrapper'>
                <NavigationPanel addContact={(name, number) => this.addContact(name, number)}/>
               <ContactCounter contactCounter={this.state.contactCounter}/>
                <BookList contacts={this.state.contacts} deleteContact={this.deleteContact} />
            </div>
        );
    }
}