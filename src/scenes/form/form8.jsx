import { Box, Button, TextField } from "@mui/material";
import { useMutation } from "@apollo/client";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useState } from "react";
import Header from "../../components/Header";
import { ADD_EVENTS } from "../../mutations";
import { GET_EVENT } from "../../queries";

const Form8 = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const [name, setName] = useState('');
  const [isComplete, setIsComplete] = useState('');
  const [id] = useState("0"); // Use string for ID
  const [AddEventsItem, { data, loading, error }] = useMutation(ADD_EVENTS);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // If your API accepts string for Long type
    const idAsString = String(id);
    console.log(`${id} ${name} ${isComplete === "True"}`)

    AddEventsItem({
      variables: {
        AddEventsItem: {
          id: id, // Ensure the ID is passed as a string
          name: name,
          isComplete: isComplete === "True", // Convert string to boolean if necessary
        },
      },
    });
  };

  return (
    <Box m="20px">
      <Header title="CREATE EVENT" subtitle="Create an event" />

      <form onSubmit={handleSubmit}>
        <Box
          display="grid"
          gap="30px"
          gridTemplateColumns="repeat(4, minmax(0, 1fr))"
          sx={{
            "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
          }}
        >
          <TextField
            fullWidth
            variant="filled"
            type="text"
            label="Name"
            onChange={(e) => setName(e.target.value)}
            value={name}
            name="name"
            sx={{ gridColumn: "span 2" }}
          />
          <TextField
            fullWidth
            variant="filled"
            type="text"
            label="Events Status"
            onChange={(e) => setIsComplete(e.target.value)}
            value={isComplete}
            name="isComplete"
            sx={{ gridColumn: "span 4" }}
          />
        </Box>
        <Box display="flex" justifyContent="end" mt="20px">
          <Button type="submit" color="secondary" variant="contained">
            Create Event
          </Button>
        </Box>
      </form>

      {loading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}
      {data && <p>Event Created: {data.addEventsItem.name + ' ' + data.addEventsItem.isComplete}</p>}
    </Box>
  );
};

export default Form8;
