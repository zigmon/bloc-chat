import React, { Component } from 'react';
import '.././User.css';


class User extends Component {


    handleClick(e) {
        if(e.target.value === 'Sign In') {
            const provider = new this.props.firebase.auth.GoogleAuthProvider();
            this.props.firebase.auth().signInWithPopup( provider );
        }
        else {
            this.props.firebase.auth().signOut();
        }
    }

    componentDidMount() {
        this.props.firebase.auth().onAuthStateChanged(user => {
            this.props.setUser(user);
        });
    }

    render() {
        if(this.props.user === null) {
            return (
                <span className='userLoginButtons'>
                    <span>You are not yet signed in - you appear as 'Guest'  </span>
                    <div>  </div>
                    <button onClick={(e) => this.handleClick(e)} value="Sign In">SIGN IN</button>
                </span>
            );
        }
        else {
            return (
                <span className='userLoginButtons'>
                    <span>Signed in as   {this.props.user.displayName}  </span>
                    <div>  </div>
                    <button onClick={(e) => this.handleClick(e)} value="Sign Out">SIGN OUT</button>
                </span>
            );
        }
    }
}

export default User;