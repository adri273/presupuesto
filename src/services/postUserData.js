const apiURL = "https://api7.cloudframework.io/recruitment/fullstack/users/";

export default function postUserData(id = "", data) {
    console.log(data);
    return fetch(apiURL+id, {
        method: "POST",
        body: JSON.stringify(customValidationData(data)),
        headers: { 'X-WEB-KEY': 'Development' },
    });
}

const customValidationData = (data) => {
    
    return {...data, age:data.age.toString(), check:(data.check) ? 1 : 0};
}

