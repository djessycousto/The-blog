const likespanbtn = document.querySelector(".likes");
const getPostId = document.querySelector(".main-post-text").dataset.id;
const likespan = document.querySelector(".likespan");
console.log(getPostId);
const currentUrl = window.location.href;

// Extract the path from the URL
const pathSegments = new URL(currentUrl).pathname.split("/");
const userId = document.getElementById("block-post").dataset.userid;

// Get the postId from the dataset
const postId = getPostId;

const baseURL = "http://localhost:8080"; // Replace with your actual server URL

// fetch all posts

const fetchPosts = async () => {
  try {
    const response = await fetch(`/posts`);

    if (!response.ok) {
      throw new Error("Failed to fetch posts ", Error);
    }

    const data = await response.json();

    const allPost = data.posts;

    let postsLikes = allPost.map((post) => {
      return post.likes.length;
    });
    likespan.textContent = `${
      postsLikes.reduce((acc, likesCount) => acc + likesCount, 0) === 0
        ? 0
        : postsLikes.reduce((acc, likesCount) => acc + likesCount, 0)
    }`;
  } catch (error) {
    console.log(error);
  }
};

fetchPosts();

likespanbtn.addEventListener("click", async (e) => {
  e.preventDefault();

  try {
    // Check if the user already liked the post
    const likeResponse = await fetch(`${baseURL}/posts/${postId}/likes`);
    if (!likeResponse.ok) throw new Error("Failed to fetch likes");

    const { LikeNum, like } = await likeResponse.json();
    // const userHasLiked = LikeNum > 0;
    const userHasLiked = like.some(
      (like) => like.userId === userId && like.postId === postId
    );
    // Send like or unlike based on current state
    const endpoint = userHasLiked ? "unlikes" : "likes";
    const response = await fetch(`${baseURL}/posts/${postId}/${endpoint}`, {
      method: "POST",
    });

    if (!response.ok) throw new Error("Failed to update like status");

    const data = await response.json();
    console.log(
      userHasLiked ? "User unliked this post" : "User liked this post",
      data
    );

    // Update the like count dynamically without reloading
    // await fetchLikeDisplay();
    await fetchPosts();
  } catch (error) {
    console.error("Error handling like button:", error);
  }
});
