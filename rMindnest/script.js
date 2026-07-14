const timer = document.querySelector("#timer");
const startBtn = document.querySelector("#startBtn");
const pauseBtn = document.querySelector("#pauseBtn");
const resetBtn = document.querySelector("#resetBtn");

let min = 25;
let sec = 0;

let intervalId = null;

function format(value) {
  return String(value).padStart(2, "0");
}

function updateDisplay() {
  timer.textContent = `${format(min)}:${format(sec)}`;
}

function startTimer() {
  if (intervalId !== null) return;

  intervalId = setInterval(() => {
    if (sec === 0) {
      if (min === 0) {
        pauseTimer();
        return;
      }
      min--;
      sec = 59;
    } else {
      sec--;
    }

    updateDisplay();
  }, 1000);
}

function pauseTimer() {
  clearInterval(intervalId);
  intervalId = null;
}

function resetTimer() {
  pauseTimer();

  min = 25;
  sec = 0;

  updateDisplay();
}

startBtn.addEventListener("click", startTimer);
pauseBtn.addEventListener("click", pauseTimer);
resetBtn.addEventListener("click", resetTimer);

const themeToggleBtn = document.getElementById("themeToggleBtn");
const bodyEl = document.body;
const THEME_KEY = "mindnestTheme";

function applyTheme(theme) {
  const mode = theme === "dark" ? "dark" : "light";
  bodyEl.classList.remove("light", "dark");
  bodyEl.classList.add(mode);
  if (themeToggleBtn) {
    themeToggleBtn.textContent = mode === "dark" ? "Light" : "Dark";
  }
  localStorage.setItem(THEME_KEY, mode);
}

function loadTheme() {
  const savedTheme = localStorage.getItem(THEME_KEY);
  if (savedTheme === "dark" || savedTheme === "light") {
    applyTheme(savedTheme);
  } else {
    const prefersDark = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
    applyTheme(prefersDark ? "dark" : "light");
  }
}

if (themeToggleBtn) {
  themeToggleBtn.addEventListener("click", function () {
    const currentTheme = bodyEl.classList.contains("dark") ? "dark" : "light";
    applyTheme(currentTheme === "dark" ? "light" : "dark");
  });
}

loadTheme();

updateDisplay();

const quote = document.querySelector("#quote");
const author = document.querySelector("#author");
const button = document.querySelector("#newQuoteBtn");

async function getQuote() {
  try {
    const response = await fetch("https://dummyjson.com/quotes/random");
    const data = await response.json();
    quote.textContent = `"${data.quote}"`;
    author.textContent = `— ${data.author}`;
  } catch (error) {
    quote.textContent = "Unable to load quote.";
    author.textContent = "";
    console.log(error);
  }
}

button.addEventListener("click", getQuote);

getQuote();

const SearchBox = document.querySelector(".search input");
const SearchBtn = document.querySelector(".search button");
const Clouds = document.querySelector(".weather-icon");
const temperature = document.querySelector(".temp");
const humidity = document.querySelector(".humidity h3");
const windspeed = document.querySelector(".windspeed h3");
const city = document.querySelector(".city");
const weatherIcon = document.querySelector(".weather-icon img");
const errorbox = document.querySelector(".error");
const weatherBox = document.querySelector(".weather");
const bigWeatherBox = document.querySelector(".big-weather");
const apiKey = "5da1e515f05fe93353049a6ee0d22f07";
const apiUrl =
  "https://api.openweathermap.org/data/2.5/weather?&units=metric&q=";

async function checkWeather(cityName = "Bhopal") {
  const response = await fetch(
    `${apiUrl}${encodeURIComponent(cityName)}&appid=${apiKey}`,
  );
  const data = await response.json();

  if (!response.ok || data.cod === "404") {
    errorbox.style.display = "block";
    bigWeatherBox.style.display = "none";
    return;
  }

  errorbox.style.display = "none";
  bigWeatherBox.style.display = "block";

  if (data.weather[0].main == "Clouds") {
    weatherIcon.src = "images/clouds.png";
  } else if (data.weather[0].main == "Clear") {
    weatherIcon.src = "images/clear.png";
  } else if (data.weather[0].main == "Drizzle") {
    weatherIcon.src = "images/drizzle.png";
  } else if (data.weather[0].main == "Mist") {
    weatherIcon.src = "images/mist.png";
  } else if (data.weather[0].main == "Rain") {
    weatherIcon.src = "images/rain.png";
  } else if (data.weather[0].main == "Snow") {
    weatherIcon.src = "images/snow.png";
  }

  humidity.innerHTML = data.main.humidity + " %";
  windspeed.innerHTML = data.wind.speed + " km/h";
  temperature.innerHTML = data.main.temp + "°C";
  city.innerHTML = data.name;
}

