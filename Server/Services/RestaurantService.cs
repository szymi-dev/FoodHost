using Server.Data;
using Server.Interfaces;
using Server.Models;

namespace Server.Services
{
    public class RestaurantService : IRestaurantService
    {
        private readonly DataContext _context;
        public RestaurantService(DataContext context)
        {
            _context = context;
        }

        public Task<Restaurant> RegisterNewRestaurantAsync(int userId, Restaurant restaurant)
        {
            throw new NotImplementedException();
        }
        public Task<MenuItem> AddMenuItemAsync(int restaurantId, MenuItem menuItem)
        {
            throw new NotImplementedException();
        }

        public Task DeleteMenuItemAsync(int menuItemId)
        {
            throw new NotImplementedException();
        }

        public Task DeleteRestaurantAsync(int restaurantId)
        {
            throw new NotImplementedException();
        }

        public Task<List<Restaurant>> GetAllRestaurants()
        {
            throw new NotImplementedException();
        }

        public Task<Restaurant> GetRestaurant(int id)
        {
            throw new NotImplementedException();
        }

        public bool MenuItemExist(int menuItemId)
        {
            throw new NotImplementedException();
        } 

        public bool RestaurantExist(int restaurantId)
        {
            throw new NotImplementedException();
        }

        public Task<Restaurant> UpdateMenuItem(int restaurantId, Restaurant restaurant)
        {
            throw new NotImplementedException();
        }

        public Task<Restaurant> UpdateRestaurantAsync(int restaurantId, Restaurant restaurant)
        {
            throw new NotImplementedException();
        }
    }
}
