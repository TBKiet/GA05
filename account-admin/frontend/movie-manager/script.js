API_USER = "http://localhost:8080/api/movies"

fetch(API_USER) 
.then((res) => res.json())
.then((data) => {
    let res = `
    <tr>
        <th>Actions</th>
        <th>Name</th>
        <th>Role</th>
        <th>Date</th>
        <th>Phone</th>
        <th>Email</th>
    </tr>
    `

    data.forEach((user)=>{
        const username = user.username
        const email = user.email
        const role = user.role
        
        let phone = null
        if ('phone' in user) phone = user.phone
        
        let date = null;
        if ("activationExpires" in user) date = user.activationExpires

        date = new Date(date)
        date = date.toLocaleString('vi-VN', {
            year: 'numeric', 
            month: 'numeric', 
            day: 'numeric'
        })
        const isActive = user.isActive

        res += `
            <tr>
                <td>
                    <input type="checkbox">
                    <button class="edit-btn">Edit</button>
                    <button class="delete-btn">Delete</button>
                </td>
                <td>${username}</td>
                <td>${role}</td>
                <td>${date}</td>
                <td>${phone}</td>
                <td>${email}</td>
            </tr>
        `
    })

    const userList = document.getElementById("user-db")
    userList.innerHTML = res
})
