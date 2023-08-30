﻿using AutoMapper;
using AutoMapper.QueryableExtensions;
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
            return await _context.Restaurants.Include(x => x.MenuItems).AsNoTracking().ToListAsync();
        }

        public async Task<Restaurant> GetRestaurant(int id)
        {
            return await _context.Restaurants.FindAsync(id);
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

        public async Task DeleteRestaurantAsync(int restaurantId)
        {
            var restaurantToDelete = await _context.Restaurants.FirstOrDefaultAsync(x => x.Id == restaurantId);

            if (restaurantToDelete == null)
            {
                throw new ArgumentException("Restaurant with provided ID does not exist.");
            }

            _context.Restaurants.Remove(restaurantToDelete);

            await _context.SaveChangesAsync();
        }

        public async Task<MenuItemDto> AddMenuItemAsync(int restaurantId, string email, MenuItemDto menuItemDto)
        {
            var user = await _userService.GetUserByEmail(email);
            var restaurant = await GetRestaurant(restaurantId);

            if (user == null) {
                throw new NotImplementedException($"There is no such user with email {email}");
            }
            if (restaurant == null) { 
                throw new NotImplementedException($"There is no restaurant with such Id {restaurantId}");
            }

            var menuItem = new MenuItem
            {
                Name = menuItemDto.Name,
                Description = menuItemDto.Description,
                OldPrice = menuItemDto.OldPrice,
                SalePrice = menuItemDto.SalePrice,
                IsVegetarian = menuItemDto.IsVegetarian,
                ExpirationDate = menuItemDto.ExpirationDate,
                Quantity = menuItemDto.Quantity,
                IsAvailable = menuItemDto.IsAvailable,
                Cuisine = menuItemDto.Cuisine,
            };



            // Zwracasz przekształcony obiekt DTO (możesz też zwrócić zmapowany obiekt MenuItem, jeśli to konieczne)
            return menuItemDto;


        }

        public Task DeleteMenuItemAsync(int menuItemId)
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
