using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Server.Dtos;
using Server.Interfaces;
using Server.Models;
using System.Security.Claims;

namespace Server.Controllers
{
    [Authorize]
    public class RestaurantController : BaseController
    {
        private readonly IRestaurantService _restaurantService;
        public RestaurantController(IRestaurantService restaurantService)
        {
            _restaurantService = restaurantService;
        }

        [HttpGet]
        public async Task<ActionResult<List<Restaurant>>> GetRestaurants()
        {
            var restaurants = await _restaurantService.GetAllRestaurants();

            return restaurants;
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Restaurant>> GetRestaurant([FromRoute] int id)
        {
            var restaurant = await _restaurantService.GetRestaurant(id);

            return restaurant;
        }

        [HttpPost("RegisterRestaurant")]
        public async Task<ActionResult<RestaurantDto>> RegisterNewRestaurant([FromBody] RestaurantDto restaurantDto)
        {
            var username = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            var restaurant = await _restaurantService.RegisterNewRestaurantAsync(username, restaurantDto);
            return restaurant;
        }

        [HttpPatch("Update/{restaurantId}")]
        public async Task<ActionResult<RestaurantDto>> UpdateRestaurant([FromRoute] int restaurantId, [FromBody] RestaurantDto restaurantDto)
        {
            var restaurantToUpdate = await _restaurantService.UpdateRestaurantAsync(restaurantId, restaurantDto);
            return Ok(restaurantToUpdate);
        }

        [HttpDelete("DeleteRestaurant/{restaurantId}")]
        public async Task<ActionResult> DeleteRestaurant([FromRoute] int restaurantId)
        {
            try
            {
                await _restaurantService.DeleteRestaurantAsync(restaurantId);
                return Ok("Restaurant deleted succesfully");
            }
            catch (ArgumentException ex)
            {
                return NotFound(ex.Message);
            }
        }

        [HttpPost("AddMenuItem/{restaurantId}")]
        public async Task<ActionResult<string>> AddMenuItem([FromRoute] int restaurantId, [FromBody] MenuItemDto menuItemDto)
        {
            var username = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

            menuItemDto.Cuisine = menuItemDto.Cuisine.ToString();
            var menuItem = await _restaurantService.AddMenuItemToRestaurantAsync(restaurantId, username, menuItemDto);

            return menuItem != null
                ? Ok("Produkt został dodany pomyślnie!")
                : BadRequest("Failed to add menu item.");
        }

        [HttpGet("MenuItems/{restaurantId}")]
        public async Task<ActionResult<List<MenuItemDto>>> GetRestaurantMenuItemsAsync([FromRoute] int restaurantId)
        {
            var menuItems = await _restaurantService.GetRestaurantMenuItemsAsync(restaurantId);

            return menuItems != null
                ? Ok(menuItems)
                : BadRequest("Failed to load menu items!");
        }

        [HttpGet("MenuItems")]
        public async Task<ActionResult<List<MenuItemDto>>> GetMenuItemsAsync()
        {
            var menuItems = await _restaurantService.GetMenuItems();

            return menuItems != null
                ? Ok(menuItems)
                : BadRequest("Failed to load menu items!");
        }
    }
}
