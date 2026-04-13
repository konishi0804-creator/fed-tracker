"use client";

import { useEffect, useState } from "react";
import styles from "./StatementsTimeline.module.css";

interface NewsItem {
  title: string;
  link: string;
  pubDate: string;
  summary: string;
}

export default function StatementsTimeline() {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchNews() {
      try {
        const res = await fetch("/api/news");
        const data = await res.json();
        if (data.news) {
          setNews(data.news);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchNews();
  }, []);

  if (loading) return <div className={styles.loading}>Loading latest statements...</div>;
  if (!news.length) return <div className={styles.empty}>No recent statements found.</div>;

  return (
    <div className={styles.timeline}>
      {news.map((item, i) => {
        const dateObj = new Date(item.pubDate);
        return (
          <div key={i} className={styles.timelineItem}>
            <div className={styles.timelineDot}></div>
            <div className={styles.timelineContent}>
              <div className={styles.date}>
                {dateObj.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
              </div>
              <a href={item.link} target="_blank" rel="noopener noreferrer" className={styles.title}>
                {item.title}
              </a>
              <p className={styles.summary}>
                {item.summary.length > 150 ? item.summary.substring(0, 150) + '...' : item.summary}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
