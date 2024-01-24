import React, { useEffect } from "react";
import useGetJokes from "../hooks/useJokes";
import "../JokeList.css";
import JokeFunc from "../Joke/JokeFunc";

/** List of jokes. */

const JokeListFunc = () => {
    const { jokes, isLoading, getJokes, vote } = useGetJokes();

    /* at mount, get jokes */
    useEffect(() => {
        const fetchData = async () => {
            await getJokes(5);
        };
        fetchData();
    }, []);


    // /* on jokes update, re-render */
    // useEffect(() =>  console.log('Jokes updated:', jokes), [jokes]);

    /* empty joke list, set to loading state, and then call getJokes */
    const handleClick = () => getJokes(5);

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
