function deletePost(id) {
  fetch("/posts/" + id, { method: "DELETE" }).then((res) => {
    res.text().then((id) => {
      document.getElementById(id).remove();
    });
  });
}

