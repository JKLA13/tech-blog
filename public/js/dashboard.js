//add a post button function
async function newPostHandler(event) {
  document.location.replace("/postadd");
}

//event listener
if (document.querySelector("#new-blog-button")) {
  document
    .querySelector("#new-blog-button")
    .addEventListener("click", newPostHandler);
}
