import React, { useState, useEffect } from 'react';
import axios from 'axios';
import items from './data'
const ArticleContext = React.createContext();


export default function ArticleProvider(props) {
  const [searchInput, SetSearchInput] = useState('');
  const [articles, SetArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pictures,setPictures]=useState([])
  let [currentPage, setCurrentPage] = useState(1);
  const articlePerPage = 8;
  const indexOfLastArticle = currentPage * articlePerPage;
  const indexOfFirstArticle = indexOfLastArticle - articlePerPage;
  const currentArticles = articles.slice(
    indexOfFirstArticle,
    indexOfLastArticle
  );

  useEffect(() => {
    fetchArticle();
    setPictures(getPictures(items))
    return () => {
      console.log('un mounted');
    };
  }, []);

  const fetchArticle = async () => {
    try {
      const getNews = await axios.get(
        'http://newsapi.org/v2/top-headlines?country=us&apiKey=0701d5f64ffe4006a9c9b7d0d3694969'
      );
      const { articles } = getNews.data;
      SetArticles(articles);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const getPictures= items=>{
    const {data}=items
    return data;
  }
    
  

  const handleDetails =(id)=>{
    const allArticles=[...articles]
    const theArticle=allArticles.find(article=>article.publishedAt===id)
    return theArticle
  }
console.log('hey articles',articles)
  


  const handleSearch = e => {
    SetSearchInput(e.target.value);
  };
  const paginate = pn => {
    setCurrentPage(pn);
  };
  const previous = () => {
    if (currentPage > 1) {
      currentPage = currentPage - 1;
      setCurrentPage(currentPage);
      paginate(currentPage);
    }
  };
  const next = () => {
    const pageNumber = Math.ceil(articles.length / articlePerPage + 1);
    if (currentPage < pageNumber - 1) {
      currentPage = currentPage + 1;
      setCurrentPage(currentPage);
      paginate(currentPage);
    }
  };

  return (
    <ArticleContext.Provider
      value={{
        handleSearch,
        paginate,
        previous,
        next,
        handleDetails,
        currentArticles,
        articles,
        pictures,
        searchInput,
        loading,
        articlePerPage,
        currentPage
      }}
    >
      {props.children}
    </ArticleContext.Provider>
  );
}

export { ArticleContext, ArticleProvider };
