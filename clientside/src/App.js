import React, { useEffect } from 'react';
import { useState } from 'react';
import './App.css';
import Header from './components/header/header';
import LoginForm from './components/login/login';
import RegisterForm from './components/register/register';
import MyVerticallyCenteredModal from "./components/ModalBox/modalBox";
import Loader from './components/loader/loader';
import { Route, Switch } from 'react-router-dom';
import Chat from './pages/chat';

function App() {
  const APP_TITLE = "DablewAyy Chatroom";
  const [currentForm, setCurrentForm] = useState('login');
  const [responseMessage, setResponseMessage] = useState("");
  const [responseTitle, setResponseTitle] = useState("");
  const [modalShow, setModalShow] = useState(false);
  const [isRendering, setIsRendering] = useState(true);
  const [userDetail, setUserDetail] = useState({});


  useEffect(() => {
    setTimeout(() => {
      setIsRendering(false);
    }, 1000);//4000
  }, [])
  const formToggler = (event) => {
    if (event.target.value === 'login') {
      setCurrentForm('login');
    }
    else {
      setCurrentForm('register');
    }
  }

  const errorHandler = (data) => {
    setResponseMessage(data.responseData.message);
    setResponseTitle("Error!");
    setModalShow(true);
  }

  const successHandler = (data) => {
    setResponseMessage(data.responseData.message);
    setResponseTitle("Congradulations!");
    setModalShow(true);

    setTimeout(() => {
      setCurrentForm('login');
    }, 2000);
  }

  const userDetailHandler = (userData) => {
    setUserDetail(userData);
  }
  return (
    <div>
      <Switch>
        <Route path="/chat" exact>
          <Chat userDetail={userDetail} errorHandler={errorHandler} />
        </Route>
        <Route path="/" exact>
          {isRendering ? <React.Fragment>
            <Header title={APP_TITLE} />
            <Loader isRendering={isRendering} />
          </React.Fragment> : <React.Fragment>
            <MyVerticallyCenteredModal
              title={responseTitle}
              show={modalShow}
              message={responseMessage}
              onHide={() => setModalShow(false)}
            />

            <Header title={APP_TITLE} />
            <div className="text-center mt-5">
              <button className="btn btn-primary w-25 mx-2" value="login" onClick={formToggler}>Login</button>
              <button className="btn btn-primary w-25 mx-2" value="register" onClick={formToggler}>Register</button>
            </div>
            <div className="container text-white bg-light-black border-radius-25 p-4 mt-5">
              {currentForm === 'register' ? <RegisterForm errorHandler={errorHandler} successHandler={successHandler} /> : <LoginForm errorHandler={errorHandler} userDetailHandler={userDetailHandler} />}
            </div>
          </React.Fragment>}
        </Route>
      </Switch>
    </div>
  );
}

export default App;
