/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Answers, ScoreType, Dimension } from '../types';
import { MBTI_QUESTIONS } from '../data/mbtiData';

export function calculateMBTI(answers: Answers): { type: string; scores: ScoreType } {
  const scores: ScoreType = {
    EI: { left: 0, right: 0, percentage: 50 },
    SN: { left: 0, right: 0, percentage: 50 },
    TF: { left: 0, right: 0, percentage: 50 },
    JP: { left: 0, right: 0, percentage: 50 },
  };

  // Process all answers
  MBTI_QUESTIONS.forEach((q) => {
    const value = answers[q.id];
    if (value === undefined) return; // Unanswered question

    // Direction defines which side represents a positive value (+1, +2)
    const isAgreeLeansLeft = q.direction;

    if (value > 0) {
      // User tilted towards AGREE
      if (isAgreeLeansLeft) {
        scores[q.dimension].left += value;
      } else {
        scores[q.dimension].right += value;
      }
    } else if (value < 0) {
      // User tilted towards DISAGREE (value is negative, e.g. -1, -2)
      const absValue = Math.abs(value);
      if (isAgreeLeansLeft) {
        scores[q.dimension].right += absValue;
      } else {
        scores[q.dimension].left += absValue;
      }
    } else {
      // Neutral (value === 0): split slightly or give 1 point to both to avoid division by zero
      scores[q.dimension].left += 0.5;
      scores[q.dimension].right += 0.5;
    }
  });

  // Calculate percentages and types
  let resultType = '';

  const dimensions: Dimension[] = ['EI', 'SN', 'TF', 'JP'];
  const leftChars: { [key in Dimension]: string } = { EI: 'E', SN: 'S', TF: 'T', JP: 'J' };
  const rightChars: { [key in Dimension]: string } = { EI: 'I', SN: 'N', TF: 'F', JP: 'P' };

  dimensions.forEach((dim) => {
    const left = scores[dim].left;
    const right = scores[dim].right;
    const total = left + right;

    let percentage = 50;
    if (total > 0) {
      // Percentage of Left (E, S, T, J)
      percentage = Math.round((left / total) * 100);
    }

    scores[dim].percentage = percentage;

    // Build the personality type code (e.g. INFJ)
    if (percentage >= 50) {
      resultType += leftChars[dim];
    } else {
      resultType += rightChars[dim];
    }
  });

  return {
    type: resultType,
    scores,
  };
}
