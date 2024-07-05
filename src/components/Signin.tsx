"use client";
import { setCookie } from "cookies-next";
import { useRouter } from "next/router";
import { useState } from "react";

const Signin = () => {
  const [formData, setFormData] = useState({
    email: "",
    username: "",
    password: "",
  });
  const [newUserInfo, setNewUserInfo] = useState(null);
  const router = useRouter();

  const createNewUser = async () => {
    try {
      const res: any = await fetch(
        "http://localhost:8000/api/v1/users/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );
      loginUser();
    } catch (error) {
      console.error(error, "something went wrong");
    }
  };

  const loginUser = async () => {
    try {
      const res: any = await fetch("http://localhost:8000/api/v1/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      const { accessToken, refreshToken } = data?.data;
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);
      setCookie("accessToken", accessToken);
      setCookie("refreshToken", refreshToken);
      setNewUserInfo(data);
      router.push("/dashboard");
    } catch (error) {
      console.error(error, "something went wrong");
    }
  };

  const formDataChangeHandler = (e: any) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const submitForm = () => {
    if (!formData.email || !formData.username || !formData.password) {
      console.log("all fields are required");
    } else {
      createNewUser();
    }
  };

  return (
    <div>
      <div>This is a signin page</div>
      <div>Email: </div>
      <input
        style={{ border: "2px solid black" }}
        name="email"
        placeholder="Enter email"
        value={formData.email}
        onChange={(e) => formDataChangeHandler(e)}
      />
      <div>Username: </div>
      <input
        style={{ border: "2px solid black" }}
        name="username"
        placeholder="Enter username"
        value={formData.username}
        onChange={(e) => formDataChangeHandler(e)}
      />
      <div>Password: </div>
      <input
        name="password"
        style={{ border: "2px solid black" }}
        placeholder="Enter a strong password"
        value={formData.password}
        onChange={(e) => formDataChangeHandler(e)}
      />
      <button onClick={submitForm}>Submit</button>
    </div>
  );
};

export default Signin;
