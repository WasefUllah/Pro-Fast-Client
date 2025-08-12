import React from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router";
import SocialLogin from "../SocialLogin/SocialLogin";
import useAuth from "../../../hooks/useAuth";
import { Toaster } from "react-hot-toast";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { signIn } = useAuth();
  const location = useLocation();
  console.log(location);
  const navigate = useNavigate();
  const from = location.state || "/";

  const onSubmit = (data) => {
    console.log(data, from);
    signIn(data.email, data.password)
      .then((result) => {
        console.log(result);
        navigate(from);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className=" bg-base-100 ">
      <Toaster></Toaster>
      <h1 className="text-5xl font-bold my-2">Please login!</h1>{" "}
      <div className="card bg-base-100  w-full max-w-sm shrink-0 shadow-2xl">
        <form onSubmit={handleSubmit(onSubmit)} className="card-body">
          <fieldset className="fieldset">
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
              {...register("password", { required: true, minLength: 5 })}
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
            <button type="submit" className="btn btn-primary text-black mt-4">
              Login
            </button>
          </fieldset>
          <p>
            <small>
              New to this website?{" "}
              <Link className="btn btn-link" to={"/register"}>
                Register
              </Link>
            </small>
          </p>
        </form>
        <SocialLogin></SocialLogin>
      </div>
    </div>
  );
};

export default Login;
