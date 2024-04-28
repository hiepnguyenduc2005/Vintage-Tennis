import React, { useState, useEffect } from 'react';
import Card from './Card';
import './Default.css'
import { supabase } from '../Client'
import { useSearchParams } from 'react-router-dom';
import Spinner from './Spinner';


const Default = () => {

    const [isFilterActive, setIsFilterActive] = useState(false);

    const [posts, setPosts] = useState([]);
    const [searchParams] = useSearchParams();
    const [timeButton, setTimeButton] = useState(false);
    const [voteButton, setVoteButton] = useState(false);

    const [isLoading, setIsLoading] = useState(true);

    const handleBackgroundChange = (type) => {
        // Reset all buttons to false
        setTimeButton(false);
        setVoteButton(false);
        // Then activate the clicked one
        if (type === 'time') setTimeButton(true);
        if (type === 'vote') setVoteButton(true);
    }

    useEffect(() => {
        setIsLoading(true);
        const fetchPosts = async () => {
            let query = supabase.from('Tennis').select();
    
            const searchQuery = searchParams.get('search');
            if (searchQuery) {
                query = query.ilike('title', `%${searchQuery}%`);
            }
    
            let { data, error } = await query;
    
            if (error) {
                console.error('Error fetching posts', error);
            } else {
                // Apply the filter if isFilterActive is true
                if (isFilterActive) {
                    data = data.filter(post => post.question);
                }
                setPosts(data);
            }
            setIsLoading(false);
        };
    
        fetchPosts();
    }, [searchParams, isFilterActive]);

    const orderTime = () => {
        const newPosts = posts.sort((a, b) => {
            return new Date(b.created_at) - new Date(a.created_at);
        })
        setPosts([...newPosts]);
        handleBackgroundChange('time');
    }

    const orderVote = () => {
        const newPosts = posts.sort((a, b) => {
            return b.vote - a.vote;
        })
        setPosts([...newPosts]);
        handleBackgroundChange('vote');
    }
    
    const filterQuestion = () => {
        setIsFilterActive(!isFilterActive);
    };
    
    return (
        <div className="summary">
             {isLoading ? (
                <Spinner /> // Render your spinner component here while loading
            ) : (
            <div>
                <div class="row">
                    <div className="order col col-lg-4">
                        <h4>Order by:</h4>
                        <button className={`order-button ${timeButton ? 'timeActive' : ''}`} onClick={orderTime}>Time</button>
                        <button className={`order-button ${voteButton ? 'voteActive' : ''}`} onClick={orderVote}>Vote</button>
                    </div>
                    <div className="search col col-lg-4">
                    </div>
                    <div className="order col col-lg-4 justify-content-md-end">                
                        <button onClick={filterQuestion}>
                            {isFilterActive ? "Show All" : "Filter by Question"}
                        </button> 
                    </div>
                </div>

                <div className="spacer"></div>        
                <div className="post-gallery">
                {
                    posts && posts.length > 0 ?
                    posts.map((post) =>  
                    <Card id={post.id} title={post.title} time={post.created_at} vote={post.vote}/>
                    ) : <h2>{'No Posts Yet 😞'}</h2>
                }
                </div>
            </div> 
        )}
        </div>
    )
}

export default Default;