const categoryLoad = () =>{
    fetch('https://openapi.programming-hero.com/api/news/categories')
    .then(res => res.json())
    .then(data => displayCategory(data.data.news_category))
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
    const url = `https://openapi.programming-hero.com/api/news/category/0${category_id}`
    console.log(url);
    const res = await fetch(url);
    const data = await res.json();
    displayNews(data.data);
}
const displayNews = (newses) =>{
    const newsContainer = document.getElementById('news-container');
    newsContainer.textContent = ``;
    newses.forEach(news => {
        const newsCard = document.createElement('div');
        newsCard.classList.add('card');
        newsCard.classList.add('mb-3');
        newsCard.innerHTML =`
            <div class="row g-0">
                <div class="col-md-4">
                    <img src="${news.image_url}" class="img-thumbnail rounded-start">
                </div>
                <div class="col-md-8">
                    <div class="card-body">
                        <h5 class="card-title">${news.title}</h5>
                        <p class="card-text">${news.details}</p>
                        
                        <div class="row">
                            <div class="col d-flex">
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
                                <button class="btn"><i class="fa-solid fa-arrow-right"></i></button>
                            </div>
                        </div>
                        
                    </div>
                </div>
                    
            </div>
        `
        newsContainer.appendChild(newsCard);

    });
}
categoryLoad();