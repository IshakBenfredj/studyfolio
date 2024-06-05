/* eslint-disable react/prop-types */
import { useState } from "react";
import Input from "../components/Input";
import images from "../constants/images";
import Button from "../components/Button";
import { Link } from "react-router-dom";

import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Axios from "../api";
import { handleError } from "../utils/toastify";

export default function LostPass() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [activeStep, setActiveStep] = useState(0);
  const [dataCC, setDataCC] = useState();

  const steps = ["Enter Email", "Enter Confirmation Code", "Reset Password"];
  return (
    <div className="p-5">
      <img src={images.logosfp} alt="" className="w-1/3 mx-auto mb-8" />
      <div className="grid grid-cols-2 items-center">
        <img src={images.fp} alt="" className="w-3/5 mx-auto" />
        <div className="space-y-5">
          <h1 className="text-primary font-bold text-2xl mb-3">
            Lost Password
          </h1>
          <div className="ml-0 w-4/5">
            <Stepper activeStep={activeStep}>
              {steps.map((label) => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>
          </div>
          {activeStep == 0 && (
            <FirstStep
              email={email}
              setEmail={setEmail}
              setDataCC={setDataCC}
              step={activeStep}
              setStep={setActiveStep}
            />
          )}
          {activeStep == 1 && (
            <SecondStep
              dataCC={dataCC}
              step={activeStep}
              setStep={setActiveStep}
            />
          )}
          {activeStep == 2 && (
            <ThirdStep
              password={password}
              setPassword={setPassword}
              step={activeStep}
              setStep={setActiveStep}
              email={email}
            />
          )}
          {activeStep == 3 && (
            <div className="w-2/3 space-y-4">
              <div className="text-green-500">Password Changed Successfuly</div>
              <Link to={"/"} className="block text-gray-500 text-center">
                {" "}
                &lt; Back to Login{" "}
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

const FirstStep = ({ email, setEmail, step, setStep, setDataCC }) => {
  const [loading, setLoading] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await Axios.post("/send_cc", { email });
      setDataCC(data);
      setStep(step + 1);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  return (
    <form className="space-y-3 w-2/3" onSubmit={handleSubmit}>
      <p className="capitalize text-gray-600">
        Enter your email, then check your email inbox
      </p>
      <div>
        <Input
          type={"email"}
          name={"email"}
          label={"Your Email"}
          set={setEmail}
          state={email}
        />
      </div>
      <Button text={"Send Confirmation Code"} loading={loading} />
      <Link to={"/"} className="block text-gray-500 text-center">
        {" "}
        &lt; Back to Login{" "}
      </Link>
    </form>
  );
};

const SecondStep = ({ step, setStep, dataCC }) => {
  const [cc, setCC] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (dataCC == cc) {
      setStep(step + 1);
    } else {
      handleError("Wrong Confirmation Code, pleaze try again!");
    }
    setLoading(false);
  };
  return (
    <form className="space-y-3 w-2/3" onSubmit={handleSubmit}>
      <p className="capitalize text-gray-600">
        we send a Confirmation code to your email
      </p>
      <div>
        <Input
          type={"text"}
          name={"cc"}
          label={"XXXXXX"}
          set={setCC}
          state={cc}
        />
      </div>
      <Button text={"Confirm Mail"} loading={loading} />
      <Link to={"/"} className="block text-gray-500 text-center">
        {" "}
        &lt; Back to Login{" "}
      </Link>
    </form>
  );
};

const ThirdStep = ({ email, password, setPassword, step, setStep }) => {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await Axios.post("/reset_password", { password, email });
      setStep(step + 1);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };
  return (
    <form className="space-y-3 w-2/3" onSubmit={handleSubmit}>
      <p className="capitalize text-gray-600">
        Now, You can change your password
      </p>
      <div>
        <Input
          type={"text"}
          name={"password"}
          label={"New Password"}
          set={setPassword}
          state={password}
        />
      </div>
      <Button text={"Reset Password"} loading={loading} />
      <Link to={"/"} className="block text-gray-500 text-center">
        {" "}
        &lt; Back to Login{" "}
      </Link>
    </form>
  );
};
