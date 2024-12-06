// console.log("menuToggle");
import { navToggle } from "./main-js.js"; // working
// import { addUser } from "./add.js";
// import { login, logoutV1 } from "./login.js";
// import { tableDom } from "./new-dashboard.js";
// import { tableDom, editV1, deleteFctToCheck } from "./new-dashboard.js";

// navToggle();

console.log("from index");

// home page fetch and display
// async function getAllPost() {
//   const [postResponse, userResponse] = await Promise.all([
//     fetch("/posts"),
//     fetch("/users"),
//   ]);

//   const { posts } = await postResponse.json();
//   const { users } = await userResponse.json();

//   // Assuming each post has a 'userId' field that corresponds to the user's _id

//   const postWithUserId = posts.map((post) => {
//     const user = users.find((user) => {
//       return user._id === post.user;
//     });
//     return { ...post, user }; // Merge post data with user data
//   });

//   //   console.log(postWithUserId, "Posts with populated user");
//   return postWithUserId;
// }

// async function displayBlogs() {
//   const blogPost = await getAllPost();
//   //   console.log(blogPost);

//   //   queryselector As
//   const mainContainerHome = document.querySelector(".main-post-container");

//   mainContainerHome.innerHTML = blogPost
//     .map((post) => {
//       const {
//         _id: blogPostId,
//         title,
//         post: blogPost,
//         category,
//         postPicture,
//         updatedAt,
//       } = post;
//       const { name: author, role, _id: userId, userImage } = post.user;

//       if (!blogPost) {
//         return (mainContainerHome.innerHTML =
//           "No New post yet, signup or login to post ");
//       } else {
//         return `   <div class="main-post-contents">

//         <!-- banner imag name time  -->
//         <div class="main-post-banner">
//             <!-- <i class="fa-solid fa-user"></i> -->

//             <div class="p-holder-for-pic">
//                 <!-- <i class="fa-solid fa-circle-user"></i> -->
//                 <img src=${userImage}
//                     alt="" />
//             </div>

//             <div class="main-post-banner-details">
//                 <h4> ${title.toUpperCase()}</h4>
//                 <div class="main-top-details">
//                     <span> ${author.toUpperCase()} </span> <span>${new Date(
//           updatedAt
//         ).toLocaleTimeString("en-US", {
//           hour: "2-digit",
//           minute: "2-digit",
//         })} </span><span> ${new Date(updatedAt).toLocaleDateString()}</span>
//                 </div>
//             </div>
//         </div>
//         <!-- end banner end imag name time  -->

//         <div class="main-block-image">
//             <img src=${postPicture}>
//              </div>

//             <div class="tag">
//                 <span> Fashion </span>
//                 <span> Tech </span>
//             </div>
//             <div class="main-post-text">
//                 <p>
//                    ${blogPost}
//                 </p>
//             </div>

//             <div class="main-btn-and-icon">
//                 <a href="#" class="main-read-more-btn"> Read more </a>
//                 <div class="likes-view-comments-number">
//                     <i class="fa-solid fa-eye"> 0 </i>
//                     <!-- <span>views: 0</span> -->
//                     <i class="fa-solid fa-comment"> 0 </i>
//                     <!-- <a href="#" class="comment">comments: 0</a> -->
//                     <a href="#" class="likes"><i class="fa-solid fa-thumbs-up"> 0 </i></a>
//                     <!-- <i class="fa-regular fa-thumbs-up"></i> -->
//                 </div>
//             </div>
//         </div>
//     </div>`;
//       }
//     })
//     .join("");

//   return;
// }
// displayBlogs();

// const getElement = (elementDom) => {
//   const selection = document.querySelector(elementDom);

//   if (selection) {
//     console.log(selection);
//     return selection;
//   } else {
//     console.error(
//       "The class or Id selected is undefine, Please check your selection"
//     );
//     return;
//   }
// };

// // Function to get a cookie by name and decode its value
// function getCookie(name) {
//   const value = `; ${document.cookie}`;
//   const parts = value.split(`; ${name}=`);
//   if (parts.length === 2) {
//     // Return decoded value if it's URL-encoded
//     return decodeURIComponent(parts.pop().split(";").shift());
//   }
//   return null; // Return null if the cookie doesn't exist
// }

// // Get the token cookie (it could be signed and URL-encoded)
// const token = getCookie("token"); // Assuming 'token' is the signed cookie name

// if (token) {
//   console.log("Signed token cookie found:", token);
// } else {
//   console.log("No signed token cookie found.");
// }

// getCookie("token");
