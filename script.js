const container = document.querySelector(".container");
const newsContainer = document.querySelector(".news-container");
const spinner = document.querySelector(".spinner-border");
const Time = document.querySelector(".time");
const title = document.querySelector(".title");
const nav_link = document.querySelectorAll(".nav-link");
const date = document.querySelector(".date");
const currentDate = new Date();
date.innerHTML = `${currentDate.toDateString()}`;
setInterval(function () {
  const currentTimes = new Date();
  const currentTime = currentTimes.toLocaleTimeString();
  Time.innerHTML = currentTime;
});

nav_link.forEach((items) => {
  items.addEventListener("click", function () {
    const data = newsContainer.children;
    const arr = Array.from(data);
    arr.forEach(function (e) {
      e.remove();
    });
    const url = `https://api.nytimes.com/svc/topstories/v2/${items.id}.json?api-key=ovJLm6jpqzdyVXeupF9z2W1N0PorW64W`;
    async function get() {
      try {
        const data = await fetch(url);
        const request = await data.json();
        const result = request.results;
        result.forEach((item) => {
          newsFunction(url, item);
        });
      } catch (err) {
        console.log(err);
      }
    }
    get();
  });
});
//default page
const homeFunction = async () => {
  try {
    const url =
      "https://api.nytimes.com/svc/topstories/v2/home.json?api-key=ovJLm6jpqzdyVXeupF9z2W1N0PorW64W";
    const data = await fetch(url);
    const request = await data.json();
    const result = request.results;
    result.forEach((item) => {
      newsFunction(url, item);
    });
  } catch (err) {
    console.log(err);
  }
};
homeFunction();

const newsFunction = (url, item) => {
  let div = document.createElement("div");
  div.className = "container";
  let card = document.createElement("div");
  card.className = "card ";
  div.appendChild(card);

  let row = document.createElement("div");
  row.className = "row";
  card.appendChild(row);

  let col = document.createElement("div");
  col.className = "col-md-4";
  row.appendChild(col);

  if (item.multimedia) {
    let image = document.createElement("img");
    image.className = "img-fluid";
    image.setAttribute("src", item.multimedia[0].url);
    col.appendChild(image);
  } else {
    let image = document.createElement("img");
    image.className = "img-fluid";
    image.innerHTML = "Empty";
    // col.appendChild(image);
  }

  let col1 = document.createElement("div");
  col1.className = "col-md-8";
  row.appendChild(col1);

  let card_body = document.createElement("div");
  card_body.className = "card-body";
  col1.appendChild(card_body);

  let card_title = document.createElement("h2");
  card_title.className = "card-title";
  card_title.innerHTML = item.title;
  card_body.appendChild(card_title);

  let subtitle = document.createElement("h5");
  subtitle.className = "card-subtitle";
  subtitle.innerHTML = item.abstract;
  card_body.appendChild(subtitle);

  let date = document.createElement("strong");
  date.className = "card-text text-muted";
  date.innerHTML = `published_date: ${item.published_date}`;
  card_body.appendChild(date);

  let link = document.createElement("a");
  link.className = "card-link text-primary";
  link.href = item.url;
  link.target = "_blank";
  link.referrerPolicy = "no - referrer";
  link.innerHTML = "Read More";
  card_body.appendChild(link);

  newsContainer.appendChild(div);
};
