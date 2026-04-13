import { NextResponse } from 'next/server';
import Parser from 'rss-parser';

export async function GET() {
  try {
    const parser = new Parser();
    const feed = await parser.parseURL('https://www.federalreserve.gov/feeds/speeches.xml');
    
    // We can also combine with Bloomberg/Reuters free RSS if available,
    // but the Fed speeches XML is the most direct free source.
    const news = feed.items.slice(0, 15).map((item) => ({
      title: item.title,
      link: item.link,
      pubDate: item.pubDate,
      summary: item.contentSnippet || item.content,
    }));

    return NextResponse.json({ news });
  } catch (error) {
    console.error('RSS Fetch Error:', error);
    return NextResponse.json({ error: 'Failed to retrieve news' }, { status: 500 });
  }
}
