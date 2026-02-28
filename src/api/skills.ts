// API functions for skills
const API_BASE = import.meta.env.VITE_API_URL || '/api';

export interface Skill {
  _id: string;
  skillName: string;
  percentage: number;
  category: string;
  createdAt: string;
}

export const getSkills = async (): Promise<Skill[]> => {
  const response = await fetch(`${API_BASE}/skills`);
  if (!response.ok) throw new Error('Failed to fetch skills');
  return response.json();
};

export const createSkill = async (data: Omit<Skill, '_id' | 'createdAt'>): Promise<Skill> => {
  const response = await fetch(`${API_BASE}/skills`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error('Failed to create skill');
  return response.json();
};

export const updateSkill = async (id: string, data: Partial<Skill>): Promise<Skill> => {
  const response = await fetch(`${API_BASE}/skills/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error('Failed to update skill');
  return response.json();
};

export const deleteSkill = async (id: string): Promise<void> => {
  const response = await fetch(`${API_BASE}/skills/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) throw new Error('Failed to delete skill');
};
