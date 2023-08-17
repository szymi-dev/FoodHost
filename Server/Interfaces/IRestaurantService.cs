using Server.Models;

namespace Server.Interfaces
{
    public interface IRestaurantService
    {
        Task<List<Restaurant>> GetAllRestaurants();
        Task<Restaurant> GetRestaurant(int id);
        Task<Restaurant> RegisterNewRestaurantAsync(int userId, Restaurant restaurant);
        Task<Restaurant> UpdateRestaurantAsync(int restaurantId, Restaurant restaurant);
        Task<MenuItem> AddMenuItemAsync(int restaurantId, MenuItem menuItem);
        Task<Restaurant> UpdateMenuItem(int restaurantId, Restaurant restaurant);
        Task DeleteMenuItemAsync(int menuItemId);
        Task DeleteRestaurantAsync(int restaurantId);
    }
}
