// useFoods.js
import { useState, useEffect, useCallback } from 'react';
import axiosInstance from "@/app/api/axiosInstance";

const useFoods = () => {
    const [foods, setFoods] = useState([]); // Assure-toi de définir `foods` ici
    const [courseCount, setCourseCount] = useState(0);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const getAllFoods = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await axiosInstance.get('/api/foods');
            setFoods(response.data.foods);
            setCourseCount(response.data.courseCount);
        } catch (e) {
            setError(e);
            console.error("Error fetching foods:", e);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        getAllFoods();
    }, [getAllFoods]);

    return { foods, courseCount, loading, error, refetch: getAllFoods }; // Retourne les données correctes
};

export default useFoods; // Correction ici
