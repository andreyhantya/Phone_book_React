import React, {useState} from 'react';
import './Navigation-panel.css';

export default function NavigationPanel(props) {

    const [statusMessage, setStatusMessage] = useState('');
    const [showMessage, setShowMessage]     = useState('');
    const [isValid, setIsValid]             = useState(false);
    const [number, setNumber]               = useState('');
    const [name, setName]                   = useState('');


    const changeInput = (e) => {
        let input = e.target.name === 'contactName' ? setName : setNumber;

        input(e.target.value);
    }

    const validation = (number) => {
        const regNum = new RegExp('^\\d+$');

        if(!!regNum.exec(number)){
            setShowMessage('Контакт добавлен');
            setIsValid(true);

            return true;
        }else{
            setShowMessage('Укажите корректный номер телефона!');
            setIsValid(false);

            return false;
        }

    }

    const addedContact = (e) => {
        e.preventDefault()

        const { contacts } = props;

        const duplicate = contacts.every(el => {
            return el.number !== number && el.name !== name;
        })

        if(!duplicate){
            setShowMessage('Такой пользователь уже существует!');
            setIsValid(false);

        }else if (validation(number) && duplicate) {
            props.addContact(name, number);

            setShowMessage('successMessage');
            setStatusMessage('successMessage');
            setShowMessage('Контакт добавлен');
            setName('');
            setNumber('');
            setIsValid(true);

        } else {
            setStatusMessage('errorMessage');
        }

        deleteStatusMessage();
    }

    const deleteStatusMessage = () => {
        setTimeout(() => {
            setStatusMessage('');
        }, 2000);
    }

        const valid = isValid ? 'success-message' : 'error-message'

        return (
            <div className='navigation-panel__wrapper'>
                <p className={valid}>{showMessage}</p>
                <form action='' className='navigation-panel__form'>
                    <input type='text'
                           name='contactName'
                           placeholder='Name'
                           className={statusMessage}
                           onChange={changeInput}
                           value={name}/>
                    <input type='text'
                           name='contactNumber'
                           placeholder='Number'
                           className={statusMessage}
                           onChange={changeInput}
                           value={number}/>
                    <button className='btn' onClick={addedContact}>Добавить</button>
                </form>
            </div>
        );
};