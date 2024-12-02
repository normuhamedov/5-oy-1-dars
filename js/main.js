let elCountryList = document.querySelector(".list")
let elSelect = document.querySelector(".country-select")
let elSearchInput = document.querySelector(".search-input")

function renderCountries(arr, list) {
    list.innerHTML = null
    arr.map(item => {
        let elCountryItem = document.createElement("li")
        elCountryItem.className = "w-[264px] rounded-md overflow-hidden bg-slate-300"
        elCountryItem.innerHTML = `
        <img class="w-full h-[160px] object-cover" src=${item.flag} alt="" width="100" height="160" />
        <div class="p-5">
            <h2 class="font-bold mb-2 text-[22px]">${item.name}</h2>
            <p class="mb-2">Population: ${item.population}</p>
            <p class="mb-2">Capital: ${item.capital}</p>
        </div>
        <div class="flex items-center justify-between p-2">
            <button class="w-[45px] h-[45px] border-[2px] border-black rounded-full flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="black">
                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                </svg>
            </button>
            <button class="w-[45px] h-[45px] border-[2px] border-black rounded-full flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="black">
                    <path d="M6 2c-1.1 0-2 .9-2 2v18l8-3.5 8 3.5V4c0-1.1-.9-2-2-2H6zm0 2h12v15.97l-6-2.63-6 2.63V4z"/>
                  </svg>
            </button>
            <button class="w-[45px] h-[45px] border-[2px] border-black rounded-full flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="black">
                    <circle cx="6" cy="12" r="2"/>
                    <circle cx="12" cy="12" r="2"/>
                    <circle cx="18" cy="12" r="2"/>
                </svg>
            </button>
        </div>
        `
        list.append(elCountryItem)
    })
}

renderCountries(countrys, elCountryList)

// Select Part start
function renderSelectOption(arr, list) {
    arr.forEach(item => {
        let elOption = document.createElement("option")
        elOption.textContent = item.capital
        elOption.value = item.capital.toLowerCase()
        list.append(elOption)
    })
}

renderSelectOption(countrys, elSelect)

elSelect.addEventListener("change", function(evt) {
    if (evt.target.value === "all") {
        renderCountries(countrys, elCountryList)
    } else {
        const result = countrys.filter(item => item.capital.toLowerCase() === evt.target.value)
        renderCountries(result, elCountryList)
    }
})
// Select Part end

// Search Part start
elSearchInput.addEventListener("input", function(e) {
    const value = e.target.value.toLowerCase()
    const searchedList = countrys.filter(item => item.name.toLowerCase().includes(value))
    renderCountries(searchedList, elCountryList)
})
// Search Part end
