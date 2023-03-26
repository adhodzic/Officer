import { useContext, useState } from 'react'
import {Form, Button} from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { UserContext } from '../../hooks/Auth/UserContext'
import auth from '../../services/authApi'
import './AuthForms.scss'
function RegisterView() {
    const navigate = useNavigate()
    const {login} = useContext(UserContext)
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('')
    async function loginUser(){
        if(!username || !password || !email) return
        let res = await auth.register(username, password, email)
        console.log(res.data)
        login(JSON.stringify(res.data))
        navigate('/')
    }
    return (
        <div className="Register">
            <Form>
                <Form.Group className="mb-3" controlId="username">
                    <Form.Label>Username</Form.Label>
                    <Form.Control onChange={(e)=> setUsername(e.target.value)} type="text" placeholder="Enter Username" required/>
                    {/* <Form.Text className="text-muted">
                        We'll never share your email with anyone else.
                    </Form.Text> */}
                </Form.Group>

                <Form.Group className="mb-3" controlId="email">
                    <Form.Label>Company email</Form.Label>
                    <Form.Control onChange={(e)=> setEmail(e.target.value)} type="text" placeholder="Enter email" required/>
                    {/* <Form.Text className="text-muted">
                        Use email provided by the company
                    </Form.Text> */}
                </Form.Group>

                <Form.Group className="mb-3" controlId="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control onChange={(e)=> setPassword(e.target.value)} type="password" placeholder="Password" required/>
                </Form.Group>
                {/* <Form.Group className="mb-3" controlId="checkbox">
                    <Form.Check type="checkbox" label="Check me out" />
                </Form.Group> */}
                <Button variant="primary" onClick={(e)=>{e.preventDefault(); loginUser()}}>
                    Login
                </Button>
            </Form>
        </div>
    )
}

export default RegisterView