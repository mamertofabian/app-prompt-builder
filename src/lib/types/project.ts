export interface Project {
  id: string;
  name: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
  userId: string;
  type: string;
  features: string[];
  techStack: string[];
  userStories: string[];
}