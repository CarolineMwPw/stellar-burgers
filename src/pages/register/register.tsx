import { FC, SyntheticEvent, useState } from 'react';
import { RegisterUI } from '@ui-pages';
import { useDispatch, useSelector } from '../../services/store';
import { TRegisterData } from '../../utils/burger-api';
import { getError, registerUser, loginUser } from '../../slices/userSlice';
import { useNavigate } from 'react-router-dom';

export const Register: FC = () => {
  // const navigate = useNavigate();
  const dispatch = useDispatch();
  const error = useSelector(getError);
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    const userData: TRegisterData = {
      email: email,
      name: userName,
      password: password
    };
    console.log(userData);
    console.log(error);

    dispatch(registerUser(userData));

    // dispatch(registerUser({ name: userName, email: email, password: password }))
    //   .unwrap()
    //   .then(() => dispatch(loginUser({ email, password })))
    //   .then(() => navigate('/'))
    //   .catch((err) => console.error('Registration error:', err));
  };

  return (
    <RegisterUI
      errorText={error || ''}
      email={email}
      userName={userName}
      password={password}
      setEmail={setEmail}
      setPassword={setPassword}
      setUserName={setUserName}
      handleSubmit={handleSubmit}
    />
  );
};
