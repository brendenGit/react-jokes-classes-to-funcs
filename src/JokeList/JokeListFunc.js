import React, { useState, useEffect } from "react";
import useAxios from "../hooks/useAxios";
import "../JokeList.css";
import JokeFunc from "../Joke/JokeFunc";

/** List of jokes. */

const JokeListFunc = () => {
    const [jokes, setJokes] = useState([]);
    const { dataArray, isLoading, fetchDataAndUpdateState } = useAxios();

    useEffect(() => {
        fetchDataAndUpdateState();
    }, []);

    const handleClick = async () => {
        setJokes([]);
        await fetchDataAndUpdateState();
        setJokes(dataArray);
    };

    useEffect(() => {
        setJokes(dataArray);
    }, [dataArray]);


    /* change vote for this id by delta (+1 or -1) */
    const vote = (id, delta) => {
        setJokes(() => jokes.map(joke => {
            return joke.id === id ? { ...joke, votes: joke.votes + delta } : joke
        }))
    }

    //sort jokes
    let sortedJokes = [...jokes].sort((a, b) => b.votes - a.votes);
    /* render: either loading spinner or list of sorted jokes. */
    return (
        <>
            {isLoading ?
                <div className="loading">
                    <i className="fas fa-4x fa-spinner fa-spin" />
                </div>
                :
                <div className="JokeList">
                    <button className="JokeList-getmore" onClick={handleClick}>
                        Get New Jokes
                    </button>

                    {sortedJokes.map(j => (
                        <JokeFunc
                            text={j.joke}
                            key={j.id}
                            id={j.id}
                            votes={j.votes}
                            vote={vote}
                        />
                    ))}
                </div>
            }
        </>
    )
}

export default JokeListFunc;
