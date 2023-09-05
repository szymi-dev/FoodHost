using Server.Models;

namespace Server.Dtos
{
    public class MenuItemDto
    {
        public string Name { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public decimal OldPrice { get; set; }
        public decimal SalePrice { get; set; }
        public bool IsVegetarian { get; set; }
        public DateTime ExpirationDate { get; set; }
        public int Quantity { get; set; }
        public bool IsAvailable { get; set; }
        public string Cuisine { get; set; } = string.Empty;
        public string ImageUrl { get; set; } = string.Empty;
    }
}
