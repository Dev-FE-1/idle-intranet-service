import { PATH } from '../../utils/constants.js';

const { VITE_SERVER_URL, VITE_LOCAL_URL } = import.meta.env;
const apiBaseUrl = VITE_SERVER_URL || VITE_LOCAL_URL;

const login = async (email, password, showError) => {
  try {
    const response = await fetch(`${apiBaseUrl}/api/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      if (response.status === 400) {
        showError(`잘못된 요청입니다. ${errorData.error}`);
      } else if (response.status === 401) {
        showError(
          '로그인에 실패하였습니다. 이메일과 비밀번호를 다시 확인해 주시기 바랍니다',
        );
      } else {
        showError(
          `오류: ${errorData.message || '알 수 없는 오류가 발생했습니다.'}`,
        );
      }
      return;
    }

    const data = await response.json();

    if (data.status === 'OK') {
      localStorage.setItem('token', data.token);
      window.location.href = PATH.HOME;
    } else {
      showError(
        `로그인에 실패하였습니다: ${data.message || '알 수 없는 오류가 발생했습니다.'}`,
      );
    }
  } catch (error) {
    showError('알 수 없는 오류가 발생했습니다.');
  }
};

const logout = () => {
  localStorage.removeItem('token');
  window.location.href = PATH.SIGNIN;
};

const isLoggedIn = async () => {
  const token = localStorage.getItem('token');
  if (!token) {
    return false;
  }

  try {
    const response = await fetch(`${apiBaseUrl}/api/verify-token`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error('Token is not valid');
    }

    const data = await response.json();
    return data.valid;
  } catch (error) {
    console.error('Token verification failed:', error);
    return false;
  }
};

const getToken = () => {
  return localStorage.getItem('token');
};

export { login, logout, isLoggedIn, getToken };
