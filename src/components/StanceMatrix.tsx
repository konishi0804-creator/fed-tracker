"use client";

import { fedMembers } from "../data/fedMembers";
import styles from "./StanceMatrix.module.css";

export default function StanceMatrix() {
  return (
    <div className={styles.container}>
      <div className={styles.axisX}></div>
      <div className={styles.axisY}></div>
      
      <div className={styles.labelHawkish}>Hawkish</div>
      <div className={styles.labelDovish}>Dovish</div>
      <div className={styles.labelVoters}>Voters</div>
      
      <div className={styles.plotArea}>
        {fedMembers.map(member => {
          // Stance score maps to X axis: Dovish (-1) = left (10%), Hawkish (1) = right (90%)
          const xPos = 50 + (member.stanceScore * 40);
          
          // Voter status maps to Y axis (simplified distribution)
          // Expand the Y-axis spread to prevent icon overlaps
          const yPos = member.votingStatus === 'Voter' ? 10 + Math.random() * 30 : 60 + Math.random() * 30;
          
          return (
            <div 
              key={member.id} 
              className={styles.point}
              style={{ left: `${xPos}%`, top: `${yPos}%` }}
              title={`${member.name} (${member.stanceScore > 0 ? 'Hawkish' : 'Dovish'})`}
            >
              <div className={`${styles.avatarContainer} ${member.stanceScore > 0.3 ? styles.avatarHawkish : member.stanceScore < -0.3 ? styles.avatarDovish : styles.avatarNeutral}`}>
                <span className={styles.avatarInitial}>{member.name.charAt(0)}</span>
                <img 
                  src={member.imageUrl || `/images/members/${member.id}.jpg`} 
                  alt={member.name} 
                  className={styles.avatarImage} 
                  onError={(e) => { e.currentTarget.style.display = 'none'; }}
                />
              </div>
              <span className={styles.pointName}>{member.name.split(' ').pop()}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
