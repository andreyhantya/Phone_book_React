import React, {Component} from 'react';
import NavigationPanel    from '../Navigation-panel/Navigation-panel';
import BookList           from '../Book-list/Book-list';
import ContactCounter     from '../Contact-counter/Contact-counter';
import SearchInput        from '../Search-input/Search-input';
import ContactsFilter     from '../Contacts-filter/Contacts-filter';
import './App.css'


export default class App extends Component {

    state = {
        contactCounter : 0,
        searchValue    : '',
        favoriteTab    : false,
        contacts       : [],
        favorite       : [],
        maxId          : 0
    }

    addContact = (name, number) => {
        const {contacts, contactCounter} = this.state;

            const newContact = {
                number  : number,
                name    : name,
                id      : this.state.maxId++
            }

             this.setState(() => {
                 return {
                     contacts: [...contacts,
                                newContact
                     ],
                     contactCounter : contactCounter + 1,
                     searchValue    : ''
                 }
             })
    };

    deleteContact = (id) => {
        const {contacts, contactCounter, favoriteTab, favorite} = this.state;
        const item = contacts.find(el => el.id === id);

        if(favoriteTab){
            this.setState({
                contactCounter : contactCounter - 1,
                searchValue    : '',
                favorite       : [...favorite.filter(it => it !== item)]
            })
        }else{
            this.setState({
                contactCounter : contactCounter - 1,
                searchValue    : '',
                contacts       : [...contacts.filter(it => it !== item)]
            })
        }


    }


    searchContact = (text) => {
        const { contacts, favoriteTab, favorite } = this.state;

        if (text) {
            if (favoriteTab) {
                this.setState({
                    searchValue: [...favorite.filter(el => el.name.indexOf(text) !== -1)]
                })
            } else {
                this.setState({
                    searchValue: [...contacts.filter(el => el.name.indexOf(text) !== -1)]
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


    changeTab = () => {
        this.setState({favoriteTab: !this.state.favoriteTab})
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
        const {searchValue,favoriteTab, contacts} = this.state;

        return (
            <div className='phone-book__wrapper'>
                <NavigationPanel addContact={(name, number) => this.addContact(name, number)}
                                contacts={contacts}/>
                <ContactCounter contactCounter={this.getCounter()}/>
                <ContactsFilter changeTab={this.changeTab}
                                favoriteTab={favoriteTab}/>
                <BookList contacts={this.displayItems(searchValue)}
                          deleteContact={this.deleteContact}
                          favoriteContact={this.favoriteContact}
                          favoriteTab={favoriteTab}/>
                <SearchInput searchContact={this.searchContact}/>
            </div>
        );
    }
}
