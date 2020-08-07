import React, {useState, useEffect} from 'react';
import List from "./List";
import "../Styles/UserList.css";
import { withRouter } from 'react-router-dom';
import { useQuery, gql } from '@apollo/client';

export const FOLLOWERS_QUERY = gql`
  query GetFollows($profileAddress: Bytes!) {  
    follows(where: {parent: $profileAddress}, orderBy: id, orderDirection: desc) {
      child
      id
    },
    unfollows(where: {parent: $profileAddress}, orderBy: id, orderDirection: desc) {
      child
      id
    }
  }
`;

const UserList: React.FC<any> = ({account, match, grid}) => {
  const profileAddress = match.params.address
  const [loadingButton, setLoadingButton] = useState(false) 
  // const [followed, setFollowed] = useState(false)
  const { loading, error, data, refetch } = useQuery(FOLLOWERS_QUERY, {variables: { profileAddress }})

  useEffect(() => {
    refetch()
  }, [match.params.address])

  const handleFollow = () => {
    setLoadingButton(true)
    grid.methods.follow(match.params.address).send({ from: account, gas: 300000 })
    .once('receipt', (receipt: any) => {
      setLoadingButton(false)
      refetch()
      // setFollowed(true)
    })
  }

  const handleUnfollow = () => {
    setLoadingButton(true)
    grid.methods.unfollow(match.params.address).send({ from: account, gas: 300000 })
    .once('receipt', (receipt: any) => {
      setLoadingButton(false)
      refetch()
      // setFollowed(false)
    })
  };

  const individualAddresses = () => {
    let addressSet = new Set<string>()
    data.follows.forEach((follower: {child: string, id: string}) => {
      if (!addressSet.has(follower.child)) {
        addressSet.add(follower.child)
        for(let i in data.unfollows) {
          if (parseInt(data.unfollows[i].id, 16) < parseInt(follower.id, 16)) break
          if (data.unfollows[i].child === follower.child) {
            addressSet.delete(follower.child)
            break
          }
        }
      }
    })
    return addressSet
  }

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
      {loading? null :
        <div>

          {match.params.address === account? null :
          (loadingButton)? <button className="Follow Follow-white Follow-animated" disabled>Loading...</button> :
          !individualAddresses().has(account.toLowerCase()) ? (
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
          )}

          <div className="Container">
            {Array.from(individualAddresses()).map((follower: string, index: number) => (
              <List key={index} follower={follower} />
            ))}
          </div>

        </div>
      }

      

    </div>
  )
}

export default withRouter(UserList);
