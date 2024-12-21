const commentFunction = () => {
  // Get the current URL

  // Log the extracted IDs
  const postId = document.querySelector(".main-post-text").dataset.id;
  console.log(postId, "from comment post id");
  function comment(postId) {
    const commentForm = document.getElementById("commentForm");
    const commentsContent = document.getElementById("comments");
    const commentBtn = document.getElementById("cbtn");
    const messageDiv = document.querySelector(".message");

    //

    commentBtn.addEventListener("click", async (e) => {
      e.preventDefault();

      // check email
      if (!commentsContent.value) {
        messageDiv.style.color = "red";
        messageDiv.textContent = "Please don't send an empty field";

        setInterval(() => {
          messageDiv.textContent = "";
        }, 4000);

        return;
      }

      const commentsFormData = new FormData();
      commentsFormData.append("content", commentsContent.value);

      // fetch

      const newsletterResponse = await fetch(
        `
      /posts/${postId}/comment`,
        {
          method: "POST",
          body: commentsFormData,
        }
      );

      if (!newsletterResponse.ok) {
        console.log("error when saving newsletter");
        return message(
          [email],
          "error-message",
          "internal server issue please try later"
        );
      }

      const newsletterData = await newsletterResponse.json();
      window.location.reload();
    }); // end click
  }

  comment(postId);
};

commentFunction();
