import React from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router";
import SocialLogin from "../SocialLogin/SocialLogin";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <div className=" bg-base-100 ">
      <h1 className="text-5xl font-bold my-2">Please login!</h1>{" "}
      <div className="card bg-base-100  w-full max-w-sm shrink-0 shadow-2xl">
        <form onSubmit={handleSubmit(onSubmit)} className="card-body">
          <fieldset className="fieldset">
            <label className="label">Email</label>
            <input
              type="email"
              {...register("email")}
              className="input"
              placeholder="Email"
            />
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
