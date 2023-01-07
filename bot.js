const Twit = require('twit');

const T = new Twit({
  consumer_key: 'M1deKa5wM95Pt05vtayagiefW',
  consumer_secret: 'XOwxwQmNjoyzio4xXUnezXf6byxdDw3qhzGSXP6tJlh3F33JmS',
  access_token: '1166472101945118720-ggMLxrETeRjjzYNEKI9RKHEBqODbwR',
  access_token_secret: 'gfeTQCASmbzpL2iqUDQFgiRfsvpfG3bzUIvIG3ssZyp9i'
});

// Configuration de la recherche de tweets
const hashtag = 'ESTIAM';
const searchParams = {
  q: hashtag,
  count: 100
};

// Recherche de tweets avec le hashtag
T.get('search/tweets', searchParams, (err, data) => {
  if (err) {
    console.log(err);
  } else {
    // Pour chaque tweet, on "aime" le tweet et on le retweet
    data.statuses.forEach(tweet => {
      T.post('favorites/create', { id: tweet.id_str }, (err) => {
        if (err) {
          console.log(err);
        } else {
          console.log(`Tweet with ID ${tweet.id_str} liked.`);
        }
      });
      T.post('statuses/retweet/:id', { id: tweet.id_str }, (err) => {
        if (err) {
          console.log(err);
        } else {
          console.log(`Tweet with ID ${tweet.id_str} retweeted.`);
        }
      });
    });

    // Pour chaque utilisateur mentionnant le hashtag avec plus de 100 followers, on les suit
    data.statuses.forEach(tweet => {
      if (tweet.user.followers_count > 100) {
        T.post('friendships/create', { screen_name: tweet.user.screen_name }, (err) => {
          if (err) {
            console.log(err);
          } else {
            console.log(`User with screen name ${tweet.user.screen_name} followed.`);
          }
        });
      }
    });
  }
});
