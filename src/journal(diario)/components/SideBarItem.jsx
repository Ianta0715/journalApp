import { Grid, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';

import { useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { TurnedInNot } from '@mui/icons-material';
import { setActiveNote } from '../../store/journal';


export const SideBarItem = ({ body, title, id,date,imagesUrls = [] }) => {

    const dispatch = useDispatch();

    const onClickNote = () => {
        dispatch(setActiveNote({ title, body, id, date, imagesUrls }))
    }
    
    const newTitle = useMemo(() => {
        return title.length > 17
            ? title.substring(0, 17) + '...'
            : title;
    }, [title])

    return (
       
      <ListItem  disablePadding>
          <ListItemButton onClick={onClickNote}>
              <ListItemIcon>
                  <TurnedInNot />
              </ListItemIcon>
              <Grid container>
                  <ListItemText primary={newTitle} />
                  <ListItemText secondary={body} />

              </Grid>
          </ListItemButton>
      </ListItem>
  )
}
