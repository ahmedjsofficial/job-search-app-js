const cardGrid = document.querySelector(".card_grid");
const SearchInput = document.getElementById("SearchInput");
const FindJob = document.getElementById("FindJob");


FindJob.addEventListener("click", (event)=>{
    console.log("Button Clicked")
    event.preventDefault();
    const inputText = SearchInput.value;
    fetchJobs().then((jobs) => {
        let filterData = SearchJobs(jobs, inputText);
        showJobs(filterData);
    })
})



function fetchJobs() {
    return fetch("API.json").then(response => response.json()).then(data => {
        // console.log(data);
        return data;
    })
}

function SearchJobs(jobs, searchText) {
    // console.log(jobs)
    if(searchText){  // value => input value
        let searchedJobs = jobs.filter(value =>{
            if(value.roleName.toLowerCase().includes(searchText) || value.type.toLowerCase().includes(searchText) || value.company.toLowerCase().includes() || value.requirements.intro.toLowerCase().includes(searchText)){
                return true;
            } else {
                return false;
            }
        })
        return searchedJobs;
    } else {
        return jobs;
    }
}

function showJobs(jobs) {
    let jobsHTML = ""; 

    //+= for concatinating at line 22
    jobs.forEach(value => {
        
        jobsHTML += `                
            <div class="card">
                <div class="card_img">
                    <img src="${value.logo}" alt="joblogo/img" />
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                    </svg>
                </div>
                <div class="card_body">
                    <h1>${value.roleName}</h1>
                    <p>${value.requirements.intro}</p>
                </div>
                <div class="button-group">
                    <div class="button"><span>Apply Now</span></div>
                    <div class="button"><span>Message</span></div>
                </div>
            </div>
        `;
        cardGrid.innerHTML = jobsHTML;
    });
}
fetchJobs().then(data =>{
    showJobs(data);
})