//access header of the site
const getHeader = document.getElementById("header");

/*PRESENT DATE, DAY AND TIME*/
//access present container
const presentContainer = document.getElementById("present");

//create date container
let date = document.createElement("div");
date.id = "presentDate";

//create time container
let time = document.createElement("div");
time.id = "presentTime";

//access the date constructor in JS
let now = new Date();
//days array to display the day according to the index number
const days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
date.textContent = `${days[now.getDay()]}, ${
  now.toLocaleString().split(",")[0]
}`;
presentContainer.appendChild(date);

//function to display and update Time every 1000ms
const updateTime = () => {
  let presentTime = new Date();
  time.textContent = presentTime.toLocaleString().split(",")[1];
  presentContainer.appendChild(time);
};
setInterval(updateTime, 1000);

//access alarm section
const setAlarm = document.getElementById("setAlarm");
setAlarm.id = "setAlarm";
const formContainer = document.createElement("div");
formContainer.id = "formContainer";
setAlarm.appendChild(formContainer);

//function to create input fields for alarm hh:mm:ss
const initialForm = document.createElement("div");
formContainer.appendChild(initialForm);
initialForm.id = "initialForm";
const formInputs = (min, max) => {
  const inputName = document.createElement("input");
  inputName.classList.add("timeElements", "nextInput");
  inputName.type = "text";
  inputName.min = min;
  inputName.max = max;
  inputName.maxLength = "2";
  inputName.pattern = "0-9";
  formContainer.appendChild(inputName);
};
const l = 10;
//hour field
const hr = document.createElement("input");
hr.classList.add("timeElements");
hr.id = "hrInput";
hr.type = "text";
hr.min = "01";
hr.max = "11";
hr.maxLength = "2";
hr.pattern = "0-9";
formContainer.appendChild(hr);
const colon1 = document.createElement("p");
colon1.classList.add("colon");
colon1.textContent = ":";
formContainer.appendChild(colon1);

//min field
const min = document.createElement("input");
min.classList.add("timeElements");
min.id = "minInput";
min.type = "text";
min.min = "00";
min.max = "59";
min.maxLength = "2";
min.pattern = "0-9";
formContainer.appendChild(min);
const colon2 = document.createElement("p");
colon2.classList.add("colon");
colon2.textContent = ":";
formContainer.appendChild(colon2);

//sec field
const sec = document.createElement("input");
sec.classList.add("timeElements");
sec.id = "secInput";
sec.type = "text";
sec.min = "00";
sec.max = "59";
sec.maxLength = "2";
sec.pattern = "0-9";
formContainer.appendChild(sec);

document.getElementById("hrInput").addEventListener("input", function () {
  if (this.value.length >= 2) {
    document.getElementById("minInput").focus();
  }
});
document.getElementById("minInput").addEventListener("input", function () {
  if (this.value.length >= 2) {
    document.getElementById("secInput").focus();
  }
});
document.getElementById("secInput").addEventListener("input", function () {
  if (this.value.length >= 2) {
    document.getElementById("ampm").focus();
  }
});

//wrapping submit btn and AMPM select in a div for styling purposes
const finalForm = document.createElement("div");
formContainer.appendChild(finalForm);
finalForm.id = "finalForm";
const ampm = document.createElement("select");
ampm.id = "ampm";
ampm.classList.add("nextInput");
const am = document.createElement("option");
am.textContent = "AM";
ampm.appendChild(am);
const pm = document.createElement("option");
pm.textContent = "PM";
ampm.appendChild(pm);
finalForm.appendChild(ampm);

//submit button
const submitBtn = document.createElement("btn");
submitBtn.id = "submitBtn";
submitBtn.classList.add("btn");
submitBtn.textContent = "Set";
finalForm.appendChild(submitBtn);

//Update the data for alarms set by the user
let alarmJSON = []; //initializing empty array to store alarm objs
// function to create alarm objs from the input by the user
submitBtn.addEventListener("click", () => {
  let hourValue = document.getElementById("hrInput").value;
  const minValue = document.getElementById("minInput").value;
  const secValue = document.getElementById("secInput").value;
  const ampmValue = document.getElementById("ampm").value;
  const alarmObj = {
    hour: hourValue,
    minute: minValue,
    second: secValue,
    ampm: ampmValue,
  };

  if (hourValue > 12 || minValue > 59 || secValue > 59) {
    alert("Please enter a valid time");

    document.getElementById("hrInput").value = "";
    document.getElementById("minInput").value = "";
    document.getElementById("secInput").value = "";
  } else if (isNaN(hourValue) || isNaN(minValue) || isNaN(secValue)) {
    alert("Please enter a valid time");

    document.getElementById("hrInput").value = "";
    document.getElementById("minInput").value = "";
    document.getElementById("secInput").value = "";
  } else {
    alarmJSON.push(alarmObj);
    const alarmList = document.getElementById("alarm-list");
    const alarmEl = document.createElement("li");
    alarmEl.classList.add("alarmEl");
    alarmEl.innerText =
      hourValue + ":" + minValue + ":" + secValue + " " + ampmValue;
    alarmList.prepend(alarmEl);

    const dismissBtn = document.createElement('button');
    dismissBtn.innerText = "Dismiss";
    dismissBtn.classList.add('btn')
    dismissBtn.id = "dismissbtn"

    const dltBtn = document.createElement("button");
    dltBtn.id = "dltBtn";
    dltBtn.classList.add("btn");
    dltBtn.innerText = "Delete";
    alarmEl.appendChild(dltBtn);
    const now1 = new Date();
    dltBtn.addEventListener("click", () => {
      alarmEl.remove();
    });

    const alarmSound = document.getElementById("audio");
    function dismissButton(){
      alarmSound.pause();
      dismissBtn.style.display = "none";
    }

    dismissBtn.addEventListener('click', ()=>{
      dismissButton();
    })

    function render() {
      const now1 = new Date();
      let h = Number(hourValue);
      if (ampmValue === "PM" && h < 12) {
        h += 12;
      }
      if (ampmValue === "AM" && h === 12) {
        h = 0;
      }

      const nowHours = Number(now1.getHours());
      const nowMinutes = Number(now1.getMinutes());
      const nowSeconds = Number(now1.getSeconds());

      if (
        h === nowHours &&
        Number(minValue) === nowMinutes &&
        Number(secValue) === nowSeconds
      ) {
        alarmEl.appendChild(dismissBtn);
        alarmSound.play();
        alarmSound.loop = true;
        clearInterval(alarmInterval); // Stop the interval once the alarm is triggered
      }
    }

    const alarmInterval = setInterval(render, 1000);

    document.getElementById("hrInput").value = "";
    document.getElementById("minInput").value = "";
    document.getElementById("secInput").value = "";
  }
});
