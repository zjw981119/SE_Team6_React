import {useNavigate} from "react-router-dom";
import {useState} from "react";
import * as service from "../../services/security-service";


export const Login = () => {
    const [loginUser, setLoginUser] = useState({});
    const navigate = useNavigate()
    // login: if success --> navigate to mytuits screen
    const login = () =>
        service.login(loginUser)
            .then((user) => navigate('/profile/mytuits'))
            .catch(e => alert(e));
    const signup = () =>
        service.login(loginUser)
            .then((user) => navigate('/signup'))
            .catch(e => alert(e));

  return (
      <div>
          <h1>Login</h1>

          <div className="form-outline mb-4">
          <input onChange={(e) =>
              setLoginUser({...loginUser,
                  username: e.target.value})} type="email" id="form2Example1" className="form-control"/>
          <label className="form-label" htmlFor="form2Example1">Username</label>
      </div>
    <div className="form-outline mb-4">
        <input onChange={(e) =>
            setLoginUser({...loginUser,
                password: e.target.value})} type="password" id="form2Example2" className="form-control"/>
        <label className="form-label" htmlFor="form2Example2">Password</label>
    </div>
    <button onClick={login} type="button" className="btn btn-primary btn-block mb-4">Sign in</button>

    <div className="text-center">
        <p>Not a member? <a href="/#/signup">Register</a></p>

    </div>
      </div>
        );
};