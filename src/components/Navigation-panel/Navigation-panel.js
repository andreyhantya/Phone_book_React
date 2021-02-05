import React, {Component} from 'react';
import './Navigation-panel.css';

export default class NavigationPanel extends Component {


    state = {
        name:          '',
        number:        '',
        statusMessage: ''
    }

    changeInputName = (e) => {
        this.setState(() => {
            return {
                name: e.target.value
            }
        })
    }

    changeInputNumber = (e) => {
        this.setState(() => {
            return {
                number: e.target.value
            }
        })
    }

    addedContact = (e) => {
        const {name, number} = this.state;
        e.preventDefault()

        if (name && number) {
            this.props.addContact(name, number);
            console.log(this.props.addContact(name, number));
            this.setState({statusMessage: 'successMessage'})

        } else {
            this.setState({statusMessage: 'errorMessage'})

        }
        this.deleteStatusMessage();

    }

    deleteStatusMessage = () => {
        setTimeout(() => {
            this.setState({statusMessage: ''})
        }, 2000);
    }


    render() {

        return (
            <form action="" className='navigation-panel__wrapper'>
                <input type="text" placeholder='Name' className={this.state.statusMessage}
                       onChange={this.changeInputName}/>
                <input type="text" placeholder='Number' className={this.state.statusMessage}
                       onChange={this.changeInputNumber}/>
                <button className='btn' onClick={this.addedContact}>Добавить</button>
            </form>
        );
    }
}