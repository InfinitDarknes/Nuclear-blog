var UserName = document.getElementById("user-name");
var CommentText = document.getElementById("comment-text");
var CommentDate = document.getElementById("comment-date");
var Comment = document.getElementsByClassName("comment");
var CommentsNumber = document.getElementById("comments-number");
CommentsNumber.innerHTML = Comment.length;

function CommentConstructor(UserName,UserMsg,UserEmail,CommentDate){
  this.UserName = UserName;
  this.UserMsg = UserMsg;
  this.UserEmail = UserEmail;
  this.CommentDate = CommentDate;

}

function CommentPacker() {
  let UserName = document.getElementById("user-name-input").value;
  let UserMsg = document.getElementById("comment-text-input").value;
  let UserEmail = document.getElementById("email-input").value;
  let CommentDate = new Date();
  var NewComment = new CommentConstructor(UserName,UserMsg,UserEmail,CommentDate);
  console.log(NewComment)
}

function allPostsBtn() {
  var menu = document.getElementById("all-posts");

  if (menu.className === "all-posts-nav") {
    menu.className += " show";
  } else {
    menu.className = "all-posts-nav";
  }
}

function hotNewsBtn() {
  var menu = document.getElementById("hot-news");

  if (menu.className === "hot-news-nav side-bar-nav") {
    menu.className += " show";
  } else {
    menu.className = "hot-news-nav side-bar-nav";
  }
}

function recentPostsBtn() {
  var menu = document.getElementById("recent-posts");

  if (menu.className === "recent-posts-nav side-bar-nav") {
    menu.className += " show";
  } else {
    menu.className = "recent-posts-nav side-bar-nav";
  }
}

function ShowCommentsBtn() {
  let Comments = document.getElementById("comments");
  let ComputedComments = window.getComputedStyle(Comments);
  if(ComputedComments.display === "none"){
    Comments.style.display = "flex";
  }
  else if(ComputedComments.display==="flex"){
    Comments.style.display = "none";
  }
}
