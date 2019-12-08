export default interface TweetResponse {
  user: {
      profile_image_url_https: string;
      name: string;
  };
  text: string;
}
