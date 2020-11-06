import axios from "axios";

const logout = () => {
    const token = localStorage.getItem("token");
    const config = {
        headers: {}
    };

    if (token) {
        config.headers["Authorization"] = `Token ${token}`;
    }

    axios
        .post("/api/auth/logout", null, config)
        .then(res => {
            localStorage.removeItem("token");
        })
        .catch(err => {
            console.log("err.res.status=", err.response.status, "err.res.data=", err.response.data);
        });
};

export default logout;