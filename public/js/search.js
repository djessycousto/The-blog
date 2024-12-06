const mainDomContainer = document.querySelector(".main-post-container");
const domContent = document.querySelector(".main-post-contents");
const searchForm = document.querySelector("#search-form");
const searchFormInput = document.querySelector("#search-form input");

async function searchBlog() {
  let searchIn = [];

  // fetch post and user

  const fetchAllPosts = await fetch("/posts");
  const result = await fetchAllPosts.json();
  const data = result.posts;

  //   console.log(data); // okay

  const posts = await Promise.all(
    data.map(async (post) => {
      //populate user field to get user
      const populatePost = await fetch(`/users/${post.user}`);
      const userData = await populatePost.json();

      return {
        ...post,
        user: userData,
      };
    })
  );
  return posts;
}

searchForm.addEventListener("keyup", async () => {
  const value = searchFormInput.value.toLowerCase(); // Get search input value
  const newPostSearching = await searchBlog(); // Fetch posts

  let filteredPosts = [];

  if (value) {
    // Filter posts based on the input
    filteredPosts = newPostSearching.filter((post) => {
      const title = post.title.toLowerCase(); // Ensure case-insensitive comparison
      return title.startsWith(value); // Match titles starting with the input
    });
    display(filteredPosts); // Display only matching posts
  }
  if (filteredPosts < 1) {
    mainDomContainer.innerHTML = "Sorry we can't find the article requested ";
  } else {
    // If input is empty, reset to all posts
    display(newPostSearching);
  }
});

function display(posts) {
  mainDomContainer.innerHTML = "";
  // Generate HTML for all posts using map
  const postsHTML = posts
    .map((post) => {
      const user = post.user.user;
      //   console.log(user.name);
      return `
        <div class="main-post-contents">
          <div class="main-post-banner">
            <div class="p-holder-for-pic">
              <img src="${user.userImage}" alt="${user.name}'s Image" />
            </div>
            <div class="main-post-banner-details">
              <h4>${post.title}</h4>
              <div class="main-top-details">
                <span>${user.name}</span>
                <span>${new Date(post.createdAt).toLocaleTimeString("en-UK", {
                  hour: "numeric",
                  minute: "numeric",
                  hour12: false,
                })}</span>
                <span>${new Date(post.createdAt).toLocaleDateString("en-UK", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                })}</span>
              </div>
            </div>
          </div>
  
          <div class="main-block-image ${
            post.postPicture ? "" : "empty-image"
          }">
            ${
              post.postPicture
                ? `<img src="${post.postPicture}" alt="Post Image">`
                : ""
            }
          </div>
  
          <div class="tag">
            ${post.category
              .map((cat) =>
                cat
                  .split(",")
                  .map((category) => `<span>${category.trim()}</span>`)
                  .join("")
              )
              .join("")}
          </div>
  
          <div class="main-post-text">
            <p>${post.post}</p>
          </div>
  
          <div class="main-btn-and-icon">
            ${
              post.user
                ? `<a href="/article/${post._id}/${post.user._id}" class="main-read-more-btn">Read More</a>`
                : `<a href="/auth/login?redirect=${encodeURIComponent(
                    `${post._id}/${post.user._id}`
                  )}" class="main-read-more-btn">Login to Read More</a>`
            }
            <div class="likes-view-comments-number">
              <i class="fa-solid fa-eye"><span class="viewnum">0</span></i>
              <i class="fa-solid fa-comment"><span class="commentspan">0</span></i>
              <a href="#" class="likes">
                <i class="fa-solid fa-thumbs-up"><span class="likespan">0</span></i>
              </a>
            </div>
          </div>
        </div>
        `;
    })
    .join(""); // Join all mapped HTML strings into a single string

  // Set the generated HTML as the container's content
  mainDomContainer.innerHTML = postsHTML;
}

//

// const test = fetchAllPosts();
// console.log(test);
