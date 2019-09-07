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
            const username = this.props.user === null ? 'Guest' : this.props.user;
                this.messagesRef.push({
                    username: username.displayName,
                    content: this.state.newMessage,
                    // added back removed .props. between this and firebase - wasn't  certain it's necessary - but caused undefined error
                    sentAt: this.props.firebase.database.ServerValue.TIMESTAMP,
                    roomID: this.props.activeRoomKey
                });
                // Clear textbox after creating new message
                this.setState({newMessage: ''});

    }

    handleChange(e) {
        this.setState({ newMessage: e.target.value });
        //this.refs.messageList.scrollIntoView();
    }

    timeConverter(timestamp) {
        let date = new Date(timestamp);
        let months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
        let year = date.getFullYear();
        let month = months[date.getMonth()];
        let d = date.getDate();
        // Hours part from the timestamp
        let hours = date.getHours();
        // Minutes part from the timestamp
        let minutes = date.getMinutes();
        // Seconds part from the timestamp
        let seconds = date.getSeconds();
        // Will display time in 10:30:23 format
        let formattedTime = ' ' + month + d + ' ' + year + ' ' + hours + ':' + minutes + ':' + seconds ;

        return formattedTime;

    }
    render() {

            return (
                <section className="messages-component">
                    <div>
                        <h2>Room Messages:</h2>
                        <ul>
                                {this.state.messages.filter((message) => message.roomID === this.props.activeRoomKey)
                                    .map((message, index) => (
                                        <li key={index}>
                                            <div>{message.username}</div>
                                            <div>{message.content}</div>
                                            {this.timeConverter(message.sentAt)}
                                        </li>
                                ))}
                        </ul>
                    </div>

                    <div>
                        <form id="create-message" method="post" onSubmit={ (e) => { this.handleSubmit(e) } }>
                            <input type="text"
                                   name = "newMessageField"
                                   value={this.state.newMessage}
                                   onKeyPress={(e) => this.handleMessageSubmit(e)}
                                   onChange={ (e) => this.handleChange(e) }
                                />

                            <input ref="newMessageFormSubmit" type="submit" value="Enter" />
                        </form>
                    </div>


                </section>

            );



        }
    }

export default MessageList;