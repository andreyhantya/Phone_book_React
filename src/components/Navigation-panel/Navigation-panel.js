import React, {Component} from 'react';
import './Navigation-panel.css';

export default class NavigationPanel extends Component {


    state = {
        statusMessage : '',
        showMessage   : '',
        isValid       : false,
        number        : '',
        name          : ''
    }


    changeInput = (e) => {
        let input = e.target.name === 'contactName' ? 'name' : 'number';

        this.setState(() => {
            return {
                [input] : e.target.value
            }
        })
    }

    validation = (number) => {
        const regNum = new RegExp('^\\d+$');

        if(!!regNum.exec(number)){
            this.setState({
                showMessage : 'Контакт добавлен',
                isValid     : true
            })
            return true;
        }else{
            this.setState({
                showMessage : 'Укажите корректный номер телефона!',
                isValid     : false
            })
            return false;
        }

    }


    addedContact = (e) => {
        e.preventDefault()

        const {name, number} = this.state;
        const { contacts } = this.props;

        const duplicate = contacts.every(el => {
            return el.number !== number && el.name !== name;
        })

        if(!duplicate){
            this.setState({
                showMessage : 'Такой пользователь уже существует!',
                isValid     : false
            })
        }else if (this.validation(number) && duplicate) {
            this.props.addContact(name, number);

            this.setState({
                showMessage   : 'Контакт добавлен',
                statusMessage : 'successMessage',
                name          : '',
                number        : '',
                isValid       : true
            })

        } else {
            this.setState({
                statusMessage : 'errorMessage'
            })
        }

        this.deleteStatusMessage();
    }

    deleteStatusMessage = () => {
        setTimeout(() => {
            this.setState({statusMessage: ''})
        }, 2000);
    }


    render() {
        const {statusMessage, name, number, showMessage, isValid} = this.state;
        const valid = isValid ? 'success-message' : 'error-message'

        return (
            <div className='navigation-panel__wrapper'>
                <p className={valid}>{showMessage}</p>
                <form action="" className='navigation-panel__form'>
                    <input type="text"
                           name='contactName'
                           placeholder='Name'
                           className={statusMessage}
                           onChange={this.changeInput}
                           value={name}/>
                    <input type="text"
                           name='contactNumber'
                           placeholder='Number'
                           className={statusMessage}
                           onChange={this.changeInput}
                           value={number}/>
                    <button className='btn' onClick={this.addedContact}>Добавить</button>
                </form>
            </div>
        );
    }
}