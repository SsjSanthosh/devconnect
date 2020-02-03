const initialState = { posts: [], post: [], loading: true, errors: [] };

const postReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_POST":
      return { ...state, post: action.payload };
    case "ADD_COMMENT":
      return {
        ...state,
        post: state.posts.map(post => {
          return post._id === action.payload.id
            ? { ...post, comments: action.payload }
            : post;
        })
      };
    case "ADD_POST":
      return { ...state, posts: [action.payload, ...state.posts] };
    case "DELETE_COMMENT":
      return {
        ...state,
        posts: state.posts.map(p =>
          p._id === action.payload.pid
            ? p.comments.filter(c => c._id !== action.payload.cid)
            : p
        )
      };
    case "DELETE_POST":
      return {
        ...state,
        posts: state.posts.filter(post => post._id !== action.payload)
      };
    case "GET_POSTS":
      return { ...state, posts: action.payload, loading: false };
    case "POST_ERROR":
    case "COMMENT_ERROR":
      return { ...state, error: action.payload, loading: false };
    case "UPDATE_LIKES":
      return {
        ...state,
        posts: state.posts.map(post =>
          post._id === action.payload.id
            ? { ...post, likes: action.payload.likes }
            : post
        ),
        loading: false
      };
    default:
      return { ...state };
  }
};

export default postReducer;
