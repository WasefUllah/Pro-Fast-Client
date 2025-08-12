import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import SocialLogin from "../SocialLogin/SocialLogin";
import useAuth from "../../../hooks/useAuth";
import axios from "axios";
import { FiCheckCircle, FiTrash2, FiUpload } from "react-icons/fi";
import userAxios from "../../../hooks/userAxios";
import toast, { Toaster } from "react-hot-toast";

const Register = () => {
  const { createUser, updateUserProfile } = useAuth();
  const axiosInstance = userAxios();
  const navigate = useNavigate();
  const [profilePic, setProfilePic] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    // console.log(data);
    createUser(data?.email, data?.password)
      .then(async (result) => {
        console.log(result);
        // update user profile in database
        const userInfo = {
          email: data.email,
          photoURL: profilePic,
          role: "user", // default role
          createdAt: new Date().toISOString(),
          lastLogin: new Date().toISOString(),
        };

        const userResponse = await axiosInstance.post("/users", userInfo);
        console.log(userResponse);
        if (userResponse.data.insertedId) {
          toast.success("Welcome! User added successfully.");
        }

        // update user profile in firebase
        const profileInfo = {
          displayName: data.name,
          photoURL: profilePic,
        };
        updateUserProfile(profileInfo)
          .then(() => {
            navigate("/");
          })
          .catch((error) => {
            toast.error(error);
          });
      })
      .catch((error) => console.log(error));
  };

  const handleImage = async (e) => {
    const img = e.target.files[0];
    console.log(img);
    console.log(import.meta.env.VITE_image_upload_key);

    const formData = new FormData();
    formData.append("image", img);

    const res = await axios.post(
      `https://api.imgbb.com/1/upload?key=${
        import.meta.env.VITE_image_upload_key
      }`,
      formData
    );

    setProfilePic(res.data.data.url);
  };

  const removeImage = () => {
    setProfilePic("");
    console.log(document.getElementById("file"));
    document.getElementById("file").value = "";
  };
  return (
    <div className=" bg-base-200 ">
      <Toaster></Toaster>
      <h1 className="text-5xl font-bold my-2">Create an account!</h1>

      <div className="card bg-base-100  w-full max-w-sm shrink-0 shadow-2xl">
        <form onSubmit={handleSubmit(onSubmit)} className="card-body ">
          <fieldset className="card ">
            <label className="label">Name</label>
            <input
              type="text"
              {...register("name", { required: true })}
              className="input"
              placeholder="Name"
            />
            {errors.name?.type == "required" && (
              <p className="text-red-400">Name is required</p>
            )}

            <div>
              <label className="label flex items-center gap-2">
                Profile Picture
                {profilePic ? (
                  <FiCheckCircle className="text-green-500 text-xl" />
                ) : (
                  <FiUpload className="text-gray-400 text-xl" />
                )}
              </label>

              <input
                id="file"
                type="file"
                onChange={handleImage}
                className="input"
                placeholder="Profile Picture"
              />

              {profilePic ? (
                <div className="mt-3 flex flex-col items-start">
                  <img
                    src={profilePic}
                    alt="Profile Preview"
                    className="w-24 h-24 rounded-full border object-cover"
                  />
                  <div className="flex items-center gap-2 mt-2">
                    <p className="text-green-600 font-semibold">
                      Image Uploaded
                    </p>
                    <button
                      type="button"
                      onClick={removeImage}
                      className="flex items-center gap-1 text-red-500 hover:text-red-700"
                    >
                      <FiTrash2 /> Remove
                    </button>
                  </div>
                </div>
              ) : (
                <p className="text-gray-500 mt-2">No image selected yet</p>
              )}
            </div>

            <label className="label">Email</label>
            <input
              type="email"
              {...register("email", { required: true })}
              className="input"
              placeholder="Email"
            />
            {errors.email?.type == "required" && (
              <p className="text-red-400">Email is required</p>
            )}
            <label className="label">Password</label>
            <input
              type="password"
              {...register("password", { required: true, minLength: 6 })}
              className="input"
              placeholder="Password"
            />
            {errors.password?.type == "required" && (
              <p className="text-red-400">Password is required</p>
            )}
            {errors.password?.type == "minLength" && (
              <p className="text-red-400">
                Password max be at least 6 characters
              </p>
            )}
            <div>
              <a className="link link-hover">Forgot password?</a>
            </div>
            <div>
              <button
                type="submit"
                className="btn btn-primary w-full text-black mt-4"
              >
                Login
              </button>
            </div>
          </fieldset>
          <p>
            <small>
              Already have an account?{" "}
              <Link className="btn btn-link" to={"/login"}>
                Login
              </Link>
            </small>
          </p>
        </form>
        <SocialLogin></SocialLogin>
      </div>
    </div>
  );
};

export default Register;
