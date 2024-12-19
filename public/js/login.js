function login() {
  document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("loginForm");
    const btn = document.getElementById("loginBtn");

    btn.addEventListener("click", async (e) => {
      e.preventDefault();
      // front end validation
      // console.log(userName);
      const email = document.getElementById("userEmail").value;
      console.log(userEmail);
      const password = document.getElementById("userPassword").value;
      console.log(userPassword);
      const messageDiv = form.querySelector(".message");

      if (!email || !password) {
        messageDiv.textContent = "all field are required";
        return;
      }
      // email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        messageDiv.textContent = "Invalid email format";
        return;
      }

      if (password.length < 2) {
        messageDiv.textContent = "password must be at least 6 characters ";
      }

      try {
        let formData = {
          email,
          // subject: subject.value,
          password,
        };
        // console.log(formData);

        // aftre login i can dynamicaly add nav
        try {
          const response = await axios.post("/auth/login", formData);
          const { name, role, userId } = response.data.user;
          window.location.href = `/home`; // Redirect to home page on success
          // You can also handle additional logic here if needed
        } catch (error) {
          console.error("Error:", error);
          // Show a more detailed error message
          if (Error.response) {
            // If the error is from the server, display the server's error message
            messageDiv.textContent = Error.response.data.msg || "Login failed";
          } else {
            // If it's a network error or no response from the server
            messageDiv.textContent = "Login failed. Please try again.";
          }
        }
        // Do something with the data, e.g., update UI or redirect
        // console.log("Received data:", { email, password });// only for test

        // if (!response.ok) {
        // }
      } catch (error) {
        console.error("Error:", error);
        messageDiv.textContent = error;
      }
    });
  });
}

login();

// logout

function logoutV1() {
  const logoutBtn = document.querySelector(".dash-logout");

  logoutBtn.addEventListener("click", (e) => {
    e.preventDefault();

    const fetchlogout = async () => {
      const response = await fetch("/auth/logout");
      // check if sucess
      if (!response.ok) {
        console.log("there is an issue");
      }

      window.location.href = `/posts/home`;
    };
    fetchlogout();
  });
}

// export { login, logoutV1 };
