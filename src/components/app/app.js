import React, {Component} from 'react';
import './app.css'
import NavigationPanel from "../navigation-panel/navigation-panel";
import BookList from "../book-list/book-list";


export default class App extends Component{

    maxId = 100;

    state = {
        contacts : [
            {name: 'Andre', number : '+380665475602', id : '1'},
            {name: 'Vasya', number : '+777888777777', id : '2'}
        ]
    }

    addContact = (name, number) => {
        const {contacts} = this.state;

        const newContact = {
            name: name,
            number : number,
            id: this.maxId++
        }

        this.setState(() => {
            return {
                contacts:[ ...contacts,
                            newContact
                ]
            }
        })

    };




    render() {
        return (
            <div className='phone-book__wrapper'>
                <NavigationPanel addContact={(name, number) => this.addContact(name, number)}/>
                <BookList contacts={this.state.contacts} />
            </div>
        );
    }
}