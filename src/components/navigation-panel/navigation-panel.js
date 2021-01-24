import React, {Component} from 'react';
import './navigation-panel.css';

export default class NavigationPanel extends Component{


    state = {
        name: '',
        number : '',
        statusMessage: ''
    }

    changeInputName = (e) => {
        this.setState(() => {
            return {
                name : e.target.value
            }
        })
    }

    changeInputNumber = (e) => {
        this.setState(() => {
            return {
                number : e.target.value
            }
        })
    }

    addedContact = (e) => {
        const {name, number} = this.state;
        e.preventDefault()

        if(name && number){
            this.props.addContact(name, number);
            this.setState({statusMessage: 'Контакт добавлен'})
            this.infoBlock += ' successMessage'

            this.deleteStatusMessage();
        }else{
            this.setState({statusMessage: 'Заполните все поля'})
            this.infoBlock = ' errorMessage'
            this.deleteStatusMessage();
        }
    }

    deleteStatusMessage = () => {
        setTimeout(() => {
            this.setState({statusMessage: ''})
        }, 2000);
    }

    infoBlock = 'status-message';


    render() {

        return (
            <form action="" className='navigation-panel__wrapper'>
                <input type="text" placeholder='Name' onChange={this.changeInputName}/>
                <input type="text" placeholder='Number' onChange={this.changeInputNumber}/>
                <div className={this.infoBlock}>{this.state.statusMessage}</div>
                <button className='btn' onClick={this.addedContact}>Добавить</button>
            </form>
        );
    }
}