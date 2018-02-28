export const postsToObject = postsArray => {
    const objectPosts = {};
    // Set object
    postsArray.map(post => (objectPosts[post.id] = post));
    // Return object
    return objectPosts;
}