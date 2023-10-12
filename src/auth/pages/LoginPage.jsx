import { useMemo } from 'react';
import { useDispatch, useSelector} from 'react-redux';
import { Link as RouterLink } from 'react-router-dom';
import { Alert, Button, Grid, Link, TextField, Typography } from "@mui/material";
import { Google } from '@mui/icons-material';
import { AuthLayout } from '../layout/AuthLayout';
import { useForm } from '../../hooks/useForm';
import { startGoogleSignIn, startLoginWithEmailPassword } from '../../store/auth';

const formData = {
  email: '',
  password:''
}

export const LoginPage = () => {
  const { status,errorMessage } = useSelector(state => state.auth);

  const isAuthenticating = useMemo(() => status === 'checking', [status]);

  const dispatch = useDispatch();

  const { email, password, onInputChange } = useForm(formData);

  const onSubmit = (event) => {
    event.preventDefault();
    dispatch(startLoginWithEmailPassword({email,password}));
    
  };

  const onGoogleSignIn = () => {
    dispatch(startGoogleSignIn());
  };





  return (
    <AuthLayout title= 'Login'>
      <form onSubmit={onSubmit}
        className="animate__animated animate__fadeIn animate__faster">
        <Grid container>
          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
              label="Mail"
              type="email"
              placeholder="correo@gmail.com"
              fullWidth
              name='email'
              value={email}
              onChange={onInputChange}

            />
          </Grid>
          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
              label="Password"
              type="password"
              placeholder="contraseña"
              fullWidth
              name='password'
              value={password}
              onChange={onInputChange}
            />
          </Grid>
          <Grid container
            display={!!errorMessage ? '' : 'none'}>
            <Grid item xs={12} 
            >
              <Alert severity='error'>{ errorMessage }</Alert>

            </Grid>

          </Grid>
          <Grid container
            spacing={2}
            sx={{ mb: 2 }}>
            <Grid item xs={12} sm={6} sx={{ mt: 2 }}>
              <Button
                disabled={isAuthenticating}
                type='submit'
                variant="contained"
                fullWidth>
                Login
              </Button>
            </Grid>
            <Grid item xs={12} sm={6} sx={{ mt: 2 }}>
              <Button
                disabled={isAuthenticating}
                onClick={onGoogleSignIn}
                variant="contained"
                fullWidth>
                <Google />
                <Typography sx={{ ml: 1 }}> Google </Typography>
              </Button>
            </Grid>


          </Grid>
        </Grid>
        <Grid container
          direction='row'
          justifyContent='end'>
          <Link component={RouterLink} color='inherit' to="/auth/register">
            Crear una cuenta nueva
          </Link>
        </Grid>
      </form>
    </AuthLayout>
        
       
        
           

   
  )
}
