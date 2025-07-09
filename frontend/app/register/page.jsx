"use client";

import Link from "next/link";
import { useState } from "react";
import api from "@/api/api";

const page = () => {
  const [formData, setFormdata] = useState([]);
  const [errmessage, setErrmessage] = useState(false);

  const onhandleChange = (e) => {
    const { name, value } = e.target;
    setFormdata({ ...formData, [name]: value });
  };

  const onHandleSumbit = async (e) => {
    e.preventDefault();

    try {
      await api.post("/auth/register", formData);

      alert("saved");
    } catch (err) {
      console.log(err);
      setErrmessage(err.response.data.message);
    }
  };

  console.log(formData);
  console.log(errmessage);

  return (
    <>
      <section className="form">
        <div className="container">
          <div className="wrapper">
            <div className="login-form">
              <h2>Sign up</h2>
              <form action="" onSubmit={onHandleSumbit}>
                <input
                  type="text"
                  placeholder="User name"
                  name="name"
                  onChange={onhandleChange}
                />
                <input
                  type="text"
                  placeholder="Email"
                  name="email"
                  onChange={onhandleChange}
                />
                <input
                  type="text"
                  placeholder="Password"
                  name="password"
                  onChange={onhandleChange}
                />
                <p>
                  if you already a member <Link href="/login">Login</Link>
                </p>
                <button type="submit">Submit</button>

                {errmessage && <p style={{ color: "red" }}>{errmessage}</p>}
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default page;
