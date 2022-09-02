const categoryLoad = () =>{
    fetch('https://openapi.programming-hero.com/api/news/categories')
    .then(res => res.json())
    .then(data => displayCategory(data.data.news_category))
    .catch(error => console.log(error))
}
const displayCategory = (categories) =>{
    const categorySection= document.getElementById('category');
    categories.forEach(category => {
        const categoryDiv = document.createElement('div');
        categoryDiv.classList.add('col');
        categoryDiv.innerHTML=`
            <button type="button" class="btn" onclick="loadNews(${category.category_id})">${category.category_name}</button>
        `
        categorySection.appendChild(categoryDiv)
    });
}

// Load News
const loadNews = async(category_id) =>{
    console.log(category_id);
    toggleSpinner(true);
    const url = `https://openapi.programming-hero.com/api/news/category/0${category_id}`
    console.log(url);
    try {
        const res = await fetch(url);
        const data = await res.json();
        displayNews(data.data);
    } catch (error) {
        console.log(error);
    }
    
}
const displayNews = (newses) =>{
    const newsAmount = document.getElementById('news-amount');
    newsAmount.classList.remove('d-none');
    if ( newses.length > 0 ) {
        newsAmount.innerText=`${newses.length} news found`;
    } else {
        newsAmount.innerText=`0 news found`;
    }

    // sort based on total_view
    const sortNewses = newses.sort((a,b)=>b.total_view - a.total_view);
    console.log("sorted: ",sortNewses);
    
    const newsContainer = document.getElementById('news-container');
    newsContainer.textContent = ``;
    sortNewses.forEach(news => {
        const newsCard = document.createElement('div');
        newsCard.classList.add('card');
        newsCard.classList.add('mb-3');
        newsCard.innerHTML =`
            <div class="row g-0">
                <div class="col-md-2">
                    <img src="${news.thumbnail_url}" class="img-thumbnail rounded-start">
                </div>
                <div class="col-md-10">
                    <div class="card-body">
                        <h5 class="card-title">${news.title}</h5>
                        <p class="card-text">${news.details.slice(0,200)}...</p>
                        
                        <div class="row align-items-center">
                            <div class="col d-flex align-items-center">
                                <div class="me-1">
                                    <img src="${news.author.img}" class="rounded" width="25px" height="25px">
                                </div>
                                
                                <div>
                                    <p class="card-text me-2"><small class="text-muted">${news.author.name ? news.author.name : "Name Not Found"}</small></p>
                                </div>
                            </div>
                            <div class="col">
                                <p class="card-text me-2"><small class="text-muted"><i class="fa-solid fa-eye"></i> ${news.total_view ? news.total_view : '0'}</small></p>
                            </div>
                            <div class="col text-center">
                                <button class="btn" onclick="loadNewsDetails('${news._id}')" data-bs-toggle="modal" data-bs-target="#newsModal"><i class="fa-solid fa-arrow-right"></i></button>
                                
                            </div>
                        </div>
                        
                    </div>
                </div>
                    
            </div>
        `
        newsContainer.appendChild(newsCard);

    });
    toggleSpinner(false);
}

// loader function
const toggleSpinner = isloading => {
    const loader = document.getElementById('loader');
    if (isloading) {
        loader.classList.remove('d-none');
    } else {
        loader.classList.add('d-none');
    }
}

// Modal
const loadNewsDetails = async(news_id) =>{
    console.log(news_id);
    const url = `https://openapi.programming-hero.com/api/news/${news_id}`
    console.log(url);
    try {
        const res = await fetch(url);
        const data = await res.json();
        displayNewsDetails(data.data[0]);
    } catch (error) {
        console.log(error);
    }
    
}
const displayNewsDetails = (news) =>{
    const modalTitle= document.getElementById('newsModalLabel');
    modalTitle.innerText = news.title;
    const modalDetails = document.getElementById('modal-details');
    modalDetails.innerHTML = `
    <p>${news.details}</p>
    `
}

categoryLoad();