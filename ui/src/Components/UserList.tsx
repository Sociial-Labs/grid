import React from "react";
import List from "./List";
import "../Styles/UserList.css";

class UserList extends React.Component<{address: string}, any> {
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
        <img
          className="Profile"
          src="https://media-exp1.licdn.com/dms/image/C5603AQEzeJ-k5MxDOg/profile-displayphoto-shrink_400_400/0?e=1602115200&v=beta&t=Jnot2o04JdtET8XdZ4zjCY4NEb_4L1f0fXKIIotGd5I"
          alt=""
          width="150"
          height="150"
        ></img>
        <div className="Username">User: {this.props.address}</div>
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

export default UserList;
