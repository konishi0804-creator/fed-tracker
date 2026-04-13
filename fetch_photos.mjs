import * as cheerio from 'cheerio';

async function run() {
  const res = await fetch('https://www.federalreserve.gov/aboutthefed/bios/board/default.htm');
  const html = await res.text();
  const $ = cheerio.load(html);
  
  const members = [];
  $('img').each((i, el) => {
    const src = $(el).attr('src');
    const alt = $(el).attr('alt');
    if (src && alt) {
      members.push({ alt: alt.trim(), src: 'https://www.federalreserve.gov' + src });
    }
  });

  console.log(JSON.stringify(members, null, 2));
}

run();
