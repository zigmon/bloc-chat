import React, { Component } from 'react';
import '.././MessageList.css';
import '.././App.js'


class MessageList extends Component {
    constructor(props) {

        super(props);

        this.state = {


            allMessages: [],
            displayedMessages: [],
            newMessageText: '',
            activeRoomKey: null

        };


        this.messagesRef = this.props.firebase.database().ref("messages");
    }

    showMessages(activeRoomKey) {
        this.setState({ allMessages: this.state.allMessages.filter( message => message.roomID === activeRoomKey )});
    }

    componentDidMount() {
        this.messagesRef.on('child_added', snapshot => {

            const message = snapshot.val();
            message.key = snapshot.key;
            this.setState({ displayedMessages: this.state.allMessages.concat( message ) }, () => {

                this.showMessages( this.props.activeRoomKey )
            });
        });
    }


    componentWillReceiveProps(nextProps) {
        this.showMessages( nextProps.activeRoomKey );
    }





    render() {
        return (
            <section className="messages-component">
                <h2 className="room-name">{ this.props.activeRoomKey ? this.props.activeRoomKey : '' }</h2>
                {this.state.allMessages.map(message =>
                    <ul id="message-list">
                        {this.state.displayedMessages.map( message =>
                            <li key={message.key}>
                                <div className="username">
                                    { message.username }
                                </div>
                                <div className="content">
                                    { message.content }
                                </div>
                            </li>
                        )}
                    </ul>
                )}
            </section>
        );
    }

}

    export default MessageList;