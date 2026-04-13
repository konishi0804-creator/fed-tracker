"use client";

import { useEffect, useState } from "react";
import styles from "./CalendarWeek.module.css";

interface Event {
  id?: string;
  date: string;
  speaker: string;
  event?: string;
  title?: string;
  location?: string;
}

export default function CalendarWeek() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCalendar() {
      try {
        const res = await fetch("/api/calendar");
        const data = await res.json();
        if (data.events) {
          setEvents(data.events);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchCalendar();
  }, []);

  if (loading) {
    return <div className={styles.loading}>Loading schedule...</div>;
  }

  if (events.length === 0) {
    return <div className={styles.empty}>No scheduled events found for this week.</div>;
  }

  return (
    <div className={styles.list}>
      {events.map((ev, i) => {
        const dateObj = new Date(ev.date);
        const day = dateObj.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" });
        const time = dateObj.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" });

        return (
          <div key={ev.id || i} className={styles.eventItem}>
            <div className={styles.dateBlock}>
              <span className={styles.day}>{day}</span>
              {time !== "12:00 AM" && <span className={styles.time}>{time}</span>}
            </div>
            <div className={styles.details}>
              <h4 className={styles.speaker}>{ev.speaker}</h4>
              <p className={styles.title}>{ev.title || ev.event}</p>
              {ev.location && <p className={styles.location}>{ev.location}</p>}
            </div>
          </div>
        );
      })}
    </div>
  );
}
