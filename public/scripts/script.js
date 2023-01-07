function deletePost(id) {
  fetch("/posts/" + id, { method: "DELETE" }).then((res) => {
    res.text().then((id) => {
      document.getElementById(id).remove();
    });
  });
}

const delButtons = document.getElementsByTagName("button");

for (const button of delButtons) {
  const postID = button.parentElement.parentElement.id;
  button.addEventListener("click", () => {
    deletePost(postID);
  });
}
