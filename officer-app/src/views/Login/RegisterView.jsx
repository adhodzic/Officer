import { useContext, useState, useEffect } from 'react'
import { Form, Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { UserContext } from '../../hooks/Auth/UserContext'
import auth from '../../services/authApi'
function RegisterView() {
    const navigate = useNavigate()
    const {login} = useContext(UserContext)
    const [fullname, setFullname] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [passwordsMatch, setPasswordsMatch] = useState(null)
    useEffect(() => {
        if (password !== confirmPassword) {
            setPasswordsMatch(false);
        }else{
            setPasswordsMatch(true)
        }
    }, [password, confirmPassword])


    async function registerUser() {
        if (!username || !password || !confirmPassword || !passwordsMatch) return

        let res = await auth.register(username, password, fullname)
        console.log(res)
        login(JSON.stringify(res.data))
        navigate('/')
    }
    return (
        <div className="Register">
            <Form>
                <Form.Group className="mb-3" controlId="fullname">
                    <Form.Label>Full Name</Form.Label>
                    <Form.Control onChange={(e) => setFullname(e.target.value)} type="text" placeholder="Enter FullName" required />
                    {/* <Form.Text className="text-muted">
                        We'll never share your email with anyone else.
                    </Form.Text> */}
                </Form.Group>
                <Form.Group className="mb-3" controlId="username">
                    <Form.Label>Username</Form.Label>
                    <Form.Control onChange={(e) => setUsername(e.target.value)} type="text" placeholder="Enter Username" required />
                    {/* <Form.Text className="text-muted">
                        We'll never share your email with anyone else.
                    </Form.Text> */}
                </Form.Group>

                <Form.Group className="mb-3" controlId="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Password" required />
                </Form.Group>

                <Form.Group className="mb-3" controlId="password-confirm">
                    <Form.Label>Password</Form.Label>
                    <Form.Control onChange={(e) => setConfirmPassword(e.target.value)} type="password" placeholder="Confirm password" required />
                </Form.Group>
                {/* <Form.Group className="mb-3" controlId="checkbox">
                    <Form.Check type="checkbox" label="Check me out" />
                </Form.Group> */}
                <Button variant="primary" onClick={(e) => { e.preventDefault(); registerUser() }}>
                    Login
                </Button>
            </Form>
        </div>
    )
}

export default RegisterView