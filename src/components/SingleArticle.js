import React from 'react'

function SingleArticle({ match, location }) {
    console.log(match);
    console.log(location);
    return (
        <div id="singleArticle">
            {match.params.id}
        </div>
    )
}

export default SingleArticle
