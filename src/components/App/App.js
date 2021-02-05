import React, {Component} from 'react';
import './App.css'
import NavigationPanel from "../Navigation-panel/Navigation-panel";
import BookList from "../Book-list/Book-list";
import ContactCounter from "../Contact-counter/Contact-counter";
import SearchInput from "../Search-input/Search-input";
import ContactsFilter from "../Contacts-filter/Contacts-filter";


export default class App extends Component {

    state = {
        contacts:       [],
        contactCounter: 0,
        searchValue:    '',
        favorite:       [],
        favoriteTab:    false,
        maxId:          0
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
                id: this.state.maxId++
            }

            const contacts = [...contacts, newContact];

            this.changeState({contacts,contactCounter})


            /* this.setState(() => {
                 return {
                     contacts: [...contacts,
                         newContact
                     ],
                     contactCounter: contactCounter + 1,
                     searchValue: ''
                 }
             })*/
        } else {
            return false;
        }


    };

     changeState (newState)  {

             //...arguments.map(elem => newState.elem = elem);

        console.log(newState)
     /*  this.setState({
            [contacts]       :   contacts,
            [contactCounter] :   contactCounter,
            [searchValue]    :   searchValue,
            [favorite]       :   favorite,
            [favoriteTab]    :   favoriteTab,



        })*/
    }

    deleteContact = (id) => {
        const {contacts, contactCounter} = this.state;
        const idx = contacts.findIndex(el => el.id === id);

        const newValue = [...contacts.slice(0, idx),
            ...contacts.slice(idx + 1)]

        //this.changeState(newValue,contactCounter - 1,'')



        this.changeState({newValue,contactCounter})
/*
        this.setState({
            contacts: [...contacts.slice(0, idx),
                ...contacts.slice(idx + 1)],
            contactCounter: contactCounter - 1,
            searchValue: ''
        })*/
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

        this.setState({
            favorite: [...favorite.slice(0, idx),
                contacts[idx]],
            contactCounter: contactCounter.length
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
        const {searchValue,favoriteTab} = this.state;
        let q = 2;
        console.log(this.changeState({q}))
        return (
            <div className='phone-book__wrapper'>
                <NavigationPanel addContact={(name, number) => this.addContact(name, number)}/>
                <ContactCounter contactCounter={this.getCounter()}/>
                <ContactsFilter showFavoriteContacts={this.showFavoriteContacts}
                                showAllContacts={this.showAllContacts}
                                favoriteTab={favoriteTab}/>
                <BookList contacts={this.displayItems(searchValue)}
                          deleteContact={this.deleteContact}
                          favoriteContact={this.favoriteContact}/>
                <SearchInput searchContact={this.searchContact}/>
            </div>
        );
    }
}