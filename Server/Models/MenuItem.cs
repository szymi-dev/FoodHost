namespace Server.Models
{
    public class MenuItem
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public string Category { get; set; } = string.Empty;
        public decimal OldPrice { get; set; }
        public decimal SalePrice { get; set; }
        public bool IsVegetarian { get; set; }
        public DateTime ExpirationDate { get; set; }
        public int Quantity { get; set; }
        public bool IsAvailable { get; set; }
        public CuisineType Cuisine { get; set; }
        public bool IsLiked { get; set; }
    }

    public enum CuisineType
    {
        Italian,
        Mexican,
        Chinese,
        Indian,
        American,
        Japanese,
        French,
        Mediterranean,
        Thai,
        Korean,
        Greek,
        Vietnamese,
        Brazilian,
        Lebanese,
        Vegetarian,
        Vegan,
        GlutenFree,
        Seafood,
        Steakhouse,
        Sushi,
        FastFood,
        Pizza,
        Other
    }
}

