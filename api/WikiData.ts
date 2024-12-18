export const fetchWikiData = async () => {
  const url = 'http://localhost:5000/random';

  // setLoading(true);
  // setError(null);

  try {
    const response = await fetch(url);
    const jsonResponse = await response.json();
    return jsonResponse;
  } catch (err) {
    // setError("Failed to fetch data");
    console.error('failed to fetch data.', err);
  } finally {
    // setLoading(false);
  }
};

