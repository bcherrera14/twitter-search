using System.Collections.Generic;

namespace API
{
    public class Tweets
    {
        public string created_at { get; set; }
        public string full_text { get; set; }
        public int retweet_count { get; set; }
        public int favorite_count { get; set; }
        public string id_str { get; set; }
        public UserData User { get; set; }

        public Entities Entities { get; set; }
    }
    
    public class UserData
    {
        public string screen_name { get; set; }
        public string name { get; set; }
        public string profile_image_url { get; set; }
    }
    public class TwitterResponse
    {
        public List<Tweets> Statuses { get; set; }
    }
}