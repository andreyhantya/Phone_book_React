import React, {Component} from 'react';


export default class ContactCounter extends Component{
    state = {
        contactsLength : ''
    }

    render() {
        return (
            <div>
                {this.props.contactCounter}  контактов
            </div>
        )
    }


}
