import styles from "./page.module.css";
import MembersDirectory from "../components/MembersDirectory";
import CalendarWeek from "../components/CalendarWeek";
import StanceMatrix from "../components/StanceMatrix";
import StatementsTimeline from "../components/StatementsTimeline";
import FedWatchTable from "../components/FedWatchTable";

// SVG Icons
const UsersIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M22 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg>
);

const ActivityIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12" /></svg>
);

const CalendarIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="4" rx="2" ry="2" /><line x1="16" x2="16" y1="2" y2="6" /><line x1="8" x2="8" y1="2" y2="6" /><line x1="3" x2="21" y1="10" y2="10" /></svg>
);

const MicIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" /><path d="M19 10v2a7 7 0 0 1-14 0v-2" /><line x1="12" x2="12" y1="19" y2="22" /></svg>
);

export default function Home() {
  return (
    <main className={styles.container}>
      <header className={`${styles.header} animate-fade-in`}>
        <h1 className={styles.title}>Fed Tracker</h1>
        <p className={styles.subtitle}>
          Real-time tracking of Federal Reserve members, their speeches, and monetary policy stances.
        </p>
      </header>

      <div className={styles.grid}>
        {/* CME FedWatch Tool */}
        <section className={`${styles.card} animate-fade-in`} style={{ gridColumn: '1 / -1', minHeight: '300px' }}>
          <div className="glass-panel" style={{ height: '100%', padding: '0', overflow: 'hidden' }}>
            <FedWatchTable />
          </div>
        </section>

        {/* Top Row: Matrix (Left 8) + Schedule (Right 4) */}
        <section className={`${styles.card} ${styles.matrixArea} animate-fade-in`} style={{ animationDelay: '0.1s' }}>
          <h2 className={styles.sectionTitle}>
            <div className={styles.iconWrapper}><ActivityIcon /></div>
            Stance Matrix
          </h2>
          <div className="glass-panel" style={{ height: '100%', minHeight: '400px' }}>
            <StanceMatrix />
            <p style={{ fontSize: '0.85rem', color: 'var(--neutral)', marginTop: '1rem', textAlign: 'center', opacity: 0.7 }}>
              Hawkish/Dovish estimates based on recent public statements.
            </p>
          </div>
        </section>

        <section className={`${styles.card} ${styles.scheduleArea} animate-fade-in`} style={{ animationDelay: '0.2s' }}>
          <h2 className={styles.sectionTitle}>
            <div className={styles.iconWrapper}><CalendarIcon /></div>
            This Week's Schedule
          </h2>
          <div className="glass-panel" style={{ height: '100%' }}>
            <CalendarWeek />
          </div>
        </section>

        {/* Bottom Row: Directory (Left 8) + Statements (Right 4) */}
        <section className={`${styles.card} ${styles.directoryArea} animate-fade-in`} style={{ animationDelay: '0.3s' }}>
          <h2 className={styles.sectionTitle}>
            <div className={styles.iconWrapper}><UsersIcon /></div>
            Member Directory
          </h2>
          <div className="glass-panel" style={{ height: '100%' }}>
            <MembersDirectory />
          </div>
        </section>

        <section className={`${styles.card} ${styles.timelineArea} animate-fade-in`} style={{ animationDelay: '0.4s' }}>
          <h2 className={styles.sectionTitle}>
            <div className={styles.iconWrapper}><MicIcon /></div>
            Latest Statements
          </h2>
          <div className="glass-panel" style={{ height: '100%' }}>
            <StatementsTimeline />
          </div>
        </section>

      </div>
    </main>
  );
}
