import { host } from "./APIRoutes";

async function getData(url) {
  url = `${host}/${url}`;

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        'Authorization': `Bearer ${Cookies.get("jwt_token")}`
      },
    });

    if (!response.ok) {
      return {
        success: false,
        errorCode: response.status,
        message: "HTTP Request Failed"
      };
    }

    const responseData = await response.json();
    return responseData;
  } catch (error) {
    return {
      success: false,
      errorCode: 0,
      message: "HTTP Request Failed"
    };
    throw error; // Rethrow the error to handle it further if needed
  }
}

export default getData;
