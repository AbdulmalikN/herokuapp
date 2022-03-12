const send = document.querySelector("#send");
const sendBtn = document.querySelector("#send-btn");
const result = document.querySelector("#result");

const fam = document.querySelector("#fam");
const ism = document.querySelector("#ism");
const tel = document.querySelector("#tel");

let MyData = [];

Res();

function Resolt(param) {
  return param.map((item, index) => {
    return `
            <tr>
                <td>${item.ism}</td>
                <td>${item.fam}</td>
                <td>${item.tel}</td>
                <td>
                    <button onclick="Edit(${index})">Edit</button>
                    <button onclick="Delete(${item.id})">Delete</button>
                </td>
            </tr>
        `;
  });
}

send.addEventListener("submit", (e) => {
  e.preventDefault();
  const data = {
    ism: ism.value,
    fam: fam.value,
    tel: tel.value,
  };

  switch (sendBtn.value) {
    case "Add":
      data.status = "add";
      fetch("https://uitc-students.herokuapp.com/talaba", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
        .then((res) => res.json())
        .then((data) => {
          Res();
          console.log(data);
          sendBtn.value = "Add";
        })
        .catch((err) => console.log(err));
      break;

    case "Update":
      data.status = "update";
      data.id = MyData[0].id;
      fetch("https://uitc-students.herokuapp.com/talaba", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
        .then((res) => res.json())
        .then((data) => {
          Res();
          console.log(data);
          sendBtn.value = "Add";
        })
        .catch((err) => console.log(err));
      break;
  }
});

function Delete(userID) {
  fetch(`https://uitc-students.herokuapp.com/talaba`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ status: "delete", id: userID }),
  })
    .then((res) => res.json())
    .then((data) => {
      alert(data.msg);
      Res();
    })
    .catch((err) => console.log(err));
}

function Edit(userID) {
  sendBtn.value = "Update";
  ism.value = MyData[userID].ism;
  fam.value = MyData[userID].fam;
  tel.value = MyData[userID].tel;
}

function Res() {
  fetch("https://uitc-students.herokuapp.com/api/students")
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      MyData = data;
      result.innerHTML = Resolt(data).join("");
    })
    .catch((err) => console.log(err));
}
