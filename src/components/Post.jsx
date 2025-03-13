function Post({ id, author, body, onDelete, onEdit }) {
    return (
        <li className='post'>
            <p className='author'>{author}</p>
            <p className='text'>{body}</p>
            <button style={{ backgroundColor: 'blue', color: 'white' }} onClick={() => {
                const newAuthor = prompt('Enter new name:', author);
                if (newAuthor) onEdit(id, { author: newAuthor });
            }}>Edit Name</button>
            <button style={{ backgroundColor: 'green', color: 'white' }} onClick={() => {
                const newBody = prompt('Enter new text:', body);
                if (newBody) onEdit(id, { body: newBody });
            }}>Edit Text</button>
            <button style={{ backgroundColor: 'red', color: 'white' }} onClick={() => onDelete(id)}>Delete</button>
        </li>
    );
}

export default Post;
