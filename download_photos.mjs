import fs from 'fs';
import path from 'path';

const members = [
  { id: 'jerome-powell', name: 'Jerome Powell' },
  { id: 'philip-jefferson', name: 'Philip Jefferson' },
  { id: 'michael-barr', name: 'Michael Barr' },
  { id: 'michelle-bowman', name: 'Michelle Bowman' },
  { id: 'lisa-cook', name: 'Lisa D. Cook' },
  { id: 'adriana-kugler', name: 'Adriana Kugler' },
  { id: 'christopher-waller', name: 'Christopher Waller' },
  { id: 'john-williams', name: 'John C. Williams' },
  { id: 'austan-goolsbee', name: 'Austan Goolsbee' },
  { id: 'neel-kashkari', name: 'Neel Kashkari' },
  { id: 'susan-collins', name: 'Susan M. Collins' },
  { id: 'anna-paulson', name: 'Anna Paulson' },
  { id: 'beth-hammack', name: 'Beth Hammack' },
  { id: 'thomas-barkin', name: 'Thomas Barkin (banker)' },
  { id: 'alberto-musalem', name: 'Alberto Musalem' },
  { id: 'jeffrey-schmid', name: 'Jeffrey Schmid' },
  { id: 'lorie-logan', name: 'Lorie Logan' },
  { id: 'mary-daly', name: 'Mary C. Daly' }
];

const dir = path.join(process.cwd(), 'public', 'images', 'members');
if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir, { recursive: true });
}

async function run() {
  for (const m of members) {
    console.log(`Processing ${m.name}...`);
    const searchName = encodeURIComponent(m.name);
    try {
      const res = await fetch(`https://en.wikipedia.org/w/api.php?action=query&titles=${searchName}&prop=pageimages&format=json&pithumbsize=300`, {
        headers: { 'User-Agent': 'FedTrackerApp/1.0 (contact@example.com)' }
      });
      const data = await res.json();
      const pages = data.query.pages;
      const pageId = Object.keys(pages)[0];
      if (pageId !== '-1' && pages[pageId].thumbnail) {
        let imgUrl = pages[pageId].thumbnail.source;
        // some images have strange paths, use standard https fetch
        const imgRes = await fetch(imgUrl, { headers: { 'User-Agent': 'FedTrackerApp/1.0' } });
        const buf = await imgRes.arrayBuffer();
        fs.writeFileSync(path.join(dir, `${m.id}.jpg`), Buffer.from(buf));
        console.log(`  Saved ${m.id}.jpg (${buf.byteLength} bytes)`);
      } else {
        console.log(`  No photo found for ${m.name}`);
      }
    } catch (e) {
      console.log(`  Failed fetching API for ${m.name}`, e);
    }
  }
}

run();
