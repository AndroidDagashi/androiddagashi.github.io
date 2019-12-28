/* eslint camelcase: 0 */
export default interface TweetResponse {
  user: {
    screen_name: string;
  };
  id_str: string;
  text: string;
  created_at: string;
}
