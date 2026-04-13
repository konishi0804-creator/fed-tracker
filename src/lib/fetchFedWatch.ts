import puppeteer from 'puppeteer';
import * as fs from 'fs';
import * as path from 'path';

async function main() {
  console.log('Starting Puppeteer...');
  
  // GitHub Actions環境などでも安定して動かすための引数
  // クロスオリジンiframeのDOMにアクセスするためセキュリティ制約を無効化
  const browser = await puppeteer.launch({
    args: [
      '--no-sandbox', 
      '--disable-setuid-sandbox', 
      '--disable-dev-shm-usage',
      '--disable-web-security',
      '--disable-features=IsolateOrigins,site-per-process'
    ]
  });

  const page = await browser.newPage();
  
  // ボット弾き対策のアドバンスド設定（汎用的なユーザーエージェント）
  await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36');
  await page.setViewport({ width: 1280, height: 800 });

  try {
    console.log('Navigating to CME FedWatch Tool...');
    // 元の指定URLへアクセスします
    await page.goto('https://www.cmegroup.com/ja/markets/interest-rates/cme-fedwatch-tool.html', { waitUntil: 'networkidle2' });

    console.log('Waiting for QuickStrike iframe to load...');
    await new Promise(r => setTimeout(r, 8000));

    // iframeを取得する
    const frame = page.frames().find(f => f.url().includes('countdown-to-fomc') || f.url().includes('quikstrike'));
    
    if (!frame) {
      console.log('Failed to find QuickStrike iframe on the page.');
      const text = await page.evaluate(() => document.body.innerText.substring(0, 300));
      console.log('Page text preview:', text.replace(/\n+/g, ' '));
      process.exit(1);
    }

    console.log(`Found iframe URL: ${frame.url()}`);

    // iframe要素内でタブをクリック
    const clicked = await frame.evaluate(() => {
      const elements = Array.from(document.querySelectorAll('a, button, span, .nav-link, li'));
      let probTab = elements.find(el => el.textContent?.trim().toLowerCase() === 'probabilities');
      if (!probTab) {
        probTab = elements.find(el => el.textContent?.includes('Probabilities'));
      }
      
      if (probTab) {
        (probTab as HTMLElement).click();
        return true;
      }
      return false;
    });

    if (clicked) {
      console.log('Clicked "Probabilities" tab. Waiting for table to render...');
      await new Promise(r => setTimeout(r, 4000));
    } else {
      console.log('Could not find "Probabilities" tab in iframe, attempting to find any tables...');
    }

    // iframeのコンテキストでテーブルデータを抽出
    const data = await frame.evaluate(() => {
      const tables = Array.from(document.querySelectorAll('table'));
      
      // MEETING DATEという文言を含むテーブルを探す
      const probTable = tables.find(t => {
        const text = t.textContent || '';
        return text.includes('MEETING DATE') || text.includes('225-250');
      });
      
      if (!probTable) return null;

      const rows = Array.from(probTable.querySelectorAll('tr'));
      const result: Record<string, string>[] = [];
      let headers: string[] = [];

      rows.forEach((row, rowIndex) => {
        const cells = Array.from(row.querySelectorAll('th, td')).map(c => c.textContent?.trim() || '');
        
        // ヘッダー行を特定する（"MEETING DATE" または空白セルから始まり、レートが並ぶ行）
        if (rowIndex === 0 || cells.includes('MEETING DATE')) {
          headers = cells.map(h => h.replace(/\n/g, '').trim());
          // CMEのテーブル構造上、最初のセルが空白になっている場合がある
          if (!headers[0]) headers[0] = 'MEETING DATE';
        } 
        // データ行（日付っぽい文字列で始まる行）
        else if (cells.length > 0 && cells[0].match(/^\d{1,4}\/\d{1,2}\/\d{1,2}$/)) {
          const rowData: Record<string, string> = {};
          cells.forEach((cell, i) => {
            const key = headers[i] || `Col_${i}`;
            rowData[key] = cell;
          });
          result.push(rowData);
        }
      });

      return { headers, rows: result };
    });

    if (data && data.rows.length > 0) {
      console.log(`Successfully extracted probabilities: ${data.rows.length} rows.`);
      
      const outPath = path.join(process.cwd(), 'src', 'data', 'fedwatch.json');
      const dir = path.dirname(outPath);
      if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

      // メタデータとして取得日時も付与
      const outData = {
        updatedAt: new Date().toISOString(),
        ...data
      };

      fs.writeFileSync(outPath, JSON.stringify(outData, null, 2));
      console.log(`Saved results to ${outPath}`);
    } else {
      console.log('Failed: "Probabilities" table could not be found or extracted. The DOM structure may have changed.');
      
      // デバッグ: 失敗時のスクリーンショットを保存
      const debugImgPath = path.join(process.cwd(), 'debug_screenshot.png');
      await page.screenshot({ path: debugImgPath, fullPage: true });
      console.log(`Debug screenshot saved to ${debugImgPath}`);

      // デバッグ: iframe内のテキスト構造を出力
      const debugText = await frame.evaluate(() => document.body.innerText.substring(0, 1000));
      console.log('--- IFRAME TEXT PREVIEW ---');
      console.log(debugText.replace(/\n+/g, ' | '));
      console.log('---------------------------');
    }

  } catch (error) {
    console.error('Error during scraping:', error);
    process.exit(1);
  } finally {
    await browser.close();
  }
}

main();
