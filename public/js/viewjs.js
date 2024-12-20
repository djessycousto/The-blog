// Log the extracted IDs
// const test = document.getElementById("block-post");
// const userId = document.getElementById("block-post").dataset;
// console.log(userId, "from a view");
// console.log(test, " test from a view");

console.log(postId);
// console.log(userId);

async function view(postId, userId) {
  const baseURL = "http://localhost:8080"; // Replace with your actual server URL

  const viewResponsecheck = await fetch(`${baseURL}/posts/${postId}/getViews`);
  const viewDatacheck = await viewResponsecheck.json();

  // show view

  console.log(viewDatacheck.numberOfView);

  // ////////
  const viewspan = document.querySelector(".viewnum");

  viewspan.textContent = viewDatacheck.numberOfView;

  if (!viewDatacheck) {
    const viewResponse = await fetch(
      `${baseURL}/posts/view/${postId}/${userId}`,
      {
        method: "POST",
        //   body: commentsFormData,
      }
    );

    if (!viewResponse.ok) {
      console.log("error when saving newsletter");
      return;
    }

    const viewData = await viewResponse.json();

    console.log(viewData);
  }

  return console.log("already exist ");
}

view(postId, userId);
