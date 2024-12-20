// Initialize Intersection Observer
const observer = new IntersectionObserver(
  async (entries) => {
    entries.forEach(async (entry) => {
      if (entry.isIntersecting) {
        const blogPostId = entry.target.dataset.id;

        if (blogPostId) {
          // Trigger the view function
          await view(blogPostId); // call the view
          // console.log("user with id" + blogPostId + " view the post");
          // Stop observing once the blog post is viewed
          observer.unobserve(entry.target);
        } else {
          console.error("blogPostId is undefined");
        }
      }
    });
  },
  { threshold: 0.5 }
);

// get user id form the URL
// const currentUrView = window.location.href;
// const pathSegmentsView = new URL(currentUrView).pathname.split("/");
// const indexView = pathSegmentsView.indexOf("article");
// const viewUserId = pathSegmentsView[indexView + 2];// return the user that created this post
const viewUserId = document.getElementById("block-post").dataset.userid;
console.log(viewUserId, "user that logIn");

// Find all blog post elements and observe them
const blogPostElements = document.querySelectorAll(".main-post-text");
console.log(blogPostElements);
blogPostElements.forEach((blogPostElement) => {
  observer.observe(blogPostElement);
});

// view logic

async function view(blogPostId) {
  try {
    console.log(blogPostId, "PostId from view");
    console.log(viewUserId, "userviewId from view");

    // Fetch existing views
    const viewResponse = await fetch(`/posts/${blogPostId}/getViews`);
    const data = await viewResponse.json();
    const { numberOfView, userView } = data;
    console.log(userView, "view");

    // Check if the user has already viewed the post
    const userHasViewed = userView.some(
      (view) => view.userId === viewUserId && view.postId === blogPostId
    );
    console.log(userHasViewed, "userHasViewed");

    if (userHasViewed) {
      console.log("Post already viewed by user");
      return; // Exit early if already viewed
    } else {
      // Make the POST request to record the view
      const response = await fetch(`/posts/${blogPostId}/view`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: viewUserId, postId: blogPostId }), // Include necessary data
      });

      if (!response.ok) {
        console.error("Error in POST request:", response.statusText);
        throw new Error("Error during fetching");
      }

      const dataView = await response.json();
      console.log("New view recorded:", dataView);
    }
  } catch (error) {
    console.error("Error in view function:", error);
  }
}

//  fetch for display

const fetchViewDom = async () => {
  const viewDom = document.querySelector(".viewnum");

  try {
    const response = await fetch(`/posts`);

    if (!response.ok) {
      throw new Error("Failed to fetch posts ", Error);
    }

    const data = await response.json();

    const allPost = data.posts;

    let postsViews = allPost.map((post) => {
      return post.views.length;
    });
    viewDom.textContent = `${
      postsViews.reduce((acc, likesCount) => acc + likesCount, 0) === 0
        ? 0
        : postsViews.reduce((acc, likesCount) => acc + likesCount, 0)
    }`;
  } catch (error) {
    console.log(error);
  }
};

fetchViewDom();
