namespace Server.Models
{
    public class ItemLike
    {
        public User User { get; set; }
        public int UserId { get; set; }
        public MenuItem MenuItem { get; set; }
        public int MenuItemId { get; set; }
    }
}
