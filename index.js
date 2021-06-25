const postForm = document.getElementById("post-form")
const blogList = document.getElementById("blog-list")

let html = ''

fetch("https://apis.scrimba.com/jsonplaceholder/posts")
    .then(res => res.json())
    .then(data => {
        const postsArr = data.slice(0, 5)
        for (let post of postsArr) {
            html += `
                <h3>${post.title}</h3>
                <p>${post.body}</p>
                <hr />
            `
        }
        blogList.innerHTML = html
    })


const submitPost = (e) => {
    e.preventDefault();
    const title = document.getElementById("post-title").value;
    const body = document.getElementById("post-body").value;

    const postData = {
            title,
            body
        }
    
    fetch('https://apis.scrimba.com/jsonplaceholder/posts', {
        method: "POST",
        body: JSON.stringify(postData),
        headers:  {
            "Content-Type": "application/json"
    }
    })
    .then(res => res.json())
    .then(data => {
       const {title, body} = data;
       let newPost = ''
       newPost += `
            <h3>${title}</h3>
            <p>${body}</p>
            <hr />
       ` 
       blogList.insertAdjacentHTML('afterbegin', newPost)    
    })
    

}    

postForm.addEventListener('submit', submitPost)    