import React, { Component } from 'react';
import '.././RoomList.css';


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
            <section className="room-list">

                {this.state.rooms.map(room =>
                    <li key={room.key}>
                        <button className="room-name" onClick={ () => this.props.setActiveRoom(room) }>{ room.name }</button>
                    </li>
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