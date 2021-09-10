//add a post function
async function newPostHandler(event) {
  event.preventDefault();

  // capture the values of a form considered to be "add-post"
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
    document.location.replace("/dashboard");
  } else {
    alert(response.statusText);
  }
}
//event listener
document
  .querySelector("#add-post-form")
  .addEventListener("submit", newFormHandler);
