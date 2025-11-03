const container = document.querySelector(".container");

async function getData() {
  try {
    const res = await fetch("./data.json");
    if (!res.ok) {
      throw new Error("something went wrong");
    }
    const data = await res.json();

    return data;
  } catch (err) {
    console.log(`server error : ${err}`);
  }
}

const data = getData();

function createRepliedComment(arrOfData, actualData) {
  const repliedCommentContainer = document.createElement("div");
  repliedCommentContainer.classList.add("replied-comment-container");
  if (arrOfData.length) {
    arrOfData.forEach((comment) => {
      const repliedComment = document.createElement("div");
      repliedComment.classList.add("actual-comment");
      if (comment.user.username === actualData.currentUser.username) {
        console.log();
        repliedComment.innerHTML = `<div class="vote" >
         <img src="./images/icon-plus.svg" alt="" id = "plus">
         <p class="score" score = "${comment.score}">${comment.score}</p>
         <img src="./images/icon-minus.svg" alt="" id = "minus">
 </img></img>       </div>
        <div class="comment-body">
          <div class="info">
            <img src="${comment.user.image.png}" alt="" id = "profile">
            <h2 class = "name">${comment.user.username}</h2>
            <span class="tag" style = "padding : 5px 10px;">${
              comment.user.username === actualData.currentUser.username
                ? "you"
                : ""
            }</span>
            <p class = "time">${comment.createdAt}</p>
            <button id="deleteBtn"><img src="./images/icon-delete.svg" alt="">Delete</button>
    <button id="editBtn"><img src="./images/icon-edit.svg" alt="">Edit</button>
          </div>
          <div class="text"><span>@${
            comment.name ? comment.name : ""
          }</span>${" "}${comment.content}</div>
          </div>`;
      } else {
        repliedComment.innerHTML = `<div class="vote" >
         <img src="./images/icon-plus.svg" alt="" id = "plus">
         <p class="score" score = "${comment.score}">${comment.score}</p>
         <img src="./images/icon-minus.svg" alt="" id = "minus">
 </img></img>       </div>
        <div class="comment-body">
          <div class="info">
            <img src="${comment.user.image.png}" alt="" id = "profile">
            <h2 class = "name">${comment.user.username}</h2>
            <span class="tag">${
              comment.user.username === actualData.currentUser.username
                ? "you"
                : ""
            }</span>
            <p class = "time">${comment.createdAt}</p>
            <button id = "reply"><img src="./images/icon-reply.svg" alt="" >Replay</button>
          </div>
          <div class="text"><span>@${
            comment.name ? comment.name : ""
          }</span>${" "}${comment.content}</div>
          </div>`;
      }
      repliedCommentContainer.append(repliedComment);
    });
    return repliedCommentContainer;
  } else {
    return repliedCommentContainer;
  }
}

function createMainComment(data, actualData) {
  const comment = document.createElement("div");
  comment.classList.add("comment");
  comment.id = data.id - 1;

  const actualComment = document.createElement("div");
  actualComment.classList.add("actual-comment");

  actualComment.innerHTML = `<div class="vote">
         <img src="./images/icon-plus.svg" alt="" id = "plus">
         <p class="score" score = "${data.score}">${data.score}</p>
         <img src="./images/icon-minus.svg" alt="" id = "minus">
 </img></img>       </div>
        <div class="comment-body">
          <div class="info">
            <img src="${data.user.image.png}" alt="" id = "profile">
            <h2 class = "name">${data.user.username}</h2>
            <p class = "time">${data.createdAt}</p>
            <button id = "reply"><img src="./images/icon-reply.svg" alt="" >Replay</button>
          </div>
          <div class="text">${data.content}</div>
          </div>`;

  comment.append(actualComment);
  const repliedComment = createRepliedComment(data.replies, actualData);
  comment.append(repliedComment);
  return comment;
}
function createInput(btnText) {
  const input = document.createElement("div");
  input.classList.add("input");
  input.innerHTML = `
        <img src="/images/avatars/image-juliusomo.png" alt="">
        <input type="text" name="juliusomo" id="input" placeholder="Add a comment...">
        <button id = "replyBtn">${btnText}</button>`;

  return input;
}

