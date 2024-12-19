const API_USER = "http://localhost:8080/api/users";

fetch(API_USER)
.then((res) => res.json())
.then((data) => {
    const totalUser = document.getElementById("value-total-users");
    totalUser.innerHTML = data.length;
})
.catch((error) => {
    console.error("Error fetching data:", error);
    const totalUser = document.getElementById("value-total-users");
    totalUser.innerHTML = "Error";
});