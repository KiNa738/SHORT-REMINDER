const puppeteer = require('puppeteer')
require('dotenv').config()

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function run() {
    const browser = await puppeteer.launch({
         headless: true,
         executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe' // Windows
     });
     console.log("Loading Discord")
    const page = await browser.newPage()
    await page.goto('https://discord.com/login')
    await page.setViewport({ width: 1920, height: 1080 })
    console.log("Logging in")
    await page.evaluate((token) => {
        document.body.appendChild(document.createElement `iframe`).contentWindow.localStorage.token = `"${token}"`
    }, process.env.TOKEN);
    console.log("Sending message")
    await page.goto('https://discord.com/channels/685511190365208619/1002210564644282442')
    await sleep(5000);
    await page.keyboard.type("4'2 🤏", { delay: 100 })
    await page.keyboard.press('Enter')
    console.log("Message sent")
    await sleep(500);
    const date = new Date();
    const day = date.getDate();
    const month = date.getMonth()+1;
    const year = date.getFullYear();
    const current_date = `${day}-${month}-${year}`
    await page.screenshot({ path: `debug-${current_date}.png` });
    await browser.close();
}

run()
