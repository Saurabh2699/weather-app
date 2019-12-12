const weatherform = document.querySelector("form");
const search = document.querySelector("input");
const msg1 = document.querySelector("#p1");
const msg2 = document.querySelector("#p2");

msg1.textContent = " ";

weatherform.addEventListener("submit", e => {
  e.preventDefault();
  const locationValue = search.value;

  msg1.textContent = "Loading your data...";
  msg2.textContent = " ";

  fetch("/weather?address=" + locationValue).then(res => {
    res.json().then(data => {
      if (data.error) {
        msg1.textContent = data.error;
      } else {
        msg1.textContent = data.location;
        msg2.textContent = data.forecast;
      }
    });
  });
});
