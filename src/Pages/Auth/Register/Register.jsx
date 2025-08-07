import React from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router";
import SocialLogin from "../SocialLogin/SocialLogin";
import useAuth from "../../../hooks/useAuth";

const Register = () => {
  const { createUser } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    // console.log(data);
    createUser(data?.email, data?.password)
      .then((result) => console.log(result))
      .catch((error) => console.log(error));
  };
  return (
    <div className=" bg-base-200 ">
      <h1 className="text-5xl font-bold my-2">Create an account!</h1>

      <div className="card bg-base-100  w-full max-w-sm shrink-0 shadow-2xl">
        <form onSubmit={handleSubmit(onSubmit)} className="card-body ">
          <fieldset className="card ">
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
