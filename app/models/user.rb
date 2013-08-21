class User < ActiveRecord::Base
  has_many :tweets

  def twitter_client
    @twitter_client ||= Twitter::Client.new(
      oauth_token: oauth_token,
      oauth_token_secret: oauth_secret
    )
  end

  def tweet(status)
    tweet = tweets.create!(:status => status)
    # TweetWorker.perform_async(tweet.id)
    TweetWorker.perform_in(2.minutes, tweet.id)
  end
end
