using AutoMapper;
using Server.Dtos;
using Server.Models;

namespace Server.Mapper
{
    public class AutoMapperConfig : Profile
    {
        public AutoMapperConfig()
        {
            CreateMap<Restaurant, RestaurantDto>();
        }
    }
}
