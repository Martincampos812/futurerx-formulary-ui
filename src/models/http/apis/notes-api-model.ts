// API: /api/v1/member/<id>/notes/getAll

export interface NOTES_GET_ALL_INPUT {
  // All input params in the url.
}
export interface NOTES_GET_ALL_RESPONSE {
  notes: Array<NOTES_DETAIL>; // Preferably sorted (descending order) by date
}

export interface NOTES_DETAIL {
  note_id: string;
  user_id: string;
  note: string;
  date: string; // MM/DD/YYYY format
  category_id: string;
}

export interface NOTES_USER {
  user_id: string;
  user_name: string;
  user_image: string; //URL
}

export interface NOTES_CATEGORIES {
  category_id: string;
  category_name: string;
}

// API: /api/v1/member/<id>/notes/getByCategory/<category>
// <category> - can be category id or the category name.
export interface NOTES_GET_BY_CATEGORY_INPUT {
  // All input params in the url.
}

export interface NOTES_GET_BY_CATEGORY_RESPONSE {
  notes: Array<NOTES_DETAIL>; // Preferably sorted (descending order) by date
}

// API: /api/v1/member/<id>/notes/search?query=<query string>
// The query can be part of a username, note, date or category
export interface NOTES_SEARCH_RESPONSE {
  notes: Array<NOTES_DETAIL>; // Preferably sorted (descending order) by date
}

// API: /api/v1/member/<id>/notes/add
// http method: Post
export interface NOTES_ADD_INPUT {
  category_id: string;
  notes: string;
  user_id;
  date: string; // MM/DD/YYYY format
}
export interface NOTES_ADD_RESPONSE {
  note_id: string;
}
