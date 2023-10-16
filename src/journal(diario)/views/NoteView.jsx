import { useEffect, useMemo, useRef } from "react";
import { useDispatch, useSelector } from "react-redux"
import { useForm } from "../../hooks/useForm"
import { Button, Grid, IconButton, TextField, Typography } from "@mui/material"
import { DeleteOutline, SaveOutlined, UploadOutlined } from "@mui/icons-material"
import { ImageGallery } from "../components"
import { setActiveNote, startDeletingNote, startSaveNote, startUploadingFiles } from "../../store/journal";
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

    //useRef//
    const fileInputRef = useRef();


    //useEffect//
    useEffect(() => {
        dispatch(setActiveNote(formState))
    }, [formState]);
   

    useEffect(() => {
        if (messageSave.length > 0) {
            Swal.fire('Updated note', messageSave, 'success');
      }  
    }, [messageSave])

    const onSaveNote = () => {
        dispatch(startSaveNote())
    };

    const onFileInputChange = ({ target }) => {
        if (target.files === 0) return;
        console.log('uploading files..');
        dispatch(startUploadingFiles(target.files));
    }

    const onDelete = () => {
        dispatch(startDeletingNote());
    }
    
    

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
              
              <input
                  type="file"
                  multiple
                  ref={fileInputRef}
                  onChange={onFileInputChange}
                  style={{display:'none'}}
              />

              <IconButton
                  color='primary'
                  disabled={isSaving}
                  onClick={ ()=> fileInputRef.current.click() }
              >
                  <UploadOutlined/>
              </IconButton>

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

          <Grid container justifyContent='end'
          >
              <Button
                  onClick={onDelete}
                  sx={{ mt: 2 }}
                  color="error"
              >
                  <DeleteOutline />
                  Delete note
              </Button>
          </Grid>

          <ImageGallery
              images={note.imagesUrls } />
    </Grid>
  )
}
