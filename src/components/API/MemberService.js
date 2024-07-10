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
      const errorData = await response.json();
      throw new Error(`Failed to search members: ${errorData.error}`);
    }

    const data = await response.json();
    return [data.data, data.total];
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
