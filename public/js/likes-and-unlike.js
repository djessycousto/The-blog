const likesAndUnlike = () => {
  const likespanbtn = document.querySelector(".likes");
  const mainPostText = document.querySelector(".main-post-text");
  const likespan = document.querySelector(".likespan");
  const blockPost = document.getElementById("block-post");

  if (!likespanbtn || !mainPostText || !likespan || !blockPost) {
    console.error("Required DOM elements not found");
    throw new Error("Initialization failed: Missing DOM elements");
  }

  const getPostId = mainPostText.dataset.id;
  console.log(getPostId, "getPostid from like js");
  const userId = blockPost.dataset.userid;
  console.log(userId, "userid ffrom like js");

  const baseURL = "http://localhost:8080"; // Replace with your actual server URL

  // Fetch all posts
  const fetchPosts = async () => {
    try {
      const response = await fetch(`${baseURL}/posts`);

      if (!response.ok) {
        throw new Error("Failed to fetch posts");
      }

      const data = await response.json();
      const allPost = data.posts;

      const postsLikes = allPost.map((post) => post.likes.length);
      const totalLikes = postsLikes.reduce(
        (acc, likesCount) => acc + likesCount,
        0
      );
      likespan.textContent = `${totalLikes}`;
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  fetchPosts();

  likespanbtn.addEventListener("click", async (e) => {
    e.preventDefault();

    try {
      // Fetch existing likes for the post
      const likeResponse = await fetch(`${baseURL}/posts/${getPostId}/likes`);
      if (!likeResponse.ok) throw new Error("Failed to fetch likes");

      const { LikeNum, like } = await likeResponse.json();
      console.log("Likes array:", like);

      // Check if the user has already liked the post
      const userHasLiked =
        Array.isArray(like) &&
        like.some(
          (like) => like.userId === userId && like.postId === getPostId
        );
      console.log("User has liked:", userHasLiked);

      // Determine the correct endpoint
      const endpoint = userHasLiked ? "unlikes" : "likes";
      console.log("Endpoint URL:", `${baseURL}/posts/${getPostId}/${endpoint}`);

      // Send the like/unlike request
      const response = await fetch(
        `${baseURL}/posts/${getPostId}/${endpoint}`,
        {
          method: "POST",
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Failed to update like status: ${errorText}`);
      }

      console.log(
        userHasLiked ? "User unliked this post" : "User liked this post",
        await response.json()
      );

      // Update the like count dynamically without reloading
      await fetchPosts();
    } catch (error) {
      console.error("Error handling like button:", error);
    }
  });
};
