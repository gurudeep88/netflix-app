import auth from "./auth.js";
import movies from "./movies.js";
import users from "./users.js";
import lists from "./lists.js";

const controllers = {
    auth: auth,
    users,
    movies,
    lists
}

export default controllers; 