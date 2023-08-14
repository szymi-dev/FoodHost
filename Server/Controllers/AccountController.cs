using System.Security.Cryptography;
using System.Text;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Server.Controllers;
using Server.Data;
using Server.Dtos;
using Server.Interfaces;
using Server.Models;

namespace API.Controllers
{
    public class AccountController : BaseController
    {
        public DataContext _context;
        private readonly ITokenService _tokenService;

        public AccountController(DataContext context, ITokenService tokenService)
        {
            _context = context;
            _tokenService = tokenService;
        }


        [HttpPost("register")]
        public async Task<ActionResult<UserDto>> Register(RegisterRequest request)
        {
            if (await _context.Users.AnyAsync(x => x.EmailAddress == request.Email.ToLower())) return BadRequest("This e-mail address is already taken!");

            using var hmac = new HMACSHA512();

            var user = new User
            {
                UserName = request.Username.ToLower(),
                EmailAddress = request.Email.ToLower(),                                                                                                                                                           
                PasswordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(request.Password)),
                PasswordSalt = hmac.Key
            };

            _context.Users.Add(user);
            await _context.SaveChangesAsync();

            return new UserDto
            { 
                Username = user.UserName,
                EmailAddress = user.EmailAddress,
                Token = _tokenService.CreateToken(user)
            };
        }

        [HttpPost("login")]
        public async Task<ActionResult<UserDto>> Login(LoginRequest loginRequest)
        {
            var user = await _context.Users.SingleOrDefaultAsync(x => x.EmailAddress == loginRequest.Email);

            if (user == null) return Unauthorized("You have passed invalid e-mail address!");

            using var hmac = new HMACSHA512(user.PasswordSalt);

            var computeHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(loginRequest.Password));

            for (int i = 0; i < computeHash.Length; i++)
            {
                if (computeHash[i] != user.PasswordHash[i]) return Unauthorized("Invalid Password!");
            }

            return new UserDto
            {
                Username = user.UserName,
                EmailAddress = user.EmailAddress,
                Token = _tokenService.CreateToken(user)
            };
        }
    }
}