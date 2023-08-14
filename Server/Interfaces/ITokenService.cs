using Server.Models;

namespace Server.Interfaces
{
    public interface ITokenService
    {
        string CreateToken(User user);
    }
}
