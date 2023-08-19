using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.EntityFrameworkCore;
using Server.Data;
using Server.Dtos;
using Server.Interfaces;
using Server.Models;

namespace Server.Services
{
    public class RestaurantService : IRestaurantService
    {
        private readonly DataContext _context;
        private readonly IUserService _userService;
        private readonly IMapper _mapper;
        public RestaurantService(DataContext context, IUserService userService, IMapper mapper)
        {
            _context = context;
            _userService = userService;
            _mapper = mapper;
        }

        public async Task<List<Restaurant>> GetAllRestaurants()
        {
            return await _context.Restaurants.Include(x => x.Menu).ToListAsync();
        }

        public async Task<RestaurantDto> RegisterNewRestaurantAsync(string username, RestaurantDto restaurantDto)
        {
            var user = await _userService.GetUserByUsername(username);

            if(user == null) throw new ArgumentException("No user found");

            var restaurant = new Restaurant
            {
                Name = restaurantDto.Name,
                Description = restaurantDto.Description,
                Address = restaurantDto.Address,
                PhoneNumber = restaurantDto.PhoneNumber
            };

            user.Restaurants.Add(restaurant);
            await _context.SaveChangesAsync();

            var restaurantToReturn = _mapper.Map<Restaurant, RestaurantDto>(restaurant);
            return restaurantToReturn;
        }

        public async Task<RestaurantDto> UpdateRestaurantAsync(int restaurantId, RestaurantDto updatedRestaurantDto)
        {
            var existingRestaurant = await _context.Restaurants.FindAsync(restaurantId);

            if (existingRestaurant == null)
            {
                throw new ArgumentException("Restaurant not found");
            }

            existingRestaurant.Name = updatedRestaurantDto.Name ?? existingRestaurant.Name;
            existingRestaurant.Description = updatedRestaurantDto.Description ?? existingRestaurant.Description;
            existingRestaurant.Address = updatedRestaurantDto.Address ?? existingRestaurant.Address;
            existingRestaurant.PhoneNumber = updatedRestaurantDto.PhoneNumber ?? existingRestaurant.PhoneNumber;

            await _context.SaveChangesAsync();

            var updatedRestaurantDtoMapped = _mapper.Map<Restaurant, RestaurantDto>(existingRestaurant);
            return updatedRestaurantDtoMapped;
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
    }
}
