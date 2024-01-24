import { useState } from "react";
import axios from "axios";


const useAxios = () => {
    const [dataArray, setDataArray] = useState([]);
    const [isLoading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [seenJokes, setSeenJokes] = useState(new Set());

    const fetchDataAndUpdateState = async (numJokesToGet = 5) => {
        setDataArray([]);
        try {
            setLoading(true);
            const jokesPromises = Array.from({ length: numJokesToGet }, async () => {
                const res = await axios.get("https://icanhazdadjoke.com", {
                    headers: { Accept: "application/json" }
                });

                const { ...joke } = res.data;

                if (!seenJokes.has(joke.id)) {
                    setSeenJokes((oldSet) => new Set([...oldSet], joke.id));
                    return { ...joke, votes: 0 };
                } else {
                    console.log("duplicate found!");
                    return null;
                }
            });

            const newJokes = await Promise.all(jokesPromises);
            const filteredJokes = newJokes.filter((joke) => joke !== null);

            setDataArray((prevDataArray) => [...prevDataArray, ...filteredJokes]);
        } catch (error) {
            setError(error);
        } finally {
            setLoading(false);
        }
    };
    return { dataArray, isLoading, error, fetchDataAndUpdateState };
};

export default useAxios;
