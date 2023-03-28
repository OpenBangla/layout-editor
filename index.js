const keyboardContainer = document.getElementById("keyboardContainer");

let data1 = [
  {
    text: "Tab",
  },
  {
    text: "Q",
  },
  { text: "W" },
  { text: "E" },
  { text: "R" },
  { text: "T" },
  { text: "Y" },
  { text: "U" },
  { text: "I" },
  { text: "O" },
  { text: "P" },
  { text: "[" },
  { text: "]" },
  { text: "\\" },
];
const data2 = [
  { text: "Caps " },
  { text: "A" },
  { text: "S" },
  { text: "D" },
  { text: "F" },
  { text: "G" },
  { text: "H" },
  { text: "J" },
  { text: "K" },
  { text: "L" },
  { text: ";" },
  { text: "'" },
  { text: "Enter" },
];

const data3 = [
  {
    text: "d 3",
  },
];
const data4 = [
  {
    text: "Shift",
  },
  { text: "Z" },
  { text: "X" },
  { text: "C" },
  { text: "V" },
  { text: "B" },
  { text: "N" },
  { text: "M" },
  { text: "," },
  { text: "." },
  { text: "/" },
  { text: "Shift" },
];

const handleClick = (e) => {
  console.log(e);
};

const makeKeyboard = () => {
  let line1 = document.createElement("div");
  let line2 = document.createElement("div");
  let line3 = document.createElement("div");
  let line4 = document.createElement("div");

  for (let i = 0; i < data1.length; i++) {
    let key = document.createElement("button");
    key.innerText = data1[i].text;

    if (i == 0) {
      key.classList.add("firstKeyL1");
    }
    if (i == data1.length - 1) {
      key.classList.add("lastKeyL1");
    }

    key.classList.add("key");

    key.addEventListener("click", () => handleClick(data1[i].text));

    line1.appendChild(key);
  }

  for (let i = 0; i < data2.length; i++) {
    let key = document.createElement("button");
    if (i == 0) {
      key.classList.add("firstKeyL2");
    }
    if (i == data2.length - 1) {
      key.classList.add("lastKeyL2");
    }

    key.classList.add("key");

    key.innerText = data2[i].text;
    key.addEventListener("click", () => handleClick(data2[i].text));

    // line2.classList.add("keyLine");

    line2.appendChild(key);
  }

  //   for (let i = 0; i < data3.length; i++) {
  //     let key = document.createElement("button");
  //     if (i == 0) {
  //       key.classList.add("scale3");
  //     }

  //     key.classList.add("key");

  //     key.innerText = data3[i].text;
  //     key.addEventListener("click", () => handleClick(data3[i].text));

  //     line3.appendChild(key);
  //   }

  for (let i = 0; i < data4.length; i++) {
    let key = document.createElement("button");
    if (i == 0) {
      key.classList.add("firstKeyL4");
    }
    if (i == data4.length - 1) {
      key.classList.add("lastKeyL4");
    }

    key.classList.add("key");

    key.innerText = data4[i].text;
    key.addEventListener("click", () => handleClick(data4[i].text));

    line4.appendChild(key);
  }

  keyboardContainer.appendChild(line1);
  keyboardContainer.appendChild(line2);
  keyboardContainer.appendChild(line3);
  keyboardContainer.appendChild(line4);
};

makeKeyboard();
