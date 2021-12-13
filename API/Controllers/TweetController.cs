using System;
using System.Collections.Generic;
using System.Collections.Specialized;
using System.Linq;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;

namespace API.Controllers
{
    
    [ApiController]
    public class TweetController
    {
        
        static readonly HttpClient client = new HttpClient();
        [HttpGet("api/tweets/token")]
       public async Task<BearerToken> Token()
        {
            var userName = "bgQLtlkwTCJRAJUcsXmCNmSTA";
            var password = "2LpT3c5LWx7isQrlGYkytbzLdauupz0MdVdYkKNRAwpanzlPcS";
            var byteArray = Encoding.ASCII.GetBytes($"{userName}:{password}");
            client.DefaultRequestHeaders.Authorization = new System.Net.Http.Headers.AuthenticationHeaderValue("Basic", Convert.ToBase64String(byteArray));
            var url = "https://api.twitter.com/oauth2/token";
            var postData = "grant_type=client_credentials";
            var content = new StringContent(postData, Encoding.UTF8, "application/x-www-form-urlencoded");
            client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
            HttpResponseMessage response = await client.PostAsync(url, content);
            string result = await response.Content.ReadAsStringAsync();
            return JsonConvert.DeserializeObject<BearerToken>(result);
        }

        
        [HttpGet("api/tweets/search")]
        public async Task<TwitterResponse> Tweet(string type, string token, string searchTerm, string result_type)
        {
            var newToken =  Uri.EscapeDataString(token);
            client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue(type, token);
            HttpResponseMessage response = await client.GetAsync($"https://api.twitter.com/1.1/search/tweets.json?q={searchTerm}&result_type={result_type}&lang=en&tweet_mode=extended");
            string tweetString = await response.Content.ReadAsStringAsync();
            return JsonConvert.DeserializeObject<TwitterResponse>(tweetString); 

        }

        [HttpGet("api/tweets/users")]
        public async Task<UserResponse> Username(string type, string token, string screenName)
        {
            client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue(type, token);
            HttpResponseMessage response = await client.GetAsync($"https://api.twitter.com/1.1/users/show.json?screen_name={screenName}");
            string usernameString = await response.Content.ReadAsStringAsync();
            return JsonConvert.DeserializeObject<UserResponse>(usernameString); 

        }


    }
}