import React, {useEffect, useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import * as service from "../../services/security-service"

const Profile = () => {
  const navigate = useNavigate();
  const [profile, setProfile] = useState({});

  // retrieve the currently logged in user
  useEffect(async () => {
    try {
      const user = await service.profile();
      setProfile(user);
    } catch (e) {
      navigate('/login');
    }
  }, []);

  //user logout
  const logout = () => {
    service.logout()
        .then(() => navigate('/login'));
  }

  return(
      <div>
        <h4>{profile.username}</h4>
        <h6>@{profile.username}</h6>
        <button onClick={logout}>
          Logout</button>
      </div>
  );

}
export default Profile;