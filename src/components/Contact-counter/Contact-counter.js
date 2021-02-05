import React, {Component} from 'react';
import './Contact-counter.css';

export default class ContactCounter extends Component{

  getNoun = (number, one, two, five) =>{
        let num = Math.abs(number);
            num %= 100;
        if (num >= 5 && num <= 20) {
            return five;
        }
            num %= 10;
        if (num === 1) {
            return one;
        }
        if (num >= 2 && num <= 4) {
            return two;
        }

        return five;
    }



    render() {
        const contact = this.getNoun(this.props.contactCounter, 'контакт', 'контакта', 'контактов' );

        return (
            <div className='contact-counter'>
                {this.props.contactCounter} {contact}
            </div>
        )
    }


}
