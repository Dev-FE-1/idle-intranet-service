import { PATH } from '../../utils/constants.js';

const { VITE_SERVER_URL } = import.meta.env;
const apiBaseUrl = VITE_SERVER_URL; // 굳이 변수에 또 할당한 이유가 있나요?

const handleErrorResponse = (status, data, showError) => {
  switch (status) {
    case 400:
      showError(`잘못된 요청입니다. ${data.error}`);
      return;
    case 401:
      showError(
        '로그인에 실패하였습니다. 이메일과 비밀번호를 다시 확인해 주시기 바랍니다.',
      );
      return;
    default:
      showError(`오류: ${data.message || '알 수 없는 오류가 발생했습니다.'}`);
  }
};

const login = async (email, password, showError) => {
  try {
    const response = await fetch(`${apiBaseUrl}/api/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });
    const data = await response.json(); // 코드의 응집도를 높이기 위해, 같은 문맥이 있는 코드에 위치시키기

    if (!response.ok) {
      handleErrorResponse(response.status, data, showError);
    }

    // 얼리 리턴을 사용하여, 조건 간소화해보기
    if (data.status !== 'OK') {
      showError(
        `로그인에 실패하였습니다: ${data.message || '알 수 없는 오류가 발생했습니다.'}`,
      );
      return;
    }

    localStorage.setItem('token', data.token);
    window.location.href = PATH.HOME;
  } catch (error) {
    showError('알 수 없는 오류가 발생했습니다.');
  }
};

// 유틸로
const logout = () => {
  localStorage.removeItem('token');
  window.location.href = PATH.SIGNIN;
};

const isLoggedIn = async () => {
  const token = localStorage.getItem('token'); // getToken 쓰기
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
    const data = await response.json();

    if (!response.ok) {
      throw new Error('Token is not valid');
    }

    return data.valid;
  } catch (error) {
    console.error('Token verification failed:', error);
    return false;
  }
};

// 유틸로
const getToken = () => {
  return localStorage.getItem('token'); // 만약 토큰이 저장소에 없다면?
};

export { login, logout, isLoggedIn, getToken };
