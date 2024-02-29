const btnContainer = document.getElementById ("btn-container");
const cardContainer = document.getElementById("card-container");
const errorEl = document.getElementById("error-element");
const sortBtn = document.getElementById("sort-btn");
let selectedCategory = 1000
let sortByView = false;

sortBtn.addEventListener("click", () => {
    sortByView = true;
    fetchDataByCategories(selectedCategory, sortByView)
})
const fetchCategories = async () => {
  const res = await fetch("https://openapi.programming-hero.com/api/videos/categories")
  const data = await res.json();
  const allData = data.data;
  allData.forEach(card => {
    // console.log(card);
    const newBtn = document.createElement("button");
    newBtn.classList = `btn btn-ghost category-btn bg-slate-700 text-white`
    newBtn.innerText = card.category;
    newBtn.addEventListener("click", () => {fetchDataByCategories(card.category_id)
    const allbtns = document.querySelectorAll(".category-btn")
    console.log(allbtns);
    for(const btn of allbtns){
        btn.classList.remove("bg-red-500");
    }
    newBtn.classList.add("bg-red-500");
    
  })
  
    btnContainer.appendChild(newBtn);
  })
}


const fetchDataByCategories = (categoryID, sortByView) => {
// console.log(categoryID);
// 
selectedCategory = categoryID;
fetch(`https://openapi.programming-hero.com/api/videos/category/${categoryID}`)
.then((res) => res.json())
.then(({data}) => {

    if(sortByView){
        data.sort((a, b) => {
const totalViewsStrFirst = a.others?.views;
const totalViewsStrSecond = b.others?.views;
const totalViewsFirstNumber = parseFloat(totalViewsStrFirst.replace("K", '')) || 0;
const totalViewsSecondNumber = parseFloat(totalViewsStrSecond.replace("K", '')) || 0;

return totalViewsSecondNumber - totalViewsFirstNumber;
        })
    }

    if(data.length === 0){
        errorEl.classList.remove("hidden");
    }
    else{
        errorEl.classList.add("hidden")
    }
    cardContainer.innerHTML = "";
    
    
    data.forEach(video => {
        let verifiedBadge = ""
        if(video.authors[0].verified){
verifiedBadge = `<img class="w-6 h-6" src="./images/verify.png" alt="">`
        }
        // console.log(video);
        const newCard = document.createElement("div");
        const timeInt = () => {
            const time = parseInt(video.others.posted_date) || 0;
            
            const hours = Math.floor(time / 3600)
const remainingSecondsAfterHours = time % 3600;


const minutes = Math.floor(remainingSecondsAfterHours / 60);


return `${hours} Hours ${minutes} Minutes ago`;
        }
        newCard.innerHTML = `
        <div class="card w-full bg-base-100 shadow-xl">
                <figure class="overflow-hidden h-72">
                    <img class="w-full" src="${video.thumbnail}"
                        alt="Shoes" />
                    <h6 class="absolute text-white bg-black px-2 text-xs py-1 rounded-lg bg-opacity-60  bottom-[40%] right-12">${timeInt()}</h6>
                </figure>
                <div class="card-body">
                    <div class="flex space-x-4 justify-start items-start">
                        <div>
                            <img class="w-12 h-12 rounded-full" src="${video.authors[0].profile_picture}" alt="">
                        </div>
                        <div>
                            <h2 class="card-title">${video.title}</h2>
                            <div class="flex mt-3">
                                <p class="">${video.authors[0].profile_name}</p>
                                ${verifiedBadge}
                            </div>
                            <p class="mt-3">${video.others.views}</p>
                        </div>

                    </div>
                </div>

            </div>
        `
        cardContainer.appendChild(newCard)
})
})
}
fetchCategories();
fetchDataByCategories(selectedCategory, sortByView)