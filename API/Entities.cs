using System.Collections.Generic;

namespace API
{
    public class Media {
        public string media_url { get; set; }
        public string url { get; set; }
    }

    public class Urls{
        public string url { get; set; }
    }
    public class Entities
    {
                public List<Media> media { get; set; }
                public List<Urls> urls { get; set; }


    }
}