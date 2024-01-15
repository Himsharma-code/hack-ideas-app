import { getToken } from "./isLoggedIn";

const request = async (
  url: string,
  method: "GET" | "POST" | "UPDATE" | "DELETE",
  data?: any
) => {
  const token = getToken();

  const options: RequestInit = {
    method,
    headers: {
      "Content-Type": "application/json",
      Authorization: token ? `Bearer ${token}` : "",
      // You can add additional headers if needed
    },
  };

  if (data) {
    options.body = JSON.stringify(data);
  }

  try {
    const response = await fetch(url, options);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const responseData = await response.json();
    return responseData;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};

export { request };
