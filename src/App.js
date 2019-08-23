import React, { Component } from 'react';
import './App.css';
import * as firebase from 'firebase';
import RoomList from './components/RoomList';
import MessageList from './components/MessageList';

// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyCUy2m5_YXOEsDB3UjNteaU7Cm26A4K8rk",
    authDomain: "bloc-chat-61785.firebaseapp.com",
    databaseURL: "https://bloc-chat-61785.firebaseio.com",
    projectId: "bloc-chat-61785",
    storageBucket: "",
    messagingSenderId: "516906352525",
    appId: "1:516906352525:web:495c0665b6195ff2"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

class App extends Component {

    constructor (props) {
        super(props);

        this.state = {
            activeRoom: undefined,
            activeRoomKey: '',
            activeRoomName: ''

        }
    }

    setActiveRoom(room) {
        this.setState({activeRoom: room, activeRoomKey: room.key});
    }



    render() {
        return (
            <div className="App">
                <aside id="sidebar">
                    <h1 className="App-title">Bloc Chat</h1>

                    <RoomList firebase={firebase} activeRoomKey={this.state.activeRoomKey} setActiveRoom={this.setActiveRoom.bind(this)} />
                </aside>
                    <MessageList firebase={firebase} activeRoomKey={this.state.activeRoomKey} />
            </div>
        );
    }
}

export default App;