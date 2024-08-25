function getPosts(userId) {
    fetch( "https://jsonplaceholder.typicode.com/posts?userId="+userId)
    .then(response => {
        if(response.ok){
          return  response.json();
        }})
    .then(posts => {
        let postsContainer = document.getElementById("posts-container");
            postsContainer.innerHTML = "";
            for (let post of posts) {
                let content = `<div class="post">
                    <h3>${post.title}</h3>
                    <hr>
                    <p>${post.body}</p>
                </div>`;
                postsContainer.innerHTML += content;
            }})
   
}

function getUsers() {
 return   new Promise((resolve,reject)=>{
        fetch('https://jsonplaceholder.typicode.com/users')
    .then(response => {
        if(response.ok){
          return  response.json();
        }else{
            reject("error with user request")
        }})
    .then(users => {
        let usersContainer = document.getElementById("users");
            usersContainer.innerHTML = "";
            for (let user of users) {
                let content = `<div class="user" onclick="userClicked(${user.id}, this)">
                    <h3>${user.name}</h3>
                    <p>${user.email}</p>
                </div>`;
                usersContainer.innerHTML += content;
            }
             resolve()
        })
    })
    
   
}
getUsers()
.then(()=>{
    getPosts(1)
})
.catch((error)=>{
    console.log(error)
})

function userClicked(id, el) {
    getPosts(id);
    let selectedElements = document.getElementsByClassName("selected");
    for (let element of selectedElements) {
        element.classList.remove("selected");
    }
    el.classList.add("selected");
}
