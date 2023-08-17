namespace Server.Models
{
    public class User
    {
        public int Id { get; set; }
        public string UserName { get; set; } = string.Empty;
        public string EmailAddress { get; set; } = string.Empty;
        public byte[] PasswordHash { get; set; } = new byte[32];
        public byte[] PasswordSalt { get; set; } = new byte[32];
        public List<Restaurant> Restaurants { get; set; } = new List<Restaurant>();
        public List<MenuItem> Products { get; set; } = new List<MenuItem>();
        public List<MenuItem> LikedProducts { get; set; } = new List<MenuItem>();
    }
}
