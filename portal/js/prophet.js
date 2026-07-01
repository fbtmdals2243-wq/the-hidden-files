function showDailyProphet(){
    const newsList = getMinistryNews();

    app.innerHTML = `
        <section class="panel">

            <div class="seal">
                DAILY PROPHET
            </div>

            <h1>Daily Prophet</h1>

            <h2>Wizarding Britain</h2>

            <div class="case-list">

                ${newsList.map(news=>`

                    <button class="case-entry available"
                        onclick="openNews('${news.id}')">

                        <b>${news.category}</b>

                        <span>${news.title}</span>

                        <small>${news.status}</small>

                    </button>

                `).join("")}

            </div>

            <div class="center">
                <button class="btn" onclick="showDashboard()">
                    RETURN TO OFFICE
                </button>
            </div>

        </section>
    `;
}
function openNews(newsId){

    const news = getMinistryNews().find(item => item.id === newsId);
localStorage.setItem("newsRead_" + newsId, "true");
    if(!news){
        alert("Article not found.");
        return;
    }

    app.innerHTML = `
        <section class="panel">

            <div class="seal">
                DAILY PROPHET
            </div>

            <h1>${news.title}</h1>

            <h2>${news.category}</h2>

            ${renderMinistryDocument({

                seal:"DAILY PROPHET",

                title:news.title,

                subtitle:news.category,

                classification:"Public Release",

                department:"Daily Prophet Editorial Office",

                status:news.status,

                body:news.body,

                footer:"THE DAILY PROPHET"

            })}

            <div class="center">

                <button class="btn"

                    onclick="showDailyProphet()">

                    BACK TO NEWSPAPER

                </button>

            </div>

        </section>
    `;

}