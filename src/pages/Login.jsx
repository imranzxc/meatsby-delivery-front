import React, { useRef, useState } from 'react';
import Helmet from '../components/Helmet/Helmet';
import CommonSection from '../components/UI/common-section/CommonSection';
import { Container, Row, Col } from 'reactstrap';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { doLogin } from '../store/shopping-cart/authSlice';
import { useSelector } from 'react-redux';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
  };

  const handleChangeEmail = (e) => {
    setEmail(e.target.value);
  };

  const handleChangePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleClickAuth = () => {
    dispatch(doLogin({ email, password }))
    setEmail('')
    setPassword('')
  };

  const signingIn = useSelector((state) => state.auth.signingIn)
  const error = useSelector((state) => state.auth.error)

  return (
    <Helmet title="Login">
      <CommonSection title="Login" />
      <section>
        <Container>
          <Row>
            <Col lg="6" md="6" sm="12" className="m-auto text-center">
              <form className="form mb-5" onSubmit={submitHandler}>
              {signingIn && <div>You are authorized</div>}
              {error && <div>{error.message}</div>}
                <div className="form__group">
                  <input
                    type="email"
                    placeholder="Email"
                    required
                    value={email}
                    onChange={handleChangeEmail}
                  />
                </div>
                <div className="form__group">
                  <input
                    type="password"
                    placeholder="Password"
                    required
                    value={password}
                    onChange={handleChangePassword}
                  />
                </div>
                <button type="submit" className="addTOCart__btn" onClick={handleClickAuth}>
                  Login
                </button>
              </form>
              <Link to="/register">Don't have an account? Create an account</Link>
            </Col>
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export default Login;
