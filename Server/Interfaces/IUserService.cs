using Server.Models;

namespace Server.Interfaces
{
    public interface IUserService
    {
        Task<User> GetUserById(int id);
        Task<User> GetUserByUsername(string username);
        Task<User> GetUserByEmail(string email);
        Task<List<User>> GetAllUsers();
    }
}
