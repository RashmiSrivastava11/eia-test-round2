export class Data {
	title: string;
	url: string;
	created_at: string;
	author: string;
}


// Periodically (every 10 seconds) poll for new posts from this API https://hn.algolia.com/api/v1/search_by_date?tags=story via a GET request.
// Display the title, url, created_at, and author of each post in a table.
// Upon selecting a row in the table, a modal should appear containing the raw JSON data of post.
// This modal should support dismissal by clicking outside of the modal as well as upon clicking a close button.