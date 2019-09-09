import React, { Component } from 'react';
import '.././App.css';


class RoomList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            rooms: [],
            newRoomName: ''
        }
        this.roomsRef = this.props.firebase.database().ref('rooms');
    }

    componentDidMount() {
        this.roomsRef.on('child_added', snapshot => {
            const room = snapshot.val();
            room.key = snapshot.key;
            this.setState({ rooms: this.state.rooms.concat( room )});
        })
    }

    createRoom(newRoomName) {
        this.roomsRef.push({
            name: newRoomName,
            createdAt: Date.now()
        });
        this.setState({ newRoomName: '' });
    }

    handleChange(e) {
        this.setState({ newRoomName: e.target.value });
    }

    handleSubmit(e) {
        e.preventDefault();
        this.createRoom(this.state.newRoomName);
    }

    render()
    {
        return (
            <section className="sidebar">

                    {this.state.rooms.map(room =>
                    <h2 key={room.index}>
                        <button className="sidebar-room" onClick={ () => this.props.setActiveRoom(room) }>{ room.name }</button>
                    </h2>
                    )}


                <form id="create-room" onSubmit={ (e) => { this.handleSubmit(e) } }>
                    <input type="text" value={ this.state.newRoomName } onChange={ this.handleChange.bind(this) } name="newRoomName" placeholder="New Room" />
                    <input type="submit" value="+" />
                </form>
            </section>
        );
    }
}

export default RoomList;