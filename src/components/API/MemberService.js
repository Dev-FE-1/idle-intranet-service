const loadPage = async (page, max) => {
  try {
    const response = await fetch(`/api/members/${page}?max=${max}`, {
      method: 'GET',
    });

    if (!response.ok) {
      throw new Error(`Failed to load data: ${response.statusText}`);
    }

    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error('Error loading page:', error);
    throw error;
  }
};

export { loadPage };
