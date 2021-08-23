import React, { useState, useRef, useEffect, useContext } from 'react'
import './Login.css'
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import logo from "../Signup/logo.svg";
import TextField from '@material-ui/core/TextField';
import { AuthContext } from '../../context/AuthProvider';
import { link, useHistory } from "react-router-dom";
import Alert from '@material-ui/lab/Alert';
import { Link } from 'react-router-dom';

export default function Login() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('')
    
    const { login } = useContext(AuthContext);
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)
    const history = useHistory();
    const handleEmail = (e) => {
        setEmail(e.target.value);
    }
    const handlePassword = (e) => {
        setPassword(e.target.value);
    }

    async function handleSubmit(e) {
        e.preventDefault()
        try {
            // console.log(email,password)
            setError("")
            setLoading(true)
            await login(email, password)
            setLoading(false)
            history.push("/")
        } catch {
            setError("Failed to log in")
            setLoading(false)
        }


    }
    return (
        <div className='login-container'>
            <div className='login-form'>
                <Card variant="outlined">
                    <CardContent>
                        <div className="logo">
                            <img src={logo} />
                        </div>
                        {error && <Alert severity="error">{error}</Alert>}
                        <TextField InputLabelProps={{ style: { width: '-webkit-fill-available' } }} margin='dense'
                            onChange={(e) => { handleEmail(e) }} id="outlined-basic" label="Enter Email" variant="outlined" fullWidth={true} size='small' />
                        <TextField InputLabelProps={{ style: { width: '-webkit-fill-available' } }} margin='dense'
                            onChange={(e) => { handlePassword(e) }} id="outlined-basic" label="Password" variant="outlined" fullWidth={true} size='small' />
                        <Typography variant='subtitle1'>
                            <Link variant="inherit" underline='none' href="#" >
                                Forget Password ?
                            </Link>
                        </Typography>
                    </CardContent>

                    <CardActions>
                        <Button disabled={loading} onClick={handleSubmit} fullWidth={true} variant="contained" color="primary">
                            Log In
                        </Button>
                    </CardActions>
                </Card>

                <Card variant="outlined">
                    <CardContent>
                        <Typography variant='subtitle1'>
                            Don't have an account? <Link variant="inherit" underline='none' to="/signup" >
                                Sign up
                            </Link>
                        </Typography>
                    </CardContent>
                </Card>
            </div>

        </div>

    )
}
