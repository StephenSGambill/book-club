export const Book = ({ title, author, chapterCount, synopsis }) => {


    return <div className="bookInfo">
        <div><b>Title: {title}</b></div>
        <div><b>Author: </b>{author}</div>
        <div><b>Chapters: </b>{chapterCount}</div><div className="synopsis"><b>Synopsis: </b><em>{synopsis}</em></div>

    </div>

}