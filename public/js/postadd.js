//add a post function
async function newPostHandler(event) {
  event.preventDefault();

  const title = document.querySelector('input[name="post-title"]').value;
  const content = document.querySelector('textarea[name="content"]').value;

  const response = await fetch(`/api/posts`, {
    method: "POST",
    body: JSON.stringify({
      title,
      content,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (response.ok) {
    document.location.replace("/postadd");
  } else {
    alert(response.statusText);
  }
}
//event listener
document
  .querySelector("#new-blog-button")
  .addEventListener("click", newFormHandler);