SearchBtn.addEventListener("click", function () {
  const cityName = SearchBox.value.trim() || "Bhopal";
  checkWeather(cityName);
});

checkWeather("Bhopal");

// SearchBox.addEventListener('input',function(event){
//     city = SearchBox.innerHTML = event.target.value
//     console.log(city)
// })
let period;
const dayName = document.getElementById("dayName");
const fullDate = document.getElementById("fullDate");
const currentTime = document.getElementById("currentTime");
const ampm = document.getElementById("ampm");
const dateCard = document.getElementById("dateCard");

function updateDateTime() {
  const now = new Date();

  // days

  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  // current date months

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  // current date code

  dayName.textContent = days[now.getDay()];

  fullDate.textContent = `${now.getDate()} ${months[now.getMonth()]} ${now.getFullYear()}`;

  // current time code

  let hours = now.getHours();
  let minutes = now.getMinutes();
  let seconds = now.getSeconds();

  period = hours >= 12 ? "PM" : "AM";

  hours = hours % 12;
  hours = hours || 12;

  hours = String(hours).padStart(2, "0");
  minutes = String(minutes).padStart(2, "0");
  seconds = String(seconds).padStart(2, "0");

  currentTime.textContent = `${hours}:${minutes}:${seconds}`;

  ampm.textContent = period;

  // background property

  const currentHour = now.getHours();

  let background = "";

  if (currentHour >= 5 && currentHour < 12) {
    background = "linear-gradient(135deg,#FDB813,#FF7E5F)";
  } else if (currentHour >= 12 && currentHour < 17) {
    background = "linear-gradient(135deg,#36D1DC,#5B86E5)";
  } else if (currentHour >= 17 && currentHour < 20) {
    background = "linear-gradient(135deg,#ff9966,#ff5e62)";
  } else {
    background = "linear-gradient(135deg,#141E30,#243B55)";
  }

  dateCard.style.background = background;
}

updateDateTime();

setInterval(updateDateTime, 1000);

// important divs
let registerdiv = document.querySelector(".register");
let logindiv = document.querySelector(".login");
let rhere = document.querySelector(".rhere");
let lhere = document.querySelector(".lhere");
let currentHour = new Date().getHours();
console.log(currentHour);

//  register form handling

function loadFromStorage(key) {
  const item = localStorage.getItem(key);
  if (!item) return [];
  try {
    return JSON.parse(item);
  } catch (error) {
    console.warn(`Failed to parse ${key} from localStorage:`, error);
    return [];
  }
}

function saveLocalStorage() {
  localStorage.setItem("usersArr", JSON.stringify(usersArr));
  localStorage.setItem("usergoalsArr", JSON.stringify(usergoalsArr));
  localStorage.setItem("usertasksArr", JSON.stringify(usertasksArr));
  localStorage.setItem("usersdayplanArr", JSON.stringify(usersdayplanArr));
}

let usersArr = loadFromStorage("usersArr");
let usergoalsArr = loadFromStorage("usergoalsArr");
let usertasksArr = loadFromStorage("usertasksArr");
let usersdayplanArr = loadFromStorage("usersdayplanArr");

rhere.addEventListener("click", function () {
  registerdiv.style.display = "flex";
  logindiv.style.display = "none";
  rform.reset();
  loginform.reset();
});

lhere.addEventListener("click", function () {
  registerdiv.style.display = "none";
  logindiv.style.display = "flex";
  rform.reset();
  loginform.reset();
});

let rform = document.querySelector(".registerform");

rform.addEventListener("submit", function (e) {
  e.preventDefault();

  let username = e.target[0].value;
  let password = e.target[1].value;

  if ((username.trim().length || password.trim().length) < 3) {
    alert("no field should be empty");
    return;
  } else {
    let existinguser = usersArr.find(function (elem) {
      return elem.username === username;
    });

    if (existinguser) {
      alert("username already taken");
      return;
    } else {
      let newuser = {
        id: Date.now(),
        username,
        password,
      };

      usersArr.push(newuser);
      saveLocalStorage();
      alert("user created successfully now login");
      console.log(usersArr);
      rform.reset();
      registerdiv.style.display = "none";
      logindiv.style.display = "flex";
    }
  }
});

