import React, {useState, useEffect} from 'react';
import List from "./List";
import "../Styles/UserList.css";
import { withRouter } from 'react-router-dom';
import { useQuery, gql } from '@apollo/client';

export const FOLLOWERS_QUERY = gql`
  query GetFollows($profileAddress: Bytes!) {  
    follows(where: {parent: $profileAddress}) {
      child
    }
  }
`;

const UserList: React.FC<any> = ({account, match, grid}) => {
  const profileAddress = match.params.address
  const [followed, setFollowed] = useState(false)
  const [loadingButton, setLoadingButton] = useState(false) 
  const { loading, error, data, refetch } = useQuery(FOLLOWERS_QUERY, {variables: { profileAddress }})

  useEffect(() => {
    refetch()
  }, [match, followed])

  const handleFollow = () => {
    setLoadingButton(true)
    grid.methods.follow(match.params.address).send({ from: account, gas: 300000 })
    .once('receipt', (receipt: any) => {
      setLoadingButton(false)
      setFollowed(true)
    })
  }

  const handleUnfollow = () => {
    setLoadingButton(true)
    grid.methods.unfollow(match.params.address).send({ from: account, gas: 300000 })
    .once('receipt', (receipt: any) => {
      setLoadingButton(false)
      setFollowed(false)
    })
  };

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
      <div className="Username">{match.params.address}</div>
      {match.params.address === account? null :
      loadingButton? <button className="Follow Follow-white Follow-animated" disabled>Loading...</button> :
      !followed ? (
        <button
          className="Follow Follow-white Follow-animated"
          onClick={handleFollow}
        >
          Follow
        </button>
      ) : (
        <button
          className="Follow Follow-white Follow-animated"
          onClick={() => handleUnfollow()}
        >
          Unfollow
        </button>
      )}{" "}
      <div className="Container">
        {loading ? null :
        data.follows.map((follower: {child: string}, index: number) => (
          <List key={index} follower={follower.child} />
        ))}
      </div>
    </div>
  )
}

export default withRouter(UserList);
