import React, { useState, useEffect } from "react";
import { auth } from "../../firebase";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { createOrUpdateUser } from "../../functions/auth";

const Registercomplete = ({ history }) => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  useEffect(() => {
    setEmail(window.localStorage.getItem("emailForRegistration"));
    setName(window.localStorage.getItem(""));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error("Email And Password Must Required");
      return;
    } else if (password.length < 6) {
      toast.error("Password length must greater than 6");
      return;
    }

    try {
      const result = await auth.signInWithEmailLink(
        email,
        window.location.href
      );

      if (result.user.emailVerified) {
        //remove user form localstorage
        window.localStorage.removeItem("emailForRegistration");
        //get user token
        let user = auth.currentUser;
        await user.updatePassword(password);
        const idTokenResult = await user.getIdToken();
        createOrUpdateUser(idTokenResult)
          .then((res) => {
            dispatch({
              type: "LOGGED_IN_USER",
              payload: {
                name: res.data.name,
                email: res.data.email,
                token: idTokenResult,
                role: res.data.role,
                _id: res.data._id,
              },
            });
          })
          .catch((err) => { console.log(err) });

        //redux Store
        //redirect
        history.push("/");
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  const completeRegistrationForm = () => (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        className="form-control"
        name="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        autoFocus
        disabled
      />
      <br />
      <input
        type="text"
        className="form-control"
        name="name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        autoFocus
      />
      <br />

      <input
        type="text"
        className="form-control"
        name="address"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        placeholder=" Your Address"
      />
      <br />

      <input
        type="password"
        className="form-control"
        name="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      />
      <br />
      <button type="submit" className="btn btn-raised mt-2">
        Complete Registration
      </button>
    </form>
  );

  return (
    <div className="container p-5">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <h4>Register Complete</h4>
          {completeRegistrationForm()}
        </div>
      </div>
    </div>
  );
};

export default Registercomplete;
