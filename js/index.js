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
    console.log(data.data);
}

categoryLoad();