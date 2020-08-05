import React from "react";
import List from "./List";
import "../Styles/UserList.css";
import { withRouter } from 'react-router-dom';

class UserList extends React.Component<any, any> {
  constructor(props: any) {
    super(props)
    this.state = {
      parentfollowersList: [],
      followed: false,
      loading: false
    };
  }

  handleFollow = () => {
    this.setState({ loading: true })
    this.props.grid.methods.follow(this.props.match.params.address).send({ from: this.props.account, gas: 300000 })
    .once('receipt', (receipt: any) => {
      this.setState({ 
        loading: false, 
        followed: true,
        parentfollowersList: [
          this.props.account,
          ...this.state.parentfollowersList,
        ]
      })
    })
  }

  handleUnfollow = (id: string) => {
    this.setState({ loading: true })
    this.props.grid.methods.unfollow(this.props.match.params.address).send({ from: this.props.account, gas: 300000 })
    .once('receipt', (receipt: any) => {
      this.setState({ 
        loading: false, 
        followed: false,
        parentfollowersList: this.state.parentfollowersList.filter(
          (id: string) => id !== this.props.account
        )
      })
    })
  };

  render() {
    return (
      <div>
        <br/>
        <br/>
        <img
          className="Profile"
          src="https://source.unsplash.com/collection/923267/150x150"
          alt="User profile"
          width="150"
          height="150"
        ></img>
        <div className="Username">{this.props.match.params.address}</div>
        {this.props.match.params.address === this.props.account? null :
        this.state.loading? <button className="Follow Follow-white Follow-animated" disabled>Loading...</button> :
        !this.state.followed ? (
          <button
            className="Follow Follow-white Follow-animated"
            onClick={this.handleFollow}
          >
            Follow
          </button>
        ) : (
          <button
            className="Follow Follow-white Follow-animated"
            onClick={() => this.handleUnfollow(this.state.childId)}
          >
            Unfollow
          </button>
        )}{" "}
        <div className="Container">
          {this.state.parentfollowersList.map((follower: string, index: number) => (
            <List key={index} follower={follower} />
          ))}
        </div>
      </div>
    );
  }
}

export default withRouter(UserList);
