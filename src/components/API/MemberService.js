const { VITE_SERVER_URL } = import.meta.env;
const apiBaseUrl = VITE_SERVER_URL;

const getMembers = async (page, max) => {
  try {
    const response = await fetch(
      `${apiBaseUrl}/api/members/${page}?max=${max}`,
      {
        method: 'GET',
      },
    );

    if (!response.ok) {
      throw new Error(`Failed to load data: ${response.statusText}`);
    }

    const data = await response.json();
    return [data.data, data.total];
  } catch (error) {
    console.error('Error loading page:', error);
    throw error;
  }
};

// 매개변수가 3개 이상이 되면, 객체로 묶어서 전달하는 방법을 고려해보기
const searchMembers = async (name, max, page) => {
  try {
    const encodedName = encodeURIComponent(name);

    const response = await fetch(
      `${apiBaseUrl}/api/members/search/${encodedName}?max=${max}&page=${page}`,
      {
        method: 'GET',
      },
    );

    if (!response.ok) {
      const { error } = await response.json(); // 두 곳에서 호출하는 이유가 있나요?
      throw new Error(`Failed to search members: ${error}`);
    }

    const { data, total } = await response.json();
    return [data, total];
  } catch (error) {
    console.error('Error searching members:', error.message);
    throw error;
  }
};

const getMemberById = async (
  employeeNumber,
  isAdmin = false,
  isOwner = false,
) => {
  try {
    const response = await fetch(
      `${apiBaseUrl}/api/member/${employeeNumber}?isAdmin=${isAdmin}&isOwner=${isOwner}`,
      {
        method: 'GET',
      },
    );

    if (!response.ok) {
      throw new Error(`Failed to load data: ${response.statusText}`);
    }

    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error('Error loading member data:', error);
    throw error;
  }
};

export { getMembers, searchMembers, getMemberById };
