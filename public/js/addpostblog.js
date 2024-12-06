console.log("test from add");

///############## ADD post  ########################
const addPostBtn = document.getElementById("addForm");
document.addEventListener("DOMContentLoaded", () => {
  addPostBtn.addEventListener("submit", async (e) => {
    // prevent default
    e.preventDefault();

    const title = document.getElementById("addTitle").value;
    const post = document.getElementById("addPost").value;
    const category = document.getElementById("addCategory").value;
    const postPictureInput = document.getElementById("addPostPicture");
    // reset the post id

    // console.log(postPictureInput);
    let postPicture = postPictureInput.files[0];
    console.log(postPicture);
    // console.log(postPicture);

    if (!title || !post || !category) {
      console.log("all field must be fill");
    }

    // form data

    if (postPicture == null) {
      // remain data

      const updateDataPost = new FormData();
      updateDataPost.append("title", title);
      updateDataPost.append("post", post);
      updateDataPost.append("category", category);
      // updateDataPost.append("postPicture", addpostData.postPicture.path);

      addPostRes = await fetch("/posts", {
        method: "POST",
        body: updateDataPost,
      });

      if (!addPostRes.ok) {
        return console.log("error in the post js dash-blog data js");
      }

      addPost = await addPostRes.json();

      console.log(addPost, "all datasaved");

      setTimeout(() => {
        window.location.reload();
      }, 200);
    } else {
      const updateData = new FormData();
      updateData.append("postPicture", postPicture);

      // Append values to FormData

      // test entries
      for (const entry of updateData.entries()) {
        console.log(entry); //okay
      }

      const addPostResponse = await fetch("/posts/uploadPostPic", {
        method: "POST",
        body: updateData,
      });

      if (!addPostResponse.ok) {
        return console.log("error in the post js dash-blog js");
      }

      const addpostData = await addPostResponse.json();

      console.log(addpostData, "image saved");

      // remain data

      const updateDataPost = new FormData();
      updateDataPost.append("title", title);
      updateDataPost.append("post", post);
      updateDataPost.append("category", category);
      updateDataPost.append("postPicture", addpostData.postPicture.path);

      addPostRes = await fetch("/posts", {
        method: "POST",
        body: updateDataPost,
      });

      if (!addPostRes.ok) {
        return console.log("error in the post js dash-blog data js");
      }

      addPost = await addPostRes.json();
      console.log(addPost);

      // setTimeout(() => {
      //   window.location.reload();
      // }, 200);
    }
  }); //dom
});
