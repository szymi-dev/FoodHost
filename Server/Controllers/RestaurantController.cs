using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Server.Dtos;
using Server.Interfaces;
using Server.Models;
using System.Security.Claims;

namespace Server.Controllers
{
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
    }
}
