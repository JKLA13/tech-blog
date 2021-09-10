//add post function
async function editPostHandler(event) {
  event.preventDefault();

  const postTitle = document
    .querySelector('input[name="post-title"]')
    .value.trim();
  const postContent = document
    .querySelector('textarea[name="content"]')
    .value.trim();
  console.log(title);
  console.log(content);

  const id = window.location.toString().split("/")[
    window.location.toString().split("/").length - 1
  ];

  const response = await fetch(`/api/posts/${id}`, {
    method: "PUT",
    body: JSON.stringify({
      post_id: id,
      title,
      content,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (response.ok) {
    document.location.replace("/dashboard/");
  } else {
    alert(response.statusText);
  }
}
//event listener edit
document
  .querySelector(".edit-post-form")
  .addEventListener("submit", editFormHandler);

//delete post function
async function deletePostHandler(event) {
  event.preventDefault();

  const postId = window.location.toString().split("/")[
    window.location.toString().split("/").length - 1
  ];

  const response = await fetch(`/api/posts/${id}`, {
    method: "DELETE",
    body: JSON.stringify({
      post_id: id,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (response.ok) {
    document.location.replace("/dashboard/");
  } else {
    alert(response.statusText);
  }
}
//event listener delete
document
  .querySelector(".delete-post-btn")
  .addEventListener("click", deleteFormHandler);
