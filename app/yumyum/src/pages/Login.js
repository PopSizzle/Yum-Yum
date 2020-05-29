import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { auth } from "../utils/firebase";
import MainBody from "../components/Containers/mainBody";
import FormMain from "../components/Containers/formMain";
import API from "../utils/API";
import { useSessionContext } from "../utils/GlobalState";
import { useHistory } from "react-router-dom";
import { SET_CURRENT_USER, LOADING } from "../utils/actions";


const Login = () => {

  // brings in global state : we are storing, search, global user id, favorites, user generated
  const [state, dispatch] = useSessionContext();

  const [user, setUser] = useState({});
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  // console.log(user);
  // enable load (push) of another page
  const history = useHistory();

  const setCurrentUser = (yumUser) => {
    // console.log(`SetCurrentUser ID:${id}`)
    const CurrentUser = {}
    CurrentUser.id = yumUser.id;
    CurrentUser.email = yumUser.email;
    CurrentUser.username = yumUser.username;
    CurrentUser.name = yumUser.name;

    console.log(CurrentUser);
    setUser(CurrentUser);

    dispatch({
      type: LOADING
    });
    dispatch({
      type: SET_CURRENT_USER,
      user: CurrentUser
    });
  };

  const handleSubmit = event => {
    event.preventDefault();

    // LOGIN to Firebase
    auth.signInWithEmailAndPassword(email, password)

      // User FireBase Response to get the email and get the ID from Yum&Yum DB
      .then(fbRes => {
        console.log(fbRes)
        let userEmail = fbRes.user.email;
        API.getUserByEmail(userEmail)

          // Get the ID from Yum&Yum DB Response and set global User ID
          .then(dbUser => {
            console.log(dbUser.data);
            setCurrentUser(dbUser.data);
            setPassword("");
            // console.log(user);

            // Load myRecipes
            history.push("/myRecipes");
          })
      })
      .catch(err => { throw err })
  }

  return (
    <div>
      <MainBody>
        <FormMain>
          <h2>Login</h2>

          <div className="form-div col-md-6 col-sm-12">
            <form className="form user-form" onSubmit={handleSubmit}>
              <div className="form-group row">
                <label className="col-sm-2 col-form-label">Email</label>
                <div className="col-sm-10">
                  <input type="text" id="email" className="form-control"
                    // value={email}
                    name="email"
                    onChange={e => setEmail(e.target.value)}
                    placeholder="email" />
                </div>
              </div>
              <div className="form-group row">
                <label className="col-sm-2 col-form-label">Password</label>
                <div className="col-sm-10">
                  <input type="password" className="form-control" id="password"
                    // value={password}
                    name="password"
                    onChange={e => setPassword(e.target.value)}
                    placeholder="password" />
                </div>
              </div>
              <button type="submit" className="btn btn-primary">Login</button>
            </form>
          </div>
          <div>
          <Link to={"/signup"}>
            <button type="button" style={{ backgroundColor: "white", opacity:"70%", color: "#ff6754", border: "none", fontWeight: "300", fontSize: "larger" }}>Take me to Signup</button>
            </Link>
        </div>
        </FormMain>
      </MainBody>
    </div>
  )
}
export default Login;
