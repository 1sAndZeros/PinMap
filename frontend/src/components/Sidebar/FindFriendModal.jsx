import CrossIcon from '../../assets/icons/cross.svg?react';
import {useState, useEffect, useContext} from 'react';
import {authApi} from '../../utils/api';
import { CurrentUserContext } from '../../context/CurrentUserContext';

const FindFriendModal = ({showModal, setShowModal}) => {
    const { currentUser, setCurrentUser } = useContext(CurrentUserContext);
    const [allUsers, setAllUsers] = useState([]);
    
    


    useEffect(() => {
        authApi
          .getUsers()
          .then((data) => {
            // remove ourselves
            const otherUsers = data.users.filter(
              (user) => user._id !== currentUser._id
            );
            setAllUsers(otherUsers);
          })
          .catch((err) => console.log(err));
      }, []);

        

    const addFriend = (friendId) => {
           authApi.addFriend(friendId)
            .then(data => {
           let userInfo = data.user;
            setCurrentUser(() => userInfo)
            localStorage.setItem("userInfo", JSON.stringify(userInfo));  
        })
        .catch(err => console.log(err))

    }
    const removeFriend = (friendId) => {
           authApi.removeFriend(friendId)
            .then(data => {
           let userInfo = data.user;
            setCurrentUser(() => userInfo)
            localStorage.setItem("userInfo", JSON.stringify(userInfo));  
        })
        .catch(err => console.log(err))

    }

    const truncate =  (str, maxLength) => {
        if (str.length <= maxLength) {
          return str;
        }
        
        return str.slice(0, maxLength) + '...';
      }
      if (!showModal) {
        return null;
      }
    return(

        <div className='friend-modal'>
            <div onClick={() => setShowModal(false)}>
            <CrossIcon />
            </div>
            <h3>
                Search For Friends
            </h3>
            <ul className="users">
                {allUsers.map(user => {
                    return(
                        <li className="user" key={user._id}>
                            <img className="user-img" src={user.profileImage ? user.profileImage : `https://eu.ui-avatars.com/api/?name=${user.username}&length=1`} alt={user.username} />
                            <p className="user-name">{truncate(user.username, 15)}</p>
                            {
                            (currentUser.friends.find((friend) => friend._id === user._id) ? 
                            <button className="add-friend" onClick={() => removeFriend(user._id)}>Unfriend</button>:
                            <button className="add-friend" onClick={() => addFriend(user._id)}>Friend</button> 
                                )
                            }

                        </li>
                    )
                
                }
                )}
            </ul>
        </div>
    )
}

export default FindFriendModal;