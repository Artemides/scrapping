const puppeteer = require("puppeteer");
const { Cluster } = require("puppeteer-cluster");


class ScrapService{

    async Scrap(){
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.goto("https://slides.com/explore");
        let slides = [];
        const titleCards = await (
            await page
        ).evaluate(() => {
            let total=0;
            return Array.from(document.querySelectorAll(".carousel li")).map((e) => {
                let slide = {};
                slide.url = e.querySelector("a").href;
                return slide;
            
            });
        });
        const cluster = await Cluster.launch({
            concurrency: Cluster.CONCURRENCY_BROWSER,
            maxConcurrency: 8,
        });
        await cluster.task(async ({ page, data: url }) => {
            await page.goto(url,{
                waitUntil: "networkidle2"
            });
            const details = await page.evaluate(
            () => {
            let detail = {};
            detail.title = document.querySelector(".deck-card-body .title").innerText;
            detail.description = document.querySelector(
                ".deck-card-body .description"
            ).innerText;
            detail.pulishedAt = document.querySelector(
                ".deck-card-body .deck-meta li:nth-child(1) time"
            ).innerText;
            detail.likes = document.querySelector(
                ".deck-card-body .deck-meta li:nth-child(2) .value"
            ).getAttribute('data-kudos-value');
            detail.visit = document.querySelector(
                ".deck-card-body .deck-meta li:nth-child(3) .value"
            ).innerText;
            detail.author =document.querySelector('.deck-card-body .user-info .username').innerText;
            return detail;
            }).catch(err=>console.log(err));
            details.url=url;
            slides.push(details);
        }
        );
        let total=0;
        for (let i = 0; i < titleCards.length; i++) {
        //    if(total==10){
        //         break;
        //    }
           cluster.queue(titleCards[i].url);
           total++;

        }
        await cluster.idle();
        await cluster.close();
        await browser.close();
        return slides;
    }
}

module.exports=ScrapService;