import React from 'react'
import { Link } from 'react-router-dom'


const RecipeCard = () => {
  // TODO: adjust ID to be actual truncated recipes ID
  const id = 34
  return (
    <div className="recipe-card">
      <Link to={`/view/${id}`} key={id}>
        <h3>*Title*</h3>
        <p>Source: *source*</p>
        <div className="recipe-card-tags">
          {/* TODO: map over recipe tags */}
          <p className="tag">*tag*</p>
        </div>
      </Link>
      
    </div>
  )
}

export default RecipeCard
