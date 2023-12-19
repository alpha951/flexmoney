import { useState } from "react";
import {
  Card,
  Input,
  Checkbox,
  Button,
  Typography,
  Select,
  Option,
  CardHeader,
  CardBody,
  CardFooter,
} from "@material-tailwind/react";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Form() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    age: "",
    batchId: "1", // Default batch: 5-6 PM
  });
  //   const [batchId, setBatchId] = useState("1"); // Default batch: 5-6 PM
  const [loading, setLoading] = useState(false);

  const handleSelectChange = (e) => {
    console.log(e);
    setFormData((prevData) => ({ ...prevData, ["batchId"]: e }));
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    //console.log(name, value);
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async () => {
    // Validate age
    if (formData.name === "") {
      toast.error("Name is required", {
        position: toast.POSITION.TOP_RIGHT,
      });
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isValidEmail = emailRegex.test(formData.email);

    if (!isValidEmail) {
      toast.error("A valid email is required", {
        position: toast.POSITION.TOP_RIGHT,
      });
      return;
    }
    if (formData.age === "") {
      toast.error("Age is required", {
        position: toast.POSITION.TOP_RIGHT,
      });
      return;
    }
    if (formData.age < 18 || formData.age > 65) {
      toast.error(
        `Age value is ${formData.age}!
        Age must be between 18 and 65`,
        {
          position: toast.POSITION.TOP_RIGHT,
        }
      );
      return;
    }
    //console.log(formData);
    // Make a call to the backend API
    setLoading(true);
    try {
      console.log(JSON.stringify(formData));
      const response = await fetch("/api/v1/user/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      console.log(data.error.explanation);

      // Handle success or show an alert
      if (data.success === true) toast.success(data.message);
      else toast.error(data.error.explanation);
    } catch (error) {
      //console.error("Error submitting form:", error);
      // Handle error or show an alert
      toast.error("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card color='transparent' shadow={true} className='w-96'>
      <CardHeader
        variant='gradient'
        color='gray'
        className='mb-4 grid h-24 place-items-center'>
        <Typography variant='h3' color='white'>
          YogaPulse
        </Typography>
      </CardHeader>
      <Typography color='gray' className='mt-1 font-normal'>
        Nice to meet you! Enter your details to register.
      </Typography>
      <form className='mt-8 mb-2 w-80 max-w-screen-lg sm:w-96'>
        <CardBody className='flex flex-col gap-4'>
          <div className='mb-1 flex flex-col gap-6'>
            <Input
              size='lg'
              placeholder='John Doe'
              label='Name'
              name='name'
              value={formData.name}
              onChange={handleChange}
            />

            <Input
              size='lg'
              placeholder='john@yogapulse.com'
              label='Email'
              name='email'
              value={formData.email}
              onChange={handleChange}
            />

            <Input
              size='lg'
              placeholder='24'
              label='Age'
              name='age'
              value={formData.age}
              onChange={handleChange}
            />
            <Typography
              variant='small'
              color='gray'
              className='mt-0.1 flex items-center gap-1 font-normal'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                viewBox='0 0 24 24'
                fill='currentColor'
                className='-mt-px h-4 w-4'>
                <path
                  fillRule='evenodd'
                  d='M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm8.706-1.442c1.146-.573 2.437.463 2.126 1.706l-.709 2.836.042-.02a.75.75 0 01.67 1.34l-.04.022c-1.147.573-2.438-.463-2.127-1.706l.71-2.836-.042.02a.75.75 0 11-.671-1.34l.041-.022zM12 9a.75.75 0 100-1.5.75.75 0 000 1.5z'
                  clipRule='evenodd'
                />
              </svg>
              Age must be between 18 and 65 to sign up.
            </Typography>

            <Select
              color='zinc-400'
              label='Select Batch'
              name='batchId'
              value={formData.batchId}
              onChange={handleSelectChange}>
              <Option value='1'>6-7 AM</Option>
              <Option value='2'>7-8 AM</Option>
              <Option value='3'>8-9 AM</Option>
              <Option value='4'>5-6 PM</Option>
            </Select>
          </div>
          <Checkbox
            label={
              <Typography
                variant='small'
                color='gray'
                className='flex items-center font-normal'>
                <span className='font-medium transition-colors hover:text-gray-900'>
                  &nbsp; I&apos;ve paid the fees and agree to the T&C.
                </span>
              </Typography>
            }
            containerProps={{ className: "-ml-2.5" }}
          />
        </CardBody>
        <CardFooter className='pt-0'>
          <Button
            onClick={handleSubmit}
            className='mt-6'
            fullWidth
            disabled={loading}>
            {loading ? "wait...uff my free db is slow..." : "Sign up"}
          </Button>
        </CardFooter>
      </form>
      <ToastContainer />
    </Card>
  );
}
