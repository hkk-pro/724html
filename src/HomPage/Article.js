import React, { useContext } from 'react';
import { ArticleContext } from '../Context';
import Loading from '../Loading';
import { Link } from 'react-router-dom';

export default function Article() {
  let { currentArticles, searchInput, loading } = useContext(ArticleContext);
  searchInput = searchInput.toLowerCase();
  let articles = currentArticles.filter(article =>
    article.title.toLowerCase().includes(searchInput)
  );

  if (loading) {
    return (
      <div className='row'>
        <Loading />
      </div>
    );
  }

  return (
    <div className='row'>
      {articles.map(article => {
        return (
          <div className='col-md-12 col-lg-6' key={article.publishedAt}>
            <div className='container my-5 z-depth-1'>
              <section className='dark-grey-text text-center text-lg-left'>
                <div className='row'>
                  <div className='col-lg-6 mb-4 mb-lg-0 d-flex align-items-center justify-content-center'>
                    <img
                      src={article.urlToImage}
                      className='img-fluid'
                      alt=''
                    />
                  </div>
                  <div className='col-lg-6 mb-4 mb-lg-0'>
                    <h3 className='font-weight-bold'>{article.title}</h3>

                    <p className='text-muted'>{article.description}.</p>
                    <Link className='' to={`/articles/${article.publishedAt}`}>
                      <h3>
                        <span className='font-weight-bold'>
                          Read more<i className='fa fa-angle-right ml-2'></i>
                        </span>
                      </h3>
                    </Link>
                  </div>
                </div>
              </section>
            </div>
          </div>
        );
      })}
    </div>
  );
}
