import type { paths } from "./api";
import createClient from "openapi-fetch";

export let { GET, POST, PATCH, PUT, DELETE, HEAD, TRACE } = createClient<paths>(
  {
    baseUrl: "http://localhost",
    // headers: { authorization: `Bearer ${bearerToken}` } Add your auth here, not needed for public APIs like petstore in this example
  }
);
