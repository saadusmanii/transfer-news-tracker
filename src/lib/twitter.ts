// Twitter API v2 client wrapper
export class TwitterClient {
  private bearerToken: string;

  constructor() {
    this.bearerToken = process.env.TWITTER_BEARER_TOKEN || "";
  }

  async getUserByUsername(username: string) {
    if (!this.bearerToken) {
      console.warn("Twitter API token not configured");
      return null;
    }

    try {
      const response = await fetch(
        `https://api.twitter.com/2/users/by/username/${username}?user.fields=profile_image_url,description,verified`,
        {
          headers: {
            Authorization: `Bearer ${this.bearerToken}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error(`Twitter API error: ${response.statusText}`);
      }

      return response.json();
    } catch (error) {
      console.error("Error fetching Twitter user:", error);
      return null;
    }
  }

  async getUserTweets(userId: string, maxResults = 50) {
    if (!this.bearerToken) {
      console.warn("Twitter API token not configured");
      return null;
    }

    try {
      const response = await fetch(
        `https://api.twitter.com/2/users/${userId}/tweets?max_results=${maxResults}&tweet.fields=created_at,public_metrics,entities`,
        {
          headers: {
            Authorization: `Bearer ${this.bearerToken}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error(`Twitter API error: ${response.statusText}`);
      }

      return response.json();
    } catch (error) {
      console.error("Error fetching tweets:", error);
      return null;
    }
  }

  async searchRecentTweets(query: string, maxResults = 100) {
    if (!this.bearerToken) {
      console.warn("Twitter API token not configured");
      return null;
    }

    try {
      const response = await fetch(
        `https://api.twitter.com/2/tweets/search/recent?query=${encodeURIComponent(query)}&max_results=${maxResults}&tweet.fields=created_at,author_id,public_metrics`,
        {
          headers: {
            Authorization: `Bearer ${this.bearerToken}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error(`Twitter API error: ${response.statusText}`);
      }

      return response.json();
    } catch (error) {
      console.error("Error searching tweets:", error);
      return null;
    }
  }
}

export const twitterClient = new TwitterClient();
