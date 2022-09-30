using System;
using System.Threading.Tasks;
using SpotifyAPI.Web;

namespace SuperSimpleSpotifySearch
{
    class Program
    {
        static void Main(string[] args)
        {
            MainAsync().Wait();
        }

        static async Task MainAsync()
        {
            string[] queries = new string[6] { "Katyperry", "katyPERRy", "Katy Perry", "Katy.Perry", "The katy perry", "Katy perry 2" };

            // Authenticate with Spotify first to get access_token.
            var config = SpotifyClientConfig.CreateDefault().WithAuthenticator(new ClientCredentialsAuthenticator("b4821faf687d4137ae12b735034ab9fd", "8d1bc161e3ca4267ba35d2efb710f3c6"));

            // Create spotify client.
            var spotify = new SpotifyClient(config);

            // Build request and search for artist.
            foreach (string query in queries)
            {
                SearchRequest sr = new SearchRequest(SearchRequest.Types.Artist, query);
                var artist = await spotify.Search.Item(sr);

                if (artist.Artists.Items.Count > 0)
                    Console.WriteLine("Artist found! You queried '" + query + "' and the result was {'artist_id' : '" + artist.Artists.Items[0].Id + "', 'artist_name' : '" + artist.Artists.Items[0].Name + "' }");
                else if (artist.Artists.Items.Count == 0)
                    Console.WriteLine("No artist found for your query of '" + query + "'.");
            }
        }
    }
}
