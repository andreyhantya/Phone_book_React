import React, {Component} from 'react';
import './app.css'
import NavigationPanel from "../navigation-panel/navigation-panel";
import BookList from "../book-list/book-list";
import ContactCounter from "../contact-counter/contact-counter";
import SearchInput from "../search-input/search-input";


export default class App extends Component{

    maxId = 100;

    state = {
        contacts : [],
        contactCounter : 0,
        term : ''
    }

    addContact = (name, number) => {
        const {contacts, contactCounter} = this.state;

        const duplicate = contacts.every(el => el.name.indexOf(name) ===  -1)
        if(duplicate){
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
        }else{
            return false;
        }


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


    searchContact = (e) => {
        const {contacts} = this.state;

        let idx = contacts.findIndex(el => el.name.indexOf(e) === -1 );
        console.log(idx)
        console.log(contacts[idx])
        if(idx !== -1){
            this.setState({
            })
        }
   /*   this.setState({
            contacts: [...contacts.slice(0, idx),
                ...contacts[idx],
                ...contacts.slice(idx + 1)],
        })*/
    }

    displayContact = (item) => {
        if(item){
            return item
        }else{
            return this.state.contacts;
        }
    }

    render() {
        return (
            <div className='phone-book__wrapper'>
                <NavigationPanel addContact={(name, number) => this.addContact(name, number)}/>
               <ContactCounter contactCounter={this.state.contactCounter}/>
                <BookList contacts={this.state.contacts} deleteContact={this.deleteContact} />
                <SearchInput searchContact = {this.searchContact}/>
            </div>
        );
    }
}