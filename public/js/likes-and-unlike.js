const likespanbtn = document.querySelector(".likes");
const getPostId = document.querySelector(".main-post-text").dataset.id;
const likespan = document.querySelector(".likespan");

const currentUrl = window.location.href;

// Extract the path from the URL
const pathSegments = new URL(currentUrl).pathname.split("/");

// Find the indices of 'insight-article' and extract the two IDs
const index = pathSegments.indexOf("article");
// const postId = pathSegments[index + 1];
const userId = pathSegments[index + 2];

// Log the extracted IDs
// console.log("Post ID:", postId);

// Get the postId from the dataset
const postId = getPostId;

const baseURL = "http://localhost:8080"; // Replace with your actual server URL

// Function to fetch like count and update the display
const fetchLikeDisplay = async () => {
  try {
    const likeResponse = await fetch(`${baseURL}/posts/${postId}/likes`);
    if (!likeResponse.ok) throw new Error("Failed to fetch likes");

    // const { LikeNum } = await likeResponse.json();
    const data = await likeResponse.json();

    console.log(data);
    likespan.textContent = `${data.LikeNum}`; // Update the like count in the DOM
    return data.LikeNum;
  } catch (error) {
    console.error("Error fetching likes:", error);
  }
};

// Event listener for like button click
likespanbtn.addEventListener("click", async (e) => {
  e.preventDefault();

  try {
    // Check if the user already liked the post
    const likeResponse = await fetch(`${baseURL}/posts/${postId}/likes`);
    if (!likeResponse.ok) throw new Error("Failed to fetch likes");

    const { LikeNum, like } = await likeResponse.json();
    // const userHasLiked = LikeNum > 0;
    const userHasLiked = like.some((like) => like.userId === userId); // Replace loggedInUserId appropriately
    console.log(like, "likkkekeke");
    console.log(userHasLiked, "hasliked");
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
    await fetchLikeDisplay();
  } catch (error) {
    console.error("Error handling like button:", error);
  }
});
