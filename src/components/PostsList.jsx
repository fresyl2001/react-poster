import { useEffect, useState } from 'react';
import Post from './Post';
import NewPost from './NewPost';
import Modal from './Modal';
import LoadingSpinner from './LoadingSpinner';

function PostsList({ isPosting, onStopPosting }) {
	const [posts, setPosts] = useState([]);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		async function fetchPosts() {
			setLoading(true);
			const response = await fetch('http://localhost:8080/posts');
			const resData = await response.json();
			setPosts(resData.posts);
			setLoading(false);
		}
		fetchPosts();
	}, []);

	async function addPostHandler(postData) {
		const response = await fetch('http://localhost:8080/posts', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(postData)
		});
		const newPost = await response.json();
		setPosts(prev => [newPost.post, ...prev]);
	}

	async function deletePostHandler(postId) {
		await fetch(`http://localhost:8080/posts/${postId}`, { method: 'DELETE' });
		setPosts(prev => prev.filter(post => post.id !== postId));
	}

	async function editPostHandler(postId, updatedData) {
		await fetch(`http://localhost:8080/posts/${postId}`, {
			method: 'PUT',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(updatedData)
		});
		setPosts(prev => prev.map(post => (post.id === postId ? { ...post, ...updatedData } : post)));
	}

	return (
		<>
			{isPosting && (
				<Modal onCloseModal={onStopPosting}>
					<NewPost onCancel={onStopPosting} onAddPost={addPostHandler} />
				</Modal>
			)}

			{loading && <LoadingSpinner />}

			{!loading && posts.length > 0 && (
				<ul className='posts'>
					{posts.map(post => (
						<Post key={post.id} {...post} onDelete={deletePostHandler} onEdit={editPostHandler} />
					))}
				</ul>
			)}
		</>
	);
}

export default PostsList;