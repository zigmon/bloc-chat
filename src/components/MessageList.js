import React, { Component } from 'react';
import '.././MessageList.css';


class MessageList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            messages: []
        };

        this.messagesRef = this.props.firebase.database().ref("messages");
    }

    componentDidMount() {
        this.messagesRef.on('child_added', snapshot => {
            const message = snapshot.val();
            message.key = snapshot.key;
            this.setState({messages: this.state.messages.concat(message)});
        });
    }


    render() {

            return (

                <section className="messages-component">
                    <div>
                        <h2>Messages:</h2>
                        <ul>
                            {this.state.messages
                                .filter(message => message.roomId === this.props.activeRoomKey)
                                .map((message, key) => (
                                    <li key={message.key}>
                                        {message.username}:&nbsp;
                                        {message.content}
                                    </li>
                                ))}
                        </ul>
                    </div>
                </section>
            );

        }
    }

export default MessageList;