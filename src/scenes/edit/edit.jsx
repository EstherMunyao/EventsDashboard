import { Box, Button, TextField } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";
import { UPDATE_EVENTS, DELETE_EVENTS } from "../../mutations";
import { useEffect, useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { GET_EVENT_BY_ID } from "../../queries";
import { useParams, useNavigate } from "react-router-dom";

const EditForm = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const { id } = useParams();
  const navigate = useNavigate();
  const intId = parseInt(id);
  
  const { loading, error, data } = useQuery(GET_EVENT_BY_ID, {
    variables: { id: intId },
  });

  const [deleteEvents] = useMutation(DELETE_EVENTS);
  const [updateEventsItem] = useMutation(UPDATE_EVENTS);

  const [formData, setFormData] = useState({
    name: '',
    isComplete: '',
  });

  useEffect(() => {
    if (data && data.getEventById) {
      console.log('Fetched event data:', data.getEventById);
      setFormData({
        name: data.getEventById.name || '',
        isComplete: data.getEventById.isComplete ? 'True' : 'False',
      });
    }
  }, [data]);

  const handleChange = (e, name) => {
    const { value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name) {
      alert('Name is empty');
      return;
    }

    try {
      const response = await updateEventsItem({
        variables: {
          id: intId,
          name: formData.name,
          isComplete: formData.isComplete === 'True',
        },
      });

      console.log('Update success:', response);
      navigate('/Events');
    } catch (err) {
      console.error('Error on event update', err);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm('ARE YOU SURE YOU WANT TO DELETE THIS EVENT?')) return;

    try {
      const response = await deleteEvents({ variables: { id: intId } });
      console.log('Delete response:', response);
      navigate('/Events');
    } catch (err) {
      console.error('Delete not successful', err);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <Box m="20px">
      <Header title="EDIT EVENT" subtitle="Edit an event" />

      <Box>
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
            label="ID"
            value={intId}
            disabled
            sx={{ gridColumn: "span 2" }}
          />

          <TextField
            fullWidth
            variant="filled"
            type="text"
            label="Name"
            value={formData.name}
            onChange={(e) => handleChange(e, "name")}
            sx={{ gridColumn: "span 2" }}
          />

          <TextField
            fullWidth
            variant="filled"
            type="text"
            label="Is Complete"
            value={formData.isComplete}
            onChange={(e) => handleChange(e, "isComplete")}
            sx={{ gridColumn: "span 2" }}
          />
        </Box>

        <Box display="flex" justifyContent="end" mt="20px">
          <Button onClick={handleFormSubmit} color="secondary" variant="contained">
            EDIT EVENT
          </Button>
        </Box>

        <Box display="flex" justifyContent="start" mt="20px">
          <Button onClick={handleDelete} color="error" variant="contained">
            DELETE EVENT
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default EditForm;
