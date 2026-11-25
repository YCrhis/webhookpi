interface Params {
  url: string;
  data?: any;
  method?: "POST" | "GET" | "PUT" | "DELETE" | "PATCH";
}

export const PostCall = async ({ url, data, method = "POST" }: Params) => {
  try {
    const response = await fetch(`/api${url}`, {
      method: method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();
    return result;
  } catch (error) {
    console.log(error);
  }
};
