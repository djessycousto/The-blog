const likespanbtn = document.querySelector(".likes");
const getPostId = document.querySelector(".main-post-text").dataset.id;
const likespan = document.querySelector(".likespan");

//get id from dataset
const postId = getPostId;

console.log(likespan, "like span");
const baseURL = "http://localhost:8080"; // Replace with your actual server URL

//call like API to show numb of likes
likespanbtn.addEventListener("click", async (e) => {
  e.preventDefault();
  async function fetchLike() {
    const like = await fetchLikeDisplay();

    if (!like) {
      const likeResponse = await fetch(`/posts/${postId}/likes`, {
        method: "POST",
      });

      if (!likeResponse.ok) {
        console.log(error);
        return;
      }

      const likeData = await likeResponse.json();
      window.location.reload();
    } else if (like) {
      const unlikeResponse = await fetch(`/posts/${postId}/unlikes`, {
        method: "POST",
      });

      const unlikeData = await unlikeResponse.json();
      console.log("user unlike this post", unlikeData);
      window.location.reload();
      return;
    }
  }

  fetchLike();
});

const fetchLikeDisplay = async (postId) => {
  const likeResponse = await fetch(`${baseURL}/posts/${postId}/likes`); // where to get id
  const { LikeNum } = await likeResponse.json();
  likespan.textContent = `${LikeNum}`;
  return LikeNum;
};

fetchLikeDisplay();
