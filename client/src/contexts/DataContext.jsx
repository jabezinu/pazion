import { createContext, useContext, useState, useEffect } from 'react';
import commentService from '../services/commentService';
import courseService from '../services/courseService';
import equipmentService from '../services/equipmentService';
import videoService from '../services/videoService';
import gemstoneService from '../services/gemstoneService';

const DataContext = createContext();

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};

export const DataProvider = ({ children }) => {
  const [comments, setComments] = useState([]);
  const [courses, setCourses] = useState([]);
  const [equipments, setEquipments] = useState([]);
  const [videos, setVideos] = useState([]);
  const [gemstones, setGemstones] = useState([]);
  
  const [loading, setLoading] = useState({
    comments: true,
    courses: true,
    equipments: true,
    videos: true,
    gemstones: true,
  });

  const [errors, setErrors] = useState({
    comments: null,
    courses: null,
    equipments: null,
    videos: null,
    gemstones: null,
  });

  // Fetch all data once on mount
  useEffect(() => {
    const fetchAllData = async () => {
      // Fetch comments
      try {
        const commentsData = await commentService.getAll();
        setComments(commentsData);
        setLoading(prev => ({ ...prev, comments: false }));
      } catch (error) {
        console.error('Failed to fetch comments:', error);
        setErrors(prev => ({ ...prev, comments: error.message }));
        setLoading(prev => ({ ...prev, comments: false }));
      }

      // Fetch courses
      try {
        const coursesData = await courseService.getAll();
        setCourses(coursesData);
        setLoading(prev => ({ ...prev, courses: false }));
      } catch (error) {
        console.error('Failed to fetch courses:', error);
        setErrors(prev => ({ ...prev, courses: error.message }));
        setLoading(prev => ({ ...prev, courses: false }));
      }

      // Fetch equipments
      try {
        const equipmentsData = await equipmentService.getAll();
        setEquipments(equipmentsData);
        setLoading(prev => ({ ...prev, equipments: false }));
      } catch (error) {
        console.error('Failed to fetch equipments:', error);
        setErrors(prev => ({ ...prev, equipments: error.message }));
        setLoading(prev => ({ ...prev, equipments: false }));
      }

      // Fetch videos
      try {
        const videosData = await videoService.getAll();
        setVideos(videosData);
        setLoading(prev => ({ ...prev, videos: false }));
      } catch (error) {
        console.error('Failed to fetch videos:', error);
        setErrors(prev => ({ ...prev, videos: error.message }));
        setLoading(prev => ({ ...prev, videos: false }));
      }

      // Fetch gemstones
      try {
        const gemstonesData = await gemstoneService.getAll();
        setGemstones(gemstonesData);
        setLoading(prev => ({ ...prev, gemstones: false }));
      } catch (error) {
        console.error('Failed to fetch gemstones:', error);
        setErrors(prev => ({ ...prev, gemstones: error.message }));
        setLoading(prev => ({ ...prev, gemstones: false }));
      }
    };

    fetchAllData();
  }, []);

  // Refresh functions for manual data refresh if needed
  const refreshComments = async () => {
    setLoading(prev => ({ ...prev, comments: true }));
    try {
      const data = await commentService.getAll();
      setComments(data);
      setErrors(prev => ({ ...prev, comments: null }));
    } catch (error) {
      console.error('Failed to refresh comments:', error);
      setErrors(prev => ({ ...prev, comments: error.message }));
    } finally {
      setLoading(prev => ({ ...prev, comments: false }));
    }
  };

  const refreshCourses = async () => {
    setLoading(prev => ({ ...prev, courses: true }));
    try {
      const data = await courseService.getAll();
      setCourses(data);
      setErrors(prev => ({ ...prev, courses: null }));
    } catch (error) {
      console.error('Failed to refresh courses:', error);
      setErrors(prev => ({ ...prev, courses: error.message }));
    } finally {
      setLoading(prev => ({ ...prev, courses: false }));
    }
  };

  const refreshEquipments = async () => {
    setLoading(prev => ({ ...prev, equipments: true }));
    try {
      const data = await equipmentService.getAll();
      setEquipments(data);
      setErrors(prev => ({ ...prev, equipments: null }));
    } catch (error) {
      console.error('Failed to refresh equipments:', error);
      setErrors(prev => ({ ...prev, equipments: error.message }));
    } finally {
      setLoading(prev => ({ ...prev, equipments: false }));
    }
  };

  const refreshVideos = async () => {
    setLoading(prev => ({ ...prev, videos: true }));
    try {
      const data = await videoService.getAll();
      setVideos(data);
      setErrors(prev => ({ ...prev, videos: null }));
    } catch (error) {
      console.error('Failed to refresh videos:', error);
      setErrors(prev => ({ ...prev, videos: error.message }));
    } finally {
      setLoading(prev => ({ ...prev, videos: false }));
    }
  };

  const refreshGemstones = async () => {
    setLoading(prev => ({ ...prev, gemstones: true }));
    try {
      const data = await gemstoneService.getAll();
      setGemstones(data);
      setErrors(prev => ({ ...prev, gemstones: null }));
    } catch (error) {
      console.error('Failed to refresh gemstones:', error);
      setErrors(prev => ({ ...prev, gemstones: error.message }));
    } finally {
      setLoading(prev => ({ ...prev, gemstones: false }));
    }
  };

  const value = {
    comments,
    courses,
    equipments,
    videos,
    gemstones,
    loading,
    errors,
    refreshComments,
    refreshCourses,
    refreshEquipments,
    refreshVideos,
    refreshGemstones,
  };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};
