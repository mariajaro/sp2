document.addEventListener('DOMContentLoaded', function () {
    const newPostForm = document.getElementById('newPostForm');

    newPostForm.addEventListener('submit', async function (event) {
        event.preventDefault();

        const title = document.getElementById('postTitle').value;
        const deadline = document.getElementById('postDeadline').value;
        const description = document.getElementById('postDescription').value;
        const image = document.getElementById('postImage').value;

        try {
            const media = image ? [image] : [];
            const response = await createNewPost(title, description, deadline, media);
            if (!response.ok) {
                throw new Error('Failed to create new post');
            }

            const responseData = await response.json();
            console.log('New post created:', responseData);

            window.location.href = 'index.html';
            newPostForm.reset();
        } catch (error) {
            console.error('Error creating new post:', error.message);
        }
    });
});

export async function createNewPost(title, description, endsAt, media) {
    const apiUrl = 'https://api.noroff.dev/api/v1/auction/listings';
    const accessToken = localStorage.getItem('jwtToken');

    const headers = new Headers();
    headers.append('Authorization', `Bearer ${accessToken}`);
    headers.append('Content-Type', 'application/json');

    return fetch(apiUrl, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify({ title, description, endsAt, media }),
    });
}
