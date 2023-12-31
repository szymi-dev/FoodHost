﻿using Server.Dtos;
using Server.Models;

namespace Server.Interfaces
{
    public interface IRestaurantService
    {
        Task<List<Restaurant>> GetAllRestaurants();
        Task<Restaurant> GetRestaurant(int id);
        Task<RestaurantDto> RegisterNewRestaurantAsync(string username, RestaurantDto restaurant);
        Task<RestaurantDto> UpdateRestaurantAsync(int restaurantId, RestaurantDto restaurant);
        Task<string> AddMenuItemToRestaurantAsync(int restaurantId, string username, MenuItemDto menuItem);
        Task<Restaurant> UpdateMenuItem(int restaurantId, Restaurant restaurant);
        Task<List<MenuItemDto>> GetRestaurantMenuItemsAsync(int restaurantId);
        Task<List<MenuItemDto>> GetMenuItems();
        Task DeleteMenuItemAsync(int menuItemId);
        Task DeleteRestaurantAsync(int restaurantId);
        bool RestaurantExist(int restaurantId);
        bool MenuItemExist(int menuItemId);
    }
}