function createUserObj(content, length, image, username, name) {
  let commentObj = {
    name: name,
    content: content,
    createdAt: new Date().toLocaleDateString("en-GB"),
    id: length,
    replies: [],
    score: 0,
    user: {
      image: image,
      username: username,
    },
  };

  return commentObj;
}

function display() {
  container.innerHTML = "";
  data.then((data) => {
    data.comments.forEach((comment) => {
      const readyComment = createMainComment(comment, data);
      container.append(readyComment);
    });
  });
}
display();

container.addEventListener("click", (e) => {
  if (e.target.id === "plus") {
    let score = null;
    e.target.closest(".vote").childNodes.forEach((ele) => {
      if (ele.className === "score") {
        score = ele;
      }
    });

    originalScore = Number(score.getAttribute("score")) + 1;

    score.innerText = Math.min(originalScore, Number(score.innerText) + 1);
  }

  if (e.target.id === "minus") {
    let score = null;
    e.target.closest(".vote").childNodes.forEach((ele) => {
      if (ele.className === "score") {
        score = ele;
      }
    });
    originalScore = Number(score.getAttribute("score")) - 1;

    score.innerText = Math.max(originalScore, Number(score.innerText) - 1);
  }

  if (e.target.id === "reply") {
    const inputt = document.querySelector(".input");
    if (!inputt) {
      const input = createInput("REPLY");
      e.target.closest(".comment").append(input);

      window.scrollTo({
        top: input.getBoundingClientRect().top,
        behavior: "smooth",
      });
    } else {
      inputt.remove();
      const input = createInput("REPLY");
      e.target.closest(".comment").append(input);
      window.scrollTo({
        top: input.getBoundingClientRect().top,
        behavior: "smooth",
      });
    }
    const replyBtn = document.getElementById("replyBtn");

    const name = e.target.closest(".info").children[1].innerText;

    const input = document.querySelector(".input");

    input.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        data.then((data) => {
          const inputValue = document.getElementById("input").value;
          const commentObj = createUserObj(
            inputValue,
            data.comments.length + 1,
            data.currentUser.image,
            data.currentUser.username,
            name
          );

          data.comments[e.target.closest(".comment").id].replies.push(
            commentObj
          );
          display();
        });
      }
    });

    replyBtn.addEventListener("click", (e) => {
      data.then((data) => {
        const inputValue = document.getElementById("input").value;
        const commentObj = createUserObj(
          inputValue,
          data.comments.length + 1,
          data.currentUser.image,
          data.currentUser.username,
          name
        );
        data.comments[e.target.closest(".comment").id].replies.push(commentObj);
        display();
      });
    });
  }

  if (e.target.id === "editBtn") {
    const isEdit = document.getElementById("update-input");
    if (!isEdit) {
      const textBox = e.target.closest(".comment-body").children[1];
      const text = e.target.closest(".comment-body").children[1].innerText;
      e.target.closest(
        ".comment-body"
      ).children[1].innerHTML = `<textarea name="text" id="update-input" placeholder="Add a comment..."></textarea>
      `;
      const btn = document.createElement("button");
      btn.id = "updateBtn";
      btn.classList.add("btn");
      btn.innerText = "Update";
      e.target.closest(".comment-body").append(btn);

      const input = document.getElementById("update-input");
      input.value = text;

      const textArea = document.getElementById("update-input");

      const name = textArea.value.split(" ")[0];
      const textValue = textArea.value.split(" ").slice(1).join(" ");

      let value = `<span>${name}</span>${" "}${textValue}`;

      textArea.addEventListener("input", (e) => {
        const name = textArea.value.split(" ")[0];
        const textValue = textArea.value.split(" ").slice(1).join(" ");
        value = `<span>${name}</span>${" "}${textValue}`;
      });

      const updateBtn = document.getElementById("updateBtn");
      updateBtn.addEventListener("click", (e) => {
        document.getElementById("update-input").remove();
        document.getElementById("updateBtn").remove();
        textBox.innerHTML = value;
      });
    }
  }

  if (e.target.id === "deleteBtn") {
    const back = document.querySelector(".back");
    back.style.display = "flex";
    const cancelBtn = document.getElementById("cancel");
    const deleteBtn = document.getElementById("delete");
    cancelBtn.addEventListener("click", () => {
      back.style.display = "none";
    });
    deleteBtn.addEventListener("click", () => {
      e.target.closest(".actual-comment").remove();
      back.style.display = "none";
    });
  }
});
