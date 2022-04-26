import {useEffect, useState} from "react";
import * as service from "../../services/security-service";
import {useNavigate} from "react-router-dom";
import {UserList} from "./user-list";
import * as usersService from "../../services/users-service";

const Signup = () => {
    const [existingUsers, setExistingUsers] = useState([]);
    const [newUser, setNewUser] = useState({});
    const navigate = useNavigate();

    // just for create tuits conveniently
    const deleteUser = (uid) =>
        usersService.deleteUser(uid)
            .then(findAllUsers)
    const findAllUsers = () =>
        usersService.findAllUsers()
            .then(users => {
                setExistingUsers(users)
            })
    useEffect(findAllUsers, []);

    // If the response is successful the screen navigates to the profile screen
    // Otherwise an alert pops up and stays in the signup screen.
    const signup = () =>
        service.signup(newUser)
            .then(() => navigate('/home'))
            .catch(e => alert(e));
    return (
        <div>
            <h1>Signup</h1>
            <input className="mb-2 form-control"
                   onChange={(e) =>
                       setNewUser({...newUser, username: e.target.value})}
                   placeholder="username"/>
            <input className="mb-2 form-control"
                   onChange={(e) =>
                       setNewUser({...newUser, password: e.target.value})}
                   placeholder="password" type="password"/>
            <input className="mb-2 form-control"
                   onChange={(e) =>
                       setNewUser({...newUser, email: e.target.value})}
                   placeholder="email" type="email"/>
            <button onClick={signup}
                    className="btn btn-primary mb-5">Signup
            </button>


            <h1>Login As</h1>

            <UserList users={existingUsers} deleteUser={deleteUser}/>
        </div>
    );
}
export default Signup;