"use client";
import { setCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import { useState } from "react";

const Signup = () => {
  const [formData, setFormData] = useState({
    email: "",
    firstName: "",
    lastName: "",
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

      const resJSON = await res.json();
      console.log(resJSON);
      if (res?.status != 409) {
        loginUser();
      }

      console.log(res, "res");
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
    if (!formData.email || !formData.firstName) {
      console.log("all fields are required");
    } else {
      createNewUser();
    }
  };

  return (
    <div>
      <div>This is a signup page</div>
      <div>Email: </div>
      <input
        style={{ border: "2px solid black" }}
        name="email"
        placeholder="Email"
        value={formData.email}
        onChange={(e) => formDataChangeHandler(e)}
      />
      <div>First Name: </div>
      <input
        style={{ border: "2px solid black" }}
        name="firstName"
        placeholder="First Name"
        value={formData.firstName}
        onChange={(e) => formDataChangeHandler(e)}
      />
      <div>Last Name: </div>
      <input
        style={{ border: "2px solid black" }}
        name="lastName"
        placeholder="Last Name"
        value={formData.lastName}
        onChange={(e) => formDataChangeHandler(e)}
      />
      <button onClick={submitForm}>Submit</button>
    </div>
  );
};

export default Signup;
