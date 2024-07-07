const BASE_URL = 'https://api.example.com';

export const apiGet = async (endpoint: string) => {
  const response = await fetch(`${BASE_URL}/${endpoint}`);
  if (!response.ok) throw new Error('Network response was not ok');
  return response.json();
};

export const apiPost = async (endpoint: string, data: any) => {
  const response = await fetch(`${BASE_URL}/${endpoint}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error('Network response was not ok');
  return response.json();
};