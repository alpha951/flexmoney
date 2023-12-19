import { Card, Typography, Button } from "@material-tailwind/react";
import HashLoader from "react-spinners/HashLoader";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect, useState } from "react";

const TABLE_HEAD = ["Name", "Email", "Age", "Batch", "Last Subscribed"];
const batchMap = { 1: "6-7AM", 2: "7-8AM", 3: "8-9AM", 4: "5-6PM" };

const formatUpdatedAt = (updatedAt) => {
  const date = new Date(updatedAt);
  const options = { month: "short", year: "numeric" };
  return date.toLocaleString("en-US", options);
};

export default function UserTable() {
  const [loading, setLoading] = useState(true);
  const [TABLE_ROWS, setTABLE_ROWS] = useState([]);
  useEffect(() => {
    async function fetchData() {
      try {
        const url = "/api/v1/user/";
        const response = await fetch(url, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await response.json();
        //   console.log(data.data);

        // Handle success or show an alert
        setLoading(false);
        if (data.success === true) {
          toast.success(data.message);
          setTABLE_ROWS(data.data);
        } else toast.error(data.error.explanation);
      } catch (error) {
        toast.error("Something went wrong!");
      }
    }
    fetchData(); // Call the fetchData function when the component mounts
  }, []);
  return (
    <>
      <Card className='h-full w-full overflow-visible	'>
        {loading ? (
          <HashLoader
            color='#10B981'
            loading={loading}
            size={150}
            aria-label='Loading Spinner'
            data-testid='loader'
          />
        ) : (
          <table className='w-full min-w-max table-auto text-left'>
            <thead>
              <tr>
                {TABLE_HEAD.map((head) => (
                  <th
                    key={head}
                    className='border-b border-blue-gray-100 bg-blue-gray-50 p-4'>
                    <Typography
                      variant='small'
                      color='blue-gray'
                      className='font-normal leading-none opacity-70'>
                      {head}
                    </Typography>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {TABLE_ROWS.map(
                ({ Name, Email, Age, batchId, updatedAt }, index) => {
                  const isLast = index === TABLE_ROWS.length - 1;
                  const classes = isLast
                    ? "p-4"
                    : "p-4 border-b border-blue-gray-50";

                  return (
                    <tr key={Name}>
                      <td className={classes}>
                        <Typography
                          variant='small'
                          color='blue-gray'
                          className='font-normal'>
                          {Name}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <Typography
                          variant='small'
                          color='blue-gray'
                          className='font-normal'>
                          {Email}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <Typography
                          variant='small'
                          color='blue-gray'
                          className='font-normal'>
                          {Age}
                        </Typography>
                      </td>

                      <td className={classes}>
                        <Typography
                          variant='small'
                          color='blue-gray'
                          className='font-normal'>
                          {batchMap[batchId]}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <Typography
                          variant='small'
                          color='blue-gray'
                          className='font-normal'>
                          {formatUpdatedAt(updatedAt)}
                        </Typography>
                      </td>
                    </tr>
                  );
                }
              )}
            </tbody>
          </table>
        )}
        <ToastContainer />
      </Card>
      {loading ? null : (
        <a href='/'>
          <Button variant='gradient' className='mt-4'>
            Go back
          </Button>
        </a>
      )}
    </>
  );
}
