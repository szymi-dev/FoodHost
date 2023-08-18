using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Server.Dtos;
using Server.Interfaces;
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

        [HttpPost("RegisterRestaurant")]
        public async Task<RestaurantDto> RegisterNewRestaurant([FromBody] RestaurantDto restaurantDto)
        {
            var username = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            var restaurant = await _restaurantService.RegisterNewRestaurantAsync(username, restaurantDto);
            return restaurant;
        }
    }
}