let loginform = document.querySelector(".loginform");
let nav = document.querySelector(".nav");
// let dashboard = document.querySelector(".dashboard")
let dashboard = document.querySelector(".dashboard");
let dvideoo = document.querySelector(".dvideo");
let nvideoo = document.querySelector(".nvideo");

dashboard.addEventListener("mouseenter", function () {
  // nightscene
  if (
    (currentHour >= 17 && period === "PM") ||
    (currentHour < 7 && period === "AM")
  ) {
    console.log("mouse entered");
    dvideoo.style.display = "none";
    nvideoo.style.display = "block";
    dashboard.style.backgroundImage = "none";
  } else {
    dvideoo.style.display = "block";
    nvideoo.style.display = "none";
    dashboard.style.backgroundImage = "none";
  }
});

dashboard.addEventListener("mouseleave", function () {
  console.log("mouse leaved");
  if (
    (currentHour >= 17 && period === "PM") ||
    (currentHour < 7 && period === "AM")
  ) {
    nvideoo.style.display = "none";
    dashboard.style.backgroundImage = "url('./assets/moon.jpg')";
  } else {
    dvideoo.style.display = "none";
    dashboard.style.backgroundImage = "url('./assets/sunriseday.png')";
  }
});

loginform.addEventListener("submit", function (e) {
  e.preventDefault();

  let username = e.target[0].value.trim();
  let password = e.target[1].value.trim();
  let loggeduserId;

  if ((username.length || password.length) < 3) {
    alert("please enter the valid data");
  } else {
    let existinguser = usersArr.find(function (elem) {
      return elem.username === username;
    });

    if (existinguser) {
      let checkpass = existinguser.password;
      if (checkpass !== password) {
        alert("please enter the correct password");
        return;
      } else {
        alert("logged in successfully");
        nav.style.display = "flex";
        dashboard.style.display = "flex";
        logindiv.style.display = "none";
        loginform.reset();
        loggeduserId = existinguser.id;
       
        checkWeather("Bhopal");
      }
    } else if (!existinguser) {
      alert("user not found ");
      return;
    }
  }

  updateDateTime();

  let quotesbtn = document.querySelector(".qdiv");
  let goalsbtn = document.querySelector(".gldiv");
  let todobtn = document.querySelector(".tododiv");
  let dayplnbtn = document.querySelector(".dayplndiv");
  let promodorobtn = document.querySelector(".prmdrdiv");
  let closeall = document.querySelector(".close");

  let todopage = document.querySelector(".todos");
  let promopage = document.querySelector(".stimer");
  let quotespage = document.querySelector(".quotesdiv");
  let dayplanpage = document.querySelector(".dayplanner");
  let dailygoalpage = document.querySelector(".dailygoals");

  quotesbtn.addEventListener("click", function () {
    dashboard.style.display = "none";
    quotespage.style.display = "flex";
    closeall.style.display = "block";
  });

  let cardgoals = document.querySelector(".goalcards");

  function showgoals() {
    cardgoals.innerHTML = "";
    usergoalsArr.forEach(function (elem) {
      if (elem.id === loggeduserId) {
        cardgoals.innerHTML += ` <div class="gcards w-full rounded-l p-4 bg-blue-300 ">
               <h1>${elem.goal}</h1>
               <div class="btns flex mt-4 items-end gap-5">
                 <button onclick="gcedit(${elem.goalid})" class="edit  px-4 py-2 bg-yellow-400 text-sm">edit</button>
                 <button onclick="gcdlt(${elem.goalid})" class="dlete px-4 py-2 bg-red-500 text-sm">delete</button>
               </div>
             </div>`;
      }
    });
  }

  goalsbtn.addEventListener("click", function () {
    dashboard.style.display = "none";
    dailygoalpage.style.display = "flex";
    closeall.style.display = "block";
  });

  promodorobtn.addEventListener("click", function () {
    dashboard.style.display = "none";
    promopage.style.display = "flex";
    closeall.style.display = "block";
  });

  closeall.addEventListener("click", function () {
    promopage.style.display = "none";
    dayplanpage.style.display = "none";
    todopage.style.display = "none";
    dailygoalpage.style.display = "none";
    quotespage.style.display = "none";
    dashboard.style.display = "flex";
    closeall.style.display = "none";
  });


  let setgls = document.querySelector(".setgaols");
  let updgind = null;

  setgls.addEventListener("submit", function (e) {
    e.preventDefault();

    let goaldata = e.target[0].value.trim();

    if (goaldata.length === 0) {
      alert("please insert text");
      return;
    } else {
      let goal = {
        id: loggeduserId,
        goalid: Date.now(),
        goal: goaldata,
      };

      if (updgind === null) {
        usergoalsArr.push(goal);
        console.log(usergoalsArr);
        saveLocalStorage();
        showgoals();
      } else if (updgind !== null) {
        usergoalsArr.splice(updgind, 1, goal);
        saveLocalStorage();
        showgoals();
      }
    }
    setgls.reset();

    let gtext = document.querySelector(".gdata");

    gcedit = function (goalid) {
      let updobj = usergoalsArr.find(function (elem) {
        return goalid === elem.goalid;
      });

      updgind = usergoalsArr.findIndex(function (elem) {
        return elem.goalid === goalid;
      });

      gtext.value = updobj.goal;
      showgoals()
    };

    gcdlt = function (goalid) {
      usergoalsArr = usergoalsArr.filter(function (elem) {
        return elem.goalid !== goalid;
      });

      saveLocalStorage();
      showgoals();
    };
  });

  // todo = usertaskarr

  let todoform = document.querySelector(".taskcont");
  let taskCards = document.querySelector(".taskcards");
  let todoind = null;
  let taskdata;
  let taskCat;
  let todoSubmitListenerAdded = false;

  todobtn.addEventListener("click", function () {
    dashboard.style.display = "none";
    todopage.style.display = "flex";
    closeall.style.display = "block";

    showuserTask = function () {
      taskCards.innerHTML = "";
      usertasksArr.forEach(function (elem) {
        if (elem.id === loggeduserId) {
          taskCards.innerHTML += `<div
                class="tcard relative p-4 items-center rounded-xl bg-pink-300 w-[80%]"
              >
                <h2 class="w-[80%]">
                  ${elem.task}
                </h2>
                <div class="btns w-[20%] items-center flex mt-5 gap-4">
                  <div
                    class="timpbtn text-white w-[80%] text-sm flex items-center justify-center p-1 ${elem.tcat === "Argent" ? "bg-red-700" : "bg-green-700"} rounded-l"
                  >
                    ${elem.tcat}
                  </div>
                  <button onclick="edtask(${elem.tid})" class="editask text-sm bg-yellow-300 rounded-l p-1">
                    Edit
                  </button>
                  <button onclick="dltask(${elem.tid})"
                    class="dltask text-sm bg-red-600 rounded-l p-1 text-white"
                  >
                    Delete
                  </button>
                  <button onclick="tcmp(${elem.tid})"
                    class="competed p-2 text-sm ${elem.tcmp > 0 ? "bg-green-600" : "bg-yellow-600"} p-1 w-[80%] rounded-l"
                  >
                    ${elem.tcmp > 0 ? "completed" : "incomplete"}
                  </button>
                </div>
              </div>`;
        }
      });
    };
    showuserTask();

    todoform.addEventListener("submit", function (e) {
      e.preventDefault();

      if (!loggeduserId) {
        alert("login to add task");
      } else {
        let newTask;

        taskdata = e.target[0].value.trim();
        taskCat = e.target[1].value.trim();

        if (taskdata.length === 0 || taskCat.length === 0) {
          alert("input should not be empty");
          return;
        } else {
          newTask = {
            id: loggeduserId,
            tid: Date.now(),
            task: taskdata,
            tcat: taskCat,
            tcmp: 0,
          };

          if (todoind === null) {
            usertasksArr.push(newTask);
            saveLocalStorage();
            showuserTask();
          } else if (todoind !== null) {
            usertasksArr.splice(todoind, 1, newTask);
            saveLocalStorage();
            showuserTask();
          }
        }
      }
      let togglee = 0;
      let taskin = document.querySelector(".taskdets");
      let svalue = document.querySelector(".cselect");
      edtask = function (tid) {
        todoind = usertasksArr.findIndex(function (elem) {
          return elem.tid === tid;
        });

        let todoobj = usertasksArr.filter(function (elem) {
          return elem.id === loggeduserId && elem.tid === tid;
        });

        //  e.target[0].value = todoobj.task
        //  e.target[0].value = todoobj.tcat
        // console.log(taskdata.input.value);
        // console.log(todoobj)
        // console.log(todoobj[todoind].task)

        taskin.value = todoobj[todoind].task;
        svalue.value = todoobj[todoind].tcat;
      };

      dltask = function (tid) {
        usertasksArr = usertasksArr.filter(function (elem) {
          return elem.tid != tid;
        });

        saveLocalStorage();
        showuserTask();
      };

      tcmp = function (tid) {
        let completedbtn = document.querySelector(".competed");
        let updtask = usertasksArr.filter(function (elem) {
          return elem.tid === tid;
        });

        let updind = usertasksArr.findIndex(function (elem) {
          return elem.tid === tid;
        });

        if (updtask[0].tcmp === 0) {
          newTask = {
            id: loggeduserId,
            tid: updtask[0].tid,
            task: updtask[0].task,
            tcat: updtask[0].tcat,
            tcmp: 1,
          };

          usertasksArr.splice(updind, 1, newTask);
          saveLocalStorage();
          showuserTask();
        } else {
          newTask = {
            id: loggeduserId,
            tid: updtask[0].tid,
            task: updtask[0].task,
            tcat: updtask[0].tcat,
            tcmp: 0,
          };

          usertasksArr.splice(updind, 1, newTask);
          saveLocalStorage();
          showuserTask();
        }
      };

      todoform.reset();
    });
  });

 
  dayplnbtn.addEventListener("click", function () {
    dashboard.style.display = "none";
    dayplanpage.style.display = "block";
    closeall.style.display = "block";
    let dayplandata = document.querySelector(".dplndata");

    dayplandata.innerHTML = "";

    let logusplan = usersdayplanArr.find(function (elem) {
      return elem.id === loggeduserId;
    });

    let newobj = {
      id: loggeduserId,
      daypln: [
        {
          time: "6-8 AM",
          task: "Morning Workout",
          completed: false,
        },
        {
          time: "8-10 AM",
          task: "Study React",
          completed: false,
        },
        {
          time: "10-12 AM",
          task: "",
          completed: false,
        },
        {
          time: "12-2 PM",
          task: "",
          completed: false,
        },
        {
          time: "2-4 PM",
          task: "",
          completed: false,
        },
        {
          time: "4-6 PM",
          task: "",
          completed: false,
        },
        {
          time: "6-8 PM",
          task: "",
          completed: false,
        },
        {
          time: "8-10 PM",
          task: "",
          completed: false,
        },
        {
          time: "10-12 PM",
          task: "",
          completed: false,
        },
        {
          time: "12-2 AM",
          task: "",
          completed: false,
        },
        {
          time: "2-4 AM",
          task: "",
          completed: false,
        },
        {
          time: "4-6 AM",
          task: "",
          completed: false,
        },
      ],
    };

    function rederdayplan() {
      dayplandata.innerHTML = "";
      let logusplan = usersdayplanArr.filter(function (elem) {
        return elem.id === loggeduserId;
      });
      console.log(logusplan[0].daypln);
      logusplan[0].daypln.forEach(function (elem, index) {
        dayplandata.innerHTML += `
                    <div class="p-2 w-full bg-orange-200 text-black rounded">
                      <h2>${elem.time}</h2>
                      <h4 class="task-text">${elem.task}</h4>
                      <button onclick="editTask(this,${index})" class="px-3 mt-3 py-1 bg-yellow-300">Edit</button>
                    </div>
              `;
      });
    }

    if (!logusplan) {
      usersdayplanArr.push(newobj);
      saveLocalStorage();
      rederdayplan()
      console.log(usersdayplanArr);
      rederdayplan();
    } else if (logusplan) {
      console.log(usersdayplanArr);
      saveLocalStorage();
      rederdayplan()
    }

   window.editTask = function(btn,index){

    let planner = usersdayplanArr.find(function(user){
        return user.id === loggeduserId;
    });

    let card = btn.parentElement;

    let h4 = card.querySelector(".task-text");

    if(btn.innerText==="Edit"){

        let value = h4.innerText;

        h4.outerHTML=`
            <input
                class="task-input border p-1 rounded"
                value="${value}">
        `;

        btn.innerText="Save";
    }

    else{

        let input = card.querySelector(".task-input");
        if (!input) return;

        let newValue=input.value;

        planner.daypln[index].task=newValue;
        saveLocalStorage();

        input.outerHTML=`
            <h4 class="task-text">
                ${newValue}
            </h4>
        `;

        btn.innerText="Edit";

    }

   }
  });


  let logout = document.querySelector(".Logoutt")

  logout.addEventListener("click",function(){
     dashboard.style.display = "none";
      promopage.style.display = "none";
    dayplanpage.style.display = "none";
    todopage.style.display = "none";
    dailygoalpage.style.display = "none";
    quotespage.style.display = "none";
    closeall.style.display = "none";
    registerdiv.style.display = "flex"
  })

  loginform.reset();
  // login form ending brackets
})


