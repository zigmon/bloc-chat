import React, { Component } from 'react';
import './App.css';
import * as firebase from 'firebase';
import RoomList from './components/RoomList';
import MessageList from './components/MessageList';
import User from './components/User';

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

//Create an instance of the Google Provider object for user auth
var provider = new firebase.auth.GoogleAuthProvider();

class App extends Component {

    constructor (props) {
        super(props);

        this.state = {
            //changed activeRoom and activeRoomKey from 'null' to 'undefined'
            activeRoom: null,
            activeRoomKey: null,
            //added 'username: null'
            user: null
        }
    }

    setActiveRoom(room) {
        this.setState({
            activeRoom: room,
            activeRoomKey: room.key
        });
    }

    setUser(newUser) {
        if(newUser !== null) {
            this.setState({ user: newUser });
        }
        else {
            this.setState({ user: null });
        }
    }


    render() {
        return (
            <div>
                <header>
                    <User firebase={firebase}
                          user={this.state.user}
                          setUser={(newUser) => this.setUser(newUser)}/>
                </header>

                <aside>
                    <RoomList firebase={firebase}
                              activeRoom={this.state.activeRoom}
                              activeRoomKey={this.state.activeRoomKey}
                              setActiveRoom={(e) => this.setActiveRoom(e)}/>
                </aside>

                <main>
                    <MessageList firebase={firebase}
                                 activeRoom={this.state.activeRoom}
                                 activeRoomKey={this.state.activeRoomKey}
                                 setActiveRoom={(e) => this.setActiveRoom(e)}/>
                </main>
            </div>

        );
    }
}

export default App;
