/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type Dimension = 'EI' | 'SN' | 'TF' | 'JP';

export interface Question {
  id: number;
  text: string;
  dimension: Dimension;
  // If true, selecting "Agree" leans towards left (E, S, T, J) and "Disagree" leans towards right (I, N, F, P)
  // If false, it's reversed.
  direction: boolean;
}

export interface PersonalityDetails {
  type: string; // e.g., 'INTJ'
  name: string; // e.g., '建筑师'
  nickname: string; // e.g., '战略与逻辑大师'
  badgeEmoji: string; // e.g., '🧠'
  color: string; // Tailwind hex or class prefix
  bgGradient: string; // Tailwind gradient classes
  dimensionStrengthLabels: {
    EI: [string, string]; // e.g. ['外向E', '内向I']
    SN: [string, string]; // e.g. ['实感S', '直觉N']
    TF: [string, string]; // e.g. ['理性T', '感性F']
    JP: [string, string]; // e.g. ['独立J', '随性P']
  };
  summary: string;
  strengths: string[];
  weaknesses: string[];
  careers: string[];
  relationships: {
    matchingTypes: string[];
    tips: string[];
  };
  famousPeople: {
    name: string;
    avatar: string; // Initial or emoji
    description: string;
  }[];
}

export interface Answers {
  [questionId: number]: number; // Value from -2 to 2 (-2: strongly disagree, 0: neutral, 2: strongly agree)
}

export type ScoreType = {
  [key in Dimension]: {
    left: number;  // score for E, S, T, J
    right: number; // score for I, N, F, P
    percentage: number; // percentage of left side
  }
};
