//add a post function
async function newFormHandler(event) {
  event.preventDefault();
  console.log("hi");
  const title = document.querySelector('input[name="blog-title"]').value;
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
if (document.querySelector("#add-blog-button")) {
  console.log("no work?");
  document
    .querySelector("#add-blog-button")
    .addEventListener("click", newFormHandler);
}
