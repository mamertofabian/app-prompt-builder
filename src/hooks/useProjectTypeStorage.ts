import { useEffect, useCallback } from 'react';
import type { ProjectType } from '../App';

interface ProjectTypeData {
  features: string[];
  techStack: string[];
  userStories: string[];
}

export function useProjectTypeStorage(
  projectType: ProjectType,
  currentData: ProjectTypeData,
  onChange: (data: ProjectTypeData) => void,
  shouldLoadDefaults: boolean
) {
  const storageKey = `project_type_${projectType}`;

  const saveToStorage = useCallback((data: ProjectTypeData) => {
    try {
      localStorage.setItem(storageKey, JSON.stringify(data));
    } catch (error) {
      console.error('Failed to save project data to localStorage:', error);
    }
  }, [storageKey]);

  // Load data from storage only when project type changes or when explicitly requested
  useEffect(() => {
    if (!shouldLoadDefaults) return;
    
    try {
      const storedData = localStorage.getItem(storageKey);
      if (storedData) {
        const parsedData = JSON.parse(storedData) as ProjectTypeData;
        onChange(parsedData);
      }
    } catch (error) {
      console.error('Failed to load project data from localStorage:', error);
    }
  }, [storageKey, onChange, shouldLoadDefaults]);

  // Save data to storage whenever it changes, but only if we're not in the loading phase
  useEffect(() => {
    if (!shouldLoadDefaults) {
      saveToStorage(currentData);
    }
  }, [currentData, saveToStorage, shouldLoadDefaults]);
}