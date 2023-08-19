using Server.Models;

namespace Server.Dtos
{
    public class RestaurantDto
    {
        public string Name { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public string Address { get; set; } = string.Empty;
        public string PhoneNumber { get; set; } = string.Empty;
        public List<MenuItem> Menu { get; set; } = new List<MenuItem>();
    }
}
