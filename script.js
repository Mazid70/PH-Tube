const loadBtn = async () => {
  const response = await fetch(
    "https://openapi.programming-hero.com/api/videos/categories"
  );
  const data = await response.json();
  const alldata = data.data;

  alldata.forEach((element) => {
    const button = document.createElement("button");
    button.innerHTML = `<button class="btn btn-active btn-ghost font-medium text-xl lg:px-5 text-[#252525B3]" onclick="loadAll(${element.category_id})">
   ${element.category}
  </button>`;
    const btnContainer = document.getElementById("btn-container");
    btnContainer.appendChild(button);
    button.addEventListener("click", function (e) {
      const allBtn = btnContainer.querySelectorAll("button");
      for (const btn of allBtn) {
        btn.classList.remove("bg-red-600");
      }
      button.classList.add("bg-red-600");
      button.classList.add("rounded-xl");
    });
  });
};

const loadAll = async (id) => {
  const hiddenSec = document.getElementById("hidden-sec");
  if (id === 1005) {
    hiddenSec.classList.remove("hidden");
  } else {
    hiddenSec.classList.add("hidden");
  }
  const response = await fetch(
    `https://openapi.programming-hero.com/api/videos/category/${id}`
  );

  const data = await response.json();
  const alldata = data.data;
  const gridSec = document.getElementById("grid-all");

  gridSec.innerHTML = "";
  alldata.forEach((item) => {
    let img = "";
    if (item.authors[0].verified) {
      img = `<img src="images/verfied.png">`;
    }
    const gridContainer = document.createElement("div");
    gridContainer.innerHTML = `<div class="h-[250px] lg:w-[400px]" >
      <img class="h-full w-full rounded-lg" src="${item.thumbnail}" alt="" />
    </div>
    <div class="flex gap-2 items-center mt-4">
      <div class="h-[40px] w-[40px] self-start">
        <img
          class="rounded-full h-full w-full"
          src="${item.authors[0].profile_picture}"
          alt=""
        />
      </div>
      <div class="space-y-1">
        <h2 class="font-bold text-base">
          ${item.title}
        </h2>
        <div class="flex gap-2">
        <h2 class="text-sm text-gray-500 font-medium">${item.authors[0].profile_name}</h2>
        ${img}</div>
        <h2 class="text-sm text-gray-500 font-medium">${item.others.views} views</h2>
      </div>
    </div>`;
    gridSec.appendChild(gridContainer);
  });
};
loadAll(1000);
loadBtn();
loadAll();
