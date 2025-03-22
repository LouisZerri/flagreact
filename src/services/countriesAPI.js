import Axios from "axios";

function findAllCountries() {
    return Axios.get("https://restcountries.com/v2/all").then(
        (response) => response.data
    );
}

export default {
    findAllCountries,
};
