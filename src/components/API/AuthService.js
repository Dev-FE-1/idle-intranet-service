const login = async (email, password, showError) => {
  try {
    const response = await fetch('/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (response.ok && data.status === 'OK') {
      localStorage.setItem('token', data.token);
      window.location.href = '/';
    } else {
      showError(data.error || '로그인 실패');
    }
  } catch (error) {
    if (error.response && error.response.status) {
      if (error.response.status === 400) {
        showError(`잘못된 요청입니다. ${error.response.data.error}`);
      } else if (error.response.status === 401) {
        showError(
          '로그인에 실패하였습니다. 이메일과 비밀번호를 다시 확인해 주시기 바랍니다',
        );
      } else {
        showError(`오류: ${error.message}`);
      }
    } else {
      showError('알 수 없는 오류가 발생했습니다.');
    }
  }
};

const logout = () => {
  localStorage.removeItem('token');
  window.location.href = '/signin';
};

const isLoggedIn = async () => {
  const token = localStorage.getItem('token');
  if (!token) {
    return false;
  }

  try {
    const response = await fetch('/api/verify-token', {
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
