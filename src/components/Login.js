import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { CurrentUserContext } from "../App";
import axios from "axios";

function Login() {
    
let {setCurrentUser} = useContext(CurrentUserContext)
  const [LUserName, setLUserName] = useState('')
  const [LPassWord, setLPassWord] = useState('') 
  const [users, setUsers] = useState('')
  const [validateMsg, setValidateMsg] = useState('')

  let navigate = useNavigate();



  useEffect(() => {
    console.log("Fetching user information");
    axios
      .get("http://localhost:8080/users/all")
      .then((response) => {
        console.log(response.data);
        setUsers(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const validateLogin = (e) => {
    console.log(LUserName)
    e.preventDefault()
    let matchedUserName = false;
    for (let u of users) {
      if (LUserName === u.UserName) {
        console.log(LUserName)
        matchedUserName = true;
        if (LPassWord === u.PassWord) {
          console.log(u.UserName, u.PassWord, u.UserAdmin);
          setCurrentUser(u);
          localStorage.setItem('currentUser', JSON.stringify(u))

          navigate('/');
        } else {
          setValidateMsg("Incorrect password, please try again.");
        }
      }
    }
    if (!matchedUserName) {
      setValidateMsg("Incorrect username, please register first.");
    }
  };

  return (
    <div className="container my-5">
        {validateMsg}
      <form>
        <div className="form-group">
          <label for="exampleInputUserName">Username</label>
          <input
            type="text"
            className="form-control"
            id="exampleInputUserName"
            aria-describedby="text"
            value={LUserName} onChange={e => setLUserName(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label for="exampleInputPassword1" >Password</label>
          <input
            type="password"
            className="form-control"
            id="exampleInputPassword1"
            placeholder="Password"
            value={LPassWord} onChange={e => setLPassWord(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-primary" onClick={validateLogin}>
          Submit
        </button>
      </form>
    </div>
  );
}

export default Login;
