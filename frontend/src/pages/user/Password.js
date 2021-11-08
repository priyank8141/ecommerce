import { Button } from "antd";
import React, { useState } from "react";
import { toast } from "react-toastify";
import { auth } from "../../firebase";

function Password() {
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    console.log(password);
    await auth.currentUser
      .updatePassword(password)
      .then(() => {
        setLoading(false);
        setPassword("");
        toast.success("Password Updated Successfully");
      })
      .catch((err) => {
        setLoading(false);
        toast.error(err.message);
      });
  };
  const passwordUpdateForm = () => (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <input
          type="password"
          className="form-control"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Your New password"
          autoFocus
          disabled={loading}
        />
      </div>
      <br />
      <div className="form-group">
        <Button
          onClick={handleSubmit}
          type="primary"
          className="mb-3"
          block
          shape="round"
          size="large"
          disabled={password.length < 6}
        >
          Submit
        </Button>
      </div>
    </form>
  );
  return (
    <>
      <div style={{ margin: 15, padding: 15 }}>
        <h4>Update your Password</h4>
        {loading && <h5 className="text-danger">Loading</h5>}
        {passwordUpdateForm()}
      </div>
    </>
  );
}

export default Password;
