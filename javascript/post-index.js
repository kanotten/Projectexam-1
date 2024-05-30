document.addEventListener("DOMContentLoaded", () => {
  const urlParams = new URLSearchParams(window.location.search);
  const postId = urlParams.get("id");
  const postTitle = urlParams.get("title");
  const postContent = urlParams.get("content");
  const postAuthor = urlParams.get("author");
  const postDate = urlParams.get("date");
  const postImageUrl = urlParams.get("imageUrl");
  const postImageAlt = urlParams.get("imageAlt");

  document.getElementById("post-title").textContent = postTitle;
  document.getElementById("post-content").textContent = postContent;
  document.getElementById("post-author").textContent = postAuthor;
  document.getElementById("post-date").textContent = postDate;
  document.getElementById("post-id").textContent = postId;
  document.getElementById("post-image").src = postImageUrl;
  document.getElementById("post-image").alt = postImageAlt;
});
