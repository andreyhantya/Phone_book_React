import React, {Component} from 'react';
import './app.css'
import NavigationPanel from "../navigation-panel/navigation-panel";
import BookList from "../book-list/book-list";
import ContactCounter from "../contact-counter/contact-counter";
import SearchInput from "../search-input/search-input";
import ContactsFilter from "../contacts-filter/contacts-filter";


export default class App extends Component {

    maxId = 0;

    state = {
        contacts:       [],
        contactCounter: 0,
        searchValue:    '',
        favorite:       [],
        favoriteTab:    false
    }

    addContact = (name, number) => {
        const {contacts, contactCounter} = this.state;

        const duplicate = contacts.every(el => {
            return el.number !== number && el.name !== name
        })

        if (duplicate) {
            const newContact = {
                name: name,
                number: number,
                id: this.maxId++
            }

            this.contactCounter(contactCounter.length);

            this.setState(() => {
                return {
                    contacts: [...contacts,
                        newContact
                    ],
                    contactCounter: contactCounter + 1,
                    searchValue: ''
                }
            })
        } else {
            return false;
        }


    };

    contactCounter = (count) => {
        return this.setState({contactCounter: count - 1})
    }

    deleteContact = (id) => {
        const {contacts, contactCounter} = this.state;
        const idx = contacts.findIndex(el => el.id === id);

        this.contactCounter(contactCounter.length);
        this.setState({
            contacts: [...contacts.slice(0, idx),
                ...contacts.slice(idx + 1)],
            contactCounter: contactCounter - 1,
            searchValue: ''

        })
    }

    searchContact = (e) => {
        const {contacts, favoriteTab, favorite} = this.state;

        if (e) {

            if (favoriteTab) {
                let idx = favorite.filter(el => el.name.indexOf(e) !== -1);

                this.setState({
                    searchValue: [...idx]
                })
            } else {
                let idx = contacts.filter(el => el.name.indexOf(e) !== -1);
                this.setState({
                    searchValue: [...idx]
                })
            }
        } else {
            this.setState({
                searchValue: ''
            })
        }


    }

    favoriteContact = (id) => {
        const {contacts, contactCounter, favorite} = this.state;
        const idx = contacts.findIndex(el => el.id === id);

        this.contactCounter(contactCounter.length);
        this.setState({
            favorite: [...favorite.slice(0, idx),
                contacts[idx]],
        })

    }
    showFavoriteContacts = () => {
        this.setState({favoriteTab: true})
    }

    showAllContacts = () => {
        this.setState({favoriteTab: false})

    }

    displayItems = (searchValue) => {
        if (searchValue) {
            return searchValue;
        } else if (this.state.favoriteTab) {
            return this.state.favorite;
        } else {
            return this.state.contacts;
        }
    }

    getCounter = () => {
        const {favorite, searchValue, favoriteTab, contacts} = this.state;

        if (searchValue.length > 0) {
            return searchValue.length;
        } else if (favoriteTab) {
            return favorite.length;
        } else {
            return contacts.length;
        }
    }

    render() {
        const {searchValue} = this.state;

        const visible = this.displayItems(searchValue);

        return (
            <div className='phone-book__wrapper'>
                <NavigationPanel addContact={(name, number) => this.addContact(name, number)}/>
                <ContactCounter contactCounter={this.getCounter()}/>
                <ContactsFilter showFavoriteContacts={this.showFavoriteContacts}
                                showAllContacts={this.showAllContacts}/>
                <BookList contacts={visible}
                          deleteContact={this.deleteContact}
                          favoriteContact={this.favoriteContact}/>
                <SearchInput searchContact={this.searchContact}/>
            </div>
        );
    }
}