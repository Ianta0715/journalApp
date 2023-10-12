import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux"
import { useForm } from "../../hooks/useForm"
import { Button, Grid, TextField, Typography } from "@mui/material"
import { SaveOutlined } from "@mui/icons-material"
import { ImageGallery } from "../components"
import { setActiveNote, startSaveNote } from "../../store/journal";
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.css';

export const NoteView = () => {

    const dispatch = useDispatch();

    const { activeNote:note,messageSave,isSaving } = useSelector(state => state.journal);

    const { body, title, onInputChange, formState, date } = useForm(note);
    
    const formDate = useMemo(() => {
        const newDate = new Date(date);
        return new Intl.DateTimeFormat("es-ES", { dateStyle: "full" }).format(newDate);
    }, [date]);

    useEffect(() => {
        dispatch(setActiveNote(formState))
    }, [formState]);

    const onSaveNote = () => {
        dispatch(startSaveNote())
    };

    useEffect(() => {
        if (messageSave.legth > 0) {
            Swal.fire('Updated note', messageSave, 'sucess');
      }
    
     
    }, [messageSave])
    
    

  return (
      <Grid
          className="animate__animated animate__fadeIn animate__faster"
          container
          direction='row'
          justifyContent='space-between'
          alignItems='center'
          sx={{ mb: 1 }}
      >
          <Grid item>
              <Typography fontSize={39} fontWeight='light'>
                  {formDate}
              </Typography>
          </Grid>
          <Grid item>
              <Button
                  disabled={isSaving}
                  onClick={onSaveNote}
                  color='primary' sx={{ padding: 2 }}>
                  <SaveOutlined sx={{ fontSize: 30, mr: 1 }} />
                  save
              </Button>
          </Grid>
          <Grid container>
              <TextField
                  type="text"
                  variant="filled"
                  fullWidth
                  placeholder="Write a title"
                  label="Title"
                  sx={{ border: 'none', mb: 1 }}
                  name="title"
                  value={title}
                  onChange={onInputChange}/>
          </Grid>

          <Grid container>
              <TextField
                  type="text"
                  variant="filled"
                  fullWidth
                  multiline
                  placeholder="what happened today?"
                  minRows={5}
                  name="body"
                  value={body}
                  onChange={onInputChange} />
          </Grid>
          <ImageGallery/>
    </Grid>
  )
}
