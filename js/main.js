let elCountryList = document.querySelector(".list");
let elSelect = document.querySelector(".country-select");
let elSearchInput = document.querySelector(".search-input");

// likes and save
let likeCounter = 0;
let saveCounter = 0;


const likeCountElement = document.querySelectorAll("header button")[0].querySelector("strong");
const saveCountElement = document.querySelectorAll("header button")[1].querySelector("strong");


const likeButtonHeader = document.querySelectorAll("header button")[0];
const saveButtonHeader = document.querySelectorAll("header button")[1];


let likedCountries = [];
let savedCountries = [];


function renderCountries(arr, list) {
    list.innerHTML = null;
    arr.forEach(item => {
        let elCountryItem = document.createElement("li");
        elCountryItem.className = "w-[264px] rounded-md overflow-hidden bg-slate-300";
        elCountryItem.innerHTML = `
        <img class="w-full h-[160px] object-cover" src=${item.flag} alt="" width="100" height="160" />
        <div class="p-5">
            <h2 class="font-bold mb-2 text-[22px]">${item.name}</h2>
            <p class="mb-2">Population: ${item.population}</p>
            <p class="mb-2">Capital: ${item.capital}</p>
        </div>
        <div class="flex items-center justify-between p-2">
            <button class="like-btn w-[45px] h-[45px] border-[2px] border-black rounded-full flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="black">
                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                </svg>
            </button>
            <button class="save-btn w-[45px] h-[45px] border-[2px] border-black rounded-full flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="black">
                    <path d="M6 2c-1.1 0-2 .9-2 2v18l8-3.5 8 3.5V4c0-1.1-.9-2-2-2H6zm0 2h12v15.97l-6-2.63-6 2.63V4z"/>
                </svg>
            </button>
            <button class="more-btn bg-blue-500 text-white px-3 py-2 rounded">More</button>
            <button class="delete-btn bg-red-500 text-white px-3 py-2 rounded">Delete</button>
        </div>
        `;
        list.append(elCountryItem);


        const likeBtn = elCountryItem.querySelector(".like-btn");
        const saveBtn = elCountryItem.querySelector(".save-btn");
        const moreBtn = elCountryItem.querySelector(".more-btn");
        const deleteBtn = elCountryItem.querySelector(".delete-btn");

        likeBtn.addEventListener("click", () => handleLike(item, likeBtn));
        saveBtn.addEventListener("click", () => handleSave(item, saveBtn));
        moreBtn.addEventListener("click", () => handleMore(item));
        deleteBtn.addEventListener("click", () => handleDelete(item.id));
        
    });
}


function handleMore(country) {
    const modal = document.createElement("div");
    modal.className = "fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center";
    modal.innerHTML = `
        <div class="bg-white p-5 rounded-lg w-[400px]">
            <button class="absolute top-3 right-3 bg-red-500 text-white px-4 py-2 rounded close-modal">Close</button>
            <img src="${country.flag}" alt="${country.name}" class="w-full h-[200px] object-cover rounded">
            <h2 class="text-[24px] font-bold mt-3">${country.name}</h2>
            <p><strong>Population:</strong> ${country.population}</p>
            <p><strong>Capital:</strong> ${country.capital}</p>
            <p><strong>Region:</strong> ${country.region}</p>
            <p><strong>Languages:</strong> ${Object.values(country.languages || {}).join(", ")}</p>
            <p><strong>Currencies:</strong> ${Object.values(country.currencies || {}).map(c => c.name).join(", ")}</p>
        </div>
    `;
    document.body.append(modal);

    // Close modal
    modal.querySelector(".close-modal").addEventListener("click", () => modal.remove());
}

// Handle like 
function handleLike(country, button) {
    if (!likedCountries.includes(country)) {
        likedCountries.push(country);
        likeCounter++;
        button.classList.add("bg-red-500");
    } else {
        likedCountries = likedCountries.filter(item => item !== country);
        likeCounter--;
        button.classList.remove("bg-red-500");
    }
    updateCounters();
}

function handleDelete(id) {
    const deleteIndex = countrys.findIndex(item => item.id == id);
    countrys.splice(deleteIndex, 1);
    renderCountries(countrys, elCountryList);
}
  

// Handle save 
function handleSave(country, button) {
    if (!savedCountries.includes(country)) {
        savedCountries.push(country);
        saveCounter++;
        button.classList.add("bg-red-500");
    } else {
        savedCountries = savedCountries.filter(item => item !== country);
        saveCounter--;
        button.classList.remove("bg-red-500");
    }
    updateCounters();
}

// Update count
function updateCounters() {
    likeCountElement.textContent = likeCounter;
    saveCountElement.textContent = saveCounter;
}

// liked countries
likeButtonHeader.addEventListener("click", () => displayList("Liked Countries", likedCountries));

// saved countries
saveButtonHeader.addEventListener("click", () => displayList("Saved Countries", savedCountries));

// liked saved list
function displayList(title, countries) {
    const modal = document.createElement("div");
    modal.className = "fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center";
    modal.innerHTML = `
        <div class="bg-white p-5 rounded-lg w-[400px]">
            <h2 class="text-[24px] font-bold mb-4">${title}</h2>
            <ul class="list-disc pl-5">
                ${countries.map(country => `<li>${country.name}</li>`).join("") || "<li>No items found</li>"}
            </ul>
            <button class="mt-5 bg-red-500 text-white px-4 py-2 rounded">Close</button>
        </div>
    `;
    document.body.append(modal);

    // Close modal
    modal.querySelector("button").addEventListener("click", () => modal.remove());
}

// select options
function renderSelectOption(arr, list) {
    arr.forEach(item => {
        let elOption = document.createElement("option");
        elOption.textContent = item.capital;
        elOption.value = item.capital.toLowerCase();
        list.append(elOption);
    });
}

elSelect.addEventListener("change", function (evt) {
    if (evt.target.value === "all") {
        renderCountries(countrys, elCountryList);
    } else {
        const result = countrys.filter(item => item.capital.toLowerCase() === evt.target.value);
        renderCountries(result, elCountryList);
    }
});


elSearchInput.addEventListener("input", function (e) {
    const value = e.target.value.toLowerCase();
    const searchedList = countrys.filter(item => item.name.toLowerCase().includes(value));
    renderCountries(searchedList, elCountryList);
});


renderCountries(countrys, elCountryList);
renderSelectOption(countrys, elSelect);
