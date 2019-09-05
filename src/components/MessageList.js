import React, { Component } from 'react';
import '.././MessageList.css';


class MessageList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            messages: [],
            newMessage: ''
        };

        this.messagesRef = this.props.firebase.database().ref('messages');
    }

    componentDidMount() {
        this.messagesRef.on('child_added', snapshot => {
            const message = snapshot.val();
            message.key = snapshot.key;
            this.setState({messages: this.state.messages.concat( message )});
        });
    }


    handleMessageSubmit = (e) => {
        if(e.key === 'Enter') {
            e.preventDefault();
            this.refs.newMessageFormSubmit.click();
        }
    }


    handleSubmit(e) {
        e.preventDefault();

        // Define user variable - use 'Guest' if null
            const username = this.props.user === null ? 'Guest' : this.props.user;
                this.messagesRef.push({
                    username: username,
                    content: this.state.newMessage,
                    sentAt: this.props.firebase.database.ServerValue.TIMESTAMP,
                    roomID: this.props.activeRoomKey
                });
                // Clear textbox after creating new message
                this.setState({newMessage: ''});


    }

    handleChange(e) {
        this.setState({ newMessage: e.target.value });
    }


    convertTimestampToTime(timestamp) {
        // Create a new JavaScript Date object based on the timestamp
        // multiplied by 1000 so that the argument is in milliseconds, not seconds.
        const date = new Date(timestamp*1000);
        // Hours part from the timestamp
        const hours = date.getHours();
        // Minutes part from the timestamp
        const minutes = date.getMinutes();
        // Seconds part from the timestamp
        const seconds = date.getSeconds();

        return [date, hours, minutes, seconds];
    }

    render() {

            return (
                <section className="messages-component">
                    <div>
                        <h2>Messages:</h2>
                        <ul>
                                {this.state.messages.filter((message) => message.roomID === Number(this.props.activeRoomKey))
                                    .map((message, index) => (
                                        <li key={index}>
                                             {message.username}
                                             {message.content}
                                             {this.convertTimestampToTime(message.sentAt)}
                                        </li>
                                ))}
                        </ul>
                    </div>

                    <div>
                        <form id="create-message" method="post" onSubmit={ (e) => { this.handleSubmit(e) } }>
                            <input type="text"
                                   name = "newMessageField"
                                   value={this.state.newMessage}
                                   onMessageSubmit={(e) => this.handleMessageSubmit(e)}
                                   onChange={ (e) => this.handleChange(e) }/>

                            <input ref="newMessageFormSubmit" type="submit" value="Enter" />
                        </form>
                    </div>
                </section>

            );

        }
    }

export default MessageList;