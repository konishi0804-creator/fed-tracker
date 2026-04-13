"use client";

import { fedMembers, FedMember } from "../data/fedMembers";
import styles from "./MembersDirectory.module.css";

export default function MembersDirectory() {
  const getStanceClass = (score: number) => {
    if (score > 0.3) return styles.hawkish;
    if (score < -0.3) return styles.dovish;
    return styles.neutral;
  };

  const getStanceLabel = (score: number) => {
    if (score > 0.3) return "Hawkish";
    if (score < -0.3) return "Dovish";
    return "Neutral";
  };

  // Group members logically
  const chairGroup = fedMembers.filter(m => m.title.includes('Chair'));
  const governorsGroup = fedMembers.filter(m => m.title === 'Governor');
  // Sort regional presidents: Voters first
  const regionalGroup = fedMembers.filter(m => m.type === 'Regional').sort((a, b) => {
    if (a.votingStatus === 'Voter' && b.votingStatus !== 'Voter') return -1;
    if (a.votingStatus !== 'Voter' && b.votingStatus === 'Voter') return 1;
    return 0;
  });

  const renderMemberGroup = (title: string, members: FedMember[]) => {
    if (members.length === 0) return null;
    return (
      <div className={styles.groupContainer}>
        <h3 className={styles.groupTitle}>{title}</h3>
        <div className={styles.grid}>
          {members.map((member) => {
            const isVoter = member.votingStatus === 'Voter';
            return (
              <div key={member.id} className={`${styles.memberCard} ${isVoter ? styles.memberCardVoter : ''}`}>
                <div className={styles.avatar}>
                   <span className={styles.avatarInitial}>{member.name.charAt(0)}</span>
                   <img 
                     src={member.imageUrl || `/images/members/${member.id}.jpg`} 
                     alt={member.name} 
                     className={styles.avatarImage} 
                     onError={(e) => { e.currentTarget.style.display = 'none'; }}
                   />
                </div>
                <div className={styles.info}>
                  <h4 className={styles.name}>{member.name}</h4>
                  <div className={styles.titleRow}>
                    <span className={styles.title}>{member.title}</span>
                    {member.bank && <span className={styles.bank}>- {member.bank}</span>}
                  </div>
                  <div className={styles.tags}>
                    <span className={`${styles.tag} ${isVoter ? styles.tagVoter : styles.tagNonVoter}`}>
                      {isVoter ? '⭐️ Voter' : 'Non-voter'}
                    </span>
                    <span className={`${styles.tag} ${getStanceClass(member.stanceScore)}`}>
                      {getStanceLabel(member.stanceScore)}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <div className={styles.directoryWrapper}>
      {renderMemberGroup("Chair & Vice Chairs", chairGroup)}
      {renderMemberGroup("Board of Governors", governorsGroup)}
      {renderMemberGroup("Regional Bank Presidents", regionalGroup)}
    </div>
  );
}
