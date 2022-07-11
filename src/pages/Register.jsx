
import Helmet from '../components/Helmet/Helmet';
import CommonSection from '../components/UI/common-section/CommonSection';
import { Container, Row, Col } from 'reactstrap';
import { Link} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { createUser } from '../store/shopping-cart/authSlice';

const Register = () => {

  const dispatch = useDispatch();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');

  const handleChangeEmail = (e) => {
    setEmail(e.target.value);
  };

  const handleChangePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleChangeFirstName = (e) => {
    setFirstname(e.target.value);
  };

  const handleChangeLastName = (e) => {
    setLastname(e.target.value);
  };

  const submitHandler = (e) => {
    e.preventDefault();
  };

  const handleRegistration = () => {
    dispatch(createUser({ email, password, firstname, lastname }));
  };

  const signingUp = useSelector((state) => state.auth.signingUp);
  const error = useSelector((state) => state.auth.error);

  return (
    <Helmet title="Signup">
      <CommonSection title="Signup" />
      <section>
        <Container>
          <Row>
            <Col lg="6" md="6" sm="12" className="m-auto text-center">
              <form className="form mb-5" onSubmit={submitHandler}>
                {error}
                {signingUp && <div>You are registered</div>}
                <div className="form__group">
                  <input
                    type="text"
                    placeholder="First name"
                    required
                    onChange={handleChangeFirstName}
                    value={firstname}
                  />
                </div>
                <div className="form__group">
                  <input
                    type="text"
                    placeholder="Last name"
                    required
                    onChange={handleChangeLastName}
                    value={lastname}
                  />
                </div>
                <div className="form__group">
                  <input
                    type="email"
                    placeholder="Email"
                    required
                    onChange={handleChangeEmail}
                    value={email}
                  />
                </div>
                <div className="form__group">
                  <input
                    type="password"
                    placeholder="Password"
                    required
                    onChange={handleChangePassword}
                    value={password}
                  />
                </div>
                <button type="submit" className="addTOCart__btn" onClick={handleRegistration}>
                  Sign Up
                </button>
              </form>
              <Link to="/login">Already have an account? Login</Link>
            </Col>
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export default Register;
