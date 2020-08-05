import React from "react";
import List from "./List";
import "../Styles/UserList.css";
import { withRouter } from 'react-router-dom';

class UserList extends React.Component<any, any> {
  constructor(props: any) {
    super(props)
    this.state = {
      parentfollowersList: ["ed", "edd", "eddy"],
      childfollowsList: [],
      followed: false,
    };
  }

  handleFollow = () => {
    this.setState({
      followed: true,
      parentfollowersList: [
        this.state.childId,
        ...this.state.parentfollowersList,
      ],
      childfollowsList: [this.state.parentId, ...this.state.childfollowsList],
    });
  };

  handleUnfollow = (id: string) => {
    this.setState({
      followed: false,
      parentfollowersList: this.state.parentfollowersList.filter(
        (id: string) => this.state.childId !== id
      ),
      childfollowsList: this.state.childfollowsList.filter(
        (id: string) => this.state.parentId !== id
      ),
    });
  };

  render() {
    return (
      <div>
        <br/>
        <br/>
        <img
          className="Profile"
          src="https://lafeber.com/pet-birds/wp-content/uploads/2018/06/Parakeet.jpg"
          alt=""
          width="150"
          height="150"
        ></img>
        <div className="Username">{this.props.match.params.address}</div>
        {!this.state.followed ? (
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
