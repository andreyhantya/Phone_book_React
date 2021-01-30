import React, {Component} from 'react';
import './app.css'
import NavigationPanel from "../navigation-panel/navigation-panel";
import BookList from "../book-list/book-list";
import ContactCounter from "../contact-counter/contact-counter";
import SearchInput from "../search-input/search-input";
import ContactsFilter from "../contacts-filter/contacts-filter";


export default class App extends Component{

    maxId = 0;

    state = {
        contacts : [],
        contactCounter : 0,
        searchValue : '',
        favorite : [],
        favoriteTab : false
    }

    addContact = (name, number) => {
        const {contacts, contactCounter} = this.state;

        const duplicate = contacts.every(el => el.name !== name)
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
                    contactCounter : contactCounter + 1,
                    searchValue : ''
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
            contactCounter: contactCounter-1,
            searchValue : ''

        })
    }

    searchContact = (e) => {
        const {contacts, favoriteTab, favorite} = this.state;
        console.log('eeee', e)
        if(e){

            if(favoriteTab){
                let idx = favorite.filter(el => el.name.indexOf(e) !== -1 );

                this.setState({
                    searchValue : [...idx]
                })
            }else{
                let idx = contacts.filter(el => el.name.indexOf(e) !== -1 );
                this.setState({
                    searchValue : [...idx]
                })
            }
        }else{
            this.setState({
                searchValue : ''
            })
        }


    }

    favoriteContact = (id) => {
            const {contacts, contactCounter, favorite} = this.state;
            const idx = this.state.contacts.findIndex(el => el.id === id);

            this.contactCounter(contactCounter.length);
            this.setState({
                favorite: [...favorite.slice(0, idx),
                    contacts[idx]],
            })

    }
    showFavoriteContacts = () => {
         this.setState({favoriteTab : true})
    }

    showAllContacts = () => {
         this.setState({favoriteTab : false})

    }

    displayItems = (searchValue) => {
        if(searchValue){
            console.log('ёрч валю', searchValue)
            console.log('че значт', !!searchValue)
            return searchValue;
        }else if(this.state.favoriteTab) {
            return this.state.favorite;
        }else{
            return this.state.contacts;
        }
    }

    render() {
        const {searchValue, contacts, favorite} = this.state;

        //const visible = searchValue ? searchValue :contacts;
        const visible = this.displayItems(searchValue);
        const counter = searchValue.length > 0 ? searchValue.length : contacts.length;

        return (
            <div className='phone-book__wrapper'>
                <NavigationPanel addContact={(name, number) => this.addContact(name, number)}/>
                <ContactCounter contactCounter={counter}/>
                <ContactsFilter showFavoriteContacts={this.showFavoriteContacts} showAllContacts={this.showAllContacts}/>
                <BookList contacts={visible}
                          deleteContact={this.deleteContact}
                          favoriteContact={this.favoriteContact}/>
                <SearchInput searchContact = {this.searchContact}/>
            </div>
        );
    }
}