import React, { useState, useEffect } from 'react';
import Card from './Card';
import './Default.css'
import { supabase } from '../Client'
import { useSearchParams } from 'react-router-dom';


const Default = (props) => {

    const [isFilterActive, setIsFilterActive] = useState(false);

    const [posts, setPosts] = useState([]);
    const [searchParams] = useSearchParams();

    useEffect(() => {
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
        };
    
        fetchPosts();
    }, [searchParams, isFilterActive]);

    const orderTime = () => {
        const newPosts = posts.sort((a, b) => {
            return new Date(b.created_at) - new Date(a.created_at);
        })
        setPosts([...newPosts]);
    }

    const orderVote = () => {
        const newPosts = posts.sort((a, b) => {
            return b.vote - a.vote;
        })
        setPosts([...newPosts]);
    }
    
    const filterQuestion = () => {
        setIsFilterActive(!isFilterActive);
    };
    

    

    
    return (
        <div className="summary">
            <h1>Your Post Gallery!</h1>
            <h2>Number: {posts.length}</h2>
            <h3>Click on a post to see more details</h3>
            <button onClick={orderTime}>Order by Time</button>
            <button onClick={orderVote}>Order by Vote</button>
            <button onClick={filterQuestion}>
                {isFilterActive ? "Show All" : "Filter by Question"}
            </button> 
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
    )
}

export default Default;