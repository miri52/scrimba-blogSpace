const postForm = document.getElementById("post-form")
const blogList = document.getElementById("blog-list")
const titleEl = document.getElementById("post-title")
const bodyEl = document.getElementById("post-body")


let postsArray = [];


function renderPosts(){
    let html = ""
    for (let post of postsArray) {
            html += `
                <h3>${post.title}</h3>
                <p>${post.body}</p>
                <hr />
            `
        }
        blogList.innerHTML = html
}

fetch("https://apis.scrimba.com/jsonplaceholder/posts")
    .then(res => res.json())
    .then(data => {
        postsArray = data.slice(0, 5)
        renderPosts()
    })


const submitPost = (e) => {
    e.preventDefault()
    title = titleEl.value
    body = bodyEl.value

    if(!title || !body) return;

    const postData = {
            title,
            body
        }
    
    fetch("https://apis.scrimba.com/jsonplaceholder/posts", {
        method: "POST",
        body: JSON.stringify(postData),
        headers:  {
            "Content-Type": "application/json"
    }
    })
    .then(res => res.json())
    .then(post => {
        postsArray.unshift(post)
        renderPosts()
        postForm.reset()
    })
}    

postForm.addEventListener("submit", submitPost)    