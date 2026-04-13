"use client";

import React, { useEffect, useState } from 'react';
import styles from './FedWatchTable.module.css';
import fedwatchData from '../data/fedwatch.json';

export default function FedWatchTable() {
  const [data, setData] = useState<{
    updatedAt: string;
    headers: string[];
    rows: Record<string, string>[];
  } | null>(null);

  useEffect(() => {
    // In a real application, you might fetch this from an API endpoint
    // For now, we load it directly from the static JSON file
    setData(fedwatchData);
  }, []);

  if (!data) {
    return <div className={styles.loading}>Loading FedWatch data...</div>;
  }

  const { headers, rows, updatedAt } = data;

  return (
    <div className={styles.container}>
      <div className={styles.headerArea}>
        <h3 className={styles.tableTitle}>CME FEDWATCH TOOL - MEETING PROBABILITIES</h3>
        <span className={styles.updatedText}>
          Last Updated: {new Date(updatedAt).toLocaleString()}
        </span>
      </div>

      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead>
            <tr>
              {headers.map((header, index) => (
                <th key={index}>{header}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, rowIndex) => {
              // Find the highest probability for highlighting
              let maxVal = 0;
              let maxKey = '';
              headers.forEach(h => {
                if (h !== 'MEETING DATE') {
                  const val = parseFloat(row[h] || '0');
                  if (val > maxVal) {
                    maxVal = val;
                    maxKey = h;
                  }
                }
              });

              return (
                <tr key={rowIndex}>
                  {headers.map((header, colIndex) => {
                    const isMeetingDate = header === 'MEETING DATE';
                    const value = row[header];
                    const isZero = value === '0.0%' || !value;
                    const isMax = header === maxKey;

                    let cellClass = styles.dataCell;
                    if (isMeetingDate) cellClass = styles.dateCell;
                    else if (isMax) cellClass = `${styles.dataCell} ${styles.highlightCell}`;
                    else if (isZero) cellClass = `${styles.dataCell} ${styles.zeroCell}`;

                    return (
                      <td key={colIndex} className={cellClass}>
                        {isZero && !isMeetingDate ? '0.0%' : value || '0.0%'}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
