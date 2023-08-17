﻿using Microsoft.EntityFrameworkCore;
using Server.Data;
using Server.Interfaces;
using Server.Models;

namespace Server.Services
{
    public class UserService : IUserService
    {
        private readonly DataContext _context;

        public UserService(DataContext context)
        {
            _context = context;
        }

        public async Task<List<User>> GetAllUsers()
        {
            return await _context.Users.AsNoTracking().ToListAsync();
        }

        public async Task<User> GetUserById(int id)
        {
            return await _context.Users.FindAsync(id);
        }

        public async Task<User> GetUserByUsername(string username)
        {
            return await _context.Users.Where(u => u.UserName == username).FirstOrDefaultAsync();
        }
    }
}