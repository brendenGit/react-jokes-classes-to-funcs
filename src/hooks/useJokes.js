import { useState } from "react";
import axios from "axios";


const useGetJokes = (initialValue = []) => {
    const [jokes, setJokes] = useState(initialValue);
    const [isLoading, setLoading] = useState(true);
    const [seenJokes, setSeenJokes] = useState(new Set());

    console.log('inside hook');

    /* change vote for this id by delta (+1 or -1) */
    const vote = (id, delta) => {
        console.log('inside vote')
        setJokes(() => ({
            jokes: jokes.map(j =>
                j.id === id ? { ...j, votes: j.votes + delta } : j
            )
        }));
    }

    const getJokes = async (numJokesToGet) => {
        console.log(numJokesToGet);
        debugger;
        console.log('inside getJokes')
        setLoading(true);
        setJokes([]);
        try {
            while (jokes.length < numJokesToGet) {
                console.log(jokes.length);
                let res = await axios.get("https://icanhazdadjoke.com", {
                    headers: { Accept: "application/json" }
                });

                let { ...joke } = res.data;
                console.log(joke);

                if (!seenJokes.has(joke.id)) {
                    setSeenJokes(oldSet => new Set([...oldSet], joke.id));
                    setJokes(oldJokes => ([...oldJokes, { ...joke, votes: 0 }]));
                    console.log(jokes);
                } else {
                    console.log("duplicate found!");
                }
            }
            setLoading(false);
        } catch (err) {
            console.error(err);
        }
    };
    console.log('at return')
    console.log(jokes)
    return { jokes, isLoading, getJokes, vote };
};

export default useGetJokes;