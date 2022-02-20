const apiURL = "https://api7.cloudframework.io/recruitment/fullstack/users?id=";

export default function getUserData(id = "") {
    return fetch(apiURL+id)
    .then(res => res.json())
    .then(response => {
        const {data = {}} = response;
        return data;
    })
}